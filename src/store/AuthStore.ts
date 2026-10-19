import { create } from "zustand"
import { supabase } from "../lib/supabase-client";

export interface User {
    name: string
    email: string
}

interface AuthStroe {
    user: User | null;
    isLoading: boolean
    signUp : (user: User, passwod:string) => Promise<void>
    login : (email:string, password:string) => Promise<void>
}

export const useAuthStore = create<AuthStroe>((set, get) => ({
    user: null,
    isLoading: false,

    signUp: async (user, password) => {
        set({isLoading: true})

        try {
            const { error } = await supabase.auth.signUp({
                email: user.email, password: password, 
                options: {
                    data: {
                      display_name: user.name,
                    },
                },
            })
            if (error) {
                console.error(error.message)
                return;
            }
        } catch (err: any) {
            console.error("🔴 signUp : failed", err.message)
          } finally {
            set({ isLoading: false });
        }
            
    },

    login: async (email, password) => {
        set({isLoading: true})

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email, password: password, 
            })
            if (error) {
                console.error(error.message)
                return;
            }
        } catch (err: any) {
            console.error("🔴 signIn : failed", err.message)
          } finally {
            set({ isLoading: false });
        }
            
    },

}))