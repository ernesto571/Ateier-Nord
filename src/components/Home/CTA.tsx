
export default function CTA () {

    return (
        <main className="sect-main">

            <div className="rounded-3xl border border-neutral-200 p-8 md:p-12 text-center">

                <h2 className="text-3xl font-bold">Get 10% Off Your First Order</h2>
                <p className="text-neutral-600 mt-2">New drops, restocks and private sales. No spam.</p>

                <form  className="mt-6 flex gap-2 max-w-md mx-auto">
                    <input type="email" placeholder="Email Address" className="inp"/>
                    <button className="btn shrink-0">Subscribe</button>
                </form>
            </div>

        </main>
    )
}