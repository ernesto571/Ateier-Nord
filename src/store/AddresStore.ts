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
    setDefaultAddress: (id: string) => void
    deleteAddress: (id: string) => void
    setFormData: (data: Partial<FormData>) => void;
}

const initialFormData: FormData = {
    label: '',
    street_address: '',
    city: '',
    postal_code: '',
};

export const useAddressStore = create<AddressStore>((set, get) => ({
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

        const { error, data } = await supabase.from("addresses").select("*").eq("user_id", userId).order("created_at", { ascending: true });

        if (error){
            console.log("Error fetching adress from database", error.message)
            return
        }

        console.log("Address fetched", data)

        set({addressList: data, isLoading: false})
    },

    addAddress: async (data) => {
        set({isLoading: true})

        const session = useAuthStore.getState().session
        const userId = session?.user.id



        if (!userId){
            console.log("User not authenticated")
            set({isLoading: false})
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

            if ( error ){
                console.log("Failed to add adress", error.message)
                set({isLoading: false})
                return
            }

            console.log("Adress ssaved to database")
            set({addressList: [...get().addressList, addressData ]})

        } catch (err: any) {
            console.log("Error in addAdress", err.message)
        } finally {
            set({isLoading: false})
        }
    },

    setDefaultAddress: async (addressId) => {
        const session = useAuthStore.getState().session
        const userId = session?.user.id
    
        if (!userId) return
    
        // Remove the current default
        const { error: resetError } = await supabase
            .from("addresses")
            .update({ is_default: false })
            .eq("user_id", userId)
            .eq("is_default", true)
    
        if (resetError) {
            console.error("Failed to reset default address:", resetError.message)
            return
        }
    
        // Set the selected address as default
        const { error } = await supabase
            .from("addresses")
            .update({ is_default: true })
            .eq("id", addressId)
            .eq("user_id", userId)
    
        if (error) {
            console.error("Failed to update default address:", error.message)
            return
        }
    
        // Refresh addresses from the database
        await get().fetchAddress()

    },

    deleteAddress: async (addressID) => {
        const session = useAuthStore.getState().session
        const userId = session?.user.id
    
        if (!userId) return

        const { error } = await supabase.from("addresses").delete().eq("id", addressID).eq("user_id", userId)

        if (error){
            console.log("Error removing adddress in database", error.message)
            return
        }

        // Refresh addresses from the database
        await get().fetchAddress()
    },

    setFormData: (data) => set((s) => ({ formData: { ...s.formData, ...data } })),
    
}))

