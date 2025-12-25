"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, MapPin, Clock, DollarSign, Search, Bookmark, BookmarkCheck, ArrowRight } from "lucide-react"

/**
 * Jobs Page
 * Frontend-only version: Displays mock job listings and handles filtering locally.
 */
export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterField, setFilterField] = useState("all")
  const [filterLevel, setFilterLevel] = useState("all")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    // Load mock job data
    const mockJobs = [
      {
        id: "1",
        title: "Senior UX Designer",
        company: "DesignCo",
        location: "Remote",
        job_type: "full-time",
        salary_range: "$120k - $160k",
        description: "Leading the design for our core product...",
        career_field: "creative",
        experience_level: "senior",
        skills_required: ["Figma", "Design Systems", "User Research"],
      },
      {
        id: "2",
        title: "Frontend Engineer",
        company: "TechFlow",
        location: "New York, NY",
        job_type: "full-time",
        salary_range: "$130k - $170k",
        description: "Building modern web applications with React and Next.js...",
        career_field: "technology",
        experience_level: "mid",
        skills_required: ["React", "TypeScript", "Tailwind CSS"],
      },
      {
        id: "3",
        title: "Marketing Intern",
        company: "GrowthLabs",
        location: "San Francisco, CA",
        job_type: "internship",
        salary_range: "$30/hr",
        description: "Assist with social media campaigns and analytics...",
        career_field: "business",
        experience_level: "entry",
        skills_required: ["Social Media", "Content Creation", "Analytics"],
      },
    ]
    setJobs(mockJobs)
    setLoading(false)
  }, [])

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(jobId)) newSet.delete(jobId)
      else newSet.add(jobId)
      return newSet
    })
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesField = filterField === "all" || job.career_field === filterField
    const matchesLevel = filterLevel === "all" || job.experience_level === filterLevel
    const matchesType = filterType === "all" || job.job_type === filterType

    return matchesSearch && matchesField && matchesLevel && matchesType
  })

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navigation />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-3 sm:mb-4">
            Find Your Perfect Job
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-primary-700 max-w-2xl mx-auto px-4">
            Personalized job recommendations based on your skills, interests, and career goals
          </p>
        </div>

        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
            <Input
              placeholder="Search jobs, companies, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Select value={filterField} onValueChange={setFilterField}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Career Field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-sm text-primary-600 mb-4">
          Showing {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
        </p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <p className="mt-4 text-primary-600">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <Card className="p-8 sm:p-12 text-center">
            <Briefcase className="w-16 h-16 mx-auto text-primary-300 mb-4" />
            <h3 className="text-xl font-semibold text-primary-900 mb-2">No jobs found</h3>
            <p className="text-primary-600">Try adjusting your search or filters</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-lg transition-all duration-300 border-primary-100 hover:border-primary-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg sm:text-xl text-primary-900 mb-1 break-words">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="text-base font-medium text-primary-700">
                        {job.company}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSaveJob(job.id)}
                      className="hover:bg-primary-50 self-start sm:self-center shrink-0"
                    >
                      {savedJobs.has(job.id) ? (
                        <BookmarkCheck className="w-5 h-5 text-primary-500 fill-current" />
                      ) : (
                        <Bookmark className="w-5 h-5 text-primary-400" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-primary-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="break-words">{job.location || "Remote"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span className="capitalize">{job.job_type?.replace("-", " ")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 shrink-0" />
                      <span>{job.salary_range}</span>
                    </div>
                  </div>
                  <p className="text-sm text-primary-700 line-clamp-2">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills_required?.slice(0, 4).map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-primary-50 text-primary-700 text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                    <Button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-primary-300 text-primary-700 hover:bg-primary-50 bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
