"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import BottomNav from "@/components/bottom-nav"
import HomeScreen from "@/components/screens/home-screen"
import CourtBooking from "@/components/screens/court-booking"
import QuickMatch from "@/components/screens/quick-match"
import Classes from "@/components/screens/classes"
import Profile from "@/components/screens/profile"

interface MainAppProps {
  user: any
}

export default function MainApp({ user }: MainAppProps) {
  const [activeTab, setActiveTab] = useState("home")

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen user={user} />
      case "court":
        return <CourtBooking />
      case "match":
        return <QuickMatch />
      case "classes":
        return <Classes />
      case "profile":
        return <Profile user={user} />
      default:
        return <HomeScreen user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="min-h-screen"
      >
        {renderScreen()}
      </motion.div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
