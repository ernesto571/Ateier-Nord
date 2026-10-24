import { create } from "zustand"
import { supabase } from "../lib/supabase-client"
import { useAuthStore } from "./AuthStore"

export interface Order{
    id: string;
    order_number: string;
    order_items: [{
        image: string[]
    }]
    total: number;
    status: string;
    created_at: string | number;
}

interface OrderStore {
    orders: Order[]
    isLoading: boolean
    fetchOrders: () => Promise<void>
}

export const useOrderStore = create<OrderStore>((set) => ({
    orders: [],
    isLoading: false,

    fetchOrders: async() => {
        set({ isLoading:true })
        const session = useAuthStore.getState().session
        const userId = session?.user.id

        if(!userId){
            console.log("User is not authenticated")
            return
        }

        const { error, data } = await supabase.from("orders").select("*").eq("user_id", userId).order("created_at", { ascending: false });

        if (error){
            console.log("Error fetching orders from database", error.message)
            return
        }

        set({orders: data, isLoading: false})

    }
}))