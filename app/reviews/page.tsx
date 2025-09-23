"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, MessageSquare, Filter, Search, ThumbsUp, Calendar, User, Award, Users, Heart } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

// Sample reviews data
const reviewsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Software Engineer",
    rating: 5,
    date: "2024-01-15",
    category: "Technology",
    type: "Mentor Review",
    mentorName: "Dr. Alex Chen",
    reviewTitle: "Life-changing mentorship experience",
    content:
      "Dr. Chen's guidance was instrumental in my career transition from marketing to software engineering. His technical expertise and patient teaching style made complex concepts accessible. The personalized roadmap he created helped me land my dream job at a top tech company.",
    helpful: 24,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Product Manager",
    rating: 5,
    date: "2024-01-10",
    category: "Business",
    type: "Platform Review",
    reviewTitle: "Exceptional career discovery platform",
    content:
      "CareerCove's AI-powered quiz was incredibly accurate in identifying my strengths and interests. The platform connected me with amazing mentors and provided resources that accelerated my career growth. The user experience is intuitive and the support team is responsive.",
    helpful: 18,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Emily Chen",
    title: "UX Designer",
    rating: 4,
    date: "2024-01-08",
    category: "Design",
    type: "Mentor Review",
    mentorName: "Lisa Park",
    reviewTitle: "Great design mentorship",
    content:
      "Lisa provided excellent feedback on my portfolio and helped me understand industry standards. Her connections in the design community were invaluable. The only minor issue was scheduling conflicts, but overall a fantastic experience.",
    helpful: 15,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Thompson",
    title: "Data Scientist",
    rating: 5,
    date: "2024-01-05",
    category: "Technology",
    type: "Platform Review",
    reviewTitle: "Comprehensive career guidance",
    content:
      "The career quiz results were spot-on and opened my eyes to opportunities I hadn't considered. The mentorship matching algorithm is impressive - I was paired with a mentor whose background perfectly aligned with my goals. Highly recommend to anyone looking to advance their career.",
    helpful: 22,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Jessica Wang",
    title: "Marketing Manager",
    rating: 4,
    date: "2024-01-03",
    category: "Marketing",
    type: "Mentor Review",
    mentorName: "Robert Kim",
    reviewTitle: "Solid marketing guidance",
    content:
      "Robert shared valuable insights about digital marketing trends and helped me develop a strategic mindset. His real-world examples and case studies were particularly helpful. Would have liked more hands-on exercises, but overall very satisfied.",
    helpful: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Alex Kumar",
    title: "Financial Analyst",
    rating: 5,
    date: "2024-01-01",
    category: "Finance",
    type: "Platform Review",
    reviewTitle: "Outstanding platform for career growth",
    content:
      "CareerCove exceeded my expectations in every way. The platform's analytics helped me understand market trends in finance, and the mentor I was matched with provided insider knowledge that proved invaluable during my job search. The resume builder tool is also excellent.",
    helpful: 19,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const categories = ["All", "Technology", "Business", "Design", "Marketing", "Finance", "Healthcare", "Education"]
