import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "かえる留学 | 鹿児島発の留学エージェント - 英語力0でも安心サポート",
  description: "鹿児島を拠点とする留学エージェント。英語力0でも大丈夫！手数料0円で、渡航前から帰国後まで完全サポート。オーストラリア、カナダ、イギリスなど主要都市に現地オフィスあり。まずは無料カウンセリングから始めましょう。",
  keywords: "留学, 留学エージェント, 鹿児島, オーストラリア留学, カナダ留学, 語学留学, ワーキングホリデー, 海外留学",
  openGraph: {
    title: "かえる留学 | 鹿児島発の留学エージェント",
    description: "英語力0でも大丈夫！渡航前から帰国後まで完全サポートする留学エージェント。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
