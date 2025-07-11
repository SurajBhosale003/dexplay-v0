"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Clock, MapPin, MessageCircle, Filter, Search, CheckCircle2, UserPlus, Star, Trophy } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const THEME_COLOR = '#D7EE34'

const sports = [
  {
    id: "football",
    name: "Football",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131774/dexciss%20site/dexplay/optimal/400/football_x400/pexels-yogendras31-1375148_x400_ydhxik.jpg",
    activeMatches: 24,
  },
  {
    id: "basketball",
    name: "Basketball",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067723/dexciss%20site/dexplay/optimal/pexels-markusspiske-1752757_1_rhbltt.jpg",
    activeMatches: 18,
  },
  {
    id: "tennis",
    name: "Tennis",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067671/dexciss%20site/dexplay/optimal/pexels-pixabay-209977_1_cxaacu.jpg",
    activeMatches: 12,
  },{
    id: "cricket",
    name: "Cricket",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067729/dexciss%20site/dexplay/optimal/pexels-case-originals-3657154_1_cv7jvj.jpg",
    activeMatches: 15,
    
  },
  {
    id: "badminton",
    name: "Badminton",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067735/dexciss%20site/dexplay/optimal/pexels-vladvictoria-2202685_1_ydqoy4.jpg",
    activeMatches: 8,
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
      name: "Aarav Mehta",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp",
      rating: 4.8
    },
    comments: 3,
    status: "available",
    price: "₹200 per person",
    distance: "1.2 km away",
    slots: [
      { status: "filled", player: { name: "Aarav", level: "Intermediate" } },
      { status: "filled", player: { name: "Riya", level: "Advanced" } },
      { status: "filled" },
      { status: "available" },
      { status: "available" }
    ]
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
      name: "Ananya Rao",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217771/People%20Profile/images_1_myv2ze.jpg",
      rating: 4.5
    },
    comments: 1,
    status: "available",
    price: "₹150 per person",
    distance: "2.5 km away",
    slots: [
      { status: "available" },
      { status: "available" },
      { status: "available" }
    ]
  },
  {
    id: 3,
    sport: "tennis",
    title: "Singles Tennis",
    location: "Elite Tennis Club",
    time: "Today 5:00 PM",
    players: "1/2",
    level: "Advanced",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067671/dexciss%20site/dexplay/optimal/pexels-pixabay-209977_1_cxaacu.jpg",
    host: {
      name: "Mehul Sinha",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217658/People%20Profile/images_veqgag.jpg",
      rating: 4.9
    },
    comments: 0,
    status: "joining",
    price: "₹300 per person",
    distance: "3.1 km away",
    slots: [
      { status: "filled", player: { name: "Mehul", level: "Advanced" } },
      { status: "available" }
    ]
  },
  {
    id: 4,
    sport: "cricket",
    title: "Gully Cricket Knockout",
    location: "Greenfield Arena",
    time: "Today 4:00 PM",
    players: "10/12",
    level: "Intermediate",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067729/dexciss%20site/dexplay/optimal/pexels-case-originals-3657154_1_cv7jvj.jpg",
    host: {
      name: "Ritika Singh",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217768/People%20Profile/0bdbc7e1f21b705d25b7f81873810086_wurlmo.jpg",
      rating: 4.7
    },
    comments: 4,
    status: "available",
    price: "₹100 per person",
    distance: "0.8 km away",
    slots: [
      { status: "filled", player: { name: "Ritika", level: "Intermediate" } },
      { status: "filled", player: { name: "Neha", level: "Beginner" } },
      { status: "filled" },
      { status: "available" },
      { status: "available" }
    ]
  },
  {
    id: 5,
    sport: "volleyball",
    title: "Beach Volleyball",
    location: "Marine Drive Sand Courts",
    time: "Tomorrow 8:00 AM",
    players: "6/8",
    level: "Beginner",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067752/dexciss%20site/dexplay/optimal/pexels-jim-de-ramos-1263349_1_fnfz1k.jpg",
    host: {
      name: "Karthik Das",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217664/People%20Profile/57dbffd654e3580d51e60e451c5850f9_hhipp8.jpg",
      rating: 4.6
    },
    comments: 2,
    status: "available",
    price: "₹180 per person",
    distance: "5.2 km away",
    slots: [
      { status: "filled", player: { name: "Karthik", level: "Beginner" } },
      { status: "available" },
      { status: "available" },
      { status: "available" }
    ]
  },
  {
    id: 6,
    sport: "badminton",
    title: "Doubles Badminton Match",
    location: "Smash Arena",
    time: "Today 9:00 PM",
    players: "2/4",
    level: "Intermediate",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067735/dexciss%20site/dexplay/optimal/pexels-vladvictoria-2202685_1_ydqoy4.jpg",
    host: {
      name: "Priya Nair",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217662/People%20Profile/pm0476_w0_dfthen.avif",
      rating: 4.4
    },
    comments: 2,
    status: "available",
    price: "₹220 per person",
    distance: "2.1 km away",
    slots: [
      { status: "filled", player: { name: "Priya", level: "Intermediate" } },
      { status: "available" },
      { status: "available" }
    ]
  },{
    id: 7,
    sport: "football",
    title: "Super Sunday Match",
    location: "Champions Arena",
    time: "Sunday 4:00 PM",
    players: "9/10",
    level: "Beginner",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131772/dexciss%20site/dexplay/optimal/400/football_x400/pexels-rethaferguson-3621104_x400_fwav4h.jpg",
    host: {
      name: "Priya Nair",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217662/People%20Profile/pm0476_w0_dfthen.avif",
      rating: 4.5
    },
    comments: 4,
    status: "available",
    price: "₹190 per person",
    distance: "2.2 km away",
    slots: [
      { status: "filled", player: { name: "Priya", level: "Beginner" } },
      { status: "filled", player: { name: "Manish", level: "Beginner" } },
      { status: "available" },
      { status: "available" },
      { status: "available" }
    ]
  },{
    id: 8,
    sport: "football",
    title: "Weekend Football Bash",
    location: "Skyline Arena",
    time: "Tomorrow 5:00 PM",
    players: "6/10",
    level: "Beginner",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131766/dexciss%20site/dexplay/optimal/400/football_x400/pexels-yogendras31-3361471_x400_y1b45n.jpg",
    host: {
      name: "Neha Sharma",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217771/People%20Profile/images_1_myv2ze.jpg",
      rating: 4.6
    },
    comments: 1,
    status: "available",
    price: "₹150 per person",
    distance: "2.0 km away",
    slots: [
      { status: "filled", player: { name: "Neha", level: "Beginner" } },
      { status: "filled" },
      { status: "available" },
      { status: "available" },
      { status: "available" }
    ]
  },
  {
    id: 9,
    sport: "football",
    title: "Morning Turf Battle",
    location: "Elite Ground 2",
    time: "Today 7:00 AM",
    players: "10/10",
    level: "Advanced",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131770/dexciss%20site/dexplay/optimal/400/football_x400/pexels-bohlemedia-1884576_x400_kwsrjq.jpg",
    host: {
      name: "Ritika Singh",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217768/People%20Profile/0bdbc7e1f21b705d25b7f81873810086_wurlmo.jpg",
      rating: 4.9
    },
    comments: 5,
    status: "joining",
    price: "₹250 per person",
    distance: "0.9 km away",
    slots: [
      { status: "filled", player: { name: "Ritika", level: "Advanced" } },
      { status: "filled", player: { name: "Kiran", level: "Intermediate" } },
      { status: "filled" },
      { status: "filled" },
      { status: "filled" }
    ]
  },
  {
    id: 10,
    sport: "football",
    title: "Friday Night Lights",
    location: "Downtown Mini Ground",
    time: "Friday 8:30 PM",
    players: "7/10",
    level: "Intermediate",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067675/dexciss%20site/dexplay/optimal/pexels-pixabay-46798_1_omyner.jpg",
    host: {
      name: "Karthik Das",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217664/People%20Profile/57dbffd654e3580d51e60e451c5850f9_hhipp8.jpg",
      rating: 4.7
    },
    comments: 2,
    status: "available",
    price: "₹180 per person",
    distance: "3.4 km away",
    slots: [
      { status: "filled", player: { name: "Karthik", level: "Intermediate" } },
      { status: "available" },
      { status: "available" },
      { status: "available" },
      { status: "available" }
    ]
  },
  {
    id: 11,
    sport: "football",
    title: "Late Night Showdown",
    location: "Arena 9",
    time: "Tonight 10:30 PM",
    players: "5/10",
    level: "Intermediate",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067675/dexciss%20site/dexplay/optimal/pexels-pixabay-46798_1_omyner.jpg",
    host: {
      name: "Mehul Sinha",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217658/People%20Profile/images_veqgag.jpg",
      rating: 4.4
    },
    comments: 0,
    status: "available",
    price: "₹160 per person",
    distance: "1.5 km away",
    slots: [
      { status: "filled", player: { name: "Mehul", level: "Intermediate" } },
      { status: "filled" },
      { status: "available" },
      { status: "available" },
      { status: "available" }
    ]
  }
];


