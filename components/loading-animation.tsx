"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import * as THREE from "three"

// Animation phases with correct key orientation
enum AnimationPhase {
  APPEAR = "appear",
  POINT_TIP = "point_tip",
  INSERT = "insert",
  TURN = "turn",
  DISSOLVE = "dissolve",
  COMPLETE = "complete",
}

// Smooth easing function
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

// Enhanced Key Component with dissolve effect
function AnimatedKey({ onComplete, isLoading }: { onComplete: () => void; isLoading: boolean }) {
  const keyRef = useRef<THREE.Group>(null)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const startTimeRef = useRef<number>(0)
  const [hasCompleted, setHasCompleted] = useState(false)

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load(
      "/images/key.png",
      (loadedTexture) => {
        console.log("Key texture loaded successfully")
        setTexture(loadedTexture)
      },
      (progress) => {
        console.log("Loading progress:", progress)
      },
      (error) => {
        console.error("Failed to load key texture:", error)
        // フォールバック：シンプルな鍵の形状を作成
        const canvas = document.createElement("canvas")
        canvas.width = 256
        canvas.height = 512
        const ctx = canvas.getContext("2d")
        if (ctx) {
          // 金色の鍵を描画
          ctx.fillStyle = "#D4AF37"
          // 鍵の頭部（円形）
          ctx.beginPath()
          ctx.arc(128, 100, 60, 0, Math.PI * 2)
          ctx.fill()
          // 鍵の軸部分
          ctx.fillRect(108, 160, 40, 200)
          // 鍵の歯部分
          ctx.fillRect(148, 300, 30, 20)
          ctx.fillRect(148, 340, 25, 20)

          const fallbackTexture = new THREE.CanvasTexture(canvas)
          setTexture(fallbackTexture)
        }
      },
    )
    startTimeRef.current = Date.now()
  }, [])

  useFrame((state) => {
    if (!keyRef.current || !isLoading) return

    const elapsed = (Date.now() - startTimeRef.current) / 1000

    // Define phase timings
    const phases = {
      appear: { start: 0, end: 1.5 },
      pointTip: { start: 1.2, end: 2.8 },
      insert: { start: 2.5, end: 4.0 },
      turn: { start: 3.8, end: 5.2 },
      dissolve: { start: 5.0, end: 6.5 },
      complete: 6.2,
    }

    // Phase 1: Appear (0-1.5s) - 鍵が出現
    if (elapsed <= phases.appear.end) {
      const progress = Math.min(elapsed / phases.appear.end, 1)
      const easedProgress = easeOutQuart(progress)

      keyRef.current.position.z = THREE.MathUtils.lerp(8, 3, easedProgress)
      keyRef.current.position.y = THREE.MathUtils.lerp(2, 0, easedProgress)
      keyRef.current.position.x = 0
      keyRef.current.rotation.x = 0
      keyRef.current.rotation.y = 0
      keyRef.current.rotation.z = Math.sin(elapsed * 2) * 0.1 * (1 - easedProgress)
      keyRef.current.scale.setScalar(THREE.MathUtils.lerp(0.3, 1, easedProgress))
    }

    // Phase 2: Point tip toward screen depth (1.2-2.8s)
    if (elapsed >= phases.pointTip.start && elapsed <= phases.pointTip.end) {
      const progress = (elapsed - phases.pointTip.start) / (phases.pointTip.end - phases.pointTip.start)
      const easedProgress = easeInOutCubic(progress)

      keyRef.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 3, easedProgress)
      keyRef.current.position.z = 3
      keyRef.current.position.y = 0

      const tiltOffset = Math.sin(easedProgress * Math.PI) * 0.5
      keyRef.current.position.y -= tiltOffset
    }

    // Phase 3: Insert into depth (2.5-4.0s)
    if (elapsed >= phases.insert.start && elapsed <= phases.insert.end) {
      const progress = (elapsed - phases.insert.start) / (phases.insert.end - phases.insert.start)
      const easedProgress = easeInOutCubic(progress)

      keyRef.current.rotation.x = Math.PI / 3
      keyRef.current.position.z = THREE.MathUtils.lerp(3, -0.5, easedProgress)
      keyRef.current.position.y = THREE.MathUtils.lerp(keyRef.current.position.y, -1, easedProgress)

      if (progress > 0.6) {
        const resistance = (1 - progress) * 0.5
        keyRef.current.position.z += Math.sin(elapsed * 20) * 0.02 * resistance
        keyRef.current.rotation.x += Math.sin(elapsed * 25) * 0.03 * resistance
      }
    }

    // Phase 4: Turn/Twist (3.8-5.2s)
    if (elapsed >= phases.turn.start && elapsed <= phases.turn.end) {
      const progress = (elapsed - phases.turn.start) / (phases.turn.end - phases.turn.start)
      const easedProgress = easeInOutCubic(progress)

      keyRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI / 2, easedProgress)
      keyRef.current.rotation.x = Math.PI / 3
      keyRef.current.position.z = -0.5
      keyRef.current.position.y = -1

      if (progress > 0 && progress < 1) {
        const resistance = Math.sin(progress * Math.PI) * 0.3
        keyRef.current.position.z += Math.sin(elapsed * 30) * 0.015 * resistance
        keyRef.current.rotation.y += Math.sin(elapsed * 35) * 0.05 * resistance
      }
    }

    // Phase 5: Dissolve (5.0-6.5s) - 鍵がパーティクルに散らばる
    if (elapsed >= phases.dissolve.start && elapsed <= phases.dissolve.end) {
      const progress = (elapsed - phases.dissolve.start) / (phases.dissolve.end - phases.dissolve.start)
      const easedProgress = easeOutQuart(progress)

      keyRef.current.rotation.y = Math.PI / 2
      keyRef.current.rotation.x = Math.PI / 3
      keyRef.current.position.y = -1 + easedProgress * 2
      keyRef.current.position.z = -0.5

      keyRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 0.3, easedProgress))
      keyRef.current.rotation.z = easedProgress * Math.PI * 2
    }

    // 完了後は非表示
    if (elapsed > phases.dissolve.end) {
      keyRef.current.visible = false
    }

    // 完了トリガー
    if (elapsed >= phases.complete && !hasCompleted) {
      setHasCompleted(true)
      onComplete()
    }
  })

  // 現在のフェーズを取得
  const getCurrentPhase = (elapsed: number): AnimationPhase => {
    if (elapsed < 1.2) return AnimationPhase.APPEAR
    if (elapsed < 2.5) return AnimationPhase.POINT_TIP
    if (elapsed < 3.8) return AnimationPhase.INSERT
    if (elapsed < 5.0) return AnimationPhase.TURN
    if (elapsed < 6.2) return AnimationPhase.DISSOLVE
    return AnimationPhase.COMPLETE
  }

  const elapsed = (Date.now() - startTimeRef.current) / 1000
  const currentPhase = getCurrentPhase(elapsed)

  // 溶解フェーズでの透明度計算
  const dissolveProgress = currentPhase === AnimationPhase.DISSOLVE ? (elapsed - 5.0) / 1.5 : 0
  const keyOpacity = currentPhase === AnimationPhase.DISSOLVE ? Math.max(0, 1 - dissolveProgress) : 1

  // ローディング完了後は鍵を非表示
  if (!isLoading) {
    return null
  }

  return (
    <group ref={keyRef} position={[0, 0, 8]}>
      {/* Key mesh with dissolve effect */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[3, 6]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.1}
          opacity={keyOpacity}
          metalness={0.8}
          roughness={0.2}
          emissive="#D4AF37"
          emissiveIntensity={currentPhase === AnimationPhase.TURN ? 0.4 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Key depth effect (back side) */}
      <mesh position={[0, 0, -0.1]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[3, 6]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.1}
          opacity={keyOpacity * 0.8}
          metalness={0.9}
          roughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Particle effects - ローディング専用 */}
      <LoadingParticles phase={currentPhase} elapsed={elapsed} />
    </group>
  )
}