const reviewTypes = ["All", "Mentor Review", "Platform Review"]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [minRating, setMinRating] = useState("1")
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [newReview, setNewReview] = useState({
    name: "",
    title: "",
    rating: 5,
    category: "",
    type: "Platform Review",
    mentorName: "",
    reviewTitle: "",
    content: "",
  })

  // Filter reviews based on search and filters
  const filteredReviews = reviewsData.filter((review) => {
    const matchesSearch =
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (review.mentorName && review.mentorName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || review.category === selectedCategory
    const matchesType = selectedType === "All" || review.type === selectedType
    const matchesRating = review.rating >= Number.parseInt(minRating)

    return matchesSearch && matchesCategory && matchesType && matchesRating
  })

  // Calculate statistics
  const totalReviews = reviewsData.length
  const averageRating = (reviewsData.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
  const satisfactionRate = Math.round((reviewsData.filter((review) => review.rating >= 4).length / totalReviews) * 100)

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  const handleSubmitReview = () => {
    // Here you would typically submit to an API
    console.log("Submitting review:", newReview)
    setIsSubmitDialogOpen(false)
    // Reset form
    setNewReview({
      name: "",
      title: "",
      rating: 5,
      category: "",
      type: "Platform Review",
      mentorName: "",
      reviewTitle: "",
      content: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <Navigation />

      <main className="container mx-auto px-4 lg:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4 mr-2" />
            User Reviews
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">What Our Community Says</h1>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
            Real experiences from students and professionals who have transformed their careers with CareerCove.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover-lift">
            <CardHeader className="pb-4">
              <div className="mx-auto p-3 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 w-fit mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-primary-800">{averageRating}/5</CardTitle>
              <CardDescription>Average Rating</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center hover-lift">
            <CardHeader className="pb-4">
              <div className="mx-auto p-3 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 w-fit mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-primary-800">{totalReviews}+</CardTitle>
              <CardDescription>Total Reviews</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center hover-lift">
            <CardHeader className="pb-4">
              <div className="mx-auto p-3 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 w-fit mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-primary-800">{satisfactionRate}%</CardTitle>
              <CardDescription>Satisfaction Rate</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-primary-400" />
                  <Input
                    id="search"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Review Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reviewTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rating">Minimum Rating</Label>
                <Select value={minRating} onValueChange={setMinRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1+ Stars</SelectItem>
                    <SelectItem value="2">2+ Stars</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Review Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-primary-800">Reviews ({filteredReviews.length})</h2>
          <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary-500 hover:bg-primary-600">Write a Review</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Share Your Experience</DialogTitle>
                <DialogDescription>
                  Help others by sharing your experience with CareerCove or your mentor.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reviewerName">Your Name</Label>
                    <Input
                      id="reviewerName"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reviewerTitle">Your Title</Label>
                    <Input
                      id="reviewerTitle"
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                </div>
                <div>
                  <Label>Rating</Label>
                  <div className="mt-2">
                    {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reviewCategory">Category</Label>
                    <Select
                      value={newReview.category}
                      onValueChange={(value) => setNewReview({ ...newReview, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="reviewType">Review Type</Label>
                    <Select
                      value={newReview.type}
                      onValueChange={(value) => setNewReview({ ...newReview, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Platform Review">Platform Review</SelectItem>
                        <SelectItem value="Mentor Review">Mentor Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {newReview.type === "Mentor Review" && (
                  <div>
                    <Label htmlFor="mentorName">Mentor Name</Label>
                    <Input
                      id="mentorName"
                      value={newReview.mentorName}
                      onChange={(e) => setNewReview({ ...newReview, mentorName: e.target.value })}
                      placeholder="Enter mentor's name"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="reviewTitle">Review Title</Label>
                  <Input
                    id="reviewTitle"
                    value={newReview.reviewTitle}
                    onChange={(e) => setNewReview({ ...newReview, reviewTitle: e.target.value })}
                    placeholder="Summarize your experience"
                  />
                </div>
                <div>
                  <Label htmlFor="reviewContent">Your Review</Label>
                  <Textarea
                    id="reviewContent"
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    placeholder="Share your detailed experience..."
                    rows={4}
                  />
                </div>
                <Button onClick={handleSubmitReview} className="w-full bg-primary-500 hover:bg-primary-600">
                  Submit Review
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-800">{review.name}</h3>
                      <p className="text-sm text-primary-600">{review.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-primary-500">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-primary-100 text-primary-700">
                      {review.category}
                    </Badge>
                    <Badge variant="outline" className="border-primary-300 text-primary-600">
                      {review.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {review.mentorName && (
                    <p className="text-sm text-primary-600">
                      <strong>Mentor:</strong> {review.mentorName}
                    </p>
                  )}
                  <h4 className="font-semibold text-lg text-primary-800">{review.reviewTitle}</h4>
                  <p className="text-primary-700 leading-relaxed">{review.content}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-primary-200">
                    <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-800 transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">Helpful ({review.helpful})</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="h-12 w-12 text-primary-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary-800 mb-2">No reviews found</h3>
              <p className="text-primary-600 mb-4">Try adjusting your filters or search terms.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                  setSelectedType("All")
                  setMinRating("1")
                }}
                variant="outline"
                className="border-primary-300 text-primary-700 hover:bg-primary-50"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <CardContent className="text-center py-12">
            <Award className="h-12 w-12 mx-auto mb-6 text-white" />
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their careers with CareerCove.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                  Take Career Quiz
                </Button>
              </Link>
              <Link href="/mentors">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Find a Mentor
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
