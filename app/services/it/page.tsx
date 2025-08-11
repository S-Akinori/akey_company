import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, AppWindow } from "lucide-react"
import Link from "next/link"
import { services, getProjectsByCategory } from "@/lib/data"
import { getIcon } from "@/lib/icons"

export default function ITSolutionPage() {
  const service = services.services.find((s) => s.id === "it")
  const relatedProjects = getProjectsByCategory("web-works")

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
            src="/images/fv-it.png"
            alt="IT Solutions Background"
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
            <p className="text-xl lg:text-2xl mb-8 text-[#D4AF37] drop-shadow-md">IT Solutions</p>
            <p className="text-lg mb-10 text-gray-100 max-w-2xl mx-auto drop-shadow-md">{service.detailDescription}</p>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">デジタル変革を推進</h2>
              <p className="text-lg text-gray-300 mb-6">
                現代のビジネス環境において、ITは単なるツールではなく、競争優位性を生み出す戦略的資産です。
                私たちは最新の技術トレンドを常に把握し、お客様のビジネス目標に最適なソリューションを提供します。
              </p>
              <p className="text-lg text-gray-300 mb-8">
                クラウドファースト、モバイルファースト、セキュリティファーストの考え方で、
                スケーラブルで安全なシステムを構築します。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="h-6 w-6 text-black">
                        <AppWindow className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2">Web制作</h3>
                  <p className="text-gray-300 text-sm">最新技術を駆使した魅力的なWebサイトの制作</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="h-6 w-6 text-black">
                      {(() => {
                        const IconComponent = getIcon("Code")
                        return <IconComponent className="h-6 w-6" />
                      })()}
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2">LINEツール制作</h3>
                  <p className="text-gray-300 text-sm">効率的なLINEツールの設計と開発</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="h-6 w-6 text-black">
                      {(() => {
                        const IconComponent = getIcon("Code")
                        return <IconComponent className="h-6 w-6" />
                      })()}
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2">アプリ開発</h3>
                  <p className="text-gray-300 text-sm">Web・モバイルアプリケーション開発</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="h-6 w-6 text-black">
                      {(() => {
                        const IconComponent = getIcon("Building2")
                        return <IconComponent className="h-6 w-6" />
                      })()}
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2">システム統合</h3>
                  <p className="text-gray-300 text-sm">既存システムとの連携・統合</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">関連実績</h2>

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
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">ITプロジェクトを始めませんか？</h2>
          <p className="text-xl mb-8">お客様のデジタル変革をサポートします</p>
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