// Loading-specific particle system
function LoadingParticles({ phase, elapsed }: { phase: AnimationPhase; elapsed: number }) {
  const MAX_PARTICLES = 150
  const pointsRef = useRef<THREE.Points>(null)
  const particleDataRef = useRef<
    Array<{
      initialPos: THREE.Vector3
      velocity: THREE.Vector3
      life: number
    }>
  >([])

  // Initialize particle data once
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(MAX_PARTICLES * 3)
    const col = new Float32Array(MAX_PARTICLES * 3)

    // Initialize particle data
    particleDataRef.current = []
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particleDataRef.current.push({
        initialPos: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          -1 + (Math.random() - 0.5) * 1,
          -0.5 + (Math.random() - 0.5) * 0.5,
        ),
        velocity: new THREE.Vector3((Math.random() - 0.5) * 8, Math.random() * 4 + 2, (Math.random() - 0.5) * 6),
        life: Math.random() * 0.5 + 0.5,
      })
    }

    return { positions: pos, colors: col }
  }, [])

  // Update particles based on phase
  useFrame((state) => {
    if (!pointsRef.current) return

    const posArray = positions
    const time = state.clock.elapsedTime

    if (phase === AnimationPhase.DISSOLVE) {
      // Dissolve phase particles - explode outward from key position
      const currentCount = 150
      const dissolveTime = elapsed - 5.0 // Start of dissolve phase

      for (let i = 0; i < currentCount; i++) {
        const i3 = i * 3
        const particle = particleDataRef.current[i]
        const t = Math.min(dissolveTime / particle.life, 1)

        if (t > 0) {
          // Calculate position based on initial position + velocity * time
          posArray[i3] = particle.initialPos.x + particle.velocity.x * t
          posArray[i3 + 1] = particle.initialPos.y + particle.velocity.y * t - 0.5 * t * t // gravity effect
          posArray[i3 + 2] = particle.initialPos.z + particle.velocity.z * t

          // Fade out over time
          const alpha = Math.max(0, 1 - t)
          colors[i3] = 0.9 * alpha
          colors[i3 + 1] = 0.7 * alpha
          colors[i3 + 2] = 0.3 * alpha
        } else {
          // Hide particle
          posArray[i3] = 999
          posArray[i3 + 1] = 999
          posArray[i3 + 2] = 999
        }
      }

      pointsRef.current.geometry.setDrawRange(0, currentCount)
    } else {
      // 統一されたパーティクル動作 - フェーズに関係なく一定
      const currentCount = 60

      for (let i = 0; i < currentCount; i++) {
        const i3 = i * 3

        // 鍵の周りを回る統一された動作
        const radius = 2 + Math.sin(time * 0.5 + i) * 0.5
        const angle = time * 0.8 + i * 0.3
        const height = Math.sin(time * 0.6 + i) * 1.5

        posArray[i3] = Math.cos(angle) * radius
        posArray[i3 + 1] = -1 + height
        posArray[i3 + 2] = -0.5 + Math.sin(angle) * radius * 0.5

        // 統一された色
        colors[i3] = 0.8 + Math.sin(time * 0.5 + i) * 0.1
        colors[i3 + 1] = 0.6 + Math.cos(time * 0.4 + i) * 0.1
        colors[i3 + 2] = 0.3 + Math.sin(time * 0.3 + i) * 0.05
      }

      // Hide unused particles
      for (let i = currentCount; i < MAX_PARTICLES; i++) {
        const i3 = i * 3
        posArray[i3] = 999
        posArray[i3 + 1] = 999
        posArray[i3 + 2] = 999
      }

      pointsRef.current.geometry.setDrawRange(0, currentCount)
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.geometry.attributes.color.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={MAX_PARTICLES} />
        <bufferAttribute attach="attributes-color" array={colors} itemSize={3} count={MAX_PARTICLES} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </points>
  )
}

// Background floating particles that continue after loading
function ContinuousParticles({ isLoading }: { isLoading: boolean }) {
  const MAX_PARTICLES = 80
  const pointsRef = useRef<THREE.Points>(null)

  // Initialize particle positions and colors using useMemo
  const { positions, colors, initialPositions } = useMemo(() => {
    const pos = new Float32Array(MAX_PARTICLES * 3)
    const col = new Float32Array(MAX_PARTICLES * 3)
    const initPos = []

    // Set initial positions and colors
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const i3 = i * 3

      // Spread particles across the screen
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 15
      const z = (Math.random() - 0.5) * 10

      pos[i3] = x
      pos[i3 + 1] = y
      pos[i3 + 2] = z

      // Store initial positions for animation
      initPos.push({ x, y, z })

      // Golden particle colors
      col[i3] = 0.8 + Math.random() * 0.2 // R
      col[i3 + 1] = 0.6 + Math.random() * 0.3 // G
      col[i3 + 2] = 0.1 + Math.random() * 0.2 // B
    }

    return { positions: pos, colors: col, initialPositions: initPos }
  }, [])

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.elapsedTime
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array
    const colArray = pointsRef.current.geometry.attributes.color.array as Float32Array

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const i3 = i * 3
      const initPos = initialPositions[i]

      // Gentle floating motion
      posArray[i3] = initPos.x + Math.sin(time * 0.3 + i) * 2
      posArray[i3 + 1] = initPos.y + Math.cos(time * 0.2 + i) * 1.5
      posArray[i3 + 2] = initPos.z + Math.sin(time * 0.25 + i) * 1

      // Subtle color animation
      colArray[i3] = colors[i3] + Math.sin(time * 0.5 + i) * 0.1
      colArray[i3 + 1] = colors[i3 + 1] + Math.cos(time * 0.4 + i) * 0.1
      colArray[i3 + 2] = colors[i3 + 2] + Math.sin(time * 0.3 + i) * 0.05
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.geometry.attributes.color.needsUpdate = true
  })

  // デバッグ用ログ
  useEffect(() => {
    console.log("ContinuousParticles mounted, isLoading:", isLoading)
  }, [isLoading])

  // ローディング中は非表示、完了後に表示
  if (isLoading) {
    return null
  }

  console.log("ContinuousParticles rendering...")

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={MAX_PARTICLES} />
        <bufferAttribute attach="attributes-color" array={colors} itemSize={3} count={MAX_PARTICLES} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  )
}

