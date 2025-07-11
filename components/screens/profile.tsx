"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Trophy, Calendar, Star, Edit3, TrendingUp, Award, Target, ChevronRight, Plus, Copy, Share2, BarChart2, Check } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

// Theme colors - Updated primary color to #D7EE34
const theme = {
  primary: "#D7EE34", // New vibrant color
  secondary: "#10B981", // Emerald
  accent: "#F59E0B", // Amber
  background: "#F8FAFC", // Light slate
  text: "#1F2937", // Gray-800
  lightText: "#6B7280" // Gray-500
}

const achievements = [
  {
    id: 1,
    name: "First Victory",
    description: "Won your first match",
    image: "/placeholder.svg?height=60&width=60",
    earned: true,
    date: "Feb 10, 2024",
    xp: 50
  },
  {
    id: 2,
    name: "Team Player",
    description: "Played 10 team matches",
    image: "/placeholder.svg?height=60&width=60",
    earned: true,
    date: "Feb 8, 2024",
    xp: 100
  },
  {
    id: 3,
    name: "Hat Trick Hero",
    description: "Score 3 goals in one match",
    image: "/placeholder.svg?height=60&width=60",
    earned: false,
    progress: 2,
    total: 3,
    xp: 150
  },
  {
    id: 4,
    name: "Perfect Week",
    description: "Win all matches in a week",
    image: "/placeholder.svg?height=60&width=60",
    earned: false,
    progress: 3,
    total: 7,
    xp: 200
  },
]

const recentMatches = [
  {
    id: 1,
    sport: "Football",
    result: "Won",
    score: "3-2",
    date: "Feb 10, 2024",
    opponent: "Team Alpha",
    image: "/placeholder.svg",
    stats: {
      goals: 2,
      assists: 1,
      distance: 8.2,
      passes: 25,
      tackles: 4
    }
  },
  {
    id: 2,
    sport: "Basketball",
    result: "Lost",
    score: "45-52",
    date: "Feb 8, 2024",
    opponent: "Court Kings",
    image: "/placeholder.svg",
    stats: {
      points: 18,
      rebounds: 7,
      assists: 5,
      steals: 2,
      blocks: 1
    }
  },
  {
    id: 3,
    sport: "Tennis",
    result: "Won",
    score: "6-4, 6-2",
    date: "Feb 5, 2024",
    opponent: "Mike Chen",
    image: "/placeholder.svg",
    stats: {
      aces: 5,
      winners: 22,
      firstServe: 68,
      unforcedErrors: 8,
      breakPoints: 4
    }
  },
];


const stats = [
  { label: "Matches", value: "47", icon: Target, change: "+12 this month", trend: "up" },
  { label: "Win Rate", value: "68%", icon: TrendingUp, change: "+5% this month", trend: "up" },
  { label: "Rating", value: "4.8", icon: Star, change: "Top 15%", trend: "steady" },
  { label: "Hours", value: "124", icon: Trophy, change: "+18h this month", trend: "up" },
]

interface ProfileProps {
  user: any
}

