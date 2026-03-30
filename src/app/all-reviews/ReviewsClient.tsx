"use client"

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReviewCard } from '@/components/ReviewCard'

// Type definition
type StudentVoice = {
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

const ALL_OPTION = "All"

export default function ReviewsClient({ initialReviews }: { initialReviews: StudentVoice[] }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(ALL_OPTION)
    const [selectedStatus, setSelectedStatus] = useState(ALL_OPTION)
    const [selectedProgram, setSelectedProgram] = useState(ALL_OPTION)

    // Extract unique options
    const countries = useMemo(() => {
        const set = new Set(initialReviews.map(r => r.destination?.country).filter(Boolean))
        return [ALL_OPTION, ...Array.from(set)]
    }, [initialReviews])

    const programs = useMemo(() => {
        const set = new Set(initialReviews.map(r => r.programType).filter(Boolean))
        return [ALL_OPTION, ...Array.from(set)]
    }, [initialReviews])

    const reviewStatuses = useMemo(() => {
        const set = new Set(initialReviews.map(r => r.reviewStatus).filter(Boolean))
        const statusOrder = ['出発前', '留学中', '帰国後']
        const available = Array.from(set)
        available.sort((a, b) => {
            const indexA = statusOrder.indexOf(a as string);
            const indexB = statusOrder.indexOf(b as string);
            return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
        })
        return [ALL_OPTION, ...available]
    }, [initialReviews])

    // Filter logic
    const filteredReviews = useMemo(() => {
        return initialReviews.filter(review => {
            const matchSearch =
                review.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.destination?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.destination?.country?.toLowerCase().includes(searchQuery.toLowerCase())

            const matchCountry = selectedCountry === ALL_OPTION || review.destination?.country === selectedCountry
            const matchStatus = selectedStatus === ALL_OPTION || review.reviewStatus === selectedStatus
            const matchProgram = selectedProgram === ALL_OPTION || review.programType === selectedProgram

            return matchSearch && matchCountry && matchStatus && matchProgram
        })
    }, [initialReviews, searchQuery, selectedCountry, selectedStatus, selectedProgram])

    // Clear filters
    const clearFilters = () => {
        setSearchQuery('')
        setSelectedCountry(ALL_OPTION)
        setSelectedStatus(ALL_OPTION)
        setSelectedProgram(ALL_OPTION)
    }

    const hasFilters = searchQuery || selectedCountry !== ALL_OPTION || selectedStatus !== ALL_OPTION || selectedProgram !== ALL_OPTION

    return (
        <div className="container mx-auto px-4 pb-20">
            {/* Search & Filter Container */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-12 -mt-10 relative z-20 max-w-5xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Search Bar */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="名前、都市、フリーワードで検索..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                        />
                    </div>

                    {/* Filters Group */}
                    <div className="flex flex-wrap gap-3 flex-1 lg:flex-none">
                        <div className="relative group min-w-[140px] flex-1 sm:flex-none">
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer hover:bg-slate-50 transition-colors pr-8"
                            >
                                <option value={ALL_OPTION}>国・すべて</option>
                                {countries.filter(c => c !== ALL_OPTION).map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <Filter className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="relative group min-w-[140px] flex-1 sm:flex-none">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer hover:bg-slate-50 transition-colors pr-8"
                            >
                                <option value={ALL_OPTION}>状況・すべて</option>
                                {reviewStatuses.filter(s => s !== ALL_OPTION).map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <Filter className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="relative group min-w-[140px] flex-1 sm:flex-none">
                            <select
                                value={selectedProgram}
                                onChange={(e) => setSelectedProgram(e.target.value)}
                                className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer hover:bg-slate-50 transition-colors pr-8"
                            >
                                <option value={ALL_OPTION}>種類・すべて</option>
                                {programs.filter(p => p !== ALL_OPTION).map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <Filter className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Filters Display */}
                <AnimatePresence>
                    {hasFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                                <span className="text-xs font-medium text-slate-400 mr-2">絞り込み中:</span>
                                {selectedCountry !== ALL_OPTION && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                        {selectedCountry}
                                        <button onClick={() => setSelectedCountry(ALL_OPTION)} className="ml-1.5 hover:text-emerald-900"><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                {selectedStatus !== ALL_OPTION && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                                        {selectedStatus}
                                        <button onClick={() => setSelectedStatus(ALL_OPTION)} className="ml-1.5 hover:text-amber-900"><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                {selectedProgram !== ALL_OPTION && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                                        {selectedProgram}
                                        <button onClick={() => setSelectedProgram(ALL_OPTION)} className="ml-1.5 hover:text-blue-900"><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="ml-auto text-xs text-slate-400 hover:text-red-500 h-auto py-1"
                                >
                                    リセット
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredReviews.map((review) => (
                        <motion.div
                            key={review._id || review.slug.current}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <ReviewCard review={review} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredReviews.length === 0 && (
                <div className="text-center py-32 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
                        <Search className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 mb-2">条件に一致する体験談が見つかりませんでした</h3>
                    <p className="text-slate-500 mb-6">検索条件を変更して、再度お試しください。</p>
                    <Button variant="outline" onClick={clearFilters} className="text-slate-600">
                        すべての条件をクリア
                    </Button>
                </div>
            )}
        </div>
    )
}
