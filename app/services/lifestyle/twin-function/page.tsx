import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { company } from "@/lib/data"
import { getIcon } from "@/lib/icons"
import Image from "next/image"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Twin function - 乾電池で動くWi-Fi搭載バッテリー',
  description: 'Twin functionは世界初の超小型スマホ充電器です。携帯に差し込めば、充電からWi-Fiまでやってくれる次世代のモバイルバッテリーです。',
}

const features = [
  {
    iconPath: '/images/icon-wifi.png',
    title: 'Wi-Fi搭載',
    description: 'フリーWi-Fiではないので、外での仕事もスマホでの振込も安全',
  },
  {
    iconPath: '/images/icon-battery.png',
    title: '乾電池式バッテリー',
    description: 'コンビニで調達できるので、災害時などいざというときにも使用可能',
  },
  {
    iconPath: '/images/icon-cable.png',
    title: 'Type-C, Lightning対応',
    description: 'iPhoneもAndroidもこれ一つで充電可能',
  },
  {
    iconPath: '/images/icon-cable-2.png',
    title: 'ケーブル不要',
    description: 'ケーブルを忘れて使用できないということもなく、Type-Cやlightning端子など迷う必要もなし',
  },
  {
    iconPath: '/images/icon-wing.png',
    title: '軽量かつコンパクト',
    description: 'ポケットや小さいバッグに入れて持ち運びが簡単',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen text-white">
      <section>
        <div className="container mx-auto">
          <div>
            <img
              src="/images/fv-twin-function.jpg"
              alt="Twin function"
            />
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="items-center">
            <div>
              <Image src="/images/TF-logo.png" alt="ツインファンクション" width={500} height={126} className="mb-4 mx-auto" />
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">充電忘れも怖くない！乾電池で動くWi-Fi搭載バッテリーで日常も災害時も安心を。</h1>
              <p className="text-gray-300 mb-4">
                Twin functionは世界初の超小型スマホ充電器です。携帯に差し込めば、充電からWi-Fiまでやってくれる次世代のモバイルバッテリーです。
              </p>
              <p className="text-gray-300">
                今や生活必需品のモバイルバッテリーとポケットWi-Fiを一つにし、「いざというときに」、「今少しだけ必要」という状況を想定し、日常使いはもちろん災害時も視野に入れた製品です。
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-center">モバイルバッテリーに関する様々なトラブル</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img src="/images/TF-trouble-1.jpg" alt="モバイルバッテリーが大きく重い" className="mx-auto mb-4" />
            </div>
            <div className="text-center">
              <img src="/images/TF-trouble-2.jpg" alt="ポケットWI-Fiとモバイルバッテリーを持ち運ぶとかさばる" className="mx-auto mb-4" />
            </div>
            <div className="text-center">
              <img src="/images/TF-trouble-3.jpg" alt="通信制限がかかってしまい、いざという時に連絡が取れない" className="mx-auto mb-4" />
            </div>
          </div>
        </div>
      </section>
      <div className="relative container mx-auto px-4 h-32">
        <div className="absolute inset-0">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon fill="#D4AF37" points="0,0 100,0 50,100" />
          </svg>
        </div>
      </div>
      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">これすべて解決します</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                    <img src={feature.iconPath} alt={feature.title} className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
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
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">応援購入サービスMakuakeより9/22スタート！</h2>
          <p className="text-xl mb-8">応援購入をぜひよろしくお願いします</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
              <Link href="https://www.makuake.com/project/twin-function" target="_blank">プロジェクト詳細はこちら</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
