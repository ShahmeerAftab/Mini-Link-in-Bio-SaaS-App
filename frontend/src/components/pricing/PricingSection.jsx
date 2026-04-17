import Link from "next/link";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started and sharing your links.",
    buttonLabel: "Get Started Free",
    buttonStyle: "bg-[#f3f3f1] text-[#1a1a1a] hover:bg-[#e8e8e6]",
    highlighted: false,
    features: [
      "1 Lynkify profile",
      "Unlimited links",
      "Basic analytics",
      "Mobile responsive page",
      "Lynkify branding",
    ],
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For creators and professionals who want more control.",
    buttonLabel: "Start Pro Plan",
    buttonStyle: "bg-[#14532d] text-white hover:bg-[#166534]",
    highlighted: true,
    features: [
      "Everything in Free",
      "Remove Lynkify branding",
      "Custom domain",
      "Advanced analytics",
      "Priority support",
      "Custom themes & colors",
      "Email list collection",
    ],
  },
  {
    name: "Business",
    price: "$29",
    period: "per month",
    description: "For teams and businesses managing multiple profiles.",
    buttonLabel: "Start Business Plan",
    buttonStyle: "bg-[#502274] text-white hover:bg-[#3b0764]",
    highlighted: false,
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Multiple profiles",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "SLA support",
    ],
  },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

// A single checkmark icon for the features list
const CheckIcon = () => (
  <svg className="w-4 h-4 text-[#14532d] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// A single pricing card
const PricingCard = ({ plan }) => (
  <div className={`
    relative flex flex-col gap-6 rounded-3xl p-8 border transition-all duration-200
    ${plan.highlighted
      ? "bg-[#1a1a1a] border-[#1a1a1a] shadow-2xl scale-105"
      : "bg-white border-[#e8e8e6] shadow-sm hover:shadow-md"
    }
  `}>

    {/* Popular badge — only on highlighted plan */}
    {plan.highlighted && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <span className="bg-[#d2e823] text-[#1a1a1a] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
          Most Popular
        </span>
      </div>
    )}

    {/* Plan name */}
    <div>
      <h3 className={`text-sm font-bold uppercase tracking-widest ${plan.highlighted ? "text-[#d2e823]" : "text-[#6b6b6b]"}`}>
        {plan.name}
      </h3>
      <p className={`text-sm mt-1 leading-relaxed ${plan.highlighted ? "text-gray-400" : "text-[#6b6b6b]"}`}>
        {plan.description}
      </p>
    </div>

    {/* Price */}
    <div className="flex items-end gap-1">
      <span className={`text-5xl font-black ${plan.highlighted ? "text-white" : "text-[#1a1a1a]"}`}>
        {plan.price}
      </span>
      <span className={`text-sm mb-2 ${plan.highlighted ? "text-gray-400" : "text-[#6b6b6b]"}`}>
        / {plan.period}
      </span>
    </div>

    {/* CTA Button */}
    <Link
      href="/signup"
      className={`w-full text-center py-3.5 rounded-full font-bold text-sm transition-colors duration-200 ${plan.buttonStyle}`}
    >
      {plan.buttonLabel}
    </Link>

    {/* Divider */}
    <div className={`border-t ${plan.highlighted ? "border-white/10" : "border-[#e8e8e6]"}`} />

    {/* Features list */}
    <ul className="flex flex-col gap-3">
      {plan.features.map((feature) => (
        <li key={feature} className="flex items-start gap-2.5">
          <CheckIcon />
          <span className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-[#1a1a1a]"}`}>
            {feature}
          </span>
        </li>
      ))}
    </ul>

  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const PricingSection = () => {
  return (
    <>
      {/* ── Top Banner ── */}
      <section className="w-full bg-[#d2e823] py-16 px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#1a1a1a]">
          Simple Pricing
        </span>
        <h1
          className="text-5xl md:text-6xl font-black text-[#000000] mt-3 leading-tight"
          style={{ WebkitTextStroke: "1px #000000" }}
        >
          Plans for every <br /> creator
        </h1>
        <p className="text-[#1a1a1a] font-medium text-base mt-4 max-w-md mx-auto">
          Start for free and upgrade as you grow. No hidden fees, cancel anytime.
        </p>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="w-full bg-[#f3f3f1] py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Cards grid — stacks on mobile, 3 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>

          {/* Bottom note */}
          <p className="text-center text-[#6b6b6b] text-sm mt-12">
            All plans include a 14-day free trial. No credit card required.
          </p>

        </div>
      </section>
    </>
  );
};

export default PricingSection;
