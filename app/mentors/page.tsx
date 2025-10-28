"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Star,
  MapPin,
  Calendar,
  Users,
  Award,
  Filter,
  X,
  Search,
  Clock,
  MessageCircle,
  Video,
  Phone,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Navigation } from "@/components/navigation"

const mentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior UX Designer",
    company: "Google",
    location: "San Francisco, CA",
    rating: 4.9,
    reviews: 127,
    expertise: ["UX Design", "Product Strategy", "User Research"],
    experience: "8+ years",
    price: "$150/hour",
    image: "/placeholder.svg?height=100&width=100",
    specialty: "Design Leadership",
    fields: ["technology", "creative"],
    experienceLevel: "senior",
    priceRange: "high",
    responseTime: "Usually responds within 2 hours",
    availability: "Available this week",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Data Science Manager",
    company: "Microsoft",
    location: "Seattle, WA",
    rating: 4.8,
    reviews: 89,
    expertise: ["Data Science", "Machine Learning", "Analytics"],
    experience: "10+ years",
    price: "$180/hour",
    image: "/placeholder.svg?height=100&width=100",
    specialty: "AI & Analytics",
    fields: ["technology", "science"],
    experienceLevel: "senior",
    priceRange: "high",
    responseTime: "Usually responds within 4 hours",
    availability: "Available next week",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Marketing Director",
    company: "HubSpot",
    location: "Boston, MA",
    rating: 4.9,
    reviews: 156,
    expertise: ["Digital Marketing", "Brand Strategy", "Growth"],
    experience: "12+ years",
    price: "$120/hour",
    image: "/placeholder.svg?height=100&width=100",
    specialty: "Growth Marketing",
    fields: ["business", "creative"],
    experienceLevel: "senior",
    priceRange: "medium",
    responseTime: "Usually responds within 1 hour",
    availability: "Available today",
  },
  {
    id: 4,
    name: "David Kim",
    title: "Software Engineering Lead",
    company: "Netflix",
    location: "Los Angeles, CA",
    rating: 4.7,
    reviews: 203,
    expertise: ["Software Development", "System Design", "Leadership"],
    experience: "15+ years",
    price: "$200/hour",
    image: "/placeholder.svg?height=100&width=100",
    specialty: "Tech Leadership",
    fields: ["technology"],
    experienceLevel: "executive",
    priceRange: "high",
    responseTime: "Usually responds within 6 hours",
    availability: "Available this week",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    title: "Product Manager",
    company: "Airbnb",
    location: "San Francisco, CA",
    rating: 4.8,
    reviews: 94,
    expertise: ["Product Management", "Strategy", "Agile"],
    experience: "9+ years",
    price: "$160/hour",
    image: "/placeholder.svg?height=100&width=100",
    specialty: "Product Strategy",
    fields: ["technology", "business"],
    experienceLevel: "senior",
    priceRange: "high",
    responseTime: "Usually responds within 3 hours",
    availability: "Available this week",
  },
  {
    id: 6,
    name: "James Wilson",
    title: "Financial Analyst",
    company: "Goldman Sachs",
    location: "New York, NY",
    rating: 4.6,
    reviews: 67,
    expertise: ["Finance", "Investment", "Risk Analysis"],
    experience: "7+ years",
    price: "$140/hour",
    image: "/placeholder.svg?height=100&width=100",
    specialty: "Investment Strategy",
    fields: ["finance", "business"],
    experienceLevel: "mid",
    priceRange: "medium",
    responseTime: "Usually responds within 4 hours",
    availability: "Available next week",
  },
  {
    id: 7,
    name: "Dr. Amanda Foster",
    title: "Clinical Psychologist",
    company: "Stanford Health",
    location: "Palo Alto, CA",
    rating: 4.9,
    reviews: 112,
    expertise: ["Clinical Psychology", "Career Counseling", "Assessment"],
    experience: "11+ years",
    price: "$130/hour",
    image: "/placeholder.svg?height=100&width=100",
    specialty: "Career Psychology",
    fields: ["healthcare", "science"],
    experienceLevel: "senior",
    priceRange: "medium",
    responseTime: "Usually responds within 2 hours",
    availability: "Available today",
  },
  {
    id: 8,
    name: "Carlos Martinez",
    title: "Creative Director",
    company: "Adobe",
    location: "San Jose, CA",
    rating: 4.8,
    reviews: 88,
    expertise: ["Creative Direction", "Brand Design", "Team Leadership"],
    experience: "13+ years",
    price: "$170/hour",
    image: "/placeholder.svg?height=100&width=100",
    specialty: "Creative Leadership",
    fields: ["creative", "technology"],
    experienceLevel: "senior",
    priceRange: "high",
    responseTime: "Usually responds within 5 hours",
    availability: "Available this week",
  },
  {
    id: 9,
    name: "Rachel Green",
    title: "HR Business Partner",
    company: "Salesforce",
    location: "San Francisco, CA",
    rating: 4.7,
    reviews: 76,
    expertise: ["Human Resources", "Talent Development", "Organizational Psychology"],
    experience: "8+ years",
    price: "$110/hour",
    image: "/placeholder.svg?height=100&width=100",
    specialty: "Talent Development",
    fields: ["business", "education"],
    experienceLevel: "senior",
    priceRange: "medium",
    responseTime: "Usually responds within 3 hours",
    availability: "Available today",
  },
  {
    id: 10,
    name: "Alex Chen",
    title: "Management Consultant",
    company: "McKinsey & Company",
    location: "Chicago, IL",
    rating: 4.9,
    reviews: 134,
    expertise: ["Strategy Consulting", "Operations", "Digital Transformation"],
    experience: "6+ years",
    price: "$190/hour",
    image: "/placeholder.svg?height=100&width=100",
    specialty: "Strategy & Operations",
    fields: ["consulting", "business"],
    experienceLevel: "mid",
    priceRange: "high",
    responseTime: "Usually responds within 1 hour",
    availability: "Available this week",
  },
]

