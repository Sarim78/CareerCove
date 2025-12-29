"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * JobsPage Component
 *
 * A personalized job and internship board. Displays mock job listings that
 * can be filtered by career field, experience level, and job type.
 * Includes local state management for saving/bookmarking interesting opportunities.
 */
const MOCK_JOBS = [
  {
    id: "job_1",
    title: "Senior UX Designer",
    company: "DesignCo",
    location: "Remote",
    job_type: "full-time",
    salary_range: "$120k - $160k",
    description: "Leading the design for our core product with a focus on user research and design systems.",
    career_field: "creative",
    experience_level: "senior",
    skills_required: ["Figma", "Design Systems", "User Research", "Prototyping"],
  },
  {
    id: "job_2",
    title: "Frontend Engineer",
    company: "TechFlow",
    location: "New York, NY",
    job_type: "full-time",
    salary_range: "$130k - $170k",
    description: "Building modern web applications with React and Next.js for enterprise clients.",
    career_field: "technology",
    experience_level: "mid",
    skills_required: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
]

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterField, setFilterField] = useState("all")
  const [filterLevel, setFilterLevel] = useState("all")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      let filtered = [...MOCK_JOBS]
      if (searchQuery) {
        filtered = filtered.filter(
          (j) =>
            j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.company.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }
      setJobs(filtered)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery, filterField, filterLevel, filterType])

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(jobId)) newSet.delete(jobId)
      else newSet.add(jobId)
      return newSet
    })
  }

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
          Showing {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
        </p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <p className="mt-4 text-primary-600">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <Card className="p-8 sm:p-12 text-center">
            <Briefcase className="w-16 h-16 mx-auto text-primary-300 mb-4" />
            <h3 className="text-xl font-semibold text-primary-900 mb-2">No jobs found</h3>
            <p className="text-primary-600">Try adjusting your search or filters</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="p-4 border rounded-lg bg-white shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{job.title}</h3>
                    <p className="text-primary-600">
                      {job.company} • {job.location}
                    </p>
                  </div>
                  <Button variant="ghost" onClick={() => toggleSaveJob(job.id)}>
                    {savedJobs.has(job.id) ? "Saved" : "Save"}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                <div className="flex gap-2">
                  {job.skills_required.map((s: string) => (
                    <span key={s} className="px-2 py-1 bg-primary-50 text-xs rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
