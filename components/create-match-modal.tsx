"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Calendar, Clock, MapPin, ChevronLeft, ChevronRight, CheckCircle2, PartyPopper } from "lucide-react"
import Image from "next/image"
import { format, addDays, isToday, isTomorrow, isWeekend, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns"

interface CreateMatchModalProps {
  sport: any
  onClose: () => void
}

const difficulties = [
  { id: "beginner", name: "Beginner", description: "New to the sport" },
  { id: "intermediate", name: "Intermediate", description: "Some experience" },
  { id: "advanced", name: "Advanced", description: "Experienced player" },
  { id: "professional", name: "Professional", description: "Competitive level" },
]

const courts = [
  {
    id: 1,
    name: "Victory Sports Complex",
    distance: "2.5 km",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131842/dexciss%20site/dexplay/optimal/700/football_x700/pexels-lucasallmann-1378425_x700_dv2wsu.jpg",
    slots: [8, 10, 12, 14, 16, 18, 20],
    participants: "12 players booked"
  },
  {
    id: 2,
    name: "Champions Arena",
    distance: "3.8 km",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131829/dexciss%20site/dexplay/optimal/700/football_x700/pexels-bohlemedia-1884576_x700_euwmud.jpg",
    slots: [9, 11, 13, 15, 17, 19],
    participants: "8 players booked"
  }
]

const timeSlots = Array.from({ length: 14 }, (_, i) => i + 8) // 8AM to 9PM

export default function CreateMatchModal({ sport, onClose }: CreateMatchModalProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("intermediate")
  const [selectedTimes, setSelectedTimes] = useState<number[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedCourt, setSelectedCourt] = useState<any>(null)
  const [showCourtSelect, setShowCourtSelect] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTimes([])
  }

  const handleTimeSelect = (hour: number) => {
    setSelectedTimes(prev => 
      prev.includes(hour) 
        ? prev.filter(h => h !== hour)
        : [...prev, hour]
    )
  }

  const handleCourtSelect = (court: any) => {
    setSelectedCourt(court)
    setShowCourtSelect(false)
  }

  const handleBooking = () => {
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      // Reset all selections
      setSelectedTimes([])
      setSelectedDate(new Date())
      setSelectedCourt(null)
      setSelectedDifficulty("intermediate")
      // Close modal after animation
      onClose()
    }, 2500)
  }

  const formatHour = (hour: number) => {
    return hour > 12 ? `${hour - 12} PM` : `${hour} AM`
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(direction === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1))
  }

  return (
    <AnimatePresence>
      {/* Success Animation */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center"
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

      {/* Main Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[99] flex items-end sm:items-center justify-center p-0"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
            <h2 className="text-2xl font-bold text-gray-900">Create Match</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </Button>
          </div>

          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
            {/* Sport Header - Football Style */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="relative h-48 rounded-2xl overflow-hidden cursor-pointer border-2 border-[#D7EE34] shadow-[0_0_0_4px_#d7ee3444]"
            >
              <Image
                src={sport.image || "/placeholder.svg"}
                alt={sport.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-xl">{sport.name}</h3>
                <p className="text-white text-sm">Create your match</p>
              </div>
            </motion.div>

            {/* Difficulty Selection */}
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-2 block uppercase tracking-wider">
                Skill Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                {difficulties.map((diff) => (
                  <Button
                    key={diff.id}
                    variant={selectedDifficulty === diff.id ? "default" : "outline"}
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className={`h-auto py-3 flex-col items-start text-left rounded-xl ${
                      selectedDifficulty === diff.id
                        ? "bg-[#D7EE34] text-black border-[#D7EE34] shadow-sm hover:bg-[#c6df29] hover:border-[#c6df29]"
                        : "border-gray-200 hover:border-[#D7EE34] bg-white"
                    }`}
                  >
                    <div className="font-semibold text-sm">{diff.name}</div>
                    <div className="text-xs opacity-80 mt-1">{diff.description}</div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Full Calendar */}
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-2 block uppercase tracking-wider">
                Select Date
              </label>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigateMonth('prev')}
                    className="rounded-full hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </Button>
                  <h3 className="font-semibold text-gray-900">
                    {format(currentMonth, "MMMM yyyy")}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigateMonth('next')}
                    className="rounded-full hover:bg-gray-100"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
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
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Available Slots
                </label>
                <button 
                  onClick={() => setShowCourtSelect(true)}
                  className="text-xs font-medium text-gray-600 hover:text-black flex items-center gap-1"
                >
                  <span>Change Court</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
                <div className="grid grid-cols-3 gap-2">
                {(selectedCourt?.slots || timeSlots).map((hour) => {
                  // Validate hour is a number
                  if (typeof hour !== 'number' || isNaN(hour)) {
                    console.error('Invalid hour value:', hour);
                    return null; // Skip rendering this slot
                  }

                  // Validate hour is within reasonable bounds (0-23)
                  if (hour < 0 || hour > 23) {
                    console.warn(`Hour value ${hour} is outside valid range (0-23)`);
                    return null; // Skip rendering this slot
                  }

                  // Format the hour for display
                  const displayTime = hour > 12 
                    ? `${hour - 12} PM` 
                    : hour === 12 
                      ? '12 PM' 
                      : hour === 0 
                        ? '12 AM' 
                        : `${hour} AM`;

                  return (
                    <motion.button
                      key={`time-slot-${hour}`} // More specific key
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTimeSelect(hour)}
                      className={`h-12 rounded-lg border flex items-center justify-center text-sm ${
                        selectedTimes.includes(hour)
                          ? "bg-[#D7EE34] text-black border-[#D7EE34] font-medium"
                          : "border-gray-200 hover:border-[#D7EE34] bg-white"
                      }`}
                      aria-label={`Select time at ${displayTime}`}
                    >
                      {displayTime}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Selected Court */}
            {selectedCourt && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-gray-50 rounded-2xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                    <Image
                      src={selectedCourt.image}
                      alt={selectedCourt.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{selectedCourt.name}</div>
                    <div className="text-xs text-gray-600">{selectedCourt.distance} away</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Terms and Conditions - Always Visible */}
            <div className="pt-2">
              <div className="text-xs text-gray-500">
                <h4 className="font-semibold text-gray-700 mb-2">Terms & Conditions</h4>
                <ul className="space-y-1">
                  <li>• Minimum 2 players required to create a match</li>
                  <li>• Payment will be charged immediately</li>
                  <li>• Cancellations must be made 24 hours in advance for full refund</li>
                  <li>• Late arrivals may result in reduced playing time</li>
                  <li>• All bookings are subject to venue availability</li>
                  <li>• Proper sports attire required at all facilities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 border-gray-200 hover:border-[#D7EE34] bg-white rounded-xl"
            >
              Cancel
            </Button>
            <Button
              disabled={!selectedDate || selectedTimes.length === 0}
              onClick={handleBooking}
              className={`flex-1 h-12 rounded-xl ${
                selectedTimes.length > 0 
                  ? "bg-[#D7EE34] hover:bg-[#c6df29] text-black"
                  : "bg-black hover:bg-gray-800 text-white"
              }`}
            >
              {selectedTimes.length > 0 ? (
                <span>Book {selectedTimes.length} Slot{selectedTimes.length > 1 ? 's' : ''}</span>
              ) : (
                <span>Create Match</span>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Court Selection Modal */}
      {showCourtSelect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-0"
          onClick={() => setShowCourtSelect(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Select Court</h3>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto scrollbar-hide">
              {courts.map((court) => (
                <motion.div
                  key={court.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCourtSelect(court)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedCourt?.id === court.id
                      ? "border-[#D7EE34] bg-[#D7EE34]/10"
                      : "border-gray-200 hover:border-[#D7EE34]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden relative">
                      <Image
                        src={court.image}
                        alt={court.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{court.name}</h4>
                      <p className="text-sm text-gray-600">{court.distance} away</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {court.slots.slice(0, 3).map((hour) => (
                          <span key={hour} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {formatHour(hour)}
                          </span>
                        ))}
                        {court.slots.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{court.slots.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    {selectedCourt?.id === court.id && (
                      <div className="ml-auto bg-[#D7EE34] p-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-black" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-100">
              <Button
                onClick={() => setShowCourtSelect(false)}
                className="w-full h-12 bg-[#D7EE34] hover:bg-[#c6df29] text-black rounded-xl"
              >
                Confirm Selection
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}