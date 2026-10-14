export default function Review () {

    return(
        <main className="sect-main">
            <h2 className="text-2xl font-semibold mb-6">Our Promise</h2>

            <div className=" grid md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-neutral-200 p-6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="shopping-bag" className="lucide lucide-shopping-bag mb-4"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg><h3 className="font-semibold">1. Order In Minutes</h3><p className="text-sm text-neutral-600 mt-1">Secure checkout with no account required.</p></div>

                <div className="rounded-2xl border border-neutral-200 p-6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="truck" className="lucide lucide-truck mb-4"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg><h3 className="font-semibold">2. Delivered In 3–5 Days</h3><p className="text-sm text-neutral-600 mt-1">Tracked, carbon-neutral shipping on every parcel.</p></div>

                <div className="rounded-2xl border border-neutral-200 p-6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="rotate-ccw" className="lucide lucide-rotate-ccw mb-4"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg><h3 className="font-semibold">3. Return Within 30 Days</h3><p className="text-sm text-neutral-600 mt-1">Prepaid label. Full refund. No questions asked.</p></div>
            </div>

            {/* reviews */}
            <div className="mt-14">
                <h2 className="text-2xl font-semibold mb-6">What Customers Say</h2>
                <div className="stg grid md:grid-cols-3 gap-4">

                    <figure className="rounded-2xl border border-neutral-200 p-6"><p className="text-sm">★★★★★</p><blockquote className="mt-3 text-sm text-neutral-700">The jacket fits perfectly and the leather feels like it will last forever. Easily my best purchase this year.</blockquote><figcaption className="mt-4 text-xs text-neutral-500"><b className="text-neutral-950">Adaeze O.</b> · Verified Buyer</figcaption></figure>

                    <figure className="rounded-2xl border border-neutral-200 p-6"><p className="text-sm">★★★★★</p><blockquote className="mt-3 text-sm text-neutral-700">Headphones arrived in two days. Battery life is real and the sound is balanced and clean.</blockquote><figcaption className="mt-4 text-xs text-neutral-500"><b className="text-neutral-950">Tunde A.</b> · Verified Buyer</figcaption></figure>

                    <figure className="rounded-2xl border border-neutral-200 p-6"><p className="text-sm">★★★★☆</p><blockquote className="mt-3 text-sm text-neutral-700">Lovely backpack, great organisation. Returns were painless when I swapped for a different color.</blockquote><figcaption className="mt-4 text-xs text-neutral-500"><b className="text-neutral-950">Chioma E.</b> · Verified Buyer</figcaption></figure>
                </div>
            </div>

            {/* gallery */}
            <div className="mt-14">
                <div className="flex justify-between items-end mb-6"><h2 className="text-2xl font-semibold">#AtelierNord</h2><span className="text-sm text-neutral-500">Tag Us To Be Featured</span></div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3" id="h-ugc">

                    <div className="rounded-2xl border border-neutral-200 p-1.5">
                        <div className="aspect-square rounded-xl overflow-hidden ph"><img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&amp;q=80" alt="Customer photo" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" /></div>
                        
                    </div>

                    <div className="rounded-2xl border border-neutral-200 p-1.5">
                        <div className="aspect-square rounded-xl overflow-hidden ph"><img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&amp;q=80" alt="Customer photo" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" /></div>
                    </div>

                    <div className="rounded-2xl border border-neutral-200 p-1.5">
                        <div className="aspect-square rounded-xl overflow-hidden ph"><img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&amp;q=80" alt="Customer photo" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" /></div>
                    </div>

                    <div className="rounded-2xl border border-neutral-200 p-1.5">
                        <div className="aspect-square rounded-xl overflow-hidden ph"><img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&amp;q=80" alt="Customer photo" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" /></div>
                    </div>

                </div>
            </div>

        </main>
    )
}