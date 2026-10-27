
import { Heart } from "lucide-react"
import { useProductStore } from "../../store/ProductStore"
import { useWishlistStore } from "../../store/Wishlist"
import { useCartStore } from "../../store/CartStore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cart from "../../pages/Category/Cart"

export default function PopularPicks() {
    const { allProducts } = useProductStore()
    const navigate = useNavigate()
    const addItem = useCartStore((s: any) => s.addItem)
    const { wishlistItems, addWishlistItem, removeItem } = useWishlistStore()
    const [showCart, setShowCart] = useState(false)

    const popularPicks = [...(allProducts ?? [])]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4)

    return (
        <main className="sect-main">
            <h2 className="text-2xl font-semibold">Popular Picks</h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 mt-7 gap-3 md:gap-6">
                {popularPicks.map((p, index) => {
                    const isWishlisted = wishlistItems.some(
                        (i) => i.product_id === p.id
                    )

                    const handleClick = (productSlug: string) => {
                        navigate(`/${productSlug}`)
                    }

                    const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation()

                        if (isWishlisted) {
                            removeItem(p.id)
                        } else {
                            addWishlistItem({
                                product_id: p.id,
                                product_name: p.name,
                                slug: p.slug,
                                price: p.price,
                                rating: p.rating,
                                images: p.images
                            })
                        }
                    }

                    const addToCart = () => {
                        addItem({
                            product_id: p.id,
                            name: p.name,
                            price: p.price,
                            image: p.images?.[0] ?? "",
                            color: p.colors?.[0] ?? "",
                            size: p.sizes?.[0] ?? "",
                            quantity: 1
                        })

                        setShowCart(true)
                    }

                    const pos = index + 1

                    return (
                        <div
                            key={p.id}
                            className="relative rounded-xl border p-1.5 md:p-2.5 group transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-fade-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="absolute inset-0 z-10 -left-2 -top-3 flex items-center text-center justify-center bg-black rounded-full w-[25px] h-[25px] md:w-[35px] md:h-[35px] text-white text-xs md:text-sm font-semibold">
                                {pos}
                            </div>

                            <div className="relative group hover:cursor-pointer">
                                <button
                                    onClick={handleWishlist}
                                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                    className="absolute z-10 top-3 right-2 bg-white p-2 rounded-full transition-transform duration-200 hover:scale-110"
                                >
                                    <Heart
                                        className={`size-4 transition-colors ${isWishlisted ? "fill-black text-black" : "text-black"}`}
                                    />
                                </button>

                                <div
                                    onClick={() => handleClick(p.slug)}
                                    className="relative overflow-hidden rounded-lg h-[180px] md:h-[200px] lg:h-[250px]"
                                >
                                    <img
                                        src={p.images?.[0] ?? ""}
                                        alt={p.name}
                                        className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    />
                                </div>

                                <span className="absolute w-full text-xs hidden text-center group-hover:flex bottom-3">
                                    <p className="w-[90%] mx-auto bg-white/85 py-2.5 text-black rounded-lg transition-transform duration-200 ease-in-out">
                                        Quick View
                                    </p>
                                </span>
                            </div>

                            <div className="relative flex flex-col gap-1 md:gap-2 py-2 px-1">
                                <span className="flex flex-col md:flex-row gap-1 justify-between font-medium text-[0.9rem] text-black">
                                    <h3 className="truncate">{p.name}</h3>
                                    <h3>${Number(p.price).toFixed(2)}</h3>
                                </span>

                                <span className="flex flex-col gap-2 md:flex-row justify-between md:items-center">
                                    <p className="text-xs font-semibold">
                                        ★ {Number(p.rating ?? 0).toFixed(1)}
                                    </p>

                                    <button
                                        className="bg-black text-xs lg:text-sm text-white py-2 px-3 rounded-lg transition-all duration-200 hover:bg-neutral-800 active:scale-95"
                                        onClick={addToCart}
                                    >
                                        Add To Cart
                                    </button>
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

            {showCart && <Cart onClose={() => setShowCart(false)} />}
        </main>
    )
}
