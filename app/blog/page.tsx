import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Badge } from "lucide-react"
import Link from "next/link"
import { company } from "@/lib/data"
import { getIcon } from "@/lib/icons"
import { client } from "@/lib/client"
import Image from "next/image"

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'ブログ',
  description: '株式会社A-Keyのブログページです、',
}
 
export default async function AboutPage() {
  const data = await client.get({
    endpoint: 'blogs',
  })

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section with Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/fv-blogs.png"
            alt="About Us Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              ブログ
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {data.contents.map((blog) => (
                <Card
                  key={blog.id}
                  className="hover:shadow-lg hover:shadow-[#D4AF37]/10 transition-all duration-300 bg-gray-800/50 backdrop-blur-sm border-gray-700"
                >
                  <CardContent className="p-6">
                    <div>
                      {blog.eyecatch && (
                        <Image
                          src={blog.eyecatch.url}
                          alt={blog.title}
                          width={500} // You can adjust the width and height as needed
                          height={200}
                          className="w-full h-48 object-cover mb-4 rounded"
                        />
                      )}
                      <div className="text-gray-400 text-sm">
                        <span className="mr-1">{new Date(blog.publishedAt).toISOString().slice(0, 10).replace(/-/g, '/')}</span>
                      </div>

                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-white mb-2">
                          {blog.title}
                        </h2>
                        <p className="text-gray-300 mb-4">{blog.description}</p>
                        <Link href={`/blog/${blog.id}`}>
                          <Button variant="link" className="text-[#D4AF37]">
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
