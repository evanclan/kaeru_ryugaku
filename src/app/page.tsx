import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import CountriesSection from "@/components/CountriesSection";
import MeritSection from "@/components/MeritSection";
import ProgramsSection from "@/components/ProgramsSection";
import DestinationExplorer from "@/components/DestinationExplorer";
import FlowSection from "@/components/FlowSection";
import TestimonialSection from "@/components/TestimonialSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { client } from "@/sanity/client";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const query = `*[_type == "studentVoice"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    studentName,
    programType,
    studentStatus,
    reviewStatus,
    destination,
    mainImage,
    tags
  }`;

  const allReviews = await client.fetch(query);

  // Get 15 random reviews for the carousel
  const reviews = allReviews
    .sort(() => 0.5 - Math.random())
    .slice(0, 15);

  return (
    <main className="relative">
      <Header />
      <Hero />
      <NewsTicker />
      <CountriesSection />
      <MeritSection />
      <ProgramsSection />
      <DestinationExplorer />
      <FlowSection />
      <TestimonialSection reviews={reviews} />
      <FAQSection />
      <Footer />
      <MobileBottomNav />

      {/* Spacer for mobile bottom nav */}
      <div className="h-20 lg:hidden" />
    </main>
  );
}
