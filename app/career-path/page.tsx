"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Calendar, Award, Plus, Trash2, CheckCircle2 } from "lucide-react"

const INITIAL_PATHS = [
  {
    id: "1",
    career_title: "Product Design",
    current_role: "Junior Designer",
    target_role: "Design Lead",
    timeline_years: 5,
    milestones: [{ year: 1, title: "Master Figma", description: "Design systems", completed: true }],
  },
]

/**
 * CareerPathPage Component
 *
 * A visual simulator for career growth. Refactored to use careerPathsService
 * for data persistence and mock API simulation.
 */
export default function CareerPathPage() {
  const [careerPaths, setCareerPaths] = useState<any[]>(INITIAL_PATHS)
  const [loading, setLoading] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [newPath, setNewPath] = useState({
    careerTitle: "",
    currentRole: "",
    targetRole: "",
    timelineYears: 5,
    milestones: [] as any[],
  })
  const [newMilestone, setNewMilestone] = useState({ year: 1, title: "", description: "" })

  useEffect(() => {
    // No need to fetch data as we are reverting to local state management
  }, [])

  const addMilestone = () => {
    if (!newMilestone.title) return
    setNewPath({
      ...newPath,
      milestones: [...newPath.milestones, { ...newMilestone, completed: false }],
    })
    setNewMilestone({ year: newPath.milestones.length + 2, title: "", description: "" })
  }

  const removeMilestone = (index: number) => {
    setNewPath({
      ...newPath,
      milestones: newPath.milestones.filter((_, i) => i !== index),
    })
  }

  const saveCareerPath = () => {
    if (!newPath.careerTitle || !newPath.currentRole || !newPath.targetRole) return
    const path = {
      id: Math.random().toString(),
      career_title: newPath.careerTitle,
      current_role: newPath.currentRole,
      target_role: newPath.targetRole,
      timeline_years: newPath.timelineYears,
      milestones: newPath.milestones,
    }
    setCareerPaths((prev) => [path, ...prev])
    setNewPath({ careerTitle: "", currentRole: "", targetRole: "", timelineYears: 5, milestones: [] })
    setShowAdd(false)
  }

  const deleteCareerPath = (pathId: string) => {
    setCareerPaths((prev) => prev.filter((p) => p.id !== pathId))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <p className="mt-4 text-primary-600">Loading career paths...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navigation />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl mx-auto w-full">
        {/* Header title and description */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-3 sm:mb-4">
            Career Path Simulator
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-primary-700 max-w-2xl mx-auto px-4">
            Plan your career journey and visualize your path to success
          </p>
        </div>

        <div className="mb-6">
          <Button
            onClick={() => setShowAdd(!showAdd)}
            className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Career Path
          </Button>
        </div>

        {/* Form to create new career path */}
        {showAdd && (
          <Card className="mb-6 border-primary-200">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Create Your Career Path</CardTitle>
              <CardDescription>Plan your career progression over the next few years</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-1.5 block">Career Field</label>
                  <Input
                    placeholder="e.g., Software Engineering"
                    value={newPath.careerTitle}
                    onChange={(e) => setNewPath({ ...newPath, careerTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-1.5 block">Timeline (years)</label>
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    value={newPath.timelineYears}
                    onChange={(e) => setNewPath({ ...newPath, timelineYears: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-1.5 block">Current Role</label>
                  <Input
                    placeholder="e.g., Junior Developer"
                    value={newPath.currentRole}
                    onChange={(e) => setNewPath({ ...newPath, currentRole: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-1.5 block">Target Role</label>
                  <Input
                    placeholder="e.g., Senior Engineer"
                    value={newPath.targetRole}
                    onChange={(e) => setNewPath({ ...newPath, targetRole: e.target.value })}
                  />
                </div>
              </div>

              <div className="border-t border-primary-200 pt-4">
                <h4 className="text-sm font-medium text-primary-900 mb-3">Career Milestones</h4>
                <div className="space-y-3 mb-4">
                  {newPath.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-primary-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="bg-primary-100 text-primary-700">
                            Year {milestone.year}
                          </Badge>
                          <span className="text-sm font-medium text-primary-900">{milestone.title}</span>
                        </div>
                        {milestone.description && <p className="text-xs text-primary-600">{milestone.description}</p>}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMilestone(index)}
                        className="hover:bg-red-50 hover:text-red-600 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 p-3 bg-primary-50/50 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      type="number"
                      placeholder="Year"
                      min="1"
                      max={newPath.timelineYears}
                      value={newMilestone.year}
                      onChange={(e) => setNewMilestone({ ...newMilestone, year: Number.parseInt(e.target.value) })}
                    />
                    <div className="sm:col-span-2">
                      <Input
                        placeholder="Milestone title"
                        value={newMilestone.title}
                        onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                      />
                    </div>
                  </div>
                  <Input
                    placeholder="Description (optional)"
                    value={newMilestone.description}
                    onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                  />
                  <Button
                    onClick={addMilestone}
                    variant="outline"
                    size="sm"
                    className="w-full border-primary-300 text-primary-700 hover:bg-primary-50 bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Milestone
                  </Button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={saveCareerPath} className="flex-1 bg-primary-500 hover:bg-primary-600 text-white">
                  <Target className="w-4 h-4 mr-2" />
                  Save Career Path
                </Button>
                <Button
                  onClick={() => setShowAdd(false)}
                  variant="outline"
                  className="flex-1 border-primary-300 text-primary-700 hover:bg-primary-50"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {careerPaths.length === 0 ? (
          <Card className="p-8 sm:p-12 text-center border-primary-100">
            <TrendingUp className="w-16 h-16 mx-auto text-primary-300 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-primary-900 mb-2">No career paths yet</h3>
            <p className="text-sm sm:text-base text-primary-600 mb-4">
              Create your first career path to visualize your professional journey
            </p>
            <Button onClick={() => setShowAdd(true)} className="bg-primary-500 hover:bg-primary-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Path
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {careerPaths.map((path) => (
              <Card key={path.id} className="border-primary-200 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary-50 to-accent-50 border-b border-primary-100">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-xl sm:text-2xl text-primary-900 mb-2">{path.career_title}</CardTitle>
                      <div className="flex flex-wrap gap-2 text-sm text-primary-700">
                        <Badge variant="outline" className="border-primary-300 bg-white">
                          <Calendar className="w-3 h-3 mr-1" />
                          {path.timeline_years} years
                        </Badge>
                        <span className="px-3 py-1">
                          {path.current_role} → {path.target_role}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteCareerPath(path.id)}
                      className="hover:bg-red-50 hover:text-red-600 self-start sm:self-center shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {path.milestones && path.milestones.length > 0 ? (
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-primary-900 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Career Milestones
                      </h4>
                      <div className="relative pl-6 space-y-6">
                        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-primary-200"></div>
                        {path.milestones.map((milestone, index) => (
                          <div key={index} className="relative">
                            <div className="absolute left-[-1.6rem] top-1 w-4 h-4 rounded-full bg-primary-500 border-2 border-white shadow"></div>
                            <Card className="border-primary-100 bg-white">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <Badge className="bg-primary-100 text-primary-700 shrink-0">
                                    Year {milestone.year}
                                  </Badge>
                                  {milestone.completed && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />}
                                </div>
                                <h5 className="font-semibold text-primary-900 mb-1">{milestone.title}</h5>
                                {milestone.description && (
                                  <p className="text-sm text-primary-600">{milestone.description}</p>
                                )}
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-primary-600 text-center py-4">No milestones added yet</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
