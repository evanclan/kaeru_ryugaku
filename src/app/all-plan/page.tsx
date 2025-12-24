"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight, GraduationCap, School, Sun, Languages } from "lucide-react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { plans } from "@/data/plans";

// Icon mapping
const iconMap = {
    Briefcase,
    GraduationCap,
    School,
    Sun,
    Languages
};

export default function AllPlanPage() {
    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumb items={[{ label: "留学プラン一覧" }]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                            <Briefcase className="w-4 h-4" />
                            Programs
                        </div>
                        <h1 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-4">
                            <span className="text-emerald-600">留学プラン</span>一覧
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            目的や期間に合わせて選べる多彩なプログラム。
                            <br className="hidden sm:block" />
                            あなたにぴったりの留学スタイルを見つけましょう。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Program */}
            {plans.filter(p => p.featured).map((program) => {
                const IconComponent = iconMap[program.iconName];
                return (
                    <section key={program.slug} className="py-12 bg-white border-b border-slate-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <Link href={`/all-plan/${program.slug}`} className="group block">
                                    <div className={`bg-gradient-to-br ${program.gradient} rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden`}>
                                        {/* Background decorations */}
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="absolute top-10 right-10 w-40 h-40 border-2 border-white rounded-full" />
                                            <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-white rounded-full" />
                                        </div>

                                        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                                            <div>
                                                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                                                    🔥 人気プログラム
                                                </span>
                                                <h2 className="text-3xl lg:text-4xl font-bold mb-4">{program.nameJp}</h2>
                                                <p className="text-lg text-white/90 mb-6">{program.description}</p>
                                                <div className="flex flex-wrap gap-4 text-sm">
                                                    <span className="px-3 py-1 bg-white/20 rounded-full">{program.eligibility}</span>
                                                    <span className="px-3 py-1 bg-white/20 rounded-full">{program.duration}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start lg:items-end gap-4">
                                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                                    <IconComponent className="w-10 h-10 text-white" />
                                                </div>
                                                <span className="flex items-center gap-2 text-lg font-medium group-hover:gap-3 transition-all">
                                                    詳しく見る
                                                    <ArrowRight className="w-5 h-5" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </section>
                );
            })}

            {/* All Programs Grid */}
            <section className="py-12 lg:py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">
                            すべての<span className="text-emerald-600">プログラム</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plans.map((program, index) => {
                            const IconComponent = iconMap[program.iconName];
                            return (
                                <motion.div
                                    key={program.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link href={`/all-plan/${program.slug}`} className="group block h-full">
                                        <div className="h-full bg-white rounded-xl p-6 border border-slate-100 hover:border-transparent hover:shadow-xl transition-all duration-300">
                                            {/* Icon */}
                                            <div className={`w-14 h-14 bg-gradient-to-br ${program.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                                <IconComponent className="w-7 h-7 text-white" />
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                                                {program.nameJp}
                                            </h3>
                                            <p className="text-sm text-slate-500 mb-3">{program.nameEn}</p>
                                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                                {program.description}
                                            </p>

                                            {/* Meta */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                                                    {program.eligibility}
                                                </span>
                                                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                                                    {program.duration}
                                                </span>
                                            </div>

                                            {/* CTA */}
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                                <span className="text-sm text-emerald-600 font-medium">{program.costRange}</span>
                                                <span className="flex items-center gap-1 text-slate-500 text-sm group-hover:text-emerald-600 group-hover:gap-2 transition-all">
                                                    詳しく
                                                    <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 lg:py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                            どのプログラムが合っているかわからない？
                        </h2>
                        <p className="text-slate-600 mb-8">
                            あなたの目的、予算、期間に合わせて、最適なプランをご提案します。
                        </p>
                        <Link
                            href="https://form.kaeruryugaku.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                        >
                            無料カウンセリング予約
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </PageLayout>
    );
}
