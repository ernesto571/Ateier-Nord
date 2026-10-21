import { useLayoutEffect, useState } from "react"
import { useCartStore } from "../store/CartStore"


export default function Checkout () {

    const [activeTab, setActiveTab] = useState("shipping")
    const { items, fetchCartItems } = useCartStore()
    const total = items.reduce((n, i) => n + i.price * i.quantity, 0)

    useLayoutEffect(() => {
        fetchCartItems()
    }, [])
    return (
        <main>
            <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-[1fr_340px] gap-8 mt-[5rem]" >
                <div>
                    <div className="flex gap-2 text-sm mb-6">
                        <button className={` ${activeTab === "shipping" ? "ttext-black font-semibold" : "text-neutral-400"}`} onClick={()=> setActiveTab("shipping")} >1. Shipping</button>
                        <span className="text-neutral-400">/</span>
                        <button className={` ${activeTab === "payment" ? "ttext-black font-semibold" : "text-neutral-400"}`} onClick={()=> setActiveTab("payment")} >2. Payment</button>
                    </div> 

                    { activeTab === "shipping" && (
                        <div className="space-y-3" >
                            <input placeholder="Full Name" className="inp" />
                            <input type="email" placeholder="Email" className="inp" />
                            <input  placeholder="Address" className="inp" />
                            <div className="grid grid-cols-2 gap-3" >
                                <input  placeholder="City" className="inp" />
                                <input placeholder="Postal Code" className="inp" />
                            </div>
                            <button className="btn">Continue To Payment</button>
                        </div>
                    ) }   

                    { activeTab === "payment" && (
                        <div>

                        </div>
                    ) }                  
                </div>

                <div className="rounded-2xl border border-neutral-200 p-5 h-fit text-sm">
                    <h3 className="font-semibold mb-4">Order Summary</h3>

                    <div className="space-y-3 mb-4">
                        { items.map((i) => (
                            <div key={i.product_id} className="flex justify-between">
                                <span>{i.name} × {i.quantity}</span>
                                <span>${i.price.toFixed(2)}</span>
                            </div>
                        )) }
                    </div>

                    <div className="flex gap-2 mt-7">
                        <input placeholder="Promo Code" className="inp !h-10" value="" />
                        <button className="h-10 px-4 rounded-lg border border-neutral-200 text-sm">Apply</button>
                    </div>
                    
                    <div className="mt-4">
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${total}</span>
                                </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between font-semibold text-base pt-2 border-t border-neutral-200">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}