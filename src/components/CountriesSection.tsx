"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { countries } from "@/data/countries";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    fastStaggerVariants,
    cardRevealVariants,
    sectionHeaderVariants,
} from "@/hooks/useScrollAnimation";

// Country background images (Unsplash - high quality, free to use)
const countryImages: Record<string, string> = {
    canada: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&q=80",
    "new-zealand": "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&q=80",
    philippines: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80",
    malta: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=400&q=80",
    dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
    korea: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400&q=80",
    australia: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&q=80",
    germany: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&q=80",
    ireland: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=400&q=80",
    usa: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&q=80",
    uk: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80",
};

export default function CountriesSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-6 bg-white border-b border-slate-100" id="countries">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Minimal header with scroll animation */}
                <motion.div
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex items-center justify-between mb-4"
                >
                    <h2 className="text-lg font-bold text-slate-800">留学国一覧</h2>
                    <Link
                        href="/all-country"
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 transition-colors"
                    >
                        すべて見る
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </motion.div>

                {/* Horizontal Accordion with staggered scroll reveal */}
                <motion.div
                    variants={fastStaggerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                    className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
                >
                    {countries.map((country, index) => {
                        const isHovered = hoveredIndex === index;
                        const bgImage = countryImages[country.slug];

                        return (
                            <motion.div
                                key={country.slug}
                                variants={cardRevealVariants}
                            >
                                <Link
                                    href={`/all-country/${country.slug}`}
                                    className="shrink-0 block"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <motion.div
                                        layout
                                        initial={false}
                                        animate={{
                                            width: isHovered ? 280 : 100,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 35,
                                        }}
                                        className="relative h-14 rounded-xl overflow-hidden cursor-pointer group"
                                    >
                                        {/* Background image */}
                                        <div className="absolute inset-0">
                                            <Image
                                                src={bgImage}
                                                alt={country.nameEn}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="280px"
                                            />
                                            {/* Gradient overlay - very light for visibility */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-slate-900/10 to-slate-900/20 group-hover:from-emerald-900/15 group-hover:via-emerald-900/5 group-hover:to-emerald-900/15 transition-colors duration-300" />
                                        </div>

                                        {/* Flag - always visible, centered when collapsed */}
                                        <motion.div
                                            layout
                                            className="absolute top-0 h-14 flex items-center justify-center text-4xl z-10"
                                            style={{ width: 100, left: 0 }}
                                        >
                                            <span
                                                className="drop-shadow-2xl"
                                                style={{
                                                    textShadow: '0 0 12px rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.5)',
                                                    filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5))'
                                                }}
                                            >
                                                {country.flag}
                                            </span>
                                        </motion.div>

                                        {/* Expanded content */}
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute left-24 top-0 right-0 h-full flex flex-col justify-center pr-8 z-10"
                                                >
                                                    <div className="flex items-baseline gap-1.5 mb-1">
                                                        <span className="text-base font-bold text-white whitespace-nowrap drop-shadow-md">
                                                            {country.nameJp}
                                                        </span>
                                                        <span className="text-[10px] text-white/70 font-medium">
                                                            {country.nameEn}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-1 overflow-hidden">
                                                        <span className="px-1.5 py-0.5 text-[9px] bg-white/20 backdrop-blur-sm text-white rounded font-medium whitespace-nowrap border border-white/20">
                                                            {country.highlights[0]}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Hover arrow indicator */}
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 5 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 5 }}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                                                >
                                                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Subtle border */}
                                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-emerald-400/30 transition-all" />
                                    </motion.div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
