"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Clock, MapPin, MessageCircle, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const sports = [
  {
    id: "football",
    name: "Football",
    image: "/placeholder.svg?height=80&width=80",
    activeMatches: 24,
  },
  {
    id: "basketball",
    name: "Basketball",
    image: "/placeholder.svg?height=80&width=80",
    activeMatches: 18,
  },
  {
    id: "tennis",
    name: "Tennis",
    image: "/placeholder.svg?height=80&width=80",
    activeMatches: 12,
  },
]

const matches = [
  {
    id: 1,
    sport: "Football",
    title: "5v5 Football Match",
    location: "Victory Sports Complex",
    time: "Today 6:00 PM",
    players: "8/10",
    level: "Intermediate",
    image: "/placeholder.svg?height=60&width=60",
    host: { name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    comments: 3,
    status: "available",
    price: "₹200 per person",
  },
  {
    id: 2,
    sport: "Basketball",
    title: "3v3 Basketball",
    location: "Downtown Courts",
    time: "Tomorrow 7:30 PM",
    players: "4/6",
    level: "Beginner",
    image: "/placeholder.svg?height=60&width=60",
    host: { name: "Sarah Wilson", avatar: "/placeholder.svg?height=40&width=40" },
    comments: 1,
    status: "available",
    price: "₹150 per person",
  },
  {
    id: 3,
    sport: "Tennis",
    title: "Singles Tennis",
    location: "Elite Tennis Club",
    time: "Today 5:00 PM",
    players: "1/2",
    level: "Advanced",
    image: "/placeholder.svg?height=60&width=60",
    host: { name: "Mike Chen", avatar: "/placeholder.svg?height=40&width=40" },
    comments: 0,
    status: "joining",
    price: "₹300 per person",
  },
]

const pastMatches = [
  {
    id: 1,
    sport: "Football",
    opponent: "Team Alpha",
    score: "3-2",
    result: "won",
    date: "Feb 10, 2024",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    sport: "Basketball",
    opponent: "Court Kings",
    score: "45-52",
    result: "lost",
    date: "Feb 8, 2024",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function QuickMatch() {
  const [selectedSport, setSelectedSport] = useState("football")
  const [matchType, setMatchType] = useState("5v5")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-100">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quick Match</h1>
          <p className="text-gray-600">Find players and join games instantly</p>
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search matches, sports, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-black"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 border-gray-200 bg-transparent">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Sport Selection */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {sports.map((sport) => (
            <motion.button
              key={sport.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSport(sport.id)}
              className={`flex-shrink-0 p-4 rounded-2xl border-2 transition-all ${
                selectedSport === sport.id
                  ? "border-black bg-black text-white"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden mb-3 mx-auto">
                <Image
                  src={sport.image || "/placeholder.svg"}
                  alt={sport.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="text-sm font-semibold">{sport.name}</div>
              <div className="text-xs opacity-70">{sport.activeMatches} active</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Match Type Toggle */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex gap-2">
          {["2v2", "5v5", "11v11"].map((type) => (
            <Button
              key={type}
              variant={matchType === type ? "default" : "outline"}
              onClick={() => setMatchType(type)}
              className={`rounded-xl ${
                matchType === type
                  ? "bg-black text-white border-black"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="flex-1">
        <div className="px-6 py-4 bg-white border-b border-gray-100">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1">
            <TabsTrigger
              value="upcoming"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="registered"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              My Matches
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming" className="px-6 py-6 space-y-4">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="p-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <Image
                        src={match.image || "/placeholder.svg"}
                        alt={match.sport}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{match.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{match.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{match.time}</span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            match.level === "Beginner"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : match.level === "Intermediate"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : "bg-red-100 text-red-800 border-red-200"
                          }`}
                        >
                          {match.level}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{match.players}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden">
                              <Image
                                src={match.host.avatar || "/placeholder.svg"}
                                alt={match.host.name}
                                width={24}
                                height={24}
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm text-gray-600">{match.host.name}</span>
                          </div>
                          {match.comments > 0 && (
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{match.comments}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">{match.price}</div>
                          <Button
                            size="sm"
                            className={`mt-1 ${
                              match.status === "joining"
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-black hover:bg-gray-800 text-white"
                            }`}
                          >
                            {match.status === "joining" ? "Joined" : "Join Match"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="registered" className="px-6 py-6">
          <Card className="border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Registered Matches</h3>
            <p className="text-gray-600 mb-6">Join a match to see it here</p>
            <Button className="bg-black hover:bg-gray-800 text-white">Browse Matches</Button>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="px-6 py-6 space-y-4">
          {pastMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-gray-200">
                <div className="p-4">
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
                        <h3 className="font-bold text-gray-900">{match.sport}</h3>
                        <p className="text-sm text-gray-600">vs {match.opponent}</p>
                        <p className="text-xs text-gray-500">{match.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{match.score}</div>
                      <Badge
                        className={
                          match.result === "won"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }
                      >
                        {match.result === "won" ? "Victory" : "Defeat"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
