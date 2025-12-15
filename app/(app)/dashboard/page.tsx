import type React from "react"
import { mockEmployee, mockModules, mockProducts } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ClipboardCheck, Lightbulb, Package, ArrowRight, TrendingUp, AlertCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const employee = mockEmployee
  const nextModule = mockModules.find((m) => !m.completed)
  const newProducts = mockProducts.slice(0, 2)
  const overallProgress = Math.round((employee.completedModules / employee.totalModules) * 100)

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {employee.name.split(" ")[0]}</h1>
        <p className="text-muted-foreground mt-1">Continue your training journey</p>
      </div>

      {/* New Products Alert */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="flex items-center gap-4 py-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <AlertCircle className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">New Products Added</p>
            <p className="text-sm text-muted-foreground">{newProducts.length} new items in the product library</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/products">View</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Training Completion</span>
            <span className="font-medium">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                {employee.completedModules}/{employee.totalModules}
              </p>
              <p className="text-xs text-muted-foreground">Modules Completed</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{employee.averageQuizScore}%</p>
              <p className="text-xs text-muted-foreground">Average Quiz Score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Continue Learning */}
      {nextModule && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{nextModule.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{nextModule.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {nextModule.estimatedTime}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {nextModule.progress}% complete
                  </Badge>
                </div>
              </div>
            </div>
            <Button className="w-full mt-4" asChild>
              <Link href={`/training/${nextModule.id}`}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <QuickLink href="/products" icon={Package} label="Products" description="Browse catalog" />
        <QuickLink href="/training" icon={BookOpen} label="Training" description="View modules" />
        <QuickLink href="/quizzes" icon={ClipboardCheck} label="Quizzes" description="Test knowledge" />
        <QuickLink href="/sales-tips" icon={Lightbulb} label="Sales Tips" description="Boost sales" />
      </div>

      {/* Recent Quiz Scores */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recent Quiz Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {employee.quizHistory.slice(0, 3).map((quiz) => (
              <div
                key={quiz.quizId}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-sm">{quiz.quizTitle}</p>
                  <p className="text-xs text-muted-foreground">{new Date(quiz.completedAt).toLocaleDateString()}</p>
                </div>
                <Badge
                  variant={quiz.score / quiz.totalQuestions >= 0.8 ? "default" : "secondary"}
                  className="tabular-nums"
                >
                  {quiz.score}/{quiz.totalQuestions}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function QuickLink({
  href,
  icon: Icon,
  label,
  description,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  description: string
}) {
  return (
    <Link href={href}>
      <Card className="hover:bg-secondary/50 transition-colors h-full">
        <CardContent className="p-4 flex flex-col items-center text-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{label}</p>
            <p className="text-xs text-muted-foreground hidden md:block">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
