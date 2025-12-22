"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Calculator,
    Building2,
    MessageSquare,
    Shield,
    HeartHandshake,
    Clock,
    CheckCircle2,
    Sparkles,
    ArrowRight
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const reasons = [
    {
        icon: Calculator,
        title: "手数料0円の明朗会計",
        subtitle: "隠れた費用は一切なし",
        description: "かえる留学は、学校からの紹介料で運営しています。お客様から手数料をいただくことは一切ありません。見積もりは明確で、後から追加費用が発生することもありません。",
        highlights: ["相談・カウンセリング無料", "見積もり明細を詳細に提示", "追加費用なしの安心価格"],
        gradient: "from-emerald-500 to-teal-600"
    },
    {
        icon: Building2,
        title: "現地オフィスでサポート",
        subtitle: "主要都市に日本語対応拠点",
        description: "カナダ、オーストラリア、イギリスなど主要都市に現地オフィスを構えています。困ったときは日本語で相談できる環境で、安心して留学生活を送れます。",
        highlights: ["バンクーバー、シドニー、ロンドンなど", "日本人スタッフ常駐", "緊急時24時間対応"],
        gradient: "from-blue-500 to-indigo-600"
    },
    {
        icon: MessageSquare,
        title: "渡航前英会話レッスン",
        subtitle: "3ヶ月間無料でご提供",
        description: "留学前に英語力を上げておきたい方へ、オンライン英会話レッスンを3ヶ月間無料でご提供。基礎から学べるので、英語に自信がない方も安心です。",
        highlights: ["オンラインで自宅から受講", "日常会話からビジネスまで", "ネイティブ講師による指導"],
        gradient: "from-purple-500 to-pink-600"
    },
    {
        icon: Shield,
        title: "万全のサポート体制",
        subtitle: "渡航前から帰国後まで",
        description: "カウンセリングから学校選び、ビザ申請、航空券手配、保険加入、現地サポート、帰国後のキャリア相談まで。留学の全プロセスを一貫してサポートします。",
        highlights: ["経験豊富なカウンセラー", "ビザ申請代行", "帰国後キャリアサポート"],
        gradient: "from-amber-500 to-orange-600"
    },
    {
        icon: HeartHandshake,
        title: "一人ひとりに寄り添う対応",
        subtitle: "あなただけの留学プラン",
        description: "目的や予算、期間に合わせて、最適な留学プランをご提案。画一的なプランではなく、あなたの夢を叶えるためのオーダーメイドプランを作成します。",
        highlights: ["完全個別カウンセリング", "予算に応じた提案", "目標達成までフォロー"],
        gradient: "from-rose-500 to-red-600"
    },
    {
        icon: Clock,
        title: "迅速なレスポンス",
        subtitle: "質問への回答は基本24時間以内",
        description: "「聞きたいことがあるのに返信が来ない」というストレスを感じさせません。質問には迅速に回答し、スムーズな留学準備をサポートします。",
        highlights: ["LINE・メールで気軽に相談", "土日も対応可能", "緊急時は電話対応"],
        gradient: "from-cyan-500 to-blue-600"
    }
];

const stats = [
    { value: "1,500+", label: "サポート実績" },
    { value: "98%", label: "満足度" },
    { value: "7", label: "対応国数" },
    { value: "0円", label: "手数料" },
];

export default function WhyUsPage() {
    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumb items={[{ label: "選ばれる理由" }]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                            <Sparkles className="w-4 h-4" />
                            Why Choose Us
                        </div>
                        <h1 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-4">
                            かえる留学が
                            <span className="text-emerald-600">選ばれる理由</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            1,500名以上の留学をサポートしてきた実績と信頼。
                            <br className="hidden sm:block" />
                            あなたの留学を成功に導く、万全のサポート体制をご紹介します。
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
                    >
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-100 shadow-sm"
                            >
                                <div className="text-2xl lg:text-3xl font-bold text-emerald-600">{stat.value}</div>
                                <div className="text-sm text-slate-600">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Reasons Grid */}
            <section className="py-12 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reasons.map((reason, index) => (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="h-full bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-transparent hover:shadow-xl transition-all duration-300">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${reason.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <reason.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="mb-3">
                                        <h3 className="text-xl font-bold text-slate-800 mb-1">{reason.title}</h3>
                                        <span className="text-sm font-medium text-emerald-600">{reason.subtitle}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                        {reason.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {reason.highlights.map((highlight) => (
                                            <li key={highlight} className="flex items-center gap-2 text-xs text-slate-700">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 lg:py-20 bg-gradient-to-br from-emerald-600 to-teal-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
                            まずは無料カウンセリングから
                        </h2>
                        <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                            留学に関する疑問や不安、何でもお聞かせください。
                            経験豊富なカウンセラーが、あなたに最適なプランをご提案します。
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
