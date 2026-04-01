"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Heart,
  BookOpen,
  Camera,
  Coffee,
  GraduationCap,
  Sunrise,
  Mountain,
  Moon,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import {
  staggerContainerVariants,
  cardRevealVariants,
  sectionHeaderVariants,
} from "@/hooks/useScrollAnimation";

/* ─── NZ-Specific SVG Decorations ─── */

function MountainDivider({ color = "white", flip }: { color?: string; flip?: boolean }) {
  const fill = color === "white" ? "#ffffff" : color === "slate" ? "#f8fafc" : color === "emerald" ? "#ecfdf5" : "#ffffff";
  return (
    <div className={cn("w-full overflow-hidden leading-[0] -mb-px", flip && "rotate-180")}>
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
        <path d="M0 80V55L120 35L240 50L360 25L480 45L560 15L680 40L800 20L920 38L1040 12L1160 30L1280 22L1380 40L1440 30V80H0Z" fill={fill} />
      </svg>
    </div>
  );
}

function SilverFern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 60" className={cn("w-8 h-12", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0C20 0 8 15 8 30C8 40 13 50 20 60C27 50 32 40 32 30C32 15 20 0 20 0Z" fill="currentColor" opacity="0.12" />
      <path d="M20 10C20 10 14 20 14 30C14 37 16 44 20 50C24 44 26 37 26 30C26 20 20 10 20 10Z" fill="currentColor" opacity="0.08" />
      <line x1="20" y1="5" x2="20" y2="55" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      <path d="M20 15C16 18 14 22 14 26" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
      <path d="M20 15C24 18 26 22 26 26" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
      <path d="M20 25C16 28 13 33 13 37" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
      <path d="M20 25C24 28 27 33 27 37" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
    </svg>
  );
}

function FloatingSilverFern({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={cn("absolute pointer-events-none text-emerald-600", className)}
      animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <SilverFern />
    </motion.div>
  );
}

function KoruSpiral({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 50 50"
      className={cn("w-10 h-10", className)}
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M25 25C25 20 27 16 30 14C33 12 37 13 38 16C39 19 37 22 34 23C31 24 28 23 27 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.15"
      />
    </motion.svg>
  );
}

/* ─── Data ─── */

const appealItems = [
  {
    title: "自然あふれる学び舎",
    emoji: "🌿",
    description:
      "豊かな緑と海に囲まれたニュージーランドでは、日常の中に自然とのふれあいが溶け込んでいます。通学路から週末のアクティビティに至るまで、アウトドアの機会が豊富で、五感を使った学びが可能です。教室を越えて体験できる環境は、自主性や創造力を育む貴重な学びの土台となります。",
    image: "/country-dedicated-page/New_Zealand/country-appeal/nz-appeal-1.jpeg",
    icon: Mountain,
    gradient: "from-emerald-500 to-teal-600",
    cardBg: "from-emerald-50/80 to-teal-50/40",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "温もりある社会",
    emoji: "💛",
    description:
      "治安が良く、のびのびとした国民性が特徴のニュージーランドは、海外生活が初めての方にもぴったり。現地の人々は親切で協力的であり、困ったときにも相談しやすい雰囲気が整っています。日本人の受け入れにも慣れており、高校生や大学生、親子留学にも人気の高い安心の留学先です。",
    image: "/country-dedicated-page/New_Zealand/country-appeal/nz-appeal-2.jpeg",
    icon: Heart,
    gradient: "from-amber-500 to-orange-500",
    cardBg: "from-amber-50/80 to-orange-50/40",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    title: "探究で育む学ぶ力",
    emoji: "📚",
    description:
      "探究型・体験型学習を重視するニュージーランドの教育は、自ら考え行動する力を育むのが特長。高校留学や親子留学にも適した柔軟な学習環境が整い、学ぶ楽しさを実感しながら成長できます。治安が良く日本人にも優しい社会で、安心して留学生活を始められる点も大きな魅力のひとつです。",
    image: "/country-dedicated-page/New_Zealand/country-appeal/nz-appeal-3.png",
    icon: BookOpen,
    gradient: "from-sky-500 to-blue-600",
    cardBg: "from-sky-50/80 to-blue-50/40",
    badgeColor: "bg-sky-100 text-sky-700",
  },
];

