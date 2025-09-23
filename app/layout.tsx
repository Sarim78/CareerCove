import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CareerCove - Discover Your Ideal Career Path",
  description:
    "Empowering students and adults in discovering their ideal career pathways and passions with personalized guidance, industry insights, and skill-building resources.",
  keywords: "career guidance, career quiz, mentorship, resume builder, professional development",
  authors: [{ name: "CareerCove Team" }],
  openGraph: {
    title: "CareerCove - Discover Your Ideal Career Path",
    description: "Empowering students and adults in discovering their ideal career pathways and passions.",
    type: "website",
  },
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