export default function Profile({ user }: ProfileProps) {
  const [expandedMatch, setExpandedMatch] = useState<number | null>(null)
  const [copiedJoinCode, setCopiedJoinCode] = useState(false)

  const toggleMatchExpand = (id: number) => {
    setExpandedMatch(expandedMatch === id ? null : id)
  }

  const transformStatsToChartData = (stats: Record<string, number>) => {
  return Object.entries(stats).map(([key, value]) => ({
    metric: key,
    value,
  }));
};

  const copyJoinCode = () => {
    navigator.clipboard.writeText("SPRT-5X8K-9J2M")
    setCopiedJoinCode(true)
    setTimeout(() => setCopiedJoinCode(false), 2000)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <div className="px-6 py-6 sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: theme.text }}>My Profile</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-gray-100"
            style={{ color: theme.primary }}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Profile Card */}
        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
          <div 
            className="h-32 w-full" 
            style={{ backgroundColor: theme.primary }}
          >
            <div className="relative h-full">
              <Button 
                size="sm" 
                className="absolute top-4 right-4 bg-white/90 text-gray-900 hover:bg-white"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Cover
              </Button>
            </div>
          </div>
          
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 -mt-12">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center overflow-hidden shadow-md">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full shadow-md"
                  style={{ backgroundColor: theme.secondary }}
                >
                  <Edit3 className="w-4 h-4 text-white" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1" style={{ color: theme.text }}>
                      {user?.name || "Alex Johnson"}
                    </h2>
                    <p className="text-sm mb-2" style={{ color: theme.lightText }}>
                      Age {user?.age || "25"} • {user?.location || "New York"}
                    </p>
                  </div>
                  <Badge 
                    className="px-3 py-1 rounded-full border-0 shadow-sm"
                    style={{ backgroundColor: theme.accent, color: "white" }}
                  >
                    Pro Member
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" style={{ color: theme.accent }} />
                    <span className="font-semibold" style={{ color: theme.text }}>4.8</span>
                    <span className="text-sm" style={{ color: theme.lightText }}>(128 reviews)</span>
                  </div>
                  
                  <div className="h-4 w-px bg-gray-200"></div>
                  
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" style={{ color: theme.accent }} />
                    <span className="font-semibold" style={{ color: theme.text }}>12</span>
                    <span className="text-sm" style={{ color: theme.lightText }}>trophies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid with "use client" display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-4 border-0 rounded-xl shadow-sm h-full relative">
                {/* Added "use client" badge */}
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="text-xs py-0.5 px-1.5 bg-white/90">
                    use client
                  </Badge>
                </div>
                
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${theme.primary}10` }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: theme.primary }} />
                  </div>
                  <div>
                    <div className="text-xl font-bold" style={{ color: theme.text }}>
                      {stat.value}
                    </div>
                    <div className="text-xs" style={{ color: theme.lightText }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
                <div 
                  className={`text-xs mt-2 flex items-center ${
                    stat.trend === "up" ? "text-green-600" : 
                    stat.trend === "down" ? "text-red-600" : "text-gray-500"
                  }`}
                >
                  {stat.change}
                  {stat.trend === "up" && (
                    <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Join Community Card */}
        <Card className="border-0 rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: theme.primary }}>
          <div className="p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
                <p className="text-sm opacity-90 mb-4">Connect with other players and get exclusive benefits</p>
                <div className="flex items-center gap-3">
                  <Button 
                    size="sm" 
                    className="bg-white text-gray-900 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Join Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="hidden md:block relative w-24 h-24">
                <div className="absolute inset-0 bg-white/10 rounded-full"></div>
                <div className="absolute inset-4 bg-white/20 rounded-full"></div>
                <Trophy className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8" />
              </div>
            </div>
          </div>
        </Card>

        {/* Wallet & Join Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Wallet Card */}
          <Card className="border-0 rounded-2xl shadow-sm p-6" style={{ backgroundColor: theme.secondary }}>
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">DexPlay Wallet</h3>
                  <p className="text-sm opacity-90">Available balance</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">₹2,500</div>
                <div className="text-sm opacity-90">+ 150 points</div>
              </div>
            </div>
          </Card>

          {/* Join Code Card */}
          <Card className="border-0 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold mb-1" style={{ color: theme.text }}>Your Join Code</h3>
                <p className="text-sm mb-3" style={{ color: theme.lightText }}>
                  Share this code to invite friends
                </p>
                <div className="flex items-center gap-2">
                  <div 
                    className="px-4 py-2 rounded-lg font-mono font-bold text-lg border border-gray-200"
                    style={{ color: theme.primary }}
                  >
                    SPRT-5X8K-9J2M
                  </div>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="border-gray-200"
                    onClick={copyJoinCode}
                  >
                    {copiedJoinCode ? (
                      <Check className="w-4 h-4" style={{ color: theme.secondary }} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button 
                size="icon" 
                variant="outline" 
                className="border-gray-200"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Achievements Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold" style={{ color: theme.text }}>Achievements</h3>
            <Button 
              variant="ghost" 
              className="flex items-center"
              style={{ color: theme.primary }}
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card 
                  className={`p-4 border-0 rounded-2xl shadow-sm h-full ${
                    achievement.earned ? "bg-gradient-to-br from-white to-gray-50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center ${
                        achievement.earned ? "bg-purple-100" : "bg-gray-200"
                      }`}
                    >
                      <Image
                        src={achievement.image}
                        alt={achievement.name}
                        width={56}
                        height={56}
                        className={`object-cover ${!achievement.earned ? "grayscale opacity-60" : ""}`}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className={`font-bold ${achievement.earned ? "text-gray-900" : "text-gray-500"}`}>
                          {achievement.name}
                        </h4>
                        {achievement.earned && (
                          <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                            <Star className="w-3 h-3 fill-yellow-500" />
                            <span className="text-xs font-bold">{achievement.xp} XP</span>
                          </div>
                        )}
                      </div>
                      
                      <p className={`text-sm mt-1 ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                        {achievement.description}
                      </p>
                      
                      {achievement.earned ? (
                        <div className="text-xs mt-2 flex items-center text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          Earned {achievement.date}
                        </div>
                      ) : (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium text-gray-700">
                              {achievement.progress}/{achievement.total}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gray-400 h-2 rounded-full"
                              style={{ 
                                width: `${(achievement.progress / achievement.total) * 100}%`,
                                backgroundColor: theme.primary
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Matches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold" style={{ color: theme.text }}>Recent Matches</h3>
            <Button 
              variant="ghost" 
              className="flex items-center"
              style={{ color: theme.primary }}
            >
              <Calendar className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentMatches.map((match) => (
              <motion.div
                key={match.id}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-0 rounded-2xl shadow-sm overflow-hidden">
                  <div 
                    className="p-4 cursor-pointer" 
                    onClick={() => toggleMatchExpand(match.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
                          <Image
                            src={match.image}
                            alt={match.sport}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold" style={{ color: theme.text }}>
                            {match.sport}
                          </div>
                          <div className="text-sm" style={{ color: theme.lightText }}>
                            vs {match.opponent}
                          </div>
                          <div className="text-xs text-gray-400">{match.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div 
                          className="font-bold mb-1" 
                          style={{ 
                            color: match.result === "Won" ? theme.secondary : "#EF4444"
                          }}
                        >
                          {match.score}
                        </div>
                        <Badge
                          className={`px-2 py-1 rounded-full ${
                            match.result === "Won" 
                              ? "bg-green-100 text-green-800 border-0" 
                              : "bg-red-100 text-red-800 border-0"
                          }`}
                        >
                          {match.result}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedMatch === match.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0 border-t border-gray-100">
                          <h4 className="font-medium mb-3 text-sm" style={{ color: theme.text }}>
                            Match Statistics
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {Object.entries(match.stats).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <div className="text-2xl font-bold" style={{ color: theme.primary }}>
                                  {value}
                                </div>
                                <div className="text-xs uppercase tracking-wider" style={{ color: theme.lightText }}>
                                  {key}
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-4 border-gray-200"
                          >
                            <BarChart2 className="w-4 h-4 mr-2" />
                            View Full Stats
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <Button 
            className="w-full h-12 rounded-2xl shadow-sm"
            style={{ backgroundColor: theme.primary }}
          >
            <Calendar className="w-5 h-5 mr-2" />
            View Full Schedule
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 rounded-2xl border-gray-200 hover:border-gray-300"
          >
            <Settings className="w-5 h-5 mr-2" />
            Account Settings
          </Button>
        </div>
      </div>
    </div>
  )
}