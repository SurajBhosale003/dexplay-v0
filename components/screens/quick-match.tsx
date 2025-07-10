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
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067675/dexciss%20site/dexplay/optimal/pexels-pixabay-46798_1_omyner.jpg",
    activeMatches: 24,
    type: "Team",
    players: "11v11",
    popularity: "High"
  },
  {
    id: "basketball",
    name: "Basketball",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067723/dexciss%20site/dexplay/optimal/pexels-markusspiske-1752757_1_rhbltt.jpg",
    activeMatches: 18,
    type: "Team",
    players: "5v5",
    popularity: "High"
  },
  {
    id: "tennis",
    name: "Tennis",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067671/dexciss%20site/dexplay/optimal/pexels-pixabay-209977_1_cxaacu.jpg",
    activeMatches: 12,
    type: "Individual",
    players: "1v1",
    popularity: "Medium"
  },
  {
    id: "cricket",
    name: "Cricket",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067729/dexciss%20site/dexplay/optimal/pexels-case-originals-3657154_1_cv7jvj.jpg",
    activeMatches: 15,
    type: "Team",
    players: "11v11",
    popularity: "High"
  },
  {
    id: "badminton",
    name: "Badminton",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067735/dexciss%20site/dexplay/optimal/pexels-vladvictoria-2202685_1_ydqoy4.jpg",
    activeMatches: 8,
    type: "Individual/Doubles",
    players: "1v1 or 2v2",
    popularity: "Medium"
  }
]

const matches = [
  {
    id: 1,
    sport: "football",
    title: "5v5 Football Match",
    location: "Victory Sports Complex",
    time: "Today 6:00 PM",
    players: "8/10",
    level: "Intermediate",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067675/dexciss%20site/dexplay/optimal/pexels-pixabay-46798_1_omyner.jpg",
    host: { 
      name: "Alex Johnson", 
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
      matchesHosted: 12
    },
    comments: 3,
    status: "available",
    price: "₹200 per person",
    distance: "1.2 km away",
    duration: "2 hours",
    facilities: ["Showers", "Parking", "Cafeteria"]
  },
  {
    id: 2,
    sport: "basketball",
    title: "3v3 Basketball Tournament",
    location: "Downtown Courts",
    time: "Tomorrow 7:30 PM",
    players: "4/6",
    level: "Beginner",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067723/dexciss%20site/dexplay/optimal/pexels-markusspiske-1752757_1_rhbltt.jpg",
    host: { 
      name: "Sarah Wilson", 
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.5,
      matchesHosted: 8
    },
    comments: 1,
    status: "available",
    price: "₹150 per person",
    distance: "2.5 km away",
    duration: "1.5 hours",
    facilities: ["Parking", "Water Cooler"]
  },
  {
    id: 3,
    sport: "tennis",
    title: "Singles Tennis Match",
    location: "Elite Tennis Club",
    time: "Today 5:00 PM",
    players: "1/2",
    level: "Advanced",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067671/dexciss%20site/dexplay/optimal/pexels-pixabay-209977_1_cxaacu.jpg",
    host: { 
      name: "Mike Chen", 
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 4.9,
      matchesHosted: 15
    },
    comments: 0,
    status: "joining",
    price: "₹300 per person",
    distance: "3.1 km away",
    duration: "1 hour",
    facilities: ["Club House", "Equipment Rental"]
  },
  {
    id: 4,
    sport: "cricket",
    title: "Weekend Cricket Game",
    location: "Greenfield Stadium",
    time: "Sat 9:00 AM",
    players: "14/22",
    level: "Casual",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067729/dexciss%20site/dexplay/optimal/pexels-case-originals-3657154_1_cv7jvj.jpg",
    host: { 
      name: "Raj Patel", 
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4.7,
      matchesHosted: 6
    },
    comments: 2,
    status: "available",
    price: "₹250 per person",
    distance: "4.2 km away",
    duration: "4 hours",
    facilities: ["Pavilion", "Sight Screens"]
  }
]

const pastMatches = [
  {
    id: 1,
    sport: "football",
    opponent: "Team Alpha",
    score: "3-2",
    result: "won",
    date: "Feb 10, 2024",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067675/dexciss%20site/dexplay/optimal/pexels-pixabay-46798_1_omyner.jpg",
    performance: "8.5/10",
    highlights: ["2 goals", "1 assist", "90% pass accuracy"],
    venue: "Victory Sports Complex"
  },
  {
    id: 2,
    sport: "basketball",
    opponent: "Court Kings",
    score: "45-52",
    result: "lost",
    date: "Feb 8, 2024",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067723/dexciss%20site/dexplay/optimal/pexels-markusspiske-1752757_1_rhbltt.jpg",
    performance: "7.2/10",
    highlights: ["12 points", "5 rebounds", "3 assists"],
    venue: "Downtown Courts"
  },
  {
    id: 3,
    sport: "tennis",
    opponent: "David Miller",
    score: "6-4, 3-6, 7-5",
    result: "won",
    date: "Feb 5, 2024",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067671/dexciss%20site/dexplay/optimal/pexels-pixabay-209977_1_cxaacu.jpg",
    performance: "9.1/10",
    highlights: ["8 aces", "72% first serve", "15 winners"],
    venue: "Elite Tennis Club"
  }
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
              className="pl-10 h-12 border-gray-200 focus:border-[#D7EE34]"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 border-gray-200 bg-transparent">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

<div className="flex gap-4 overflow-x-auto pb-4 px-1">
  {sports.map((sport) => (
    <motion.div
      key={sport.id}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedSport(sport.id)}
      className="flex-shrink-0 relative w-32 h-32 rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={sport.image}
          alt={sport.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Active matches badge */}
      <div className="absolute top-2 right-2 bg-black/80 text-[#D7EE34] text-xs font-bold px-2 py-1 rounded-full">
        {sport.activeMatches} active
      </div>

      {/* Glass effect title */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
        <div className="text-white font-semibold text-center text-xs">{sport.name}</div>
      </div>

      {/* Selection indicator */}
      {selectedSport === sport.id && (
        <div className="absolute inset-0 border-4 border-[#D7EE34] rounded-2xl pointer-events-none"></div>
      )}
    </motion.div>
  ))}
</div>
      </div>

      {/* Match Type Toggle */}
<div className="px-6 py-4 bg-[#fff] border-b border-[#fff]/30">
  <div className="flex gap-2">
    {["2v2", "5v5", "11v11"].map((type) => (
      <Button
        key={type}
        variant={matchType === type ? "default" : "outline"}
        onClick={() => setMatchType(type)}
        className={`rounded-xl transition-colors duration-200 ${
          matchType === type
            ? "bg-[#D7EE34] hover:bg-[#C6DF29] text-gray-900 border-[#D7EE34] shadow-sm"
            : "border-[#D7EE34]/50 hover:border-[#D7EE34] bg-white/80 hover:bg-[#F8FAE5] text-gray-700"
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
