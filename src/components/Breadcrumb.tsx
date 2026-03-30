"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    variant?: "default" | "dark";
}

export default function Breadcrumb({ items, variant = "default" }: BreadcrumbProps) {
    const isDark = variant === "dark";
    return (
        <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="パンくずリスト"
            className={`flex items-center gap-2 text-sm mb-6 ${isDark ? "text-white/60" : "text-slate-500"}`}
        >
            <Link
                href="/"
                className={`flex items-center gap-1 transition-colors ${isDark ? "hover:text-white" : "hover:text-emerald-600"}`}
            >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">ホーム</span>
            </Link>

            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className={`w-4 h-4 ${isDark ? "text-white/30" : "text-slate-300"}`} />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-emerald-600"}`}
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className={`font-medium ${isDark ? "text-white" : "text-slate-800"}`}>{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </motion.nav>
    );
}
