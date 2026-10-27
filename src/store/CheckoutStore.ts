
import { create } from "zustand"
import { supabase } from "../lib/supabase-client"
import { useProfileStore } from "./ProfileStore"
import { useAddressStore } from "./AddresStore"
import toast from "react-hot-toast"

interface FormData {
    name: string
    email: string
    address: string
    city: string
    postal_code: string
}

interface CheckoutStore {
    isLoading: boolean
    error: string | null
    order_number: string
    order_total: number
    client_secret: string | null
    formData: FormData
    initializeFormData: () => Promise<void>
    checkout: (coupon_code: string, data: FormData) => Promise<void>
    setFormData: (data: Partial<FormData>) => void
}

const initialFormData: FormData = {
    name: "",
    email: "",
    address: "",
    city: "",
    postal_code: ""
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
    isLoading: false,
    error: null,
    client_secret: null,
    order_number: "",
    order_total: 0,
    formData: initialFormData,

    initializeFormData: async () => {
        try {
            await Promise.all([
                useProfileStore.getState().fetchProfile(),
                useAddressStore.getState().fetchAddress()
            ])

            const profile = useProfileStore.getState().profile
            const addressList = useAddressStore.getState().addressList

            const defaultAddress = addressList?.find(
                (a) => a.is_default === true
            )

            set({
                formData: {
                    name: profile?.name ?? "",
                    email: profile?.email ?? "",
                    address: defaultAddress?.street_address ?? "",
                    city: defaultAddress?.city ?? "",
                    postal_code: defaultAddress?.postal_code ?? ""
                }
            })
        } catch (err: any) {
            console.error("Error initializing checkout form:", err.message)
            toast.error("Could not load your checkout details")
        }
    },

    checkout: async (coupon_code, data) => {
        set({ isLoading: true, error: null })

        try {
            const { data: checkoutData, error: checkoutError } =
                await supabase.functions.invoke("checkout", {
                    body: {
                        shipping: {
                            name: data.name,
                            email: data.email,
                            address: data.address,
                            city: data.city,
                            postal_code: data.postal_code
                        },
                        coupon: coupon_code.trim()
                            ? { code: coupon_code.trim() }
                            : null
                    }
                })

            if (checkoutError) {
                set({
                    error: checkoutError.message,
                    isLoading: false
                })
                console.error("Checkout error:", checkoutError.message)
                return
            }

            console.log("Order created successfully:", checkoutData)

            set({
                order_number: checkoutData.orderNumber,
                order_total: checkoutData.total
            })

            const { data: paymentData, error: paymentError } =
                await supabase.functions.invoke("create-payment-session", {
                    body: {
                        orderId: checkoutData.orderId
                    }
                })

            if (paymentError) {
                set({
                    error: paymentError.message,
                    isLoading: false
                })
                console.error("Payment initialization error:", paymentError.message)
                return
            }

            if (!paymentData?.success || !paymentData?.clientSecret) {
                const message = paymentData?.error ?? "Could not initialize payment"

                set({
                    error: message,
                    isLoading: false
                })

                toast.error("Could not initialize payment. Please try again later.")
                return
            }

            set({
                client_secret: paymentData.clientSecret,
                isLoading: false,
                error: null
            })

            console.log("Payment session created successfully")
        } catch (err: any) {
            console.error("Error in checkout function:", err.message)

            set({
                error: err.message ?? "An unexpected error occurred",
                isLoading: false
            })
        }
    },

    setFormData: (data) =>
        set((state) => ({
            formData: {
                ...state.formData,
                ...data
            }
        }))
}))
