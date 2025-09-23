"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Target, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="px-4 lg:px-8 h-16 lg:h-20 flex items-center border-b border-primary-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 transition-all duration-300">
      <Link className="flex items-center justify-center group" href="/" onClick={closeMobileMenu}>
        <div className="p-1.5 lg:p-2 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-300 group-hover:scale-110">
          <Target className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
        </div>
        <span className="ml-2 lg:ml-3 text-xl lg:text-2xl font-bold gradient-text">CareerCove</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden lg:flex items-center gap-8">
        <Link
          className={`text-sm font-medium transition-all duration-300 relative group ${
            isActive("/") ? "text-primary-900" : "text-primary-700 hover:text-primary-900"
          }`}
          href="/"
        >
          Home
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
              isActive("/") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          className={`text-sm font-medium transition-all duration-300 relative group ${
            isActive("/quiz") ? "text-primary-900" : "text-primary-700 hover:text-primary-900"
          }`}
          href="/quiz"
        >
          Quiz
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
              isActive("/quiz") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          className={`text-sm font-medium transition-all duration-300 relative group ${
            isActive("/mentors") ? "text-primary-900" : "text-primary-700 hover:text-primary-900"
          }`}
          href="/mentors"
        >
          Mentors
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
              isActive("/mentors") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          className={`text-sm font-medium transition-all duration-300 relative group ${
            isActive("/resume") ? "text-primary-900" : "text-primary-700 hover:text-primary-900"
          }`}
          href="/resume"
        >
          Resume
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
              isActive("/resume") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          className={`text-sm font-medium transition-all duration-300 relative group ${
            isActive("/reviews") ? "text-primary-900" : "text-primary-700 hover:text-primary-900"
          }`}
          href="/reviews"
        >
          Reviews
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
              isActive("/reviews") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          className={`text-sm font-medium transition-all duration-300 relative group ${
            isActive("/about") ? "text-primary-900" : "text-primary-700 hover:text-primary-900"
          }`}
          href="/about"
        >
          About
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
              isActive("/about") ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
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
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="ml-auto lg:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors duration-300"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6 text-primary-700" /> : <Menu className="h-6 w-6 text-primary-700" />}
      </button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-primary-200 shadow-xl lg:hidden z-50">
          <nav className="flex flex-col p-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <Link
              className={`text-base font-medium transition-all duration-300 py-3 px-4 rounded-lg ${
                isActive("/")
                  ? "text-primary-900 bg-primary-50"
                  : "text-primary-700 hover:text-primary-900 hover:bg-primary-50"
              }`}
              href="/"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              className={`text-base font-medium transition-all duration-300 py-3 px-4 rounded-lg ${
                isActive("/quiz")
                  ? "text-primary-900 bg-primary-50"
                  : "text-primary-700 hover:text-primary-900 hover:bg-primary-50"
              }`}
              href="/quiz"
              onClick={closeMobileMenu}
            >
              Quiz
            </Link>
            <Link
              className={`text-base font-medium transition-all duration-300 py-3 px-4 rounded-lg ${
                isActive("/mentors")
                  ? "text-primary-900 bg-primary-50"
                  : "text-primary-700 hover:text-primary-900 hover:bg-primary-50"
              }`}
              href="/mentors"
              onClick={closeMobileMenu}
            >
              Mentors
            </Link>
            <Link
              className={`text-base font-medium transition-all duration-300 py-3 px-4 rounded-lg ${
                isActive("/resume")
                  ? "text-primary-900 bg-primary-50"
                  : "text-primary-700 hover:text-primary-900 hover:bg-primary-50"
              }`}
              href="/resume"
              onClick={closeMobileMenu}
            >
              Resume
            </Link>
            <Link
              className={`text-base font-medium transition-all duration-300 py-3 px-4 rounded-lg ${
                isActive("/reviews")
                  ? "text-primary-900 bg-primary-50"
                  : "text-primary-700 hover:text-primary-900 hover:bg-primary-50"
              }`}
              href="/reviews"
              onClick={closeMobileMenu}
            >
              Reviews
            </Link>
            <Link
              className={`text-base font-medium transition-all duration-300 py-3 px-4 rounded-lg ${
                isActive("/about")
                  ? "text-primary-900 bg-primary-50"
                  : "text-primary-700 hover:text-primary-900 hover:bg-primary-50"
              }`}
              href="/about"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <div className="flex flex-col space-y-3 pt-4 border-t border-primary-200">
              <Button
                asChild
                variant="outline"
                className="border-primary-300 text-primary-700 hover:bg-primary-50 transition-all duration-300 bg-transparent"
              >
                <Link href="/auth" onClick={closeMobileMenu}>
                  Sign In
                </Link>
              </Button>
              <Button
                asChild
                className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/quiz" onClick={closeMobileMenu}>
                  Start Quiz
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
