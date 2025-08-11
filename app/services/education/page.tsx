import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Users, BookOpen, Award } from "lucide-react"
import Link from "next/link"
import { services, getProjectsByCategory } from "@/lib/data"
import { getIcon } from "@/lib/icons"

export default function EducationPage() {
  const service = services.services.find((s) => s.id === "education")
  const relatedProjects = getProjectsByCategory("教育")

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
            src="/images/fv-education.png"
            alt="Education Background"
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
            <p className="text-xl lg:text-2xl mb-8 text-[#D4AF37] drop-shadow-md">Education Services</p>
            <p className="text-lg mb-10 text-gray-100 max-w-2xl mx-auto drop-shadow-md">{service.detailDescription}</p>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">未来を創る学生を支援</h2>
              <p className="text-lg text-gray-300 mb-6">
                私たちの教育サービスは、学生一人ひとりの成長を支援し、実践的なスキルを身につけることを目的としています。 最新の技術と教育手法を取り入れ、学習効果を最大化します。
                大学受験のサポートから、専門的なスキルの習得まで、幅広いニーズに対応しています。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="font-bold text-white mb-2">大学受験物理特化サイト</h3>
                  <p className="text-gray-300 text-sm">受験物理SetUp</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="h-6 w-6 text-black">
                      {(() => {
                        const IconComponent = getIcon("Target")
                        return <IconComponent className="h-6 w-6" />
                      })()}
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2">AI×プログラミング学習</h3>
                  <p className="text-gray-300 text-sm">一人ひとりに合わせた学習サポート</p>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">受験物理SetUp</h2>
            <p className="text-lg text-gray-300">難関大合格まで力を伸ばせる物理学習特化サイトです。</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.services.map((serviceItem, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-[#D4AF37] transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-5 w-5 text-[#D4AF37] mr-3" />
                    <h3 className="font-bold text-white">{serviceItem}</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {serviceItem === "早稲田大学生が作った巨大サイト" && "代表が早稲田大学時代に作成したサイト。1か月で1万回以上見られる。"}
                    {serviceItem === "物理のノウハウが詰まった教材" && "大学受験に勝つための物理ノウハウが詰まった教材が手に入る"}
                    {serviceItem === "自主的な学習を支援" && "塾や学校のように教わるのではなく、わからない部分を自ら調べて解決する力を伸ばす"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-4">
          <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
              <Link href="https://ryebourbon.xsrv.jp">
                受験物理SetUpを見る
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Programs */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">学習プログラム</h2>
            <p className="text-lg text-gray-300">段階的なスキルアップを支援</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">初級</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">ベーシックコース</h3>
                  <p className="text-gray-300 text-sm">プログラミング未経験者向け</p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    HTML/CSS基礎
                  </li>
                  <li className="flex items-center text-gray-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    JavaScript入門
                  </li>
                  <li className="flex items-center text-gray-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Webサイト制作実習
                  </li>
                </ul>
                <div className="text-center">
                  <span className="text-2xl font-bold text-[#D4AF37]">¥50,000</span>
                  <span className="text-gray-300 text-sm">/3ヶ月</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 border-[#D4AF37]">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold text-lg">中級</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">アドバンスコース</h3>
                  <p className="text-gray-300 text-sm">実務レベルのスキル習得</p>
                  <Badge className="bg-[#D4AF37] text-black mt-2">人気</Badge>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-[#D4AF37] mr-2" />
                    React/Vue.js
                  </li>
                  <li className="flex items-center text-gray-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-[#D4AF37] mr-2" />
                    Node.js/Express
                  </li>
                  <li className="flex items-center text-gray-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-[#D4AF37] mr-2" />
                    データベース設計
                  </li>
                </ul>
                <div className="text-center">
                  <span className="text-2xl font-bold text-[#D4AF37]">¥120,000</span>
                  <span className="text-gray-300 text-sm">/6ヶ月</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">上級</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">エキスパートコース</h3>
                  <p className="text-gray-300 text-sm">チームリーダー・アーキテクト向け</p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    システム設計
                  </li>
                  <li className="flex items-center text-gray-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    クラウドアーキテクチャ
                  </li>
                  <li className="flex items-center text-gray-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    チームマネジメント
                  </li>
                </ul>
                <div className="text-center">
                  <span className="text-2xl font-bold text-[#D4AF37]">¥200,000</span>
                  <span className="text-gray-300 text-sm">/6ヶ月</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Related Projects */}
      {/* {relatedProjects.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">関連実績</h2>
              <p className="text-lg text-gray-300">教育事業の実績事例</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {relatedProjects.slice(0, 2).map((project) => (
                <Card
                  key={project.id}
                  className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-[#D4AF37] transition-colors"
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
                    >
                      <Link href={`/works/${project.id}`}>詳細を見る</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button
                asChild
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
              >
                <Link href="/works">すべての実績を見る</Link>
              </Button>
            </div>
          </div>
        </section>
      )} */}

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">学習を始めませんか？</h2>
          <p className="text-xl mb-8">あなたのスキルアップをサポートします</p>
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
      </section> */}
    </div>
  )
}
