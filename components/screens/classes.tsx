"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Star, Users, ChevronDown, ChevronUp, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const classes = [
  {
    id: 1,
    title: "Professional Football Training",
    instructor: "Coach Martinez",
    instructorImage: "/placeholder.svg?height=60&width=60",
    rating: 4.9,
    price: "₹2,500/month",
    duration: "90 minutes",
    level: "Intermediate",
    image: "/placeholder.svg?height=200&width=300",
    schedule: "Mon, Wed, Fri",
    time: "6:00 PM - 7:30 PM",
    location: "Victory Sports Complex",
    description:
      "Comprehensive football training covering technical skills, tactical awareness, and physical conditioning.",
    enrolled: 18,
    maxStudents: 25,
    startDate: "March 1, 2024",
    endDate: "March 31, 2024",
    category: "Football",
  },
  {
    id: 2,
    title: "Tennis Masterclass",
    instructor: "Sarah Williams",
    instructorImage: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    price: "₹3,000/month",
    duration: "60 minutes",
    level: "Advanced",
    image: "/placeholder.svg?height=200&width=300",
    schedule: "Tue, Thu, Sat",
    time: "5:00 PM - 6:00 PM",
    location: "Elite Tennis Club",
    description: "Advanced tennis techniques for competitive players looking to excel in tournaments.",
    enrolled: 12,
    maxStudents: 16,
    startDate: "March 5, 2024",
    endDate: "April 5, 2024",
    category: "Tennis",
  },
  {
    id: 3,
    title: "Basketball Fundamentals",
    instructor: "Coach Johnson",
    instructorImage: "/placeholder.svg?height=60&width=60",
    rating: 4.7,
    price: "₹2,000/month",
    duration: "75 minutes",
    level: "Beginner",
    image: "/placeholder.svg?height=200&width=300",
    schedule: "Sat, Sun",
    time: "4:00 PM - 5:15 PM",
    location: "Downtown Courts",
    description: "Learn basketball basics including shooting, dribbling, defense, and team strategies.",
    enrolled: 22,
    maxStudents: 30,
    startDate: "March 2, 2024",
    endDate: "April 2, 2024",
    category: "Basketball",
  },
]

export default function Classes() {
  const [expandedClass, setExpandedClass] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Football", "Basketball", "Tennis", "Cricket"]

  const toggleExpanded = (classId: number) => {
    setExpandedClass(expandedClass === classId ? null : classId)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-100">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Classes & Training</h1>
          <p className="text-gray-600">Professional coaching and skill development</p>
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search classes, instructors, sports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-black"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 border-gray-200 bg-transparent">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 rounded-xl ${
                selectedCategory === category
                  ? "bg-black text-white border-black"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Classes List */}
      <div className="px-6 py-6 space-y-6">
        {classes.map((classItem, index) => (
          <motion.div
            key={classItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="relative h-48">
                <Image
                  src={classItem.image || "/placeholder.svg"}
                  alt={classItem.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-900 border-0">{classItem.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-black/80 text-white border-0">{classItem.level}</Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{classItem.title}</h3>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={classItem.instructorImage || "/placeholder.svg"}
                      alt={classItem.instructor}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{classItem.instructor}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{classItem.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">{classItem.price}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{classItem.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{classItem.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>
                      {classItem.enrolled}/{classItem.maxStudents}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => toggleExpanded(classItem.id)}
                    className="text-gray-600 hover:text-gray-900 p-0 h-auto"
                  >
                    {expandedClass === classItem.id ? (
                      <>
                        Less info <ChevronUp className="w-4 h-4 ml-1" />
                      </>
                    ) : (
                      <>
                        More info <ChevronDown className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                  <Button className="bg-black hover:bg-gray-800 text-white rounded-xl px-6">Enroll Now</Button>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedClass === classItem.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100 pt-4 mt-4 overflow-hidden"
                    >
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">About This Class</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{classItem.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Schedule Details</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {classItem.startDate} - {classItem.endDate}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{classItem.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{classItem.location}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Enrollment</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Students</span>
                                <span className="text-gray-900 font-medium">
                                  {classItem.enrolled}/{classItem.maxStudents}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-black h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${(classItem.enrolled / classItem.maxStudents) * 100}%` }}
                                />
                              </div>
                              <div className="text-xs text-gray-500">
                                {classItem.maxStudents - classItem.enrolled} spots remaining
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
