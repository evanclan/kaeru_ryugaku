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
  TreePine,
  Heart,
  BookOpen,
  Camera,
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

/* ─── SVG Decorations ─── */

function WaveDivider({ flip, color = "white" }: { flip?: boolean; color?: string }) {
  return (
    <div className={cn("w-full overflow-hidden leading-[0]", flip && "rotate-180")}>
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
        <path
          d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z"
          fill={color === "white" ? "#ffffff" : color === "slate" ? "#f8fafc" : color === "emerald" ? "#ecfdf5" : "#ffffff"}
        />
      </svg>
    </div>
  );
}

function FloatingLeaf({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={cn("absolute pointer-events-none text-emerald-300/30", className)}
      animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <TreePine className="w-6 h-6" />
    </motion.div>
  );
}

function FloatingDot({ className, size = "w-2 h-2", color = "bg-emerald-300/20" }: { className?: string; size?: string; color?: string }) {
  return <div className={cn("absolute rounded-full pointer-events-none", size, color, className)} />;
}

/* ─── Data ─── */

const appealItems = [
  {
    title: "自然あふれる学び舎",
    emoji: "🌿",
    description:
      "豊かな緑と海に囲まれたニュージーランドでは、日常の中に自然とのふれあいが溶け込んでいます。通学路から週末のアクティビティに至るまで、アウトドアの機会が豊富で、五感を使った学びが可能です。教室を越えて体験できる環境は、自主性や創造力を育む貴重な学びの土台となります。",
    image: "/country-dedicated-page/New_Zealand/country-appeal/nz-appeal-1.jpeg",
    icon: TreePine,
    gradient: "from-emerald-500 to-teal-600",
    cardBg: "from-emerald-50/80 to-teal-50/40",
    accentColor: "text-emerald-600",
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
    accentColor: "text-amber-600",
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
    accentColor: "text-sky-600",
    badgeColor: "bg-sky-100 text-sky-700",
  },
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
  "/country-dedicated-page/New_Zealand/Hero section/hero_pic_bg.png",
  "/country-dedicated-page/New_Zealand/country-appeal/nz-appeal-1.jpeg",
  "/country-dedicated-page/New_Zealand/country-appeal/nz-appeal-3.png",
  "/country-dedicated-page/New_Zealand/city_highlights/auckland/auckland-place-1.png",
  "/country-dedicated-page/New_Zealand/city_highlights/christchurch/christchurch-place-1.png",
  "/country-dedicated-page/New_Zealand/city_highlights/tauranga/tauranga-place-1.png",
  "/country-dedicated-page/New_Zealand/country-appeal/nz-appeal-2.jpeg",
  "/country-dedicated-page/New_Zealand/city_highlights/auckland/auckland-place-2.png",
];

/* ─── Component ─── */

export default function NewZealandPageClient({
  reviews = [],
}: {
  reviews?: any[];
}) {
  return (
    <PageLayout>
      <HeroSection />
      <WaveDivider color="white" />
      <AppealSection />
      <WaveDivider color="slate" />
      <TestimonialSection reviews={reviews} />
      <WaveDivider color="emerald" flip />
      <CitySection />
      <WaveDivider color="slate" />
      <GallerySection />
      <CTASection />
    </PageLayout>
  );
}

/* ═══════════════════════════════════════════════
   Section 1 – Hero (Alive & Fun)
   ═══════════════════════════════════════════════ */

