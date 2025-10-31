import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

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
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text">My Profile</h1>
              <p className="text-primary-600 mt-2">Welcome back, {profile?.full_name || user.email}</p>
            </div>
            <form action={handleSignOut}>
              <Button
                variant="outline"
                className="border-primary-300 text-primary-700 hover:bg-primary-50 bg-transparent"
              >
                Sign Out
              </Button>
            </form>
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
                <p className="text-lg font-medium text-primary-900">{profile?.full_name || "Not set"}</p>
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
              {quizResults ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-primary-600">Personality Type</p>
                    <Badge className="mt-1 bg-primary-500">{quizResults.personality_type}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-primary-600">Completed</p>
                    <p className="text-lg text-primary-900">
                      {new Date(quizResults.completed_at).toLocaleDateString()}
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
              ) : (
                <div className="text-center py-8">
                  <p className="text-primary-600 mb-4">You haven't taken the career quiz yet</p>
                  <Link href="/quiz">
                    <Button className="bg-primary-500 hover:bg-primary-600">Take Quiz Now</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Saved Careers */}
          <Card className="border-primary-200/50 shadow-lg">
            <CardHeader>
              <CardTitle>Saved Careers</CardTitle>
              <CardDescription>Careers you're interested in</CardDescription>
            </CardHeader>
            <CardContent>
              {savedCareers && savedCareers.length > 0 ? (
                <div className="space-y-3">
                  {savedCareers.map((career) => (
                    <div
                      key={career.id}
                      className="flex items-center justify-between p-3 border border-primary-200 rounded-lg bg-white"
                    >
                      <div>
                        <p className="font-medium text-primary-900">{career.career_title}</p>
                        <p className="text-sm text-primary-600">
                          Saved {new Date(career.saved_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Link href="/careers">
                        <Button variant="ghost" size="sm" className="text-primary-700 hover:text-primary-900">
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-primary-600 mb-4">No saved careers yet</p>
                  <Link href="/careers">
                    <Button
                      variant="outline"
                      className="border-primary-300 text-primary-700 hover:bg-primary-50 bg-transparent"
                    >
                      Explore Careers
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mentor Bookings */}
          <Card className="border-primary-200/50 shadow-lg">
            <CardHeader>
              <CardTitle>Mentor Sessions</CardTitle>
              <CardDescription>Your upcoming and past sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings && bookings.length > 0 ? (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-3 border border-primary-200 rounded-lg bg-white"
                    >
                      <div>
                        <p className="font-medium text-primary-900">{booking.mentor_name}</p>
                        <p className="text-sm text-primary-600">
                          {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : "Date TBD"}
                        </p>
                        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"} className="mt-1">
                          {booking.status}
                        </Badge>
                      </div>
                      <Link href="/mentors">
                        <Button variant="ghost" size="sm" className="text-primary-700 hover:text-primary-900">
                          Details
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-primary-600 mb-4">No mentor sessions booked</p>
                  <Link href="/mentors">
                    <Button
                      variant="outline"
                      className="border-primary-300 text-primary-700 hover:bg-primary-50 bg-transparent"
                    >
                      Find a Mentor
                    </Button>
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
