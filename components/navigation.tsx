"use client"

import { Button } from "@/components/ui/button"
import { Target, User, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/skills", label: "Skills" },
    { href: "/career-path", label: "Career Path" },
    { href: "/messages", label: "Messages" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="px-3 sm:px-4 md:px-6 lg:px-8 h-14 sm:h-16 md:h-20 flex items-center border-b border-primary-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 transition-all duration-300">
      <Link className="flex items-center justify-center group flex-shrink-0" href="/">
        <div className="p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-300 group-hover:scale-110">
          <Target className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 text-white" />
        </div>
        <span className="ml-2 sm:ml-3 text-lg sm:text-xl md:text-2xl font-bold gradient-text hidden sm:inline">
          CareerCove
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden lg:flex items-center gap-4 xl:gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            className={`text-xs xl:text-sm font-medium transition-all duration-300 relative group whitespace-nowrap ${
              isActive(link.href) ? "text-primary-900" : "text-primary-700 hover:text-primary-900"
            }`}
            href={link.href}
          >
            {link.label}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
                isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
        ))}
        {!loading && (
          <>
            {user ? (
              <Button
                asChild
                size="sm"
                className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-primary-300 text-primary-700 hover:bg-primary-50 transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <Link href="/auth">Sign In</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Link href="/quiz">Start Quiz</Link>
                </Button>
              </>
            )}
          </>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <div className="ml-auto lg:hidden flex items-center gap-2">
        {!loading && user && (
          <Button
            asChild
            size="sm"
            className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
          >
            <Link href="/profile">
              <User className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="hidden xs:inline ml-1">Profile</span>
            </Link>
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-primary-700 hover:bg-primary-50"
        >
          {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-14 sm:top-16 md:top-20 left-0 right-0 bg-white border-b border-primary-200/50 shadow-lg lg:hidden max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <nav className="flex flex-col p-3 sm:p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? "bg-primary-100 text-primary-900"
                    : "text-primary-700 hover:bg-primary-50 hover:text-primary-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!loading && !user && (
              <>
                <hr className="my-2 border-primary-200" />
                <Button
                  asChild
                  variant="outline"
                  className="border-primary-300 text-primary-700 hover:bg-primary-50 w-full transition-all duration-300 bg-transparent text-xs sm:text-sm"
                >
                  <Link href="/auth">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-primary-500 hover:bg-primary-600 text-white w-full shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
                >
                  <Link href="/quiz">Start Quiz</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
