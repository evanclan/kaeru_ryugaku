import { notFound } from "next/navigation";
import { getPlanBySlug, plans } from "@/data/plans";
import { countries, Country } from "@/data/countries";
import PlanPageClient from "@/components/PlanPageClient";

// Generate static params for all plans
export function generateStaticParams() {
    return plans.map((plan) => ({
        slug: plan.slug,
    }));
}

interface PlanPageProps {
    params: Promise<{ slug: string }>;
}

export default async function PlanPage({ params }: PlanPageProps) {
    const { slug } = await params;
    const plan = getPlanBySlug(slug);

    if (!plan) {
        notFound();
    }

    // Get countries that offer this program
    const availableCountries: Country[] = countries.filter((country) =>
        country.programs.includes(plan.slug)
    );

    return <PlanPageClient plan={plan} availableCountries={availableCountries} />;
}
