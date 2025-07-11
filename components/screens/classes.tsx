"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Star, Users, ChevronDown, ChevronUp, Filter, Search, X, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns"

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
    image: "https://cdn01.alison-static.net/courses/5931/alison_courseware_intro_5931.jpg",
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
    batches: [
      { id: 1, time: "6:00 AM - 7:30 AM", days: "Mon, Wed, Fri", seats: 5 },
      { id: 2, time: "4:00 PM - 5:30 PM", days: "Tue, Thu, Sat", seats: 8 },
      { id: 3, time: "6:00 PM - 7:30 PM", days: "Mon, Wed, Fri", seats: 2 }
    ]
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
    image: "https://img.freepik.com/premium-photo/tennis-coach-giving-sports-lesson-athlete-sporty-summer-exercise-activity-hobby-outdoor-court-female-instructor-teaching-training-woman-fitness-leisure-wellness-lifestyle_590464-79466.jpg",
    schedule: "Tue, Thu, Sat",
    time: "5:00 PM - 6:00 PM",
    location: "Elite Tennis Club",
    description: "Advanced tennis techniques for competitive players looking to excel in tournaments.",
    enrolled: 12,
    maxStudents: 16,
    startDate: "March 5, 2024",
    endDate: "April 5, 2024",
    category: "Tennis",
    batches: [
      { id: 1, time: "7:00 AM - 8:00 AM", days: "Tue, Thu, Sat", seats: 3 },
      { id: 2, time: "5:00 PM - 6:00 PM", days: "Mon, Wed, Fri", seats: 1 }
    ]
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
    image: "https://t3.ftcdn.net/jpg/01/73/89/66/360_F_173896685_3Q3Vv2aCRkm9irKWD1g5BqASx6seST8L.jpg",
    schedule: "Sat, Sun",
    time: "4:00 PM - 5:15 PM",
    location: "Downtown Courts",
    description: "Learn basketball basics including shooting, dribbling, defense, and team strategies.",
    enrolled: 22,
    maxStudents: 30,
    startDate: "March 2, 2024",
    endDate: "April 2, 2024",
    category: "Basketball",
    batches: [
      { id: 1, time: "8:00 AM - 9:15 AM", days: "Sat, Sun", seats: 5 },
      { id: 2, time: "4:00 PM - 5:15 PM", days: "Sat, Sun", seats: 3 }
    ]
  },
]

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function Classes() {
  const [expandedClass, setExpandedClass] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [selectedBatch, setSelectedBatch] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [ showSuccess, setShowSuccess ] = useState(false)

  const categories = ["All", "Football", "Basketball", "Tennis", "Cricket"]

  function generateJoinCode(classId: number, batchId: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const baseCode = `${classId.toString(36)}-${batchId.toString(36)}`.toUpperCase();
  const randomPart = Array.from({length: 4}, () => 
    chars.charAt(Math.floor(Math.random() * chars.length)))
    .join('');
  return `${baseCode}-${randomPart}`;
}
  // Calendar functions
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(direction === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1))
  }

  const toggleExpanded = (classId: number) => {
    setExpandedClass(expandedClass === classId ? null : classId)
  }

  const handleEnrollClick = (classItem: any) => {
    setSelectedClass(classItem)
    setShowEnrollmentModal(true)
  }

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         classItem.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || classItem.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (date: Date) => {
    return `${weekdays[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Classes & Training</h1>
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
              className="pl-10 h-12 border-gray-200 focus:border-[#d7ee34] focus:ring-[#d7ee34]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-12 w-12 border-gray-200 bg-transparent hover:bg-[#d7ee34]/10 hover:border-[#d7ee34]"
          >
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
                  ? "bg-[#d7ee34] text-gray-900 border-[#d7ee34] hover:bg-[#d7ee34]/90"
                  : "border-gray-200 hover:border-[#d7ee34] bg-white hover:text-gray-900"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Classes List */}
      <div className="px-6 py-6 space-y-6">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((classItem, index) => (
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
                    <Badge className="bg-[#d7ee34]/90 text-gray-900 border-0">{classItem.level}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{classItem.title}</h3>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#d7ee34]">
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
                      <div className="w-4 h-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                      <span>{classItem.schedule}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>
                        {classItem.enrolled}/{classItem.maxStudents}
                      </span>
                    </div>
                  </div>

                  {/* More Info + Enroll Section */}
<div className="mt-4 -mx-4 -my-4 px-4 py-3 bg-[#D7EE34] rounded-md px-4 py-3 flex items-center justify-between mt-6">
  <Button
    variant="ghost"
    onClick={() => toggleExpanded(classItem.id)}
    className="text-gray-900 hover:text-black p-0 h-auto hover:bg-transparent font-medium text-sm"
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

  <Button
    className="bg-black hover:bg-gray-900 text-white px-6 py-2 text-sm rounded-lg shadow-sm hover:shadow-md transition-all"
    onClick={() => handleEnrollClick(classItem)}
  >
    {classItem.enrolled >= classItem.maxStudents ? "Full" : "Enroll Now"}
  </Button>
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
                                  <div className="w-4 h-4 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                      <line x1="16" y1="2" x2="16" y2="6"></line>
                                      <line x1="8" y1="2" x2="8" y2="6"></line>
                                      <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                  </div>
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
                                    className="bg-[#d7ee34] h-2 rounded-full transition-all duration-300"
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
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No classes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            <Button 
              variant="outline" 
              className="mt-4 border-[#d7ee34] text-[#d7ee34] hover:bg-[#d7ee34]/10"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Enrollment Modal */}
     <AnimatePresence>
  {/* Enrollment Modal */}
  {showEnrollmentModal && (
    <motion.div 
      className="fixed inset-0 bg-black/50 z-[80] flex items-end justify-center p-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-t-xl w-full max-w-2xl h-[90vh] overflow-y-auto"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Enroll in {selectedClass?.title}</h2>
              <p className="text-gray-600">Select your preferred batch and schedule</p>
            </div>
            <button 
              onClick={() => setShowEnrollmentModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Available Batches</h3>
              <div className="space-y-3">
                {selectedClass?.batches.map((batch: any) => (
                  <div 
                    key={batch.id}
                    onClick={() => setSelectedBatch(batch)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedBatch?.id === batch.id 
                        ? 'border-[#d7ee34] bg-[#d7ee34]/10 shadow-md' 
                        : 'border-gray-200 hover:border-[#d7ee34]/50 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{batch.time}</p>
                        <p className="text-sm text-gray-600">{batch.days}</p>
                      </div>
                      <div className="text-sm">
                        <span className={`font-medium ${
                          batch.seats < 3 ? 'text-red-500' : 'text-gray-900'
                        }`}>
                          {batch.seats}
                        </span> 
                        <span className="text-gray-600"> seats left</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Select Start Date</h3>
              <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="flex items-center justify-between p-4 border-b bg-gray-50">
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
                
                <div className="grid grid-cols-7 gap-1 p-2 bg-gray-50">
                  {weekdays.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 p-2">
                  {monthDays.map((day, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(day)}
                      className={`h-10 rounded-lg flex items-center justify-center text-sm transition-colors ${
                        !isSameMonth(day, currentMonth) ? "text-gray-300" :
                        isSameDay(day, selectedDate) ? 
                          "bg-[#d7ee34] text-black font-bold" :
                          "hover:bg-gray-100"
                      }`}
                    >
                      {format(day, "d")}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mt-2 text-sm">Selected: {formatDate(selectedDate)}</p>
              
              {/* Join Code Section */}
              {selectedBatch && (
                <div className="mt-6 p-4 bg-[#d7ee34]/10 border border-[#d7ee34] rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Your Join Code</h4>
                  <div className="flex items-center gap-2">
                    <div className="bg-white px-4 py-2 rounded-md border border-gray-200 font-mono font-bold text-lg">
                      {generateJoinCode(selectedClass.id, selectedBatch.id)}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-[#d7ee34] text-[#d7ee34] hover:bg-[#d7ee34]/20"
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Share this code with friends to join the same batch
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
            <Button 
              variant="outline" 
              className="border-gray-300 hover:border-[#d7ee34]"
              onClick={() => setShowEnrollmentModal(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-[#d7ee34] hover:bg-[#d7ee34]/90 text-gray-900 shadow-md hover:shadow-lg"
              disabled={!selectedBatch}
              onClick={() => {
                setShowSuccess(true);
                setTimeout(() => {
                  setShowSuccess(false);
                  setShowEnrollmentModal(false);
                  setSelectedBatch(null);
                }, 2000);
              }}
            >
              Confirm Enrollment
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}

  {/* Success Popup */}
  {showSuccess && (
    <motion.div
      className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-8 rounded-2xl max-w-sm w-full mx-4 text-center shadow-xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle2 className="w-16 h-16 text-[#d7ee34]" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Enrollment Successful!</h3>
        <p className="text-gray-600 mb-6">
          You're now enrolled in {selectedClass?.title}<br />
          Batch: {selectedBatch?.time} ({selectedBatch?.days})
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-sm font-medium text-gray-700">Your Join Code</p>
          <p className="text-xl font-bold font-mono mt-1">
            {generateJoinCode(selectedClass?.id, selectedBatch?.id)}
          </p>
        </div>
        <Button 
          className="w-full bg-[#d7ee34] hover:bg-[#d7ee34]/90 text-gray-900"
          onClick={() => setShowSuccess(false)}
        >
          Got it!
        </Button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  )
}