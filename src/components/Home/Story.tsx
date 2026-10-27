import { useNavigate } from "react-router-dom"

export default function Story () {

    const navigate = useNavigate()

    return (
        <main className="sect-main border-default bg-[#fafafa] ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 items-center">
                <div className="h-[250px] md:h-[300px] lg:h-[400px] border-default p-2 rounded-3xl bg-white">
                    <img className="h-full w-full object-cover rounded-2xl" src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1000&q=80" alt="story-img" loading="lazy" />
                </div>

                <section>

                    <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">OUR STORY</p>
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">A little bit of everything. A lot easier to find.</h1>
                    <p className="mt-4 text-neutral-600 leading-7">We believe shopping should feel simple, inspiring, and worth coming back to. That is why Atelier Nord brings together finds from different corners of everyday life, from apparel and footwear to accessories and tech, all in one place. Browse what you need, discover something unexpected, and make your own kind of good find.</p>

                    <div className="mt-6 grid grid-cols-3 gap-3 text-sm"><div className="rounded-xl border border-neutral-200 bg-white p-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="layers" className="lucide lucide-layers w-5 h-5 mb-3"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path></svg><b className="block">More variety</b><span className="text-xs text-neutral-500">Different categories, one store</span></div><div className="rounded-xl border border-neutral-200 bg-white p-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="search" className="lucide lucide-search w-5 h-5 mb-3"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg><b className="block">Easy discovery</b><span className="text-xs text-neutral-500">Find your next favorite</span></div><div className="rounded-xl border border-neutral-200 bg-white p-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="shopping-bag" className="lucide lucide-shopping-bag w-5 h-5 mb-3"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg><b className="block">Simple shopping</b><span className="text-xs text-neutral-500">Your finds in one place</span></div></div>

                    <button onClick={() => navigate("/all")}  className="btn mt-6">Get To Know The Store <span className="ml-3">↗</span></button>
                </section>
            </div>
        </main>
    )
}