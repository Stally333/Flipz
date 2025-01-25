'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface LoadingScreenProps {
  onLoadingComplete?: () => void
  className?: string
}

// Add these helper functions at the top of the file
const springConfig = {
  stiffness: 150,  // Reduced stiffness for smoother motion
  damping: 15,     // Reduced damping for more fluid movement
  mass: 0.8        // Lighter mass for quicker response
}

const calculateTrailPosition = (index: number, mousePos: { x: number; y: number }, prevPos: { x: number; y: number }) => {
  const trailDelay = index * 0.015 // Shorter delay between each logo
  const dx = mousePos.x - prevPos.x
  const dy = mousePos.y - prevPos.y
  const angle = Math.atan2(dy, dx)
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  // Calculate trail spacing with slight randomness
  const spacing = index * 20 + Math.sin(index * 0.5) * 5
  
  return {
    x: mousePos.x - Math.cos(angle) * spacing,
    y: mousePos.y - Math.sin(angle) * spacing,
    scale: Math.max(0.5, 1 - (index * 0.02)),
    opacity: Math.max(0.3, 1 - (index * 0.025))
  }
}

// Add these new helper functions at the top
interface Raindrop {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
}

const createRaindrop = (): Raindrop => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * -100,
  length: Math.random() * 40 + 20,
  speed: Math.random() * 6 + 4,    // Increased speed range to 4-10
  opacity: Math.random() * 0.6 + 0.4 // Higher opacity range 0.4-1.0
})

// Add these new interfaces and helper functions
interface SystemMetric {
  label: string
  value: number
  unit: string
  color: string
}

const generateRandomMetric = (current: number): number => {
  return Math.min(100, Math.max(0, current + (Math.random() - 0.5) * 10))
}

// Add new interfaces at the top with existing interfaces
interface CryptoVerification {
  status: 'pending' | 'accepted' | 'denied'
  message: string
  code: string
}

