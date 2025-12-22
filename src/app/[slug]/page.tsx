import { client } from '@/sanity/client'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
    const query = `*[_type == "page"]{ "slug": slug.current }`
    const pages = await client.fetch(query)

    return pages.map((page: any) => ({
        slug: page.slug,
    }))
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const query = `*[_type == "page" && slug.current == $slug][0]`

    const page = await client.fetch(query, { slug })

    if (!page) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center">{page.title}</h1>
            <article className="prose prose-lg mx-auto prose-green bg-white/80 p-8 rounded-xl shadow-sm backdrop-blur-sm">
                <PortableText value={page.body} />
            </article>
        </div>
    )
}
