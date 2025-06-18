"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useEffect, useState, useMemo } from 'react';
import { TextureLoader } from 'three';

// === NOTE ===
// This component requires three image files in your `/public` folder:
// - /logo.png (The keyhole shape)
// - /key.png (The key shape)
// - /circle.png (A white circle texture for the particles)
// A simple white circle on a transparent background works best for 'circle.png'.

// === Customization Parameters ===
const CONFIG = {
  logoScale: 1.5,
  keyScale: 1, // 任意の値に調整
  particleScale: 1,
  fadeInDuration: 30, // in frames
  insertSpeed: { x: 1.0, z: 2.0 },
  explosionPower: 10.0,
  explosionBurstDuration: 90, // How long the initial burst lasts (in frames)
  explosionDamping: 0.98, // How quickly particles slow down (0.9 to 1.0)
  particleSize: { normal: 1.5, expanded: 1.0 },
  initialFloatingAmplitude: 0.1,
  postExplosionFloatingAmplitude: 0.5, // How much particles float after explosion
};

/**
 * Custom hook to create BufferGeometry from an image's pixels.
 * @param {string} imageUrl - Path to the image file (e.g., '/logo.png').
 * @param {number} width - The width to sample the image.
 * @param {number} height - The height to sample the image.
 * @returns {THREE.BufferGeometry | undefined}
 */
function useParticleGeometry(imageUrl: string, width = 256, height = 256, scale = 1.5) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry>();

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(imageUrl, (texture) => {
      const img = texture.image as HTMLImageElement;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height);
      if (!imgData) return;

      const positions = [];
      const colors = [];
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const a = imgData.data[i + 3];
          if (a > 128) {
            const r = imgData.data[i] / 255;
            const g = imgData.data[i + 1] / 255;
            const b = imgData.data[i + 2] / 255;
            positions.push(
              (x - width / 2) * scale,
              -(y - height / 2) * scale,
              0
            );
            colors.push(r, g, b);
          }
        }
      }

      const bufferGeometry = new THREE.BufferGeometry();
      bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      setGeometry(bufferGeometry);
    });
  }, [imageUrl, width, height, scale]);

  return geometry;
}

/**
 * A plane that flashes white once.
 */
function FlashPlane({ flash, onFlashComplete }: { flash: boolean; onFlashComplete: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const hasFlashed = useRef(false);

  useFrame(() => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.MeshBasicMaterial;

    // Trigger the flash
    if (flash && !hasFlashed.current) {
      material.opacity = 1;
      hasFlashed.current = true;
    }

    // Fade out the flash
    if (material.opacity > 0) {
      material.opacity -= 0.05; // Fade out speed
    } else if (hasFlashed.current) {
      onFlashComplete();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 1]}>
      <planeGeometry args={[10000, 10000]} />
      <meshBasicMaterial color={'white'} transparent opacity={0} />
    </mesh>
  );
}

/**
 * Main component for the Key and Logo animation.
 */
