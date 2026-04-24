"use client"

import React, { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { 
  Float, 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows
} from "@react-three/drei"
import * as THREE from "three"

function RobotHead({ emotion = "idle", cursor = { x: 0, y: 0 } }) {
  const headRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  
  // Color mapping based on emotion
  const colors = useMemo(() => ({
    idle: "#3fb1ff",
    happy: "#4ade80",
    thinking: "#a78bfa",
    excited: "#f59e0b",
    sad: "#ef4444"
  }), [])

  const activeColor = colors[emotion as keyof typeof colors] || colors.idle

  useFrame((state) => {
    if (!headRef.current) return
    
    // Smoothly follow cursor
    const targetX = (cursor.x - state.size.width / 2) / 100
    const targetY = -(cursor.y - state.size.height / 2) / 100
    
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX * 0.2, 0.1)
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetY * 0.2, 0.1)
    
    // Eyes pulse
    const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.1 + 1
    if (leftEyeRef.current) leftEyeRef.current.scale.set(pulse, pulse, pulse)
    if (rightEyeRef.current) rightEyeRef.current.scale.set(pulse, pulse, pulse)
  })

  return (
    <group ref={headRef}>
      {/* Main Head Sphere */}
      <mesh castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#0a1e40"
          roughness={0.1}
          metalness={1}
          distort={0.3}
          speed={2}
        />
      </mesh>

      {/* Glass Visor */}
      <mesh position={[0, 0, 0.1]} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          roughness={0}
          transmission={1}
          thickness={0.5}
        />
      </mesh>

      {/* Left Eye */}
      <mesh ref={leftEyeRef} position={[-0.4, 0.2, 0.8]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={5} />
      </mesh>

      {/* Right Eye */}
      <mesh ref={rightEyeRef} position={[0.4, 0.2, 0.8]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={5} />
      </mesh>

      {/* "Mouth" Neon Line */}
      <mesh position={[0, -0.3, 0.9]}>
        <boxGeometry args={[0.4, 0.04, 0.05]} />
        <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

export default function Assistant3D({ emotion = "idle" }) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  return (
    <div 
      className="w-full h-full relative"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }}
    >
      <Canvas 
        shadows 
        dpr={[1, 1.5]} 
        frameloop="demand" 
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} color="#3fb1ff" intensity={1} />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <RobotHead emotion={emotion} cursor={cursor} />
        </Float>
        
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
