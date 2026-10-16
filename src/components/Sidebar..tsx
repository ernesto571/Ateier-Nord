import { Footprints, Headphones, LayoutGrid, Shirt, Watch } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function  Sidebar () {
    const categories  = [
        {icon: LayoutGrid, label:"All", length:8, to:"/all", end:true},
        {icon: Shirt, label:"Apparel", length:3, to:"/apparel" },
        {icon: Footprints, label:"Footwear", length:2, to:"/footwear" },
        {icon: Watch, label:"Accessories", length:5, to:"/accessories"},
        {icon: Headphones, label:"Tech", length:8, to:"/tech"}
    ]

    return (
        <main>
            <div className="border-default py-6 px-5 rounded-2xl space-y-6 bg-[#fafafa] ">

                <div className="flex justify-between items-center">
                    <span>
                        <p className="text-[10px] uppercase tracking-[.2em] text-neutral-500">REFINE OUR EDIT</p>
                        <h2 className="font-semibold text-base mt-1">Filters</h2>
                    </span>
                    <span className="grid place-items-center w-9 h-9 rounded-xl bg-white border border-neutral-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="sliders-horizontal" className="lucide lucide-sliders-horizontal w-4 h-4"><line x1="21" x2="14" y1="4" y2="4"></line><line x1="10" x2="3" y1="4" y2="4"></line><line x1="21" x2="12" y1="12" y2="12"></line><line x1="8" x2="3" y1="12" y2="12"></line><line x1="21" x2="16" y1="20" y2="20"></line><line x1="12" x2="3" y1="20" y2="20"></line><line x1="14" x2="14" y1="2" y2="6"></line><line x1="8" x2="8" y1="10" y2="14"></line><line x1="16" x2="16" y1="18" y2="22"></line></svg></span>
                </div>

                <section>
                    <p className="text-xs tracking-[.15em] text-neutral-500 font-semibold mb-3">SHOP BY CATEGORY</p>

                    <div>
                        { categories.map((c) => {

                            const Icon = c.icon
                            return (
                                <NavLink to={c.to} key={c.to} className= {({ isActive }) => `flex justify-between items-center px-4 py-3 text-sm  ${isActive ? "text-white bg-black rounded-xl" : "text-black"} `}>
                                    <span className="flex gap-2.5 items-center">
                                        <Icon className="w-5 h-4 shrink-0" />
                                        <span >{c.label} </span>
                                    </span>
                                    <span className=" text-xs">{c.length} </span>
                                </NavLink>
                            )
                        }) }
                    </div>
                </section>
                {/* price slider */}
                <div className="border-t border-gray pt-3 space-y-3">
                    <span className="flex justify-between text-sm">
                        <h3 className=" font-semibold">Price Range</h3>
                        <p>$300</p>
                    </span>
                    <input type="range" step="10" min="20" max="500" value="500" className="price-slider w-full " />
                    <span className="flex justify-between text-xs">
                        <p>$20</p>
                        <p>$500</p>
                    </span>
                </div>
                {/* customer rating */}
                <div className="border-t border-gray pt-3 space-y-3">
                    <h3 className="font-semibold text-sm">Customer Rating</h3>
                    <select name="Customer Rating" id="" className="w-full py-3 rounded-lg border-default text-sm text-black bg-white px-4">
                        <option>Any Rating</option>
                        <option>4+ stars</option>
                        <option>4.5+ stars</option>
                    </select>
                </div>
                <div className="border-t border-gray pt-4 text-sm ">
                <button  className="w-full h-10 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 transition flex items-center justify-center gap-2 font-medium"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="rotate-ccw" className="lucide lucide-rotate-ccw w-3.5 h-3.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>Reset all filters</button>
                </div>
            </div>
        </main>
    )
}