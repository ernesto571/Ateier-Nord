import { useEffect } from "react";
import Sidebar from "../../components/Sidebar.";
import { useProductStore } from "../../store/ProductStore";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Home/Footer";

export default function AllProducts () {

    const { allProducts, fetchAllProducts, productsLoading } = useProductStore()

    useEffect(() => {
        fetchAllProducts()
    }, [])

    return(
        <main>
            <div  className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 md:gap-6  lg:gap-10 mt-10 md:mt-16"> 

                <section className="sidebar ">
                    <Sidebar />
                </section>

                <section className="col-span-2 lg:col-span-3 md:h-screen overflow-y-auto">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
                        <div>
                            <p className="text-[10px] uppercase tracking-[.2em] text-neutral-500 mb-2">Curated essentials</p>
                            <h2 id="lt" className="text-2xl md:text-3xl font-semibold tracking-tight">All Products ({allProducts?.length})</h2>
                        </div>
                        <select id="fs" aria-label="Sort products" className="h-10 rounded-xl border border-neutral-200 bg-white px-3 text-sm self-start sm:self-auto">
                            <option value="f">Featured</option>
                            <option value="pl">Price: Low To High</option>
                            <option value="ph">Price: High To Low</option>
                            <option value="r">Top Rated</option>
                        </select>
                    </div> 

                    { productsLoading ? (
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
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ">
                            { allProducts?.map((p) => (
                            <ProductCard key={p.id} product={p} />
                            )) }
                        </div>  
                    )}
                    
                </section>

            </div>

            <Footer />
        </main>
    )
}
                                                                            