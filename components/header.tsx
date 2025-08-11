"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  // ナビゲーション配列から採用情報を削除
  const navigation = [
    { name: "私たちについて", href: "/about" },
    { name: "事業内容", href: "/services" },
    { name: "実績・事例", href: "/works" },
    // { name: "お知らせ", href: "/news" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 p-2">
            <Image src={"/images/logo.png"} alt="A-Key Logo" width={80} height={80} className="bg-neutral-50" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-[#D4AF37] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              asChild
              variant="outline"
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
            >
              <Link href="/contact">お問い合わせ</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gray-900 border-gray-700">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="flex items-center space-x-2 mb-8">
                  <div className="w-8 h-8 bg-[#002A5C] rounded flex items-center justify-center">
                    <span className="text-[#D4AF37] font-bold text-sm">A</span>
                  </div>
                  <span className="font-bold text-xl text-[#002A5C]">A-Key</span>
                </Link>

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-gray-300 hover:text-[#D4AF37] transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="pt-4 border-t">
                  <Button asChild className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      お問い合わせ
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
