"use client"

import type React from "react"

import { mockEmployee, mockModules } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, MapPin, Briefcase, Award, Trophy, BookOpen, LogOut, Zap, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  award: Award,
}

export default function ProfilePage() {
  const router = useRouter()
  const employee = mockEmployee
  const overallProgress = Math.round((employee.completedModules / employee.totalModules) * 100)

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-20 h-20 mb-4">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold">{employee.name}</h1>
            <p className="text-muted-foreground text-sm">{employee.email}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {employee.role}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {employee.storeLocation}
              </div>
            </div>
            <Badge variant="secondary" className="mt-3">
              ID: {employee.id}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Training Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Training Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Completion</span>
              <span className="font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center p-3 bg-secondary/50 rounded-lg">
              <p className="text-2xl font-bold">{employee.completedModules}</p>
              <p className="text-xs text-muted-foreground">Modules Done</p>
            </div>
            <div className="text-center p-3 bg-secondary/50 rounded-lg">
              <p className="text-2xl font-bold">{mockModules.length - employee.completedModules}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Scores */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Quiz Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-8 py-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{employee.averageQuizScore}%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
            <div className="w-px h-16 bg-border" />
            <div className="text-center">
              <p className="text-4xl font-bold">{employee.quizHistory.length}</p>
              <p className="text-sm text-muted-foreground">Quizzes Taken</p>
            </div>
          </div>
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm font-medium">Recent Scores</p>
            {employee.quizHistory.slice(0, 3).map((quiz, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{quiz.quizTitle}</span>
                </div>
                <Badge variant={quiz.score / quiz.totalQuestions >= 0.8 ? "default" : "secondary"}>
                  {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          {employee.badges.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {employee.badges.map((badge) => {
                const IconComponent = iconMap[badge.icon] || Award
                return (
                  <div key={badge.id} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{badge.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{badge.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">Complete training to earn badges!</p>
          )}
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
