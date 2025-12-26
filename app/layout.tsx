import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Fira_Code } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CareerCove - Find Your Dream Career Path",
  description:
    "Discover your ideal career pathway with personalized guidance, industry insights, and skill-building resources.",
  generator: "v0.app",
  icons: {
    icon: [{ url: "/icon.png" }, { url: "/favicon.png", type: "image/png" }],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
