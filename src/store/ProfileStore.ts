
import { create } from "zustand";
import { supabase } from "../lib/supabase-client";

interface Profile {
    name: string;
    email: string;
    phone: string;
    created_at: string | number;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
}

interface ProfileStore {
    profile: Profile | null;
    formData: FormData;
    profileLoading: boolean;
    fetchProfile: () => Promise<void>;
    updateProfile: (data: FormData) => Promise<void>;
    deleteAccount: () => Promise<void>;
    setFormData: (data: Partial<FormData>) => void;
}

const initialFormData: FormData = {
    name: "",
    email: "",
    phone: "",
};

export const useProfileStore = create<ProfileStore>((set) => ({
    profile: null,
    profileLoading: false,
    formData: initialFormData,

    fetchProfile: async () => {
        set({ profileLoading: true });

        try {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) throw error;
            if (!user) {
                set({ profile: null });
                return;
            }

            const profile = {
                name: user.user_metadata?.display_name ?? user.user_metadata?.full_name ?? "",
                email: user.email ?? "",
                phone: user.phone ?? "",
                created_at: user.created_at,
            };

            set({
                profile,
                formData: {
                    name: profile.name,
                    email: profile.email,
                    phone: profile.phone,
                },
            });
        } catch (err: unknown) {
            console.error(
                "Fetch profile failed:",
                err instanceof Error ? err.message : err
            );
        } finally {
            set({ profileLoading: false });
        }
    },

    updateProfile: async (data) => {
        set({ profileLoading: true });

        try {
            const { data: { user }, error } =
                await supabase.auth.updateUser({
                    email: data.email,
                    phone: data.phone || undefined,
                    data: {
                        display_name: data.name,
                        full_name: data.name,
                    },
                });

            if (error) throw error;
            if (!user) return;

            const profile = {
                name: user.user_metadata?.display_name ?? "",
                email: user.email ?? "",
                phone: user.phone ?? "",
                created_at: user.created_at,
            };

            set({
                profile,
                formData: {
                    name: profile.name,
                    email: profile.email,
                    phone: profile.phone,
                },
            });

            console.log("Profile updated successfully");
        } catch (err: unknown) {
            console.error(
                "Update profile failed:",
                err instanceof Error ? err.message : err
            );
        } finally {
            set({ profileLoading: false });
        }
    },

    deleteAccount: async () => {
        set({ profileLoading: true });

        try {
            // Calls a secure Supabase Edge Function.
            const { error } = await supabase.functions.invoke(
                "delete-account"
            );

            if (error) throw error;

            await supabase.auth.signOut({ scope: "local" });

            set({
                profile: null,
                formData: initialFormData,
            });

            console.log("Account deleted successfully");
        } catch (err: unknown) {
            console.error(
                "Delete account failed:",
                err instanceof Error ? err.message : err
            );
        } finally {
            set({ profileLoading: false });
        }
    },

    setFormData: (data) =>
        set((state) => ({
            formData: {
                ...state.formData,
                ...data,
            },
        })),
}));
