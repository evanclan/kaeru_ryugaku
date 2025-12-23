"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Briefcase,
    GraduationCap,
    School,
    Sun,
    Languages,
    ArrowRight
} from "lucide-react";
import {
    staggerContainerVariants,
    cardRevealVariants,
    sectionHeaderVariants,
    popInVariants,
} from "@/hooks/useScrollAnimation";

const programs = [
    {
        id: "working-holiday",
        icon: Briefcase,
        title: "ワーキングホリデー",
        titleEn: "Working Holiday",
        description: "働きながら海外生活を体験。語学力と実践スキルを同時に習得できる人気プログラム。",
        highlight: "18〜30歳対象",
        featured: true,
        gradient: "from-emerald-500 to-teal-600",
        image: "/program-working-holiday.jpg"
    },
    {
        id: "language-study",
        icon: Languages,
        title: "語学留学",
        titleEn: "Language Study",
        description: "集中的に語学力を向上させたい方向け。短期から長期まで柔軟に選べます。",
        highlight: "年齢制限なし",
        featured: false,
        gradient: "from-blue-500 to-indigo-600",
        image: "/program-language-study.jpg",
        imagePosition: "object-[center_30%]"
    },
    {
        id: "philippines-study",
        icon: GraduationCap,
        title: "フィリピン留学",
        titleEn: "Philippines Study",
        description: "マンツーマン集中レッスンでコスパ◎",
        highlight: "短期OK",
        featured: false,
        gradient: "from-blue-500 to-indigo-600",
        image: "/program-philippines-study.jpg"
    },
    {
        id: "high-school",
        icon: School,
        title: "高校留学",
        titleEn: "High School",
        description: "現地校で異文化体験＆語学習得",
        highlight: "1年〜",
        featured: false,
        gradient: "from-purple-500 to-pink-600",
        image: "/program-high-school.jpg"
    },
    {
        id: "junior-summercamp",
        icon: Sun,
        title: "ジュニアサマーキャンプ",
        titleEn: "Junior Summercamp",
        description: "夏休みを活用した短期体験プログラム",
        highlight: "小中学生",
        featured: false,
        gradient: "from-orange-500 to-amber-600",
        image: "/program-junior-summercamp.jpg"
    }
];

