"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-autoplay";
import {
    sectionHeaderVariants,
} from "@/hooks/useScrollAnimation";
import { ReviewCard } from "@/components/ReviewCard";
import { cn } from "@/lib/utils";

export default function TestimonialSection({ reviews = [] }: { reviews?: any[] }) {
    // Fallback if no reviews (though we should have them from page)
    const displayReviews = reviews.length > 0 ? reviews : [];

    // Embla Carousel Setup
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "center", skipSnaps: false },
        [AutoScroll({ playOnInit: true, delay: 3000, stopOnInteraction: false })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="py-12 lg:py-20 bg-slate-50 overflow-hidden" id="testimonials">
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Compact Header with scroll animation */}
                <motion.div
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center mb-10 relative z-10"
                >
                    {/* Chatting Frogs Mascot */}
                    <motion.img
                        src="/frog-mascot-chat.png"
                        alt="かえるマスコット"
                        className="absolute -top-6 left-0 sm:left-4 lg:left-[calc(50%-200px)] w-16 h-12 sm:w-20 sm:h-14 lg:w-24 lg:h-16 object-contain z-10"
                        animate={{ rotate: [-2, 2, -2] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium mb-3">
                        <Users className="w-3 h-3" />
                        先輩の声
                    </div>
                    <h2 className="text-2xl lg:text-4xl font-bold text-slate-800 mb-4">
                        先輩たちの<span className="text-emerald-600">リアルな体験談</span>
                    </h2>
                    <Link href="/all-reviews" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-bold transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-emerald-100">
                        もっと見る
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Embla Carousel */}
                <div className="relative max-w-7xl mx-auto">
                    <div className="overflow-visible" ref={emblaRef}>
                        <div className="flex -ml-4 items-center">
                            {displayReviews.map((review, index) => {
                                // Logic to determine if this slide is the "middle" one
                                const isSelected = index === selectedIndex;

                                return (
                                    <div
                                        key={review._id}
                                        className={cn(
                                            "flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_35%] pl-4 transition-all duration-500 ease-out",
                                            isSelected ? "z-10 scale-100 lg:scale-110 opacity-100" : "scale-95 lg:scale-90 opacity-70 blur-[1px] hover:opacity-100 hover:blur-0"
                                        )}
                                        style={{
                                            transformOrigin: "center center",
                                        }}
                                    >
                                        <div className="h-full py-8"> {/* Padding for scale effect */}
                                            <ReviewCard review={review} className="h-full shadow-lg" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Gradient Fade Edges */}
                    <div className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
