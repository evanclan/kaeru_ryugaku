"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowRight } from "lucide-react";
import {
    sectionHeaderVariants,
    cascadeLeftVariants,
    cascadeRightVariants,
    popInVariants,
} from "@/hooks/useScrollAnimation";

const faqs = [
    {
        question: "英語が話せなくても大丈夫？",
        answer: "はい！留学生の約70%は英語初心者です。渡航前の無料英会話と現地の日本語サポートで安心です。"
    },
    {
        question: "費用はどのくらい？",
        answer: "3ヶ月のオーストラリア語学留学で約80〜120万円が目安。手数料0円、明朗会計でお見積りします。"
    },
    {
        question: "現地でトラブルがあったら？",
        answer: "主要都市に現地オフィスあり。24時間の緊急連絡先で日本語サポートを受けられます。"
    },
    {
        question: "いつまでに申し込めばいい？",
        answer: "渡航3〜6ヶ月前がおすすめ。短期なら1〜2ヶ月前でも対応可能な場合があります。"
    },
    {
        question: "休学して留学できる？",
        answer: "多くの学生が休学留学しています。休学手続きのアドバイスや就活サポートも行っています。"
    },
    {
        question: "親の説得方法は？",
        answer: "ご家族向け資料をご用意。カウンセリングにご家族も参加いただけます。"
    }
];

export default function FAQSection() {
    return (
        <section className="py-6 lg:py-10 bg-white" id="faq">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Compact Header with scroll animation */}
                <motion.div
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center mb-5 relative"
                >
                    {/* Relaxed Frog Mascot */}
                    <motion.img
                        src="/frog-mascot-relaxed.png"
                        alt="かえるマスコット"
                        className="absolute -top-2 -right-2 sm:right-4 lg:right-20 w-12 h-10 sm:w-14 sm:h-12 lg:w-16 lg:h-14 object-contain z-10"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium mb-2">
                        <HelpCircle className="w-3 h-3" />
                        よくある質問
                    </div>
                    <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
                        <span className="text-emerald-600">不安</span>を解消します
                    </h2>
                </motion.div>

                {/* Two-column FAQ grid with cascade animation */}
                <div className="grid lg:grid-cols-2 gap-x-6">
                    {/* Left column - slides in from left */}
                    <motion.div
                        variants={cascadeLeftVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.slice(0, 3).map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-100">
                                    <AccordionTrigger className="text-left text-sm lg:text-base py-3 hover:no-underline">
                                        <span className="flex items-start gap-2">
                                            <span className="text-emerald-600 font-bold shrink-0">Q.</span>
                                            <span className="font-medium">{faq.question}</span>
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm pb-3">
                                        <div className="flex items-start gap-2 pl-5 text-slate-600">
                                            <span className="text-emerald-600 font-bold shrink-0">A.</span>
                                            <span>{faq.answer}</span>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>

                    {/* Right column - slides in from right */}
                    <motion.div
                        variants={cascadeRightVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.slice(3, 6).map((faq, index) => (
                                <AccordionItem key={index + 3} value={`item-${index + 3}`} className="border-b border-slate-100">
                                    <AccordionTrigger className="text-left text-sm lg:text-base py-3 hover:no-underline">
                                        <span className="flex items-start gap-2">
                                            <span className="text-emerald-600 font-bold shrink-0">Q.</span>
                                            <span className="font-medium">{faq.question}</span>
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm pb-3">
                                        <div className="flex items-start gap-2 pl-5 text-slate-600">
                                            <span className="text-emerald-600 font-bold shrink-0">A.</span>
                                            <span>{faq.answer}</span>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>

                {/* Compact CTA with pop-in animation */}
                <motion.div
                    variants={popInVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                    className="mt-6 text-center"
                >
                    <Button size="default" className="group text-sm h-9">
                        無料相談で質問する
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