export default function ProgramsSection() {
    const featuredProgram = programs.find(p => p.featured);
    const otherPrograms = programs.filter(p => !p.featured);

    return (
        <section className="py-6 lg:py-10 bg-white" id="programs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Compact Header with Student Image - Scroll animated */}
                <motion.div
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative mb-6"
                >
                    <div className="text-center">
                        <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
                            <span className="text-amber-600">プログラム</span>一覧
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">あなたに合った留学スタイルを選べます</p>
                        <Link href="/all-plan" className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 mt-2 font-medium transition-colors">
                            すべて見る
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Student Image - Desktop only */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="hidden lg:block absolute top-[-20%] -right-50 z-10"
                    >
                        <Image
                            src="/student-programs.png"
                            alt="留学生"
                            width={400}
                            height={350}
                            className="object-contain drop-shadow-lg"
                        />
                    </motion.div>
                </motion.div>

                {/* Desktop: Bento Grid with staggered reveal */}
                <motion.div
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="hidden md:grid md:grid-cols-3 md:grid-rows-2 gap-4"
                >
                    {/* Featured Program - spans 2 rows */}
                    {featuredProgram && (
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, scale: 0.95, x: -30 },
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    x: 0,
                                    transition: { duration: 0.6, ease: "easeOut" as const }
                                }
                            }}
                            className="md:row-span-2 group"
                        >
                            <div className={`h-full rounded-2xl p-5 text-white relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1`}>
                                {/* Background Image */}
                                {featuredProgram.image ? (
                                    <>
                                        <Image
                                            src={featuredProgram.image}
                                            alt={featuredProgram.title}
                                            fill
                                            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-opacity duration-300 group-hover:from-black/70 group-hover:via-black/30 group-hover:to-transparent`} />
                                    </>
                                ) : (
                                    <>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${featuredProgram.gradient}`} />
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full" />
                                            <div className="absolute bottom-4 left-4 w-20 h-20 border-2 border-white rounded-full" />
                                        </div>
                                    </>
                                )}

                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                                        <featuredProgram.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium w-fit mb-2">
                                        {featuredProgram.highlight}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{featuredProgram.title}</h3>
                                    <p className="text-sm text-white/90 leading-relaxed flex-grow">
                                        {featuredProgram.description}
                                    </p>
                                    <button className="mt-4 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                                        詳しく見る
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Other Programs - 2x2 grid with staggered cascade */}
                    {otherPrograms.map((program, index) => (
                        <motion.div
                            key={program.id}
                            variants={cardRevealVariants}
                            className="group"
                        >
                            <div className={`h-full rounded-xl p-4 border transition-all duration-300 relative overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-0.5 ${program.image ? 'border-transparent' : 'bg-slate-50 hover:bg-white border-slate-100 hover:border-transparent'}`}>
                                {/* Background Image or Gradient Border */}
                                {program.image ? (
                                    <>
                                        <Image
                                            src={program.image}
                                            alt={program.title}
                                            fill
                                            className={`object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 ${program.imagePosition || ''}`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 transition-all duration-300 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20" />
                                    </>
                                ) : (
                                    <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} style={{ padding: '2px' }}>
                                        <div className="absolute inset-[2px] bg-white rounded-[10px]" />
                                    </div>
                                )}

                                <div className="relative z-10">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 ${program.image ? 'bg-white/20 backdrop-blur-sm' : `bg-gradient-to-br ${program.gradient}`} rounded-lg flex items-center justify-center shrink-0 shadow-sm`}>
                                            <program.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className={`text-base font-bold ${program.image ? 'text-white drop-shadow-md' : 'text-slate-800'}`}>{program.title}</h3>
                                            </div>
                                            <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded mb-1.5 ${program.image ? 'text-white/90 bg-white/20' : 'text-slate-500 bg-slate-100'}`}>
                                                {program.highlight}
                                            </span>
                                            <p className={`text-xs leading-relaxed ${program.image ? 'text-white/90' : 'text-slate-600'}`}>
                                                {program.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mobile: Stacked cards with scroll animations */}
                <motion.div
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                    className="md:hidden space-y-3"
                >
                    {/* Featured Program Card */}
                    {featuredProgram && (
                        <motion.div
                            variants={cardRevealVariants}
                        >
                            <div className={`rounded-xl p-4 text-white relative overflow-hidden`}>
                                {/* Background Image */}
                                {featuredProgram.image ? (
                                    <>
                                        <Image
                                            src={featuredProgram.image}
                                            alt={featuredProgram.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30`} />
                                    </>
                                ) : (
                                    <div className={`absolute inset-0 bg-gradient-to-br ${featuredProgram.gradient}`} />
                                )}
                                <div className="relative z-10 flex items-start gap-3">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
                                        <featuredProgram.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-base font-bold">{featuredProgram.title}</h3>
                                            <span className="text-[10px] font-medium bg-white/20 px-1.5 py-0.5 rounded-full">
                                                {featuredProgram.highlight}
                                            </span>
                                        </div>
                                        <p className="text-xs text-white/90 leading-relaxed">
                                            {featuredProgram.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Other Programs - Compact grid with stagger */}
                    <motion.div
                        variants={staggerContainerVariants}
                        className="grid grid-cols-2 gap-2"
                    >
                        {otherPrograms.map((program, index) => (
                            <motion.div
                                key={program.id}
                                variants={cardRevealVariants}
                            >
                                <div className={`rounded-lg p-3 h-full relative overflow-hidden ${program.image ? '' : 'bg-slate-50 border border-slate-100'}`}>
                                    {program.image && (
                                        <>
                                            <Image
                                                src={program.image}
                                                alt={program.title}
                                                fill
                                                className={`object-cover ${program.imagePosition || ''}`}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                                        </>
                                    )}
                                    <div className="relative z-10">
                                        <div className={`w-8 h-8 ${program.image ? 'bg-white/20 backdrop-blur-sm' : `bg-gradient-to-br ${program.gradient}`} rounded-lg flex items-center justify-center mb-2`}>
                                            <program.icon className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className={`text-sm font-bold mb-0.5 ${program.image ? 'text-white drop-shadow-md' : 'text-slate-800'}`}>{program.title}</h3>
                                        <span className={`text-[10px] ${program.image ? 'text-white/80' : 'text-slate-500'}`}>{program.highlight}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section >
    );
}
