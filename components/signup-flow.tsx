"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowRight, User, Calendar, Target, Check } from "lucide-react"
import Image from "next/image"
import { RoundLockPerson } from "@/components/svg/RoundLockPerson"
interface SignupFlowProps {
  onComplete: (userData: any) => void
}

const sports = [
  {
    id: "football",
    name: "Football",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067675/dexciss%20site/dexplay/optimal/pexels-pixabay-46798_1_omyner.jpg",
    participants: "2.1M players",
  },
  {
    id: "basketball",
    name: "Basketball",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067723/dexciss%20site/dexplay/optimal/pexels-markusspiske-1752757_1_rhbltt.jpg",
    participants: "1.8M players",
  },
  {
    id: "tennis",
    name: "Tennis",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067671/dexciss%20site/dexplay/optimal/pexels-pixabay-209977_1_cxaacu.jpg",
    participants: "950K players",
  },
  {
    id: "cricket",
    name: "Cricket",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067729/dexciss%20site/dexplay/optimal/pexels-case-originals-3657154_1_cv7jvj.jpg",
    participants: "1.2M players",
  },
  {
    id: "badminton",
    name: "Badminton",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067735/dexciss%20site/dexplay/optimal/pexels-vladvictoria-2202685_1_ydqoy4.jpg",
    participants: "680K players",
  },
  {
    id: "volleyball",
    name: "Volleyball",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752067714/dexciss%20site/dexplay/optimal/pexels-pavel-danilyuk-6203514_1_lqgfrd.jpg",
    participants: "520K players",
  },
]

