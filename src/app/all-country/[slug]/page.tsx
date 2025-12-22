import { notFound } from "next/navigation";
import { getCountryBySlug, countries } from "@/data/countries";
import { getPlanBySlug, PlanData } from "@/data/plans";
import CountryPageClient from "@/components/CountryPageClient";

// Generate static params for all countries
export function generateStaticParams() {
    return countries.map((country) => ({
        slug: country.slug,
    }));
}

interface CountryPageProps {
    params: Promise<{ slug: string }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
    const { slug } = await params;
    const country = getCountryBySlug(slug);

    if (!country) {
        notFound();
    }

    // Get related programs
    const relatedPrograms = country.programs
        .map((programSlug) => getPlanBySlug(programSlug))
        .filter((p): p is PlanData => p !== undefined);

    return <CountryPageClient country={country} relatedPrograms={relatedPrograms} />;
}
