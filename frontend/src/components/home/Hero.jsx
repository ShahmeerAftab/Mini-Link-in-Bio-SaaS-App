import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full bg-[#d2e823] py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-7">
        {/* Main Heading */}
        <h1
          className="text-6xl md:text-7xl font-black text-[#000000] leading-tight tracking-tight"
          style={{ WebkitTextStroke: "1.5px #000000" }}
        >
          A Linktree template to suit every brand and creator
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg text-[#000000] max-w-4xl leading-relaxed font-semibold">
          Different Link Apps, integrations and visual styles can help you
          create a Linktree that looks and feels like you and your brand.
          Explore our library of custom templates to grow and connect with your
          audience even more easily!
        </p>

        {/* Input + Button Row */}
        <div className="flex items-center gap-3 w-full max-w-xl mt-2">
          <input
            type="text"
            placeholder="lynkify.app/yourname"
            className="flex-1 px-6 py-4 text-[#1a1a1a] text-base outline-none bg-white rounded-full shadow-xl placeholder-[#aaaaaa]"
          />
          <Link
            href="/signup"
            className="bg-[#14532d] text-white px-6 py-4 text-base font-bold rounded-full hover:bg-[#166534] transition-colors duration-200 whitespace-nowrap shadow-xl"
          >
            Get Started for Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
