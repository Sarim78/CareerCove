"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Sparkles, Award, TrendingUp, Filter, X } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

const quizQuestions = [
  {
    id: 1,
    question: "When facing a complex problem, what approach energizes you most?",
    options: [
      { value: "analytical-deep", label: "Breaking it down into data points and conducting thorough research" },
      { value: "creative-innovative", label: "Brainstorming multiple creative solutions and thinking outside the box" },
      { value: "collaborative-social", label: "Gathering diverse perspectives and facilitating team discussions" },
      { value: "systematic-structured", label: "Following proven methodologies and established frameworks" },
    ],
  },
  {
    id: 2,
    question: "What type of impact drives your professional satisfaction?",
    options: [
      { value: "global-scale", label: "Creating solutions that affect millions of people worldwide" },
      { value: "individual-personal", label: "Making meaningful differences in individual lives" },
      { value: "organizational-strategic", label: "Transforming how organizations operate and succeed" },
      { value: "community-local", label: "Strengthening local communities and social connections" },
    ],
  },
  {
    id: 3,
    question: "How do you prefer to process and share complex information?",
    options: [
      { value: "visual-design", label: "Through visual storytelling, infographics, and design elements" },
      { value: "analytical-data", label: "Using statistical analysis, charts, and quantitative evidence" },
      { value: "narrative-written", label: "Crafting compelling written narratives and detailed documentation" },
      { value: "interactive-verbal", label: "Through dynamic presentations and real-time discussions" },
    ],
  },
  {
    id: 4,
    question: "What work environment brings out your best performance?",
    options: [
      { value: "fast-paced-dynamic", label: "High-energy environments with constant change and tight deadlines" },
      { value: "research-focused", label: "Quiet, contemplative spaces for deep thinking and analysis" },
      { value: "collaborative-open", label: "Open, team-oriented spaces with frequent collaboration" },
      {
        value: "client-facing",
        label: "Dynamic environments with regular client interaction and relationship building",
      },
    ],
  },
  {
    id: 5,
    question: "Which type of challenge excites you most professionally?",
    options: [
      { value: "technical-innovation", label: "Solving complex technical problems and building innovative systems" },
      { value: "human-psychology", label: "Understanding human behavior and improving interpersonal dynamics" },
      { value: "strategic-business", label: "Developing long-term strategies and driving business growth" },
      { value: "creative-expression", label: "Creating original content and expressing ideas through various media" },
    ],
  },
  {
    id: 6,
    question: "How do you approach learning and professional development?",
    options: [
      { value: "hands-on-practical", label: "Learning by doing, experimenting, and building real projects" },
      { value: "theoretical-research", label: "Deep study of theories, research papers, and academic knowledge" },
      { value: "mentorship-social", label: "Learning from experienced professionals and building networks" },
      {
        value: "self-directed-independent",
        label: "Self-paced learning through books, courses, and personal exploration",
      },
    ],
  },
  {
    id: 7,
    question: "What motivates you most in your daily work?",
    options: [
      { value: "innovation-cutting-edge", label: "Working with cutting-edge technology and pioneering new solutions" },
      { value: "stability-security", label: "Building secure, reliable systems and ensuring consistent outcomes" },
      { value: "growth-development", label: "Continuous personal growth and helping others develop their potential" },
      { value: "influence-leadership", label: "Leading teams and influencing organizational direction" },
    ],
  },
  {
    id: 8,
    question: "How do you handle stress and high-pressure situations?",
    options: [
      { value: "systematic-planning", label: "Creating detailed plans and breaking tasks into manageable steps" },
      { value: "adaptive-flexible", label: "Staying flexible and adapting quickly to changing circumstances" },
      { value: "team-support", label: "Leveraging team support and collaborative problem-solving" },
      { value: "independent-focused", label: "Working independently with deep focus and concentration" },
    ],
  },
]

