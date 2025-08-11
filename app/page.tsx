import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import PageWrapper from "@/components/page-wrapper"
import { company, services, getLatestNews } from "@/lib/data"
import { getIcon } from "@/lib/icons"

export default function HomePage() {
  const latestNews = getLatestNews(3)

  return (
    <PageWrapper>
      <div className="min-h-screen text-white">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                {company.tagline.split("鍵")[0]}
                <span className="text-[#D4AF37]">鍵</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-[#D4AF37]">{company.taglineEn}</p>
              <p className="text-lg mb-10 text-gray-300 max-w-2xl mx-auto">{company.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                  <Link href="/services">
                    事業内容を見る
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
                >
                  <Link href="/contact">お問い合わせ</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">3つの事業領域</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                多角的なアプローチで、お客様のあらゆるニーズにお応えします
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.services.map((service) => {
                const IconComponent = getIcon(service.icon)
                return (
                  <Card
                    key={service.id}
                    className="group hover:shadow-xl hover:shadow-[#D4AF37]/20 transition-all duration-300 border-gray-700 shadow-lg bg-gray-800/50 backdrop-blur-sm"
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white transition-colors">
                        <IconComponent className="h-8 w-8 text-black" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                      <p className="text-gray-300 mb-6">{service.description}</p>
                      <Button
                        asChild
                        variant="outline"
                        className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
                      >
                        <Link href={`/services/${service.id}`}>詳しく見る</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">私たちの価値観</h2>
              <p className="text-lg text-gray-300">A-Keyが大切にする3つの価値観</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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

        {/* News & Updates */}
        {/* <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">最新情報</h2>
              <Button
                asChild
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
              >
                <Link href="/news">すべて見る</Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.map((newsItem) => (
                <Card
                  key={newsItem.id}
                  className="hover:shadow-lg hover:shadow-[#D4AF37]/10 transition-shadow bg-gray-800/50 backdrop-blur-sm border-gray-700"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-400">{newsItem.date}</span>
                      <span className="px-2 py-1 bg-[#D4AF37] text-black text-xs rounded">{newsItem.category}</span>
                    </div>
                    <h3 className="font-bold text-white mb-2 line-clamp-2">{newsItem.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-3">{newsItem.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">お気軽にお問い合わせください</h2>
            <p className="text-xl mb-8">あなたの課題解決のお手伝いをさせていただきます</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                <Link href="/contact">
                  お問い合わせ
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
              >
                <Link href="/services">サービス一覧</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  )
}
