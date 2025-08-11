import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { news } from "@/lib/data"

export default function NewsPage() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "お知らせ":
        return "bg-blue-600"
      case "事業":
        return "bg-green-600"
      case "採用":
        return "bg-purple-600"
      case "イベント":
        return "bg-orange-600"
      case "受賞":
        return "bg-yellow-600"
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
            src="/placeholder.svg?height=800&width=1600"
            alt="News Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">お知らせ</h1>
            <p className="text-xl lg:text-2xl mb-8 text-[#D4AF37] drop-shadow-md">News & Updates</p>
            <p className="text-lg mb-10 text-gray-100 max-w-2xl mx-auto drop-shadow-md">
              株式会社A-Keyの最新情報をお届けします。 事業に関するお知らせやイベント情報をご確認ください。
            </p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {news.news.map((newsItem) => (
                <Card
                  key={newsItem.id}
                  className="hover:shadow-lg hover:shadow-[#D4AF37]/10 transition-all duration-300 bg-gray-800/50 backdrop-blur-sm border-gray-700"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {newsItem.date}
                        </div>
                        <Badge className={`${getCategoryColor(newsItem.category)} text-white`}>
                          {newsItem.category}
                        </Badge>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-white mb-2 text-lg hover:text-[#D4AF37] transition-colors">
                          <Link href={`/news/${newsItem.slug}`}>{newsItem.title}</Link>
                        </h3>
                        <p className="text-gray-300 text-sm line-clamp-2">{newsItem.excerpt}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-[#D4AF37] hover:text-white hover:bg-[#D4AF37]"
                        >
                          <Link href={`/news/${newsItem.slug}`}>
                            詳細
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <Button variant="outline" className="border-gray-600 text-gray-400 bg-transparent" disabled>
                  前へ
                </Button>
                <Button className="bg-[#D4AF37] text-black hover:bg-[#B8941F]">1</Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                  2
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                  3
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                  次へ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">最新情報をお届け</h2>
          <p className="text-xl mb-8">メールマガジンで最新のお知らせを受け取りませんか？</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="メールアドレスを入力"
              className="flex-1 px-4 py-2 rounded-lg border-0 text-gray-900"
            />
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-6">登録する</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
