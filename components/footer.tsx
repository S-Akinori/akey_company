import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import { company } from "@/lib/data"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 p-2">
              <Image src={"/images/logo.png"} alt="A-Key Logo" width={80} height={80} className="bg-neutral-50" />
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              {company.description}
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{company.info.address.postal}</span><br />                
                <span>{company.info.address.street}</span><br />                
                <span>{company.info.address.building}</span><br />                
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{company.info.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{company.info.email}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">事業内容</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <Link href="/services/it" className="hover:text-[#D4AF37] transition-colors">
                  ITソリューション事業
                </Link>
              </li>
              <li>
                <Link href="/services/education" className="hover:text-[#D4AF37] transition-colors">
                  教育事業
                </Link>
              </li>
              <li>
                <Link href="/services/lifestyle" className="hover:text-[#D4AF37] transition-colors">
                  ライフスタイル事業
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">サイトマップ</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <Link href="/about" className="hover:text-[#D4AF37] transition-colors">
                  私たちについて
                </Link>
              </li>
              <li>
                <Link href="/works" className="hover:text-[#D4AF37] transition-colors">
                  実績・事例
                </Link>
              </li>
              {/* <li>
                <Link href="/news" className="hover:text-[#D4AF37] transition-colors">
                  お知らせ
                </Link>
              </li> */}
              <li>
                <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">© 2024 株式会社A-Key. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/sitemap" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors">
              サイトマップ
            </Link>
          </div>
        </div> */}
      </div>
    </footer>
  )
}
