"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { company, faq } from "@/lib/data"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch("/api/contact-handler", {
      method: "POST",
      body: JSON.stringify(formData)
    })
    alert("お問い合わせありがとうございます。メールで確認メールをお送りしました。")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section with Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* <img
            src="/placeholder.svg?height=800&width=1600"
            alt="Contact Background"
            className="w-full h-full object-cover"
          /> */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              お問い合わせ
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-[#D4AF37] drop-shadow-md">Contact Us</p>
            <p className="text-lg mb-10 text-gray-100 max-w-2xl mx-auto drop-shadow-md">
              ご質問やご相談がございましたら、お気軽にお問い合わせください。 専門スタッフが丁寧にサポートいたします。
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div>
            {/* Contact Form */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">お問い合わせフォーム</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">
                        お名前 *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">
                        メールアドレス *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company" className="text-gray-300">
                        会社名
                      </Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-300">
                        電話番号
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-gray-300">
                      お問い合わせ内容
                    </Label>
                    <Select onValueChange={(value) => handleChange("service", value)}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ITソリューション事業について">ITソリューション事業について</SelectItem>
                        <SelectItem value="教育事業について">教育事業について</SelectItem>
                        <SelectItem value="ライフスタイル事業について">ライフスタイル事業について</SelectItem>
                        <SelectItem value="その他">その他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-300">
                      メッセージ *
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="お問い合わせ内容を詳しくお聞かせください"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold"
                  >
                    送信する
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            {/* <div className="space-y-8">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-6">お問い合わせ先</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-[#D4AF37] mt-1" />
                      <div>
                        <p className="text-gray-300">
                          {company.info.address.postal}
                          <br />
                          {company.info.address.street}
                          <br />
                          {company.info.address.building}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-[#D4AF37]" />
                      <p className="text-gray-300">{company.info.phone}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-[#D4AF37]" />
                      <p className="text-gray-300">{company.info.email}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-[#D4AF37] mt-1" />
                      <div>
                        <p className="text-gray-300">営業時間：{company.info.businessHours}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-4">よくあるご質問</h3>
                  <div className="space-y-4">
                    {faq.faq.slice(0, 3).map((item, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-[#D4AF37] mb-2">Q. {item.question}</h4>
                        <p className="text-gray-300 text-sm">A. {item.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">アクセス</h2>
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-8">
              <div className="bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">地図が表示されます</p>
              </div>
              <div className="mt-6 text-center">
                {company.access.nearestStations.map((station, index) => (
                  <p key={index} className="text-gray-300">
                    {station}
                    {index < company.access.nearestStations.length - 1 && <br />}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section> */}
    </div>
  )
}
