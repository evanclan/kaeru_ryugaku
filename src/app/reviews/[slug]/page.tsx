import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, Calendar, Briefcase, CheckCircle } from 'lucide-react'
import { client } from "@/sanity/client"
import { urlFor } from "@/sanity/lib/image"

// Revalidate every minute
export const revalidate = 60

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const query = `*[_type == "studentVoice" && slug.current == $slug][0] {
    title,
    studentName,
    programType,
    studentStatus,
    destination,
    studyPeriod,
    mainImage,
    agencyComment,
    motivation,
    expectations,
    goals,
    messageToStaff,
    mustBringItems,
    tags
  }`

    const review = await client.fetch(query, { slug: decodedSlug })

    if (!review) {
        notFound()
    }

    // Helper date formatter
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <article className="min-h-screen bg-background-alt pb-20">
            {/* Detail Header / Hero */}
            <div className="bg-white border-b border-border">
                <div className="container mx-auto px-4 py-8">
                    <Link href="/all-reviews" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to All Reviews
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Main Image */}
                        <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-lg bg-gray-100 aspect-video md:aspect-[4/3]">
                            {review.mainImage ? (
                                <img
                                    src={urlFor(review.mainImage).width(800).url()}
                                    alt={review.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                            )}
                        </div>

                        {/* Header Info */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-3">
                                    {review.programType}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                                    {review.title}
                                </h1>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 my-4">
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span className="font-medium">{review.destination?.country}, {review.destination?.city}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                                    <Briefcase className="w-4 h-4 text-gray-400" />
                                    <span>{review.studentStatus}</span>
                                </div>
                                {(review.studyPeriod?.departureDate) && (
                                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span>{formatDate(review.studyPeriod?.departureDate)} ~ {formatDate(review.studyPeriod?.returnDate)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                                    {review.studentName?.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-900">{review.studentName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Agency Comment - Staff Box */}
                        {review.agencyComment && (
                            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/40"></div>
                                <h3 className="text-emerald-800 font-bold mb-3 flex items-center gap-2">
                                    <span className="w-6 h-6 flex items-center justify-center bg-emerald-200 rounded-full text-xs">🐸</span>
                                    Staff Comment
                                </h3>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {review.agencyComment}
                                </p>
                            </div>
                        )}

                        {/* Questions Sections */}
                        {review.motivation && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-primary pl-3">Why did you decide to study abroad?</h2>
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{review.motivation}</p>
                                </div>
                            </section>
                        )}

                        {review.expectations && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-primary pl-3">What are you looking forward to?</h2>
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{review.expectations}</p>
                                </div>
                            </section>
                        )}

                        {review.goals && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-primary pl-3">Any goals or dreams?</h2>
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{review.goals}</p>
                                </div>
                            </section>
                        )}

                        {review.messageToStaff && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-primary pl-3">Message to Staff</h2>
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-border bg-gray-50/50">
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap italic">"{review.messageToStaff}"</p>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        {/* Must Bring Items */}
                        {review.mustBringItems && review.mustBringItems.length > 0 && (
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-border sticky top-8">
                                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                                    <span className="text-xl">🎒</span>
                                    Must-Bring Items (Top 3)
                                </h3>
                                <ul className="space-y-4">
                                    {review.mustBringItems.map((item: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                                                {idx + 1}
                                            </span>
                                            <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </article>
    )
}