const nzFunFacts = [
  { image: "/country-dedicated-page/New_Zealand/fun_facts/sheep.png", title: "羊の国", fact: "人口約500万人に対して羊は約2600万頭！人より羊が5倍多い国", color: "from-emerald-400 to-teal-500", bg: "bg-emerald-50" },
  { image: "/country-dedicated-page/New_Zealand/fun_facts/kiwi.png", title: "キウイって？", fact: "果物じゃなくて鳥の名前！NZの国鳥で、NZ人の愛称も「キウイ」", color: "from-amber-400 to-orange-500", bg: "bg-amber-50" },
  { image: "/country-dedicated-page/New_Zealand/fun_facts/summer.png", title: "季節が逆！", fact: "日本が夏のときNZは冬。クリスマスは真夏のビーチで過ごします", color: "from-sky-400 to-blue-500", bg: "bg-sky-50" },
  { image: "/country-dedicated-page/New_Zealand/fun_facts/sunset.png", title: "世界初の日の出", fact: "世界で最も早く朝日が見える国のひとつ。毎日が「世界一」の始まり", color: "from-rose-400 to-pink-500", bg: "bg-rose-50" },
  { image: "/country-dedicated-page/New_Zealand/fun_facts/mountain.png", title: "ロード・オブ・ザ・リング", fact: "映画の撮影地として有名。ホビット村は実際に観光できます！", color: "from-purple-400 to-indigo-500", bg: "bg-purple-50" },
  { image: "/country-dedicated-page/New_Zealand/fun_facts/lizard.png", title: "トゥアタラ", fact: "2億年前から生きる「生きた化石」トゥアタラはNZだけに生息", color: "from-lime-400 to-green-500", bg: "bg-lime-50" },
];

