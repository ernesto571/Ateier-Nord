import { create } from "zustand"

export interface WishlistItem {
    id: string
    name: string
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
        const saved = localStorage.getItem("wishlist")
        set({ wishlistItems: saved ? JSON.parse(saved) : [], isLoading: false })
    },
    addWishlistItem: (item) => {
        const { wishlistItems } = get()
        if (wishlistItems.some((i) => i.id === item.id)) return
        const updated = [...wishlistItems, item]
        localStorage.setItem("wishlist", JSON.stringify(updated))
        set({ wishlistItems: updated })
    },
    removeItem: (id) => {
        const updated = get().wishlistItems.filter((i) => i.id !== id)
        localStorage.setItem("wishlist", JSON.stringify(updated))
        set({ wishlistItems: updated })
    },
}))