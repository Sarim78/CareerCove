"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Target, Plus, TrendingUp, Award, BookOpen } from "lucide-react"

// ── Types & data ──────────────────────────────────────────────────────────────

interface Skill {
  id: string
  skill_name: string
  proficiency_level: number
  target_level: number
}

const INITIAL_SKILLS: Skill[] = [
  { id: "1", skill_name: "React.js",   proficiency_level: 75, target_level: 95 },
  { id: "2", skill_name: "TypeScript", proficiency_level: 60, target_level: 90 },
]

const EMPTY_SKILL = { name: "", current: 0, target: 100 }

/**
 * SkillsPage — interactive skill tracker with add, update (+5/-5), and delete.
 *
 * Proficiency and target levels are displayed as progress bars.
 * Summary cards at the top show total count, average progress, and mastered skills (≥90%).
 */
export default function SkillsPage() {
  const [skills, setSkills]       = useState<Skill[]>(INITIAL_SKILLS)
  const [newSkill, setNewSkill]   = useState(EMPTY_SKILL)
  const [showAdd, setShowAdd]     = useState(false)

  const addSkill = () => {
    if (!newSkill.name) return
    setSkills((prev) => [
      { id: Math.random().toString(), skill_name: newSkill.name, proficiency_level: newSkill.current, target_level: newSkill.target },
      ...prev,
    ])
    setNewSkill(EMPTY_SKILL)
    setShowAdd(false)
  }

  /** Clamps the updated level between 0 and 100. */
  const updateLevel = (id: string, delta: number) =>
    setSkills((prev) => prev.map((s) => s.id === id ? { ...s, proficiency_level: Math.min(100, Math.max(0, s.proficiency_level + delta)) } : s))

  const deleteSkill = (id: string) => setSkills((prev) => prev.filter((s) => s.id !== id))

  const averageProgress = skills.length > 0
    ? Math.round(skills.reduce((acc, s) => acc + s.proficiency_level, 0) / skills.length)
    : 0

  const masteredCount = skills.filter((s) => s.proficiency_level >= 90).length

  // ── Summary cards data ───────────────────────────────────────────────────────

  const SUMMARY_CARDS = [
    { icon: Target,    label: "Total Skills",    value: skills.length },
    { icon: TrendingUp, label: "Average Progress", value: `${averageProgress}%` },
    { icon: Award,     label: "Mastered Skills",  value: masteredCount },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navigation />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-3 sm:mb-4">Skill Builder & Tracker</h1>
          <p className="text-base sm:text-lg lg:text-xl text-primary-700 max-w-2xl mx-auto px-4">
            Track your progress and develop the skills you need for your career goals
          </p>
        </div>

        {/* ── Summary cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {SUMMARY_CARDS.map(({ icon: Icon, label, value }) => (
            <Card key={label} className="border-primary-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-primary-800">
                  <Icon className="w-5 h-5 text-primary-500" /> {label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl sm:text-4xl font-bold text-primary-900">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-6">
          <Button onClick={() => setShowAdd(!showAdd)} className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white">
            <Plus className="w-4 h-4 mr-2" /> Add New Skill
          </Button>
        </div>

        {/* ── Add form ── */}
        {showAdd && (
          <Card className="mb-6 border-primary-200">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Add New Skill</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-primary-900 mb-1.5 block">Skill Name</label>
                <Input placeholder="e.g., JavaScript, Public Speaking" value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} />
              </div>
              {(["current", "target"] as const).map((key) => (
                <div key={key}>
                  <label className="text-sm font-medium text-primary-900 mb-1.5 block capitalize">
                    {key} Level: {newSkill[key]}%
                  </label>
                  <input type="range" min="0" max="100" value={newSkill[key]}
                    onChange={(e) => setNewSkill({ ...newSkill, [key]: parseInt(e.target.value) })}
                    className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <Button onClick={addSkill} className="flex-1 bg-primary-500 hover:bg-primary-600 text-white">
                  <Plus className="w-4 h-4 mr-2" /> Add Skill
                </Button>
                <Button onClick={() => setShowAdd(false)} variant="outline" className="flex-1 border-primary-300 text-primary-700 hover:bg-primary-50">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Skill list ── */}
        {skills.length === 0 ? (
          <Card className="p-8 sm:p-12 text-center border-primary-100">
            <BookOpen className="w-16 h-16 mx-auto text-primary-300 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-primary-900 mb-2">No skills tracked yet</h3>
            <p className="text-sm sm:text-base text-primary-600 mb-4">Start tracking your skills to see your progress</p>
            <Button onClick={() => setShowAdd(true)} className="bg-primary-500 hover:bg-primary-600 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Your First Skill
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-white p-4 rounded-lg shadow border border-primary-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-primary-900">{skill.skill_name}</h3>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => updateLevel(skill.id, 5)}  className="text-primary-500">+5</Button>
                    <Button size="sm" onClick={() => updateLevel(skill.id, -5)} className="text-primary-500">-5</Button>
                    <Button size="sm" onClick={() => deleteSkill(skill.id)}    variant="outline" className="text-primary-500">Delete</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-primary-200 rounded-lg overflow-hidden">
                      <div className="bg-primary-500 h-2 transition-all duration-300" style={{ width: `${skill.proficiency_level}%` }} />
                    </div>
                    <p className="text-sm text-primary-700 w-10 text-right">{skill.proficiency_level}%</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-700">
                    <Award className="w-4 h-4 text-primary-500" /> Target: {skill.target_level}%
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