/** Stable 0–1 pseudo-random (SSR-safe) for decorative placement */
function nzFunFactsPseudoUnit(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function NZFunFactsScatteredBackground() {
  const sources = nzFunFacts.map((f) => f.image);
  const count = 42;
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none" aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const s = i + 1;
        const topPct = 3 + nzFunFactsPseudoUnit(s * 3) * 90;
        const leftPct = 1 + nzFunFactsPseudoUnit(s * 5 + 1) * 94;
        const sizePx = 32 + nzFunFactsPseudoUnit(s * 7) * 112;
        const rotateDeg = -42 + nzFunFactsPseudoUnit(s * 11) * 84;
        const opacity = 0.04 + nzFunFactsPseudoUnit(s * 13) * 0.11;
        const src = sources[Math.floor(nzFunFactsPseudoUnit(s * 17) * sources.length)];
        return (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            width={Math.round(sizePx)}
            height={Math.round(sizePx)}
            className="absolute object-contain"
            style={{
              top: `${topPct}%`,
              left: `${leftPct}%`,
              width: sizePx,
              height: "auto",
              maxHeight: sizePx * 1.15,
              opacity,
              transform: `translate(-50%, -50%) rotate(${rotateDeg}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

const nzDaySchedule = [
  { time: "7:00", label: "おはよう", desc: "ホストファミリーと朝ごはん。NZ名物のVegemiteトーストに挑戦！", icon: Coffee, color: "bg-amber-100 text-amber-600" },
  { time: "8:30", label: "通学", desc: "バスで語学学校へ。車窓から見える海と山が毎日の通学路", icon: Sunrise, color: "bg-sky-100 text-sky-600" },
  { time: "9:00", label: "授業", desc: "少人数クラスで英語レッスン。先生はフレンドリーで質問しやすい", icon: GraduationCap, color: "bg-emerald-100 text-emerald-600" },
  { time: "15:00", label: "放課後", desc: "友達とカフェやビーチへ。週末はハイキングやバンジージャンプも！", icon: Mountain, color: "bg-rose-100 text-rose-600" },
  { time: "18:00", label: "夕食", desc: "ホストファミリーと夕食。NZのラム肉は絶品！英語で今日の出来事を共有", icon: Heart, color: "bg-purple-100 text-purple-600" },
  { time: "21:00", label: "おやすみ", desc: "満天の星空を眺めてリラックス。テカポ湖は世界一の星空で有名", icon: Moon, color: "bg-indigo-100 text-indigo-600" },
];

const cities = [
  {
    name: "オークランド",
    subtitle: "オークランドの魅力",
    emoji: "🏙️",
    description:
      "ニュージーランド最大の都市オークランドは語学学校や大学が集中し、多国籍な留学生が集まる街。国際空港がありアクセスも良く、学びと生活を両立できる都市です。",
    featuredImage:
      "/country-dedicated-page/New_Zealand/city_highlights/auckland/auckland-nz-city.png",
    places: [
      "/country-dedicated-page/New_Zealand/city_highlights/auckland/auckland-place-1.png",
      "/country-dedicated-page/New_Zealand/city_highlights/auckland/auckland-place-2.png",
      "/country-dedicated-page/New_Zealand/city_highlights/auckland/auckland-place-3.png",
    ],
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "クライストチャーチ",
    subtitle: "クライストチャーチの魅力",
    emoji: "🌸",
    description:
      "南島最大の都市クライストチャーチは英語教育が充実し、自然体験プログラムも豊富。ガーデンシティと呼ばれる美しい街並みで、安心して学べる理想の留学都市です。",
    featuredImage:
      "/country-dedicated-page/New_Zealand/city_highlights/christchurch/christchurch-nz-city.png",
    places: [
      "/country-dedicated-page/New_Zealand/city_highlights/christchurch/christchurch-place-1.png",
      "/country-dedicated-page/New_Zealand/city_highlights/christchurch/christchurch-place-2.png",
      "/country-dedicated-page/New_Zealand/city_highlights/christchurch/christchurch-place-3.png",
    ],
    gradient: "from-rose-500 to-pink-600",
  },
  {
    name: "タウランガ",
    subtitle: "タウランガの魅力",
    emoji: "🏖️",
    description:
      "南島最大の都市クライストチャーチは英語教育が充実し、自然体験プログラムも豊富。ガーデンシティと呼ばれる美しい街並みで、安心して学べる理想の留学都市です。",
    featuredImage:
      "/country-dedicated-page/New_Zealand/city_highlights/tauranga/tauranga-nz-city.png",
    places: [
      "/country-dedicated-page/New_Zealand/city_highlights/tauranga/tauranga-place-1.png",
      "/country-dedicated-page/New_Zealand/city_highlights/tauranga/tauranga-place-2.png",
      "/country-dedicated-page/New_Zealand/city_highlights/tauranga/tauranga-place-3.png",
    ],
    gradient: "from-amber-500 to-orange-500",
  },
];

const galleryImages = [
  { src: "/country-dedicated-page/New_Zealand/Hero section/hero_pic_bg.png", label: "Auckland Skyline" },
  { src: "/country-dedicated-page/New_Zealand/country-appeal/nz-appeal-1.jpeg", label: "NZ Friends" },
  { src: "/country-dedicated-page/New_Zealand/country-appeal/nz-appeal-3.png", label: "NZ Nature" },
  { src: "/country-dedicated-page/New_Zealand/city_highlights/auckland/auckland-place-1.png", label: "Viaduct Harbour" },
  { src: "/country-dedicated-page/New_Zealand/city_highlights/christchurch/christchurch-place-1.png", label: "Botanic Gardens" },
  { src: "/country-dedicated-page/New_Zealand/city_highlights/tauranga/tauranga-place-1.png", label: "Mount Maunganui" },
  { src: "/country-dedicated-page/New_Zealand/country-appeal/nz-appeal-2.jpeg", label: "School Life" },
  { src: "/country-dedicated-page/New_Zealand/city_highlights/auckland/auckland-place-2.png", label: "Piha Beach" },
];

const postcardRotations = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.5];

/* ─── Component ─── */

export default function NewZealandPageClient({
  reviews = [],
}: {
  reviews?: any[];
}) {
  return (
    <PageLayout>
      <HeroSection />
      <MountainDivider color="white" />
      <AppealSection />
      <MountainDivider color="slate" />
      <NZFunFactsSection />
      <MountainDivider color="white" flip />
      <TestimonialSection reviews={reviews} />
      <MountainDivider color="emerald" />
      <NZDaySection />
      <MountainDivider color="white" flip />
      <CitySection />
      <MountainDivider color="slate" />
      <GallerySection />
      <CTASection />
    </PageLayout>
  );
}

/* ═══════════════════════════════════════════════
   Section 1 – Hero
   ═══════════════════════════════════════════════ */

function HeroSection() {
  return (
    <section className="relative min-h-[520px] lg:min-h-[620px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/country-dedicated-page/New_Zealand/Hero section/hero_pic_bg.png"
          alt="New Zealand"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/15 to-transparent" />
      </div>

      {/* Floating fern silhouettes in hero */}
      <motion.div
        className="absolute top-20 right-[10%] opacity-20 text-emerald-300"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <SilverFern className="w-12 h-20" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-[5%] opacity-15 text-emerald-200"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      >
        <SilverFern className="w-8 h-14" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        <Breadcrumb
          variant="dark"
          items={[
            { label: "留学国一覧", href: "/all-country" },
            { label: "ニュージーランド" },
          ]}
        />

        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="inline-block px-3 py-1 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 rounded-full text-xs font-bold mb-4 border border-emerald-400/30"
            >
              🇳🇿 Aotearoa New Zealand
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-3 leading-tight tracking-tight">
              New{" "}
              <span className="relative inline-block">
                Zealand
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 12"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                >
                  <motion.path
                    d="M2 8C40 2 80 12 120 6C160 0 180 10 198 4"
                    stroke="#34d399"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  />
                </motion.svg>
              </span>
            </h1>

            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-300 mb-3">
              ゆったり暮らす小さな英語圏で安心留学
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
              ニュージーランドは、自然豊かな環境と穏やかな国民性に支えられた、安全で落ち着いた留学先です。都市部でものんびりとした雰囲気が広がり、自分らしく学びながら国際感覚や自主性を育むことができます。
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mt-4 justify-center lg:justify-start"
            >
              {[
                { label: "治安", value: "◎", icon: "🛡️" },
                { label: "自然", value: "◎", icon: "🌿" },
                { label: "親日度", value: "◎", icon: "🤝" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/10"
                >
                  <span className="text-sm">{stat.icon}</span>
                  <span className="text-xs font-bold text-white">{stat.label}</span>
                  <span className="text-xs font-black text-emerald-300">{stat.value}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-5 flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <a href="https://form.kaeruryugaku.com/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="group bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/30">
                  無料カウンセリング予約
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 backdrop-blur-sm">
                資料請求
              </Button>
            </motion.div>
          </motion.div>

          {/* Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
            className="flex-shrink-0 relative"
          >
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-3xl scale-[1.75]" />
            <motion.img
              src="/country-dedicated-page/New_Zealand/Hero section/new-zealand-mascot.png"
              alt="NZ Mascot"
              className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 object-contain drop-shadow-2xl"
              animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 400 }}
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 lg:-top-3 lg:-right-3 bg-white text-slate-800 px-3 py-1.5 rounded-2xl rounded-bl-sm shadow-lg text-xs sm:text-sm font-bold whitespace-nowrap"
            >
              キアオラ！🐸
              <div className="absolute bottom-0 left-2 w-2 h-2 bg-white transform rotate-45 translate-y-1" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Section 2 – Country Appeal
   ═══════════════════════════════════════════════ */

function AppealSection() {
  return (
    <section className="relative py-14 lg:py-20 bg-gradient-to-br from-white via-white to-emerald-50/30 overflow-hidden">
      <FloatingSilverFern className="top-20 left-[8%] hidden lg:block" delay={0} />
      <FloatingSilverFern className="top-40 right-[12%] hidden lg:block" delay={2} />
      <FloatingSilverFern className="bottom-32 left-[15%] hidden lg:block" delay={1} />
      <KoruSpiral className="absolute top-16 right-[20%] text-emerald-500 hidden lg:block" />
      <KoruSpiral className="absolute bottom-20 left-[8%] text-amber-500 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-10 lg:mb-14 relative"
        >
          <motion.img
            src="/country-dedicated-page/New_Zealand/Hero section/new-zealand-mascot.png"
            alt=""
            className="absolute -top-8 right-0 sm:right-4 lg:right-[calc(50%-280px)] w-20 h-16 sm:w-28 sm:h-24 lg:w-36 lg:h-32 object-contain z-10 hidden sm:block"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium mb-3">
            <Sparkles className="w-3 h-3" />
            ニュージーランドの魅力
          </div>
          <h2 className="text-2xl lg:text-4xl font-black text-slate-800">
            なぜ<span className="text-emerald-600">NZ</span>が選ばれるの？
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            3つの魅力をご紹介します 🌿
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-8 lg:space-y-12"
        >
          {appealItems.map((item, index) => (
            <motion.div
              key={item.title}
              variants={cardRevealVariants}
              className={cn(
                "flex flex-col gap-5 lg:gap-0 items-center relative",
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              )}
            >
              <div className="w-full lg:w-[55%] flex-shrink-0 relative z-10">
                <div className="relative">
                  <div className={cn("absolute -inset-3 bg-gradient-to-br rounded-3xl opacity-15 blur-xl", item.gradient)} />
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group ring-4 ring-white">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 55vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <motion.div
                    className={cn("absolute -top-3 -left-3 w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg text-white font-black text-lg z-20 ring-4 ring-white", item.gradient)}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {index + 1}
                  </motion.div>
                </div>
              </div>

              <div className={cn("w-full lg:w-[50%] relative z-20", index % 2 === 0 ? "lg:-ml-8" : "lg:-mr-8")}>
                <div className={cn("bg-gradient-to-br rounded-2xl p-5 lg:p-7 shadow-lg border border-white/80 backdrop-blur-sm", item.cardBg)}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold", item.badgeColor)}>
                      <item.icon className="w-3 h-3" />
                      {item.emoji} {item.title}
                    </span>
                  </div>
                  <p className="text-sm lg:text-base text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   NEW – NZ Fun Facts (NZあるある)
   ═══════════════════════════════════════════════ */

function NZFunFactsSection() {
  return (
    <section className="relative py-12 lg:py-16 bg-slate-50 overflow-hidden">
      <NZFunFactsScatteredBackground />
      <KoruSpiral className="absolute top-8 left-[5%] text-emerald-400 hidden lg:block z-[1]" />
      <FloatingSilverFern className="bottom-10 right-[10%] hidden lg:block z-[1]" delay={1.5} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 lg:mb-10 relative"
        >
          {/* Mascot presenting the facts */}
          <motion.img
            src="/country-dedicated-page/New_Zealand/Hero section/new-zealand-mascot.png"
            alt=""
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2 object-contain"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block bg-white px-4 py-1.5 rounded-2xl shadow-md text-sm font-bold text-slate-700 mb-4 relative"
          >
            知ってた？NZのおもしろ豆知識！
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
          </motion.div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-800">
            NZ<span className="text-emerald-600">あるある</span>🐑
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3"
        >
          {nzFunFacts.map((fact) => (
            <motion.div
              key={fact.title}
              variants={cardRevealVariants}
              whileHover={{ y: -2 }}
              className="group h-full min-h-0"
            >
              <div className="flex flex-row items-stretch h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 overflow-hidden min-h-[4.5rem] sm:min-h-[5rem]">
                {/* Left accent + illustration */}
                <div
                  className={cn(
                    "relative shrink-0 w-[4.5rem] sm:w-24 flex items-center justify-center border-r border-slate-100/80",
                    fact.bg
                  )}
                >
                  <div className={cn("absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b", fact.color)} />
                  <motion.img
                    src={fact.image}
                    alt={fact.title}
                    className="relative z-[1] w-14 h-14 sm:w-[4.25rem] sm:h-[4.25rem] object-contain drop-shadow-sm"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  />
                  <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_50%_50%,_currentColor_1px,_transparent_1px)] bg-[length:10px_10px]" />
                </div>

                {/* Right: copy */}
                <div className="flex-1 min-w-0 py-2.5 pr-3 pl-2.5 sm:py-3 sm:pr-4 sm:pl-3 flex flex-col justify-center">
                  <h3 className="text-xs sm:text-sm font-black text-slate-800 leading-tight mb-0.5 sm:mb-1">
                    {fact.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-snug sm:leading-relaxed">
                    {fact.fact}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Section 3 – Testimonials
   ═══════════════════════════════════════════════ */

function TestimonialSection({ reviews }: { reviews: any[] }) {
  const displayReviews = reviews.length > 0 ? reviews : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [AutoScroll({ playOnInit: true, delay: 3000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (displayReviews.length === 0) return null;

  return (
    <section className="relative py-12 lg:py-20 bg-white overflow-hidden">
      <div className="absolute top-10 left-0 w-40 h-40 bg-emerald-200/15 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-32 h-32 bg-amber-200/15 rounded-full blur-3xl" />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 relative"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium mb-3">
            <Users className="w-3 h-3" />
            先輩の声
          </div>
          <h2 className="text-2xl lg:text-4xl font-black text-slate-800 mb-3">
            お客様の<span className="text-emerald-600">声</span>
          </h2>
          <Link
            href="/all-reviews"
            className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-bold transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-emerald-100"
          >
            もっと見る
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex -ml-4 items-center">
              {displayReviews.map((review, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={review._id}
                    className={cn(
                      "flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_35%] pl-4 transition-all duration-500 ease-out",
                      isSelected
                        ? "z-10 scale-100 lg:scale-110 opacity-100"
                        : "scale-95 lg:scale-90 opacity-70 blur-[1px] hover:opacity-100 hover:blur-0"
                    )}
                    style={{ transformOrigin: "center center" }}
                  >
                    <div className="h-full py-8">
                      <ReviewCard review={review} className="h-full shadow-lg" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   NEW – NZの1日 (A Day in NZ)
   ═══════════════════════════════════════════════ */

function NZDaySection() {
  return (
    <section className="relative py-14 lg:py-18 bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/30 overflow-hidden">
      <FloatingSilverFern className="top-12 right-[10%] hidden lg:block" delay={0.5} />
      <KoruSpiral className="absolute bottom-16 left-[6%] text-emerald-400 hidden lg:block" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium mb-3">
            <Sunrise className="w-3 h-3" />
            留学ライフ
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-800">
            NZ留学の<span className="text-emerald-600">1日</span>をのぞいてみよう
          </h2>
          <p className="text-sm text-slate-500 mt-2">ある留学生の1日をご紹介 ☀️</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 via-emerald-400 to-indigo-400 rounded-full" />

          <div className="space-y-4 lg:space-y-5">
            {nzDaySchedule.map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-start gap-4 relative group"
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 relative z-10">
                  <motion.div
                    className={cn("w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-md ring-4 ring-white", item.color)}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                </div>

                {/* Content card */}
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group-hover:border-emerald-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{item.time}</span>
                    <span className="text-sm font-bold text-slate-800">{item.label}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Section 4 – City Highlights
   ═══════════════════════════════════════════════ */

function CitySection() {
  return (
    <section className="relative py-14 lg:py-20 bg-white overflow-hidden">
      <FloatingSilverFern className="top-20 left-[10%] hidden lg:block" />
      <KoruSpiral className="absolute top-1/2 right-[6%] text-rose-400 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-10 lg:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium mb-3">
            <MapPin className="w-3 h-3" />
            留学都市ガイド
          </div>
          <h2 className="text-2xl lg:text-4xl font-black text-slate-800">
            都市の<span className="text-emerald-600">魅力</span>を探そう
          </h2>
        </motion.div>

        <div className="space-y-10 lg:space-y-14">
          {cities.map((city, cityIndex) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: cityIndex * 0.1 }}
              className="group"
            >
              <div className={cn(
                "flex flex-col gap-5 lg:gap-0",
                cityIndex % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              )}>
                <div className="w-full lg:w-[55%] flex-shrink-0 relative">
                  <div className={cn("absolute -inset-2 bg-gradient-to-br rounded-3xl opacity-10 blur-xl", city.gradient)} />
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl ring-4 ring-white">
                    <Image src={city.featuredImage} alt={city.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 55vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{city.emoji}</span>
                        <h3 className="text-2xl lg:text-3xl font-black text-white drop-shadow-lg">{city.name}</h3>
                      </div>
                    </div>
                    {/* Passport stamp overlay */}
                    <motion.div
                      className="absolute top-3 right-3 w-16 h-16 lg:w-20 lg:h-20 border-2 border-dashed border-white/40 rounded-full flex items-center justify-center rotate-[-12deg] opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ rotate: 0 }}
                    >
                      <span className="text-[8px] lg:text-[10px] font-black text-white/60 text-center leading-tight uppercase">
                        NZ<br />{city.name.slice(0, 3)}
                      </span>
                    </motion.div>
                  </div>
                </div>

                <div className={cn(
                  "w-full lg:w-[50%] flex flex-col gap-4 relative z-20",
                  cityIndex % 2 === 0 ? "lg:-ml-6 lg:pt-4" : "lg:-mr-6 lg:pt-4"
                )}>
                  <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-slate-100/80">
                    <h4 className="text-base lg:text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <span className={cn("w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center", city.gradient)}>
                        <MapPin className="w-3.5 h-3.5 text-white" />
                      </span>
                      {city.subtitle}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{city.description}</p>
                    <a href="https://form.kaeruryugaku.com/" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className={cn("bg-gradient-to-r text-white font-bold shadow-md hover:shadow-lg transition-shadow", city.gradient)}>
                        この都市で留学する
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </a>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {city.places.map((place, i) => (
                      <motion.div
                        key={place}
                        whileHover={{ scale: 1.05, rotate: i === 1 ? -2 : 2 }}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md ring-2 ring-white cursor-pointer"
                      >
                        <Image src={place} alt={`${city.name} spot ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 33vw, 16vw" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Section 5 – Gallery (Postcard Style)
   ═══════════════════════════════════════════════ */

function GallerySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative py-12 lg:py-16 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 relative"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium mb-3">
            <Camera className="w-3 h-3" />
            フォトギャラリー
          </div>
          <h2 className="text-2xl lg:text-4xl font-black text-slate-800">
            NZからの<span className="text-emerald-600">ポストカード</span> 📮
          </h2>
          <p className="text-sm text-slate-500 mt-2">ドラッグして旅しよう</p>
        </motion.div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex -ml-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                className="flex-[0_0_70%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] pl-4"
                whileHover={{ y: -8, rotate: 0 }}
                style={{ rotate: postcardRotations[i] }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Postcard frame */}
                <div className="bg-white p-2 sm:p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative aspect-[3/2] rounded overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 70vw, (max-width: 1024px) 45vw, 30vw"
                    />
                  </div>
                  {/* Postcard label */}
                  <div className="mt-2 flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-slate-600">{img.label}</span>
                    <span className="text-[10px] text-slate-400">🇳🇿 NZ</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:scale-110 hover:shadow-xl transition-all z-10 ring-2 ring-emerald-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:scale-110 hover:shadow-xl transition-all z-10 ring-2 ring-emerald-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CTA Section
   ═══════════════════════════════════════════════ */

function CTASection() {
  return (
    <section className="relative py-14 lg:py-20 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
        {/* Silver fern watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] text-white">
          <SilverFern className="w-64 h-96" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.img
            src="/country-dedicated-page/New_Zealand/Hero section/new-zealand-mascot.png"
            alt="NZ Mascot"
            className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 mx-auto mb-3 object-contain drop-shadow-2xl"
            animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Speech bubble from mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block bg-white/15 backdrop-blur-sm px-5 py-2 rounded-2xl mb-5 border border-white/20"
          >
            <span className="text-sm font-bold text-white">NZで待ってるケロ！🐸🇳🇿</span>
          </motion.div>

          <h2 className="text-2xl lg:text-3xl font-black text-white mb-2">
            ニュージーランド留学、
            <br className="sm:hidden" />
            始めてみませんか？
          </h2>
          <p className="text-emerald-100 text-sm lg:text-base mb-6 max-w-md mx-auto">
            無料カウンセリングで、あなたに合ったプランをご提案します。まずはお気軽にご相談ください。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://form.kaeruryugaku.com/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="group bg-white text-emerald-700 hover:bg-emerald-50 font-bold shadow-xl shadow-black/10">
                無料カウンセリング予約
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm">
              資料請求
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-6 text-emerald-100/80 text-xs"
          >
            {["🛡️ 相談無料", "💬 LINE対応OK", "🐸 鹿児島から応援"].map((item) => (
              <span key={item} className="flex items-center gap-1">{item}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
