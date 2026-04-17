import Link from "next/link";

const JumpStart = () => {
  return (
    <section className="w-full bg-[#502274] py-32 px-6 flex flex-col items-center justify-center text-center gap-8">

      <h2
        className="text-5xl md:text-7xl font-black text-white leading-tight max-w-4xl"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
      >
        Jumpstart your corner of the internet today
      </h2>

      {/* Input + Button Row */}
      <div className="flex items-center gap-3 w-full max-w-xl">
        <input
          type="text"
          placeholder="lynkify.app/yourname"
          className="flex-1 px-6 py-4 text-[#1a1a1a] text-base outline-none bg-white rounded-full shadow-xl placeholder-[#aaaaaa]"
        />
        <Link
          href="/signup"
          className="bg-[#d2e823] text-[#1a1a1a] px-6 py-4 text-base font-bold rounded-full hover:bg-[#bfd120] transition-colors duration-200 whitespace-nowrap shadow-xl"
        >
          Claim your Linktree
        </Link>
      </div>

    </section>
  );
};

export default JumpStart;
