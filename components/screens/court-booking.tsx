"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Filter, Search, ChevronLeft, ChevronRight, CheckCircle2, PartyPopper, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { courts } from "@/components/objects/Court"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns"

const generateTimeSlots = () => {
  const slots = []
  for (let hour = 0; hour < 24; hour++) {
    const startHour = hour.toString().padStart(2, '0')
    const endHour = (hour + 1).toString().padStart(2, '0')
    slots.push({
      time: `${startHour}:00 - ${endHour}:00`,
      price: hour >= 18 ? "₹800" : hour >= 14 ? "₹700" : hour >= 11 ? "₹600" : "₹500",
      available: Math.random() > 0.3,
      booked: Math.floor(Math.random() * 8),
      total: 8
    })
  }
  return slots
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function CourtBooking() {
  const [selectedCourt, setSelectedCourt] = useState<any>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<any[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const handleCourtSelect = (court: any) => {
    setSelectedCourt(court)
    setShowBookingModal(true)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTimeSlots([])
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(direction === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1))
  }

  const handleBookingConfirmation = () => {
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setShowBookingModal(false)
      setSelectedTimeSlots([])
    }, 2500)
  }

  const toggleTimeSlot = (slot: any) => {
    if (!slot.available) return

    setSelectedTimeSlots(prev => {
      const isSelected = prev.some(s => s.time === slot.time)
      if (isSelected) {
        return prev.filter(s => s.time !== slot.time)
      } else {
        return [...prev, slot]
      }
    })
  }

  const filteredCourts = courts.filter(court =>
    court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    court.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    court.sports.some(sport => sport.toLowerCase().includes(searchQuery.toLowerCase()))
  )
  const timeSlots = generateTimeSlots()

  const formatDate = (date: Date) => {
    return `${weekdays[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const calculateTotalPrice = () => {
    return selectedTimeSlots.reduce((total, slot) => {
      const price = parseInt(slot.price.replace(/[^0-9]/g, ''))
      return total + price
    }, 0)
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
              className="pl-10 h-12 border-gray-200 focus:border-[#D7EE34] focus:ring-[#D7EE34]"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 border-gray-200 bg-transparent hover:border-[#D7EE34]">
            <Filter className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Courts List */}
      <div className="px-6 py-6 space-y-6">
        {filteredCourts.length > 0 ? (
          filteredCourts.map((court, index) => (
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
                    <Badge className="bg-[#D7EE34]/90 text-black border-0">{court.availability}</Badge>
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
                      <Badge key={sport} variant="outline" className="border-[#D7EE34] text-[#D7EE34] text-xs">
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
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No courts found matching your search</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedCourt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] flex items-end"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-900">Book {selectedCourt.name}</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-600 hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                {/* Calendar Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigateMonth('prev')}
                    className="text-gray-600 hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <h4 className="font-semibold text-gray-900">
                    {format(currentMonth, "MMMM yyyy")}
                  </h4>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigateMonth('next')}
                    className="text-gray-600 hover:bg-gray-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekdays.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {monthDays.map((day, i) => (
                    <button
                      key={i}
                      onClick={() => handleDateSelect(day)}
                      className={`h-10 rounded-lg flex items-center justify-center text-sm ${
                        !isSameMonth(day, currentMonth) ? "text-gray-300" :
                        isSameDay(day, selectedDate) ? 
                          "bg-[#D7EE34] text-black font-bold" :
                          "hover:bg-gray-100"
                      }`}
                    >
                      {format(day, "d")}
                    </button>
                  ))}
                </div>
                
                <p className="text-gray-600 mt-4">{formatDate(selectedDate)}</p>
              </div>

              {/* Time Slots */}
              <div className="p-6 space-y-4">
                <h4 className="font-semibold text-gray-900 mb-2">Available Time Slots</h4>
                
                {timeSlots.map((slot, index) => (
                  <motion.div
                    key={index}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                      slot.available
                        ? selectedTimeSlots.some(s => s.time === slot.time)
                          ? "border-[#D7EE34] bg-[#D7EE34]/10"
                          : "border-gray-200 hover:border-[#D7EE34] cursor-pointer"
                        : "border-gray-100 bg-gray-50 cursor-not-allowed"
                    }`}
                    onClick={() => toggleTimeSlot(slot)}
                  >
                    <div className="flex items-center gap-4">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className={`font-semibold ${
                          slot.available ? "text-gray-900" : "text-gray-400"
                        }`}>{slot.time}</div>
                        <div className="text-sm text-gray-500">
                          {slot.booked}/{slot.total} booked
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`font-bold ${
                        slot.available ? "text-gray-900" : "text-gray-400"
                      }`}>{slot.price}</div>
                      <Button
                        size="sm"
                        disabled={!slot.available}
                        className={`${
                          selectedTimeSlots.some(s => s.time === slot.time) ? 
                            "bg-black text-white hover:bg-gray-800" :
                            "bg-[#D7EE34] hover:bg-[#c6df29] text-black"
                        } disabled:bg-gray-200 disabled:text-gray-400`}
                      >
                        {slot.available ? (selectedTimeSlots.some(s => s.time === slot.time) ? "Selected" : "Select") : "Full"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Booking Summary */}
              {selectedTimeSlots.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                  <div className="mb-4 space-y-2">
                    {selectedTimeSlots.map((slot, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{slot.time}:</span>
                        <span className="font-medium">{slot.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mb-4 font-bold">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-lg">₹{calculateTotalPrice()}</span>
                  </div>
                  <Button
                    onClick={handleBookingConfirmation}
                    className="w-full h-12 bg-[#D7EE34] hover:bg-[#c6df29] text-black"
                  >
                    Reserve {selectedTimeSlots.length} slot{selectedTimeSlots.length > 1 ? 's' : ''} - ₹{calculateTotalPrice()}
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-8 rounded-2xl max-w-sm text-center shadow-xl"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 0.6,
                  ease: "backOut"
                }}
                className="flex justify-center mb-4"
              >
                <CheckCircle2 className="w-16 h-16 text-[#D7EE34]" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-2"
              >
                <h3 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h3>
                <p className="text-gray-600 mt-2">Your match has been successfully created</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center mt-6"
              >
                <PartyPopper className="w-8 h-8 text-yellow-400 animate-bounce" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}