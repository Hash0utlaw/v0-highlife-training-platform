import { mockQuizzes, mockModules, mockEmployee } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ClipboardCheck, CheckCircle2, Clock, Trophy } from "lucide-react"
import Link from "next/link"

export default function QuizzesPage() {
  const quizResults = mockEmployee.quizHistory

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Quizzes</h1>
        <p className="text-muted-foreground mt-1">Test your knowledge after completing training modules</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{quizResults.length}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockEmployee.averageQuizScore}%</p>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Quizzes */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Available Quizzes</h2>
        <div className="grid gap-4">
          {mockQuizzes.map((quiz) => {
            const module = mockModules.find((m) => m.id === quiz.moduleId)
            const result = quizResults.find((r) => r.quizId === quiz.id)
            const hasPassed = result && result.score / result.totalQuestions >= quiz.passingScore / 100

            return (
              <Card key={quiz.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {result ? (
                          <CheckCircle2
                            className={`h-5 w-5 flex-shrink-0 ${hasPassed ? "text-primary" : "text-amber-500"}`}
                          />
                        ) : (
                          <ClipboardCheck className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <CardTitle className="text-base">{quiz.title}</CardTitle>
                      </div>
                      {module && <p className="text-sm text-muted-foreground mt-1 pl-7">Module: {module.title}</p>}
                    </div>
                    {result && (
                      <Badge variant={hasPassed ? "default" : "secondary"} className="flex-shrink-0">
                        {result.score}/{result.totalQuestions}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center justify-between pl-7">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{quiz.questions.length} questions</span>
                      <span>•</span>
                      <span>{quiz.passingScore}% to pass</span>
                    </div>
                    <Button variant={result ? "outline" : "default"} size="sm" asChild>
                      <Link href={`/quizzes/${quiz.id}`}>{result ? "Retake" : "Start Quiz"}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quiz History */}
      {quizResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Quiz History</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {quizResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          result.score / result.totalQuestions >= 0.8
                            ? "bg-primary/10 text-primary"
                            : "bg-amber-500/10 text-amber-500"
                        }`}
                      >
                        <Trophy className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{result.quizTitle}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(result.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{Math.round((result.score / result.totalQuestions) * 100)}%</p>
                      <p className="text-xs text-muted-foreground">
                        {result.score}/{result.totalQuestions} correct
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
