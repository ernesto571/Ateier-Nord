import { create } from "zustand"
import { supabase } from "../lib/supabase-client"
import { useProfileStore } from "./ProfileStore";
import toast from "react-hot-toast";
import { useAddressStore } from "./AddresStore";

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
    order_number: string ;
    order_total: number ;
    client_secret: any
    formData: FormData
    checkout: (coupon_code: string, data:FormData) => Promise<void>
    setFormData: (data: Partial<FormData>) => void;
}

await useProfileStore.getState().fetchProfile();
const profile = useProfileStore.getState().profile
await useAddressStore.getState().fetchAddress();

const addressList = useAddressStore.getState().addressList;

const default_address = addressList?.find(
    (a) => a.is_default === true
);

const initialFormData: FormData = {
    name: profile ? profile.name : "",
    email: profile ? profile.email : "",
    address: default_address ? default_address.street_address : "" ,
    city: default_address ? default_address.city : ""  ,
    postal_code: default_address ? default_address.postal_code : ""  ,
};

export const useCheckoutStore = create <CheckoutStore>((set) => ({
    isLoading: false,
    error: null,
    client_secret: null,
    order_number: "",
    order_total: 0,
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
                return
            }
            console.log("Order added to databse successfully ", checkoutData )
            set({order_number: checkoutData.orderNumber, order_total: checkoutData.total}) 
            
            const { data: paymentData, error: paymentError} = await supabase.functions.invoke("create-payment-session", {
                body: {
                  orderId: checkoutData.orderId,
                },
            });
            
            if (paymentError) {
                set({error: paymentError.message, isLoading:false})
                console.log(paymentError.message)
                return
            }

            if (!paymentData?.success || !paymentData.clientSecret) {
                set({error: paymentData?.error, isLoading: false})
                toast.error("Could not initialize payment. Please, try again later")
                return
            }

            console.log("Payment session successfully created ", paymentData.clientSecret ) 
            set({isLoading: false, error: null, client_secret: paymentData.clientSecret})
        } catch (err: any) {
            console.log("Error in checkout function", err.message)
        }
        set({isLoading: false})

    },

    setFormData: (data) => set((s) => ({ formData: { ...s.formData, ...data } })),

}))