const filterCategories = [
  { id: "technology", label: "Technology", icon: "💻" },
  { id: "healthcare", label: "Healthcare", icon: "🏥" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "creative", label: "Creative", icon: "🎨" },
  { id: "science", label: "Science", icon: "🔬" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "finance", label: "Finance", icon: "💰" },
  { id: "consulting", label: "Consulting", icon: "📊" },
]

const experienceLevels = [
  { id: "mid", label: "Mid Level (5-10 years)" },
  { id: "senior", label: "Senior Level (10-15 years)" },
  { id: "executive", label: "Executive (15+ years)" },
]

const priceRanges = [
  { id: "low", label: "Under $100/hour" },
  { id: "medium", label: "$100-150/hour" },
  { id: "high", label: "$150+/hour" },
]

export default function MentorsPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredMentors, setFilteredMentors] = useState(mentors)
  const [selectedMentor, setSelectedMentor] = useState<(typeof mentors)[0] | null>(null)
  const [bookingStep, setBookingStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    sessionType: "",
    date: "",
    time: "",
    duration: "",
    message: "",
    name: "",
    email: "",
    phone: "",
  })
  const [showMentorApplication, setShowMentorApplication] = useState(false)
  const [applicationData, setApplicationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    title: "",
    experience: "",
    expertise: "",
    bio: "",
    linkedin: "",
    hourlyRate: "",
  })

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    let filtered = mentors

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentor.expertise.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by fields
    if (selectedFields.length > 0) {
      filtered = filtered.filter((mentor) => mentor.fields.some((field) => selectedFields.includes(field)))
    }

    // Filter by experience level
    if (selectedExperience.length > 0) {
      filtered = filtered.filter((mentor) => selectedExperience.includes(mentor.experienceLevel))
    }

    // Filter by price range
    if (selectedPriceRange.length > 0) {
      filtered = filtered.filter((mentor) => selectedPriceRange.includes(mentor.priceRange))
    }

    setFilteredMentors(filtered)
  }, [searchQuery, selectedFields, selectedExperience, selectedPriceRange])

  const toggleFieldFilter = (fieldId: string) => {
    setSelectedFields((prev) => (prev.includes(fieldId) ? prev.filter((id) => id !== fieldId) : [...prev, fieldId]))
  }

  const toggleExperienceFilter = (experienceId: string) => {
    setSelectedExperience((prev) =>
      prev.includes(experienceId) ? prev.filter((id) => id !== experienceId) : [...prev, experienceId],
    )
  }

  const togglePriceFilter = (priceId: string) => {
    setSelectedPriceRange((prev) => (prev.includes(priceId) ? prev.filter((id) => id !== priceId) : [...prev, priceId]))
  }

  const clearAllFilters = () => {
    setSelectedFields([])
    setSelectedExperience([])
    setSelectedPriceRange([])
    setSearchQuery("")
  }

  const handleBookSession = (mentor: (typeof mentors)[0]) => {
    setSelectedMentor(mentor)
    setBookingStep(1)
    setBookingData({
      sessionType: "",
      date: "",
      time: "",
      duration: "",
      message: "",
      name: "",
      email: "",
      phone: "",
    })
  }

  const handleBookingSubmit = () => {
    // Here you would typically send the booking data to your backend
    console.log("Booking submitted:", { mentor: selectedMentor, booking: bookingData })
    alert(
      `Booking request sent to ${selectedMentor?.name}! They will respond within ${selectedMentor?.responseTime.toLowerCase()}.`,
    )
    setSelectedMentor(null)
    setBookingStep(1)
  }

  const handleMentorApplicationSubmit = () => {
    // Here you would typically send the application data to your backend
    console.log("Mentor application submitted:", applicationData)
    alert("Thank you for your application! We'll review it and get back to you within 3-5 business days.")
    setShowMentorApplication(false)
    setApplicationData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      title: "",
      experience: "",
      expertise: "",
      bio: "",
      linkedin: "",
      hourlyRate: "",
    })
  }

  const activeFiltersCount = selectedFields.length + selectedExperience.length + selectedPriceRange.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <Navigation />

      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
            <Users className="w-4 h-4 mr-2" />
            Expert Mentorship
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-6">Connect with Industry Leaders</h1>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
            Get personalized guidance from experienced professionals who have walked the path you want to take. Our
            mentors provide insider insights, career advice, and strategic guidance to accelerate your success.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-400" />
              <Input
                placeholder="Search mentors, skills, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-primary-200 focus:border-primary-400 transition-colors duration-300"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-primary-300 text-primary-700 hover:bg-primary-50 transition-all duration-300"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-primary-500 text-white">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {showFilters && (
            <Card className="bg-white border-primary-200/50 shadow-lg animate-scale-in">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-primary-800">Filter Mentors</CardTitle>
                  <Button
                    onClick={() => setShowFilters(false)}
                    variant="ghost"
                    size="sm"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription className="text-primary-600">
                  Narrow down mentors by industry, experience, and price range
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Industry Filters */}
                <div>
                  <h3 className="font-semibold text-primary-800 mb-3">Industry</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterCategories.map((category) => (
                      <Button
                        key={category.id}
                        onClick={() => toggleFieldFilter(category.id)}
                        variant={selectedFields.includes(category.id) ? "default" : "outline"}
                        size="sm"
                        className={`transition-all duration-300 ${
                          selectedFields.includes(category.id)
                            ? "bg-primary-500 hover:bg-primary-600 text-white"
                            : "border-primary-300 text-primary-700 hover:bg-primary-50"
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Experience Level Filters */}
                <div>
                  <h3 className="font-semibold text-primary-800 mb-3">Experience Level</h3>
                  <div className="flex flex-wrap gap-2">
                    {experienceLevels.map((level) => (
                      <Button
                        key={level.id}
                        onClick={() => toggleExperienceFilter(level.id)}
                        variant={selectedExperience.includes(level.id) ? "default" : "outline"}
                        size="sm"
                        className={`transition-all duration-300 ${
                          selectedExperience.includes(level.id)
                            ? "bg-primary-500 hover:bg-primary-600 text-white"
                            : "border-primary-300 text-primary-700 hover:bg-primary-50"
                        }`}
                      >
                        {level.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filters */}
                <div>
                  <h3 className="font-semibold text-primary-800 mb-3">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range) => (
                      <Button
                        key={range.id}
                        onClick={() => togglePriceFilter(range.id)}
                        variant={selectedPriceRange.includes(range.id) ? "default" : "outline"}
                        size="sm"
                        className={`transition-all duration-300 ${
                          selectedPriceRange.includes(range.id)
                            ? "bg-primary-500 hover:bg-primary-600 text-white"
                            : "border-primary-300 text-primary-700 hover:bg-primary-50"
                        }`}
                      >
                        {range.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <div className="pt-4 border-t border-primary-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary-600">
                        {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} applied
                      </span>
                      <Button
                        onClick={clearAllFilters}
                        variant="ghost"
                        size="sm"
                        className="text-primary-600 hover:text-primary-800"
                      >
                        Clear all
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-primary-600">
            Showing {filteredMentors.length} of {mentors.length} mentors
          </p>
        </div>

        {/* Mentors Grid */}
        {filteredMentors.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {filteredMentors.map((mentor, index) => (
              <Card
                key={mentor.id}
                className="h-full hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <Image
                        src={mentor.image || "/placeholder.svg"}
                        alt={mentor.name}
                        width={64}
                        height={64}
                        className="rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-primary-800">{mentor.name}</CardTitle>
                      <CardDescription className="text-primary-600">{mentor.title}</CardDescription>
                      <p className="text-sm font-medium gradient-text">{mentor.company}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium w-fit">
                    <Award className="w-3 h-3 mr-1" />
                    {mentor.specialty}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-primary-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {mentor.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{mentor.rating}</span>
                      <span className="text-primary-500 ml-1">({mentor.reviews})</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-primary-700 mb-3">Areas of Expertise:</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors duration-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-primary-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {mentor.responseTime}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {mentor.availability}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm border-t border-primary-100 pt-4">
                    <div className="text-primary-600">
                      <span className="font-medium">Experience:</span> {mentor.experience}
                    </div>
                    <div className="font-semibold text-primary-800">{mentor.price}</div>
                  </div>

                  <Button
                    onClick={() => handleBookSession(mentor)}
                    className="w-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 hover:scale-105 group"
                  >
                    <Calendar className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    Book Session
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white border-primary-200/50 shadow-lg">
            <CardContent className="text-center py-12">
              <div className="mx-auto p-6 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 w-fit mb-6">
                <Users className="h-12 w-12 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-3">No mentors found</h3>
              <p className="text-primary-600 mb-6">
                No mentors match your current search and filter criteria. Try adjusting your filters or search terms.
              </p>
              <Button
                onClick={clearAllFilters}
                className="bg-primary-500 hover:bg-primary-600 transition-all duration-300"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="text-center animate-on-scroll">
          <Card className="max-w-3xl mx-auto hover-lift bg-white border-primary-200/50 shadow-xl">
            <CardHeader className="pb-6">
              <div className="mx-auto p-6 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 w-fit mb-6">
                <Users className="h-12 w-12 text-primary-600" />
              </div>
              <CardTitle className="text-2xl gradient-text">Become a Mentor</CardTitle>
              <CardDescription className="text-lg text-primary-600 leading-relaxed">
                Share your expertise and help the next generation of professionals achieve their career goals. Join our
                community of industry leaders making a difference.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setShowMentorApplication(true)}
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 transition-all duration-300 hover:scale-105"
              >
                Apply to be a Mentor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text">Book a Session with {selectedMentor?.name}</DialogTitle>
            <DialogDescription className="text-primary-600">
              {selectedMentor?.title} at {selectedMentor?.company}
            </DialogDescription>
          </DialogHeader>

          {bookingStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="text-primary-700 font-medium">Session Type</Label>
                <Select
                  value={bookingData.sessionType}
                  onValueChange={(value) => setBookingData({ ...bookingData, sessionType: value })}
                >
                  <SelectTrigger className="border-primary-200 focus:border-primary-400">
                    <SelectValue placeholder="Choose session type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">
                      <div className="flex items-center">
                        <Video className="w-4 h-4 mr-2" />
                        Video Call
                      </div>
                    </SelectItem>
                    <SelectItem value="phone">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Phone Call
                      </div>
                    </SelectItem>
                    <SelectItem value="chat">
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Text Chat
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-primary-700 font-medium">Preferred Date</Label>
                  <Input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="border-primary-200 focus:border-primary-400"
                  />
                </div>
                <div>
                  <Label className="text-primary-700 font-medium">Preferred Time</Label>
                  <Input
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    className="border-primary-200 focus:border-primary-400"
                  />
                </div>
              </div>

              <div>
                <Label className="text-primary-700 font-medium">Session Duration</Label>
                <Select
                  value={bookingData.duration}
                  onValueChange={(value) => setBookingData({ ...bookingData, duration: value })}
                >
                  <SelectTrigger className="border-primary-200 focus:border-primary-400">
                    <SelectValue placeholder="Choose duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-primary-700 font-medium">Message to Mentor</Label>
                <Textarea
                  placeholder="Tell the mentor what you'd like to discuss and your goals for the session..."
                  value={bookingData.message}
                  onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                  className="min-h-[100px] border-primary-200 focus:border-primary-400"
                />
              </div>

              <DialogFooter>
                <Button
                  onClick={() => setBookingStep(2)}
                  disabled={!bookingData.sessionType || !bookingData.date || !bookingData.time || !bookingData.duration}
                  className="bg-primary-500 hover:bg-primary-600"
                >
                  Continue
                </Button>
              </DialogFooter>
            </div>
          )}

          {bookingStep === 2 && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-primary-700 font-medium">Full Name</Label>
                  <Input
                    placeholder="Your full name"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    className="border-primary-200 focus:border-primary-400"
                  />
                </div>
                <div>
                  <Label className="text-primary-700 font-medium">Email</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    className="border-primary-200 focus:border-primary-400"
                  />
                </div>
              </div>

              <div>
                <Label className="text-primary-700 font-medium">Phone Number</Label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  className="border-primary-200 focus:border-primary-400"
                />
              </div>

              <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                <h3 className="font-semibold text-primary-800 mb-2">Session Summary</h3>
                <div className="space-y-1 text-sm text-primary-700">
                  <p>
                    <strong>Mentor:</strong> {selectedMentor?.name}
                  </p>
                  <p>
                    <strong>Type:</strong> {bookingData.sessionType}
                  </p>
                  <p>
                    <strong>Date:</strong> {bookingData.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {bookingData.time}
                  </p>
                  <p>
                    <strong>Duration:</strong> {bookingData.duration} minutes
                  </p>
                  <p>
                    <strong>Rate:</strong> {selectedMentor?.price}
                  </p>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  onClick={() => setBookingStep(1)}
                  variant="outline"
                  className="border-primary-300 text-primary-700"
                >
                  Back
                </Button>
                <Button
                  onClick={handleBookingSubmit}
                  disabled={!bookingData.name || !bookingData.email}
                  className="bg-primary-500 hover:bg-primary-600"
                >
                  Send Booking Request
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mentor Application Modal */}
      <Dialog open={showMentorApplication} onOpenChange={setShowMentorApplication}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text">Apply to Become a Mentor</DialogTitle>
            <DialogDescription className="text-primary-600">
              Join our community of industry experts and help shape the next generation of professionals.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-primary-700 font-medium">First Name</Label>
                <Input
                  placeholder="John"
                  value={applicationData.firstName}
                  onChange={(e) => setApplicationData({ ...applicationData, firstName: e.target.value })}
                  className="border-primary-200 focus:border-primary-400"
                />
              </div>
              <div>
                <Label className="text-primary-700 font-medium">Last Name</Label>
                <Input
                  placeholder="Doe"
                  value={applicationData.lastName}
                  onChange={(e) => setApplicationData({ ...applicationData, lastName: e.target.value })}
                  className="border-primary-200 focus:border-primary-400"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-primary-700 font-medium">Email</Label>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  value={applicationData.email}
                  onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                  className="border-primary-200 focus:border-primary-400"
                />
              </div>
              <div>
                <Label className="text-primary-700 font-medium">Phone</Label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={applicationData.phone}
                  onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                  className="border-primary-200 focus:border-primary-400"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-primary-700 font-medium">Current Company</Label>
                <Input
                  placeholder="Google, Microsoft, etc."
                  value={applicationData.company}
                  onChange={(e) => setApplicationData({ ...applicationData, company: e.target.value })}
                  className="border-primary-200 focus:border-primary-400"
                />
              </div>
              <div>
                <Label className="text-primary-700 font-medium">Job Title</Label>
                <Input
                  placeholder="Senior Software Engineer"
                  value={applicationData.title}
                  onChange={(e) => setApplicationData({ ...applicationData, title: e.target.value })}
                  className="border-primary-200 focus:border-primary-400"
                />
              </div>
            </div>

            <div>
              <Label className="text-primary-700 font-medium">Years of Experience</Label>
              <Select
                value={applicationData.experience}
                onValueChange={(value) => setApplicationData({ ...applicationData, experience: value })}
              >
                <SelectTrigger className="border-primary-200 focus:border-primary-400">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-7">5-7 years</SelectItem>
                  <SelectItem value="8-10">8-10 years</SelectItem>
                  <SelectItem value="11-15">11-15 years</SelectItem>
                  <SelectItem value="15+">15+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-primary-700 font-medium">Areas of Expertise</Label>
              <Input
                placeholder="e.g., Software Development, Product Management, Data Science"
                value={applicationData.expertise}
                onChange={(e) => setApplicationData({ ...applicationData, expertise: e.target.value })}
                className="border-primary-200 focus:border-primary-400"
              />
            </div>

            <div>
              <Label className="text-primary-700 font-medium">Professional Bio</Label>
              <Textarea
                placeholder="Tell us about your background, achievements, and what you can offer as a mentor..."
                value={applicationData.bio}
                onChange={(e) => setApplicationData({ ...applicationData, bio: e.target.value })}
                className="min-h-[120px] border-primary-200 focus:border-primary-400"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-primary-700 font-medium">LinkedIn Profile</Label>
                <Input
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={applicationData.linkedin}
                  onChange={(e) => setApplicationData({ ...applicationData, linkedin: e.target.value })}
                  className="border-primary-200 focus:border-primary-400"
                />
              </div>
              <div>
                <Label className="text-primary-700 font-medium">Desired Hourly Rate</Label>
                <Input
                  placeholder="$150"
                  value={applicationData.hourlyRate}
                  onChange={(e) => setApplicationData({ ...applicationData, hourlyRate: e.target.value })}
                  className="border-primary-200 focus:border-primary-400"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleMentorApplicationSubmit}
              disabled={
                !applicationData.firstName ||
                !applicationData.lastName ||
                !applicationData.email ||
                !applicationData.company ||
                !applicationData.title
              }
              className="bg-primary-500 hover:bg-primary-600"
            >
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
