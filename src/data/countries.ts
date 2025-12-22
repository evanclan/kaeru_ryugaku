// Centralized country data for the website
// This data is used across navigation, listings, and individual pages

export interface Country {
    slug: string;
    nameJp: string;
    nameEn: string;
    flag: string;
    description: string;
    highlights: string[];
    heroImage?: string;
    programs: string[];
    costRange: string;
    popularCities: string[];
    climate: string;
    visa: string;
    featured?: boolean;
}

export const countries: Country[] = [
    {
        slug: "canada",
        nameJp: "カナダ",
        nameEn: "Canada",
        flag: "🇨🇦",
        description: "英語とフランス語が公用語の多文化国家。美しい自然と高い教育水準が魅力です。",
        highlights: [
            "ワーキングホリデー人気No.1",
            "治安が良く住みやすい",
            "多文化で留学生に優しい環境"
        ],
        programs: ["working-holiday", "language-study", "high-school"],
        costRange: "月15〜25万円",
        popularCities: ["バンクーバー", "トロント", "モントリオール"],
        climate: "四季がはっきり、冬は寒い",
        visa: "学生ビザ / ワーキングホリデービザ",
        featured: true
    },
    {
        slug: "new-zealand",
        nameJp: "ニュージーランド",
        nameEn: "New Zealand",
        flag: "🇳🇿",
        description: "大自然に囲まれた穏やかな国。少人数制の教育と親日的な国民性が特徴です。",
        highlights: [
            "自然豊かでアウトドア好きに最適",
            "親日的で温かい国民性",
            "比較的物価が安い"
        ],
        programs: ["working-holiday", "language-study", "high-school"],
        costRange: "月12〜20万円",
        popularCities: ["オークランド", "クライストチャーチ", "ウェリントン"],
        climate: "温暖で過ごしやすい",
        visa: "学生ビザ / ワーキングホリデービザ",
        featured: true
    },
    {
        slug: "philippines",
        nameJp: "フィリピン",
        nameEn: "Philippines",
        flag: "🇵🇭",
        description: "マンツーマンレッスンが充実したコスパ最強の留学先。短期集中で英語力UP！",
        highlights: [
            "マンツーマン授業が中心",
            "費用が格安",
            "日本から近い（約4時間）"
        ],
        programs: ["language-study", "junior-summercamp"],
        costRange: "月8〜15万円",
        popularCities: ["セブ", "マニラ", "バギオ"],
        climate: "熱帯性気候、年中温暖",
        visa: "観光ビザ（30日以内）/ 学生ビザ"
    },
    {
        slug: "malta",
        nameJp: "マルタ",
        nameEn: "Malta",
        flag: "🇲🇹",
        description: "地中海に浮かぶ美しい島国。ヨーロッパ文化と英語学習を同時に楽しめます。",
        highlights: [
            "ヨーロッパ旅行の拠点に最適",
            "美しい地中海の景色",
            "多国籍な環境で学べる"
        ],
        programs: ["language-study"],
        costRange: "月15〜22万円",
        popularCities: ["バレッタ", "スリーマ", "セントジュリアンズ"],
        climate: "地中海性気候、温暖",
        visa: "シェンゲンビザ（90日以内不要）"
    },
    {
        slug: "dubai",
        nameJp: "ドバイ",
        nameEn: "Dubai",
        flag: "🇦🇪",
        description: "急成長する国際都市でのグローバル体験。最先端の環境で学べます。",
        highlights: [
            "国際的なビジネス環境",
            "治安が良い",
            "多様な文化が共存"
        ],
        programs: ["language-study"],
        costRange: "月18〜28万円",
        popularCities: ["ドバイ", "アブダビ"],
        climate: "砂漠気候、夏は非常に暑い",
        visa: "観光ビザ / 学生ビザ"
    },
    {
        slug: "korea",
        nameJp: "韓国",
        nameEn: "Korea",
        flag: "🇰🇷",
        description: "日本から最も近い留学先。K-POPや韓国文化に興味がある方に人気です。",
        highlights: [
            "日本から2時間でアクセス抜群",
            "韓国語＋英語が学べる",
            "K-POP・韓国文化を体験"
        ],
        programs: ["language-study"],
        costRange: "月10〜18万円",
        popularCities: ["ソウル", "釜山", "済州"],
        climate: "四季がはっきり",
        visa: "観光ビザ（90日以内）/ 学生ビザ"
    },
    {
        slug: "australia",
        nameJp: "オーストラリア",
        nameEn: "Australia",
        flag: "🇦🇺",
        description: "温暖な気候と多様な文化が魅力の大陸国家。ワーホリの定番人気国です。",
        highlights: [
            "温暖で過ごしやすい気候",
            "時差が少ない（1〜2時間）",
            "働きながら学べる環境"
        ],
        programs: ["working-holiday", "language-study", "high-school"],
        costRange: "月15〜25万円",
        popularCities: ["シドニー", "メルボルン", "ブリスベン", "ゴールドコースト"],
        climate: "温暖、地域により異なる",
        visa: "学生ビザ / ワーキングホリデービザ",
        featured: true
    },
    {
        slug: "germany",
        nameJp: "ドイツ",
        nameEn: "Germany",
        flag: "🇩🇪",
        description: "ヨーロッパ最大の経済大国。大学の学費が無料で、質の高い教育が受けられます。",
        highlights: [
            "大学学費が無料",
            "EU中心地でアクセス良好",
            "エンジニアリング・製造業が強い"
        ],
        programs: ["language-study", "high-school"],
        costRange: "月12〜20万円",
        popularCities: ["ベルリン", "ミュンヘン", "フランクフルト"],
        climate: "四季がはっきり、冬は寒い",
        visa: "学生ビザ / ワーキングホリデービザ"
    },
    {
        slug: "ireland",
        nameJp: "アイルランド",
        nameEn: "Ireland",
        flag: "🇮🇪",
        description: "フレンドリーな国民性と美しい自然が魅力。英語圏でありながらヨーロッパ文化も楽しめます。",
        highlights: [
            "フレンドリーな国民性",
            "ヨーロッパ唯一の英語圏",
            "IT企業の欧州拠点が多い"
        ],
        programs: ["language-study", "working-holiday"],
        costRange: "月15〜25万円",
        popularCities: ["ダブリン", "コーク", "ゴールウェイ"],
        climate: "温暖で雨が多い",
        visa: "学生ビザ / ワーキングホリデービザ"
    },
    {
        slug: "usa",
        nameJp: "アメリカ",
        nameEn: "USA",
        flag: "🇺🇸",
        description: "世界トップクラスの大学と多様な文化。エンターテイメントからビジネスまで幅広い経験ができます。",
        highlights: [
            "世界最高峰の大学群",
            "多様な文化と価値観",
            "キャリアの可能性が広い"
        ],
        programs: ["language-study", "high-school"],
        costRange: "月20〜35万円",
        popularCities: ["ロサンゼルス", "ニューヨーク", "サンフランシスコ", "シアトル"],
        climate: "地域により大きく異なる",
        visa: "学生ビザ (F-1)"
    },
    {
        slug: "uk",
        nameJp: "イギリス",
        nameEn: "UK",
        flag: "🇬🇧",
        description: "伝統と革新が共存する国。本場のブリティッシュ英語と歴史ある教育を体験できます。",
        highlights: [
            "本場のブリティッシュ英語",
            "歴史ある名門大学",
            "ヨーロッパ旅行に便利"
        ],
        programs: ["language-study", "high-school"],
        costRange: "月18〜30万円",
        popularCities: ["ロンドン", "オックスフォード", "ケンブリッジ", "エディンバラ"],
        climate: "温暖で雨が多い",
        visa: "学生ビザ / YMSビザ"
    }
];

// Get country by slug
export function getCountryBySlug(slug: string): Country | undefined {
    return countries.find(c => c.slug === slug);
}

// Get featured countries
export function getFeaturedCountries(): Country[] {
    return countries.filter(c => c.featured);
}

// Get countries for navigation (currently active on the site)
export function getNavCountries(): Country[] {
    return countries.filter(c => ["canada", "new-zealand"].includes(c.slug));
}

// Get all country slugs for static generation
export function getAllCountrySlugs(): string[] {
    return countries.map(c => c.slug);
}
