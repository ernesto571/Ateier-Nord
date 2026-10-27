import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/CartStore";
import { useState } from "react";
import Cart from "../pages/Category/Cart";
import { useWishlistStore } from "../store/Wishlist";

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
    rating: number;
    colors: string[];
    sizes: string[];
}

interface ProductCardProps {
    product: Product;
}

export default function ( { product }: ProductCardProps ) {

    const navigate = useNavigate()
    const addItem = useCartStore((s:any) => s.addItem)
    const { addWishlistItem, removeItem } = useWishlistStore()
    const [showCart, setShowCart] = useState(false)

    const isWishlisted = useWishlistStore((s) =>
        s.wishlistItems.some((i) => i.product_id === product?.id)
    )

    const handleClick = ( productSlug: string ) => {
        navigate(`/${productSlug}`);
    };

    const handleWishlist = (e: any) => {
        e.stopPropagation()
        isWishlisted ? removeItem(product.id) : addWishlistItem({ product_id:product.id, product_name:product.name, slug:product.slug, price:product.price, rating:product.rating, images:product.images })
    }
    const qty = 1

    const addToCart = () => {
        addItem({ product_id: product.id, name: product.name, price: product.price, image: product.images[0], color: product.colors[0], size: product.sizes[0], quantity: qty })
        setShowCart(true)
    }

    return(
        <div className="relative rounded-xl border p-1.5 md:p-2.5 group hover:shadow-md">
            <div onClick={() => handleClick(product.slug)} className="relative group hover:cursor-pointer">
                <button onClick={handleWishlist} className="absolute z-10 top-3 right-2 bg-white p-2 rounded-full ">
                { isWishlisted ? (
                    <Heart className="size-4 fill-black text-black" /> 
                ) : (
                    <Heart className="size-4 text-black"/>
                ) } 
                    
                </button>
                <div className="relative  overflow-hidden rounded-lg h-[150px] md:h-[180px] lg:h-[200px] ">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className=" h-full w-full object-cover  transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                </div>
            <span className="absolute w-full text-xs hidden  text-center group-hover:flex bottom-3">
                <p className="w-[90%] mx-auto bg-white/85 py-2.5 text-black rounded-lg transition-transform duration-200 ease-in-out">Quick View</p>
            </span>

            </div>
            

            <div className="relative flex flex-col gap-1 md:gap-2 py-2 px-1">
                <span className="flex flex-col md:flex-row justify-between font-medium gap-1 md:gap-3 text-sm md:text-[0.9rem] text-black">
                    <h3 className="truncate">{product.name}</h3>
                    <h3>${product.price.toFixed(2)} </h3>
                </span>
                <span className="flex flex-col md:flex-row justify-between gap-2 md:items-center ">
                    <p className="text-xs font-semibold">★ {product.rating.toFixed(1)} </p>
                    <button onClick={addToCart} className="bg-black text-xs lg:text-sm text-white py-2 px-3 rounded-lg" >Add To Cart</button>
                </span>
            </div>
        {showCart && <Cart onClose={() => setShowCart(false)} />}
        </div>
    )
}