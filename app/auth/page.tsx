"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navigation } from "@/components/navigation"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Strips leading/trailing whitespace and removes HTML angle brackets. */
const sanitize = (s: string) => s.trim().replace(/[<>]/g, "")

/** Basic email format check. */
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

/**
 * Scores password strength on a 0–6 scale, returning a label and
 * a list of unmet criteria to show as hints.
 */
function getPasswordStrength(password: string): {
  strength: "weak" | "medium" | "strong"
  score: number
  feedback: string[]
} {
  const checks = [
    { test: password.length >= 8,             hint: "At least 8 characters" },
    { test: password.length >= 12,            hint: "" },
    { test: /[a-z]/.test(password),           hint: "Add lowercase letters" },
    { test: /[A-Z]/.test(password),           hint: "Add uppercase letters" },
    { test: /[0-9]/.test(password),           hint: "Add numbers" },
    { test: /[^a-zA-Z0-9]/.test(password),   hint: "Add special characters (!@#$%)" },
  ]
  const score    = checks.filter((c) => c.test).length
  const feedback = checks.filter((c) => !c.test && c.hint).map((c) => c.hint)
  const strength = score >= 5 ? "strong" : score >= 3 ? "medium" : "weak"
  return { strength, score, feedback }
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * AuthPage — sign-in and sign-up tabs with client-side validation.
 *
 * Auth is simulated (no backend). The sign-in flow redirects to "/" on success;
 * sign-up validates password strength before accepting the form.
 */
export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading]   = useState(false)
  const [error, setError]           = useState("")
  const [success, setSuccess]       = useState("")

  const [loginData, setLoginData]     = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({ fullName: "", email: "", password: "", confirmPassword: "" })
  const [passwordStrength, setPasswordStrength] = useState<ReturnType<typeof getPasswordStrength>>({
    strength: "weak", score: 0, feedback: [],
  })

  // Recalculate password strength whenever the register password changes
  useEffect(() => {
    setPasswordStrength(registerData.password ? getPasswordStrength(registerData.password) : { strength: "weak", score: 0, feedback: [] })
  }, [registerData.password])

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(""); setSuccess("")
    if (!loginData.email || !loginData.password) return setError("Please fill in all fields")

    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    setSuccess("Login successful! Redirecting...")
    setTimeout(() => router.push("/"), 1000)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(""); setSuccess("")

    const name  = sanitize(registerData.fullName)
    const email = sanitize(registerData.email)
    const { password, confirmPassword } = registerData

    if (!name || !email || !password || !confirmPassword) return setError("Please fill in all fields")
    if (name.length < 2)               return setError("Full name must be at least 2 characters")
    if (!isValidEmail(email))          return setError("Please enter a valid email address")
    if (password !== confirmPassword)  return setError("Passwords do not match")
    if (password.length < 8)           return setError("Password must be at least 8 characters long")
    if (passwordStrength.strength === "weak") return setError("Please use a stronger password. " + passwordStrength.feedback.join(", "))

    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    setSuccess("Registration successful! You can now sign in.")
    setRegisterData({ fullName: "", email: "", password: "", confirmPassword: "" })
  }

  // ── Shared alert UI ─────────────────────────────────────────────────────────

  const Alerts = () => (
    <>
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </>
  )

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <Navigation />
      <div className="flex items-center justify-center p-4 pt-32">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome to CareerCove</CardTitle>
            <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              {/* ── Sign In ── */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="you@example.com" required disabled={isLoading}
                      value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" type="password" required disabled={isLoading}
                      value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                  </div>
                  <Alerts />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* ── Sign Up ── */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input id="register-name" type="text" placeholder="John Doe" required disabled={isLoading}
                      value={registerData.fullName} onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" type="email" placeholder="you@example.com" required disabled={isLoading}
                      value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input id="register-password" type="password" placeholder="Create a strong password" required disabled={isLoading}
                      value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />

                    {/* Password strength meter */}
                    {registerData.password && (
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-300 ${
                              passwordStrength.strength === "strong" ? "bg-green-500 w-full"
                              : passwordStrength.strength === "medium" ? "bg-yellow-500 w-2/3"
                              : "bg-red-500 w-1/3"
                            }`} />
                          </div>
                          <span className={`text-xs font-medium capitalize ${
                            passwordStrength.strength === "strong" ? "text-green-600"
                            : passwordStrength.strength === "medium" ? "text-yellow-600"
                            : "text-red-600"
                          }`}>
                            {passwordStrength.strength}
                          </span>
                        </div>
                        {passwordStrength.feedback.length > 0 && (
                          <div className="flex items-start gap-2 text-xs text-gray-600">
                            <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            <span>{passwordStrength.feedback.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <Input id="register-confirm" type="password" required disabled={isLoading}
                      value={registerData.confirmPassword} onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })} />
                  </div>
                  <Alerts />
                  <Button type="submit" className="w-full" disabled={isLoading}>
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
