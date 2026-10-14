export default function Hero () {

    const info = [
        {value:"4.9★", label:"Average Rating"},
        {value:"12k+", label:"Happy Customers"},
        {value:"30 Days", label:"Free Returns"}
    ]

    const slide = [
        {text:"New Season Arrivals ✦"},
        {text:"Free Shipping Over $100 ✦"},
        {text:"30-Day Returns ✦"},
        {text:"Code SAVE10 For 10% Off ✦"},
        {text:"Built To Last ✦"},
        {text:"New Season Arrivals ✦"},
        {text:"Free Shipping Over $100 ✦"},
        {text:"30-Day Returns ✦"},
        {text:"Code SAVE10 For 10% Off ✦"},
        {text:"Built To Last ✦"},
    ]

    return (
        <div>
            <main className="min-h-screen py-14 grid grid-cols-2 items-center px-14 bg-white">
                <section>
                    <div className="flex gap-3 mt-14 items-center pb-3">
                    <span className="w-8 h-px bg-neutral-950"></span>
                    <p className="text-xs uppercase tracking-[.24em] text-neutral-500">ATELIER NORD / THE EVERYDAY EDIT</p>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-semibold leading-[.9] tracking-[-.06em] flex flex-col">
                        <span >Good finds.</span>
                        <span>Every</span>
                        <span>Kind.</span>
                    </h1>
                    <p className=" mt-7 gray max-w-md leading-7">From style and accessories to tech and everyday essentials, discover useful things, fresh finds, and little upgrades for life. One easy place to find your next favorite.</p>

                    <span className=" flex gap-6 items-center mt-7">
                        <button className="btn hover:bg-[#262626] transition duration-200 ease-in-out ">
                            Explore the store 
                            <span className="ml-3">↗</span>
                        </button>

                        <a href="#" className="text-sm underline underline-offset-4 decoration-neutral-400">Browse all categories</a>
                    </span>

                    <span className="flex gap-9 mt-7">
                        { info.map((i) => (
                            <div  className="flex flex-col " key={i.label}>
                                <h3 className="text-2xl font-bold">{i.value} </h3>
                                <p className="gray-muted text-sm">{i.label} </p>
                            </div>
                        )) }
                    </span>
                </section>
            </main>
            {/* slide */}
            <section className="py-3 overflow-hidden bg-black border-y-2 ">
                <div className="flex w-max animate-marquee gap-14">
                    {/* Render twice for seamless looping */}
                    {[...slide, ...slide].map((s, i) => (
                    <span key={i} className="flex gap-4 text-sm  items-center">
                        <p className="text-white  whitespace-nowrap">{s.text}</p>
                    </span>
                    ))}
                </div>
            </section>

            <section className="py-3 border-default" >
                <span className="w-full flex gap-14 uppercase justify-center  tracking-wider">
                    <h3>One store, more to explore</h3>
                    <p>Apparel</p>
                    <p>Footwear</p>
                    <p>Accessories</p>
                    <p>Tech</p>
                    <p>Everyday finds</p>
                </span>
            </section>
        </div>    
        
    )
}