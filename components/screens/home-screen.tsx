"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock, Users, TrendingUp, Calendar, Bell } from "lucide-react"
import Image from "next/image"
import CreateMatchModal from "@/components/create-match-modal"

const sports = [
  {
    id: "football",
    name: "Football",
    image: "/placeholder.svg?height=200&width=300",
    activeMatches: 24,
    nextMatch: "Today 6:00 PM",
  },
  {
    id: "basketball",
    name: "Basketball",
    image: "/placeholder.svg?height=200&width=300",
    activeMatches: 18,
    nextMatch: "Tomorrow 7:30 PM",
  },
  {
    id: "tennis",
    name: "Tennis",
    image: "/placeholder.svg?height=200&width=300",
    activeMatches: 12,
    nextMatch: "Today 5:00 PM",
  },
]

const stats = [
  { label: "Matches Played", value: "24", icon: TrendingUp, change: "+12%" },
  { label: "Win Rate", value: "75%", icon: TrendingUp, change: "+5%" },
  { label: "Hours Played", value: "48", icon: Clock, change: "+8h" },
]

interface HomeScreenProps {
  user: any
}

export default function HomeScreen({ user }: HomeScreenProps) {
  const [showCreateMatch, setShowCreateMatch] = useState(false)
  const [selectedSport, setSelectedSport] = useState<any>(null)

  const handleCreateMatch = (sport: any) => {
    setSelectedSport(sport)
    setShowCreateMatch(true)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Good morning, {user?.name}</h1>
            <p className="text-gray-600">Ready for your next match?</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-600">{user?.name?.charAt(0) || "U"}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 text-center border-gray-200">
              <div className="flex items-center justify-center mb-2">
                <stat.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
              <div className="text-xs text-green-600 font-medium">{stat.change}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Your Sports */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Sports</h2>
          <Button variant="ghost" className="text-gray-600">
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="relative h-48">
                  <Image src={sport.image || "/placeholder.svg"} alt={sport.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{sport.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-white/90">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{sport.activeMatches} active</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{sport.nextMatch}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleCreateMatch(sport)}
                        size="sm"
                        className="bg-white text-black hover:bg-gray-100 rounded-lg"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Create
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Matches */}
      <div className="px-6 py-6 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Matches</h2>
          <Button variant="ghost" className="text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
          </Button>
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="p-4 border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Sport"
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Football Match</div>
                    <div className="text-sm text-gray-500">Victory Park • Today 6:00 PM</div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">Confirmed</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Match Modal */}
      {showCreateMatch && <CreateMatchModal sport={selectedSport} onClose={() => setShowCreateMatch(false)} />}
    </div>
  )
}
