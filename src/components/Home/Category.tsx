
export default function Category (){
    const cat = [
        {label:"Apparel", img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&q=80"},
        {label:"Footwear", img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80"},
        {label:"Accessories", img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80"},
        {label:"Tech", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80"}
    ]

    return(
        <main className="px-14 py-14">
            <h2 className="text-2xl font-semibold">Find Your Kind Of Thing</h2>

            <div className="grid grid-cols-4 mt-9 gap-6">
                { cat.map((c) => (
                    <button key={c.label} className="relative rounded-xl border p-2 group group-hover:cursor-pointer">
                        <div className="relative group overflow-hidden rounded-lg h-[250px] ">
                            <img
                                src={c.img}
                                alt={c.label}
                                className="h-full w-full object-cover  transition-transform duration-500 ease-in-out group-hover:scale-105"
                            />
                        </div>

                        <h3 className="absolute bg-white px-2 py-1.5 text-sm bottom-5 left-5 rounded-lg ">{c.label} </h3>
                    </button>
                )) }
            </div>
        </main>
    )

}