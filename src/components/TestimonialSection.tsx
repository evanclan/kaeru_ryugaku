"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, MapPin, Quote, Users, ArrowRight } from "lucide-react";
import {
    sectionHeaderVariants,
    staggerContainerVariants,
    fanInVariants,
    starTwinkleVariants,
} from "@/hooks/useScrollAnimation";

const testimonials = [
    {
        id: 1,
        name: "佐藤 美咲",
        age: 20,
        destination: "シドニー",
        quote: "渡航前の英会話レッスンが本当に役立ちました。今では現地のカフェで働いています！",
        rating: 5
    },
    {
        id: 2,
        name: "田中 健太",
        age: 22,
        destination: "バンクーバー",
        quote: "手続きを全部お任せできたので、自分の成長に集中できました。現地オフィスも心強い！",
        rating: 5
    },
    {
        id: 3,
        name: "鈴木 あかり",
        age: 19,
        destination: "ロンドン",
        quote: "手数料0円で費用が明確だったので、バイト代で留学できました。最高の経験です！",
        rating: 5
    }
];

export default function TestimonialSection() {
    return (
        <section className="py-6 lg:py-10 bg-slate-50" id="testimonials">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Compact Header with scroll animation */}
                <motion.div
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center mb-5 relative"
                >
                    {/* Chatting Frogs Mascot */}
                    <motion.img
                        src="/frog-mascot-chat.png"
                        alt="かえるマスコット"
                        className="absolute -top-4 left-0 sm:left-4 lg:left-16 w-16 h-12 sm:w-20 sm:h-14 lg:w-24 lg:h-16 object-contain z-10"
                        animate={{ rotate: [-2, 2, -2] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium mb-2">
                        <Users className="w-3 h-3" />
                        先輩の声
                    </div>
                    <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
                        先輩たちの<span className="text-emerald-600">リアルな体験談</span>
                    </h2>
                    <Link href="/all-review" className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 mt-2 font-medium transition-colors">
                        もっと見る
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Compact 3-column grid with fan-in animation */}
                <motion.div
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid md:grid-cols-3 gap-4"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            variants={fanInVariants}
                            className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                            style={{ perspective: 1000 }}
                        >
                            {/* Header row */}
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    {testimonial.name.charAt(0)}
                                </motion.div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-slate-800">{testimonial.name}</span>
                                        <span className="text-xs text-slate-400">({testimonial.age}歳)</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-emerald-600">
                                        <MapPin className="w-3 h-3" />
                                        {testimonial.destination}
                                    </div>
                                </div>
                                {/* Stars with twinkle animation */}
                                <div className="flex gap-0.5">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0, rotate: -30 }}
                                            whileInView={{ scale: 1, rotate: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: 0.5 + i * 0.1,
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 15
                                            }}
                                        >
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="relative">
                                <Quote className="absolute -top-1 -left-1 w-5 h-5 text-emerald-100" />
                                <p className="text-xs text-slate-600 leading-relaxed pl-4 italic">
                                    {testimonial.quote}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
