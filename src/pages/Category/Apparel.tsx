import { useState } from "react";
import Footer from "../../components/Home/Footer";
import ProductCard from "../../components/ProductCard";
import Sidebar from "../../components/Sidebar.";
import { useProductStore } from "../../store/ProductStore";

export default function Apparel () {

    const {allProducts } = useProductStore()
    const categories = [
        {label:"All Apparel"},
        {label:"Tees & Tops"},
        {label:"Bottoms"},
        {label:"Outerwear"},
        {label:"Activewear"},
    ]

    const [ activeCategory, setActiveCategory ] = useState("All Apparel");

    const apparel = allProducts?.filter(
        (p) => p.category === "Apparel" 
    );

    const filteredApparel = apparel?.filter(
        (a) => activeCategory === "All Apparel" || a.subcat === activeCategory
    )

    return (
        <main>
            <div  className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 md:gap-6 lg:gap-10 mt-14"> 

                <section className="sidebar">
                    <Sidebar />
                </section>

                <section className="col-span-2 lg:col-span-3 md:h-screen overflow-y-auto">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-5">
                        <div>
                            <p className="text-[10px] uppercase tracking-[.2em] text-neutral-500 mb-2">Curated essentials</p>
                            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                            {activeCategory === "All Apparel" ? "Apparel" : activeCategory} (
                            {filteredApparel.length})
                            </h2>
                        </div>
                        <select id="fs" aria-label="Sort products" className="h-10 rounded-xl border border-neutral-200 bg-white px-3 text-sm self-start sm:self-auto">
                            <option value="f">Featured</option>
                            <option value="pl">Price: Low To High</option>
                            <option value="ph">Price: High To Low</option>
                            <option value="r">Top Rated</option>
                        </select>
                    </div> 

                    <span className="flex flex-wrap gap-3 my-4">
                        {categories.map((c) => (
                            <button key={c.label} onClick={() => setActiveCategory(c.label)} className={`py-2 px-5 text-xs lg:text-sm gray-border rounded-2xl ${activeCategory === c.label ? "bg-black text-white" : "border"}`}>
                                {c.label}
                            </button>
                        ))}

                    </span>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ">
                        { filteredApparel.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        )) }
                    </div>                                                                      
                    
                </section>

            </div>

            <Footer />
        </main>
    )
}