export default function SignupFlow({ onComplete }: SignupFlowProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    gender: "",
    level: "",
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
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <img src="/transpernt/onlylogo-white.png" />
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
            className="bg-[#D7EE34] h-2 rounded-full"
            initial={{ width: "33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="px-6 flex-1 mb-[5vh]">
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
                <User className="w-16 h-16 text-[#D7EE34] mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-2">Welcome to DexPlay</h2>
                <p className="text-gray-600 text-lg">Let’s set up your profile</p>
              </div>

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="text-sm font-semibold text-gray-800 mb-2 block uppercase tracking-wide">
                    Full Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="h-14 text-lg border-2 border-gray-300 focus:border-[#D7EE34] rounded-xl"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="text-sm font-semibold text-gray-800 mb-2 block uppercase tracking-wide">Age</label>
                  <Input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                    placeholder="Your age"
                    className="h-14 text-lg border-2 border-gray-300 focus:border-[#D7EE34] rounded-xl"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-sm font-semibold text-gray-800 mb-2 block uppercase tracking-wide">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                    className="h-14 text-lg border-2 border-gray-300 focus:border-[#D7EE34] rounded-xl"
                  />
                </div>
                {/* Gender & Game Level Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Gender */}
                  <div>
                    <label className="text-base font-semibold text-gray-900 block mb-4">Your gender</label>
                    <div className="flex gap-4">
                      {['Male', 'Female'].map((gender) => (
                        <label
                          key={gender}
                          className={`flex items-center px-4 py-2 rounded-full border-2 cursor-pointer transform transition-all duration-300 ease-in-out
                            ${
                              formData.gender === gender
                                ? 'bg-[#D7EE34] border-[#D7EE34] text-black scale-[1.03] shadow-md'
                                : 'border-gray-300 text-gray-700 hover:border-[#D7EE34] hover:scale-[1.02]'
                            }`}
                          onClick={() => setFormData((prev) => ({ ...prev, gender }))}
                        >
                          <input
                            type="radio"
                            name="gender"
                            checked={formData.gender === gender}
                            onChange={() => setFormData((prev) => ({ ...prev, gender }))}
                            className="hidden"
                          />
                          <span className="transition-all duration-300 ease-in-out">{gender}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Game Level */}
                  <div>
                    <label className="text-base font-semibold text-gray-900 block mb-4">Your game level</label>
                    <div className="flex flex-wrap gap-4">
                      {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                        <label
                          key={level}
                          className={`flex items-center px-4 py-2 rounded-full border-2 cursor-pointer transform transition-all duration-300 ease-in-out
                            ${
                              formData.level === level
                                ? 'bg-[#D7EE34] border-[#D7EE34] text-black scale-[1.03] shadow-md'
                                : 'border-gray-300 text-gray-700 hover:border-[#D7EE34] hover:scale-[1.02]'
                            }`}
                          onClick={() => setFormData((prev) => ({ ...prev, level }))}
                        >
                          <input
                            type="radio"
                            name="level"
                            checked={formData.level === level}
                            onChange={() => setFormData((prev) => ({ ...prev, level }))}
                            className="hidden"
                          />
                          <span className="transition-all duration-300 ease-in-out">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Professional Level with description */}
                <div className="mt-6">
                  <label
                    className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transform transition-all duration-300 ease-in-out
                      ${
                        formData.level === 'Professional'
                          ? 'bg-[#D7EE34] border-[#D7EE34] text-black scale-[1.02] shadow-md'
                          : 'border-gray-300 hover:border-[#D7EE34] hover:scale-[1.01]'
                      }`}
                    onClick={() => setFormData((prev) => ({ ...prev, level: 'Professional' }))}
                  >
                    <input
                      type="radio"
                      name="level"
                      checked={formData.level === 'Professional'}
                      onChange={() => setFormData((prev) => ({ ...prev, level: 'Professional' }))}
                      className="hidden"
                    />
                    <div className="text-sm text-gray-800 transition-all duration-300 ease-in-out">
                      Professional
                      <p className="text-xs text-gray-600 mt-1 leading-snug">
                        Who plays in worldwide tournaments and is ranked, has a full-time coach,
                        and has mastered all aspects of the game and its techniques.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.age || !formData.phone || !formData.gender || !formData.level}
                className="w-full h-14 bg-[#000] hover:bg-[#c6e325] text-white font-semibold rounded-xl text-lg mt-8 transition"
              >
                Continue
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
                {/* <img src="/transpernt/football-black.png" class=""/> */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Sports</h2>
                <p className="text-gray-600 text-lg">Select the sports you're interested in</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {sports.map((sport) => {
                  const isSelected = formData.interests.includes(sport.id)
                  return (
                    <motion.div
                      key={sport.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          interests: prev.interests.includes(sport.id)
                            ? prev.interests.filter((id) => id !== sport.id)
                            : [...prev.interests, sport.id],
                        }))
                      }
                      className={`relative h-40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                        isSelected ? "border-[#D7EE34] shadow-[0_0_0_4px_#d7ee3444]" : "border-gray-200 hover:border-[#D7EE34]"
                      }`}
                    >
                      <Image
                        src={sport.image || "/placeholder.svg"}
                        alt={sport.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
                        <h3 className="text-white font-bold text-lg">{sport.name}</h3>
                        <p className="text-white text-sm">{sport.participants}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-[#D7EE34] p-1 rounded-full">
                          <Check className="w-5 h-5 text-black" />
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
              <Button
                onClick={() => setStep(3)}
                disabled={formData.interests.length === 0}
                className="w-full h-14 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl text-lg"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-10 relative"
            >
              {/* Decorative Background Glow */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 blur-3xl opacity-30 w-60 h-60 bg-[#D7EE34] rounded-full z-0 pointer-events-none" />

              {/* Header */}
              <div className="text-center py-8 z-10 relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <Calendar className="w-16 h-16 text-[#D7EE34] mx-auto mb-6" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-gray-900 mb-2"
                >
                  Verify Your Phone
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 text-base"
                >
                  We’ve sent a 4-digit code to your mobile number
                </motion.p>
              </div>

              {/* OTP Inputs */}
              <div className="flex justify-center gap-4 z-10 relative">
                {otpCode.map((digit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Input
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otpCode]
                        newOtp[index] = e.target.value.slice(-1)
                        setOtpCode(newOtp)
                      }}
                      className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 focus:border-[#D7EE34] focus:ring-2 focus:ring-[#D7EE34] transition duration-300 rounded-xl shadow-sm"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Submit Button */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="z-10 relative">
                <Button
                  onClick={handleOtpSubmit}
                  className="w-full h-14 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl text-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Verify & Continue
                </Button>
              </motion.div>

              {/* Code auto-fill hint */}
              <motion.p
                className="text-center text-sm text-gray-500 z-10 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Code will auto-fill in a few seconds...
              </motion.p>

              {/* Resend Link + Lock icon */}
              <motion.div
                className="text-center text-sm text-gray-500 z-10 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Didn’t receive it?{" "}
                <span className="text-[#D7EE34] font-medium cursor-pointer hover:underline transition">Resend</span>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#D7EE34] color-[#D7EE34]">
                  <RoundLockPerson/>
                  Your info is safe & encrypted
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
