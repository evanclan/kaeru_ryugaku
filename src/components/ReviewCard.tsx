"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

// Types based on the Sanity schema we saw in ReviewsClient
export type StudentVoice = {
    _id: string
    title: string
    slug: { current: string }
    studentName: string
    programType: string
    studentStatus: string
    reviewStatus?: string
    destination: {
        country: string
        city: string
    }
    mainImage?: any
    tags?: string[]
}

interface ReviewCardProps {
    review: StudentVoice
    className?: string
}

const getCountryFlag = (country: string) => {
    const map: Record<string, string> = {
        'Philippines': 'Philippines.png',
        'フィリピン': 'Philippines.png',
        'Canada': 'Canada.png',
        'カナダ': 'Canada.png',
        'Australia': 'Australia.png',
        'オーストラリア': 'Australia.png',
        'USA': 'America.png',
        'America': 'America.png',
        'アメリカ': 'America.png',
        'UK': 'UK.png',
        'イギリス': 'UK.png',
        'New Zealand': 'New Zealand.png',
        'ニュージーランド': 'New Zealand.png',
        'Malta': 'Malta.png',
        'マルタ': 'Malta.png',
        'Germany': 'Germany.png',
        'ドイツ': 'Germany.png',
        'Korea': 'Korea.png',
        '韓国': 'Korea.png',
        'Ireland': 'ireland.png',
        'アイルランド': 'ireland.png',
        'Dubai': 'Dubai.png',
        'ドバイ': 'Dubai.png',
    }
    return map[country] || 'globe.svg' // Fallback to a globe icon if available or handle gracefully
}

export function ReviewCard({ review, className }: ReviewCardProps) {
    const imageUrl = review.mainImage
        ? urlFor(review.mainImage).width(600).height(600).url()
        : '/placeholder.jpg'

    const statusLabels: Record<string, string> = {
        'Before Departure': '出発前',
        'Studying': '留学中',
        'Graduated': '卒業生',
        'Returnee': '帰国後',
    }

    // Priority: reviewStatus > mapped studentStatus > studentStatus > fallback
    const rawStatus = review.reviewStatus || review.studentStatus
    const statusText = statusLabels[rawStatus] || rawStatus || '体験談'

    const statusColors: Record<string, string> = {
        '出発前': 'bg-emerald-500',
        '留学中': 'bg-blue-500',
        '卒業生': 'bg-purple-500',
        '帰国後': 'bg-amber-500',
    }

    const badgeColor = statusColors[statusText] || 'bg-emerald-500'

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn("group relative flex flex-col h-full", className)}
        >
            <Link href={`/reviews/${review.slug.current}`} className="flex flex-col h-full">
                <div className="flex-1 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 ring-1 ring-gray-100 flex flex-col h-full">

                    {/* Image Section - Cleaner Aspect Ratio */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
                        <Image
                            src={imageUrl}
                            alt={review.title}
                            fill
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Gradient Overlay for Depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Top Left: Glass Status Badge */}
                        <div className="absolute top-3 left-3 z-10">
                            <div className={cn(
                                "backdrop-blur-md bg-white/90 text-[10px] md:text-xs font-bold py-1 px-2 md:py-1.5 md:px-3 rounded-full shadow-sm flex items-center gap-1 md:gap-1.5",
                                "ring-1 ring-black/5"
                            )}>
                                <span className={cn("w-1.5 h-1.5 md:w-2 md:h-2 rounded-full", badgeColor)}></span>
                                <span className="text-gray-800">{statusText}</span>
                            </div>
                        </div>

                        {/* Top Right: Country Flag (Updated) */}
                        <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 transition-transform duration-300 group-hover:scale-110">
                            <div className="relative w-[36px] h-[36px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden shadow-lg">
                                <Image
                                    src={`/country flags/${getCountryFlag(review.destination?.country)}`}
                                    alt={review.destination?.country || 'Country Flag'}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 36px, 60px"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-3 md:p-4 flex flex-col flex-1">

                        {/* Meta Tags Row */}
                        <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
                            {/* Program Type */}
                            <span className="inline-flex items-center px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md bg-blue-50 text-blue-700 text-[9px] md:text-[10px] font-bold tracking-wide uppercase ring-1 ring-blue-600/10 whitespace-nowrap">
                                {review.programType}
                            </span>

                            {/* Country */}
                            {review.destination?.country && (
                                <span className="inline-flex items-center px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md bg-purple-50 text-purple-700 text-[9px] md:text-[10px] font-bold tracking-wide uppercase ring-1 ring-purple-600/10 whitespace-nowrap">
                                    {review.destination.country}
                                </span>
                            )}

                            {/* City */}
                            {review.destination?.city && (
                                <span className="inline-flex items-center px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md bg-indigo-50 text-indigo-700 text-[9px] md:text-[10px] font-bold tracking-wide uppercase ring-1 ring-indigo-600/10 whitespace-nowrap">
                                    {review.destination.city}
                                </span>
                            )}

                            {/* Student Status */}
                            {review.studentStatus && (
                                <span className="inline-flex items-center px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md bg-amber-50 text-amber-700 text-[9px] md:text-[10px] font-bold tracking-wide uppercase ring-1 ring-amber-600/10 whitespace-nowrap">
                                    {review.studentStatus}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h3 className="text-gray-900 font-bold text-[13px] md:text-xl leading-snug mb-2 md:mb-3 line-clamp-2 group-hover:text-[#059669] transition-colors">
                            {review.title}
                        </h3>

                        {/* Spacer */}
                        <div className="flex-grow" />

                        {/* User Profile Section */}
                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-[#059669]/10 flex items-center justify-center text-[#059669] font-bold text-xs md:text-sm ring-2 ring-white">
                                    {review.studentName.charAt(0)}
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-xs md:text-lg font-bold text-gray-800 leading-none">
                                        {review.studentName}
                                    </span>
                                </div>
                            </div>

                            {/* Chevron or Action hint */}
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#059669] transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-white transition-colors duration-300 w-3 h-3 md:w-4 md:h-4">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
