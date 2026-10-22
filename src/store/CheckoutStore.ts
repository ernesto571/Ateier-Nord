import { create } from "zustand"
import { supabase } from "../lib/supabase-client"
import { useProfileStore } from "./ProfileStore";

// interface Order {
//     id: string;
//     order_number: string;
// }

interface FormData {
    name: string;
    email: string;
    address: string;
    city: string;
    postal_code: string;
}

interface CheckoutStore {
    isLoading: boolean;
    error: string | null;
    formData: FormData
    checkout: (coupon_code: string, data:FormData) => Promise<void>
    setFormData: (data: Partial<FormData>) => void;
}

await useProfileStore.getState().fetchProfile();
const profile = useProfileStore.getState().profile

const initialFormData: FormData = {
    name: profile ? profile.name : "",
    email: profile ? profile.email : "",
    address: '',
    city: '',
    postal_code: '',
};

export const useCheckoutStore = create <CheckoutStore>((set) => ({
    isLoading: false,
    error: null,
    formData: initialFormData,
    
    checkout: async (coupon_code, data) => {
        set({isLoading: true, error: null})

        try {
            const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke("checkout", {
                body: {
                    shipping: {
                      name: data.name,
                      email: data.email,
                      address: data.address,
                      city: data.city,
                      postal_code: data.postal_code,
                    },
                    coupon: coupon_code.trim()
                      ? { code: coupon_code.trim() }
                      : null,
                  },
            } )

            if (checkoutError){
                set({error: checkoutError, isLoading:false})
                console.log(checkoutError.message)
            }
            set({isLoading: false, error: null})
            console.log("Order added to databse successfully ", checkoutData ) 
        } catch (err: any) {
            console.log("Error in checkout function", err.message)
        }
        set({isLoading: false})

    },

    setFormData: (data) => set((s) => ({ formData: { ...s.formData, ...data } })),

}))