import { create } from "zustand"
import { supabase } from "../lib/supabase-client";
import toast from "react-hot-toast";

interface FormData {
  name?: string;
  email: string;
  password: string;
}

export interface User {
    name: string
    email: string
}

interface AuthStroe {
    user: User | null;
    isLoading: boolean
      error: string | null;
    formData: FormData
    signUp : (data: FormData) => Promise<void>
    login : (data: FormData) => Promise<void>
    logout: () => Promise<void>
    setFormData: (data: Partial<FormData>) => void;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  password: '',
};

export const useAuthStore = create<AuthStroe>((set) => ({
    user: null,
    isLoading: false,
    formData: initialFormData, 
    error: null,

    signUp: async (data) => {
        set({isLoading: true})

        try {
            const { error } = await supabase.auth.signUp({
                email: data.email, password: data.password, 
                options: {
                    data: {
                      display_name: data.name,
                    },
                },
            })
            if (error) {
                set({ error: error.message, isLoading: false });
                console.error(error.message)
                return;
            }
        } catch (err: any) {
            console.error("🔴 signUp : failed", err.message)
          } finally {
            set({ isLoading: false });
        }
            
    },

    login: async (data) => {
        set({isLoading: true})

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email, password: data.password, 
            })
            if (error) {
                set({ error: error.message, isLoading: false });
                console.error(error.message)
                return;
            }
        } catch (err: any) {
            console.error("🔴 signIn : failed", err.message)
          } finally {
            set({ isLoading: false });
        }
            
    },

    logout: async () => {
        set({ isLoading: true })
        try {
            const { error } = await supabase.auth.signOut()
            if (error) { toast.error(error.message) }
            toast.success("Signed out.")
        } catch (err: any) {
            toast.error("Something went wrong. Please try again.")
            console.error("🔴 logout : failed", err.message)
        } finally {
            set({ isLoading: false })
        }
    },

    setFormData: (data) => set((s) => ({ formData: { ...s.formData, ...data } })),

}))