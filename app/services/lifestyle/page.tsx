import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Heart, Smartphone, Activity } from "lucide-react"
import Link from "next/link"
import { services, getProjectsByCategory } from "@/lib/data"
import { getIcon } from "@/lib/icons"

export default function LifestylePage() {
  const service = services.services.find((s) => s.id === "lifestyle")
  const relatedProjects = getProjectsByCategory("ライフスタイル")

  if (!service) {
    return <div>サービスが見つかりません</div>
  }

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section with Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/fv-lifestyle.png"
            alt="Lifestyle Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="h-10 w-10 text-black">
                {(() => {
                  const IconComponent = getIcon(service.icon)
                  return <IconComponent className="h-10 w-10" />
                })()}
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              {service.title}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-[#D4AF37] drop-shadow-md">Lifestyle Services</p>
            <p className="text-lg mb-10 text-gray-100 max-w-2xl mx-auto drop-shadow-md">{service.detailDescription}</p>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">豊かな暮らしを実現</h2>
              <p className="text-lg text-gray-300 mb-6">
                身の回りの悩みを初め、現代社会の問題に向き合い、生活が少しでも安全・豊かになるような商品の開発・販売を行ないます。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="font-bold text-white mb-2">置き配・防災バッグ</h3>
                  <p className="text-gray-300 text-sm">置き配問題と災害問題を同時に解決</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="font-bold text-white mb-2">多目的洗剤</h3>
                  <p className="text-gray-300 text-sm">キッチンもお風呂もトイレ掃除はこれ一つで完結</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="h-6 w-6 text-black">
                      {(() => {
                        const IconComponent = getIcon("Users")
                        return <IconComponent className="h-6 w-6" />
                      })()}
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2">Wi-Fi付きモバイルバッテリー</h3>
                  <p className="text-gray-300 text-sm">いざという時に役立つ乾電池式バッテリー</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">ホームセグリー</h2>
            <p className="text-lg text-gray-300">日常使いは置き配バッグとして、緊急時には防災バッグとして活用。</p>
            <p className="text-lg text-gray-300">物流2024年問題から置き配が主流になっていく中、置き配トラブルが相次いでいます。また災害と隣合わせの日本では、常に防災意識を持つ必要があります。</p>
            <p className="text-lg text-gray-300">当製品はそんな２つを同時に解決するバッグです。</p>
            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                <Link href="https://lifeneeds-lab.com/home-sagry" target="_blank">
                  ホームセグリーの詳細を見る
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">オルクリン</h2>
            <p className="text-lg text-gray-300">複数の洗剤は不要。掃除はすべてこれ一つ。</p>
            <p className="text-lg text-gray-300">粉末洗剤をスプレーボトルで溶かすだけ。シュッと吹きかけてキレイに掃除ができます。</p>
            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                <Link href="https://akey33.base.shop/items/94316733" target="_blank">
                  オルクリンの詳細を見る
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Twin Function</h2>
            <p className="text-lg text-gray-300">Wi-Fi搭載の乾電池式モバイルバッテリー</p>
            <p className="text-lg text-gray-300">いざというときにスマホの充電が切れた。いざというときにスマホの通信制限で連絡が取れない。日常使いはもちろん災害時でも役立つモバイルバッテリーです。</p>
            <p className="text-lg text-gray-300">8月末より応援購入サービスMakuakeより先行販売を開始！</p>
            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                <Link href="https://www.makuake.com/start/project/edit/preview/share/9f6aa3f2d243aa3c38629b65245ef3f7" target="_blank">
                  Twin Functionの詳細を見る
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">「あったらいいな」と思える商品を。</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
              <Link href="https://akey33.base.shop/" target="_blank">
                商品一覧はこちら
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
