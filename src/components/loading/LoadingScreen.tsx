'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
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

// Add this helper function at the top of the file with your other helper functions
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Update the GlitchAvatar component with more intense glitch effects
const GlitchAvatar = () => {
  const controls = useAnimation()

  useEffect(() => {
    const glitchSequence = async () => {
      while (true) {
        // More frequent and intense glitch effect
        await controls.start({
          clipPath: [
            'inset(0% 0% 0% 0%)',
            'inset(15% -10% 85% 10%)',
            'inset(35% -15% 65% 15%)',
            'inset(45% -5% 55% 5%)',
            'inset(0% 0% 0% 0%)',
          ],
          x: [0, -5, 5, -3, 0],
          y: [0, 3, -3, 2, 0],
          filter: [
            'hue-rotate(0deg) brightness(1) contrast(1)',
            'hue-rotate(90deg) brightness(1.2) contrast(1.5)',
            'hue-rotate(180deg) brightness(0.8) contrast(2)',
            'hue-rotate(270deg) brightness(1.4) contrast(1.2)',
            'hue-rotate(0deg) brightness(1) contrast(1)',
          ],
          transition: {
            duration: 0.3,
            times: [0, 0.2, 0.4, 0.6, 1],
            ease: "easeInOut",
          },
        })
        
        // Add random chromatic aberration effect
        await controls.start({
          filter: [
            'hue-rotate(0deg) blur(0px)',
            'hue-rotate(90deg) blur(1px)',
            'hue-rotate(0deg) blur(0px)',
          ],
          transition: { duration: 0.2, ease: "easeInOut" }
        })

        // Shorter delay between glitches
        await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500))
      }
    }
    glitchSequence()
  }, [controls])

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <motion.div
        className="relative w-[800px] h-[800px]" // Adjusted size to be more proportional
        animate={controls}
        style={{ 
          mixBlendMode: 'soft-light',
          opacity: 0.7 // Slightly transparent to blend with background
        }}
      >
        <Image
          src="/images/loadingavatar.png"
          alt="Avatar"
          fill
          style={{ 
            objectFit: 'contain',
            filter: 'brightness(0.8) contrast(1.2)'
          }}
          priority
        />
      </motion.div>
    </div>
  )
}

