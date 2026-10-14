
export default function Faq () {

    return (
        <main className="max-w-3xl mx-auto px-4 pb-14 rv in">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>

            <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                <details className="py-4 group" ><summary className="cursor-pointer font-medium list-none flex justify-between">How Long Does Shipping Take?<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" className="lucide lucide-plus w-4 h-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg></summary><p className="text-sm text-neutral-600 mt-2">Standard delivery takes 3–5 business days. Orders over $100 ship free.</p></details>

                <details className="py-4"><summary className="cursor-pointer font-medium list-none flex justify-between">What Is Your Return Policy?<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" className="lucide lucide-plus w-4 h-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg></summary><p className="text-sm text-neutral-600 mt-2">Return unworn items within 30 days for a full refund using the prepaid label.</p></details>

                <details className="py-4"><summary className="cursor-pointer font-medium list-none flex justify-between">How Do I Find My Size?<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" className="lucide lucide-plus w-4 h-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg></summary><p className="text-sm text-neutral-600 mt-2">Our pieces run true to size. If you are between sizes, choose the larger one.</p></details>

                <details className="py-4"><summary className="cursor-pointer font-medium list-none flex justify-between">Is Checkout Secure?<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" className="lucide lucide-plus w-4 h-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg></summary><p className="text-sm text-neutral-600 mt-2">Yes. All payments are encrypted and we never store your card details.</p></details>
            </div>

        </main>
    )
}