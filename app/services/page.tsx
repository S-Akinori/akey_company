import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { services } from "@/lib/data"
import { getIcon } from "@/lib/icons"

export default function ServicesPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero Section with Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/fv-services.png"
            alt="Services Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">事業内容</h1>
            <p className="text-xl lg:text-2xl mb-8 text-[#D4AF37] drop-shadow-md">Our Services</p>
            <p className="text-lg mb-10 text-gray-100 max-w-2xl mx-auto drop-shadow-md">
              ITソリューション・教育・ライフスタイルの3つの事業領域で、 お客様のあらゆるニーズにお応えします。
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.services.map((service) => {
              const IconComponent = getIcon(service.icon)
              return (
                <Card
                  key={service.id}
                  className="group hover:shadow-xl hover:shadow-[#D4AF37]/20 transition-all duration-300 border-gray-700 shadow-lg bg-gray-800/50 backdrop-blur-sm"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
                      <IconComponent className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, index) => {
                        const FeatureIcon = getIcon(feature.icon)
                        return (
                          <div key={index} className="flex items-center text-sm text-gray-300">
                            <FeatureIcon className="h-4 w-4 mr-2 text-[#D4AF37]" />
                            {feature.title}
                          </div>
                        )
                      })}
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
                    >
                      <Link href={`/services/${service.id}`}>
                        詳しく見る
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">サービス提供の流れ</h2>
            <p className="text-lg text-gray-300">お客様との協働プロセス</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {services.process.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold text-lg">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">プロジェクトを始めませんか？</h2>
          <p className="text-xl mb-8">お客様の課題解決をサポートします</p>
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
              <Link href="/works">実績を見る</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