function KeyAndLogo({ onFinished }: { onFinished: () => void }) {
  const logoRef = useRef<THREE.Points>(null);
  const keyRef = useRef<THREE.Points>(null);
  const logoMaterialRef = useRef<THREE.PointsMaterial>(null);
  const keyMaterialRef = useRef<THREE.PointsMaterial>(null);

  // Memoize texture loading for performance. Prevents reloading on every render.
  const circleTexture = useMemo(() => new THREE.TextureLoader().load('/circle.png'), []);

  const logoGeo = useParticleGeometry('/logo.png', 256, 256, CONFIG.logoScale);
  const keyGeo = useParticleGeometry('/key.png', 256, 256, CONFIG.keyScale);


  // Refs to manage animation state
  const inserted = useRef(false);
  const rotating = useRef(false);
  const exploded = useRef(false);
  const triggerFlash = useRef(false);

  // Refs for particle physics data
  const velocities = useRef<THREE.Vector3[]>([]);
  const originalPositions = useRef<Float32Array>();
  const floatingPhase = useRef<number[]>([]);
  const floatingAmp = useRef<THREE.Vector3[]>([]);
  const postExplosionAnchors = useRef<Float32Array>();

  const keyVelocities = useRef<THREE.Vector3[]>([]);
  const keyOriginalPositions = useRef<Float32Array>();
  const keyFloatingPhase = useRef<number[]>([]);
  const keyFloatingAmp = useRef<THREE.Vector3[]>([]);
  const keyPostExplosionAnchors = useRef<Float32Array>();

  // Refs for timing and progress
  const timeRef = useRef(0);
  const fadeInProgressLogo = useRef(0);
  const fadeInProgressKey = useRef(0);
  const explosionFrameCount = useRef(0);
  const rotateStartTime = useRef(0); // 鍵の回転アニメーションの開始時刻を記録

  const animationFinished = useRef(false);

  const [switchToNewImage, setSwitchToNewImage] = useState(false);
  const newGeo = useParticleGeometry('/logo.png', 256, 256, CONFIG.logoScale);



  useEffect(() => {
    // Initialize data for logo particles
    if (logoGeo && !originalPositions.current) {
      const posAttr = logoGeo.getAttribute('position') as THREE.BufferAttribute;
      originalPositions.current = posAttr.array.slice() as Float32Array;
      velocities.current = Array.from({ length: posAttr.count }, () => new THREE.Vector3());
      floatingPhase.current = Array.from({ length: posAttr.count }, () => Math.random() * Math.PI * 2);
      // --- UPDATE ---
      // Amplitude is now dynamically set based on animation state
      floatingAmp.current = Array.from({ length: posAttr.count }, () => new THREE.Vector3());
    }

    // Initialize data for key particles
    if (keyGeo && !keyOriginalPositions.current) {
      const posAttr = keyGeo.getAttribute('position') as THREE.BufferAttribute;
      keyOriginalPositions.current = posAttr.array.slice() as Float32Array;
      keyVelocities.current = Array.from({ length: posAttr.count }, () => new THREE.Vector3());
      keyFloatingPhase.current = Array.from({ length: posAttr.count }, () => Math.random() * Math.PI * 2);
      keyFloatingAmp.current = Array.from({ length: posAttr.count }, () => new THREE.Vector3());
    }
  }, [logoGeo, keyGeo]);

  

  /**
   * Animation function to update particle positions each frame.
   * This function handles initial floating, the explosion burst, and post-explosion floating.
   */
  const updateParticles = (
    points: THREE.Points,
    vels: THREE.Vector3[],
    original: Float32Array,
    phase: number[],
    amp: THREE.Vector3[],
    time: number,
    postExplosionAnchorArray?: Float32Array
  ) => {
    const posAttr = points.geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < posAttr.count; i++) {
      // --- IMPROVEMENT ---
      // This logic now handles three states: initial float, burst, and post-explosion float.
      if (exploded.current) {
        if (postExplosionAnchorArray) {
          // POST-EXPLOSION SMOOTH TRANSITION: blend current position toward anchor position
          const currentX = posAttr.getX(i);
          const currentY = posAttr.getY(i);
          const currentZ = posAttr.getZ(i);

          const targetX = postExplosionAnchorArray[i * 3];
          const targetY = postExplosionAnchorArray[i * 3 + 1];
          const targetZ = postExplosionAnchorArray[i * 3 + 2];

          // なめらかに現在位置をターゲットに寄せる（イージング）
          const blendedX = THREE.MathUtils.lerp(currentX, targetX, 0.05);
          const blendedY = THREE.MathUtils.lerp(currentY, targetY, 0.05);
          const blendedZ = THREE.MathUtils.lerp(currentZ, targetZ, 0.05);

          const dx = amp[i].x * Math.sin(time + phase[i]);
          const dy = amp[i].y * Math.sin(time + phase[i]);
          const dz = amp[i].z * Math.sin(time + phase[i]);

          posAttr.setXYZ(i, blendedX + dx, blendedY + dy, blendedZ + dz);
        } else {
          // EXPLOSION BURST
          const velocity = vels[i];
          posAttr.setXYZ(
            i,
            posAttr.getX(i) + velocity.x,
            posAttr.getY(i) + velocity.y,
            posAttr.getZ(i) + velocity.z,
          );
          velocity.multiplyScalar(CONFIG.explosionDamping);
        }
      }
      else {
        // INITIAL FLOATING
        const ox = original[i * 3];
        const oy = original[i * 3 + 1];
        const oz = original[i * 3 + 2];
        const dx = amp[i].x * Math.sin(time + phase[i]);
        const dy = amp[i].y * Math.sin(time + phase[i]);
        const dz = amp[i].z * Math.sin(time + phase[i]);
        posAttr.setXYZ(i, ox + dx, oy + dy, oz + dz);
      }
    }
    posAttr.needsUpdate = true;
  };

  // 1. 鍵の回転 → カチッと止まる アニメーション部分の実装
  // 該当箇所の useFrame 内を差し替え

  useFrame(() => {
    const key = keyRef.current;
    const logo = logoRef.current;
    if (!key || !logo || !logoGeo || !keyGeo || !originalPositions.current || !keyOriginalPositions.current) return;

    timeRef.current += 0.02;
    const t = timeRef.current;

    // --- フェードイン処理（変更なし） ---
    if (fadeInProgressLogo.current < 1) {
      fadeInProgressLogo.current += 1 / CONFIG.fadeInDuration;
      if (logoMaterialRef.current) logoMaterialRef.current.opacity = Math.min(fadeInProgressLogo.current, 1);
      return;
    }
    if (fadeInProgressKey.current < 1) {
      fadeInProgressKey.current += 1 / CONFIG.fadeInDuration;
      if (keyMaterialRef.current) keyMaterialRef.current.opacity = Math.min(fadeInProgressKey.current, 1);
      return;
    }

    // 初期の浮遊
    if (!exploded.current && floatingAmp.current[0].lengthSq() === 0) {
      floatingAmp.current.forEach(v => v.set(
        (Math.random() - 0.5) * CONFIG.initialFloatingAmplitude,
        (Math.random() - 0.5) * CONFIG.initialFloatingAmplitude,
        (Math.random() - 0.5) * CONFIG.initialFloatingAmplitude,
      ));
      keyFloatingAmp.current.forEach(v => v.set(
        (Math.random() - 0.5) * CONFIG.initialFloatingAmplitude,
        (Math.random() - 0.5) * CONFIG.initialFloatingAmplitude,
        (Math.random() - 0.5) * CONFIG.initialFloatingAmplitude,
      ));
    }

    // 3. Insert Key - 表面向き → 奥向きへ回転＋移動
    if (!inserted.current && (key.position.z > 0.5 || key.position.x > 0.5)) {
      // 回転（表面 → 奥へ）
      key.rotation.set(
        THREE.MathUtils.lerp(key.rotation.x, Math.PI / 2, 0.1), // 表面（正面）→水平
        THREE.MathUtils.lerp(key.rotation.y, 0, 0.1),
        THREE.MathUtils.lerp(key.rotation.z, 0, 0.1)
      );
      // シュッと移動
      key.position.z *= 0.85;
      key.position.x *= 0.85;
    } else if (!inserted.current) {
      key.position.z = 0;
      key.position.x = 0;
      key.rotation.set(Math.PI / 2, 0, 0); // 最終姿勢は真横（奥向き）
      inserted.current = true;
      rotating.current = true;
      rotateStartTime.current = t;
    }

    // 4. 鍵の回転 → カチッと止まる
    if (rotating.current) {
      const elapsed = t - rotateStartTime.current;

      if (elapsed < 1.0) {
        // 最初の1秒で一気に回転
        key.rotation.y += 0.05;

        if (key.rotation.y > Math.PI / 2 + 0.3) {
          key.rotation.y = Math.PI / 2 + 0.3;
        }
      } else {
        // カチッと止まる（やや戻る）
        key.rotation.y = THREE.MathUtils.lerp(key.rotation.y, Math.PI / 2, 0.1);

        if (Math.abs(key.rotation.y - Math.PI / 2) < 0.01) {
          key.rotation.y = Math.PI / 2;
          rotating.current = false;
          exploded.current = true;
          triggerFlash.current = true;
          explosionFrameCount.current = CONFIG.explosionBurstDuration;
          // 爆発処理へ（残りは元のコードを使用）
          // ※ velocity 初期化などもここで行う
          if (logoMaterialRef.current) logoMaterialRef.current.size = CONFIG.particleSize.expanded;
          if (keyMaterialRef.current) keyMaterialRef.current.size = CONFIG.particleSize.expanded;

          velocities.current.forEach(v => v.set(
            (Math.random() - 0.5) * CONFIG.explosionPower,
            (Math.random() - 0.5) * CONFIG.explosionPower,
            (Math.random() - 0.5) * CONFIG.explosionPower
          ));
          keyVelocities.current.forEach(v => v.set(
            (Math.random() - 0.5) * CONFIG.explosionPower,
            (Math.random() - 0.5) * CONFIG.explosionPower,
            (Math.random() - 0.5) * CONFIG.explosionPower
          ));
        }
      }
    }

    // 5. Manage explosion state transition
    if (exploded.current && explosionFrameCount.current > 0) {
      explosionFrameCount.current--;
      // When the burst is over, capture the particle positions to use as new float anchors
      if (explosionFrameCount.current === 0) {
        postExplosionAnchors.current = (logo.geometry.getAttribute('position') as THREE.BufferAttribute).array.slice() as Float32Array;
        keyPostExplosionAnchors.current = (key.geometry.getAttribute('position') as THREE.BufferAttribute).array.slice() as Float32Array;

        // Reset floating amplitudes for the post-explosion phase
        floatingAmp.current.forEach(v => v.set(
          (Math.random() - 0.5) * CONFIG.postExplosionFloatingAmplitude,
          (Math.random() - 0.5) * CONFIG.postExplosionFloatingAmplitude,
          (Math.random() - 0.5) * CONFIG.postExplosionFloatingAmplitude,
        ));
        keyFloatingAmp.current.forEach(v => v.set(
          (Math.random() - 0.5) * CONFIG.postExplosionFloatingAmplitude,
          (Math.random() - 0.5) * CONFIG.postExplosionFloatingAmplitude,
          (Math.random() - 0.5) * CONFIG.postExplosionFloatingAmplitude,
        ));
        onFinished(); // Call the finish handler when explosion is done
      }
    }

    // 6. Update particle positions every frame
    updateParticles(logo, velocities.current, originalPositions.current, floatingPhase.current, floatingAmp.current, timeRef.current, postExplosionAnchors.current);
    updateParticles(key, keyVelocities.current, keyOriginalPositions.current, keyFloatingPhase.current, keyFloatingAmp.current, timeRef.current, keyPostExplosionAnchors.current);
  });

  return (
    <>
      <FlashPlane
        flash={triggerFlash.current}
        onFlashComplete={() => triggerFlash.current = false}
      />
      {logoGeo && (
        <points geometry={logoGeo} ref={logoRef}>
          <pointsMaterial
            ref={logoMaterialRef}
            size={CONFIG.particleSize.normal}
            vertexColors
            transparent
            opacity={0}
            map={circleTexture}
            alphaTest={0.5}
          />
        </points>
      )}
      {keyGeo && (
        <points
          geometry={keyGeo}
          ref={keyRef}
          position={[100, 0, 150]}
          rotation={[Math.PI / 2.5, Math.PI / 8, 0]}
        >
          <pointsMaterial
            ref={keyMaterialRef}
            size={CONFIG.particleSize.normal}
            vertexColors
            transparent
            opacity={0}
            map={circleTexture}
            alphaTest={0.5}
          />
        </points>
      )}
    </>
  );
}

/**
 * The main export component that sets up the scene.
 */
export default function KeyAndLogoScene({ onFinished }: { onFinished: () => void }) {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', zIndex: 1 }}>
      <Canvas camera={{ position: [0, 100, 400], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 100, 200]} intensity={0.8} />
        <KeyAndLogo onFinished={onFinished} />
      </Canvas>
    </div>
  );
}