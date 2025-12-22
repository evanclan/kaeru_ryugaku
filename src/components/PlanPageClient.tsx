"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Clock,
    CreditCard,
    Users,
    CheckCircle2,
    ArrowRight,
    Star,
    Sparkles,
    Briefcase,
    GraduationCap,
    School,
    Sun,
    Languages
} from "lucide-react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { PlanData } from "@/data/plans";
import { Country } from "@/data/countries";

// Icon mapping
const iconMap = {
    Briefcase,
    GraduationCap,
    School,
    Sun,
    Languages
};

interface PlanPageClientProps {
    plan: PlanData;
    availableCountries: Country[];
}

export default function PlanPageClient({ plan, availableCountries }: PlanPageClientProps) {
    const IconComponent = iconMap[plan.iconName];

    return (
        <PageLayout>
            {/* Hero Section */}
            <section className={`bg-gradient-to-br ${plan.gradient} py-12 lg:py-20 text-white relative overflow-hidden`}>
                {/* Background decorations */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-20 w-60 h-60 border-2 border-white rounded-full" />
                    <div className="absolute bottom-20 left-20 w-40 h-40 border-2 border-white rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Breadcrumb
                        items={[
                            { label: "留学プラン一覧", href: "/all-plan" },
                            { label: plan.nameJp }
                        ]}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col lg:flex-row items-center gap-8 mt-8"
                    >
                        {/* Icon */}
                        <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <IconComponent className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                        </div>

                        {/* Info */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-3xl lg:text-5xl font-bold mb-2">
                                {plan.nameJp}
                            </h1>
                            <p className="text-lg text-white/80 mb-4">{plan.nameEn}</p>
                            <p className="text-lg text-white/90 leading-relaxed max-w-2xl">
                                {plan.longDescription}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Key Info */}
            <section className="py-8 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center p-4"
                        >
                            <Users className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                            <p className="text-xs text-slate-500 mb-1">対象</p>
                            <p className="font-bold text-slate-800">{plan.eligibility}</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-center p-4"
                        >
                            <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                            <p className="text-xs text-slate-500 mb-1">期間</p>
                            <p className="font-bold text-slate-800">{plan.duration}</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center p-4"
                        >
                            <CreditCard className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                            <p className="text-xs text-slate-500 mb-1">費用目安</p>
                            <p className="font-bold text-emerald-600">{plan.costRange}</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center p-4"
                        >
                            <Star className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                            <p className="text-xs text-slate-500 mb-1">対応国数</p>
                            <p className="font-bold text-slate-800">{availableCountries.length}ヶ国</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Highlights & Benefits */}
            <section className="py-12 lg:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Highlights */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Sparkles className="w-5 h-5 text-amber-500" />
                                <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
                                    このプログラムの<span className="text-emerald-600">特徴</span>
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {plan.highlights.map((highlight, index) => (
                                    <motion.div
                                        key={highlight}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                        <span className="text-slate-700 font-medium">{highlight}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Benefits */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-xl lg:text-2xl font-bold text-slate-800 mb-6">
                                <span className="text-emerald-600">メリット</span>
                            </h2>
                            <div className="bg-slate-50 rounded-xl p-6">
                                <ul className="space-y-4">
                                    {plan.benefits.map((benefit, index) => (
                                        <motion.li
                                            key={benefit}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <span className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                                                {index + 1}
                                            </span>
                                            <span className="text-slate-700">{benefit}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Available Countries */}
            <section className="py-12 lg:py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                            {plan.nameJp}ができる<span className="text-emerald-600">国</span>
                        </h2>
                        <p className="text-slate-600">このプログラムを利用できる留学先</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableCountries.map((country, index) => (
                            <motion.div
                                key={country.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link href={`/all-country/${country.slug}`} className="group block">
                                    <div className="bg-white rounded-xl p-5 border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all">
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-4xl">{country.flag}</span>
                                            <div>
                                                <h3 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                                                    {country.nameJp}
                                                </h3>
                                                <p className="text-sm text-slate-500">{country.nameEn}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-3">{country.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-emerald-600 font-medium">{country.costRange}</span>
                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 lg:py-16 bg-gradient-to-br from-emerald-600 to-teal-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                            {plan.nameJp}に興味がありますか？
                        </h2>
                        <p className="text-emerald-100 mb-8">
                            無料カウンセリングで、あなたに合ったプランをご提案します。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-emerald-50">
                                無料カウンセリング予約
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                資料請求
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PageLayout>
    );
}
