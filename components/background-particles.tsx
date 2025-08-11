"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import * as THREE from "three"

// Background floating particles component
function FloatingParticles() {
  const MAX_PARTICLES = 80
  const pointsRef = useRef<THREE.Points>(null)

  // Initialize particle positions and colors
  const positions = new Float32Array(MAX_PARTICLES * 3)
  const colors = new Float32Array(MAX_PARTICLES * 3)

  // Set initial positions and colors
  for (let i = 0; i < MAX_PARTICLES; i++) {
    const i3 = i * 3

    // Spread particles across the screen
    positions[i3] = (Math.random() - 0.5) * 20 // X
    positions[i3 + 1] = (Math.random() - 0.5) * 15 // Y
    positions[i3 + 2] = (Math.random() - 0.5) * 10 // Z

    // Golden particle colors - より明るく
    colors[i3] = 0.9 + Math.random() * 0.1 // R
    colors[i3 + 1] = 0.8 + Math.random() * 0.2 // G
    colors[i3 + 2] = 0.3 + Math.random() * 0.2 // B
  }

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.elapsedTime
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array
    const colArray = pointsRef.current.geometry.attributes.color.array as Float32Array

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const i3 = i * 3

      // Gentle floating motion
      posArray[i3] = positions[i3] + Math.sin(time * 0.3 + i) * 2
      posArray[i3 + 1] = positions[i3 + 1] + Math.cos(time * 0.2 + i) * 1.5
      posArray[i3 + 2] = positions[i3 + 2] + Math.sin(time * 0.25 + i) * 1

      // Subtle color animation
      colArray[i3] = colors[i3] + Math.sin(time * 0.5 + i) * 0.1
      colArray[i3 + 1] = colors[i3 + 1] + Math.cos(time * 0.4 + i) * 0.1
      colArray[i3 + 2] = colors[i3 + 2] + Math.sin(time * 0.3 + i) * 0.05
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

// Main background particles component
export default function BackgroundParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} color="#D4AF37" intensity={0.5} />
        <Environment preset="studio" />
        <FloatingParticles />
      </Canvas>
    </div>
  )
}
