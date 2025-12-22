"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Star,
    MapPin,
    Quote,
    Users,
    Filter,
    Search
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";

const testimonials = [
    {
        id: 1,
        name: "佐藤 美咲",
        age: 20,
        destination: "シドニー",
        country: "australia",
        program: "ワーキングホリデー",
        quote: "渡航前の英会話レッスンが本当に役立ちました。今では現地のカフェで働いています！最初は不安でしたが、現地オフィスの方々がいつも親身になって相談に乗ってくれました。",
        rating: 5,
        duration: "1年間"
    },
    {
        id: 2,
        name: "田中 健太",
        age: 22,
        destination: "バンクーバー",
        country: "canada",
        program: "語学留学",
        quote: "手続きを全部お任せできたので、自分の成長に集中できました。現地オフィスも心強い！カナダでの生活は最高で、英語力も格段に上がりました。",
        rating: 5,
        duration: "6ヶ月"
    },
    {
        id: 3,
        name: "鈴木 あかり",
        age: 19,
        destination: "ロンドン",
        country: "uk",
        program: "語学留学",
        quote: "手数料0円で費用が明確だったので、バイト代で留学できました。最高の経験です！ヨーロッパ各地への旅行もできて、視野が広がりました。",
        rating: 5,
        duration: "3ヶ月"
    },
    {
        id: 4,
        name: "山田 翔太",
        age: 24,
        destination: "トロント",
        country: "canada",
        program: "ワーキングホリデー",
        quote: "最初は英語が全くできませんでしたが、渡航前レッスンのおかげで自信を持って出発できました。今は現地企業でインターンをしています。",
        rating: 5,
        duration: "1年間"
    },
    {
        id: 5,
        name: "伊藤 さくら",
        age: 21,
        destination: "メルボルン",
        country: "australia",
        program: "語学留学",
        quote: "カウンセラーさんが本当に親身になって相談に乗ってくれました。不安なことがあればすぐにLINEで質問できるのが心強かったです。",
        rating: 5,
        duration: "4ヶ月"
    },
    {
        id: 6,
        name: "高橋 大輝",
        age: 23,
        destination: "オークランド",
        country: "new-zealand",
        program: "ワーキングホリデー",
        quote: "ニュージーランドの大自然の中で過ごした1年は人生で最高の経験でした。ファームステイも紹介してもらい、かけがえのない思い出ができました。",
        rating: 5,
        duration: "1年間"
    },
    {
        id: 7,
        name: "渡辺 真由",
        age: 18,
        destination: "セブ",
        country: "philippines",
        program: "フィリピン留学",
        quote: "短期間でしたが、マンツーマンレッスンのおかげでTOEICスコアが200点以上アップしました！費用も抑えられて大満足です。",
        rating: 5,
        duration: "2ヶ月"
    },
    {
        id: 8,
        name: "小林 優斗",
        age: 25,
        destination: "バンクーバー",
        country: "canada",
        program: "ワーキングホリデー",
        quote: "留学後のキャリア相談まで手厚くサポートしてもらいました。今は外資系企業で働いています。かえる留学を選んで本当に良かった！",
        rating: 5,
        duration: "1年半"
    },
    {
        id: 9,
        name: "加藤 美優",
        age: 20,
        destination: "ブリスベン",
        country: "australia",
        program: "語学留学",
        quote: "オーストラリアの穏やかな雰囲気が大好きでした。語学学校の友達とは今でも連絡を取り合っています。世界中に友達ができました！",
        rating: 5,
        duration: "8ヶ月"
    }
];

export default function AllReviewPage() {
    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumb items={[{ label: "お客様の声" }]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                            <Users className="w-4 h-4" />
                            Testimonials
                        </div>
                        <h1 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-4">
                            先輩たちの
                            <span className="text-emerald-600">リアルな体験談</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            かえる留学でサポートした先輩たちの声をご紹介。
                            <br className="hidden sm:block" />
                            リアルな体験談を参考に、あなたの留学プランを考えてみませんか？
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-12 lg:py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filter Bar (placeholder for future functionality) */}
                    <div className="flex flex-wrap gap-3 mb-8 justify-center">
                        <span className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium cursor-pointer">
                            すべて
                        </span>
                        <span className="px-4 py-2 bg-white text-slate-600 rounded-full text-sm font-medium border border-slate-200 hover:border-emerald-300 cursor-pointer transition-colors">
                            カナダ
                        </span>
                        <span className="px-4 py-2 bg-white text-slate-600 rounded-full text-sm font-medium border border-slate-200 hover:border-emerald-300 cursor-pointer transition-colors">
                            オーストラリア
                        </span>
                        <span className="px-4 py-2 bg-white text-slate-600 rounded-full text-sm font-medium border border-slate-200 hover:border-emerald-300 cursor-pointer transition-colors">
                            ニュージーランド
                        </span>
                        <span className="px-4 py-2 bg-white text-slate-600 rounded-full text-sm font-medium border border-slate-200 hover:border-emerald-300 cursor-pointer transition-colors">
                            その他
                        </span>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow"
                            >
                                {/* Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-base font-bold text-slate-800">{testimonial.name}</span>
                                            <span className="text-sm text-slate-400">({testimonial.age}歳)</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-emerald-600">
                                            <MapPin className="w-4 h-4" />
                                            {testimonial.destination}
                                        </div>
                                    </div>
                                </div>

                                {/* Meta */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-medium">
                                        {testimonial.program}
                                    </span>
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                                        {testimonial.duration}
                                    </span>
                                </div>

                                {/* Quote */}
                                <div className="relative">
                                    <Quote className="absolute -top-1 -left-1 w-6 h-6 text-emerald-100" />
                                    <p className="text-sm text-slate-600 leading-relaxed pl-5 italic">
                                        {testimonial.quote}
                                    </p>
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1 mt-4 pt-4 border-t border-slate-100">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-10">
                        <Button variant="outline" size="lg">
                            もっと見る
                        </Button>
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
                            あなたも留学体験をスタートしませんか？
                        </h2>
                        <p className="text-slate-600 mb-8">
                            まずは無料カウンセリングで、あなたに合った留学プランをご相談ください。
                        </p>
                        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                            無料カウンセリング予約
                        </Button>
                    </motion.div>
                </div>
            </section>
        </PageLayout>
    );
}
