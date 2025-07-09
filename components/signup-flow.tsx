"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowRight, User, Calendar, Target, Check } from "lucide-react"
import Image from "next/image"

interface SignupFlowProps {
  onComplete: (userData: any) => void
}

const sports = [
  {
    id: "football",
    name: "Football",
    image: "/placeholder.svg?height=120&width=200",
    participants: "2.1M players",
  },
  {
    id: "basketball",
    name: "Basketball",
    image: "/placeholder.svg?height=120&width=200",
    participants: "1.8M players",
  },
  {
    id: "tennis",
    name: "Tennis",
    image: "/placeholder.svg?height=120&width=200",
    participants: "950K players",
  },
  {
    id: "cricket",
    name: "Cricket",
    image: "/placeholder.svg?height=120&width=200",
    participants: "1.2M players",
  },
  {
    id: "badminton",
    name: "Badminton",
    image: "/placeholder.svg?height=120&width=200",
    participants: "680K players",
  },
  {
    id: "volleyball",
    name: "Volleyball",
    image: "/placeholder.svg?height=120&width=200",
    participants: "520K players",
  },
]

export default function SignupFlow({ onComplete }: SignupFlowProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    interests: [] as string[],
  })
  const [otpCode, setOtpCode] = useState(["", "", "", ""])

  const handleSportToggle = (sportId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(sportId)
        ? prev.interests.filter((id) => id !== sportId)
        : [...prev.interests, sportId],
    }))
  }

  const handleOtpSubmit = () => {
    setTimeout(() => {
      setOtpCode(["1", "2", "3", "4"])
      setTimeout(() => {
        onComplete(formData)
      }, 1000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-black">DexPlay</span>
          </div>
          <div className="text-sm text-gray-500">Step {step} of 3</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="w-full bg-gray-100 rounded-full h-2">
          <motion.div
            className="bg-black h-2 rounded-full"
            initial={{ width: "33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="px-6 flex-1">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="text-center py-8">
                <User className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to DexPlay</h2>
                <p className="text-gray-600 text-lg">Let's set up your profile</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wide">
                    Full Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="h-14 text-lg border-2 border-gray-200 focus:border-black rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wide">Age</label>
                  <Input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                    placeholder="Your age"
                    className="h-14 text-lg border-2 border-gray-200 focus:border-black rounded-xl"
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.age}
                className="w-full h-14 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl text-lg mt-12"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="text-center py-8">
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Sports</h2>
                <p className="text-gray-600 text-lg">Select the sports you're interested in</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {sports.map((sport) => (
                  <motion.div key={sport.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      className={`p-0 cursor-pointer transition-all duration-200 ${
                        formData.interests.includes(sport.id)
                          ? "ring-2 ring-black shadow-lg"
                          : "hover:shadow-md border-gray-200"
                      }`}
                      onClick={() => handleSportToggle(sport.id)}
                    >
                      <div className="flex items-center p-4">
                        <div className="relative w-20 h-16 rounded-lg overflow-hidden mr-4">
                          <Image
                            src={sport.image || "/placeholder.svg"}
                            alt={sport.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg">{sport.name}</h3>
                          <p className="text-gray-500 text-sm">{sport.participants}</p>
                        </div>
                        {formData.interests.includes(sport.id) && <Check className="w-6 h-6 text-black" />}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={() => setStep(3)}
                disabled={formData.interests.length === 0}
                className="w-full h-14 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl text-lg"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Verify Phone</h2>
                <p className="text-gray-600 text-lg">Enter the 4-digit code sent to your phone</p>
              </div>

              <div className="flex justify-center gap-4">
                {otpCode.map((digit, index) => (
                  <Input
                    key={index}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otpCode]
                      newOtp[index] = e.target.value.slice(-1)
                      setOtpCode(newOtp)
                    }}
                    className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-200 focus:border-black rounded-xl"
                    maxLength={1}
                  />
                ))}
              </div>

              <Button
                onClick={handleOtpSubmit}
                className="w-full h-14 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl text-lg"
              >
                Verify & Continue
              </Button>

              <p className="text-center text-sm text-gray-500">Code will auto-fill in 2 seconds...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
