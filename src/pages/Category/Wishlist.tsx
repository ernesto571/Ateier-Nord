
import { useEffect } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Home/Footer";
import ProductCard from "../../components/ProductCard";
import Sidebar from "../../components/Sidebar.";
import { useWishlistStore } from "../../store/Wishlist";
import { useProductStore } from "../../store/ProductStore";

export default function Wishlist() {
  const {
    wishlistItems,
    isLoading,
  } = useWishlistStore();
  const {allProducts} = useProductStore();

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 md:gap-6 lg:gap-10 mt-10 md:mt-16">

        <section className="sidebar">
          <Sidebar />
        </section>

        <section className="col-span-1 md:col-span-2 lg:col-span-3 md:min-h-screen">
          {/* Page heading */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[.2em] text-neutral-500 mb-2">
                Curated essentials
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                My Wishlist ({wishlistItems.length})
              </h2>
            </div>
          </div>

          {/* Loading state */}
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-neutral-200 p-2.5 animate-pulse"
                >
                  <div className="h-[180px] sm:h-[250px] rounded-lg bg-neutral-100" />

                  <div className="py-3 px-1 space-y-3">
                    <div className="h-4 w-3/4 rounded bg-neutral-100" />
                    <div className="flex justify-between items-center">
                      <div className="h-3 w-1/4 rounded bg-neutral-100" />
                      <div className="h-8 w-20 rounded-lg bg-neutral-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : wishlistItems.length === 0 ? (
            /* Empty state */
            <div className="min-h-[55vh] flex flex-col items-center justify-center text-center px-6 py-16 border border-dashed border-neutral-200 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-5">
                <Heart
                  size={28}
                  strokeWidth={1.4}
                  className="text-neutral-500"
                />
              </div>

              <p className="text-[10px] uppercase tracking-[.2em] text-neutral-500 mb-3">
                Your personal collection
              </p>

              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900">
                Your wishlist is empty
              </h3>

              <p className="text-sm text-neutral-500 leading-6 max-w-sm mt-3">
                Found something you love? Save it here and keep all your
                favourite finds in one place.
              </p>

              <Link
                to="/all"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Explore products
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            /* Wishlist products */
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {wishlistItems.map((w) => {
                const item = allProducts!.find((p) => p.id === w.product_id ) 
                return (
                  <ProductCard
                    key={w.product_id}
                    product={{
                        id: w.product_id,
                        name: w.product_name,
                        slug: w.slug,
                        price: w.price,
                        images: w.images,
                        rating: w.rating,
                        colors: item!.colors,
                        sizes: item!.sizes,
                    }}
                />
                )
                
              })}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
