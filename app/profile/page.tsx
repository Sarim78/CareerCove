import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get quiz results
  const { data: quizResults } = await supabase
    .from("quiz_results")
    .select("*")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(1)
    .single()

  // Get saved careers
  const { data: savedCareers } = await supabase
    .from("saved_careers")
    .select("*")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false })

  // Get mentor bookings
  const { data: bookings } = await supabase
    .from("mentor_bookings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  async function handleSignOut() {
    "use server"
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 mt-2">Welcome back, {profile?.full_name || user.email}</p>
            </div>
            <form action={handleSignOut}>
              <Button variant="outline">Sign Out</Button>
            </form>
          </div>

          {/* Profile Info */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-lg font-medium">{profile?.full_name || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-lg font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Results */}
          <Card>
            <CardHeader>
              <CardTitle>Career Assessment</CardTitle>
              <CardDescription>Your latest quiz results</CardDescription>
            </CardHeader>
            <CardContent>
              {quizResults ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Personality Type</p>
                    <Badge className="mt-1">{quizResults.personality_type}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-lg">{new Date(quizResults.completed_at).toLocaleDateString()}</p>
                  </div>
                  <Link href="/quiz">
                    <Button variant="outline">Retake Quiz</Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">You haven't taken the career quiz yet</p>
                  <Link href="/quiz">
                    <Button>Take Quiz Now</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Saved Careers */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Careers</CardTitle>
              <CardDescription>Careers you're interested in</CardDescription>
            </CardHeader>
            <CardContent>
              {savedCareers && savedCareers.length > 0 ? (
                <div className="space-y-3">
                  {savedCareers.map((career) => (
                    <div key={career.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{career.career_title}</p>
                        <p className="text-sm text-gray-600">Saved {new Date(career.saved_at).toLocaleDateString()}</p>
                      </div>
                      <Link href="/careers">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No saved careers yet</p>
                  <Link href="/careers">
                    <Button variant="outline">Explore Careers</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mentor Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Mentor Sessions</CardTitle>
              <CardDescription>Your upcoming and past sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings && bookings.length > 0 ? (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{booking.mentor_name}</p>
                        <p className="text-sm text-gray-600">{booking.session_type}</p>
                        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"} className="mt-1">
                          {booking.status}
                        </Badge>
                      </div>
                      <Link href="/mentors">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No mentor sessions booked</p>
                  <Link href="/mentors">
                    <Button variant="outline">Find a Mentor</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
