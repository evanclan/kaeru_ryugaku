"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare } from "lucide-react";

export default function MobileBottomNav() {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom"
        >
            <div className="flex items-center gap-3 p-3">
                <Button
                    variant="outline"
                    className="flex-1 h-12 text-sm font-bold"
                >
                    <FileText className="w-4 h-4" />
                    資料請求
                </Button>
                <a href="https://form.kaeruryugaku.com/" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button
                        variant="default"
                        className="w-full h-12 text-sm font-bold shadow-lg shadow-emerald-500/25"
                    >
                        <MessageSquare className="w-4 h-4" />
                        無料相談
                    </Button>
                </a>
            </div>
        </motion.div>
    );
}
