'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { Target, FileText, Users, TrendingUp, Award, Calendar, ArrowRight, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isLoading, isAuthenticated, router])

  const handleLogout = async () => {
    await logout()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <Navigation />
      
      <main className="flex-1 container px-6 md:px-8 py-8 md:py-12">
        {/* Welcome Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2">
                Welcome back, {user.fullName || user.username}! 👋
              </h1>
              <p className="text-lg text-primary-600">
                Ready to continue your career journey?
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-primary-300 text-primary-700 hover:bg-primary-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <Card className="bg-white border-primary-200/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600 mb-1">Quiz Completed</p>
                  <p className="text-2xl font-bold text-primary-800">0</p>
                </div>
                <Target className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-primary-200/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600 mb-1">Mentor Sessions</p>
                  <p className="text-2xl font-bold text-primary-800">0</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-primary-200/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600 mb-1">Resumes</p>
                  <p className="text-2xl font-bold text-primary-800">0</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-primary-200/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600 mb-1">Progress</p>
                  <p className="text-2xl font-bold text-primary-800">0%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          <Card className="hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
            <CardHeader className="pb-4">
              <div className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-primary-600" />
              </div>
              <CardTitle className="text-xl text-center">Take Career Quiz</CardTitle>
              <CardDescription className="text-center text-primary-600">
                Discover your ideal career path with our AI-powered assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                className="w-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 hover:scale-105"
              >
                <Link href="/quiz">
                  Start Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
            <CardHeader className="pb-4">
              <div className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-center">Find Mentors</CardTitle>
              <CardDescription className="text-center text-primary-600">
                Connect with industry experts for personalized guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-primary-300 text-primary-700 hover:bg-primary-50"
              >
                <Link href="/mentors">
                  Browse Mentors
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
            <CardHeader className="pb-4">
              <div className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-center">Enhance Resume</CardTitle>
              <CardDescription className="text-center text-primary-600">
                AI-powered resume optimization to maximize your impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-primary-300 text-primary-700 hover:bg-primary-50"
              >
                <Link href="/resume">
                  Build Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white border-primary-200/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest actions and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-primary-600 text-center py-8">
              No recent activity yet. Get started by taking your first career quiz!
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center px-6 md:px-8 border-t border-primary-200 bg-white">
        <p className="text-sm text-primary-600">© 2025 CareerCove. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-6">
          <a className="text-sm hover:text-primary-800 transition-colors duration-300" href="/terms">
            Terms of Service
          </a>
          <a className="text-sm hover:text-primary-800 transition-colors duration-300" href="/privacy">
            Privacy Policy
          </a>
          <a className="text-sm hover:text-primary-800 transition-colors duration-300" href="/contact">
            Contact
          </a>
        </nav>
      </footer>
    </div>
  )
}

