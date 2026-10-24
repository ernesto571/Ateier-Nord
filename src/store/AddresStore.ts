import { create } from "zustand"
import { supabase } from "../lib/supabase-client";
import { useAuthStore } from "./AuthStore";

interface Address {
    id: string;
    label: string;
    street_address: string;
    city: string;
    postal_code: string;
    is_default: boolean
}

interface FormData {
    label: string;
    street_address: string;
    city: string;
    postal_code: string;
}

interface AddressStore {
    addressList: Address[]
    isLoading: boolean;
    formData: FormData;
    fetchAddress: () => Promise<void>
    addAddress: (data:FormData) => Promise<void>
    updateAddress: (id: string) => void
    setFormData: (data: Partial<FormData>) => void;
}

const initialFormData: FormData = {
    label: '',
    street_address: '',
    city: '',
    postal_code: '',
};

export const useAdressStore = create<AddressStore>((set) => ({
    isLoading: false,
    formData: initialFormData,
    addressList: [],

    fetchAddress : async() => {
        set({isLoading: true})
        const session = useAuthStore.getState().session
        const userId = session?.user.id

        if (!userId) {
            set({isLoading: false})
            return
        }

        const { error, data } = await supabase.from("addresses").select("*").eq("user_id", userId).order("created_at", { ascending: false });

        if (error){
            console.log("Error fetching adress from database", error.message)
            return
        }

        set({addressList: data, isLoading: false})
    },

    addAddress: async (data) => {
        set({isLoading: true})
        const session = useAuthStore.getState().session
        const userId = session?.user.id

        if (!userId){
            console.log("User not authenticated")
            return
        }
        try {
            const {data: addressData, error } = await supabase.from("addresses").insert({
                user_id: userId,
                label: data.label,
                city: data.city,
                street_address: data.street_address,
                postal_code: data.postal_code
            }).select().single()

            if ( error ){{
                console.log("Failed to add adress", error.message)
                set({isLoading: false})
                return
            }}

            console.log("Adress ssaved to database")
            set({addressList: addressData})

        } catch (err: any) {
            console.log("Error in addAdress", err.message)
        } finally {
            set({isLoading: false})
        }
    },

    updateAddress: async (id) => {
        set({isLoading: true})
        const session = useAuthStore.getState().session
        const userId = session?.user.id

        if (!userId){
            console.log("User not authenticated")
            return
        }

        const { error } = await supabase.from("addresses").update({ is_default: true }).eq("user_id", userId).eq("id", id)

        if(error) {
            console.log("Error updating addreess", error.message)
            set({isLoading: false})
            return
        }

        console.log("address successfully updated")
        set({isLoading: false})
    },

    setFormData: (data) => set((s) => ({ formData: { ...s.formData, ...data } })),
    
}))

