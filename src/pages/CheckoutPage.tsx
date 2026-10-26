import { useEffect, useState } from "react"
import { useCartStore } from "../store/CartStore"
import { useCheckoutStore } from "../store/CheckoutStore"
import toast from "react-hot-toast"
import StripePaymentSection from "../components/StripePaymentSection"

export default function Checkout () {

    const [activeTab, setActiveTab] = useState("shipping")
    const { items, fetchCartItems } = useCartStore()
    const {checkout, isLoading, error, formData, setFormData, client_secret, order_number, order_total} = useCheckoutStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ [e.target.name]: e.target.value });
    };
    const total = items.reduce(
        (n, i) => n + i.price * i.quantity,
        0
    );
      
    const [discount, setDiscount] = useState(0);
    const [coupon, setCoupon] = useState("");
      
    const handleCoupon = () => {
        if (coupon.trim().toUpperCase() === "SAVE10") {
          setDiscount(10);
          toast.success("Coupon added successfully.");
        } else {
          setDiscount(0);
          toast.error("Invalid code.");
        }
    };
     
    const discountedTotal = total * (1 - discount / 100);  

    const handleCheckout = async () => {
        if (!formData.name?.trim()) return toast.error("Name is required.");
        if (!formData.email?.trim()) return toast.error("Email is required.");
        if (!formData.city?.trim()) return toast.error("City is required.");
        if (!formData.address?.trim()) return toast.error("Address is required.");
        if (!formData.postal_code?.trim()) return toast.error("Postal code is required.");
        try {
            await checkout(  coupon, formData );
            if (error){
                return
            }
            
        } catch (err) {
            console.error("Error in handleCheckout", err);
        }
        setActiveTab("payment")

    };

    useEffect(() => {
        fetchCartItems()
    }, [])

    
    return (
        <main>
            <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-[1fr_340px] gap-8 mt-[5rem]" >
                <div>
                    <div className="flex gap-2 text-sm mb-6">
                        <p className={` ${activeTab === "shipping" ? "text-black font-semibold" : "text-neutral-400"}`}  >1. Shipping</p>
                        <span className="text-neutral-400">/</span>
                        <p className={` ${activeTab === "payment" ? "text-black font-semibold" : "text-neutral-400"}`}  >2. Payment</p>
                    </div> 

                    { activeTab === "shipping" && (
                        <div className="space-y-3" >
                            <input placeholder="Full Name" className="inp" onChange={handleChange} value={formData.name} name="name" />
                            <input type="email" placeholder="Email" className="inp" value={formData.email} onChange={handleChange} name="email" />
                            <input  placeholder="Address" className="inp" value={formData.address} onChange={handleChange} name="address" />
                            <div className="grid grid-cols-2 gap-3" >
                                <input  placeholder="City" className="inp" value={formData.city} onChange={handleChange} name="city"/>
                                <input placeholder="Postal Code" className="inp" value={formData.postal_code} onChange={handleChange} name="postal_code" />
                            </div>
                            <button disabled={isLoading} onClick={handleCheckout} className="btn disabled:opacity-50 disabled:cursor-not-allowed">Continue To Payment</button>
                        </div>
                    ) }   

                    { activeTab === "payment" && client_secret && (
                        <StripePaymentSection
                            clientSecret={client_secret}
                            orderNumber={order_number}
                            total={order_total}
                        />
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

                    <div className={`gap-2 mt-7 ${activeTab === "payment" ? "hidden" : "flex"}`}>
                        <input placeholder="Promo Code" className="inp !h-10" onChange={(e) => setCoupon(e.target.value)} value={coupon} />
                        <button onClick={handleCoupon} className="h-10 px-4 rounded-lg border border-neutral-200 text-sm">Apply</button>
                    </div>
                    
                    <div className="mt-4">
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                                </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between font-semibold text-base pt-2 border-t border-neutral-200">
                                <span>Total</span>
                                <span>${discountedTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}