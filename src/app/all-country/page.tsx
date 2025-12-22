"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { countries } from "@/data/countries";

export default function AllCountryPage() {
    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumb items={[{ label: "留学国一覧" }]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                            <Globe className="w-4 h-4" />
                            Destinations
                        </div>
                        <h1 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-4">
                            <span className="text-emerald-600">留学国</span>一覧
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            かえる留学がサポートする留学先国をご紹介。
                            <br className="hidden sm:block" />
                            あなたに合った国を見つけてください。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Countries Grid */}
            <section className="py-12 lg:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {countries.map((country, index) => (
                            <motion.div
                                key={country.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link href={`/all-country/${country.slug}`} className="group block">
                                    <div className="h-full bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300">
                                        {/* Country Header */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-5xl">{country.flag}</span>
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                                                    {country.nameJp}
                                                </h2>
                                                <p className="text-sm text-slate-500">{country.nameEn}</p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                            {country.description}
                                        </p>

                                        {/* Highlights */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {country.highlights.slice(0, 2).map((highlight) => (
                                                <span
                                                    key={highlight}
                                                    className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-medium"
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <span className="text-sm text-slate-500">
                                                費用目安: <span className="font-medium text-slate-700">{country.costRange}</span>
                                            </span>
                                            <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium group-hover:gap-2 transition-all">
                                                詳しく見る
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 lg:py-16 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                            どの国が自分に合っているかわからない？
                        </h2>
                        <p className="text-slate-600 mb-8">
                            無料カウンセリングで、あなたの目的や予算に合った国をご提案します。
                        </p>
                        <Link
                            href="#"
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
