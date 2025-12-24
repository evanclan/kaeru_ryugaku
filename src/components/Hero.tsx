"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    MessageCircle,
    CheckCircle2,
    Award,
    Users,
    ArrowRight,
    Globe,
    Clock,
    Shield
} from "lucide-react";

const slideshowImages = [
    "/slideshow-1.jpg",
    "/slideshow-2.jpg",
    "/slideshow-3.jpg",
    "/slideshow-4.jpg",
    "/slideshow-5.jpg",
];

const trustBadges = [
    { icon: Award, label: "JAOS認定", value: "" },
    { icon: Users, label: "満足度", value: "98%" },
    { icon: CheckCircle2, label: "実績", value: "3000名+" },
];

const quickStats = [
    { icon: Globe, label: "対応国", value: "8ヶ国" },
    { icon: Clock, label: "サポート", value: "24時間" },
    { icon: Shield, label: "手数料", value: "0円" },
];

export default function Hero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative pt-24 pb-8 lg:pt-32 lg:pb-12 overflow-hidden">
            {/* Background Slideshow */}
            <div className="absolute inset-0">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={slideshowImages[currentImageIndex]}
                            alt="留学体験"
                            fill
                            className="object-cover"
                            priority={currentImageIndex === 0}
                        />
                    </motion.div>
                </AnimatePresence>
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
                {/* Subtle emerald tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent" />
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute top-10 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-300/10 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">

                    {/* Left Content - 3 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3 space-y-4"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 rounded-full text-xs font-medium border border-emerald-400/30">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                            鹿児島発・留学エージェント
                        </div>

                        {/* Headline - Compact */}
                        <h1 className="text-2xl sm:text-3xl lg:text-[2.625rem] font-bold text-white leading-tight drop-shadow-lg">
                            英語力0でも大丈夫。
                            <br />
                            <span className="text-emerald-400 lg:text-5xl">あなたに寄り添う、</span><br />
                            失敗しない留学を。
                        </h1>

                        {/* Subtext - Compact */}
                        <p className="text-sm lg:text-base text-slate-200 leading-relaxed max-w-lg drop-shadow-md">
                            鹿児島（Kagoshima）を拠点とする留学サポート専門エージェント。安心のサポート体制と丁寧な対応で、あなたの留学をしっかりと支えます。
                        </p>

                        {/* CTA Buttons - Inline */}
                        <div className="flex flex-wrap gap-3 mt-18">
                            <a href="https://form.kaeruryugaku.com/" target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="group shadow-md shadow-amber-500/30 text-sm h-10">
                                    まずは無料相談
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </a>
                            <Button variant="outline" size="lg" className="group text-sm h-10 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                                <MessageCircle className="w-4 h-4 text-emerald-400" />
                                LINEで質問
                            </Button>
                        </div>

                        {/* Trust Badges - Horizontal compact */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            {trustBadges.map((badge) => (
                                <div
                                    key={badge.label}
                                    className="flex items-center gap-1.5 text-white/90"
                                >
                                    <badge.icon className="w-4 h-4 text-emerald-400" />
                                    <span className="text-xs font-medium">
                                        {badge.label}{badge.value && ` ${badge.value}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Visual - Group Photo + Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 hidden lg:flex flex-col items-center justify-end overflow-visible"
                    >
                        <Image
                            src="/hero-group-photo.png"
                            alt="留学生グループ"
                            width={500}
                            height={500}
                            className="object-contain drop-shadow-2xl"
                            priority
                        />

                        {/* Premium Badge - かえる留学の強み */}
                        <div className="relative mt-3">
                            {/* Gradient border glow */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400 rounded-2xl blur-sm opacity-60" />

                            {/* Badge container */}
                            <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/10">
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent rounded-2xl" />

                                {/* Header with crown/star accent */}
                                <div className="relative flex items-center justify-center gap-2 mb-3">
                                    <div className="h-px w-8 bg-gradient-to-r from-transparent via-emerald-400/50 to-emerald-400" />
                                    <h3 className="text-xs font-bold text-white tracking-wide uppercase">
                                        かえる留学の強み
                                    </h3>
                                    <div className="h-px w-8 bg-gradient-to-l from-transparent via-emerald-400/50 to-emerald-400" />
                                </div>

                                {/* Stats row - horizontal layout */}
                                <div className="relative flex items-center justify-center gap-6">
                                    {quickStats.map((stat, index) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 flex items-center justify-center border border-emerald-400/30 shrink-0">
                                                <stat.icon className="w-4 h-4 text-emerald-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-base font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent leading-tight">
                                                    {stat.value}
                                                </span>
                                                <span className="text-[9px] text-slate-400 font-medium">
                                                    {stat.label}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section >
    );
}
