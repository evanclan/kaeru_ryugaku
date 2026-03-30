"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    sectionHeaderVariants,
    slideFromLeftVariants,
    slideFromRightVariants,
} from "@/hooks/useScrollAnimation";

const countries = [
    { name: "アメリカ", nameEn: "America", image: "/home/country_icons/america.png", slug: "usa", angle: 0 },
    { name: "カナダ", nameEn: "Canada", image: "/home/country_icons/canada.png", slug: "canada", angle: 32.7 },
    { name: "イギリス", nameEn: "U.K.", image: "/home/country_icons/UK.png", slug: "uk", angle: 65.4 },
    { name: "アイルランド", nameEn: "Ireland", image: "/home/country_icons/ireland.png", slug: "ireland", angle: 98.1 },
    { name: "フィリピン", nameEn: "Philippines", image: "/home/country_icons/Philippines.png", slug: "philippines", angle: 130.8 },
    { name: "オーストラリア", nameEn: "Australia", image: "/home/country_icons/australia.png", slug: "australia", angle: 163.5 },
    { name: "ニュージーランド", nameEn: "New Zealand", image: "/home/country_icons/new zealand.png", slug: "new-zealand", angle: 196.2 },
    { name: "マルタ", nameEn: "Malta", image: "/home/country_icons/malta.png", slug: "malta", angle: 228.9 },
    { name: "ドバイ", nameEn: "Dubai", image: "/home/country_icons/dubai.png", slug: "dubai", angle: 261.6 },
    { name: "ドイツ", nameEn: "Germany", image: "/home/country_icons/germany.png", slug: "germany", angle: 294.3 },
    { name: "韓国", nameEn: "Korea", image: "/home/country_icons/korea.png", slug: "korea", angle: 327 },
];

const ORBIT_RADIUS = 42;

