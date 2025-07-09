"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import SplashScreen from "@/components/splash-screen"
import SignupFlow from "@/components/signup-flow"
import MainApp from "@/components/main-app"

export default function DexPlayApp() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "signup" | "app">("splash")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        setCurrentScreen("signup")
      }, 60000)
      return () => clearTimeout(timer)
    }
  }, [currentScreen])

  const handleSignupComplete = (userData: any) => {
    setUser(userData)
    setCurrentScreen("app")
  }

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {currentScreen === "splash" && <SplashScreen key="splash" onComplete={() => setCurrentScreen("signup")} />}
        {currentScreen === "signup" && <SignupFlow key="signup" onComplete={handleSignupComplete} />}
        {currentScreen === "app" && <MainApp key="app" user={user} />}
      </AnimatePresence>
    </div>
  )
}