function HeroSection() {
  return (
    <section className="relative min-h-[520px] lg:min-h-[600px] flex items-center overflow-hidden">
      {/* Background image */}
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
        {/* Emerald tint for brand warmth */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/15 to-transparent" />
      </div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 right-[10%] w-20 h-20 bg-emerald-400/10 rounded-full blur-2xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 left-[5%] w-16 h-16 bg-amber-400/10 rounded-full blur-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        <Breadcrumb
          variant="dark"
          items={[
            { label: "留学国一覧", href: "/all-country" },
            { label: "ニュージーランド" },
          ]}
        />

        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 lg:gap-10">
          {/* Text */}
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
              🇳🇿 New Zealand
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-3 leading-tight tracking-tight">
              New{" "}
              <span className="relative inline-block">
                Zealand
                {/* Fun underline decoration */}
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

            {/* Quick Fun Stats */}
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

          {/* Mascot with playful entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
            className="flex-shrink-0 relative"
          >
            {/* Glow behind mascot */}
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-3xl scale-[1.75]" />
            <motion.img
              src="/country-dedicated-page/New_Zealand/Hero section/new-zealand-mascot.png"
              alt="NZ Mascot"
              className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 object-contain drop-shadow-2xl"
              animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Speech bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 400 }}
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 lg:-top-3 lg:-right-3 bg-white text-slate-800 px-3 py-1.5 rounded-2xl rounded-bl-sm shadow-lg text-xs sm:text-sm font-bold whitespace-nowrap"
            >
              ケロ〜🐸
              <div className="absolute bottom-0 left-2 w-2 h-2 bg-white transform rotate-45 translate-y-1" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Section 2 – Country Appeal (Fun cards, not boring)
   ═══════════════════════════════════════════════ */

function AppealSection() {
  return (
    <section className="relative py-14 lg:py-20 bg-gradient-to-br from-white via-white to-emerald-50/30 overflow-hidden">
      {/* Background decorations */}
      <FloatingLeaf className="top-20 left-[8%] hidden lg:block" delay={0} />
      <FloatingLeaf className="top-40 right-[12%] hidden lg:block" delay={2} />
      <FloatingLeaf className="bottom-32 left-[15%] hidden lg:block" delay={1} />
      <FloatingDot className="top-16 right-[20%]" size="w-3 h-3" color="bg-amber-300/20" />
      <FloatingDot className="top-1/3 left-[5%]" size="w-4 h-4" color="bg-emerald-300/15" />
      <FloatingDot className="bottom-20 right-[8%]" size="w-2 h-2" color="bg-sky-300/20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-10 lg:mb-14 relative"
        >
          {/* Peeking mascot */}
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
            3つの魅力をご紹介します
          </p>
        </motion.div>

        {/* Appeal Cards - Fun overlapping style */}
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
              {/* Image with fun frame */}
              <div className="w-full lg:w-[55%] flex-shrink-0 relative z-10">
                <div className="relative">
                  {/* Colored shadow blob */}
                  <div className={cn(
                    "absolute -inset-3 bg-gradient-to-br rounded-3xl opacity-15 blur-xl",
                    item.gradient
                  )} />
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group ring-4 ring-white">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Number badge floating on image */}
                  <motion.div
                    className={cn(
                      "absolute -top-3 -left-3 w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg text-white font-black text-lg z-20 ring-4 ring-white",
                      item.gradient
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {index + 1}
                  </motion.div>
                </div>
              </div>

              {/* Text card overlapping the image */}
              <div className={cn(
                "w-full lg:w-[50%] relative z-20",
                index % 2 === 0 ? "lg:-ml-8" : "lg:-mr-8"
              )}>
                <div className={cn(
                  "bg-gradient-to-br rounded-2xl p-5 lg:p-7 shadow-lg border border-white/80 backdrop-blur-sm",
                  item.cardBg
                )}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold", item.badgeColor)}>
                      <item.icon className="w-3 h-3" />
                      {item.emoji} {item.title}
                    </span>
                  </div>
                  <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                    {item.description}
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
   Section 3 – Testimonials (お客様の声)
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
    <section className="relative py-12 lg:py-20 bg-slate-50 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-0 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl" />

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
          <div className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Section 4 – City Highlights (Fun cards, not tabs)
   ═══════════════════════════════════════════════ */

function CitySection() {
  return (
    <section className="relative py-14 lg:py-20 bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/30 overflow-hidden">
      {/* Decorations */}
      <FloatingDot className="top-20 left-[10%]" size="w-5 h-5" color="bg-emerald-300/15" />
      <FloatingDot className="top-1/2 right-[8%]" size="w-3 h-3" color="bg-amber-300/15" />
      <FloatingDot className="bottom-32 left-[20%]" size="w-4 h-4" color="bg-sky-300/10" />

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
                {/* City Featured Image */}
                <div className="w-full lg:w-[55%] flex-shrink-0 relative">
                  <div className={cn(
                    "absolute -inset-2 bg-gradient-to-br rounded-3xl opacity-10 blur-xl",
                    city.gradient
                  )} />
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl ring-4 ring-white">
                    <Image
                      src={city.featuredImage}
                      alt={city.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* City name overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{city.emoji}</span>
                        <h3 className="text-2xl lg:text-3xl font-black text-white drop-shadow-lg">
                          {city.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* City Info + Places */}
                <div className={cn(
                  "w-full lg:w-[50%] flex flex-col gap-4 relative z-20",
                  cityIndex % 2 === 0 ? "lg:-ml-6 lg:pt-4" : "lg:-mr-6 lg:pt-4"
                )}>
                  {/* Description Card */}
                  <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-slate-100/80">
                    <h4 className="text-base lg:text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <span className={cn(
                        "w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center",
                        city.gradient
                      )}>
                        <MapPin className="w-3.5 h-3.5 text-white" />
                      </span>
                      {city.subtitle}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {city.description}
                    </p>
                    <a href="https://form.kaeruryugaku.com/" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className={cn(
                        "bg-gradient-to-r text-white font-bold shadow-md hover:shadow-lg transition-shadow",
                        city.gradient
                      )}>
                        この都市で留学する
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </a>
                  </div>

                  {/* Famous Places - Fun mini gallery */}
                  <div className="grid grid-cols-3 gap-2">
                    {city.places.map((place, i) => (
                      <motion.div
                        key={place}
                        whileHover={{ scale: 1.05, rotate: i === 1 ? -2 : 2 }}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md ring-2 ring-white cursor-pointer"
                      >
                        <Image
                          src={place}
                          alt={`${city.name} spot ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 33vw, 16vw"
                        />
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
   Section 5 – Gallery (Fun masonry feel)
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
            ニュージーランドの
            <span className="text-emerald-600">風景</span>
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            美しい自然と都市が調和する国 🌏
          </p>
        </motion.div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex -ml-3">
            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                className="flex-[0_0_70%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] pl-3"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-lg group ring-2 ring-white/50">
                  <Image
                    src={src}
                    alt={`NZ gallery ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 70vw, (max-width: 1024px) 45vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Playful nav arrows */}
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
   CTA Section (Warm, inviting, fun)
   ═══════════════════════════════════════════════ */

function CTASection() {
  return (
    <section className="relative py-14 lg:py-18 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 overflow-hidden">
      {/* Decorative fun shapes */}
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
        <motion.div
          className="absolute top-1/2 left-1/4 w-20 h-20 bg-amber-400/10 rounded-full"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Mascot with bounce */}
          <motion.img
            src="/country-dedicated-page/New_Zealand/Hero section/new-zealand-mascot.png"
            alt="NZ Mascot"
            className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 mx-auto mb-4 object-contain drop-shadow-2xl"
            animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

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

          {/* Fun trust line */}
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
