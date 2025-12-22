import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import CountriesSection from "@/components/CountriesSection";
import MeritSection from "@/components/MeritSection";
import ProgramsSection from "@/components/ProgramsSection";
import FlowSection from "@/components/FlowSection";
import TestimonialSection from "@/components/TestimonialSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <NewsTicker />
      <CountriesSection />
      <MeritSection />
      <ProgramsSection />
      <FlowSection />
      <TestimonialSection />
      <FAQSection />
      <Footer />
      <MobileBottomNav />

      {/* Spacer for mobile bottom nav */}
      <div className="h-20 lg:hidden" />
    </main>
  );
}
