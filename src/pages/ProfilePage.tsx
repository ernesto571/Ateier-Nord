import { useEffect, useState } from "react"
import { useProfileStore } from "../store/ProfileStore"
import { CalendarDays, Heart, LayoutGrid, LogOut, MapPin, Package, Settings, Wallet } from "lucide-react"
import { supabase } from "../lib/supabase-client"
import { useOrderStore } from "../store/OrderStore"
import { useWishlistStore } from "../store/Wishlist"
import { useRecentlyViewedStore } from "../store/RecentlyViewedStore"
import ProductCard from "../components/ProductCard"
import Footer from "../components/Home/Footer"

const formatDate = (created_at: string | number) => {
    return new Date(created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export default function Profile(){

    const { profile, fetchProfile } = useProfileStore()
    const {orders, fetchOrders}= useOrderStore()
    const { wishlistItems } = useWishlistStore()
    const [activeTab, setActiveTab] = useState("overview")
    const first = profile?.name.split(" ")[0].charAt(0)
    const last = profile?.name.split(" ")[1].charAt(0)

    const total = orders.reduce((n, o) => n + o.total , 0)

    const recentlyViewed = useRecentlyViewedStore(
        (state) => state.recentlyViewed
    );

    const tabs = [
        {id:"overview", label:"Overview", icon: LayoutGrid},
        {id:"orders", label:"Orders", icon:Package},
        {id:"addresses", label:"Addresses", icon:MapPin},
        {id:"settings", label:"Settings", icon:Settings},
    ]

    const info = [
        { icon:Package, label:"Orders", value: orders?.length },
        { icon:Heart, label:"Wishlist", value: wishlistItems.length },
        { icon:Wallet, label:"Total Spent", value:`$${total.toFixed(2)}` },
        { icon:CalendarDays, label:"Member Since", value:formatDate(profile!.created_at) }
    ]

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout failed:", error.message);
            return;
        }

        console.log("Logged out successfully");
    };

    useEffect(() => {
        fetchProfile()
        fetchOrders()
    }, [])

    return(
        <main className="">
            <section className="grid md:grid-cols-[240px_1fr] gap-8 mt-[8rem]">
                <aside>
                    <div className="rounded-2xl border border-neutral-200 p-5 text-center">
                        <div className="w-20 h-20 rounded-full bg-neutral-950 text-white text-2xl font-semibold grid place-items-center mx-auto" >{first}{last}</div>
                        <h2 className="mt-3 font-semibold">{profile?.name} </h2>
                        <p className="text-xs text-neutral-500 break-all">{profile?.email}</p>
                        <span className="inline-block mt-3 text-xs border border-neutral-200 rounded-full px-3 py-1">Gold Member</span>
                    </div>

                    <div className="mt-4 flex md:flex-col gap-1 overflow-x-auto justify-center">
                        { tabs.map((t) => {
                            const Icon = t.icon
                            return(
                                <button onClick={() => setActiveTab(t.id)} key={t.id} className={`flex items-center gap-3 h-11 px-4 rounded-lg text-sm whitespace-nowrap transition  ${activeTab === t.id ? "bg-neutral-950 text-white" : "hover:bg-neutral-100" } `} >
                                    <Icon className={`w-5 h-4 ${activeTab === t.id ? "text-white" : "text-black"} `}/>
                                    <span>{t.label}</span>
                                </button>
                            )
                           
                        }) }
                        <button onClick={handleLogout} className="flex items-center gap-3 h-11 px-4 rounded-lg text-sm text-red-600 hover:bg-red-50 whitespace-nowrap">
                            <LogOut className="w-5 h-4" />
                            <span>Logout</span>
                        </button>

                    </div>
                </aside>

                <section className="min-w-0">
                    <h2 className="text-2xl font-semibold mb-5">Welcome Back, {profile?.name.split(" ")[0]}</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" >
                        { info.map((i) => {
                            const Icon = i.icon
                            return(
                                <div key={i.label} className="rounded-2xl border border-neutral-200 p-4" >
                                    <Icon className="w-5 h-4 text-neutral-400 " />
                                    <b className="block text-2xl mt-3">{i.value} </b>
                                    <span className="text-xs text-neutral-500">{i.label} </span>
                                </div>
                            )
                        }) }
                    </div>
                    
                    <h3 className="font-semibold mt-8 mb-3">Latest Order</h3>
                    { orders.slice(0,1).map(((o) => (
                        <div key={o.id} className="rounded-2xl border border-neutral-200 p-4 mb-3">
                            <div className="flex flex-wrap justify-between gap-2 text-sm">
                                <div>
                                    <b>{o.order_number} </b>
                                    <p className="text-xs text-neutral-500 mt-0.5">{formatDate(o.created_at)} · {o.order_items.length} Items</p>
                                </div>
                                <b>${o.total.toFixed(2)} </b>

                                
                            </div>  
                            <div className="flex gap-2 mt-3" >
                                { o.order_items.map((i) => (
                                    <div  className="w-14 h-14 rounded-lg overflow-hidden " >
                                        <img src={i.image[0]} alt="img" className="object-cover w-full h-full"/>
                                    </div>
                                )) }
                            </div>

                        </div>
                    ))) }
                    
                    <h3 className="font-semibold mt-8 mb-3">Recently Viewed</h3>
                    <div className="grid grid-flow-col auto-cols-[300px] gap-6 overflow-x-auto">
                        { recentlyViewed.map((r) =>  (
                            <ProductCard key={r.id} product={r} />
                        )) }
                    </div>
                    
                </section>
            </section>
            <Footer />
        </main>
    )
}