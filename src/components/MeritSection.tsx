"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    Heart,
    ArrowRight,
    Sparkles
} from "lucide-react";
import {
    slideFromLeftVariants,
    slideFromRightVariants,
    staggerContainerVariants,
    popInVariants,
    sectionHeaderVariants,
} from "@/hooks/useScrollAnimation";

const reasons = [
    {
        number: "01",
        logo: "/logo-01.png",
        title: "お客様との距離を信頼にかえる！",
        description: "直接お会いして話すことを大切にし、信頼関係があるからこそできるリアルな体験談を発信しています。留学を単なる商品ではなく「人生の一部」と捉え、一人ひとりに寄り添ったプランを提案します。",
        highlight: "人生の一部",
        gradient: "from-rose-500 to-pink-600",
        cardBg: "from-white via-white to-rose-50/40"
    },
    {
        number: "02",
        logo: "/logo-02.png",
        title: "正直な姿勢で留学案内をかえる！",
        description: "留学は楽しいことばかりではありません。私たちは耳ざわりの良い話だけでなく、現実的な課題も包み隠さずお伝えします。ありのままを知ることが、本当の成功への第一歩だと信じているからです。",
        highlight: "本当の成功",
        gradient: "from-amber-500 to-orange-600",
        cardBg: "from-white via-white to-amber-50/40"
    },
    {
        number: "03",
        logo: "/logo-03.png",
        title: "急かさず選べる納得留学にかえる！",
        description: "営業電話や押し売りは一切ナシ。かえる留学はあなたのペースで進めます。納得いくまで相談できる、安心のサポートが私たちの約束です。",
        highlight: "あなたのペース",
        gradient: "from-emerald-500 to-teal-600",
        cardBg: "from-white via-white to-emerald-50/40"
    }
];

// Card reveal variant with stagger
const cardItemVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.98 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" as const }
    }
};

export default function MeritSection() {
    return (
        <section className="py-8 lg:py-12 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30" id="merits">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header with scroll animation */}
                <motion.div
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center mb-6 lg:mb-8"
                >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium mb-2">
                        <Sparkles className="w-3 h-3" />
                        Why Choose Us
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">
                        選ばれる<span className="text-emerald-600">理由</span>
                    </h2>
                </motion.div>

                {/* Main Content - Image Left, Reasons Right */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                    {/* Left Side - Team Image with Premium Frame - Slides from left */}
                    <motion.div
                        variants={slideFromLeftVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="relative group lg:sticky lg:top-24"
                    >
                        {/* Decorative Background */}
                        <div className="absolute -inset-2 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />

                        {/* Main Image Container */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/50 aspect-[4/3]">
                            <Image
                                src="/kaeru-team.jpg"
                                alt="かえる留学チーム"
                                width={600}
                                height={450}
                                className="w-full h-full object-cover"
                                priority
                            />

                            {/* Overlay with Text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    <span className="text-white/80 text-xs font-medium">鹿児島から世界へ</span>
                                </div>
                                <p className="text-white font-bold text-sm lg:text-base">
                                    お客様の笑顔が私たちの原動力です
                                </p>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            className="absolute -top-3 -right-3 bg-gradient-to-br from-amber-400 to-amber-500 text-white px-3 py-1.5 rounded-full shadow-lg text-xs font-bold flex items-center gap-1.5"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Heart className="w-3 h-3" fill="currentColor" />
                            信頼と実績
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Reasons List - Cards slide in from right */}
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="space-y-4"
                    >
                        {reasons.map((reason, index) => (
                            <motion.div
                                key={reason.number}
                                variants={cardItemVariants}
                                className="group relative"
                            >
                                <div className={`relative bg-gradient-to-br ${reason.cardBg} rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300 overflow-hidden`}>
                                    {/* Gradient Accent Line */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${reason.gradient} rounded-l-xl`} />

                                    <div className="flex gap-4 pl-3">
                                        {/* Number Badge */}
                                        <div className="flex-shrink-0 w-20 h-20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                                            <img
                                                src={reason.logo}
                                                alt={`Reason ${reason.number}`}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            {/* Title with Number */}
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-xs font-bold bg-gradient-to-r ${reason.gradient} bg-clip-text text-transparent`}>
                                                    {reason.number}
                                                </span>
                                                <h3 className="text-sm lg:text-base font-bold text-slate-800 leading-tight">
                                                    {reason.title}
                                                </h3>
                                            </div>

                                            {/* Description */}
                                            <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">
                                                {reason.description.split(reason.highlight).map((part, i, arr) => (
                                                    <React.Fragment key={i}>
                                                        {part}
                                                        {i < arr.length - 1 && (
                                                            <span className="font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">
                                                                {reason.highlight}
                                                            </span>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Glow Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${reason.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                                </div>
                            </motion.div>
                        ))}

                        {/* View More Link */}
                        <motion.div
                            variants={cardItemVariants}
                            className="pt-2"
                        >
                            <Link
                                href="/why-us"
                                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 group/link transition-colors"
                            >
                                <span>もっと詳しく見る</span>
                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
