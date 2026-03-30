import { client } from "@/sanity/client";
import NewZealandPageClient from "@/components/NewZealandPageClient";

export const revalidate = 60;

export default async function NewZealandPage() {
  const query = `*[_type == "studentVoice"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    studentName,
    programType,
    studentStatus,
    reviewStatus,
    destination,
    mainImage,
    tags
  }`;

  const allReviews = await client.fetch(query);

  const reviews = allReviews
    .sort(() => 0.5 - Math.random())
    .slice(0, 15);

  return <NewZealandPageClient reviews={reviews} />;
}
