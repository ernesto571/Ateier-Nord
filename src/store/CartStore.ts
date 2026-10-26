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
    isLoading: boolean
    fetchCartItems: () => Promise<void>
    addItem: (item: CartItem) => Promise<void>
    removeItem: (product_id: string, color: string, size: string) => void
    updateQuantity: (product_id: string, color: string, size: string, quantity: number) => void
    migrateCartToDatabase: () => Promise<void>;
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
    isLoading: false ,

    fetchCartItems: async () => {
        set({isLoading: true})
        const session = useAuthStore.getState().session
        const userId = session?.user.id

        if (!userId) {
            const saved = getGuestCart()
            set({items: saved})
            set({isLoading: false})
            return
        }

        const { error, data } = await supabase.from("cart").select("*").eq("user_id", userId).order("created_at", { ascending: false });

        if (error){
            console.log("Error fetching cart from database", error.message)
            return
        }

        set({items: data, isLoading: false})
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


    
migrateCartToDatabase: async () => {
  const session = useAuthStore.getState().session;

  if (!session?.user) {
      console.log("Cart migration skipped: user is not authenticated");
      return;
  }

  const guestItems = getGuestCart();

  if (guestItems.length === 0) return;

  try {
      const userId = session.user.id;

      const { data: existingItems, error: fetchError } = await supabase
          .from("cart")
          .select("product_id, name, price, image, color, size, quantity")
          .eq("user_id", userId);

      if (fetchError) throw fetchError;

      const mergedItems: CartItem[] = (existingItems ?? []).map((item) => ({
          product_id: item.product_id,
          name: item.name,
          price: item.price,
          image: item.image,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
      }));

      for (const guestItem of guestItems) {
          const existing = mergedItems.find((item) =>
              same(
                  item,
                  guestItem.product_id,
                  guestItem.color,
                  guestItem.size
              )
          );

          if (existing) {
              existing.quantity += guestItem.quantity;
          } else {
              mergedItems.push({ ...guestItem });
          }
      }

      const rowsToSave = mergedItems.map((item) => ({
          user_id: userId,
          product_id: item.product_id,
          name: item.name,
          price: item.price,
          image: item.image,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
      }));

      const { error: saveError } = await supabase
          .from("cart")
          .upsert(rowsToSave, {
              onConflict: "user_id,product_id,color,size",
          });

      if (saveError) throw saveError;

      localStorage.removeItem("cart");

      await get().fetchCartItems();

      console.log("Guest cart migrated successfully");
  } catch (error) {
      console.error("Failed to migrate guest cart:", error);
  }
},



  
}))