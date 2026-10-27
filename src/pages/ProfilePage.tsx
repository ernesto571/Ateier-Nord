import { useEffect, useState } from "react"
import { useProfileStore } from "../store/ProfileStore"
import { CalendarDays, Heart, LayoutGrid, LogOut, MapPin, Package, Search, Settings, ShoppingBag, Wallet } from "lucide-react"
import { supabase } from "../lib/supabase-client"
import { useOrderStore } from "../store/OrderStore"
import { useWishlistStore } from "../store/Wishlist"
import { useRecentlyViewedStore } from "../store/RecentlyViewedStore"
import ProductCard from "../components/ProductCard"
import Footer from "../components/Home/Footer"
import { useAddressStore } from "../store/AddresStore"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const formatDate = (created_at: string | number) => {
    return new Date(created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export default function Profile(){

    const navigate = useNavigate()
    const { profile, fetchProfile, profileFormData, setProfileFormData, updateProfile, deleteAccount, profileLoading } = useProfileStore()
    const {orders, fetchOrders}= useOrderStore()
    const { wishlistItems } = useWishlistStore()
    const { isLoading, formData, addressList, fetchAddress, addAddress, setDefaultAddress, deleteAddress, setFormData } = useAddressStore()
    const [activeTab, setActiveTab] = useState("overview")
    const names = profile?.name?.trim().split(/\s+/) ?? [];

    const first = names[0]?.charAt(0).toUpperCase() ?? "";
    const last = names.length > 1
        ? names[names.length - 1].charAt(0).toUpperCase()
        : "";
    
    const initials = first + last;

    const total = orders.reduce((n, o) => n + o.total , 0)

    const recentlyViewed = useRecentlyViewedStore(
        (state) => state.recentlyViewed
    );
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ [e.target.name]: e.target.value });
    };

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileFormData({ [e.target.name]: e.target.value });
    };

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
        { icon:CalendarDays, label:"Member Since", value:formatDate(profile?.created_at ?? "") }
    ]

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout failed:", error.message);
            return;
        }

        console.log("Logged out successfully");
    };

    const handleAddAddress = async () => {
        if (!formData.label?.trim()) return toast.error("Label is required.");
        if (!formData.street_address?.trim()) return toast.error("Street Address is required.");
        if (!formData.city) return toast.error("City is required.");
        if (!formData.postal_code) return toast.error("Postal Code is required.");
        try {
            await addAddress(formData);
            
        } catch (err) {
            console.error("Error in handleAddAddress", err);
        } finally{
            toast.success("Profile Updated Successfully")
        }

    };

    const handleProfileUpdate = async () => {
        if (!profileFormData.name?.trim()) return toast.error("Name is required.");
        if (!profileFormData.email?.trim()) return toast.error("email is required.");
        try {
            await updateProfile(profileFormData);
            
        } catch (err) {
            console.error("Error in handleProfileUpdate", err);
        }

    };

    useEffect(() => {
        fetchProfile()
        fetchOrders()
        fetchAddress()
    }, [])

    return(
        <main className="">
            <section className="grid md:grid-cols-[240px_1fr] gap-8 mt-[5rem] mb-10 min-h-[85vh] px-1 ">
                <aside className="sidebar ">
                    <div className="rounded-2xl border border-neutral-200 p-5 text-center">
                        <div className="w-20 h-20 rounded-full bg-neutral-950 text-white text-2xl font-semibold grid place-items-center mx-auto" >{initials}</div>
                        <h2 className="mt-3 font-semibold">{profile?.name} </h2>
                        <p className="text-xs text-neutral-500 break-all">{profile?.email}</p>
                        <span className="inline-block mt-3 text-xs border border-neutral-200 rounded-full px-3 py-1">Gold Member</span>
                    </div>

                    <div className="mt-4 flex flex-wrap md:flex-col gap-1 justify-center">
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

                { activeTab === "overview" && (
                    <section className="min-w-0  md:h-screen overflow-y-auto">
                        <h2 className="text-2xl font-semibold mb-5">Welcome Back, {profile?.name.split(" ")[0]}</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" >
                            { info.map((i) => {
                                const Icon = i.icon
                                return(
                                    <div key={i.label} className="rounded-2xl border border-neutral-200 p-4" >
                                        <Icon className="w-5 h-4 text-neutral-400 " />
                                        <b className="block text-xl md:text-2xl mt-3">{i.value} </b>
                                        <span className="text-xs text-neutral-500">{i.label} </span>
                                    </div>
                                )
                            }) }
                        </div>
                
                        <h3 className="font-semibold mt-8 mb-3">Latest Order</h3>

                        {orders.length === 0 ? (
                            <div className="rounded-2xl border border-neutral-200 p-8 flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                                    <ShoppingBag className="w-5 h-5 text-neutral-500" />
                                </div>

                                <h4 className="font-medium text-neutral-900">No orders yet</h4>

                                <p className="text-sm text-neutral-500 mt-1 max-w-xs">
                                    Your latest order will appear here once you make your first purchase.
                                </p>

                                <button
                                    onClick={() => navigate("/all")}
                                    className="mt-4 px-5 py-2.5 rounded-full bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            orders.slice(0, 1).map((o) => (
                                <div
                                    key={o.id}
                                    className="rounded-2xl border border-neutral-200 p-4 mb-3"
                                >
                                    <div className="flex flex-wrap justify-between gap-2 text-sm">
                                        <div>
                                            <b>{o.order_number}</b>
                                            <p className="text-xs text-neutral-500 mt-0.5">
                                                {formatDate(o.created_at)} · {o.order_items.length} Items
                                            </p>
                                        </div>

                                        <b>${Number(o.total).toFixed(2)}</b>
                                    </div>

                                    <div className="flex gap-2 mt-3">
                                        {o.order_items.map((i, index) => (
                                            <div
                                                key={`${o.id}-${index}`}
                                                className="w-14 h-14 rounded-lg overflow-hidden"
                                            >
                                                <img
                                                    src={i.image[0]}
                                                    alt="Order item"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        {["processing", "shipped", "delivered"].map((status, index) => {
                                            const statuses = ["processing", "shipped", "delivered"];
                                            const currentIndex = statuses.indexOf(
                                                o.status?.toLowerCase()
                                            );
                                            const isCompleted = index <= currentIndex;

                                            return (
                                                <div key={status} className="flex-1">
                                                    <div
                                                        className={`h-1.5 rounded-full ${
                                                            isCompleted
                                                                ? "bg-neutral-950"
                                                                : "bg-neutral-200"
                                                        }`}
                                                    />

                                                    <p
                                                        className={`text-[11px] mt-1 font-medium ${
                                                            isCompleted
                                                                ? "text-neutral-950"
                                                                : "text-neutral-400"
                                                        }`}
                                                    >
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        )}

                        <h3 className="font-semibold mt-8 mb-3">Recently Viewed</h3>

                        {recentlyViewed.length === 0 ? (
                            <div className="rounded-2xl border border-neutral-200 p-8 flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                                    <Search className="w-5 h-5 text-neutral-500" />
                                </div>

                                <h4 className="font-medium text-neutral-900">
                                    Nothing here yet
                                </h4>

                                <p className="text-sm text-neutral-500 mt-1 max-w-xs">
                                    Products you explore will show up here, so you can find them again easily.
                                </p>

                                <button
                                    onClick={() => navigate("/all")}
                                    className="mt-4 px-5 py-2.5 rounded-full bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
                                >
                                    Explore Products
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-flow-col auto-cols-[200px] md:auto-cols-[300px] gap-6 overflow-x-auto">
                                {recentlyViewed.map((r) => (
                                    <ProductCard key={r.id} product={r} />
                                ))}
                            </div>
                        )}                    
                    </section> 
                ) }
                
                {activeTab === "orders" && (
                    <section className="min-w-0 md:h-screen overflow-y-auto">
                        <h2 className="text-2xl font-semibold mb-5">Order History</h2>

                        {orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-center py-20 px-6 border border-neutral-200 rounded-2xl">
                                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-5">
                                    <ShoppingBag
                                        size={28}
                                        strokeWidth={1.5}
                                        className="text-neutral-500"
                                    />
                                </div>

                                <h3 className="text-lg font-semibold text-neutral-950">
                                    No orders yet
                                </h3>

                                <p className="text-sm text-neutral-500 mt-2 max-w-sm">
                                    You haven't placed any orders yet. Explore our collection
                                    and find something you'll love.
                                </p>

                                <button
                                    onClick={() => navigate("/all")}
                                    className="mt-6 px-6 py-3 bg-neutral-950 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            orders.map((o) => (
                                <div
                                    key={o.id}
                                    className="rounded-2xl border border-neutral-200 p-4 mb-3"
                                >
                                    <div className="flex flex-wrap justify-between gap-2 text-sm">
                                        <div>
                                            <b>{o.order_number}</b>
                                            <p className="text-xs text-neutral-500 mt-0.5">
                                                {formatDate(o.created_at)} · {o.order_items.length} Items
                                            </p>
                                        </div>

                                        <b>${Number(o.total).toFixed(2)}</b>
                                    </div>

                                    <div className="flex gap-2 mt-3">
                                        {o.order_items.map((i, index) => (
                                            <div
                                                key={`${o.id}-${index}`}
                                                className="w-14 h-14 rounded-lg overflow-hidden"
                                            >
                                                <img
                                                    src={i.image[0]}
                                                    alt="Order item"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        {["processing", "shipped", "delivered"].map((status, index) => {
                                            const statuses = ["processing", "shipped", "delivered"];
                                            const currentIndex = statuses.indexOf(
                                                o.status?.toLowerCase()
                                            );
                                            const isCompleted = index <= currentIndex;

                                            return (
                                                <div key={status} className="flex-1">
                                                    <div
                                                        className={`h-1.5 rounded-full ${
                                                            isCompleted
                                                                ? "bg-neutral-950"
                                                                : "bg-neutral-200"
                                                        }`}
                                                    />

                                                    <p
                                                        className={`text-[11px] mt-1 font-medium ${
                                                            isCompleted
                                                                ? "text-neutral-950"
                                                                : "text-neutral-400"
                                                        }`}
                                                    >
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        )}
                    </section>
                )}

                { activeTab === "addresses" && (
                    <div className="min-w-0" >
                        <h2 className="text-2xl font-semibold mb-5">Saved Addresses</h2>
                        { addressList.length === 0 && (
                            <p className="text-sm text-neutral-500 py-6">No addresses saved yet.</p>
                        ) }

                        <div className=" grid sm:grid-cols-2 gap-4" >
                            { addressList.map((a) => (
                                <div key={a.id} className={`rounded-2xl border ${a.is_default === true? "border-neutral-950" : "border-neutral-200"}  p-4 text-sm`} >
                                    <div className="flex justify-between">
                                        <b>{a.label} </b>
                                        { a.is_default === true ? (
                                            <span className="text-xs">Default</span>
                                        ) : (
                                            <button onClick={() => setDefaultAddress(a.id)} className="text-xs underline" >Make Default</button>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-neutral-600 mt-2" >{a.street_address} </span>
                                        <span className="text-neutral-600 mt-1" >{a.city}, {a.postal_code} </span>
                                    </div>
                                    <button onClick={() => deleteAddress(a.id)} className="mt-3 text-xs text-red-600">Remove</button>

                                    
                                </div>
                            )) }
                        </div>
                        

                        <div className="rounded-2xl border border-neutral-200 p-5 mt-6 grid sm:grid-cols-2 gap-3">
                            <h3 className="font-semibold sm:col-span-2">Add New Address</h3>
                            <input name="label" placeholder="Label (Home, Work)" className="inp" value={formData.label} onChange={handleChange}/>
                            <input name="street_address" placeholder="Street Address" className="inp" value={formData.street_address} onChange={handleChange}/>
                            <input name="city"  placeholder="City" className="inp" value={formData.city} onChange={handleChange}/>
                            <input name="postal_code"  placeholder="Postal Code" className="inp" value={formData.postal_code} onChange={handleChange} />
                            <button disabled={isLoading} onClick={handleAddAddress} className="btn sm:col-span-2 disabled:opacity-50 disabled:cursor-not-allowed">Save Address</button>
                        </div>
                    </div>
                ) }

                {  activeTab === "settings" && (
                    <div className="min-w-0" >
                        <h2 className="text-2xl font-semibold mb-5">Account Settings</h2>
                        <form className="rounded-2xl border border-neutral-200 p-5 grid sm:grid-cols-2 gap-3">
                            <h3 className="font-semibold sm:col-span-2">Personal Details</h3>
                            <input name="name" className="inp" value={profileFormData.name} onChange={handleProfileChange} />
                            <input name="email"  className="inp" value={profileFormData.email} onChange={handleProfileChange}  />
                            <input name="phone" placeholder="Phone Number"  className="inp sm:col-span-2" value={profileFormData.phone} onChange={handleProfileChange}  />
                            <button onClick={handleProfileUpdate} disabled={profileLoading} className="btn sm:col-span-2 disabled:opacity-50 disabled:cursor-not-allowed">Save Changes</button>
                        </form>

                        <div className="rounded-2xl border border-red-200 p-5 mt-5">
                            <h3 className="font-semibold text-red-600">Danger Zone</h3>
                            <p className="text-xs text-neutral-500 mt-1">Clears your profile, orders, addresses and wishlist from this browser.</p>
                            <button onClick={deleteAccount} className="mt-3 h-10 px-4 rounded-lg border border-red-300 text-red-600 text-sm">Delete Account</button></div>
                    </div>
                ) }
            </section>
            <Footer />
        </main>
    )
}