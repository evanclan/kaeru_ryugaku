import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const revalidate = 60 // revalidate at most every hour

export async function generateStaticParams() {
    const query = `*[_type == "post"]{ "slug": slug.current }`
    const posts = await client.fetch(query)

    return posts.map((post: any) => ({
        slug: post.slug,
    }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    body,
    publishedAt,
    author->{name, image}
  }`

    const post = await client.fetch(query, { slug })

    if (!post) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                {post.author && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                        {post.author.image && (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                    src={urlFor(post.author.image).width(100).height(100).url()}
                                    alt={post.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <p className="text-gray-600">By {post.author.name}</p>
                    </div>
                )}
                <p className="text-gray-500">
                    Published on {new Date(post.publishedAt).toLocaleDateString()}
                </p>
            </div>

            {post.mainImage && (
                <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src={urlFor(post.mainImage).width(1200).height(800).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <article className="prose prose-lg mx-auto prose-green bg-white/80 p-8 rounded-xl shadow-sm backdrop-blur-sm">
                <PortableText value={post.body} />
            </article>
        </div>
    )
}
