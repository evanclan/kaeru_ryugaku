"use client";

import React from "react";
import { Megaphone, Sparkles, Star, Gift } from "lucide-react";

const newsItems = [
    {
        icon: Star,
        badge: "速報",
        badgeColor: "bg-amber-500",
        text: "2025年カナダワーホリビザ追加枠発表！無料相談受付中！",
    },
    {
        icon: Sparkles,
        badge: "体験談",
        badgeColor: "bg-emerald-500",
        text: "先輩の声：フィリピン留学でTOEIC 300点UP！",
    },
    {
        icon: Gift,
        badge: "限定",
        badgeColor: "bg-rose-500",
        text: "鹿児島限定！高校生向け春休み短期留学プログラム申込開始",
    },
];

// Single news item component
const NewsItem = ({ item }: { item: typeof newsItems[0] }) => (
    <div className="flex items-center gap-3 shrink-0 px-4">
        {/* Icon with glow */}
        <div className="relative">
            <item.icon className="w-4 h-4 text-amber-400 drop-shadow-lg" />
            <div className="absolute inset-0 w-4 h-4 bg-amber-400/30 blur-md" />
        </div>

        {/* Badge */}
        <span className={`${item.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg`}>
            {item.badge}
        </span>

        {/* Text */}
        <span className="text-sm text-white/90 font-medium whitespace-nowrap">
            {item.text}
        </span>

        {/* Separator dot */}
        <span className="w-1.5 h-1.5 bg-emerald-400/60 rounded-full ml-8" />
    </div>
);

export default function NewsTicker() {
    return (
        <div className="relative w-full overflow-hidden bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md border-y border-white/10">
            {/* Decorative glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-amber-500/5" />

            {/* News label */}
            <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-3 pr-8 bg-gradient-to-r from-slate-900 via-slate-900 to-transparent">
                <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-1 rounded-full">
                    <Megaphone className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-bold tracking-wide text-emerald-400">NEWS</span>
                </div>
            </div>

            {/* Scrolling content with CSS animation */}
            <div className="py-2.5 pl-24 sm:pl-28 overflow-hidden">
                <div className="flex animate-ticker">
                    {/* Render news items multiple times for seamless loop */}
                    {[...Array(4)].map((_, setIndex) => (
                        <div key={setIndex} className="flex shrink-0">
                            {newsItems.map((item, index) => (
                                <NewsItem key={`${setIndex}-${index}`} item={item} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10" />

            {/* CSS Animation */}
            <style jsx>{`
                @keyframes ticker {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-ticker {
                    animation: ticker 20s linear infinite;
                }
            `}</style>
        </div>
    );
}
