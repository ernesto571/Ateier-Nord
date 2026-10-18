import { useEffect } from "react";
import { useCartStore } from "../../store/CartStore";



interface props {
    onClose: () => void;
}

export default function Cart ( {onClose} : props ) {

    const { items, fetchCartItems, removeItem, updateQuantity } = useCartStore()
    const total = items.reduce((n, i) => n + i.price * i.quantity, 0)

    useEffect(() => {
        fetchCartItems()
    }, [])
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => { document.body.style.overflow = "" }
    }, [])
    return (
        <div  onClick={onClose}  className="fixed inset-0 bg-black/40 z-40" >
            <aside onClick={(e) => e.stopPropagation()} className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 transition-transform duration-300 flex flex-col border-l border-neutral-200">
                <div className="p-4 border-b border-neutral-200 flex justify-between items-center"><h3 className="font-semibold">Shopping Cart</h3><button onClick={onClose}  aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="x" className="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button></div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4" >
                    { items.map((i) => (
                        <div key={`${i.id}-${i.color}-${i.size}`} className=" flex gap-3">
                            <div className="w-20 h-20 rounded-lg overflow-hidden ph shrink-0">
                                <img src={i.image} alt={i.name} loading="lazy" className="w-full h-full object-cover " />
                            </div>
                            <div className="flex-1 text-sm"><div className="flex justify-between">
                                <span className="font-medium">{i.name}</span>
                                <button aria-label="Remove" onClick={() => removeItem(i.id, i.color, i.size)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="trash-2" className="lucide lucide-trash-2 w-4 h-4 text-neutral-400"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                                </button>
                            </div>
                            <p className="text-neutral-500">Size {i.size} · ${i.price.toFixed(2)}</p>
                            <div className="mt-2 inline-flex items-center border border-neutral-200 rounded-md">
                                <button disabled={i.quantity === 1} onClick={() => updateQuantity(i.id, i.color, i.size, i.quantity-1)} className="w-8 h-7">−</button>
                                <span className="w-6 text-center">{i.quantity} </span>
                                <button  onClick={() => updateQuantity(i.id, i.color, i.size, i.quantity+1)} className="w-8 h-7">+</button>
                            </div></div>
                        </div>
                    )) }
                </div>

                <div className="p-4 border-t border-neutral-200">
                    <div className="flex gap-2">
                        <input placeholder="Promo Code" className="w-full border-default rounded-lg pl-4 text-sm focus:ring-0 focus:outline-none focus:border-black bborder !h-10" value=""/>
                        <button  className="h-10 px-4 rounded-lg border border-neutral-200 text-sm">Apply</button>
                    </div>
                    <div className="my-4">
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)} </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between font-semibold text-base pt-2 border-t border-neutral-200">
                                <span>Total</span>
                                <span>$140.00</span>
                            </div>
                        </div>
                    </div>
                    <button  className="btn w-full">Checkout</button>
                </div>
            </aside>
        </div>
    )

}