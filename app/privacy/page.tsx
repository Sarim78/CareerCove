"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <Navigation />

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              asChild
              variant="ghost"
              className="mb-6 text-primary-600 hover:text-primary-800 hover:bg-primary-100"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>

            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Privacy & Security
              </div>
              <h1 className="text-4xl font-bold gradient-text mb-4">Privacy Policy</h1>
              <p className="text-primary-600 text-lg">Last updated: December 2024</p>
            </div>
          </div>

          <Card className="bg-white border-primary-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-800">CareerCove Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-primary max-w-none">
              <div className="space-y-8 text-primary-700">
                <section>
                  <h2 className="text-xl font-semibold text-primary-800 mb-4">1. Information We Collect</h2>
                  <p>
                    We collect information you provide directly to us, such as when you create an account, take our
                    career quiz, or communicate with mentors through our platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-primary-800 mb-4">2. How We Use Your Information</h2>
                  <p>
                    We use the information we collect to provide, maintain, and improve our services, including career
                    recommendations and mentor matching.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-primary-800 mb-4">3. Information Sharing</h2>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your
                    consent, except as described in this policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-primary-800 mb-4">4. Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information against unauthorized
                    access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-primary-800 mb-4">5. AI and Machine Learning</h2>
                  <p>
                    We use AI and machine learning algorithms to analyze your quiz responses and provide career
                    recommendations. This data is processed securely and used only for improving our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-primary-800 mb-4">6. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at privacy@careercove.com.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
