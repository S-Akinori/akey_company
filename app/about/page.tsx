import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { company } from "@/lib/data"
import { getIcon } from "@/lib/icons"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: '私たちについて',
  description: '株式会社A-株式会社A-Keyは、お客様の可能性を最大限に引き出し、 未来への扉を開く鍵となることを使命としています。',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero Section with Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/fv-about.png"
            alt="About Us Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              私たちについて
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-[#D4AF37] drop-shadow-md">About A-Key</p>
            <p className="text-lg mb-10 text-gray-100 max-w-2xl mx-auto drop-shadow-md">
              {company.name}は、お客様の可能性を最大限に引き出し、 未来への扉を開く鍵となることを使命としています。
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">会社概要</h2>
              <p className="text-lg text-gray-300 mb-6">
                {company.name}
                は、ITソリューション、教育、ライフスタイルの3つの事業領域で、
                お客様の課題解決と成長をサポートしています。
              </p>
              <p className="text-lg text-gray-300 mb-8">
                私たちは常に最新の技術とアイデアを追求し、お客様との信頼関係を大切にしながら、
                革新的なソリューションを提供し続けています。
              </p>
              <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                <Link href="/services">事業内容を見る</Link>
              </Button>
            </div>
            {/* <div className="grid grid-cols-2 gap-6">
              {company.stats.map((stat, index) => (
                <Card key={index} className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-[#D4AF37] mb-2">{stat.value}</div>
                    <div className="text-gray-300">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">ミッション・ビジョン</h2>
            <p className="text-lg text-gray-300">私たちが目指すもの</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="p-8 text-center">
                <ArrowRight className="h-12 w-12 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">ミッション</h3>
                <p className="text-gray-300">{company.mission}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="p-8 text-center">
                <ArrowRight className="h-12 w-12 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">ビジョン</h3>
                <p className="text-gray-300">{company.vision}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">私たちの価値観</h2>
            <p className="text-lg text-gray-300">A-Keyが大切にする3つの価値観</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {company.values.map((value, index) => {
              const IconComponent = getIcon(value.icon)
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-10 w-10 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center">会社情報</h2>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">会社名</h3>
                      <p className="text-gray-300">{company.name}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">設立</h3>
                      <p className="text-gray-300">{company.info.established}</p>
                    </div>
                    {/* <div>
                      <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">資本金</h3>
                      <p className="text-gray-300">{company.info.capital}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">従業員数</h3>
                      <p className="text-gray-300">{company.info.employees}</p>
                    </div> */}
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">代表取締役</h3>
                      <p className="text-gray-300">{company.info.ceo}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">所在地</h3>
                      <p className="text-gray-300">
                        {company.info.address.postal}
                        <br />
                        {company.info.address.street}
                        <br />
                        {company.info.address.building}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">事業内容</h3>
                      <p className="text-gray-300">
                        ITソリューション事業
                        <br />
                        教育事業
                        <br />
                        ライフスタイル事業
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">一緒に未来を創りませんか？</h2>
          <p className="text-xl mb-8">お気軽にお問い合わせください</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
              <Link href="/contact">お問い合わせ</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
            >
              <Link href="/services">事業内容を見る</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
