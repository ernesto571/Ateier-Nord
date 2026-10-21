import { create } from "zustand";
import { supabase } from "../lib/supabase-client";

interface Profile {
    name: string
    email: string
    phone: string
}

interface ProfileStore {
    profile : Profile | null;
    profileLoading: boolean;
    fetchProfile: () => Promise<void>
}

export const useProfileStore = create<ProfileStore>((set) => ({
    profile: null,
    profileLoading: false,

    fetchProfile: async () => {
        set({ profileLoading: true })
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            set({
                profile: {
                    name: user.user_metadata.display_name ?? "",
                    email: user.email ?? "",
                    phone: user.user_metadata.phone ?? "",
                },
            })
        } catch (err: any) {
            console.error("FetchProfile failed", err.message)
        } finally {
            set({ profileLoading: false })
        }
    },
}))