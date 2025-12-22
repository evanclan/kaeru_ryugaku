"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Menu,
    X,
    ChevronDown,
    Facebook,
    Instagram
} from "lucide-react";
import Link from "next/link";

// TikTok icon component (not available in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: TikTokIcon, href: "https://tiktok.com", label: "TikTok" },
];

// Navigation structure with dropdowns
const navItems = [
    { label: "選ばれる理由", href: "/why-us" },
    { label: "お客様の声", href: "/all-review" },
    {
        label: "留学国一覧",
        href: "/all-country",
        dropdown: [
            { label: "🇨🇦 カナダ", href: "/all-country/canada" },
            { label: "🇳🇿 ニュージーランド", href: "/all-country/new-zealand" },
        ]
    },
    {
        label: "留学プラン",
        href: "/all-plan",
        dropdown: [
            { label: "ワーキングホリデー", href: "/all-plan/working-holiday" },
            { label: "語学留学", href: "/all-plan/language-study" },
        ]
    },
    { label: "About", href: "/about" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle dropdown hover with delay
    const handleDropdownEnter = (label: string) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setOpenDropdown(label);
    };

    const handleDropdownLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 150);
    };

    // Toggle mobile dropdown
    const toggleMobileDropdown = (label: string) => {
        setMobileOpenDropdown(mobileOpenDropdown === label ? null : label);
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-md"
                    : "bg-white"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo and Social Icons */}
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center group">
                                <img
                                    src="/kaeru-logo.png"
                                    alt="かえる留学"
                                    className="h-12 lg:h-14 w-auto group-hover:scale-105 transition-transform"
                                />
                            </Link>

                            {/* Social Media Icons */}
                            <div className="flex items-center gap-2">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-200"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-6">
                            {navItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative"
                                    onMouseEnter={() => item.dropdown && handleDropdownEnter(item.label)}
                                    onMouseLeave={handleDropdownLeave}
                                >
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-1 text-slate-600 hover:text-emerald-600 font-medium transition-colors relative group py-2"
                                    >
                                        {item.label}
                                        {item.dropdown && (
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                                        )}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
                                    </Link>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {item.dropdown && openDropdown === item.label && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
                                            >
                                                <div className="py-2">
                                                    {/* View All Link */}
                                                    <Link
                                                        href={item.href}
                                                        className="block px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 font-medium border-b border-slate-100"
                                                    >
                                                        すべて見る →
                                                    </Link>
                                                    {item.dropdown.map((subItem) => (
                                                        <Link
                                                            key={subItem.href}
                                                            href={subItem.href}
                                                            className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </nav>

                        {/* Desktop CTA Buttons */}
                        <div className="hidden lg:flex items-center gap-3">
                            <Button variant="outline" size="default">
                                資料請求
                            </Button>
                            <Button variant="default" size="default">
                                無料カウンセリング予約
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-slate-600 hover:text-emerald-600 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute top-16 right-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto"
                        >
                            <div className="p-6 space-y-2">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        {item.dropdown ? (
                                            <div>
                                                <button
                                                    onClick={() => toggleMobileDropdown(item.label)}
                                                    className="w-full flex items-center justify-between text-lg font-medium text-slate-700 hover:text-emerald-600 transition-colors py-3"
                                                >
                                                    {item.label}
                                                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileOpenDropdown === item.label ? 'rotate-180' : ''}`} />
                                                </button>
                                                <AnimatePresence>
                                                    {mobileOpenDropdown === item.label && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pl-4 pb-2 space-y-1 border-l-2 border-emerald-200 ml-2">
                                                                <Link
                                                                    href={item.href}
                                                                    className="block py-2 text-sm text-emerald-600 font-medium"
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                >
                                                                    すべて見る →
                                                                </Link>
                                                                {item.dropdown.map((subItem) => (
                                                                    <Link
                                                                        key={subItem.href}
                                                                        href={subItem.href}
                                                                        className="block py-2 text-sm text-slate-600 hover:text-emerald-600"
                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                    >
                                                                        {subItem.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="block text-lg font-medium text-slate-700 hover:text-emerald-600 transition-colors py-3"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                                <div className="pt-6 space-y-3 border-t border-slate-100 mt-4">
                                    <Button variant="outline" className="w-full">
                                        資料請求
                                    </Button>
                                    <Button variant="default" className="w-full">
                                        無料カウンセリング予約
                                    </Button>
                                </div>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