export function LoadingScreen({ onLoadingComplete, className }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [glitchEffect, setGlitchEffect] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [prevPoints, setPrevPoints] = useState<Array<{ x: number; y: number }>>([])
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [raindrops, setRaindrops] = useState<Raindrop[]>(() => 
    Array.from({ length: 333 }, createRaindrop) // Increased to 333 raindrops
  )

  // Add new state for system metrics
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { label: 'Audio Sync', value: 0, unit: '%', color: 'cyan' },
    { label: 'Beat Buffer', value: 0, unit: 'hz', color: 'purple' },
    { label: 'Mix Engine Load', value: 0, unit: '%', color: 'emerald' },
    { label: 'Sample Flux', value: 0, unit: 'kHz', color: 'amber' },
  ])

  // Add inside the LoadingScreen component with other state
  const [verifications, setVerifications] = useState<CryptoVerification[]>([])
  const [currentVerification, setCurrentVerification] = useState<CryptoVerification>({
    status: 'pending',
    message: 'INITIALIZING AUDIO PROTOCOLS',
    code: 'IAP_0x00'
  })

  // Updated mouse tracking with velocity
  useEffect(() => {
    let lastTime = performance.now()

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = performance.now()
      const deltaTime = currentTime - lastTime
      const newPoint = { x: e.clientX, y: e.clientY }
      
      // Calculate velocity
      const vx = (newPoint.x - lastMousePos.x) / deltaTime
      const vy = (newPoint.y - lastMousePos.y) / deltaTime
      
      setVelocity({ x: vx, y: vy })
      setLastMousePos(newPoint)
      setMousePosition(newPoint)
      setPrevPoints(prev => [newPoint, ...prev].slice(0, 50)) // Increased trail length
      
      lastTime = currentTime
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [lastMousePos])

  // Trigger glitch effect periodically
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 150)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + Math.random() * 10, 100))
      } else {
        onLoadingComplete?.()
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [progress, onLoadingComplete])

  // Update rain animation with faster speed multiplier
  useEffect(() => {
    const animateRain = () => {
      setRaindrops(drops => 
        drops.map(drop => {
          const newY = drop.y + drop.speed * 2 // Increased speed multiplier to 2
          
          if (newY > window.innerHeight) {
            return createRaindrop()
          }
          
          return { ...drop, y: newY }
        })
      )
      requestAnimationFrame(animateRain)
    }

    const animation = requestAnimationFrame(animateRain)
    return () => cancelAnimationFrame(animation)
  }, [])

  // Add effect to animate metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(metrics => 
        metrics.map(metric => ({
          ...metric,
          value: generateRandomMetric(metric.value)
        }))
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Add this new effect after other useEffects
  useEffect(() => {
    const messages = [
      { message: 'ANALYZING AUDIO PATTERNS', code: 'AAP_0x01' },
      { message: 'CALIBRATING RHYTHM ENGINE', code: 'CRE_0x02' },
      { message: 'LOADING NEURAL BEATS', code: 'LNB_0x03' },
      { message: 'SYNCHRONIZING BPM MATRIX', code: 'SBM_0x04' },
      { message: 'HARMONIZING AI CORES', code: 'HAC_0x05' },
      { message: 'INITIALIZING BEAT DETECTION', code: 'IBD_0x06' },
      { message: 'PROCESSING FREQUENCY MAPS', code: 'PFM_0x07' },
      { message: 'OPTIMIZING SOUND WAVES', code: 'OSW_0x08' },
      { message: 'LOADING SYNTHESIS MODULES', code: 'LSM_0x09' },
      { message: 'CALIBRATING AUDIO MATRIX', code: 'CAM_0x10' },
    ]

    const updateVerification = () => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      const willSucceed = Math.random() > 0.3 // 70% success rate

      setCurrentVerification(prev => ({
        status: willSucceed ? 'accepted' : 'denied',
        message: randomMessage.message,
        code: randomMessage.code
      }))

      // Add to verification history
      setVerifications(prev => [...prev, {
        status: willSucceed ? 'accepted' : 'denied',
        message: randomMessage.message,
        code: randomMessage.code
      }].slice(-3)) // Keep last 3 verifications
    }

    const interval = setInterval(updateVerification, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.15)_0%,_transparent_70%)]",
        className
      )}
    >
      {/* Grid Pattern + Holographic Background */}
      <div className="absolute inset-0">
        {/* Enhanced Grid Pattern with Pulse */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.15)_1px,transparent_1px)] bg-[size:24px_24px] animate-grid-pulse" />
        
        {/* Additional Cyber Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(124,58,237,0.1)_1px,transparent_1px)] bg-[size:32px_32px] animate-grid-pulse-slow" />
        
        {/* Enhanced Holographic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-hologram-vertical" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-hologram" />
        
        {/* Enhanced Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.2)_0%,_transparent_70%)] animate-pulse-slow" />

        {/* Cyberpunk Rain Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {raindrops.map((drop, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] bg-gradient-to-b from-cyan-500/40 to-purple-500/40"
              style={{
                left: drop.x,
                top: drop.y,
                height: drop.length,
                opacity: drop.opacity,
                filter: 'blur(0.5px)',
              }}
              animate={{
                opacity: [drop.opacity, drop.opacity * 0.7, drop.opacity],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Enhanced glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-purple-500/5" />
      </div>

      {/* Update the logo container */}
      <div className="fixed top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 10 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            y: 0,
          }}
          className={cn(
            "relative w-[600px] h-[600px]", // Restored original container size
            "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:animate-hologram",
            "after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-cyan-500/10 after:to-transparent after:animate-hologram-vertical",
            glitchEffect && "animate-glitch"
          )}
        >
          <Image
            src="/images/logo.png"
            alt="FLIPZ Logo"
            width={600}
            height={600}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
            className="object-contain relative z-10 drop-shadow-[0_0_30px_rgba(56,189,248,0.7)] animate-glow-intense"
            priority
            unoptimized
          />
        </motion.div>
      </div>

      {/* Cryptographic Verification Section */}
      <div className="fixed top-[60%] left-1/2 transform -translate-x-1/2 w-full max-w-xl">
        {/* Current Verification */}
        <motion.div
          key={currentVerification.code}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center space-x-2 backdrop-blur-sm bg-black/20 rounded px-4 py-2 border border-cyan-500/20">
            <motion.div
              animate={{
                backgroundColor: currentVerification.status === 'accepted' 
                  ? ['#059669', '#10B981'] 
                  : currentVerification.status === 'denied'
                  ? ['#DC2626', '#EF4444']
                  : ['#2563EB', '#3B82F6'],
              }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="w-2 h-2 rounded-full"
            />
            <span className="font-mono text-sm">
              {currentVerification.message}
            </span>
            <span className="font-mono text-xs text-gray-500">
              {currentVerification.code}
            </span>
          </div>
        </motion.div>

        {/* Verification History */}
        <div className="space-y-2">
          {verifications.map((verification, index) => (
            <motion.div
              key={`${verification.code}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.5 - (index * 0.15), x: 0 }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center space-x-2 backdrop-blur-sm bg-black/10 rounded px-3 py-1">
                <div 
                  className={`w-1.5 h-1.5 rounded-full ${
                    verification.status === 'accepted' 
                      ? 'bg-emerald-500' 
                      : 'bg-red-500'
                  }`}
                />
                <span className="font-mono text-xs text-gray-400">
                  {verification.message}
                </span>
                <span className="font-mono text-xs text-gray-600">
                  {verification.code}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress Bar Section - Now with fixed positioning */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-50">
        <div className="relative backdrop-blur-sm bg-black/20 rounded-lg p-4 border border-cyan-500/20">
          {/* Main Progress Bar */}
          <div className="relative mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-mono text-cyan-400">System Initialize</span>
              <span className="text-xs font-mono text-cyan-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
                style={{
                  width: `${progress}%`,
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -left-2 -top-2 w-4 h-4 border-l-2 border-t-2 border-cyan-500/30" />
            <div className="absolute -right-2 -bottom-2 w-4 h-4 border-r-2 border-b-2 border-cyan-500/30" />
          </div>

          {/* System Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {systemMetrics.map((metric, index) => (
              <div key={metric.label} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-mono text-gray-400">{metric.label}</span>
                  <span className="text-xs font-mono text-gray-400">
                    {metric.value.toFixed(1)}{metric.unit}
                  </span>
                </div>
                <div className="h-1 bg-gray-800/50 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-${metric.color}-500`}
                    style={{ width: `${metric.value}%` }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Status Messages */}
          <div className="mt-4 flex justify-between items-center text-xs font-mono">
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-cyan-500"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-cyan-400">INITIALIZING NEURAL AUDIO ENGINE</span>
            </div>
            <span className="text-gray-500">FREQ: {(Math.random() * 20000).toFixed(1)} Hz</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 