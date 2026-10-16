
const countdown = [
  { value: "00", label: "Days" },
  { value: "03", label: "Hours" },
  { value: "46", label: "Mins" },
  { value: "25", label: "Secs" },
];

/**
 * Visual-only limited-time offer banner inspired by the Atelier Nord reference.
 * The CTA is intentionally not connected to any functionality yet.
 */
export default function LimitedTimeOffer() {
  return (
    <section className=" bg-white px-4 py-8 sm:px-6 lg:px-4">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 rounded-[24px] bg-[#0A0A0A]  py-5 md:py-10 text-white px-4 md:px-8 lg:grid-cols-[1fr_auto] md:gap-10 lg:px-12">
        {/* Offer copy */}
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-normal uppercase tracking-[0.16em] text-neutral-400">
            Limited-time offer
          </p>

          <h1 className="max-w-lg text-2xl md:text-4xl text-white font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-5xl">
            Take 10% Off Your Order.
          </h1>

          <p className="mt-4 text-sm leading-6 text-neutral-400 sm:text-base">
            Use code <span className="font-bold text-white">SAVE10</span> at checkout. Ends when the timer does.
          </p>

          <button
            className="mt-6 inline-flex h-8 md:h-12 items-center justify-center rounded-lg bg-white px-6 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          >
            Claim Offer &amp; Shop
          </button>
        </div>

        {/* Static countdown display */}
        <div className="grid gap-3 grid-cols-4 md:min-w-[440px] md:gap-3">
          {countdown.map((item) => (
            <div
              key={item.label}
              className="flex h-[70px] md:min-h-[94px] flex-col items-center justify-center rounded-xl border border-white/[0.12] p-2 md:p-4 text-center sm:min-w-[88px]"
            >
              <p className=" text-xl md:text-3xl text-white font-bold leading-none tracking-tight tabular-nums sm:text-[30px]">
                {item.value}
              </p>
              <p className="mt-2 text-xs text-neutral-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
