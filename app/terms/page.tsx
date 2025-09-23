"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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
                <FileText className="w-4 h-4 mr-2" />
                Legal Information
              </div>
              <h1 className="text-4xl font-bold gradient-text mb-4">Terms of Service</h1>
              <p className="text-primary-600 text-lg">Last updated: December 2024</p>
            </div>
          </div>

          <Card className="bg-white border-primary-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-800">CareerCove Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-primary max-w-none">
              <div className="space-y-8 text-primary-700">
                <section>
                  <h2 className="text-xl font-semibold text-primary-800 mb-4">1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using CareerCove's services, you accept and agree to be bound by the terms and
                    provision of this agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-primary-800 mb-4">2. Use License</h2>
                  <p>
                    Permission is granted to temporarily use CareerCove's services for personal, non-commercial
                    transitory viewing only. This is the grant of a license, not a transfer of title.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-primary-800 mb-4">3. User Accounts</h2>
                  <p>
                    When you create an account with us, you must provide information that is accurate, complete, and
                    current at all times. You are responsible for safeguarding the password and for all activities that
                    occur under your account.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-primary-800 mb-4">4. Privacy Policy</h2>
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of
                    the Service, to understand our practices.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-primary-800 mb-4">5. Mentorship Services</h2>
                  <p>
                    CareerCove facilitates connections between mentors and mentees. We are not responsible for the
                    quality or outcome of mentorship sessions. All interactions are between users directly.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-primary-800 mb-4">6. Contact Information</h2>
                  <p>
                    If you have any questions about these Terms of Service, please contact us at legal@careercove.com.
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