// Main Loading Animation Component
export default function LoadingAnimation({ onComplete, isLoading }: { onComplete: () => void; isLoading: boolean }) {
  const [elapsed, setElapsed] = useState(0)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (isLoading) {
      startTimeRef.current = Date.now()

      const updateElapsed = () => {
        const newElapsed = (Date.now() - startTimeRef.current) / 1000
        setElapsed(newElapsed)

        if (newElapsed < 7 && isLoading) {
          requestAnimationFrame(updateElapsed)
        }
      }

      updateElapsed()
    }
  }, [isLoading])

  const handleKeyAnimationComplete = () => {
    onComplete()
  }

  // Calculate smooth progress
  const progress = Math.min((elapsed / 6.2) * 100, 100)

  // デバッグ用ログ
  useEffect(() => {
    console.log("LoadingAnimation isLoading:", isLoading)
  }, [isLoading])

  return (
    <div
      className={`fixed inset-0 ${isLoading ? "z-50" : "z-0"} ${isLoading ? "bg-gradient-to-br from-gray-900 via-black to-gray-800" : "bg-transparent pointer-events-none"} overflow-hidden`}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[0, 0, 5]} color="#D4AF37" intensity={0.8} />

        <Environment preset="studio" />

        {/* ローディング中の要素 */}
        {isLoading && (
          <>
            <AnimatedKey onComplete={handleKeyAnimationComplete} isLoading={isLoading} />
          </>
        )}

        {/* 継続的な背景パーティクル - ローディング完了後に表示 */}
        {!isLoading && <ContinuousParticles isLoading={isLoading} />}
      </Canvas>

      {/* Progress indicator - ローディング中のみ表示 */}
      {isLoading && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          {/* Progress bar */}
          <div className="w-64 bg-gray-800/50 rounded-full h-2 backdrop-blur-sm border border-gray-600/20">
            <div
              className="bg-gradient-to-r from-[#002A5C] via-[#D4AF37] to-[#002A5C] h-2 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-center text-xs text-gray-300 mt-2">{Math.round(progress)}%</p>
        </div>
      )}

      {/* Enhanced particle effect indicator during dissolve - ローディング中のみ */}
      {isLoading && elapsed >= 5.0 && elapsed <= 6.5 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-40 h-40 border border-[#D4AF37] rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: "1.5s",
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
