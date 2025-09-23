import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CareerCove - Find Your Perfect Career Path",
  description:
    "Discover your ideal career with AI-powered assessments, expert mentorship, and personalized guidance. Transform your professional journey with CareerCove.",
  keywords: "career guidance, career assessment, job search, mentorship, resume builder, career development",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>CareerCove</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
