
import { useEffect, useLayoutEffect, useState } from "react";
import { useCartStore } from "../../store/CartStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import { Loader2, ShoppingBag, ArrowRight, X, Trash2 } from "lucide-react";

interface props {
    onClose: () => void;
}

export default function Cart ( {onClose} : props ) {

    const navigate = useNavigate()
    const { items, isLoading, fetchCartItems, removeItem, updateQuantity } = useCartStore()
    const total = items.reduce((n, i) => n + i.price * i.quantity, 0)
    const session = useAuthStore.getState().session

    const goToCheckout = () => {
        if (session){
            navigate("/checkout")
        } else {
            navigate("/login")
        }
        onClose()
    }

    useEffect(() => {
        fetchCartItems()
    }, [])

    const [ready, setReady] = useState(false)

    useLayoutEffect(() => {
        const y = window.scrollY
        document.body.style.cssText = `position:fixed;top:-${y}px;width:100%;overflow-y:scroll`
        setReady(true)
        return () => {
            document.body.style.cssText = ""
            window.scrollTo({ top: y, behavior: "instant" })
        }
    }, [])

    return (
        <div onClick={onClose} className={`fixed inset-0 bg-black/40 z-40 ${ready ? "" : "invisible"} `} >
            <aside onClick={(e) => e.stopPropagation()} className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 transition-transform duration-300 flex flex-col border-l border-neutral-200">
                <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                    <h3 className="font-semibold">Shopping Cart</h3>
                    <button onClick={onClose} aria-label="Close"><X className="w-5 h-5" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {isLoading ? (
                        <div className="flex h-full flex-col items-center justify-center gap-3 text-neutral-500">
                            <Loader2 className="h-7 w-7 animate-spin text-black" />
                            <p className="text-sm">Loading your cart...</p>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                                <ShoppingBag className="h-7 w-7 text-neutral-700" />
                            </div>
                            <h4 className="font-semibold text-neutral-950">Your cart is empty</h4>
                            <p className="mt-2 max-w-[230px] text-sm leading-6 text-neutral-500">
                                Looks like you haven't added anything to your cart yet.
                            </p>
                            <button onClick={onClose} className="btn mt-5 inline-flex items-center gap-2">
                                Continue shopping <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        items.map((i) => (
                            <div key={`${i.product_id}-${i.color}-${i.size}`} className="flex gap-3">
                                <div className="w-20 h-20 rounded-lg overflow-hidden ph shrink-0">
                                    <img src={i.image} alt={i.name} loading="lazy" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="font-medium">{i.name}</span>
                                        <button aria-label="Remove" onClick={() => removeItem(i.product_id, i.color, i.size)}>
                                            <Trash2 className="w-4 h-4 text-neutral-400" />
                                        </button>
                                    </div>
                                    <p className="text-neutral-500">Size {i.size} · ${i.price.toFixed(2)}</p>
                                    <div className="mt-2 inline-flex items-center border border-neutral-200 rounded-md">
                                        <button disabled={i.quantity === 1} onClick={() => updateQuantity(i.product_id, i.color, i.size, i.quantity-1)} className="w-8 h-7 disabled:opacity-40">−</button>
                                        <span className="w-6 text-center">{i.quantity}</span>
                                        <button onClick={() => updateQuantity(i.product_id, i.color, i.size, i.quantity+1)} className="w-8 h-7">+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {!isLoading && items.length > 0 && (
                    <div className="p-4 border-t border-neutral-200">
                        <div className="space-y-2 text-sm">
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
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button onClick={goToCheckout} className="btn w-full mt-6">Checkout</button>
                    </div>
                )}
            </aside>
        </div>
    )
}