const careerRecommendations = {
  // Data Science & Analytics Paths
  "analytical-deep-global-scale-analytical-data-research-focused-technical-innovation-theoretical-research-innovation-cutting-edge-systematic-planning":
    {
      title: "Senior Data Scientist",
      description:
        "Lead advanced analytics projects using machine learning and AI to solve complex business problems at scale.",
      skills: ["Machine Learning", "Statistical Analysis", "Python/R", "Data Visualization", "Research Methodology"],
      growth: "Exceptional growth with 35% projected increase in demand",
      salary: "$120,000 - $200,000",
      relatedRoles: ["Machine Learning Engineer", "Research Scientist", "AI Specialist", "Quantitative Analyst"],
      fields: ["technology", "science"],
    },

  // Product Management Paths
  "systematic-structured-organizational-strategic-interactive-verbal-collaborative-open-strategic-business-mentorship-social-growth-development-team-support":
    {
      title: "Senior Product Manager",
      description:
        "Drive product strategy and development, working cross-functionally to deliver innovative solutions that meet market needs.",
      skills: ["Product Strategy", "Market Research", "Agile Methodology", "Stakeholder Management", "Data Analysis"],
      growth: "Strong growth with 25% projected increase",
      salary: "$110,000 - $180,000",
      relatedRoles: ["Product Owner", "Program Manager", "Business Analyst", "Strategy Consultant"],
      fields: ["technology", "business"],
    },

  // UX/Design Paths
  "creative-innovative-individual-personal-visual-design-collaborative-open-creative-expression-hands-on-practical-innovation-cutting-edge-adaptive-flexible":
    {
      title: "Senior UX Designer",
      description:
        "Create intuitive, user-centered designs that solve complex problems and enhance user experiences across digital platforms.",
      skills: ["User Research", "Prototyping", "Design Systems", "Interaction Design", "Usability Testing"],
      growth: "Excellent prospects with 20% projected growth",
      salary: "$85,000 - $140,000",
      relatedRoles: ["UI Designer", "Product Designer", "Design Researcher", "Creative Director"],
      fields: ["creative", "technology"],
    },

  // Software Engineering Paths
  "analytical-deep-global-scale-analytical-data-fast-paced-dynamic-technical-innovation-hands-on-practical-innovation-cutting-edge-independent-focused":
    {
      title: "Senior Software Engineer",
      description:
        "Design and build scalable software systems, working with cutting-edge technologies to create robust applications.",
      skills: ["Full-Stack Development", "System Architecture", "Cloud Computing", "DevOps", "Problem Solving"],
      growth: "High demand with 30% projected growth",
      salary: "$100,000 - $170,000",
      relatedRoles: ["DevOps Engineer", "Solutions Architect", "Technical Lead", "Platform Engineer"],
      fields: ["technology"],
    },

  // Management Consulting Paths
  "systematic-structured-organizational-strategic-narrative-written-client-facing-strategic-business-mentorship-social-influence-leadership-team-support":
    {
      title: "Management Consultant",
      description:
        "Advise organizations on strategic initiatives, operational improvements, and transformation projects.",
      skills: [
        "Strategic Analysis",
        "Project Management",
        "Client Relations",
        "Business Process Improvement",
        "Leadership",
      ],
      growth: "Steady growth with competitive compensation",
      salary: "$90,000 - $160,000",
      relatedRoles: ["Strategy Consultant", "Business Analyst", "Operations Manager", "Change Management Specialist"],
      fields: ["consulting", "business"],
    },

  // Marketing & Communications Paths
  "creative-innovative-global-scale-visual-design-collaborative-open-creative-expression-mentorship-social-growth-development-adaptive-flexible":
    {
      title: "Digital Marketing Manager",
      description:
        "Develop and execute comprehensive digital marketing strategies to build brand awareness and drive customer engagement.",
      skills: ["Digital Strategy", "Content Marketing", "Analytics", "Brand Management", "Campaign Management"],
      growth: "Strong growth in digital marketing sector",
      salary: "$70,000 - $120,000",
      relatedRoles: ["Content Strategist", "Social Media Manager", "Brand Manager", "Growth Marketing Manager"],
      fields: ["creative", "business"],
    },

  // Healthcare & Psychology Paths
  "collaborative-social-individual-personal-interactive-verbal-collaborative-open-human-psychology-mentorship-social-growth-development-team-support":
    {
      title: "Clinical Psychologist",
      description:
        "Provide therapeutic services and psychological assessments to help individuals overcome mental health challenges.",
      skills: ["Clinical Assessment", "Therapeutic Techniques", "Research Methods", "Empathy", "Communication"],
      growth: "Growing field with 15% projected increase",
      salary: "$80,000 - $130,000",
      relatedRoles: ["Counseling Psychologist", "Therapist", "Social Worker", "Mental Health Counselor"],
      fields: ["healthcare", "science"],
    },

  // Finance & Investment Paths
  "analytical-deep-organizational-strategic-analytical-data-research-focused-strategic-business-theoretical-research-stability-security-systematic-planning":
    {
      title: "Investment Analyst",
      description:
        "Analyze financial markets, evaluate investment opportunities, and provide recommendations for portfolio management.",
      skills: ["Financial Modeling", "Market Analysis", "Risk Assessment", "Excel/Bloomberg", "Investment Strategy"],
      growth: "Stable growth with high earning potential",
      salary: "$85,000 - $150,000",
      relatedRoles: ["Financial Advisor", "Portfolio Manager", "Risk Analyst", "Corporate Finance Analyst"],
      fields: ["finance", "business"],
    },

  // Education & Training Paths
  "collaborative-social-individual-personal-narrative-written-collaborative-open-human-psychology-mentorship-social-growth-development-team-support":
    {
      title: "Learning & Development Manager",
      description: "Design and implement training programs to enhance employee skills and organizational capabilities.",
      skills: [
        "Curriculum Design",
        "Adult Learning Theory",
        "Training Delivery",
        "Performance Analysis",
        "Leadership Development",
      ],
      growth: "Growing importance in corporate learning",
      salary: "$65,000 - $110,000",
      relatedRoles: [
        "Training Specialist",
        "Instructional Designer",
        "HR Business Partner",
        "Organizational Development Consultant",
      ],
      fields: ["education", "business"],
    },

  // Research & Academia Paths
  "analytical-deep-global-scale-narrative-written-research-focused-technical-innovation-theoretical-research-stability-security-independent-focused":
    {
      title: "Research Scientist",
      description:
        "Conduct advanced research in your field of expertise, publish findings, and contribute to scientific knowledge.",
      skills: [
        "Research Methodology",
        "Statistical Analysis",
        "Scientific Writing",
        "Grant Writing",
        "Critical Thinking",
      ],
      growth: "Steady growth in research institutions",
      salary: "$75,000 - $130,000",
      relatedRoles: ["University Professor", "Research Associate", "Lab Manager", "Policy Researcher"],
      fields: ["science", "education"],
    },

  // Default comprehensive recommendation
  default: {
    title: "Business Intelligence Analyst",
    description:
      "Transform data into actionable insights that drive strategic business decisions and operational improvements.",
    skills: ["Data Analysis", "Business Intelligence Tools", "SQL", "Data Visualization", "Strategic Thinking"],
    growth: "Strong growth with increasing data importance",
    salary: "$70,000 - $120,000",
    relatedRoles: ["Data Analyst", "Business Analyst", "Operations Analyst", "Market Research Analyst"],
    fields: ["technology", "business"],
  },
}

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filterCategories = [
    { id: "technology", label: "Technology", icon: "💻" },
    { id: "healthcare", label: "Healthcare", icon: "🏥" },
    { id: "business", label: "Business", icon: "💼" },
    { id: "creative", label: "Creative", icon: "🎨" },
    { id: "science", label: "Science", icon: "🔬" },
    { id: "education", label: "Education", icon: "📚" },
    { id: "finance", label: "Finance", icon: "💰" },
    { id: "consulting", label: "Consulting", icon: "📊" },
  ]

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [quizQuestions[currentQuestion].id]: value,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      setShowResults(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  const shouldShowRecommendation = (recommendation: any) => {
    if (selectedFilters.length === 0) return true
    return recommendation.fields?.some((field: string) => selectedFilters.includes(field))
  }

  const getRecommendation = () => {
    const answerKey = Object.values(answers).join("-")

    // Try exact match first
    if (careerRecommendations[answerKey as keyof typeof careerRecommendations]) {
      return careerRecommendations[answerKey as keyof typeof careerRecommendations]
    }

    // If no exact match, try partial matching based on key patterns
    const answerValues = Object.values(answers)

    // Check for data science patterns
    if (answerValues.includes("analytical-deep") && answerValues.includes("technical-innovation")) {
      return careerRecommendations[
        "analytical-deep-global-scale-analytical-data-research-focused-technical-innovation-theoretical-research-innovation-cutting-edge-systematic-planning"
      ]
    }

    // Check for design patterns
    if (answerValues.includes("creative-innovative") && answerValues.includes("visual-design")) {
      return careerRecommendations[
        "creative-innovative-individual-personal-visual-design-collaborative-open-creative-expression-hands-on-practical-innovation-cutting-edge-adaptive-flexible"
      ]
    }

    // Check for management patterns
    if (answerValues.includes("strategic-business") && answerValues.includes("influence-leadership")) {
      return careerRecommendations[
        "systematic-structured-organizational-strategic-interactive-verbal-collaborative-open-strategic-business-mentorship-social-growth-development-team-support"
      ]
    }

    // Check for psychology/counseling patterns
    if (answerValues.includes("human-psychology") && answerValues.includes("individual-personal")) {
      return careerRecommendations[
        "collaborative-social-individual-personal-interactive-verbal-collaborative-open-human-psychology-mentorship-social-growth-development-team-support"
      ]
    }

    // Default fallback
    return careerRecommendations.default
  }

  if (showResults) {
    const recommendation = getRecommendation()

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
        <Navigation />

        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
                <Award className="w-4 h-4 mr-2" />
                Career Match Found!
              </div>
              {!showFilters && (
                <div className="text-center mb-8">
                  <Button
                    onClick={() => setShowFilters(true)}
                    variant="outline"
                    className="border-primary-300 text-primary-700 hover:bg-primary-50 transition-all duration-300"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter by Industry
                  </Button>
                </div>
              )}

              {showFilters && (
                <Card className="mb-8 bg-white border-primary-200/50 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-primary-800">Filter by Industry</CardTitle>
                      <Button
                        onClick={() => setShowFilters(false)}
                        variant="ghost"
                        size="sm"
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-primary-600">
                      Select industries you're interested in to see relevant career matches
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {filterCategories.map((category) => (
                        <Button
                          key={category.id}
                          onClick={() => toggleFilter(category.id)}
                          variant={selectedFilters.includes(category.id) ? "default" : "outline"}
                          size="sm"
                          className={`transition-all duration-300 ${
                            selectedFilters.includes(category.id)
                              ? "bg-primary-500 hover:bg-primary-600 text-white"
                              : "border-primary-300 text-primary-700 hover:bg-primary-50"
                          }`}
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.label}
                        </Button>
                      ))}
                    </div>
                    {selectedFilters.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-primary-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary-600">
                            {selectedFilters.length} filter{selectedFilters.length !== 1 ? "s" : ""} selected
                          </span>
                          <Button
                            onClick={() => setSelectedFilters([])}
                            variant="ghost"
                            size="sm"
                            className="text-primary-600 hover:text-primary-800"
                          >
                            Clear all
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              <h1 className="text-4xl font-bold gradient-text mb-4">Your Perfect Career Match</h1>
              <p className="text-primary-600 text-lg">
                Based on your responses, here's your personalized career recommendation
              </p>
            </div>

            {shouldShowRecommendation(recommendation) && (
              <Card className="hover-lift bg-white border-primary-200/50 shadow-xl animate-scale-in">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto p-6 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 w-fit mb-6">
                    <Sparkles className="h-12 w-12 text-primary-600" />
                  </div>
                  <CardTitle className="text-3xl gradient-text mb-3">{recommendation.title}</CardTitle>
                  <CardDescription className="text-lg text-primary-600 leading-relaxed">
                    {recommendation.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="p-6 rounded-xl bg-primary-50 border border-primary-200">
                      <h3 className="font-semibold text-primary-800 mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Key Skills to Develop
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-white text-primary-700 rounded-lg text-sm font-medium shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-green-50 border border-green-200">
                      <h3 className="font-semibold text-green-800 mb-4">Career Outlook</h3>
                      <p className="text-green-700 text-sm mb-3">📈 {recommendation.growth}</p>
                      <p className="text-green-700 text-sm font-medium">💰 {recommendation.salary}</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-blue-50 border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-4">Related Career Paths</h3>
                    <div className="grid gap-2 md:grid-cols-2">
                      {recommendation.relatedRoles.map((role, index) => (
                        <div key={index} className="flex items-center text-sm text-blue-700">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      className="flex-1 bg-primary-500 hover:bg-primary-600 transition-all duration-300 hover:scale-105"
                    >
                      <Link href="/mentors">Find a Mentor</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-primary-300 text-primary-700 hover:bg-primary-50 transition-all duration-300 hover:scale-105"
                    >
                      <Link href="/resume">Enhance Resume</Link>
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => {
                      setCurrentQuestion(0)
                      setAnswers({})
                      setShowResults(false)
                    }}
                    className="w-full text-primary-600 hover:text-primary-800 hover:bg-primary-50 transition-all duration-300"
                  >
                    Retake Quiz
                  </Button>
                </CardContent>
              </Card>
            )}

            {!shouldShowRecommendation(recommendation) && selectedFilters.length > 0 && (
              <Card className="bg-white border-primary-200/50 shadow-lg">
                <CardContent className="text-center py-12">
                  <div className="mx-auto p-6 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 w-fit mb-6">
                    <Filter className="h-12 w-12 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-3">No matches for selected filters</h3>
                  <p className="text-primary-600 mb-6">
                    Your career recommendation doesn't match the selected industry filters. Try adjusting your filters
                    or view all recommendations.
                  </p>
                  <Button
                    onClick={() => setSelectedFilters([])}
                    className="bg-primary-500 hover:bg-primary-600 transition-all duration-300"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <Navigation />

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold gradient-text">Career Discovery Quiz</h1>
              <span className="text-sm text-primary-600 bg-primary-100 px-3 py-1 rounded-full">
                {currentQuestion + 1} of {quizQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="w-full h-3 bg-primary-100" />
          </div>

          <Card
            className={`hover-lift bg-white border-primary-200/50 shadow-xl transition-all duration-300 ${isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}
          >
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-primary-800 leading-relaxed">
                {quizQuestions[currentQuestion].question}
              </CardTitle>
              <CardDescription className="text-primary-600">
                Select the option that best describes your preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[quizQuestions[currentQuestion].id] || ""}
                onValueChange={handleAnswer}
                className="space-y-4"
              >
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <div
                    key={option.value}
                    className="flex items-start space-x-3 p-4 rounded-xl border border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 cursor-pointer group"
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <Label
                      htmlFor={option.value}
                      className="flex-1 cursor-pointer text-primary-700 group-hover:text-primary-800 transition-colors duration-300"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-10">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="border-primary-300 text-primary-700 hover:bg-primary-50 transition-all duration-300 hover:scale-105"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={!answers[quizQuestions[currentQuestion].id]}
                  className="bg-primary-500 hover:bg-primary-600 transition-all duration-300 hover:scale-105 group"
                >
                  {currentQuestion === quizQuestions.length - 1 ? "Get Results" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default QuizPage
