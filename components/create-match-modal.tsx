"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"

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

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"]

export default function CreateMatchModal({ sport, onClose }: CreateMatchModalProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("intermediate")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Create Match</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Sport Header */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="w-16 h-16 rounded-xl overflow-hidden">
              <Image
                src={sport.image || "/placeholder.svg"}
                alt={sport.name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{sport.name}</h3>
              <p className="text-gray-600">Create a new match</p>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-4 block uppercase tracking-wide">
              Skill Level
            </label>
            <div className="grid grid-cols-2 gap-3">
              {difficulties.map((diff) => (
                <Button
                  key={diff.id}
                  variant={selectedDifficulty === diff.id ? "default" : "outline"}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`h-auto p-4 flex-col items-start text-left ${
                    selectedDifficulty === diff.id
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-semibold">{diff.name}</div>
                  <div className="text-xs opacity-80">{diff.description}</div>
                </Button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-4 block uppercase tracking-wide">
              <Calendar className="w-4 h-4 inline mr-2" />
              Select Date
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["Today", "Tomorrow", "This Weekend"].map((date) => (
                <Button
                  key={date}
                  variant={selectedDate === date ? "default" : "outline"}
                  onClick={() => setSelectedDate(date)}
                  className={`h-12 ${
                    selectedDate === date ? "bg-black text-white border-black" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {date}
                </Button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-4 block uppercase tracking-wide">
              <Clock className="w-4 h-4 inline mr-2" />
              Time Slot
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className={`h-10 text-sm ${
                    selectedTime === time ? "bg-black text-white border-black" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <div>
                <div className="font-semibold text-gray-900">Victory Sports Complex</div>
                <div className="text-sm text-gray-600">Downtown • 2.5 km away</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-100 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-12 border-gray-200 hover:border-gray-300 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            disabled={!selectedDate || !selectedTime}
            className="flex-1 h-12 bg-black hover:bg-gray-800 text-white"
          >
            Create Match
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
