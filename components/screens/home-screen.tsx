"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock, Users, TrendingUp, Calendar, Bell, MapPin, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import CreateMatchModal from "@/components/create-match-modal"

const THEME_COLOR = "#D7EE34"

const sports = [
  {
    id: "football",
    name: "Football",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131850/dexciss%20site/dexplay/optimal/700/football_x700/pexels-rethaferguson-3621104_x700_fajqo5.jpg",
    activeMatches: 24,
    nextMatch: "Today 6:00 PM",
  },
  {
    id: "basketball",
    name: "Basketball",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131836/dexciss%20site/dexplay/optimal/700/basketball_x700/pexels-joel-de-leon-227206-934083_x700_dcsdap.jpg",
    activeMatches: 18,
    nextMatch: "Tomorrow 7:30 PM",
  },
  {
    id: "tennis",
    name: "Tennis",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131846/dexciss%20site/dexplay/optimal/700/tennis_x700/pexels-dmytro-1259064-2694942_x700_hnjgd9.jpg",
    activeMatches: 12,
    nextMatch: "Today 5:00 PM",
  },
  {
    id: "cricket",
    name: "Cricket",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131881/dexciss%20site/dexplay/optimal/700/cricket_x700/pexels-lorien-le-poer-trench-2148896580-30387508_x700_nuax9q.jpg",
    activeMatches: 15,
    nextMatch: "Tomorrow 4:00 PM",
  },
  {
    id: "badminton",
    name: "Badminton",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131914/dexciss%20site/dexplay/optimal/700/badminton_x700/pexels-leozhao-5767580_x700_eodbkk.jpg",
    activeMatches: 8,
    nextMatch: "Today 7:00 PM",
  },
  {
    id: "volleyball",
    name: "Volleyball",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131879/dexciss%20site/dexplay/optimal/700/volleyball_x700/pexels-pavel-danilyuk-6203521_x700_wx7rv5.jpg",
    activeMatches: 10,
    nextMatch: "Tomorrow 6:30 PM",
  },
]

 const matches = [
  {
    id: 1,
    title: "Football Match",
    location: "Victory Park",
    dateTime: "Today 6:00 PM",
    status: "Confirmed",
    sport: "football",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131863/dexciss%20site/dexplay/optimal/700/football_x700/pexels-yogendras31-3361471_x700_avsyqv.jpg"
  },
  {
    id: 2,
    title: "Basketball Tournament",
    location: "City Arena",
    dateTime: "Tomorrow 7:30 PM",
    status: "Pending",
    sport: "basketball",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131848/dexciss%20site/dexplay/optimal/700/basketball_x700/pexels-justinianoadriano-1905009_x700_ep6zny.jpg"
  },
  {
    id: 3,
    title: "Tennis Championship",
    location: "Grand Courts",
    dateTime: "Today 5:00 PM",
    status: "Confirmed",
    sport: "tennis",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131840/dexciss%20site/dexplay/optimal/700/tennis_x700/pexels-jim-de-ramos-395808-1277397_x700_bdo9xg.jpg"
  }
];

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
                <stat.icon className="w-5 h-5" style={{ color: THEME_COLOR }} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
              <div className="text-xs font-medium" style={{ color: THEME_COLOR }}>{stat.change}</div>
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
                        className="text-black rounded-lg"
                        style={{ backgroundColor: THEME_COLOR }}
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
<div className="px-6 py-8 bg-gray-50">
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Upcoming Matches</h2>
      <p className="text-gray-500 mt-1">Your scheduled games and tournaments</p>
    </div>
    <Button variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-100">
      <Calendar className="w-4 h-4 mr-2" />
      View Calendar
    </Button>
  </div>

  <div className="space-y-4">
    {matches.map((match) => (
      <Card 
        key={match.id} 
        className="p-0 border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer min-h-[9.5rem] flex" // Changed to min-h
      >
        {/* Image container */}
        <div className="w-32 flex-shrink-0 relative overflow-hidden">
          <Image
            src={match.image}
            alt={match.sport}
            fill
            className="object-cover"
            style={{ objectPosition: 'center center' }}
            sizes="128px"
          />
        </div>
        
        {/* Match details - added more padding and better spacing */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-2"> {/* Added space between title and location */}
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{match.title}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{match.location}</span>
            </div>
          </div>
          
          <div className="mt-3"> {/* Increased margin-top */}
            <div className="flex items-center text-sm text-gray-500 mb-2"> {/* Added margin-bottom */}
              <Clock className="w-4 h-4 mr-1" />
              <span>{match.dateTime}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                match.status === 'Confirmed' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {match.status === 'Confirmed' ? (
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                ) : (
                  <Clock className="w-3 h-3 mr-1" />
                )}
                {match.status}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-gray-900 -mr-2"
              >
                
              </Button>
            </div>
          </div>
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
