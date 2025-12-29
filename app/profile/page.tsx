"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"

/**
 * ProfilePage Component
 *
 * User dashboard HUB. Refactored to fetch user profile dynamically
 * and display interactive summaries from mock data layers.
 */

const mockUser = {
  full_name: "Demo User",
  email: "demo.user@example.com",
  created_at: new Date().toISOString(),
}

const mockQuizResults = {
  personality_type: "Innovative Architect",
  completed_at: new Date().toISOString(),
}

const mockSavedJobs = [
  { id: "1", career_title: "Senior UX Designer", saved_at: new Date().toISOString() },
  { id: "2", career_title: "Frontend Engineer", saved_at: new Date().toISOString() },
]

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(mockUser)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSignOut = () => {
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
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
              <p className="text-primary-600 mt-2">Welcome back, {user.full_name}</p>
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
                <p className="text-lg font-medium text-primary-900">{user.full_name}</p>
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
                  <Badge className="mt-1 bg-primary-500">{mockQuizResults.personality_type}</Badge>
                </div>
                <div>
                  <p className="text-sm text-primary-600">Completed</p>
                  <p className="text-lg text-primary-900">
                    {new Date(mockQuizResults.completed_at).toLocaleDateString()}
                  </p>
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
                {mockSavedJobs.map((career) => (
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
              <div className="space-y-3">{/* Placeholder for mentor bookings data */}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
