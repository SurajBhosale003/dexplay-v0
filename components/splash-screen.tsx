"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight } from "lucide-react"
import Image from "next/image"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white flex flex-col"
    >
      {/* Hero Image */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 z-10" />
        <Image
          src="/placeholder.svg?height=600&width=400"
          alt="Sports athletes"
          fill
          className="object-cover"
          priority
        />

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-16 left-6 z-20"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-bold text-black">DexPlay</span>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="px-6 pb-12 pt-8 bg-white relative z-20"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Connect. Play. Excel.</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Professional sports matchmaking platform for athletes and enthusiasts.
        </p>

        <div className="space-y-4">
          <Button
            onClick={onComplete}
            className="w-full h-14 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl text-lg"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button
            variant="outline"
            className="w-full h-14 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl text-lg bg-transparent"
          >
            Sign In
          </Button>
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear" }}
          className="absolute bottom-0 left-0 h-1 bg-black"
        />
      </motion.div>
    </motion.div>
  )
}
