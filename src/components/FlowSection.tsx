"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    MessageSquare,
    FileCheck,
    BookOpen,
    Plane,
    HeadphonesIcon
} from "lucide-react";
import {
    sectionHeaderVariants,
    stepBubbleVariants,
} from "@/hooks/useScrollAnimation";

const steps = [
    { number: 1, icon: MessageSquare, title: "カウンセリング", desc: "希望をヒアリング" },
    { number: 2, icon: FileCheck, title: "手続き代行", desc: "学校・ビザ申請" },
    { number: 3, icon: BookOpen, title: "渡航準備", desc: "英会話+オリエン" },
    { number: 4, icon: Plane, title: "出発", desc: "留学スタート！" },
    { number: 5, icon: HeadphonesIcon, title: "現地サポート", desc: "24時間対応" }
];

// Timeline stagger container - sequential reveal
const timelineContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.6, // Wait for line to draw first
        }
    }
};

// Step bubble component with enhanced animations
function StepBubble({ step, index }: { step: typeof steps[0]; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = step.icon;

    return (
        <motion.div
            variants={stepBubbleVariants}
            className="flex flex-col items-center text-center relative z-10 flex-1 group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative mb-3">
                {/* Outer glow ring - appears on hover */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-emerald-400/30"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{
                        scale: isHovered ? 1.5 : 1,
                        opacity: isHovered ? [0.3, 0.5, 0.3] : 0
                    }}
                    transition={{
                        duration: isHovered ? 1.5 : 0.3,
                        repeat: isHovered ? Infinity : 0,
                        ease: "easeInOut"
                    }}
                />

                {/* Pulse ring animation - subtle continuous pulse */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-emerald-400/40"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: index * 0.3
                    }}
                />

                {/* Main bubble */}
                <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
                    animate={{
                        scale: isHovered ? 1.15 : 1,
                        boxShadow: isHovered
                            ? "0 20px 40px -10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)"
                            : "0 10px 20px -5px rgba(16, 185, 129, 0.3)"
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    {/* Inner shine effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                        animate={{
                            x: isHovered ? ["100%", "-100%"] : "100%",
                            opacity: isHovered ? 1 : 0
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Icon with rotation on hover */}
                    <motion.div
                        animate={{
                            rotate: isHovered ? [0, -10, 10, 0] : 0,
                            scale: isHovered ? 1.1 : 1
                        }}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut"
                        }}
                    >
                        <Icon className="w-7 h-7 text-white drop-shadow-sm" />
                    </motion.div>
                </motion.div>

                {/* Step number badge with bounce */}
                <motion.div
                    className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-md border-2 border-white"
                    animate={{
                        scale: isHovered ? [1, 1.2, 1] : 1,
                        rotate: isHovered ? [0, 10, -10, 0] : 0
                    }}
                    transition={{
                        duration: 0.4,
                        ease: "easeOut"
                    }}
                >
                    <span className="text-[11px] font-bold text-white">{step.number}</span>
                </motion.div>
            </div>

            {/* Title with slide up effect */}
            <motion.h3
                className="text-sm font-bold text-slate-800"
                animate={{
                    y: isHovered ? -2 : 0,
                    color: isHovered ? "#059669" : "#1e293b"
                }}
                transition={{ duration: 0.2 }}
            >
                {step.title}
            </motion.h3>

            {/* Description with fade in */}
            <motion.p
                className="text-[11px] text-slate-500 mt-0.5"
                animate={{
                    opacity: isHovered ? 1 : 0.7,
                    y: isHovered ? -1 : 0
                }}
                transition={{ duration: 0.2 }}
            >
                {step.desc}
            </motion.p>
        </motion.div>
    );
}

// Mobile step card with tap animation
function MobileStepCard({ step, index }: { step: typeof steps[0]; index: number }) {
    const Icon = step.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 flex items-center gap-3 bg-gradient-to-r from-slate-50 to-emerald-50/50 rounded-xl px-4 py-3 shadow-sm border border-emerald-100/50 active:bg-emerald-50"
        >
            <motion.div
                className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-md"
                whileTap={{ rotate: 10 }}
            >
                <Icon className="w-5 h-5 text-white" />
            </motion.div>
            <div>
                <div className="text-xs font-semibold text-amber-500 tracking-wide">STEP {step.number}</div>
                <div className="text-sm font-bold text-slate-800">{step.title}</div>
            </div>
        </motion.div>
    );
}

export default function FlowSection() {
    return (
        <section className="py-8 lg:py-12 bg-gradient-to-b from-white to-emerald-50/30 overflow-hidden" id="flow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with scroll animation */}
                <motion.div
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center mb-8"
                >
                    <motion.h2
                        className="text-xl lg:text-2xl font-bold text-slate-800"
                    >
                        留学までの<span className="text-emerald-600 relative">
                            5ステップ
                            {/* Underline animation */}
                            <motion.span
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            />
                        </span>
                    </motion.h2>
                </motion.div>

                {/* Desktop: Horizontal flow with TIMELINE DRAW animation */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="relative"
                >
                    <div className="hidden md:flex items-center justify-between relative">
                        {/* SHOWSTOPPER: Timeline that DRAWS as you scroll */}
                        <div className="absolute top-8 left-[8%] right-[8%] h-1 rounded-full overflow-hidden bg-emerald-100">
                            {/* Draw line animation */}
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                style={{ transformOrigin: "left" }}
                            />
                            {/* Shimmer effect that follows the draw */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                initial={{ x: "-100%" }}
                                whileInView={{ x: "200%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                            />
                        </div>

                        {/* Connection dots that appear sequentially */}
                        {[1, 2, 3, 4].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute top-[30px] w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
                                style={{ left: `${22 + i * 18}%` }}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: 0.3 + i * 0.2,
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 15
                                }}
                            />
                        ))}

                        {/* Steps container with staggered reveal */}
                        <motion.div
                            variants={timelineContainerVariants}
                            className="flex items-center justify-between w-full"
                        >
                            {steps.map((step, index) => (
                                <StepBubble key={step.number} step={step} index={index} />
                            ))}
                        </motion.div>

                        {/* Happy Frog with bounce-in animation */}
                        <motion.div
                            className="ml-4 relative"
                            initial={{ opacity: 0, x: 50, rotate: 10 }}
                            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.8, type: "spring", stiffness: 200, damping: 15 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <motion.img
                                src="/frog-mascot-happy.png"
                                alt="かえるマスコット"
                                className="w-20 h-20 lg:w-24 lg:h-24 object-contain drop-shadow-lg"
                                animate={{
                                    y: [0, -5, 0],
                                    rotate: [0, 3, -3, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            {/* Sparkle effects around frog */}
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full"
                                    style={{
                                        top: `${20 + i * 25}%`,
                                        right: `${10 + i * 20}%`
                                    }}
                                    animate={{
                                        scale: [0, 1, 0],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.4
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* Mobile: Enhanced horizontal scroll */}
                    <div className="md:hidden flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide items-center">
                        {steps.map((step, index) => (
                            <MobileStepCard key={step.number} step={step} index={index} />
                        ))}

                        {/* Happy Frog - Mobile with bounce */}
                        <motion.img
                            src="/frog-mascot-happy.png"
                            alt="かえるマスコット"
                            className="flex-shrink-0 w-14 h-14 object-contain"
                            animate={{
                                y: [0, -3, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
