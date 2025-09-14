import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar } from "lucide-react"
import Link from "next/link"
import { works } from "@/lib/data"
import { getIcon } from "@/lib/icons"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: '実績・事例',
  description: 'これまでに手がけたプロジェクトの一部をご紹介します。お客様の課題解決に向けた取り組みと成果をご覧ください。',
}


export default function WorksPage() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ITソリューション":
        return getIcon("Building2")
      case "教育":
        return getIcon("GraduationCap")
      case "ライフスタイル":
        return getIcon("Heart")
      default:
        return getIcon("Building2")
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ITソリューション":
        return "bg-blue-600"
      case "教育":
        return "bg-green-600"
      case "ライフスタイル":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section with Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/fv-works.png"
            alt="Works Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">実績・事例</h1>
            <p className="text-xl lg:text-2xl mb-8 text-[#D4AF37] drop-shadow-md">Our Works</p>
            <p className="text-lg mb-10 text-gray-100 max-w-2xl mx-auto drop-shadow-md">
              これまでに手がけたプロジェクトの一部をご紹介します。
              お客様の課題解決に向けた取り組みと成果をご覧ください。
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#D4AF37] text-black hover:bg-[#B8941F]">すべて</Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                ITソリューション
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                教育
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                ライフスタイル
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {works.projects.map((project) => {
              const IconComponent = getCategoryIcon(project.category)
              return (
                <Card
                  key={project.id}
                  className="group hover:shadow-xl hover:shadow-[#D4AF37]/20 transition-all duration-300 border-gray-700 shadow-lg bg-gray-800/50 backdrop-blur-sm overflow-hidden"
                >
                  <div className="aspect-video bg-gray-700 relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getCategoryColor(project.category)} text-white flex items-center gap-1`}>
                        <IconComponent className="h-4 w-4" />
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-gray-400 text-sm mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.period}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                    {/* <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[#D4AF37] mb-2">使用技術</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-[#D4AF37] mb-2">成果</h4>
                      <ul className="space-y-1">
                        {project.results.map((result, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-center">
                            <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2"></div>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div> */}

                    {project.url && (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
                      >
                        <Link href={project.url} target="_blank">
                          ページを見る
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">実績数値</h2>
            <p className="text-lg text-gray-300">これまでの成果</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {works.stats.map((stat, index) => (
              <Card key={index} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-[#D4AF37] mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">あなたのプロジェクトを始めませんか？</h2>
          <p className="text-xl mb-8">お客様の課題解決をサポートします</p>
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
              <Link href="/services">サービス一覧</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
