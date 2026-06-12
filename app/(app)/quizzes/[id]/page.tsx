"use client"

import { use, useState } from "react"
import { mockQuizzes, mockModules } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Home,
  ClipboardCheck,
  Clock,
  Target,
  BookOpen,
  Trophy,
  ChevronRight,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"

type QuizState = "intro" | "taking" | "results"

interface Answer {
  questionId: string
  selectedAnswer: number
  correct: boolean
}

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const quiz = mockQuizzes.find((q) => q.id === id)

  if (!quiz) {
    notFound()
  }

  const module = mockModules.find((m) => m.id === quiz.moduleId)
  const estimatedMins = Math.ceil(quiz.questions.length * 1.5)

  const [state, setState] = useState<QuizState>("intro")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [results, setResults] = useState<Answer[]>([])
  const [showReview, setShowReview] = useState(false)

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100
  const selectedAnswer = selectedAnswers[currentQuestion?.id]
  const answeredCount = Object.keys(selectedAnswers).length

  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion.id]: answerIndex })
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = () => {
    const answers: Answer[] = quiz.questions.map((q) => ({
      questionId: q.id,
      selectedAnswer: selectedAnswers[q.id] ?? -1,
      correct: selectedAnswers[q.id] === q.correctAnswer,
    }))
    setResults(answers)
    setState("results")
    setShowReview(false)
  }

  const handleRetake = () => {
    setState("intro")
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setResults([])
    setShowReview(false)
  }

  const score = results.filter((r) => r.correct).length
  const percentage = Math.round((score / quiz.questions.length) * 100)
  const passed = percentage >= quiz.passingScore

  // ── INTRO SCREEN ────────────────────────────────────────────────────
  if (state === "intro") {
    return (
      <div className="p-4 md:p-8">
        <Button variant="ghost" size="sm" className="-ml-2 mb-6" asChild>
          <Link href="/quizzes">
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Quizzes
          </Link>
        </Button>

        <div className="max-w-2xl mx-auto space-y-4">
          {/* Hero card */}
          <Card className="overflow-hidden">
            <div className="h-1.5 bg-primary" />
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg md:text-xl leading-tight">{quiz.title}</CardTitle>
                  {module && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{module.title}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pb-6">
              {/* Key stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: ClipboardCheck, label: "Questions", value: quiz.questions.length.toString() },
                  { icon: Clock, label: "Est. Time", value: `~${estimatedMins}m` },
                  { icon: Target, label: "Pass Score", value: `${quiz.passingScore}%` },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary/60 text-center"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    <p className="font-bold text-base">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Rules */}
              <div className="space-y-2">
                <p className="text-sm font-semibold">Before you begin</p>
                <div className="space-y-2">
                  {[
                    "Read each question carefully before selecting your answer.",
                    "You can navigate back to change answers before submitting.",
                    "You must answer all questions before submitting.",
                    `You need ${quiz.passingScore}% or higher to pass. You can retake if needed.`,
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full" size="lg" onClick={() => setState("taking")}>
                Begin Quiz
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  // ── RESULTS SCREEN ───────────────────────────────────────────────────
  if (state === "results") {
    return (
      <div className="p-4 md:p-8 space-y-5">
        <Button variant="ghost" size="sm" className="-ml-2" asChild>
          <Link href="/quizzes">
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Quizzes
          </Link>
        </Button>

        <div className="max-w-2xl mx-auto space-y-4">
          {/* Score card */}
          <Card className="overflow-hidden">
            <div className={cn("h-1.5", passed ? "bg-primary" : "bg-amber-500")} />
            <CardContent className="pt-6 pb-4 text-center space-y-3">
              <div
                className={cn(
                  "w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto flex items-center justify-center",
                  passed ? "bg-primary/15" : "bg-amber-500/15",
                )}
              >
                {passed ? (
                  <Trophy className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                ) : (
                  <XCircle className="h-8 w-8 md:h-10 md:w-10 text-amber-500" />
                )}
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold">
                  {passed ? "Quiz Passed!" : "Not Quite There"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {passed
                    ? "Great work — you demonstrated solid knowledge."
                    : `You need ${quiz.passingScore}% to pass. Review the material and try again.`}
                </p>
              </div>

              <div className={cn("text-5xl font-bold", passed ? "text-primary" : "text-amber-500")}>
                {percentage}%
              </div>

              <div className="space-y-1.5">
                <Progress
                  value={percentage}
                  className={cn("h-2", !passed && "[&>div]:bg-amber-500")}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{score} of {quiz.questions.length} correct</span>
                  <span>Passing: {quiz.passingScore}%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-3 pt-2 pb-5">
              <Button variant="outline" className="flex-1" onClick={handleRetake}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
              <Button className="flex-1" asChild>
                <Link href="/dashboard">
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Answer breakdown toggle */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowReview(!showReview)}
          >
            {showReview ? "Hide" : "Review"} Answers
            <ChevronRight className={cn("h-4 w-4 ml-2 transition-transform", showReview && "rotate-90")} />
          </Button>

          {/* Detailed review */}
          {showReview && (
            <div className="space-y-3">
              {quiz.questions.map((question, index) => {
                const answer = results.find((r) => r.questionId === question.id)
                const isCorrect = answer?.correct
                const selectedIdx = answer?.selectedAnswer ?? -1

                return (
                  <Card
                    key={question.id}
                    className={cn(
                      "overflow-hidden",
                      isCorrect ? "border-primary/30" : "border-destructive/30",
                    )}
                  >
                    <div className={cn("h-0.5", isCorrect ? "bg-primary" : "bg-destructive")} />
                    <CardContent className="p-4 space-y-3">
                      {/* Question header */}
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                            isCorrect ? "bg-primary/15" : "bg-destructive/15",
                          )}
                        >
                          {isCorrect ? (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          ) : (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">Question {index + 1}</p>
                          <p className="text-sm font-medium leading-relaxed">{question.text}</p>
                        </div>
                      </div>

                      {/* Options */}
                      <div className="space-y-1.5 pl-10">
                        {question.options.map((option, optIdx) => {
                          const isCorrectOption = optIdx === question.correctAnswer
                          const isUserSelection = optIdx === selectedIdx
                          const isWrongSelection = isUserSelection && !isCorrect

                          return (
                            <div
                              key={optIdx}
                              className={cn(
                                "flex items-center gap-2.5 p-2.5 rounded-lg text-sm",
                                isCorrectOption && "bg-primary/10 text-foreground",
                                isWrongSelection && "bg-destructive/10 text-foreground",
                                !isCorrectOption && !isWrongSelection && "text-muted-foreground",
                              )}
                            >
                              <span
                                className={cn(
                                  "w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold shrink-0",
                                  isCorrectOption
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : isWrongSelection
                                      ? "border-destructive bg-destructive text-destructive-foreground"
                                      : "border-muted-foreground/30 text-muted-foreground",
                                )}
                              >
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="flex-1">{option}</span>
                              {isCorrectOption && (
                                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                              )}
                              {isWrongSelection && (
                                <XCircle className="h-3.5 w-3.5 text-destructive shrink-0" />
                              )}
                            </div>
                          )
                        })}
                      </div>

                      {/* Missed answer callout */}
                      {!isCorrect && (
                        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 ml-10">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-400">
                            Correct answer: <span className="font-semibold">{String.fromCharCode(65 + question.correctAnswer)}</span>
                            {" — "}{question.options[question.correctAnswer]}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── QUIZ-TAKING SCREEN ───────────────────────────────────────────────
  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-5">
      {/* Sticky top progress */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="-ml-2 shrink-0" asChild>
          <Link href="/quizzes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between text-xs gap-2">
            <span className="font-medium text-muted-foreground truncate">{quiz.title}</span>
            <span className="text-muted-foreground shrink-0">
              {answeredCount}/{quiz.questions.length} answered
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Question navigation pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {quiz.questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={cn(
                "shrink-0 w-8 h-8 rounded-lg text-xs font-semibold transition-all",
                index === currentQuestionIndex
                  ? "bg-primary text-primary-foreground ring-2 ring-primary/40"
                  : selectedAnswers[q.id] !== undefined
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground",
              )}
              aria-label={`Question ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Question card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </Badge>
              {selectedAnswer !== undefined && (
                <Badge variant="outline" className="text-xs text-primary border-primary/30">
                  Answered
                </Badge>
              )}
            </div>
            <CardTitle className="text-base md:text-lg leading-relaxed font-medium">
              {currentQuestion.text}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2.5">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={cn(
                  "w-full text-left p-3.5 rounded-xl border-2 transition-all duration-150 active:scale-[0.99]",
                  selectedAnswer === index
                    ? "border-primary bg-primary/10 shadow-[0_0_0_1px] shadow-primary/20"
                    : "border-border hover:border-primary/40 hover:bg-secondary/50",
                )}
              >
                <span className="flex items-start gap-3">
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-all",
                      selectedAnswer === index
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 text-muted-foreground",
                    )}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-sm leading-relaxed">{option}</span>
                </span>
              </button>
            ))}
          </CardContent>

          <CardFooter className="flex justify-between gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex-1 sm:flex-none"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Prev
            </Button>
            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={answeredCount !== quiz.questions.length}
                className="flex-1 sm:flex-none"
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === undefined}
                className="flex-1 sm:flex-none"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Unanswered warning on last question */}
        {currentQuestionIndex === quiz.questions.length - 1 &&
          answeredCount < quiz.questions.length && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-400">
                You have {quiz.questions.length - answeredCount} unanswered{" "}
                {quiz.questions.length - answeredCount === 1 ? "question" : "questions"}. Go back and answer all before submitting.
              </p>
            </div>
          )}
      </div>
    </div>
  )
}
