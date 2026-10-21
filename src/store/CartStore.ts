import { create } from "zustand"
import { supabase } from "../lib/supabase-client"
import { useAuthStore } from "./AuthStore"

export interface CartItem {
    product_id: string
    name: string
    price: number
    image: string
    color: string
    size: string
    quantity: number
}

interface CartStore {
    items: CartItem[]
    fetchCartItems: () => Promise<void>
    addItem: (item: CartItem) => Promise<void>
    removeItem: (product_id: string, color: string, size: string) => void
    updateQuantity: (product_id: string, color: string, size: string, quantity: number) => void
    clearCart: () => void
}

const same = (a: CartItem, product_id: string, color: string, size: string) =>
    a.product_id === product_id && a.color === color && a.size === size

const saveGuestCart = (items: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
};
      
const getGuestCart = (): CartItem[] => {
    const saved = localStorage.getItem("cart");
    
    return saved ? JSON.parse(saved) : [];
};
      
// const clearGuestCart = () => {
//     localStorage.removeItem("cart");
// };

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    fetchCartItems: async () => {
        const session = useAuthStore.getState().session
        const userId = session?.user.id

        if (!userId) {
            const saved = getGuestCart()
            set({items: saved})
            return
        }

        const { error, data } = await supabase.from("cart").select("*").eq("user_id", userId).order("created_at", { ascending: false });

        if (error){
            console.log("Error fetching cart from database", error.message)
            return
        }

        set({items: data})
    },

    addItem: async (item) => {
        const { items } = get();
      
        const updated = items.some((i) =>
          same(i, item.product_id, item.color, item.size)
        )
          ? items.map((i) =>
              same(i, item.product_id, item.color, item.size)
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          : [...items, item];
      
        const session = useAuthStore.getState().session
      
        const userId = session?.user.id;
      
        // Guest Cart
        if (!userId) {
          console.log("User is not signed in, saving to local storage");
          saveGuestCart(updated)  
          set({ items: updated })
          return;
        }
      
        // Find the updated product variant
        const line = updated.find((i) =>
          same(i, item.product_id, item.color, item.size)
        );
      
        if (!line) return;
       
        // save to supabase
        const { data, error } = await supabase
          .from("cart")
          .upsert(
            {
              user_id: userId,
              product_id: line.product_id,
              name: line.name,
              price: line.price,
              image: line.image,
              color: line.color,
              size: line.size,
              quantity: line.quantity,
            },
            {
              onConflict: "user_id,product_id,color,size",
            }
          )
          .select();
      
        if (error) {
          console.error("Failed to add item:", error.message);
          return;
        }
      
        set({ items: updated });
        console.log("Cart saved:", data);
    },

    removeItem: async (id, color, size) => {

        const updated = get().items.filter((i) => !same(i, id, color, size))

        const session = useAuthStore.getState().session
        const userId = session?.user.id

        if (!userId) {
            localStorage.setItem("cart", JSON.stringify(updated))
            set({ items: updated })
            return
        }

        const { error }= await supabase.from("cart").delete().eq("user_id", userId).eq("product_id", id).eq("size", size).eq("color", color)
        if (error){
            console.log("Error removing cart item in database", error.message)
            return
        }
        set({ items: updated })
    },

    updateQuantity: async (id, color, size, quantity) => {
        const updated = get().items.map((i) => same(i, id, color, size) ? { ...i, quantity: Math.max(1, quantity) } : i)
        
        const session = useAuthStore.getState().session
        const userId = session?.user.id

        if (!userId) {
            localStorage.setItem("cart", JSON.stringify(updated))
            set({ items: updated })
            return
        }

        const { error }= await supabase.from("cart").update({quantity : quantity}).eq("user_id", userId).eq("product_id", id).eq("size", size).eq("color", color)
        if (error){
            console.log("Error updating cart item quantity in database", error.message)
            return
        }
        set({ items: updated })
    },

    clearCart: () => {
        localStorage.removeItem("cart")
        set({ items: [] })
    },
}))