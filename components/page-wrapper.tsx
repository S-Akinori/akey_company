"use client"

import type React from "react"
import { useState } from "react"
import LoadingAnimation from "./loading-animation"
import BackgroundParticles from "./background-particles"

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    // 鍵が散らばった後、コンテンツをフェードイン
    setTimeout(() => {
      setShowContent(true)
    }, 500)
  }

  return (
    <>
      {/* ローディングアニメーション - Canvas要素は常に表示 */}
      <LoadingAnimation onComplete={handleLoadingComplete} isLoading={isLoading} />

      {/* 背景パーティクル - ローディング完了後に表示 */}
      {!isLoading && <BackgroundParticles />}

      <div
        className={`transition-all duration-1500 ease-out ${
          showContent ? "opacity-100 transform scale-100" : "opacity-0 transform scale-105"
        }`}
        style={{ display: isLoading ? "none" : "block" }}
      >
        {children}
      </div>
    </>
  )
}
