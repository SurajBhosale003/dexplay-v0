"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const courts = [
  {
    id: 1,
    name: "Elite Sports Complex",
    type: "Multi-Sport",
    rating: 4.8,
    reviews: 124,
    price: "₹500/hour",
    image: "/placeholder.svg?height=200&width=300",
    distance: "2.5 km",
    amenities: ["Parking", "Changing Room", "Equipment Rental"],
    availability: "Available Now",
    sports: ["Football", "Basketball", "Tennis"],
  },
  {
    id: 2,
    name: "Victory Tennis Club",
    type: "Tennis",
    rating: 4.9,
    reviews: 89,
    price: "₹300/hour",
    image: "/placeholder.svg?height=200&width=300",
    distance: "1.8 km",
    amenities: ["Pro Shop", "Coaching", "Floodlights"],
    availability: "3 courts available",
    sports: ["Tennis"],
  },
  {
    id: 3,
    name: "Champions Football Ground",
    type: "Football",
    rating: 4.7,
    reviews: 156,
    price: "₹800/hour",
    image: "/placeholder.svg?height=200&width=300",
    distance: "3.2 km",
    amenities: ["Full Size", "Grass Surface", "Spectator Area"],
    availability: "Booking Fast",
    sports: ["Football"],
  },
]

export default function CourtBooking() {
  const [selectedCourt, setSelectedCourt] = useState<any>(null)
  const [showTimeSlots, setShowTimeSlots] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleCourtSelect = (court: any) => {
    setSelectedCourt(court)
    setShowTimeSlots(true)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Book Courts</h1>
            <p className="text-gray-600">Find and reserve sports venues</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
            <span className="text-sm font-semibold text-gray-700">Balance:</span>
            <span className="text-sm font-bold text-gray-900">₹2,500</span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search courts, sports, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-black"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 border-gray-200 bg-transparent">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Courts List */}
      <div className="px-6 py-6 space-y-6">
        {courts.map((court, index) => (
          <motion.div
            key={court.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="overflow-hidden border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => handleCourtSelect(court)}
            >
              <div className="relative h-48">
                <Image src={court.image || "/placeholder.svg"} alt={court.name} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-900 border-0">{court.availability}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-black/80 text-white border-0">{court.type}</Badge>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{court.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{court.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{court.rating}</span>
                        <span>({court.reviews})</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">{court.price}</div>
                  </div>
                </div>

                {/* Sports Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {court.sports.map((sport) => (
                    <Badge key={sport} variant="outline" className="border-gray-200 text-gray-600 text-xs">
                      {sport}
                    </Badge>
                  ))}
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                  {court.amenities.slice(0, 3).map((amenity) => (
                    <span key={amenity} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                      {amenity}
                    </span>
                  ))}
                  {court.amenities.length > 3 && (
                    <span className="text-xs text-gray-500">+{court.amenities.length - 3} more</span>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Time Slots Modal */}
      {showTimeSlots && selectedCourt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => setShowTimeSlots(false)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-t-3xl max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Available Time Slots</h3>
              <p className="text-gray-600">{selectedCourt.name} • Monday, Feb 13</p>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              {[
                { time: "09:00 - 10:00", price: "₹500", available: true, booked: 2, total: 8 },
                { time: "10:00 - 11:00", price: "₹500", available: true, booked: 0, total: 8 },
                { time: "11:00 - 12:00", price: "₹600", available: true, booked: 1, total: 8 },
                { time: "14:00 - 15:00", price: "₹700", available: true, booked: 3, total: 8 },
                { time: "15:00 - 16:00", price: "₹700", available: true, booked: 5, total: 8 },
                { time: "18:00 - 19:00", price: "₹800", available: false, booked: 8, total: 8 },
              ].map((slot, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 ${
                    slot.available
                      ? "border-gray-200 hover:border-black cursor-pointer"
                      : "border-gray-100 bg-gray-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className={`font-semibold ${slot.available ? "text-gray-900" : "text-gray-400"}`}>
                        {slot.time}
                      </div>
                      <div className="text-sm text-gray-500">
                        {slot.booked}/{slot.total} booked
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`font-bold ${slot.available ? "text-gray-900" : "text-gray-400"}`}>
                      {slot.price}
                    </div>
                    <Button
                      size="sm"
                      disabled={!slot.available}
                      className="bg-black hover:bg-gray-800 text-white disabled:bg-gray-200 disabled:text-gray-400"
                    >
                      {slot.available ? "Book" : "Full"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-100">
              <Button
                onClick={() => setShowTimeSlots(false)}
                className="w-full h-12 bg-black hover:bg-gray-800 text-white"
              >
                Confirm Booking
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
