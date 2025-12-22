"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Leaf,
    Mail,
    Phone,
    MapPin,
    Instagram,
    Twitter,
    Youtube,
    MessageCircle,
    ArrowRight
} from "lucide-react";

const footerLinks = {
    services: [
        { label: "国から探す", href: "#countries" },
        { label: "目的から探す", href: "#purposes" },
        { label: "費用について", href: "#pricing" },
        { label: "体験談", href: "#testimonials" },
    ],
    support: [
        { label: "よくある質問", href: "#faq" },
        { label: "お問い合わせ", href: "#contact" },
        { label: "会社概要", href: "#about" },
        { label: "プライバシー", href: "#privacy" },
    ],
    destinations: [
        { label: "オーストラリア", href: "#australia" },
        { label: "カナダ", href: "#canada" },
        { label: "イギリス", href: "#uk" },
        { label: "アメリカ", href: "#usa" },
    ]
};

const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: MessageCircle, href: "#", label: "LINE" },
];

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">
            {/* Compact CTA Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col lg:flex-row items-center justify-between gap-4"
                    >
                        <div className="text-center lg:text-left flex items-center gap-4">
                            {/* Loving Frog Mascot - Desktop only */}
                            <motion.img
                                src="/frog-mascot-love.png"
                                alt="かえるマスコット"
                                className="hidden lg:block w-20 h-20 object-contain"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <div>
                                <h2 className="text-lg lg:text-xl font-bold mb-1">
                                    あなたの留学、一緒に始めませんか？
                                </h2>
                                <p className="text-emerald-100 text-sm">
                                    まずは無料カウンセリングで、あなたの夢や不安をお聞かせください。
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="#contact"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-600 rounded-lg font-bold text-sm shadow hover:shadow-lg transition-all hover:-translate-y-0.5"
                            >
                                無料カウンセリング
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="#brochure"
                                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/80 text-white rounded-lg font-medium text-sm hover:bg-white/10 transition-all"
                            >
                                資料請求
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Compact Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
                    {/* Logo & Info - Compact */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center mb-4">
                            <img
                                src="/kaeru-logo.png"
                                alt="かえる留学"
                                className="h-10 w-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="text-slate-400 text-xs leading-relaxed mb-3">
                            鹿児島を拠点とする留学エージェント。
                            あなたの「留学したい」を全力でサポート。
                        </p>
                        <div className="space-y-1.5 text-xs text-slate-400">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-emerald-500" />
                                <span>〒890-0000 鹿児島県鹿児島市XX町X-X-X</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3 text-emerald-500" />
                                <span>099-XXX-XXXX</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-3 h-3 text-emerald-500" />
                                <span>info@kaeru-ryugaku.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                            サービス
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-emerald-400 transition-colors text-xs"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                            サポート
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-emerald-400 transition-colors text-xs"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                            留学先
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.destinations.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-emerald-400 transition-colors text-xs"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom - Compact */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-slate-500 text-xs">
                        © 2024 かえる留学 All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        {socialLinks.map((social) => (
                            <Link
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all"
                            >
                                <social.icon className="w-4 h-4" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
