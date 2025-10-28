"use client"

import { Button } from "@/components/ui/button"
import { Target } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="px-6 lg:px-8 h-20 flex items-center border-b border-primary-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 transition-all duration-300">
      <Link className="flex items-center justify-center group" href="/">
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-300 group-hover:scale-110">
          <Target className="h-6 w-6 text-white" />
        </div>
        <span className="ml-3 text-2xl font-bold gradient-text">CareerCove</span>
      </Link>
      <nav className="ml-auto flex items-center gap-8">
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
          className="border-primary-300 text-primary-700 hover:bg-primary-50 transition-all duration-300 hover:scale-105"
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
    </header>
  )
}
