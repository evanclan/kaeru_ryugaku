import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

interface PageLayoutProps {
    children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
    return (
        <main className="relative min-h-screen flex flex-col">
            <Header />

            {/* Main content with proper top padding for fixed header */}
            <div className="flex-1 pt-16 lg:pt-20">
                {children}
            </div>

            <Footer />
            <MobileBottomNav />

            {/* Spacer for mobile bottom nav */}
            <div className="h-20 lg:hidden" />
        </main>
    );
}
