"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, FileText, Target, Star, Sparkles, TrendingUp, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"

/**
 * HomePage Component
 *
 * This is the landing page for CareerCove. It features a hero section with high-impact
 * messaging, a features overview section highlighting the quiz, mentors, and resume
 * enhancer, and social proof sections with testimonials and statistics.
 *
 * The page uses Framer Motion-like scroll animations via the Intersection Observer API.
 */
export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null)

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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      {/* Header */}
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 sm:py-20 md:py-32 lg:py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-white"></div>
          <div className="container px-4 sm:px-6 md:px-8 relative">
            <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-6 sm:space-y-8 animate-slide-in-left">
                <div className="space-y-4 sm:space-y-6">
                  <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-medium w-fit">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Discover Your Perfect Career
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                    Find Your
                    <span className="gradient-text block">Dream Career</span>
                    Path
                  </h1>
                  <p className="max-w-[600px] text-primary-600 text-base sm:text-lg md:text-xl leading-relaxed">
                    Unlock your potential with personalized career guidance, expert mentorship, and AI-powered tools
                    designed to accelerate your professional journey.
                  </p>
                </div>
                <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary-500 hover:bg-primary-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-sm sm:text-base"
                  >
                    <Link href="/auth">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      const featuresSection = document.getElementById("features")
                      if (featuresSection) {
                        featuresSection.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                    className="border-primary-300 text-primary-700 hover:bg-primary-50 hover:border-primary-400 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                  >
                    Explore Features
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center animate-slide-in-right">
                <div className="relative w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-300 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                  <Image
                    alt="Professional workspace with career planning materials, notebook, and sticky notes showing organized approach to career development"
                    className="relative aspect-square overflow-hidden rounded-3xl object-cover shadow-2xl hover:scale-105 transition-transform duration-500 w-full"
                    height="500"
                    src="/images/career-planning.png"
                    width="500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 sm:py-20 md:py-32 bg-white">
          <div className="container px-4 sm:px-6 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center animate-on-scroll">
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-medium">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Premium Features
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
                Everything You Need for
                <span className="gradient-text"> Career Success</span>
              </h2>
              <p className="max-w-2xl text-primary-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Our comprehensive platform combines cutting-edge technology with expert guidance to accelerate your
                professional growth.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 py-12 sm:py-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="h-full hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 sm:h-8 w-6 sm:w-8 text-primary-600" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">Smart Career Quiz</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-primary-600">
                    AI-powered assessment that analyzes your passions, skills, and personality to recommend perfect
                    career matches.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 hover:scale-105 text-sm"
                  >
                    <Link href="/quiz">Take Quiz</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="h-full hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 sm:h-8 w-6 sm:w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">Expert Mentors</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-primary-600">
                    Connect with industry leaders who provide personalized guidance and insider insights for your career
                    journey.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary-300 text-primary-700 hover:bg-primary-50 transition-all duration-300 hover:scale-105 text-sm bg-transparent"
                  >
                    <Link href="/mentors">Find Mentors</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="h-full hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-6 sm:h-8 w-6 sm:w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">Resume Enhancer</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-primary-600">
                    AI-powered resume optimization with industry-specific templates and real-time feedback to maximize
                    your impact.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary-300 text-primary-700 hover:bg-primary-50 transition-all duration-300 hover:scale-105 text-sm bg-transparent"
                  >
                    <Link href="/resume">Enhance Resume</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 sm:py-20 bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="container px-4 sm:px-6 md:px-8">
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center animate-on-scroll group">
                <div className="p-4 sm:p-6 rounded-2xl bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 w-full">
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">50K+</div>
                  <div className="text-primary-600 font-medium text-sm sm:text-base">Career Assessments</div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center animate-on-scroll group">
                <div className="p-4 sm:p-6 rounded-2xl bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 w-full">
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">500+</div>
                  <div className="text-primary-600 font-medium text-sm sm:text-base">Expert Mentors</div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center animate-on-scroll group">
                <div className="p-4 sm:p-6 rounded-2xl bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 w-full">
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">95%</div>
                  <div className="text-primary-600 font-medium text-sm sm:text-base">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 sm:py-20 md:py-32 bg-white">
          <div className="container px-4 sm:px-6 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center animate-on-scroll">
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-medium">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Success Stories
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                What Our Users Say
              </h2>
            </div>
            <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 py-12 sm:py-16 grid-cols-1 lg:grid-cols-2">
              <Card className="hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll">
                <CardContent className="pt-6 sm:pt-8">
                  <div className="flex items-center space-x-1 mb-4 sm:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 sm:h-5 w-4 sm:w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-base sm:text-lg font-medium leading-relaxed text-primary-700 mb-4 sm:mb-6">
                    "CareerCove's quiz was a game-changer. It helped me discover my passion for UX design, and the
                    mentorship program connected me with industry experts who guided my successful transition."
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex-shrink-0"></div>
                    <div className="text-left">
                      <div className="font-semibold text-primary-800 text-sm sm:text-base">Sarah Johnson</div>
                      <div className="text-xs sm:text-sm text-primary-600">UX Designer at Tech Corp</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll">
                <CardContent className="pt-6 sm:pt-8">
                  <div className="flex items-center space-x-1 mb-4 sm:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 sm:h-5 w-4 sm:w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-base sm:text-lg font-medium leading-relaxed text-primary-700 mb-4 sm:mb-6">
                    "The resume enhancer tool completely transformed my CV. The AI suggestions were spot-on, and I
                    landed my dream job in data science within weeks. Absolutely incredible!"
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex-shrink-0"></div>
                    <div className="text-left">
                      <div className="font-semibold text-primary-800 text-sm sm:text-base">Michael Chen</div>
                      <div className="text-xs sm:text-sm text-primary-600">Data Scientist at Analytics Inc</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 sm:py-20 md:py-32 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/career-planning.png')] opacity-10"></div>
          <div className="container px-4 sm:px-6 md:px-8 relative">
            <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center animate-on-scroll">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
                Ready to Transform Your Career Journey?
              </h2>
              <p className="max-w-2xl text-primary-100 text-sm sm:text-base md:text-lg leading-relaxed">
                Join thousands of professionals who have discovered their perfect career path and achieved their dreams
                with CareerCove.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-sm sm:text-base"
              >
                <Link href="/auth">
                  Start Your Journey Today
                  <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-4 sm:flex-row py-6 sm:py-8 w-full shrink-0 items-center px-4 sm:px-6 md:px-8 border-t border-primary-200 bg-white text-center sm:text-left">
        <p className="text-xs sm:text-sm text-primary-600">© 2025 CareerCove. All rights reserved.</p>
        <nav className="sm:ml-auto flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
          <Link className="text-xs sm:text-sm hover:text-primary-800 transition-colors duration-300" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-xs sm:text-sm hover:text-primary-800 transition-colors duration-300" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="text-xs sm:text-sm hover:text-primary-800 transition-colors duration-300" href="/contact">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
