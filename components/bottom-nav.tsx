"use client"

import { motion } from "framer-motion"
import { Home, MapPin, Zap, GraduationCap, User } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "court", icon: MapPin, label: "Courts" },
  { id: "match", icon: Zap, label: "Match" },
  { id: "classes", icon: GraduationCap, label: "Classes" },
  { id: "profile", icon: User, label: "Profile" },
]

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange(item.id)}
              className={`relative p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-black" : "hover:bg-gray-100"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-600"}`} />
              <span className={`text-xs mt-1 block ${isActive ? "text-white" : "text-gray-600"}`}>{item.label}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
