"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Brain,
  Zap,
  TrendingUp,
  Heart,
  Lightbulb,
  Code,
  Database,
  Cpu,
  BarChart3,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"

/**
 * AboutPage Component
 *
 * Provides background on CareerCove's mission, vision, and the technology
 * behind our AI-powered career assessments. It also introduces the core
 * founding team members and their specific expertise.
 */
const howItWorks = [
  {
    step: "1",
    title: "AI-Powered Assessment",
    description:
      "Our machine learning algorithms analyze your responses across multiple psychological and professional dimensions.",
    icon: Brain,
    details: ["Personality profiling", "Skills assessment", "Interest mapping", "Values alignment"],
  },
  {
    step: "2",
    title: "Data Processing",
    description:
      "Advanced neural networks process your data against our database of 10,000+ career profiles and outcomes.",
    icon: Database,
    details: ["Pattern recognition", "Predictive modeling", "Career trajectory analysis", "Market trend integration"],
  },
  {
    step: "3",
    title: "Smart Matching",
    description:
      "Our proprietary algorithm matches you with careers based on success probability and satisfaction metrics.",
    icon: Cpu,
    details: [
      "Success probability scoring",
      "Satisfaction prediction",
      "Growth potential analysis",
      "Market demand factors",
    ],
  },
  {
    step: "4",
    title: "Personalized Recommendations",
    description:
      "Receive tailored career paths, skill development plans, and mentor connections based on your unique profile.",
    icon: BarChart3,
    details: ["Custom career roadmaps", "Skill gap analysis", "Mentor matching", "Learning recommendations"],
  },
]

const teamMembers = [
  {
    name: "Sarim Siddiqui",
    role: "Co-Founder & CEO",
    bio: "AI researcher with expertise in machine learning and career development. Leading the technical vision at CareerCove.",
    image: "/professional-businessman.png",
    expertise: ["AI/ML", "Data Science", "Machine Learning", "Career Development"],
  },
  {
    name: "Ryan Siddiqui",
    role: "Co-Founder & CTO",
    bio: "Full-stack engineer specializing in scalable systems and user experience. Building the platform infrastructure.",
    image: "/tech-professional.png",
    expertise: ["Full-Stack Development", "System Architecture", "UX Design", "Cloud Infrastructure"],
  },
  {
    name: "Wasi Siddiqui",
    role: "Head of Product",
    bio: "Product strategist focused on creating impactful user experiences. Driving product innovation and growth.",
    image: "/product-manager-brainstorm.png",
    expertise: ["Product Strategy", "User Research", "Growth", "Analytics"],
  },
  {
    name: "Emily Chen",
    role: "Lead Data Scientist",
    bio: "PhD in Psychology with expertise in career development theory and predictive analytics.",
    image: "/data-scientist-workspace.png",
    expertise: ["Psychology", "Statistics", "Predictive Modeling", "Research"],
  },
  {
    name: "Marcus Johnson",
    role: "Senior Engineer",
    bio: "Backend specialist with experience in building high-performance AI systems and data pipelines.",
    image: "/software-engineer-workspace.png",
    expertise: ["Backend Development", "AI Systems", "Database Design", "API Development"],
  },
]

