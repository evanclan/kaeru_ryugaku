"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    MapPin,
    Thermometer,
    CreditCard,
    FileText,
    CheckCircle2,
    ArrowRight,
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
import { Country } from "@/data/countries";
import { PlanData } from "@/data/plans";

// Icon mapping
const iconMap = {
    Briefcase,
    GraduationCap,
    School,
    Sun,
    Languages
};

interface CountryPageClientProps {
    country: Country;
    relatedPrograms: PlanData[];
}

export default function CountryPageClient({ country, relatedPrograms }: CountryPageClientProps) {
    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumb
                        items={[
                            { label: "留学国一覧", href: "/all-country" },
                            { label: country.nameJp }
                        ]}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col lg:flex-row items-center gap-8"
                    >
                        {/* Flag */}
                        <div className="text-8xl lg:text-[150px]">{country.flag}</div>

                        {/* Info */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-2">
                                {country.nameJp}
                                <span className="text-emerald-600">留学</span>
                            </h1>
                            <p className="text-lg text-slate-500 mb-4">{country.nameEn} Study Abroad</p>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                                {country.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-8 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {country.highlights.map((highlight, index) => (
                            <motion.div
                                key={highlight}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="font-medium">{highlight}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Country Details */}
            <section className="py-12 lg:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Popular Cities */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 rounded-xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-emerald-600" />
                                </div>
                                <h3 className="font-bold text-slate-800">人気都市</h3>
                            </div>
                            <ul className="space-y-2">
                                {country.popularCities.map((city) => (
                                    <li key={city} className="text-sm text-slate-600 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                        {city}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Climate */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-slate-50 rounded-xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                    <Thermometer className="w-5 h-5 text-amber-600" />
                                </div>
                                <h3 className="font-bold text-slate-800">気候</h3>
                            </div>
                            <p className="text-sm text-slate-600">{country.climate}</p>
                        </motion.div>

                        {/* Cost */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-50 rounded-xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-slate-800">費用目安</h3>
                            </div>
                            <p className="text-lg font-bold text-emerald-600">{country.costRange}</p>
                            <p className="text-xs text-slate-500 mt-1">※生活費・学費込みの目安</p>
                        </motion.div>

                        {/* Visa */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-slate-50 rounded-xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-purple-600" />
                                </div>
                                <h3 className="font-bold text-slate-800">ビザ</h3>
                            </div>
                            <p className="text-sm text-slate-600">{country.visa}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Available Programs */}
            <section className="py-12 lg:py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                            {country.nameJp}で参加できる
                            <span className="text-emerald-600">プログラム</span>
                        </h2>
                        <p className="text-slate-600">この国で利用可能な留学プログラム</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedPrograms.map((program, index) => {
                            const IconComponent = iconMap[program.iconName];
                            return (
                                <motion.div
                                    key={program.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={`/all-plan/${program.slug}`} className="group block">
                                        <div className={`h-full bg-gradient-to-br ${program.gradient} rounded-xl p-6 text-white hover:shadow-xl transition-shadow`}>
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{program.nameJp}</h3>
                                            <p className="text-sm text-white/90 mb-4">{program.description}</p>
                                            <div className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                                                詳しく見る
                                                <ArrowRight className="w-4 h-4" />
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
            <section className="py-12 lg:py-16 bg-gradient-to-br from-emerald-600 to-teal-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                            {country.nameJp}留学に興味がありますか？
                        </h2>
                        <p className="text-emerald-100 mb-8">
                            無料カウンセリングで、あなたに合ったプランをご提案します。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="https://form.kaeruryugaku.com/" target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-emerald-50">
                                    無料カウンセリング予約
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </a>
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
