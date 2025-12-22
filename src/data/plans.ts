// Centralized program/plan data for the website
// This data is used across navigation, listings, and individual pages

// Serializable plan data (no functions/components)
export interface PlanData {
    slug: string;
    nameJp: string;
    nameEn: string;
    iconName: "Briefcase" | "Languages" | "GraduationCap" | "School" | "Sun";
    description: string;
    longDescription: string;
    highlights: string[];
    eligibility: string;
    duration: string;
    costRange: string;
    benefits: string[];
    gradient: string;
    featured?: boolean;
}

export const plans: PlanData[] = [
    {
        slug: "working-holiday",
        nameJp: "ワーキングホリデー",
        nameEn: "Working Holiday",
        iconName: "Briefcase",
        description: "働きながら海外生活を体験。語学力と実践スキルを同時に習得できる人気プログラム。",
        longDescription: "ワーキングホリデービザを利用して、現地で働きながら長期滞在できるプログラムです。語学学校で英語を学びながら、現地のカフェやレストラン、オフィスなどで就労経験を積むことができます。費用を抑えながら、実践的な英語力とグローバルな視点を身につけられます。",
        highlights: [
            "働きながら滞在費を稼げる",
            "実践的な英語力が身につく",
            "現地の生活を深く体験できる"
        ],
        eligibility: "18〜30歳（国により31歳まで）",
        duration: "最長1年（国により延長可）",
        costRange: "初期費用50〜100万円",
        benefits: [
            "現地での就労が可能",
            "語学学校との組み合わせOK",
            "滞在先の選択自由度が高い",
            "帰国後のキャリアに活かせる"
        ],
        gradient: "from-emerald-500 to-teal-600",
        featured: true
    },
    {
        slug: "language-study",
        nameJp: "語学留学",
        nameEn: "Language Study",
        iconName: "Languages",
        description: "集中的に語学力を向上させたい方向け。短期から長期まで柔軟に選べます。",
        longDescription: "語学学校に通いながら集中的に英語を学ぶプログラムです。1週間の短期から1年以上の長期まで、目的や予算に合わせて期間を選べます。グループレッスンやマンツーマン、ビジネス英語など、コースも多彩です。",
        highlights: [
            "語学力向上に集中できる",
            "期間を柔軟に選べる",
            "多彩なコースから選択可能"
        ],
        eligibility: "年齢制限なし（18歳未満は保護者同意要）",
        duration: "1週間〜1年以上",
        costRange: "1ヶ月15〜35万円",
        benefits: [
            "自分のペースで学習できる",
            "各国の語学学校を紹介",
            "ホームステイや寮など滞在先も手配",
            "観光やアクティビティも楽しめる"
        ],
        gradient: "from-blue-500 to-indigo-600",
        featured: true
    },
    {
        slug: "philippines-study",
        nameJp: "フィリピン留学",
        nameEn: "Philippines Study",
        iconName: "GraduationCap",
        description: "マンツーマン集中レッスンでコスパ◎。短期間で効率よく英語力UP！",
        longDescription: "フィリピンの語学学校では、1日6〜8時間のマンツーマンレッスンが基本。講師と1対1で集中的に学べるため、短期間でも確実に英語力が伸びます。費用も他国の半分以下で、コストパフォーマンス抜群です。",
        highlights: [
            "1日6時間以上のマンツーマン授業",
            "費用が他国の半分以下",
            "日本から約4時間でアクセス良好"
        ],
        eligibility: "高校生以上（中学生は保護者同伴）",
        duration: "1週間〜6ヶ月",
        costRange: "1ヶ月8〜15万円（授業料+寮費+食費込み）",
        benefits: [
            "圧倒的なコストパフォーマンス",
            "集中的なマンツーマン授業",
            "食事・寮付きで安心",
            "TOEIC/IELTS対策コースあり"
        ],
        gradient: "from-blue-500 to-indigo-600"
    },
    {
        slug: "high-school",
        nameJp: "高校留学",
        nameEn: "High School",
        iconName: "School",
        description: "現地の高校に通って異文化体験＆語学習得。将来のグローバル人材に。",
        longDescription: "海外の現地高校に入学し、現地の学生と一緒に授業を受けるプログラムです。長期間の留学で自然な英語力が身につき、異文化理解も深まります。将来の海外大学進学や国際的なキャリアの基盤を築けます。",
        highlights: [
            "現地学生と同じ環境で学べる",
            "自然な英語力が身につく",
            "海外大学進学への道を開く"
        ],
        eligibility: "中学3年生〜高校2年生",
        duration: "1学期〜1年以上",
        costRange: "年間200〜400万円",
        benefits: [
            "現地の卒業資格取得も可能",
            "ホストファミリーとの生活体験",
            "課外活動やクラブ活動に参加",
            "大学進学サポートあり"
        ],
        gradient: "from-purple-500 to-pink-600"
    },
    {
        slug: "junior-summercamp",
        nameJp: "ジュニアサマーキャンプ",
        nameEn: "Junior Summercamp",
        iconName: "Sun",
        description: "夏休みを活用した短期体験プログラム。小中学生向けの安心プログラム。",
        longDescription: "夏休みの2〜4週間を利用した、小中学生向けの短期留学プログラムです。英語レッスンとアクティビティを組み合わせた楽しいプログラムで、初めての海外体験にぴったり。引率者付きのグループツアー形式もあり安心です。",
        highlights: [
            "夏休みの短期間で参加可能",
            "英語＋アクティビティで楽しく学べる",
            "引率者付きで安心"
        ],
        eligibility: "小学4年生〜中学3年生",
        duration: "2〜4週間",
        costRange: "2週間30〜50万円",
        benefits: [
            "初めての海外体験に最適",
            "楽しみながら英語に触れる",
            "同年代の仲間と参加",
            "将来の長期留学のきっかけに"
        ],
        gradient: "from-orange-500 to-amber-600"
    }
];

// Get plan by slug
export function getPlanBySlug(slug: string): PlanData | undefined {
    return plans.find(p => p.slug === slug);
}

// Get featured plans
export function getFeaturedPlans(): PlanData[] {
    return plans.filter(p => p.featured);
}

// Get plans for navigation (currently active on the site)
export function getNavPlans(): PlanData[] {
    return plans.filter(p => ["working-holiday", "language-study"].includes(p.slug));
}

// Get all plan slugs for static generation
export function getAllPlanSlugs(): string[] {
    return plans.map(p => p.slug);
}
