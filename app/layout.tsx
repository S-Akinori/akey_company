import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
})

export const metadata: Metadata = {
  title: "株式会社A-Key | 未来への扉を開く鍵",
  description:
    "株式会社A-Keyは、ITソリューション・教育・ライフスタイルの3つの事業を通じて、お客様の課題解決と成長をサポートします。",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable}`}>
      <body className={`${inter.className} font-sans`}>
        {/* React Three Fiberとdreiライブラリは自動的にインポートされます */}
        {/* 追加の設定は不要です */}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
