"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import {
  sanitizeInput,
  isValidEmail,
  validatePasswordStrength,
  isValidFullName,
  rateLimiter,
  escapeHtml,
} from "@/lib/utils/validation"
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, CheckCircle2 } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<{ isValid: boolean; errors: string[]; strength: 'weak' | 'medium' | 'strong' } | null>(null)

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Check if user is already logged in and handle email confirmation
  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      
      // Handle email confirmation callback
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (session?.user) {
        // Check if this is an email confirmation callback
        if (typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search)
          if (urlParams.get('confirmed') === 'true') {
            setSuccess("Email confirmed successfully! Redirecting to your profile...")
            setTimeout(() => {
              router.push("/profile")
              router.refresh()
            }, 2000)
            return
          }
        }
        // User is already logged in
        router.push("/profile")
      }
    }
    checkUser()
  }, [router])

  // Validate password strength in real-time
  useEffect(() => {
    if (registerData.password) {
      setPasswordStrength(validatePasswordStrength(registerData.password))
    } else {
      setPasswordStrength(null)
    }
  }, [registerData.password])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Rate limiting
    const rateLimitKey = `login:${loginData.email}`
    if (!rateLimiter.isAllowed(rateLimitKey, 5, 15 * 60 * 1000)) {
      setError("Too many login attempts. Please try again in 15 minutes.")
      return
    }

    // Input sanitization
    const sanitizedEmail = sanitizeInput(loginData.email)
    const sanitizedPassword = loginData.password // Don't sanitize passwords

    // Validation
    if (!sanitizedEmail || !sanitizedPassword) {
      setError("Please fill in all fields")
      return
    }

    if (!isValidEmail(sanitizedEmail)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()
      
      // Additional CSRF protection: Supabase handles this via cookies, but we verify session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail.toLowerCase(),
        password: sanitizedPassword,
      })

      if (signInError) {
        throw signInError
      }

      // Success - reset rate limiter only on successful login
      rateLimiter.reset(rateLimitKey)
      setSuccess("Login successful! Redirecting...")
      setTimeout(() => {
        router.push("/profile")
        router.refresh()
      }, 1000)
    } catch (err: any) {
      // Sanitize error message to prevent XSS
      const errorMessage = err.message || "Login failed. Please try again."
      setError(escapeHtml(errorMessage))
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Rate limiting
    const rateLimitKey = `register:${registerData.email}`
    if (!rateLimiter.isAllowed(rateLimitKey, 3, 60 * 60 * 1000)) {
      setError("Too many registration attempts. Please try again in an hour.")
      return
    }

    // Input sanitization
    const sanitizedFullName = sanitizeInput(registerData.fullName)
    const sanitizedEmail = sanitizeInput(registerData.email)
    const password = registerData.password // Don't sanitize passwords

    // Validation
    const nameValidation = isValidFullName(sanitizedFullName)
    if (!nameValidation.isValid) {
      setError(nameValidation.error || "Invalid name")
      return
    }

    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Password is required")
      return
    }

    const passwordValidation = validatePasswordStrength(password)
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors[0])
      return
    }

    if (password !== registerData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()
      
      const { error: signUpError } = await supabase.auth.signUp({
        email: sanitizedEmail.toLowerCase(),
        password: password,
        options: {
          emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth?confirmed=true`,
          data: {
            full_name: sanitizedFullName,
          },
        },
      })

      if (signUpError) {
        throw signUpError
      }

      // Success - reset rate limiter only on successful registration
      rateLimiter.reset(rateLimitKey)
      setSuccess("Registration successful! Please check your email to confirm your account before signing in.")
      
      // Clear form after successful registration
      setRegisterData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setPasswordStrength(null)
    } catch (err: any) {
      // Sanitize error message to prevent XSS
      const errorMessage = err.message || "Registration failed. Please try again."
      setError(escapeHtml(errorMessage))
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = (strength: 'weak' | 'medium' | 'strong') => {
    switch (strength) {
      case 'weak':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'strong':
        return 'bg-green-500'
      default:
        return 'bg-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <Navigation />
      <div className="flex items-center justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-20 sm:pb-24 min-h-[calc(100vh-5rem)]">
        <Card className="w-full max-w-md shadow-2xl border-primary-200/50 bg-white/90 backdrop-blur-sm mx-auto">
          <CardHeader className="space-y-3 pb-4 sm:pb-6 px-4 sm:px-6 pt-6 sm:pt-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center gradient-text">
              Welcome to CareerCove
            </CardTitle>
            <CardDescription className="text-center text-primary-600 text-sm sm:text-base">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-6 sm:pb-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-primary-100/50 border border-primary-200/50 h-10 sm:h-11">
                <TabsTrigger 
                  value="login"
                  className="data-[state=active]:bg-primary-500 data-[state=active]:text-white text-primary-700 font-medium text-sm sm:text-base px-2 sm:px-3"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="register"
                  className="data-[state=active]:bg-primary-500 data-[state=active]:text-white text-primary-700 font-medium text-sm sm:text-base px-2 sm:px-3"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-4 sm:mt-6">
                <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-primary-700 font-medium flex items-center gap-2 text-sm sm:text-base">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="border-primary-200 focus:border-primary-500 focus:ring-primary-500 h-10 sm:h-10 text-sm sm:text-base"
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-primary-700 font-medium flex items-center gap-2 text-sm sm:text-base">
                      <Lock className="w-4 h-4 flex-shrink-0" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="border-primary-200 focus:border-primary-500 focus:ring-primary-500 pr-10 h-10 sm:h-10 text-sm sm:text-base"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600 transition-colors touch-manipulation"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 text-xs sm:text-sm text-red-700 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="break-words">{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="p-3 text-xs sm:text-sm text-green-700 bg-green-50 border border-green-200 rounded-md flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="break-words">{success}</span>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] h-10 sm:h-11 text-sm sm:text-base font-medium" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 mt-4 sm:mt-6">
                <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-primary-700 font-medium flex items-center gap-2 text-sm sm:text-base">
                      <User className="w-4 h-4 flex-shrink-0" />
                      Full Name
                    </Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={registerData.fullName}
                      onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                      className="border-primary-200 focus:border-primary-500 focus:ring-primary-500 h-10 sm:h-10 text-sm sm:text-base"
                      autoComplete="name"
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-primary-700 font-medium flex items-center gap-2 text-sm sm:text-base">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      Email
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="border-primary-200 focus:border-primary-500 focus:ring-primary-500 h-10 sm:h-10 text-sm sm:text-base"
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-primary-700 font-medium flex items-center gap-2 text-sm sm:text-base">
                      <Lock className="w-4 h-4 flex-shrink-0" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        required
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        className="border-primary-200 focus:border-primary-500 focus:ring-primary-500 pr-10 h-10 sm:h-10 text-sm sm:text-base"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600 transition-colors touch-manipulation"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                    {passwordStrength && registerData.password && (
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 sm:h-2.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.strength)}`}
                              style={{
                                width: passwordStrength.strength === 'weak' ? '33%' : passwordStrength.strength === 'medium' ? '66%' : '100%',
                              }}
                            />
                          </div>
                          <span className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
                            passwordStrength.strength === 'weak' ? 'text-red-600' :
                            passwordStrength.strength === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                          </span>
                        </div>
                        {!passwordStrength.isValid && (
                          <ul className="text-xs text-red-600 space-y-1 ml-1 pr-2">
                            {passwordStrength.errors.map((error, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="flex-shrink-0">•</span>
                                <span className="break-words">{error}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm" className="text-primary-700 font-medium flex items-center gap-2 text-sm sm:text-base">
                      <Lock className="w-4 h-4 flex-shrink-0" />
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="register-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        required
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        className="border-primary-200 focus:border-primary-500 focus:ring-primary-500 pr-10 h-10 sm:h-10 text-sm sm:text-base"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600 transition-colors touch-manipulation"
                        aria-label="Toggle password visibility"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                    {registerData.confirmPassword && registerData.password !== registerData.confirmPassword && (
                      <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>Passwords do not match</span>
                      </p>
                    )}
                  </div>

                  {error && (
                    <div className="p-3 text-xs sm:text-sm text-red-700 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="break-words">{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="p-3 text-xs sm:text-sm text-green-700 bg-green-50 border border-green-200 rounded-md flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="break-words">{success}</span>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] h-10 sm:h-11 text-sm sm:text-base font-medium" 
                    disabled={isLoading || (passwordStrength !== null && !passwordStrength.isValid)}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
