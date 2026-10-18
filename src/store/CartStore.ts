import { create } from "zustand"

export interface CartItem {
    id: string
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
    addItem: (item: CartItem) => void
    removeItem: (id: string, color: string, size: string) => void
    updateQuantity: (id: string, color: string, size: string, quantity: number) => void
    clearCart: () => void
}

const same = (a: CartItem, id: string, color: string, size: string) =>
    a.id === id && a.color === color && a.size === size

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    fetchCartItems: async () => {
        const saved = localStorage.getItem("cart")
        set({ items: saved ? JSON.parse(saved) : [] })
    },
    addItem: (item) => {
        const { items } = get()
        const updated = items.some((i) => same(i, item.id, item.color, item.size))
            ? items.map((i) => same(i, item.id, item.color, item.size) ? { ...i, quantity: i.quantity + item.quantity } : i)
            : [...items, item]
        localStorage.setItem("cart", JSON.stringify(updated))
        set({ items: updated })
    },
    removeItem: (id, color, size) => {
        const updated = get().items.filter((i) => !same(i, id, color, size))
        localStorage.setItem("cart", JSON.stringify(updated))
        set({ items: updated })
    },
    updateQuantity: (id, color, size, quantity) => {
        const updated = get().items.map((i) => same(i, id, color, size) ? { ...i, quantity: Math.max(1, quantity) } : i)
        localStorage.setItem("cart", JSON.stringify(updated))
        set({ items: updated })
    },
    clearCart: () => {
        localStorage.removeItem("cart")
        set({ items: [] })
    },
}))