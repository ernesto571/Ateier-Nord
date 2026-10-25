import { create } from "zustand"
import { useAuthStore } from "./AuthStore"
import { supabase } from "../lib/supabase-client"

export interface WishlistItem {
    product_id: string;
    product_name: string
    slug: string
    price: number
    images: string[]
    rating: number
}

interface WishlistStore {
    wishlistItems: WishlistItem[]
    isLoading: boolean
    fetchWishlistItems: () => Promise<void>
    addWishlistItem: (item: WishlistItem) => void
    removeItem: (id: string) => void
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
    wishlistItems: [],
    isLoading: false,

    fetchWishlistItems: async () => {
        set({ isLoading: true })
        const session = useAuthStore.getState().session
        const userId = session?.user.id

        if (!userId) {
            const saved = localStorage.getItem("wishlist")
            set({ wishlistItems: saved ? JSON.parse(saved) : [], isLoading: false })
            return
        }
    
        const {data, error }= await supabase.from("wishlist").select("*").eq("user_id", userId).order("created_at", { ascending: false } )
    
        if (error){
            console.log("Error fetching wishlist from database", error.message)
            set({isLoading: false})
            return
        }

        set({ wishlistItems: data , isLoading: false })
        console.log("Wishlist fetched", data)
    },

    addWishlistItem: async (item) => {
        const { wishlistItems } = get()
    
        if (wishlistItems.some((i) => i.product_id === item.product_id)) return
    
        const session = useAuthStore.getState().session
        const userId = session?.user.id
    
        const updated = [...wishlistItems, item]
    
        if (!userId) {
            localStorage.setItem("wishlist", JSON.stringify(updated))
            set({ wishlistItems: updated })
            return
        }
    
        const { data, error } = await supabase
            .from("wishlist")
            .upsert(
                {
                    user_id: userId,
                    product_name: item.product_name,
                    product_id: item.product_id,
                    slug: item.slug,
                    price: item.price,
                    images: item.images,
                    rating: item.rating
                },
                {
                    onConflict: "user_id,slug",
                    ignoreDuplicates: true
                }
            )
            .select("product_id, product_name, slug, price, images, rating")
    
        if (error) {
            console.error("Failed to add item:", error.message)
            return
        }
    
        if (data && data.length > 0) {
            set({ wishlistItems: [...get().wishlistItems, data[0] as WishlistItem] })
        } else {
            await get().fetchWishlistItems()
        }
    
        console.log("Item added to wishlist")
    },
    

    removeItem: async(id) => {
        const updated = get().wishlistItems.filter((i) => i.product_id !== id)

        const session = useAuthStore.getState().session
        const userId = session?.user.id

        if (!userId){
            localStorage.setItem("wishlist", JSON.stringify(updated))
            set({ wishlistItems: updated })
            return
        }
        
        const { error } = await supabase.from("wishlist").delete().eq("product_id", id).eq("user_id", userId)

        if (error){
            console.log("Error removing wishlist item in database", error.message)
            return
        }
        await get().fetchWishlistItems()
        
    },
}))