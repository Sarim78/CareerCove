"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Upload, Download, CheckCircle, AlertCircle, FileText, Sparkles, TrendingUp } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function ResumePage() {
  const [resumeText, setResumeText] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isBuilding, setIsBuilding] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  const analyzeResume = async () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setAnalysis({
        score: 82,
        strengths: [
          "Strong quantified achievements with specific metrics",
          "Excellent technical skills section with relevant technologies",
          "Clear professional experience with progressive responsibility",
          "Well-structured format with consistent formatting",
        ],
        improvements: [
          "Add more industry-specific keywords for ATS optimization",
          "Include a compelling professional summary at the top",
          "Expand on leadership and collaboration experiences",
          "Add relevant certifications or professional development",
        ],
        keywords: ["JavaScript", "React", "Node.js", "AWS", "Agile", "Leadership", "Analytics"],
        suggestions: [
          "Consider adding a 'Key Achievements' section to highlight major wins",
          "Include links to your portfolio or LinkedIn profile",
          "Tailor your resume for specific job applications",
          "Use action verbs to start each bullet point",
        ],
      })
      setIsAnalyzing(false)
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <Navigation />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <FileText className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
            AI-Powered Resume Enhancement
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-4 sm:mb-6">
            Transform Your Resume
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed px-2">
            Get intelligent feedback and optimization suggestions to make your resume stand out to employers and pass
            through ATS systems.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white border border-primary-200 shadow-sm rounded-lg overflow-hidden">
              <TabsTrigger
                value="upload"
                className="data-[state=active]:bg-primary-500 data-[state=active]:text-white transition-all duration-300 text-xs sm:text-sm"
              >
                Upload
              </TabsTrigger>
              <TabsTrigger
                value="builder"
                className="data-[state=active]:bg-primary-500 data-[state=active]:text-white transition-all duration-300 text-xs sm:text-sm"
              >
                Builder
              </TabsTrigger>
              <TabsTrigger
                value="templates"
                className="data-[state=active]:bg-primary-500 data-[state=active]:text-white transition-all duration-300 text-xs sm:text-sm"
              >
                Templates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6 sm:space-y-8 mt-6 sm:mt-8">
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                <Card className="hover-lift bg-white border-primary-200/50 shadow-lg animate-on-scroll">
                  <CardHeader className="pb-3 sm:pb-4 md:pb-6">
                    <CardTitle className="flex items-center text-lg sm:text-xl text-primary-800">
                      <Upload className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                      Upload Your Resume
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-primary-600 mt-1 sm:mt-2">
                      Upload your resume file or paste the text below for comprehensive AI analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-4 md:px-6">
                    <div className="border-2 border-dashed border-primary-300 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center hover:border-primary-400 hover:bg-primary-50/50 transition-all duration-300 group cursor-pointer">
                      <div className="mx-auto p-3 sm:p-4 rounded-lg sm:rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 w-fit mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="h-6 sm:h-8 w-6 sm:w-8 text-primary-600" />
                      </div>
                      <p className="text-primary-700 font-medium mb-2 text-sm sm:text-base">
                        {selectedFile ? selectedFile.name : "Drag and drop your resume here"}
                      </p>
                      <p className="text-xs sm:text-sm text-primary-500 mb-3 sm:mb-4">
                        Supports PDF, DOC, DOCX files up to 10MB
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setSelectedFile(file)
                            setResumeText(
                              `Resume file uploaded: ${file.name}\n\nThis is a sample resume text for demonstration purposes. In a real application, the file content would be extracted and displayed here.`,
                            )
                          }
                        }}
                        className="hidden"
                        id="resume-upload"
                      />
                      <Button
                        variant="outline"
                        className="border-primary-300 text-primary-700 hover:bg-primary-50 transition-all duration-300 text-xs sm:text-sm bg-transparent"
                        onClick={() => document.getElementById("resume-upload")?.click()}
                      >
                        Choose File
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-primary-200" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-3 text-primary-500 font-medium">Or paste text</span>
                      </div>
                    </div>

                    <Textarea
                      placeholder="Paste your resume text here for instant analysis..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      className="min-h-[200px] sm:min-h-[250px] border-primary-200 focus:border-primary-400 transition-colors duration-300 text-xs sm:text-sm"
                    />

                    <Button
                      onClick={analyzeResume}
                      disabled={!resumeText.trim() || isAnalyzing}
                      className="w-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 hover:scale-105 group text-xs sm:text-sm"
                    >
                      {isAnalyzing ? (
                        <>
                          <Sparkles className="mr-2 h-3 sm:h-4 w-3 sm:w-4 animate-spin" />
                          Analyzing Resume...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="mr-2 h-3 sm:h-4 w-3 sm:w-4 group-hover:scale-110 transition-transform duration-300" />
                          Analyze Resume
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {analysis && (
                  <Card className="hover-lift bg-white border-primary-200/50 shadow-lg animate-scale-in">
                    <CardHeader className="pb-3 sm:pb-4 md:pb-6">
                      <CardTitle className="flex items-center justify-between text-lg sm:text-xl text-primary-800 flex-wrap gap-2">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-green-600" />
                          Resume Analysis
                        </span>
                        <Badge
                          variant={
                            analysis.score >= 80 ? "default" : analysis.score >= 60 ? "secondary" : "destructive"
                          }
                          className={`text-sm sm:text-base px-2 sm:px-4 py-1 sm:py-2 ${
                            analysis.score >= 80
                              ? "bg-green-100 text-green-800"
                              : analysis.score >= 60
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {analysis.score}/100
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-6">
                      <div className="p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-green-50 border border-green-200">
                        <h3 className="font-semibold text-green-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                          <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                          Strengths
                        </h3>
                        <ul className="space-y-1 sm:space-y-2">
                          {analysis.strengths.map((strength: string, index: number) => (
                            <li key={index} className="text-xs sm:text-sm text-green-700 flex items-start">
                              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 sm:mt-2 mr-2 flex-shrink-0"></span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-orange-50 border border-orange-200">
                        <h3 className="font-semibold text-orange-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                          <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                          Areas for Improvement
                        </h3>
                        <ul className="space-y-1 sm:space-y-2">
                          {analysis.improvements.map((improvement: string, index: number) => (
                            <li key={index} className="text-xs sm:text-sm text-orange-700 flex items-start">
                              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 sm:mt-2 mr-2 flex-shrink-0"></span>
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                        <div className="p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-primary-50 border border-primary-200">
                          <h3 className="font-semibold text-primary-800 mb-3 sm:mb-4 text-sm sm:text-base">
                            Detected Keywords
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {analysis.keywords.map((keyword: string, index: number) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="border-primary-300 text-primary-700 hover:bg-primary-100 transition-colors duration-300 text-xs sm:text-sm"
                              >
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-200">
                          <h3 className="font-semibold text-blue-800 mb-3 sm:mb-4 text-sm sm:text-base">Pro Tips</h3>
                          <ul className="space-y-1 sm:space-y-2">
                            {analysis.suggestions.slice(0, 2).map((suggestion: string, index: number) => (
                              <li key={index} className="text-xs sm:text-sm text-blue-700 flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 sm:mt-2 mr-2 flex-shrink-0"></span>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          const enhancedContent = `ENHANCED RESUME\n\n${resumeText}\n\nENHANCEMENTS APPLIED:\n- Optimized keywords for ATS\n- Improved formatting\n- Strengthened action verbs\n- Added quantified achievements`
                          const blob = new Blob([enhancedContent], { type: "text/plain" })
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement("a")
                          a.href = url
                          a.download = "enhanced-resume.txt"
                          document.body.appendChild(a)
                          a.click()
                          document.body.removeChild(a)
                          URL.revokeObjectURL(url)
                        }}
                        className="w-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 hover:scale-105 group text-xs sm:text-sm"
                      >
                        <Download className="mr-2 h-3 sm:h-4 w-3 sm:w-4 group-hover:scale-110 transition-transform duration-300" />
                        Download Enhanced Resume
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="builder" className="space-y-6 sm:space-y-8 mt-6 sm:mt-8">
              <Card className="hover-lift bg-white border-primary-200/50 shadow-lg animate-on-scroll">
                <CardHeader className="pb-3 sm:pb-4 md:pb-6">
                  <CardTitle className="flex items-center text-lg sm:text-xl text-primary-800">
                    <FileText className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    Professional Resume Builder
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-primary-600 mt-1 sm:mt-2">
                    Build your resume step by step with our guided builder and professional templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 sm:space-y-8 px-3 sm:px-4 md:px-6">
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-primary-700 font-medium text-xs sm:text-sm">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        className="border-primary-200 focus:border-primary-400 transition-colors duration-300 text-xs sm:text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-primary-700 font-medium text-xs sm:text-sm">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="border-primary-200 focus:border-primary-400 transition-colors duration-300 text-xs sm:text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-primary-700 font-medium text-xs sm:text-sm">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        className="border-primary-200 focus:border-primary-400 transition-colors duration-300 text-xs sm:text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-primary-700 font-medium text-xs sm:text-sm">
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="San Francisco, CA"
                        className="border-primary-200 focus:border-primary-400 transition-colors duration-300 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary" className="text-primary-700 font-medium text-xs sm:text-sm">
                      Professional Summary
                    </Label>
                    <Textarea
                      id="summary"
                      placeholder="Write a compelling summary of your professional background and key achievements..."
                      className="min-h-[100px] sm:min-h-[120px] border-primary-200 focus:border-primary-400 transition-colors duration-300 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-primary-50 border border-primary-200">
                      <h3 className="font-semibold text-primary-800 mb-3 sm:mb-4 text-sm sm:text-base">
                        Work Experience
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="grid gap-2 sm:gap-3 md:gap-4 md:grid-cols-2">
                          <Input
                            placeholder="Job Title"
                            className="border-primary-200 focus:border-primary-400 text-xs sm:text-sm"
                          />
                          <Input
                            placeholder="Company Name"
                            className="border-primary-200 focus:border-primary-400 text-xs sm:text-sm"
                          />
                        </div>
                        <div className="grid gap-2 sm:gap-3 md:gap-4 md:grid-cols-2">
                          <Input
                            placeholder="Start Date"
                            type="date"
                            className="border-primary-200 focus:border-primary-400 text-xs sm:text-sm"
                          />
                          <Input
                            placeholder="End Date"
                            type="date"
                            className="border-primary-200 focus:border-primary-400 text-xs sm:text-sm"
                          />
                        </div>
                        <Textarea
                          placeholder="Describe your key responsibilities and achievements..."
                          className="border-primary-200 focus:border-primary-400 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-200">
                      <h3 className="font-semibold text-blue-800 mb-3 sm:mb-4 text-sm sm:text-base">Education</h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="grid gap-2 sm:gap-3 md:gap-4 md:grid-cols-2">
                          <Input
                            placeholder="Degree"
                            className="border-primary-200 focus:border-primary-400 text-xs sm:text-sm"
                          />
                          <Input
                            placeholder="School/University"
                            className="border-primary-200 focus:border-primary-400 text-xs sm:text-sm"
                          />
                        </div>
                        <div className="grid gap-2 sm:gap-3 md:gap-4 md:grid-cols-2">
                          <Input
                            placeholder="Graduation Year"
                            className="border-primary-200 focus:border-primary-400 text-xs sm:text-sm"
                          />
                          <Input
                            placeholder="GPA (Optional)"
                            className="border-primary-200 focus:border-primary-400 text-xs sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-green-50 border border-green-200">
                      <h3 className="font-semibold text-green-800 mb-3 sm:mb-4 text-sm sm:text-base">Skills</h3>
                      <Textarea
                        placeholder="List your key skills separated by commas (e.g., JavaScript, React, Node.js, Project Management)"
                        className="border-primary-200 focus:border-primary-400 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setIsBuilding(true)
                      setTimeout(() => {
                        alert("Resume saved! You can continue building or download your resume.")
                        setIsBuilding(false)
                      }, 1000)
                    }}
                    disabled={isBuilding}
                    className="w-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                  >
                    {isBuilding ? "Saving..." : "Save & Continue Building Resume"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6 sm:space-y-8 mt-6 sm:mt-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-primary-800 mb-2 sm:mb-4">
                  Choose Your Resume Template
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-primary-600">
                  Select a professional template that matches your industry and style
                </p>
              </div>

              <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Modern Professional",
                    category: "Business",
                    color: "from-blue-100 to-blue-200",
                    description: "Clean and professional design perfect for corporate roles",
                  },
                  {
                    name: "Creative Designer",
                    category: "Creative",
                    color: "from-purple-100 to-purple-200",
                    description: "Bold and creative layout for design professionals",
                  },
                  {
                    name: "Tech Specialist",
                    category: "Technology",
                    color: "from-green-100 to-green-200",
                    description: "Technical and structured format for IT professionals",
                  },
                  {
                    name: "Executive Leader",
                    category: "Leadership",
                    color: "from-primary-100 to-primary-200",
                    description: "Sophisticated design for senior management roles",
                  },
                  {
                    name: "Fresh Graduate",
                    category: "Entry Level",
                    color: "from-yellow-100 to-yellow-200",
                    description: "Perfect for new graduates and entry-level positions",
                  },
                  {
                    name: "Consultant",
                    category: "Consulting",
                    color: "from-pink-100 to-pink-200",
                    description: "Professional layout for consulting and advisory roles",
                  },
                ].map((template, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover-lift bg-white border-primary-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll group"
                  >
                    <CardHeader className="pb-3 sm:pb-4">
                      <div
                        className={`h-32 sm:h-40 md:h-48 bg-gradient-to-br ${template.color} rounded-lg sm:rounded-xl mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative overflow-hidden`}
                      >
                        <FileText className="h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 text-primary-600 opacity-50" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300"></div>
                      </div>
                      <CardTitle className="text-sm sm:text-base text-primary-800">{template.name}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm text-primary-600 mb-1 sm:mb-2">
                        {template.category}
                      </CardDescription>
                      <p className="text-xs text-primary-500">{template.description}</p>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-4 md:px-6">
                      <Button
                        onClick={() => alert(`${template.name} template selected!`)}
                        className="w-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                      >
                        Use This Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8 sm:mt-12">
                <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-primary-800 mb-3 sm:mb-4">
                      Need a Custom Template?
                    </h3>
                    <p className="text-xs sm:text-sm text-primary-600 mb-4 sm:mb-6">
                      Can't find the perfect template? Our design team can create a custom resume template tailored to
                      your specific industry and needs.
                    </p>
                    <Button
                      variant="outline"
                      className="border-primary-300 text-primary-700 hover:bg-primary-50 text-xs sm:text-sm bg-transparent"
                      onClick={() => alert("Custom template request feature coming soon!")}
                    >
                      Request Custom Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
