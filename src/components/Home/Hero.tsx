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
            <main className="lg:min-h-screen py-14 grid  grid-cols-1 lg:grid-cols-2 items-center px-5 md:px-14 bg-white">
                <section>
                    <div className="flex gap-3 mt-7 md:mt-14 items-center pb-3">
                    <span className="w-8 h-px bg-neutral-950"></span>
                    <p className="text-xs uppercase tracking-wide md:tracking-[.24em] text-neutral-500">ATELIER NORD / THE EVERYDAY EDIT</p>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-semibold leading-[.9] tracking-[-.06em] flex flex-col">
                        <span >Good finds.</span>
                        <span>Every</span>
                        <span>Kind.</span>
                    </h1>
                    <p className=" mt-7 gray max-w-md leading-7">From style and accessories to tech and everyday essentials, discover useful things, fresh finds, and little upgrades for life. One easy place to find your next favorite.</p>

                    <span className=" flex gap-3 md:gap-6 items-center mt-7">
                        <button className="btn text-nowrap hover:bg-[#262626] transition duration-200 ease-in-out ">
                            Explore the store 
                            <span className="ml-3">↗</span>
                        </button>

                        <a href="#" className="text-sm  text-nowrap underline underline-offset-4 decoration-neutral-400">Browse all categories</a>
                    </span>

                    <span className="flex gap-9 mt-7">
                        { info.map((i) => (
                            <div  className="flex flex-col " key={i.label}>
                                <h3 className="md:text-2xl font-bold">{i.value} </h3>
                                <p className="gray-muted text-xs md:text-sm">{i.label} </p>
                            </div>
                        )) }
                    </span>
                </section>

                <div className="hidden lg:flex order-1 lg:order-2 relative min-w-0 mt-7">
                    <div className="grid grid-cols-[1.15fr_.85fr] gap-3 md:gap-4 items-end">
                        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-100 aspect-[4/5]">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&amp;q=85" className="w-full h-full object-cover kb" alt="Wireless headphones from the tech collection" />
                        <div className="absolute bottom-4 left-4 text-white text-xs uppercase tracking-[.2em] drop-shadow">The tech edit</div>
                        </div>
                        <div className="flex flex-col gap-3 md:gap-4 pb-8 md:pb-12">
                        <div className="rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-100 aspect-[4/5]"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&amp;q=85" className="w-full h-full object-cover" alt="Everyday wristwatch" /></div>
                        <div className="rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-100 aspect-square"><img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&amp;q=85" className="w-full h-full object-cover" alt="Everyday carry backpack" /></div>
                        </div>
                    </div>
                    <button  className="absolute left-2 md:left-5 bottom-2 md:bottom-5 max-w-[calc(100%-1rem)] bg-white border border-neutral-200 rounded-xl md:rounded-2xl p-2.5 md:p-3 pr-4 shadow-md flex gap-3 items-center text-left hover:-translate-y-1 transition-transform"><span className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden shrink-0"><img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&amp;q=80" className="w-full h-full object-cover" alt="" /></span><span className="text-xs"><b className="block text-sm">Studio Wireless Headphones</b><span className="text-neutral-500">Sound, without the fuss</span><span className="block mt-1">$179.00 <span className="ml-2">↗</span></span></span></button>
                    <div className="absolute right-0 top-0 md:top-4 bg-white border border-neutral-200 rounded-full px-3 py-2 text-[10px] md:text-xs tracking-wide shadow-sm">GOOD THINGS, ALL IN ONE PLACE</div>
                </div>
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

            <section className="hidden lg:flex py-3 border-b border-[#E5E5E5] " >
                <span className="w-full text-base flex gap-3 md:gap-14 uppercase justify-center  tracking-wider">
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