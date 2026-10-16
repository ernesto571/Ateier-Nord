import { Heart } from "lucide-react"
export default function PopularPicks () {

    const products = [
        {id:1 , name:"Everyday Backpack", price:"110.00", rating:"4.9", image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80"},
        {id:2 , name:"Heritage Chronograph", price:"249.00", rating:"4.8", image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80"},
        {id:3 , name:"Leather Moto Jacket", price:"90.00", rating:"4.7", image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&q=80"},
        {id:4 , name:"Court Classic Sneaker", price:"150.00", rating:"4.7", image:"https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=80"}
    ]
    return (
        <main className="sect-main">
            <h2 className="text-2xl font-semibold">Popular Picks</h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 mt-7 gap-3 md:gap-6">
                { products.map((p) => (
                    <div key={p.id} className="relative rounded-xl border p-1.5 md:p-2.5 group hover:shadow-md">
                        <div className="absolute inset-0 z-10 -left-2 -top-3 flex items-center text-center justify-center bg-black rounded-full w-[25px] h-[25px] md:w-[35px] md:h-[35px] text-white text-xs md:text-sm font-semibold">{p.id} </div>
                        <div className="relative group hover:cursor-pointer">
                            <button className="absolute z-10 top-3 right-2 bg-white p-2 rounded-full">
                                <Heart className="size-4 text-black"/>
                            </button>
                            <div className="relative  overflow-hidden rounded-lg h-[180px] md:h-[200px] lg:h-[250px] ">
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className=" h-full w-full object-cover  transition-transform duration-500 ease-in-out group-hover:scale-105"
                                />
                            </div>
                        <span className="absolute w-full text-xs hidden  text-center group-hover:flex bottom-3">
                            <p className="w-[90%] mx-auto bg-white/85 py-2.5 text-black rounded-lg transition-transform duration-200 ease-in-out">Quick View</p>
                        </span>

                        </div>
                        

                        <div className="relative flex flex-col gap-1 md:gap-2 py-2 px-1">
                            <span className="flex flex-col md:flex-row gap-1 justify-between font-semibold text-[0.9rem] text-black">
                                <h3 className="truncate">{p.name}</h3>
                                <h3>${p.price} </h3>
                            </span>
                            <span className="flex flex-col gap-1 md:flex-row justify-between md:items-center ">
                                <p className="text-xs font-semibold">★ {p.rating} </p>
                                <button className="bg-black text-sm text-white py-2 px-3 rounded-lg" >Add To Cart</button>
                            </span>
                        </div>
                    </div>
                )) }
            </div>
        </main>
    )
}