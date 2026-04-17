import Hero from "@/components/home/Hero";
import ShareSection from "@/components/home/ShareSection";
import TemplatesSection from "@/components/home/TemplatesSection";
import FAQ from "@/components/home/FAQ";
import JumpStart from "@/components/home/JumpStart";

const Home = () => {
  return (
    <main>
      <Hero />
      <ShareSection />
      <TemplatesSection />
      <FAQ />
      <JumpStart />
    </main>
  );
};

export default Home;
