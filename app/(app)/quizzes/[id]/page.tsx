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
                "w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4",
                passed ? "bg-primary/10" : "bg-amber-500/10",
              )}
            >
              {passed ? (
                <CheckCircle2 className="h-10 w-10 text-primary" />
              ) : (
                <XCircle className="h-10 w-10 text-amber-500" />
              )}
            </div>
            <CardTitle className="text-2xl">{passed ? "Congratulations!" : "Keep Learning"}</CardTitle>
            <p className="text-muted-foreground mt-2">
              {passed
                ? "You passed the quiz successfully!"
                : `You need ${quiz.passingScore}% to pass. Try again after reviewing the material.`}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-5xl font-bold">{percentage}%</p>
              <p className="text-muted-foreground">
                {score} out of {quiz.questions.length} correct
              </p>
            </div>

            <div className="space-y-3">
              <p className="font-medium text-sm">Answer Breakdown</p>
              {quiz.questions.map((question, index) => {
                const answer = results.find((r) => r.questionId === question.id)
                return (
                  <div
                    key={question.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg",
                      answer?.correct ? "bg-primary/10" : "bg-destructive/10",
                    )}
                  >
                    {answer?.correct ? (
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                    )}
                    <span className="text-sm">Question {index + 1}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleRetake}>
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
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <Button variant="ghost" size="sm" className="-ml-2" asChild>
        <Link href="/quizzes">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quizzes
        </Link>
      </Button>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{quiz.title}</span>
            <span className="text-muted-foreground">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg leading-relaxed">{currentQuestion.text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={cn(
                  "w-full text-left p-4 rounded-lg border transition-all",
                  selectedAnswer === index
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium",
                      selectedAnswer === index ? "border-primary bg-primary text-primary-foreground" : "border-muted",
                    )}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <Button onClick={handleSubmit} disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}>
                Submit Quiz
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={selectedAnswer === undefined}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Question Navigation Dots */}
        <div className="flex items-center justify-center gap-2">
          {quiz.questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                index === currentQuestionIndex
                  ? "bg-primary"
                  : selectedAnswers[q.id] !== undefined
                    ? "bg-primary/40"
                    : "bg-muted",
              )}
              aria-label={`Go to question ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
