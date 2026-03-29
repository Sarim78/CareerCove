"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Search } from "lucide-react"

// ── Types & data ──────────────────────────────────────────────────────────────

interface Job {
  id: string
  title: string
  company: string
  location: string
  job_type: string
  salary_range: string
  description: string
  career_field: string
  experience_level: string
  skills_required: string[]
}

const MOCK_JOBS: Job[] = [
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

/**
 * JobsPage — a filterable job board with local save/bookmark state.
 *
 * Job data is mocked. Filters (field, level, type) and keyword search are
 * applied client-side with a 500 ms debounce to simulate an API call.
 */
export default function JobsPage() {
  const [jobs, setJobs]               = useState<Job[]>([])
  const [savedJobs, setSavedJobs]     = useState<Set<string>>(new Set())
  const [loading, setLoading]         = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterField, setFilterField] = useState("all")
  const [filterLevel, setFilterLevel] = useState("all")
  const [filterType, setFilterType]   = useState("all")

  // Re-filter whenever any filter or search changes
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const q = searchQuery.toLowerCase()
      setJobs(
        MOCK_JOBS.filter((j) =>
          (!q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)) &&
          (filterField === "all" || j.career_field    === filterField) &&
          (filterLevel === "all" || j.experience_level === filterLevel) &&
          (filterType  === "all" || j.job_type         === filterType)
        )
      )
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery, filterField, filterLevel, filterType])

  const toggleSave = (id: string) =>
    setSavedJobs((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navigation />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-3 sm:mb-4">Find Your Perfect Job</h1>
          <p className="text-base sm:text-lg lg:text-xl text-primary-700 max-w-2xl mx-auto px-4">
            Personalized job recommendations based on your skills, interests, and career goals
          </p>
        </div>

        {/* ── Search & filters ── */}
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400 w-5 h-5" />
            <Input placeholder="Search jobs, companies, or keywords..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-12 text-sm sm:text-base" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Select value={filterField} onValueChange={setFilterField}>
              <SelectTrigger className="h-11"><SelectValue placeholder="Career Field" /></SelectTrigger>
              <SelectContent>
                {[["all", "All Fields"], ["technology", "Technology"], ["business", "Business"], ["creative", "Creative"], ["finance", "Finance"], ["healthcare", "Healthcare"]].map(([v, l]) => (
                  <SelectItem key={v} value={v}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="h-11"><SelectValue placeholder="Experience Level" /></SelectTrigger>
              <SelectContent>
                {[["all", "All Levels"], ["entry", "Entry Level"], ["mid", "Mid Level"], ["senior", "Senior Level"]].map(([v, l]) => (
                  <SelectItem key={v} value={v}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="h-11"><SelectValue placeholder="Job Type" /></SelectTrigger>
              <SelectContent>
                {[["all", "All Types"], ["full-time", "Full-time"], ["part-time", "Part-time"], ["internship", "Internship"], ["contract", "Contract"]].map(([v, l]) => (
                  <SelectItem key={v} value={v}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-sm text-primary-600 mb-4">
          Showing {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
        </p>

        {/* ── Results ── */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
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
                    <p className="text-primary-600">{job.company} • {job.location}</p>
                  </div>
                  <Button variant="ghost" onClick={() => toggleSave(job.id)}>
                    {savedJobs.has(job.id) ? "Saved" : "Save"}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills_required.map((s) => (
                    <span key={s} className="px-2 py-1 bg-primary-50 text-xs rounded-full">{s}</span>
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
