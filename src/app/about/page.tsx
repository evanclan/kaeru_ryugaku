"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Building2,
    MapPin,
    Users,
    Heart,
    Target,
    Sparkles,
    Mail,
    Phone,
    Clock
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";

const teamMembers = [
    {
        name: "山本 太郎",
        role: "代表 / シニアカウンセラー",
        image: null,
        description: "オーストラリア留学経験者。10年以上の留学支援経験を持ち、1,000名以上の留学をサポート。"
    },
    {
        name: "佐藤 花子",
        role: "カナダ担当カウンセラー",
        image: null,
        description: "バンクーバー在住経験5年。現地事情に精通し、リアルなアドバイスが好評。"
    },
    {
        name: "田中 一郎",
        role: "英語教育担当",
        image: null,
        description: "TESOL資格保持。渡航前英会話レッスンのカリキュラム開発を担当。"
    },
    {
        name: "鈴木 美咲",
        role: "オセアニア担当カウンセラー",
        image: null,
        description: "オーストラリア・ニュージーランド両国での留学経験あり。ワーホリのプロ。"
    }
];

const values = [
    {
        icon: Heart,
        title: "寄り添う姿勢",
        description: "一人ひとりの夢や目標に真剣に向き合い、最適なプランを一緒に考えます。"
    },
    {
        icon: Target,
        title: "結果にコミット",
        description: "留学を「成功」で終わらせるために、渡航前から帰国後まで全力でサポートします。"
    },
    {
        icon: Users,
        title: "チームワーク",
        description: "社内外の専門家と連携し、あらゆる角度からあなたの留学をサポートします。"
    }
];

const offices = [
    {
        location: "鹿児島本社",
        address: "〒890-0000 鹿児島県鹿児島市○○町1-2-3",
        phone: "099-XXX-XXXX",
        hours: "平日 10:00-19:00"
    },
    {
        location: "現地オフィス（バンクーバー）",
        address: "123 Robson Street, Vancouver, BC",
        phone: "+1-XXX-XXX-XXXX",
        hours: "現地時間 9:00-18:00"
    },
    {
        location: "現地オフィス（シドニー）",
        address: "456 George Street, Sydney, NSW",
        phone: "+61-X-XXXX-XXXX",
        hours: "現地時間 9:00-18:00"
    }
];

export default function AboutPage() {
    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumb items={[{ label: "About" }]} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                            <Building2 className="w-4 h-4" />
                            About Us
                        </div>
                        <h1 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-4">
                            かえる留学について
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            鹿児島を拠点に、一人ひとりの留学を全力でサポート。
                            <br className="hidden sm:block" />
                            「帰る場所がある」という安心感とともに、世界へ羽ばたくお手伝いをします。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-12 lg:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                                私たちの
                                <span className="text-emerald-600">ミッション</span>
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                「かえる留学」は、鹿児島県から世界へ羽ばたく若者を応援する留学エージェントです。
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                「かえる」という名前には、「世界を見て成長し、帰ってくる」という意味が込められています。
                                留学は終わりではなく、新しい自分へ「変える」きっかけ。
                                私たちは、その第一歩を踏み出すあなたを全力でサポートします。
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                英語が苦手でも、留学が初めてでも大丈夫。
                                一人ひとりのペースに合わせて、丁寧にサポートいたします。
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white"
                        >
                            <Sparkles className="w-12 h-12 mb-4 text-emerald-100" />
                            <h3 className="text-2xl font-bold mb-4">
                                "人生を変える留学を、もっと身近に"
                            </h3>
                            <p className="text-emerald-100 leading-relaxed">
                                費用や言語の壁を取り除き、誰もが留学にチャレンジできる環境を作ること。
                                それが私たちの願いです。
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-12 lg:py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                            私たちの<span className="text-emerald-600">価値観</span>
                        </h2>
                        <p className="text-slate-600">大切にしている3つのこと</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl p-6 text-center border border-slate-100 shadow-sm"
                            >
                                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="w-7 h-7 text-emerald-600" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">{value.title}</h3>
                                <p className="text-sm text-slate-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-12 lg:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                            <span className="text-emerald-600">チーム</span>メンバー
                        </h2>
                        <p className="text-slate-600">留学経験豊富なスタッフがサポートします</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-50 rounded-xl p-6 text-center"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className="text-base font-bold text-slate-800">{member.name}</h3>
                                <p className="text-sm text-emerald-600 font-medium mb-2">{member.role}</p>
                                <p className="text-xs text-slate-600">{member.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact / Offices Section */}
            <section className="py-12 lg:py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                            <span className="text-emerald-600">オフィス</span>情報
                        </h2>
                        <p className="text-slate-600">鹿児島本社と海外現地オフィス</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {offices.map((office, index) => (
                            <motion.div
                                key={office.location}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin className="w-5 h-5 text-emerald-600" />
                                    <h3 className="text-lg font-bold text-slate-800">{office.location}</h3>
                                </div>
                                <div className="space-y-2 text-sm text-slate-600">
                                    <p>{office.address}</p>
                                    <p className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        {office.phone}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {office.hours}
                                    </p>
                                </div>
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
                            まずはお気軽にご相談ください
                        </h2>
                        <p className="text-emerald-100 mb-8">
                            留学に関する質問、不安、疑問、何でもお答えします。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-emerald-50">
                                <Mail className="w-5 h-5 mr-2" />
                                お問い合わせ
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                無料カウンセリング予約
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PageLayout>
    );
}
