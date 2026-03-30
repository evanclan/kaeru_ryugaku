import { client } from "@/sanity/client";
import ReviewsClient from "./ReviewsClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users } from "lucide-react";

export const revalidate = 60; // Revalidate every minute

export default async function AllReviewsPage() {
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

    const reviews = await client.fetch(query);

    return (
        <main className="min-h-screen relative overflow-hidden bg-slate-50/50">
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0">
                {/* Base Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 opacity-70" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.4]" />

                {/* Animated Blobs */}
                <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute top-0 -right-4 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-20 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
            </div>

            <div className="relative z-10">
                <Header />

                {/* Hero Section */}
                <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
                    <div className="container mx-auto px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/60 backdrop-blur-sm border border-emerald-100 text-emerald-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
                            <Users className="w-3.5 h-3.5" />
                            Student Voices
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 font-sans">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                                お客様の声
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                            先輩たちの<span className="text-emerald-600 font-bold bg-emerald-50/50 px-1 rounded">リアルな体験談</span>。<br className="hidden md:block" />
                            留学を通して変わったこと、学んだこと、そして感動を共有します。
                        </p>

                        {/* Mascot */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-200 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                                <img
                                    src="/frog-mascot-chat.png"
                                    alt="かえるマスコット"
                                    className="w-28 h-auto relative z-10 animate-bounce-slow drop-shadow-xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <ReviewsClient initialReviews={reviews} />

                <Footer />
            </div>
        </main>
    );
}
