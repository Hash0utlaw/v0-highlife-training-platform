"use client"

import { use, useState } from "react"
import { mockQuizzes } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, RotateCcw, Home } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"

type QuizState = "taking" | "results"

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

  const [state, setState] = useState<QuizState>("taking")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [results, setResults] = useState<Answer[]>([])

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100
  const selectedAnswer = selectedAnswers[currentQuestion.id]

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
  }

  const handleRetake = () => {
    setState("taking")
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setResults([])
  }

  const score = results.filter((r) => r.correct).length
  const percentage = Math.round((score / quiz.questions.length) * 100)
  const passed = percentage >= quiz.passingScore

  if (state === "results") {
    return (
      <div className="p-4 md:p-8 space-y-6">
        <Button variant="ghost" size="sm" className="-ml-2" asChild>
          <Link href="/quizzes">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quizzes
          </Link>
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center pb-2">
            <div
              className={cn(
                "w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto flex items-center justify-center mb-3",
                passed ? "bg-primary/10" : "bg-amber-500/10",
              )}
            >
              {passed ? (
                <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              ) : (
                <XCircle className="h-8 w-8 md:h-10 md:w-10 text-amber-500" />
              )}
            </div>
            <CardTitle className="text-xl md:text-2xl">{passed ? "Congratulations!" : "Keep Learning"}</CardTitle>
            <p className="text-muted-foreground mt-2 text-sm">
              {passed
                ? "You passed the quiz successfully!"
                : `You need ${quiz.passingScore}% to pass. Try again after reviewing the material.`}
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="text-center">
              <p className={cn("text-5xl font-bold", passed ? "text-primary" : "text-amber-500")}>{percentage}%</p>
              <p className="text-muted-foreground text-sm mt-1">
                {score} out of {quiz.questions.length} correct
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-sm">Answer Breakdown</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {quiz.questions.map((question, index) => {
                  const answer = results.find((r) => r.questionId === question.id)
                  return (
                    <div
                      key={question.id}
                      className={cn(
                        "flex items-center gap-2 p-2.5 rounded-lg",
                        answer?.correct ? "bg-primary/10" : "bg-destructive/10",
                      )}
                    >
                      {answer?.correct ? (
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                      )}
                      <span className="text-xs font-medium">Q{index + 1}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleRetake}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake
            </Button>
            <Button className="flex-1" asChild>
              <Link href="/dashboard">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
      <Button variant="ghost" size="sm" className="-ml-2" asChild>
        <Link href="/quizzes">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quizzes
        </Link>
      </Button>

      <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm gap-2">
            <span className="font-medium truncate">{quiz.title}</span>
            <span className="text-muted-foreground text-xs shrink-0">
              {currentQuestionIndex + 1} / {quiz.questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Navigation — scrollable pill row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {quiz.questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={cn(
                "shrink-0 w-8 h-8 rounded-lg text-xs font-semibold transition-all",
                index === currentQuestionIndex
                  ? "bg-primary text-primary-foreground"
                  : selectedAnswers[q.id] !== undefined
                    ? "bg-primary/25 text-primary"
                    : "bg-secondary text-muted-foreground",
              )}
              aria-label={`Go to question ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg leading-relaxed">{currentQuestion.text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={cn(
                  "w-full text-left p-3.5 md:p-4 rounded-xl border-2 transition-all active:scale-[0.99]",
                  selectedAnswer === index
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border hover:border-primary/40 hover:bg-secondary/50",
                )}
              >
                <span className="flex items-start gap-3">
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5",
                      selectedAnswer === index ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40 text-muted-foreground",
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
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="flex-1 sm:flex-none">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Prev
            </Button>
            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <Button onClick={handleSubmit} disabled={Object.keys(selectedAnswers).length !== quiz.questions.length} className="flex-1 sm:flex-none">
                Submit Quiz
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={selectedAnswer === undefined} className="flex-1 sm:flex-none">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
