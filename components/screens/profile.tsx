"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Trophy, Calendar, Star, Edit3, TrendingUp, Award, Target } from "lucide-react"
import Image from "next/image"

const achievements = [
  {
    id: 1,
    name: "First Victory",
    description: "Won your first match",
    image: "/placeholder.svg?height=60&width=60",
    earned: true,
    date: "Feb 10, 2024",
  },
  {
    id: 2,
    name: "Team Player",
    description: "Played 10 team matches",
    image: "/placeholder.svg?height=60&width=60",
    earned: true,
    date: "Feb 8, 2024",
  },
  {
    id: 3,
    name: "Hat Trick Hero",
    description: "Score 3 goals in one match",
    image: "/placeholder.svg?height=60&width=60",
    earned: false,
    progress: 2,
    total: 3,
  },
  {
    id: 4,
    name: "Perfect Week",
    description: "Win all matches in a week",
    image: "/placeholder.svg?height=60&width=60",
    earned: false,
    progress: 3,
    total: 7,
  },
]

const recentMatches = [
  {
    sport: "Football",
    result: "Won",
    score: "3-2",
    date: "Feb 10, 2024",
    opponent: "Team Alpha",
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    sport: "Basketball",
    result: "Lost",
    score: "45-52",
    date: "Feb 8, 2024",
    opponent: "Court Kings",
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    sport: "Tennis",
    result: "Won",
    score: "6-4, 6-2",
    date: "Feb 5, 2024",
    opponent: "Mike Chen",
    image: "/placeholder.svg?height=48&width=48",
  },
]

const stats = [
  { label: "Matches", value: "47", icon: Target, change: "+12 this month" },
  { label: "Win Rate", value: "68%", icon: TrendingUp, change: "+5% this month" },
  { label: "Rating", value: "4.8", icon: Star, change: "Top 15%" },
  { label: "Hours", value: "124", icon: Trophy, change: "+18h this month" },
]

interface ProfileProps {
  user: any
}

export default function Profile({ user }: ProfileProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6 py-6">
        <Card className="border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <Button
                size="icon"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-black hover:bg-gray-800 text-white"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name || "John Doe"}</h2>
              <p className="text-gray-600 mb-2">Age {user?.age || "25"} • Sports Enthusiast</p>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-semibold text-gray-900">4.8 Rating</span>
                <Badge className="bg-green-100 text-green-800 border-green-200 ml-2">Active Player</Badge>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
                <div className="text-xs text-green-600 font-medium">{stat.change}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Wallet */}
        <Card className="border-gray-200 p-4 mb-6 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">DexPlay Wallet</h3>
                <p className="text-sm text-gray-600">Available balance</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">₹2,500</div>
              <div className="text-sm text-gray-600">+ 150 points</div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
            <Button variant="ghost" className="text-gray-600">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-4 text-center relative overflow-hidden ${
                    achievement.earned
                      ? "border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden mx-auto mb-3">
                    <Image
                      src={achievement.image || "/placeholder.svg"}
                      alt={achievement.name}
                      width={48}
                      height={48}
                      className={`object-cover ${!achievement.earned ? "grayscale" : ""}`}
                    />
                  </div>
                  <div className={`font-bold text-sm mb-1 ${achievement.earned ? "text-gray-900" : "text-gray-500"}`}>
                    {achievement.name}
                  </div>
                  <div className={`text-xs ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                    {achievement.description}
                  </div>
                  {achievement.earned && (
                    <div className="text-xs text-yellow-600 font-medium mt-1">{achievement.date}</div>
                  )}
                  {!achievement.earned && achievement.progress && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-gray-400 h-1 rounded-full"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {achievement.progress}/{achievement.total}
                      </div>
                    </div>
                  )}
                  {achievement.earned && <Award className="absolute top-2 right-2 w-4 h-4 text-yellow-500" />}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Matches */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Recent Matches</h3>
            <Button variant="ghost" className="text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentMatches.map((match, index) => (
              <Card key={index} className="border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                      <Image
                        src={match.image || "/placeholder.svg"}
                        alt={match.sport}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{match.sport}</div>
                      <div className="text-sm text-gray-600">vs {match.opponent}</div>
                      <div className="text-xs text-gray-500">{match.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 mb-1">{match.score}</div>
                    <Badge
                      className={
                        match.result === "Won"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }
                    >
                      {match.result}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-xl">
            <Calendar className="w-5 h-5 mr-2" />
            View Full Schedule
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 border-gray-200 hover:border-gray-300 rounded-xl bg-transparent"
          >
            <Settings className="w-5 h-5 mr-2" />
            Account Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
