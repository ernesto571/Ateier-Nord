
import { create } from "zustand"

export interface RecentlyViewedItem {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
    rating: number;
    colors: string[];
    sizes: string[];
}

interface RecentlyViewedStore {
    recentlyViewed: RecentlyViewedItem[];
    addRecentlyViewed: (product: RecentlyViewedItem) => void;
    clearRecentlyViewed: () => void;
}

const STORAGE_KEY = "recently-viewed";
const MAX_ITEMS = 8;

const getSavedItems = (): RecentlyViewedItem[] => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

export const useRecentlyViewedStore = create<RecentlyViewedStore>((set, get) => ({
    recentlyViewed: getSavedItems(),

    addRecentlyViewed: (product) => {
        const updated = [
            product,
            ...get().recentlyViewed.filter(
                (item) => item.id !== product.id
            ),
        ].slice(0, MAX_ITEMS);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        set({ recentlyViewed: updated });
    },

    clearRecentlyViewed: () => {
        localStorage.removeItem(STORAGE_KEY);
        set({ recentlyViewed: [] });
    },
}));
