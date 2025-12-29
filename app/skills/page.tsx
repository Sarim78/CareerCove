"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Target, Plus, TrendingUp, Award, BookOpen } from "lucide-react"

const INITIAL_SKILLS = [
  { id: "1", skill_name: "React.js", proficiency_level: 75, target_level: 95 },
  { id: "2", skill_name: "TypeScript", proficiency_level: 60, target_level: 90 },
]

/**
 * SkillsPage Component
 *
 * An interactive skill builder and tracker. Now refactored to use local state
 * management and a dedicated SkillCard component.
 */
export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>(INITIAL_SKILLS)
  const [loading, setLoading] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: "", current: 0, target: 100 })
  const [showAdd, setShowAdd] = useState(false)

  const addSkill = () => {
    if (!newSkill.name) return
    const skill = {
      id: Math.random().toString(),
      skill_name: newSkill.name,
      proficiency_level: newSkill.current,
      target_level: newSkill.target,
    }
    setSkills((prev) => [skill, ...prev])
    setNewSkill({ name: "", current: 0, target: 100 })
    setShowAdd(false)
  }

  const updateSkill = (skillId: string, level: number) => {
    setSkills((prev) => prev.map((s) => (s.id === skillId ? { ...s, proficiency_level: level } : s)))
  }

  const deleteSkill = (skillId: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== skillId))
  }

  const averageProgress =
    skills.length > 0 ? Math.round(skills.reduce((acc, skill) => acc + skill.proficiency_level, 0) / skills.length) : 0

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <p className="mt-4 text-primary-600">Loading skills...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navigation />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-3 sm:mb-4">
            Skill Builder & Tracker
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-primary-700 max-w-2xl mx-auto px-4">
            Track your progress and develop the skills you need for your career goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-primary-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-primary-800">
                <Target className="w-5 h-5 text-primary-500" />
                Total Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl sm:text-4xl font-bold text-primary-900">{skills.length}</p>
            </CardContent>
          </Card>
          <Card className="border-primary-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-primary-800">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                Average Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl sm:text-4xl font-bold text-primary-900">{averageProgress}%</p>
            </CardContent>
          </Card>
          <Card className="border-primary-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-primary-800">
                <Award className="w-5 h-5 text-primary-500" />
                Mastered Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl sm:text-4xl font-bold text-primary-900">
                {skills.filter((s) => s.proficiency_level >= 90).length}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <Button
            onClick={() => setShowAdd(!showAdd)}
            className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Skill
          </Button>
        </div>

        {showAdd && (
          <Card className="mb-6 border-primary-200">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Add New Skill</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-primary-900 mb-1.5 block">Skill Name</label>
                <Input
                  placeholder="e.g., JavaScript, Public Speaking"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-1.5 block">
                    Current Level: {newSkill.current}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newSkill.current}
                    onChange={(e) => setNewSkill({ ...newSkill, current: Number.parseInt(e.target.value) })}
                    className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-1.5 block">
                    Target Level: {newSkill.target}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newSkill.target}
                    onChange={(e) => setNewSkill({ ...newSkill, target: Number.parseInt(e.target.value) })}
                    className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={addSkill} className="flex-1 bg-primary-500 hover:bg-primary-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
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

        {skills.length === 0 ? (
          <Card className="p-8 sm:p-12 text-center border-primary-100">
            <BookOpen className="w-16 h-16 mx-auto text-primary-300 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-primary-900 mb-2">No skills tracked yet</h3>
            <p className="text-sm sm:text-base text-primary-600 mb-4">
              Start tracking your skills to see your progress
            </p>
            <Button onClick={() => setShowAdd(true)} className="bg-primary-500 hover:bg-primary-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Skill
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-white p-4 rounded-lg shadow border border-primary-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-primary-900">{skill.skill_name}</h3>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => updateSkill(skill.id, skill.proficiency_level + 5)}
                      className="text-primary-500"
                    >
                      +5
                    </Button>
                    <Button
                      onClick={() => updateSkill(skill.id, skill.proficiency_level - 5)}
                      className="text-primary-500"
                    >
                      -5
                    </Button>
                    <Button onClick={() => deleteSkill(skill.id)} variant="outline" className="text-primary-500">
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-primary-200 rounded-lg overflow-hidden">
                      <div className="bg-primary-500 h-2" style={{ width: `${skill.proficiency_level}%` }}></div>
                    </div>
                    <p className="text-sm text-primary-700">{skill.proficiency_level}%</p>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary-500" />
                    <p className="text-sm text-primary-700">Target: {skill.target_level}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