const pastMatches = [
  {
    id: 1,
    sport: "football",
    opponent: "Team Alpha",
    score: "3-2",
    result: "won",
    date: "Feb 10, 2024",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067675/dexciss%20site/dexplay/optimal/pexels-pixabay-46798_1_omyner.jpg",
    performance: "8.5/10"
  },
  {
    id: 2,
    sport: "basketball",
    opponent: "Court Kings",
    score: "45-52",
    result: "lost",
    date: "Feb 8, 2024",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067723/dexciss%20site/dexplay/optimal/pexels-markusspiske-1752757_1_rhbltt.jpg",
    performance: "7.2/10"
  }
]

export default function QuickMatch() {
  const [selectedSport, setSelectedSport] = useState("football")
  const [matchType, setMatchType] = useState("5v5")
  const [searchQuery, setSearchQuery] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<any>(null)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)

  const filteredMatches = matches.filter(match => 
    match.sport === selectedSport && 
    match.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSlotClick = (match: any, slotIndex: number) => {
    if (match.slots[slotIndex].status === "available") {
      setSelectedMatch(match)
      setSelectedSlot(slotIndex)
      setShowConfirmation(true)
    }
  }

  const confirmBooking = () => {
    // In a real app, you would update the state or make an API call here
    setShowConfirmation(false)
  }

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
              className="pl-10 h-12 border-gray-200 focus:border-[#D7EE34] focus:ring-[#D7EE34]"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 border-gray-200 bg-transparent hover:border-[#D7EE34]">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Sport Selection */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1">
          {sports.map((sport) => (
            <motion.div
              key={sport.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSport(sport.id)}
              className={`flex-shrink-0 relative w-32 h-32 rounded-2xl overflow-hidden cursor-pointer ${
                selectedSport === sport.id ? 'ring-4 ring-[#D7EE34]' : ''
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={sport.image}
                  alt={sport.name}
                  fill
                  className="object-cover"
                  sizes="128px"
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
                <div className="text-white font-semibold text-center">{sport.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Match Type Toggle */}
      <div className="px-6 py-4 bg-[#F8FAE5] border-b border-[#D7EE34]/30">
        <div className="flex gap-2">
          {["2v2", "5v5", "11v11"].map((type) => (
            <Button
              key={type}
              variant={matchType === type ? "default" : "outline"}
              onClick={() => setMatchType(type)}
              className={`rounded-xl ${
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
          {filteredMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="rounded-2xl overflow-hidden border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="grid grid-cols-2 p-4 gap-4">
                  {/* Div 1 - Left Side: Image */}
                  <div className="rounded-xl border border-gray-200 p-2">
                    <Image
                      src={match.image}
                      alt={match.sport}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>

                  {/* Div 2 - Right Side: Slot selection */}
                  <div className="flex flex-col justify-between">
                    <div className="text-right text-sm font-semibold text-black mb-2">Slot Selector</div>
                    <div className="grid grid-cols-3 gap-2">
                      {match.slots.map((slot, index) => (
                        <motion.div
                          key={index}
                          whileTap={{ scale: slot.status === "available" ? 0.95 : 1 }}
                          onClick={() => handleSlotClick(match, index)}
                          className={`w-full aspect-square rounded-lg flex items-center justify-center text-center text-xs ${
                            slot.status === "available"
                              ? "bg-[#D7EE34]/20 border border-[#D7EE34] cursor-pointer hover:bg-[#D7EE34]/30"
                              : "bg-gray-100"
                          }`}
                        >
                          {slot.status === "available" ? (
                            <UserPlus className="w-5 h-5 text-[#D7EE34]" />
                          ) : slot.player ? (
                            <div>
                              <div className="font-medium">{slot.player.name}</div>
                              <div className="text-gray-500">{slot.player.level}</div>
                            </div>
                          ) : (
                            <div className="text-gray-500">Reserved</div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Div 3 - Title and other details */}
                <div className="px-4 pb-4">
                  <div className="rounded-xl border border-gray-300 p-3">
                    <div className="font-semibold text-lg mb-1 text-black">{match.title}</div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{match.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{match.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Div 4 - Footer: Avatar, Host & Join Button */}
                <div className="flex justify-between items-center bg-[#D7EE34] px-4 py-3 rounded-b-2xl">
                  {/* Host Avatar and Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={match.host.avatar}
                        alt={match.host.name}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="text-sm font-medium text-black">{match.host.name}</div>
                  </div>
                  {/* Join Match Button */}
                  <Button
                    size="sm"
                    onClick={() => handleSlotClick(match, index)}
                    className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm"
                  >
                    {match.status === "joining" ? "Joined" : "Join Match"}
                  </Button>
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
            <Button className="bg-[#D7EE34] hover:bg-[#C6DF29] text-gray-900">Browse Matches</Button>
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
                          src={match.image}
                          alt={match.sport}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 capitalize">{match.sport}</h3>
                        <p className="text-sm text-gray-600">vs {match.opponent}</p>
                        <p className="text-xs text-gray-500">{match.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{match.score}</div>
                      <div className="flex items-center justify-end gap-2">
                        <Badge
                          className={
                            match.result === "won"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {match.result === "won" ? "Victory" : "Defeat"}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-600">
                          <Trophy className="w-4 h-4 text-yellow-500 mr-1" />
                          {match.performance}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Booking Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && selectedMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="w-12 h-12 text-[#D7EE34]" />
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                  Match Confirmed!
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  You've successfully joined the {selectedMatch.title}
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedMatch.time}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{selectedMatch.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">{selectedMatch.price}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-[#D7EE34] hover:bg-[#C6DF29] text-gray-900"
                  onClick={confirmBooking}
                >
                  Got it!
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}