import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useProductStore } from "../store/ProductStore"
import ProductCard from "../components/ProductCard";
import Footer from "../components/Home/Footer";

interface Product {
    id: string;
    name: string;
    slug: string;
    short_description: string;
    details: string;
    price: number;
    category: string;
    subcat: string;
    images: string[];
    colors: string[];
    sizes: string[];
    stock: number;
    rating: number;
    reviews: number;
  }

export default function ProductDetails() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { allProducts, fetchAllProducts } = useProductStore()
    const [product, setProduct] = useState<Product | null>(null)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState("Details")

    const tabs = [
        { slug:"Details"},
        { slug:"Shipping"},
        { slug:"Returns" }
    ]

    const goBack = () => (window.history.length > 1 ? navigate(-1) : navigate("/"))

    

    const handleIncrement = () => {
        setQuantity(quantity + 1)
    } 
    const handleDecrement = () => {
        setQuantity(quantity - 1)
    }

    useEffect(() => {
        if (!allProducts) {
            fetchAllProducts()
            return
        }
        const found = allProducts.find((p) => p.slug === slug) ?? null
        setProduct(found)
        setColor(found?.colors[0] ?? "")
    }, [allProducts, slug])

    if (!product) return null

    const recommendedProducts = allProducts!.filter(
        (p) => p.category === product.category && p.id !== product.id
    )

    return (
        <div>

        <main className="max-w-7xl mx-auto px-4 py-8 mt-10 md:mt-16 ">
            {/* heading */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-7 text-sm">
                <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-950 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="w-4 h-4"
                    >
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                    Back to Shop
                </button>
                <p className="text-xs text-neutral-400">
                    Home <span className="mx-2">/</span> {product?.category}
                    <span className="mx-2">/</span>
                    <span className="text-neutral-700">{product?.name}</span>
                </p>
            </div>

            {/* product details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                <section className="flex-col-reverse flex lg::flex-col gap-5" >
                    <div className="grid grid-cols-3 gap-6 md:flex flex-col md:gap-3">
                        { product.images.map((i) => (
                        <div key={i} className="h-[70px] lg:h-[120px] w-[100px] rounded-xl  border-2 p-0.5 transition border-neutral-950">
                            <img src={i} alt="" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        )) }
                        
                    </div>

                    <div className="relative h-[250px] md:h-[350px] lg:h-[600px] w-full ">
                        <p className="absolute top-4 left-4 z-50 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-[.16em] font-semibold">considered design</p>
                        <img src={product?.images[0]} alt="" className="relative w-full h-full object-cover rounded-3xl"/>
                    </div>
                </section>
                
                <section >
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mb-4"><span className="text-[10px] uppercase tracking-[.2em] text-neutral-500">{product?.category} /  {product?.subcat}</span><span className="w-1 h-1 rounded-full bg-neutral-300"></span><span className="text-[10px] uppercase tracking-[.2em] text-neutral-500">Item No. {product?.id} </span></div>

                    {/*product name  */}
                    <h1 className="text-2xl md:text-3xl sm:text-4xl xl:text-[2.4rem] leading-[1.08] font-semibold tracking-tight">{product?.name} </h1>

                    <div className="flex flex-wrap items-center gap-3 mt-4"><span className="text-amber-500 tracking-[.12em] text-sm">★★★★★</span><span className="text-sm font-medium">{product?.rating} </span><span className="text-sm text-neutral-400">Based on {product?.reviews} reviews</span></div>

                    <div className="flex items-end gap-3 mt-6"><p className="text-2xl text-black font-semibold tracking-tight">${product?.price.toFixed(2)} </p><span className="text-xs text-neutral-500 mb-1">USD · Taxes included</span></div>

                    <p className="text-sm leading-6 text-neutral-600 mt-5 max-w-xl">{product?.short_description} </p>
                    {/* colors */}
                    <div className="border-t border-neutral-200 mt-7 pt-5">
                        <div className="flex flex-col  justify-between mb-3">
                            <span className="flex justify-between">
                                <p className="text-sm font-medium">
                                    {product?.colors.length < 1 ? "Color" : "Colors"} /
                                    <span className="text-neutral-500 font-normal"> {product?.colors.join("   -  ")} </span>
                                </p>
                                <p className="text-xs gray-muted" >{ product.colors.length } {product?.colors.length < 1 ? "Color" : "Colors"}</p>
                            </span>
                            
                            
                            <span className="flex gap-6 mt-5">
                            { product?.colors.map((c) => (
                                <button onClick={() => setColor(c)} className={`w-9 h-9 rounded-full ring-2 ring-offset-2 ${color === c ? "ring-neutral-950 border border-neutral-200" : "ring-[#E5E5E5] "}  grid place-items-center`} key={c}
                                title={c}
                                aria-label={c}
                                style={{ backgroundColor: c }}            >
                                    { color === c ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check" className="lucide lucide-check w-3.5 h-3.5 text-neutral-950"><path d="M20 6 9 17l-5-5"></path></svg>) : "" }
                                    
                                </button>
                            ) ) }
                            </span>
                        </div>    
                    </div>    
                    {/* size */}
                    <div className="mt-6">
                        <p className="text-sm text-black font-medium mb-3">Select size</p>
                        <span className="grid grid-cols-5 gap-4">
                            { product?.sizes.map((s) => (
                                <button onClick={() => setSize(s)} key={s} className={`h-11 rounded-xl border text-sm font-medium transition hover:border-neutral-950 ${size === s ? "bg-black text-white" :"border-neutral-200 "} `} >{s} </button>
                            )) } 
                        </span>
                    </div>
                    {/* cart btn */}
                    <div className="mt-7 flex gap-3">
                            <div className="h-12 shrink-0 flex items-center rounded-xl border border-neutral-200">
                            <button disabled={quantity == 1 } onClick={handleDecrement} aria-label="Decrease quantity" className={`w-10 h-full text-lg hover:bg-neutral-50 rounded-l-xl ${quantity === 1 ? "cursor-not-allowed": ""} `}>−</button>
                            <span className="w-7 text-center text-sm ">{quantity} </span>
                            <button onClick={handleIncrement} aria-label="Increase quantity" className="w-10 h-full text-lg hover:bg-neutral-50 rounded-r-xl">+</button>
                        </div>
                        <button className="btn flex-1 h-12 rounded-xl inline-flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="shopping-bag" className="lucide lucide-shopping-bag w-4 h-4"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>Add to bag · $35.00</button>
                    </div>
                    {/* watchlist */}
                    <button className="mt-3 w-full h-11 rounded-xl border border-neutral-200 text-sm font-medium flex items-center justify-center gap-2 hover:bg-neutral-50 transition"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="heart" className="lucide lucide-heart w-4 h-4"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>Add to wishlist</button>
                    {/* info */}
                    <div className="mt-7 rounded-2xl bg-neutral-50 p-4 sm:p-5 space-y-4"><div className="flex gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="truck" className="lucide lucide-truck w-4 h-4 mt-0.5 text-neutral-500"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg><div><p className="text-sm font-medium">Complimentary shipping</p><p className="text-xs text-neutral-500 mt-1">Free standard delivery on orders over $100.</p></div></div><div className="flex gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="refresh-ccw" className="lucide lucide-refresh-ccw w-4 h-4 mt-0.5 text-neutral-500"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg><div><p className="text-sm font-medium">30-day returns</p><p className="text-xs text-neutral-500 mt-1">Try it at home. Return eligible items within 30 days.</p></div></div><div className="flex gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="shield-check" className="lucide lucide-shield-check w-4 h-4 mt-0.5 text-neutral-500"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg><div><p className="text-sm font-medium">Thoughtfully selected</p><p className="text-xs text-neutral-500 mt-1">Made for everyday use, chosen to last.</p></div></div></div>

                </section>
            </div>

            {/* info shipping */}
            <section className="mt-14 sm:mt-20 border-t border-neutral-200 pt-7">
                <span className="flex gap-6 sm:gap-9 border-b border-neutral-200 overflow-x-auto">
                    { tabs.map((t) => (
                        <button onClick={() => {setActiveTab(t.slug)}} key={t.slug} className={`shrink-0 pb-4 text-sm  font-medium ${ activeTab === t.slug && "border-b-2 border-neutral-950" }`}>{t.slug} </button>
                        
                    )) }
                </span>
                { activeTab === "Details" && (
                        <div className="grid md:grid-cols-[180px_1fr] gap-3 py-6 sm:py-8">
                            <h3 className="font-semibold text-base">Product details</h3>
                            <p className="text-sm leading-7 text-neutral-600 max-w-3xl">{product.details}</p>
                        </div>
                    ) }
                    { activeTab === "Shipping" && (
                        <div className="grid md:grid-cols-[180px_1fr] gap-3 py-6 sm:py-8">
                            <h3 className="font-semibold text-base">Shippiing Information</h3>
                            <p className="text-sm leading-7 text-neutral-600 max-w-3xl">Free standard shipping on orders over $100. Delivered in 3–5 business days.</p>
                        </div>
                    ) }
                    { activeTab === "Returns" && (
                        <div className="grid md:grid-cols-[180px_1fr] gap-3 py-6 sm:py-8">
                            <h3 className="font-semibold text-base">Returns & Eexchanges</h3>
                            <p className="text-sm leading-7 text-neutral-600 max-w-3xl">Return any unworn item within 30 days for a full refund. Prepaid label included.</p>
                        </div>
                    ) }
                    

            </section>

            {/*recommended  */}
            <div className="mt-10 border-t border-neutral-200 pt-8">
                <div className="flex items-end justify-between gap-4 mb-5">
                    <div>
                        <p className="text-[10px] uppercase tracking-[.2em] text-neutral-500 mb-2">Keep exploring</p>
                        <h2 className="text-2xl font-semibold tracking-tight">You may also like</h2>
                    </div>
                    <NavLink to={`/${product.category.toLocaleLowerCase()}`} className="text-sm underline underline-offset-4">View all</NavLink>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 ">
                    { recommendedProducts.slice(5,9).map((p) => (
                        <ProductCard key={p.id} product={p} />
                    )) }
                </div> 
            </div>
        </main>
        <Footer />

        </div>

    )
}