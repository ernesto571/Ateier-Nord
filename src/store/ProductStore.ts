
import { create } from "zustand";
import { supabase } from "../lib/supabase-client";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  subcat: string;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  rating: number;
  reviews: number;
  featured: boolean;
  createdAt?: string;
}

interface ProductStore {
  allProducts: Product[];
  productsLoading: boolean;
  error: string | null;
  fetchAllProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  allProducts: [],
  productsLoading: false,
  error: null,

  fetchAllProducts: async () => {
    set({ productsLoading: true, error: null });

    try {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        set({ error: error.message });
        console.error(error.message)
        return;
      }

      set({ allProducts: data ?? [] });
    } catch (err: any) {
      console.error("🔴 fetchAllProducts : failed", err.message)
    } finally {
      set({ productsLoading: false });
    }
  },
}));
