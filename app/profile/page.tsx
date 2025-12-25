"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"

/**
 * Profile Page
 * Frontend-only version: Displays mock user data and results.
 */

export default function ProfilePage() {
  const router = useRouter()

  // Mock data for demonstration
  const user = {
    email: "demo.user@example.com",
    created_at: new Date().toISOString(),
  }

  const profile = {
    full_name: "Demo User",
  }

  const quizResults = {
    personality_type: "Innovative Architect",
    completed_at: new Date().toISOString(),
  }

  const savedCareers = [
    { id: "1", career_title: "UX Designer", saved_at: new Date().toISOString() },
    { id: "2", career_title: "Product Manager", saved_at: new Date().toISOString() },
  ]

  const bookings = [{ id: "1", mentor_name: "Sarah Chen", booking_date: new Date().toISOString(), status: "confirmed" }]

  const handleSignOut = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text">My Profile</h1>
              <p className="text-primary-600 mt-2">Welcome back, {profile.full_name}</p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-primary-300 text-primary-700 hover:bg-primary-50 bg-transparent"
            >
              Sign Out
            </Button>
          </div>

          {/* Profile Info */}
          <Card className="border-primary-200/50 shadow-lg">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-primary-600">Full Name</p>
                <p className="text-lg font-medium text-primary-900">{profile.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-primary-600">Email</p>
                <p className="text-lg font-medium text-primary-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-primary-600">Member Since</p>
                <p className="text-lg font-medium text-primary-900">{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Results */}
          <Card className="border-primary-200/50 shadow-lg">
            <CardHeader>
              <CardTitle>Career Assessment</CardTitle>
              <CardDescription>Your latest quiz results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-primary-600">Personality Type</p>
                  <Badge className="mt-1 bg-primary-500">{quizResults.personality_type}</Badge>
                </div>
                <div>
                  <p className="text-sm text-primary-600">Completed</p>
                  <p className="text-lg text-primary-900">{new Date(quizResults.completed_at).toLocaleDateString()}</p>
                </div>
                <Link href="/quiz">
                  <Button
                    variant="outline"
                    className="border-primary-300 text-primary-700 hover:bg-primary-50 bg-transparent"
                  >
                    Retake Quiz
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Saved Careers */}
          <Card className="border-primary-200/50 shadow-lg">
            <CardHeader>
              <CardTitle>Saved Careers</CardTitle>
              <CardDescription>Careers you're interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedCareers.map((career) => (
                  <div
                    key={career.id}
                    className="flex items-center justify-between p-3 border border-primary-200 rounded-lg bg-white"
                  >
                    <div>
                      <p className="font-medium text-primary-900">{career.career_title}</p>
                      <p className="text-sm text-primary-600">Saved {new Date(career.saved_at).toLocaleDateString()}</p>
                    </div>
                    <Link href="/jobs">
                      <Button variant="ghost" size="sm" className="text-primary-700 hover:text-primary-900">
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mentor Bookings */}
          <Card className="border-primary-200/50 shadow-lg">
            <CardHeader>
              <CardTitle>Mentor Sessions</CardTitle>
              <CardDescription>Your upcoming and past sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 border border-primary-200 rounded-lg bg-white"
                  >
                    <div>
                      <p className="font-medium text-primary-900">{booking.mentor_name}</p>
                      <p className="text-sm text-primary-600">{new Date(booking.booking_date).toLocaleDateString()}</p>
                      <Badge variant={booking.status === "confirmed" ? "default" : "secondary"} className="mt-1">
                        {booking.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary-700 hover:text-primary-900">
                      Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
