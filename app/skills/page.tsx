"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Plus, Trash2, TrendingUp, Award, BookOpen } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [newSkill, setNewSkill] = useState({ name: "", current: 0, target: 100 })
  const [showAdd, setShowAdd] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      router.push("/auth")
      return
    }

    setUser(session.user)
    loadSkills(session.user.id)
  }

  const loadSkills = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_skills")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) throw error
      setSkills(data || [])
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const addSkill = async () => {
    if (!user || !newSkill.name) return

    try {
      const { error } = await supabase.from("user_skills").insert({
        user_id: user.id,
        skill_name: newSkill.name,
        proficiency_level: newSkill.current,
        target_level: newSkill.target,
      })

      if (error) throw error

      setNewSkill({ name: "", current: 0, target: 100 })
      setShowAdd(false)
      loadSkills(user.id)
    } catch (error) {}
  }

  const updateSkill = async (skillId: string, proficiencyLevel: number) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from("user_skills")
        .update({ proficiency_level: proficiencyLevel, updated_at: new Date().toISOString() })
        .eq("id", skillId)

      if (error) throw error

      setSkills((prev) =>
        prev.map((skill) => (skill.id === skillId ? { ...skill, proficiency_level: proficiencyLevel } : skill)),
      )
    } catch (error) {}
  }

  const deleteSkill = async (skillId: string) => {
    if (!user) return

    try {
      const { error } = await supabase.from("user_skills").delete().eq("id", skillId)

      if (error) throw error

      setSkills((prev) => prev.filter((skill) => skill.id !== skillId))
    } catch (error) {}
  }

  const getSkillLevel = (proficiency: number) => {
    if (proficiency < 25) return { label: "Beginner", color: "text-red-600 bg-red-50" }
    if (proficiency < 50) return { label: "Novice", color: "text-orange-600 bg-orange-50" }
    if (proficiency < 75) return { label: "Intermediate", color: "text-yellow-600 bg-yellow-50" }
    if (proficiency < 90) return { label: "Advanced", color: "text-blue-600 bg-blue-50" }
    return { label: "Expert", color: "text-green-600 bg-green-50" }
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
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-3 sm:mb-4">
            Skill Builder & Tracker
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-primary-700 max-w-2xl mx-auto px-4">
            Track your progress and develop the skills you need for your career goals
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-primary-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
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
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
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
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
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

        {/* Add Skill Button */}
        <div className="mb-6">
          <Button
            onClick={() => setShowAdd(!showAdd)}
            className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Skill
          </Button>
        </div>

        {/* Add Skill Form */}
        {showAdd && (
          <Card className="mb-6 border-primary-200">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Add New Skill</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-primary-900 mb-1.5 block">Skill Name</label>
                <Input
                  placeholder="e.g., JavaScript, Public Speaking, Data Analysis"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="text-sm sm:text-base"
                />
              </div>
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
              <div className="flex gap-3">
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

        {/* Skills List */}
        {skills.length === 0 ? (
          <Card className="p-8 sm:p-12 text-center border-primary-100">
            <BookOpen className="w-16 h-16 mx-auto text-primary-300 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-primary-900 mb-2">No skills tracked yet</h3>
            <p className="text-sm sm:text-base text-primary-600 mb-4">
              Start tracking your skills to see your progress over time
            </p>
            <Button onClick={() => setShowAdd(true)} className="bg-primary-500 hover:bg-primary-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Skill
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {skills.map((skill) => {
              const level = getSkillLevel(skill.proficiency_level)
              return (
                <Card key={skill.id} className="border-primary-200 hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg text-primary-900 mb-2 break-words">
                          {skill.skill_name}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={level.color}>{level.label}</Badge>
                          <Badge variant="outline" className="border-primary-300 text-primary-700">
                            Target: {skill.target_level}%
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSkill(skill.id)}
                        className="hover:bg-red-50 hover:text-red-600 self-start sm:self-center shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-primary-600 mb-2">
                        <span>Current Progress</span>
                        <span className="font-medium">{skill.proficiency_level}%</span>
                      </div>
                      <Progress value={skill.proficiency_level} className="h-3" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-primary-900 mb-2 block">
                        Update Progress: {skill.proficiency_level}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.proficiency_level}
                        onChange={(e) => updateSkill(skill.id, Number.parseInt(e.target.value))}
                        className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
