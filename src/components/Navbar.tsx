import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";
import Cart from "../pages/Category/Cart";
import { useWishlistStore } from "../store/Wishlist";


export default function Navbar(){
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false);
    const [showCart, setShowCart] = useState(false)
    const {items, fetchCartItems} = useCartStore()
    const { wishlistItems } = useWishlistStore()
    

    useEffect(() => {
        fetchCartItems()
    }, [])

    useEffect (() => {
        const onScroll = () => {
          setScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return(
        <main className="fixed top-0 left-0 w-screen  transition-all duration-300 z-50">
            {/* <AnnouncementBar /> */}
            
            <nav className={`px-3 lg:px-14 py-2 md:py-3 flex justify-between items-center border-default 
            ${scrolled ? "bg-white/75 backdrop-blur-md shadow-sm"
            : "bg-white"}`}>
                <section className="flex gap-10 ">
                    <NavLink to="/" className=" md:text-lg font-bold tracking-tight  hover:cursor-pointer ease-in-out transform">ATELIER NORD</NavLink>
                    <span className="hidden lg:flex gap-6 items-center">
                        {  navLinks.map((n) => (
                            <NavLink className="text-[#525252] text-[0.9rem] hover:cursor-pointer hover:text-[#0A0A0A] ease-in-out transform" to={n.to} key={n.label}>{n.label} </NavLink>
                        )) }
                    </span>
                </section>

                <section className="flex gap-2 md:gap-5">
                    {/* search bar */}
                    <div className="hidden max-w-md ml-auto relative"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="search" className="lucide lucide-search w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                    <input placeholder="Search Products" className="w-[400px] h-10 pl-9 pr-3 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"/></div>

                    <button onClick={() => navigate("/wishlist")} className="relative p-2" aria-label="Wishlist"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="heart" className="lucide lucide-heart w-5 h-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg><b id="wc" className="absolute -top-0.5 -right-0.5 bg-neutral-950 text-white text-[10px] rounded-full w-4 h-4 grid place-items-center bump">{wishlistItems.length} </b></button>

                    <button onClick={() => navigate("/profile")} className="p-2" aria-label="Account"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="user" className="lucide lucide-user w-5 h-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></button>

                    <button onClick={() => setShowCart(true)} className="relative p-2" aria-label="Cart"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="shopping-bag" className="lucide lucide-shopping-bag w-5 h-5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg><b id="cc" className="absolute -top-0.5 -right-0.5 bg-neutral-950 text-white text-[10px] rounded-full w-4 h-4 grid place-items-center">{items.length}</b></button>
                </section>
                {showCart && <Cart onClose={() => setShowCart(false)} />}

            </nav>
        </main>

    )
}     