export default function DestinationExplorer() {
    return (
        <section className="py-10 lg:py-16 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden" id="destinations">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
                {/* Section Header */}
                <motion.div
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="w-full text-center mb-8 lg:mb-10"
                >
                    <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 mb-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-emerald-700">11カ国の留学先</span>
                    </div>
                    <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
                        <span className="text-emerald-600">行き先</span>から探す
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">あなたにぴったりの留学先を見つけよう</p>
                </motion.div>

                {/* Desktop: mascot width uses clamp so it actually grows; globe takes the rest */}
                <div className="hidden lg:flex w-full items-center justify-center gap-4 xl:gap-8">
                    <motion.div
                        variants={slideFromLeftVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex w-[clamp(280px,32vw,520px)] shrink-0 flex-col items-center justify-center"
                    >
                        <Image
                            src="/home/country_icons/kaeru.png"
                            alt="カエル留学マスコット"
                            width={800}
                            height={1000}
                            className="h-auto w-full object-contain drop-shadow-xl"
                            priority
                        />
                    </motion.div>

                    <motion.div
                        variants={slideFromRightVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex min-w-0 flex-1 items-center justify-center"
                    >
                        <div className="relative isolate mx-auto aspect-square w-full max-w-[650px]">
                            {/* Decorative Orbit Rings */}
                            <div className="absolute inset-[6%] rounded-full border border-dashed border-emerald-200/40 pointer-events-none destination-orbit-ring" />
                            <div className="absolute inset-[3%] rounded-full border border-dotted border-slate-200/20 pointer-events-none origin-center" />

                            {/* Orbiting Countries */}
                            <div className="absolute inset-0 destination-orbit">
                                {countries.map((country, index) => {
                                    const angle = country.angle;
                                    const x = 50 + ORBIT_RADIUS * Math.cos((angle * Math.PI) / 180);
                                    const y = 50 + ORBIT_RADIUS * Math.sin((angle * Math.PI) / 180);

                                    return (
                                        <div
                                            key={country.slug}
                                            className="absolute"
                                            style={{
                                                left: `${x}%`,
                                                top: `${y}%`,
                                                transform: "translate(-50%, -50%)",
                                            }}
                                        >
                                            <div className="destination-orbit-item">
                                                <Link
                                                    href={`/all-country/${country.slug}`}
                                                    className="group block"
                                                >
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{
                                                            delay: 0.3 + index * 0.08,
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 20,
                                                        }}
                                                        whileHover={{ scale: 1.2, zIndex: 30 }}
                                                        className="relative cursor-pointer"
                                                    >
                                                        <div className="h-[110px] w-[110px] overflow-hidden rounded-xl shadow-md transition-shadow duration-300 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-emerald-400/45">
                                                            <Image
                                                                src={country.image}
                                                                alt={country.name}
                                                                width={110}
                                                                height={110}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                                            <span className="text-xs font-bold text-slate-700 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                                                                {country.name}
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Globe — no transform, pure flex centering */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                >
                                    <Image
                                        src="/home/country_icons/world.png"
                                        alt="世界地図"
                                        width={320}
                                        height={320}
                                        className="drop-shadow-2xl"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile: Stacked layout */}
                <div className="lg:hidden w-full flex flex-col items-center">
                    {/* Globe only on mobile — kaeru hidden for more space */}
                    <div className="flex w-full max-w-md sm:max-w-lg items-center justify-center mx-auto px-2">
                        <motion.div
                            variants={slideFromRightVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-30px" }}
                            className="w-full flex items-center justify-center"
                        >
                            <div className="relative isolate aspect-square w-full max-w-[340px] sm:max-w-[420px]">
                                <div className="absolute inset-[8%] rounded-full border border-dashed border-emerald-200/40 pointer-events-none destination-orbit-ring" />

                                {/* Orbiting Countries - mobile */}
                                <div className="absolute inset-0 destination-orbit">
                                    {countries.map((country, index) => {
                                        const angle = country.angle;
                                        const x = 50 + ORBIT_RADIUS * Math.cos((angle * Math.PI) / 180);
                                        const y = 50 + ORBIT_RADIUS * Math.sin((angle * Math.PI) / 180);

                                        return (
                                            <div
                                                key={country.slug}
                                                className="absolute"
                                                style={{
                                                    left: `${x}%`,
                                                    top: `${y}%`,
                                                    transform: "translate(-50%, -50%)",
                                                }}
                                            >
                                                <div className="destination-orbit-item">
                                                    <Link
                                                        href={`/all-country/${country.slug}`}
                                                        className="group block"
                                                    >
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{
                                                                delay: 0.2 + index * 0.06,
                                                                type: "spring",
                                                                stiffness: 300,
                                                                damping: 20,
                                                            }}
                                                            className="relative cursor-pointer"
                                                        >
                                                            <div className="h-[62px] w-[62px] overflow-hidden rounded-lg shadow-md transition-shadow duration-300 sm:h-[78px] sm:w-[78px] group-hover:shadow-lg group-hover:ring-2 group-hover:ring-emerald-400/45">
                                                                <Image
                                                                    src={country.image}
                                                                    alt={country.name}
                                                                    width={78}
                                                                    height={78}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        </motion.div>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Globe Center - mobile — pure flex centering */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, duration: 0.8 }}
                                    >
                                        <Image
                                            src="/home/country_icons/world.png"
                                            alt="世界地図"
                                            width={200}
                                            height={200}
                                            className="drop-shadow-2xl sm:w-[230px] sm:h-[230px]"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Mobile: Country Name Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-4 w-full max-w-2xl mx-auto"
                    >
                        <div className="grid grid-cols-4 gap-2 justify-items-center">
                            {countries.map((country) => (
                                <Link
                                    key={country.slug}
                                    href={`/all-country/${country.slug}`}
                                    className="flex flex-col items-center gap-1 group"
                                >
                                    <div className="h-16 w-16 overflow-hidden rounded-lg shadow-md transition-shadow duration-200 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-emerald-400/45">
                                        <Image
                                            src={country.image}
                                            alt={country.name}
                                            width={64}
                                            height={64}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-600 text-center leading-tight">
                                        {country.name}
                                    </span>
                                </Link>
                            ))}
                            <Link
                                href="/all-country"
                                className="flex flex-col items-center gap-1 group"
                            >
                                <div className="h-16 w-16 overflow-hidden rounded-lg shadow-md transition-shadow duration-200 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-emerald-400/45">
                                    <Image
                                        src="/home/country_icons/sonota.png"
                                        alt="その他"
                                        width={64}
                                        height={64}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <span className="text-[10px] font-medium text-slate-600 text-center leading-tight">
                                    その他
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