// Update the MusicPlayer component
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [totalDuration, setTotalDuration] = useState(235)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(error => {
          console.log("Audio playback error:", error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/audio/neural-beats.wav')
    
    // Update duration once audio is loaded
    audioRef.current.addEventListener('loadedmetadata', () => {
      setTotalDuration(Math.floor(audioRef.current?.duration || 235))
    })

    // Update current time
    audioRef.current.addEventListener('timeupdate', () => {
      setCurrentTime(Math.floor(audioRef.current?.currentTime || 0))
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <div className="mt-3 border-t border-cyan-500/20 pt-3">
      <div className="relative">
        {/* Track Info - More compact */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="text-xs font-mono text-cyan-400">NEURAL BEATS v1.0</div>
            <div className="text-[10px] font-mono text-gray-500">AUDIO SEQUENCE</div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ opacity: [1, 0.5] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-500"
            />
            <span className="text-[10px] font-mono text-gray-400">LIVE</span>
          </div>
        </div>

        {/* Waveform - Slightly shorter */}
        <div className="h-5 mb-2 flex items-center space-x-0.5">
          {Array.from({ length: 32 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-cyan-500/50"
              animate={{
                height: isPlaying ? [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`
                ] : '20%'
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.05
              }}
            />
          ))}
        </div>

        {/* Controls Row - Compact spacing */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-gray-400">
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </span>
          <button
            onClick={handlePlayPause}
            className="px-3 py-0.5 rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/10 transition-colors"
          >
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </button>
          <span className="text-[10px] font-mono text-gray-400">
            {(Math.random() * 160 + 80).toFixed(1)} BPM
          </span>
        </div>
      </div>
    </div>
  )
}

// Add this new component near the top of the file, after the interfaces
const AnimatedLoadingText = () => {
  const [text, setText] = useState("CALIBRATING AUDIO MATRIX");
  const [code, setCode] = useState("CAM_0x10");
  
  useEffect(() => {
    const messages = [
      { text: "CALIBRATING AUDIO MATRIX", code: "CAM_0x10" },
      { text: "ANALYZING AUDIO PATTERNS", code: "AAP_0x01" },
      { text: "ANALYZING AUDIO PATTERNS", code: "AAP_0x02" },
    ];
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      setText(messages[currentIndex].text);
      setCode(messages[currentIndex].code);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center space-x-3">
      <motion.div
        className="w-2 h-2 rounded-full bg-emerald-500"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="font-mono text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-emerald-500">{text}</span>
        <span className="ml-3 text-gray-500">{code}</span>
      </motion.div>
    </div>
  );
};

export function LoadingScreen({ onLoadingComplete, className }: LoadingScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(235)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { label: 'CPU Load', value: 42.3, unit: '%', color: 'cyan' },
    { label: 'Memory', value: 32.4, unit: '%', color: 'purple' },
    { label: 'Network', value: 83.8, unit: 'Mb/s', color: 'cyan' },
    { label: 'GPU Temp', value: 71.6, unit: '°C', color: 'purple' },
  ])
  const [currentVerification, setCurrentVerification] = useState<CryptoVerification>({
    status: 'pending',
    message: 'INITIALIZING SYSTEM',
    code: 'SYS_0x00'
  })
  const [verifications, setVerifications] = useState<CryptoVerification[]>([])
  const [glitchEffect, setGlitchEffect] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [prevPoints, setPrevPoints] = useState<Array<{ x: number; y: number }>>([])
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [raindrops, setRaindrops] = useState<Raindrop[]>(() => 
    Array.from({ length: 333 }, createRaindrop) // Increased to 333 raindrops
  )

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/audio/neural-beats.wav')
    const audio = audioRef.current
    
    // Update duration once audio is loaded
    const handleLoadedMetadata = () => {
      if (audio) {
        setTotalDuration(Math.floor(audio.duration))
        // Auto-play when loaded
        audio.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.log("Auto-play failed:", error)
          // Most browsers require user interaction before playing audio
          setIsPlaying(false)
        })
      }
    }

    // Update current time while playing
    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentTime(Math.floor(audio.currentTime))
      }
    }

    // Add event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)

    // Cleanup function
    return () => {
      if (audio) {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.pause()
      }
    }
  }, []) // Empty dependency array - only run once on mount

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.log)
      }
      setIsPlaying(!isPlaying)
    }
  }

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

  // Update the messages array with proper JSON formatting
  useEffect(() => {
    const messages = [
      { "message": "ANALYZING AUDIO PATTERNS", "code": "AAP_0x01" },
      { "message": "CALIBRATING RHYTHM ENGINE", "code": "CRE_0x02" },
      { "message": "LOADING NEURAL BEATS", "code": "LNB_0x03" },
      { "message": "SYNCHRONIZING BPM MATRIX", "code": "SBM_0x04" },
      { "message": "HARMONIZING AI CORES", "code": "HAC_0x05" },
      { "message": "INITIALIZING BEAT DETECTION", "code": "IBD_0x06" },
      { "message": "PROCESSING FREQUENCY MAPS", "code": "PFM_0x07" },
      { "message": "OPTIMIZING SOUND WAVES", "code": "OSW_0x08" },
      { "message": "LOADING SYNTHESIS MODULES", "code": "LSM_0x09" },
      { "message": "CALIBRATING AUDIO MATRIX", "code": "CAM_0x10" }
    ];

    const updateVerification = () => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      const willSucceed = Math.random() > 0.3; // 70% success rate

      setCurrentVerification(prev => ({
        status: willSucceed ? "accepted" : "denied",
        message: randomMessage.message,
        code: randomMessage.code
      }));

      // Add to verification history
      setVerifications(prev => [...prev, {
        status: willSucceed ? "accepted" : "denied",
        message: randomMessage.message,
        code: randomMessage.code
      }].slice(-3)); // Keep last 3 verifications
    };

    const interval = setInterval(updateVerification, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className={cn("fixed inset-0 bg-black/90 text-white relative", className)}
    >
      {/* Full screen glow container */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
      
      {/* Avatar positioned behind logo */}
      <div className="fixed inset-0 flex items-center justify-center">
        <GlitchAvatar />
      </div>

      {/* Logo container with enhanced glow */}
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <Image
            src="/images/logo.png"
            alt="FLIPZ Logo"
            width={480}
            height={120}
            className="drop-shadow-[0_0_50px_rgba(56,189,248,0.9)] animate-glow-intense"
            priority
            unoptimized
          />
        </motion.div>
      </div>

      {/* Rest of your UI components */}
      <div className="relative z-20">
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
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[800px]">
          <div className="relative backdrop-blur-sm bg-black/20 rounded-lg p-4 border border-cyan-500/20">
            {/* Main Progress Bar and Metrics in a row */}
            <div className="flex gap-6">
              {/* Left column - Progress */}
              <div className="flex-1">
                <div className="relative mb-4">
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
                </div>
              </div>

              {/* Right column - Metrics */}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3">
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
              </div>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-cyan-500/20"></div>

            {/* Music Player - Now in a row layout */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-xs font-mono text-cyan-400">NEURAL BEATS v1.0</div>
                  <div className="text-[10px] font-mono text-gray-500">AUDIO SEQUENCE</div>
                </div>
                <div className="h-5 w-64 flex items-center space-x-0.5">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-cyan-500/50"
                      animate={{
                        height: [
                          `${Math.random() * 100}%`,
                          `${Math.random() * 100}%`
                        ]
                      }}
                      transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.05
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-mono text-gray-400">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
                <button
                  onClick={handlePlayPause}
                  className="px-3 py-0.5 rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/10 transition-colors"
                >
                  {isPlaying ? 'PAUSE' : 'PLAY'}
                </button>
                <span className="text-[10px] font-mono text-gray-400">
                  {(Math.random() * 160 + 80).toFixed(1)} BPM
                </span>
              </div>
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
      </div>
    </motion.div>
  )
} 