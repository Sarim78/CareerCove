"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, User, Target, ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type UserType = "user" | "company" | null
type AuthMode = "login" | "signup"

export default function AuthPage() {
  const [userType, setUserType] = useState<UserType>(null)
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert(`${authMode === "login" ? "Login" : "Account creation"} successful! Welcome to CareerCove.`)
      router.push("/quiz") // Redirect to quiz after successful auth
    }, 2000)
  }

  const resetSelection = () => {
    setUserType(null)
    setAuthMode("login")
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <Link className="inline-flex items-center justify-center group mb-8" href="/">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-300 group-hover:scale-110">
                <Target className="h-8 w-8 text-white" />
              </div>
              <span className="ml-3 text-3xl font-bold gradient-text">CareerCove</span>
            </Link>
            <h1 className="text-4xl font-bold text-primary-800 mb-4">Welcome to CareerCove</h1>
            <p className="text-xl text-primary-600 max-w-2xl mx-auto">
              Choose your account type to get started with personalized career guidance
            </p>
          </div>

          {/* User Type Selection */}
          <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto">
            <Card
              className="cursor-pointer hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 animate-slide-in-left group"
              onClick={() => setUserType("user")}
            >
              <CardHeader className="text-center pb-6">
                <div className="mx-auto p-6 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-primary-800">Job Seeker</CardTitle>
                <CardDescription className="text-lg text-primary-600 leading-relaxed">
                  Find your perfect career path with personalized guidance, mentorship, and resume enhancement tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-primary-700">
                    <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                    Take career assessment quiz
                  </div>
                  <div className="flex items-center text-sm text-primary-700">
                    <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                    Connect with industry mentors
                  </div>
                  <div className="flex items-center text-sm text-primary-700">
                    <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                    Enhance your resume with AI
                  </div>
                  <div className="flex items-center text-sm text-primary-700">
                    <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                    Access job recommendations
                  </div>
                </div>
                <Button className="w-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 hover:scale-105 group">
                  Continue as Job Seeker
                </Button>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 animate-slide-in-right group"
              onClick={() => setUserType("company")}
            >
              <CardHeader className="text-center pb-6">
                <div className="mx-auto p-6 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-primary-800">Company / Employer</CardTitle>
                <CardDescription className="text-lg text-primary-600 leading-relaxed">
                  Find top talent, post job opportunities, and connect with qualified candidates through our platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-primary-700">
                    <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                    Post job opportunities
                  </div>
                  <div className="flex items-center text-sm text-primary-700">
                    <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                    Access talent pool
                  </div>
                  <div className="flex items-center text-sm text-primary-700">
                    <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                    Company branding tools
                  </div>
                  <div className="flex items-center text-sm text-primary-700">
                    <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                    Recruitment analytics
                  </div>
                </div>
                <Button className="w-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 hover:scale-105 group">
                  Continue as Employer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={resetSelection}
          className="mb-6 text-primary-600 hover:text-primary-800 hover:bg-primary-100 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to selection
        </Button>

        <Card className="hover-lift bg-white border-primary-200/50 shadow-xl animate-scale-in">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 w-fit mb-4">
              {userType === "user" ? (
                <User className="h-8 w-8 text-primary-600" />
              ) : (
                <Building2 className="h-8 w-8 text-primary-600" />
              )}
            </div>
            <CardTitle className="text-2xl gradient-text">
              {authMode === "login" ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-primary-600">
              {authMode === "login"
                ? `Sign in to your ${userType === "user" ? "job seeker" : "company"} account`
                : `Create your ${userType === "user" ? "job seeker" : "company"} account`}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {authMode === "signup" && userType === "user" && (
                <>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-primary-700 font-medium">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        required
                        className="border-primary-200 focus:border-primary-400 transition-colors duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-primary-700 font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        required
                        className="border-primary-200 focus:border-primary-400 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-primary-700 font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="border-primary-200 focus:border-primary-400 transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-primary-700 font-medium">
                      Experience Level
                    </Label>
                    <Select>
                      <SelectTrigger className="border-primary-200 focus:border-primary-400">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                        <SelectItem value="executive">Executive (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-primary-700 font-medium">
                      Industry Interest
                    </Label>
                    <Select>
                      <SelectTrigger className="border-primary-200 focus:border-primary-400">
                        <SelectValue placeholder="Select your industry of interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {authMode === "signup" && userType === "company" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-primary-700 font-medium">
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      placeholder="Acme Corporation"
                      required
                      className="border-primary-200 focus:border-primary-400 transition-colors duration-300"
                    />
                  </div>

                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contactFirstName" className="text-primary-700 font-medium">
                        Contact First Name
                      </Label>
                      <Input
                        id="contactFirstName"
                        placeholder="Jane"
                        required
                        className="border-primary-200 focus:border-primary-400 transition-colors duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactLastName" className="text-primary-700 font-medium">
                        Contact Last Name
                      </Label>
                      <Input
                        id="contactLastName"
                        placeholder="Smith"
                        required
                        className="border-primary-200 focus:border-primary-400 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-primary-700 font-medium">
                      Your Job Title
                    </Label>
                    <Input
                      id="jobTitle"
                      placeholder="HR Manager"
                      required
                      className="border-primary-200 focus:border-primary-400 transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyIndustry" className="text-primary-700 font-medium">
                      Company Industry
                    </Label>
                    <Select>
                      <SelectTrigger className="border-primary-200 focus:border-primary-400">
                        <SelectValue placeholder="Select your company's industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance & Banking</SelectItem>
                        <SelectItem value="retail">Retail & E-commerce</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companySize" className="text-primary-700 font-medium">
                      Company Size
                    </Label>
                    <Select>
                      <SelectTrigger className="border-primary-200 focus:border-primary-400">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                        <SelectItem value="small">Small (11-50 employees)</SelectItem>
                        <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                        <SelectItem value="large">Large (201-1000 employees)</SelectItem>
                        <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-primary-700 font-medium">
                      Company Website
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://www.company.com"
                      className="border-primary-200 focus:border-primary-400 transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-primary-700 font-medium">
                      Company Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your company and what you do..."
                      className="min-h-[80px] border-primary-200 focus:border-primary-400 transition-colors duration-300"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary-700 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="pl-10 border-primary-200 focus:border-primary-400 transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-primary-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="pl-10 pr-10 border-primary-200 focus:border-primary-400 transition-colors duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-600 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {authMode === "signup" && (
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm text-primary-600">
                    I agree to the{" "}
                    <Link href="#" className="text-primary-700 hover:text-primary-900 underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-primary-700 hover:text-primary-900 underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 hover:scale-105 group"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {authMode === "login" ? "Signing In..." : "Creating Account..."}
                  </>
                ) : (
                  <>{authMode === "login" ? "Sign In" : "Create Account"}</>
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
                  className="text-sm text-primary-600 hover:text-primary-800 transition-colors duration-300"
                >
                  {authMode === "login" ? `Don't have an account? Sign up` : "Already have an account? Sign in"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
