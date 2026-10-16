import { Heart } from "lucide-react";

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
    rating: number;
}

interface ProductCardProps {
    product: Product;
}

export default function ( { product }: ProductCardProps ) {

    return(
        <div  className="relative rounded-xl border p-1.5 md:p-2.5 group hover:shadow-md">
            <div className="relative group hover:cursor-pointer">
                <button className="absolute z-10 top-3 right-2 bg-white p-2 rounded-full">
                    <Heart className="size-4 text-black"/>
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
                <span className="flex flex-col md:flex-row justify-between font-semibold gap-1 md:gap-3 text-sm md:text-[0.9rem] text-black">
                    <h3 className="truncate">{product.name}</h3>
                    <h3>${product.price} </h3>
                </span>
                <span className="flex flex-col md:flex-row justify-between gap-2 md:items-center ">
                    <p className="text-xs font-semibold">★ {product.rating} </p>
                    <button className="bg-black text-xs lg:text-sm text-white py-2 px-3 rounded-lg" >Add To Cart</button>
                </span>
            </div>
        </div>
    )
}