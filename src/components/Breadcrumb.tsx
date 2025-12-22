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
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="パンくずリスト"
            className="flex items-center gap-2 text-sm text-slate-500 mb-6"
        >
            <Link
                href="/"
                className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">ホーム</span>
            </Link>

            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-emerald-600 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-slate-800 font-medium">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </motion.nav>
    );
}
