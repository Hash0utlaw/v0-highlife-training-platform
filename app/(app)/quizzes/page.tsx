import { mockQuizzes, mockModules, mockEmployee } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ClipboardCheck,
  CheckCircle2,
  Clock,
  Trophy,
  Target,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Lock,
  Star,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function QuizzesPage() {
  const quizResults = mockEmployee.quizHistory
  const completedCount = quizResults.length
  const totalQuizzes = mockQuizzes.length
  const passedCount = quizResults.filter((r) => {
    const quiz = mockQuizzes.find((q) => q.id === r.quizId)
    return quiz && Math.round((r.score / r.totalQuestions) * 100) >= quiz.passingScore
  }).length
  const avgScore = mockEmployee.averageQuizScore
  const bestScore = quizResults.length
    ? Math.max(...quizResults.map((r) => Math.round((r.score / r.totalQuestions) * 100)))
    : 0

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-3xl font-bold">Knowledge Quizzes</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Test your understanding after completing training modules
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: ClipboardCheck, label: "Completed", value: `${completedCount}/${totalQuizzes}`, color: "text-primary" },
          { icon: Trophy, label: "Avg Score", value: `${avgScore}%`, color: "text-primary" },
          { icon: Target, label: "Passed", value: passedCount.toString(), color: "text-primary" },
          { icon: Star, label: "Best Score", value: bestScore ? `${bestScore}%` : "—", color: "text-amber-400" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-3 md:p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
              <div className="min-w-0">
                <p className="text-lg md:text-2xl font-bold leading-none">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overall progress */}
      {completedCount > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Overall completion</span>
            <span>{Math.round((completedCount / totalQuizzes) * 100)}%</span>
          </div>
          <Progress value={(completedCount / totalQuizzes) * 100} className="h-1.5" />
        </div>
      )}

      {/* Quiz List */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wide text-xs">
          Available Quizzes
        </h2>
        <div className="space-y-3">
          {mockQuizzes.map((quiz, idx) => {
            const module = mockModules.find((m) => m.id === quiz.moduleId)
            const result = quizResults.find((r) => r.quizId === quiz.id)
            const scorePercent = result ? Math.round((result.score / result.totalQuestions) * 100) : null
            const hasPassed = scorePercent !== null && scorePercent >= quiz.passingScore
            const isLocked = !module?.completed && !result
            const estimatedMins = Math.ceil(quiz.questions.length * 1.5)

            return (
              <Card
                key={quiz.id}
                className={cn(
                  "overflow-hidden transition-all",
                  isLocked ? "opacity-60" : "hover:border-primary/40",
                  hasPassed && "border-primary/30",
                )}
              >
                <CardContent className="p-0">
                  {/* Colored top accent */}
                  <div
                    className={cn(
                      "h-1",
                      hasPassed ? "bg-primary" : result ? "bg-amber-500" : "bg-border",
                    )}
                  />
                  <div className="p-4 md:p-5">
                    <div className="flex items-start gap-4">
                      {/* Status icon */}
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                          hasPassed
                            ? "bg-primary/15 text-primary"
                            : result
                              ? "bg-amber-500/15 text-amber-500"
                              : isLocked
                                ? "bg-muted text-muted-foreground"
                                : "bg-secondary text-muted-foreground",
                        )}
                      >
                        {hasPassed ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : isLocked ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <ClipboardCheck className="h-5 w-5" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-sm md:text-base leading-tight">{quiz.title}</h3>
                            {module && (
                              <div className="flex items-center gap-1.5 mt-1">
                                <BookOpen className="h-3 w-3 text-muted-foreground shrink-0" />
                                <p className="text-xs text-muted-foreground truncate">
                                  {module.title}
                                </p>
                              </div>
                            )}
                          </div>
                          {/* Score badge */}
                          {scorePercent !== null && (
                            <Badge
                              variant={hasPassed ? "default" : "secondary"}
                              className={cn(
                                "shrink-0 text-xs font-bold",
                                !hasPassed && "bg-amber-500/15 text-amber-400 border-amber-500/30",
                              )}
                            >
                              {scorePercent}%
                            </Badge>
                          )}
                        </div>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <ClipboardCheck className="h-3 w-3" />
                            {quiz.questions.length} questions
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            ~{estimatedMins} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {quiz.passingScore}% to pass
                          </span>
                          {result && (
                            <span className="flex items-center gap-1 text-foreground/60">
                              {result.score}/{result.totalQuestions} correct
                            </span>
                          )}
                        </div>

                        {/* Score progress bar if attempted */}
                        {scorePercent !== null && (
                          <div className="mt-3 space-y-1">
                            <Progress
                              value={scorePercent}
                              className={cn("h-1.5", !hasPassed && "[&>div]:bg-amber-500")}
                            />
                          </div>
                        )}

                        {/* CTA */}
                        <div className="mt-4 flex items-center justify-between gap-3">
                          {isLocked ? (
                            <p className="text-xs text-muted-foreground">
                              Complete the training module to unlock
                            </p>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              {hasPassed
                                ? "Quiz passed — retake to improve your score"
                                : result
                                  ? "Did not pass — review the module and try again"
                                  : "Ready to take this quiz"}
                            </p>
                          )}
                          <Button
                            variant={hasPassed ? "outline" : "default"}
                            size="sm"
                            asChild
                            disabled={isLocked}
                            className="shrink-0"
                          >
                            <Link href={`/quizzes/${quiz.id}`}>
                              {hasPassed ? (
                                <>
                                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                                  Retake
                                </>
                              ) : result ? (
                                <>
                                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                                  Try Again
                                </>
                              ) : (
                                <>
                                  Start Quiz
                                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                                </>
                              )}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quiz History */}
      {quizResults.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wide text-xs">
            Recent Attempts
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[...quizResults]
                  .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                  .map((result, index) => {
                    const pct = Math.round((result.score / result.totalQuestions) * 100)
                    const quiz = mockQuizzes.find((q) => q.id === result.quizId)
                    const passed = quiz ? pct >= quiz.passingScore : pct >= 80
                    return (
                      <div key={index} className="flex items-center gap-3 p-3.5 md:p-4">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                            passed ? "bg-primary/10" : "bg-amber-500/10",
                          )}
                        >
                          <Trophy className={cn("h-4 w-4", passed ? "text-primary" : "text-amber-500")} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{result.quizTitle}</p>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                            <Clock className="h-3 w-3" />
                            {new Date(result.completedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={cn("font-bold text-base", passed ? "text-primary" : "text-amber-500")}>
                            {pct}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {result.score}/{result.totalQuestions}
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