export default function AboutPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      {/* Header */}
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-white"></div>
          <div className="container px-6 md:px-8 relative">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                <Heart className="w-4 h-4 mr-2" />
                About CareerCove
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl leading-tight mb-8">
                Empowering Careers Through
                <span className="gradient-text block">AI Innovation</span>
              </h1>
              <p className="text-xl text-primary-600 leading-relaxed max-w-3xl mx-auto mb-12">
                We're on a mission to revolutionize career discovery by combining cutting-edge artificial intelligence
                with deep psychological insights to help every individual find their perfect career path.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  <Link href="/quiz">
                    Try Our AI Quiz
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const teamSection = document.getElementById("team")
                    if (teamSection) {
                      teamSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="border-primary-300 text-primary-700 hover:bg-primary-50 hover:border-primary-400 transition-all duration-300 hover:scale-105"
                >
                  Meet Our Team
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="w-full py-20 bg-white">
          <div className="container px-6 md:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="animate-on-scroll">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold gradient-text mb-6">Transforming Career Discovery</h2>
                <p className="text-primary-600 text-lg leading-relaxed mb-8">
                  At CareerCove, we believe that everyone deserves to find work that not only pays the bills but ignites
                  their passion and utilizes their unique strengths. Our AI-powered platform eliminates the guesswork
                  from career planning, providing data-driven insights that lead to fulfilling professional journeys.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-primary-700">Personalized career matching using advanced AI</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-primary-700">Evidence-based career recommendations</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-primary-700">Continuous learning and improvement</span>
                  </div>
                </div>
              </div>
              <div className="animate-on-scroll">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-300 rounded-3xl blur-3xl opacity-30"></div>
                  <Image
                    alt="Organized career planning workspace with notebook, sticky notes, and planning materials representing systematic career development approach"
                    className="relative aspect-square overflow-hidden rounded-3xl object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
                    height="500"
                    src="/images/career-planning.png"
                    width="500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-20 bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="container px-6 md:px-8">
            <div className="text-center mb-16 animate-on-scroll">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-primary-700 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                How We Work
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl gradient-text mb-6">
                AI-Powered Career Discovery
              </h2>
              <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
                Our sophisticated machine learning algorithms analyze thousands of data points to provide you with the
                most accurate career recommendations possible.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
              {howItWorks.map((step, index) => (
                <Card
                  key={index}
                  className="hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll group"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="text-3xl font-bold gradient-text mb-2">{step.step}</div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <CardDescription className="text-primary-600">{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-sm text-primary-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Technology Details */}
            <Card className="hover-lift bg-white border-primary-200/50 shadow-xl animate-on-scroll">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto p-6 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 w-fit mb-6">
                  <Brain className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-2xl gradient-text">Our AI & Machine Learning Technology</CardTitle>
                <CardDescription className="text-lg text-primary-600">
                  Advanced algorithms that power intelligent career recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="text-center">
                    <div className="p-4 rounded-xl bg-primary-50 mb-4">
                      <Code className="h-8 w-8 text-primary-600 mx-auto" />
                    </div>
                    <h3 className="font-semibold text-primary-800 mb-2">Neural Networks</h3>
                    <p className="text-sm text-primary-600">
                      Deep learning models trained on millions of career outcome data points to predict success and
                      satisfaction.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="p-4 rounded-xl bg-primary-50 mb-4">
                      <Database className="h-8 w-8 text-primary-600 mx-auto" />
                    </div>
                    <h3 className="font-semibold text-primary-800 mb-2">Big Data Analytics</h3>
                    <p className="text-sm text-primary-600">
                      Processing vast datasets of career trajectories, industry trends, and psychological profiles.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="p-4 rounded-xl bg-primary-50 mb-4">
                      <TrendingUp className="h-8 w-8 text-primary-600 mx-auto" />
                    </div>
                    <h3 className="font-semibold text-primary-800 mb-2">Predictive Modeling</h3>
                    <p className="text-sm text-primary-600">
                      Forecasting career satisfaction and success probability based on individual characteristics.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="w-full py-20 bg-white">
          <div className="container px-6 md:px-8">
            <div className="text-center mb-16 animate-on-scroll">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                <Users className="w-4 h-4 mr-2" />
                Our Team
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl gradient-text mb-6">Meet the Innovators</h2>
              <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
                Our diverse team of experts combines decades of experience in technology, psychology, and career
                development to create the most advanced career guidance platform.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll group"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="relative mx-auto mb-4">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={120}
                        height={120}
                        className="rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <CardTitle className="text-lg text-primary-800">{member.name}</CardTitle>
                    <CardDescription className="text-primary-600 font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-primary-600 leading-relaxed">{member.bio}</p>
                    <div>
                      <p className="text-xs font-medium text-primary-700 mb-2">Expertise:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.expertise.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="text-xs bg-primary-100 text-primary-700"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-20 bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="container px-6 md:px-8">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold gradient-text mb-6">Our Impact in Numbers</h2>
              <p className="text-xl text-primary-600 max-w-2xl mx-auto">
                Real results from our AI-powered career guidance platform
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center animate-on-scroll group">
                <div className="p-8 rounded-2xl bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
                  <div className="text-primary-600 font-medium">Career Assessments</div>
                  <div className="text-sm text-primary-500 mt-1">Completed successfully</div>
                </div>
              </div>
              <div className="text-center animate-on-scroll group">
                <div className="p-8 rounded-2xl bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl font-bold gradient-text mb-2">95%</div>
                  <div className="text-primary-600 font-medium">Accuracy Rate</div>
                  <div className="text-sm text-primary-500 mt-1">In career predictions</div>
                </div>
              </div>
              <div className="text-center animate-on-scroll group">
                <div className="p-8 rounded-2xl bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl font-bold gradient-text mb-2">500+</div>
                  <div className="text-primary-600 font-medium">Expert Mentors</div>
                  <div className="text-sm text-primary-500 mt-1">Industry professionals</div>
                </div>
              </div>
              <div className="text-center animate-on-scroll group">
                <div className="p-8 rounded-2xl bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl font-bold gradient-text mb-2">10M+</div>
                  <div className="text-primary-600 font-medium">Data Points</div>
                  <div className="text-sm text-primary-500 mt-1">Powering our AI</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/career-planning.png')] opacity-10"></div>
          <div className="container px-6 md:px-8 relative">
            <div className="flex flex-col items-center justify-center space-y-8 text-center animate-on-scroll">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-white max-w-3xl">
                Ready to Discover Your Perfect Career?
              </h2>
              <p className="max-w-2xl text-primary-100 text-lg leading-relaxed">
                Join thousands of professionals who have transformed their careers with our AI-powered guidance.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                <Link href="/quiz">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center px-6 md:px-8 border-t border-primary-200 bg-white">
        <p className="text-sm text-primary-600">© 2024 CareerCove. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-6">
          <Link className="text-sm hover:text-primary-800 transition-colors duration-300" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-sm hover:text-primary-800 transition-colors duration-300" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="text-sm hover:text-primary-800 transition-colors duration-300" href="/contact">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
