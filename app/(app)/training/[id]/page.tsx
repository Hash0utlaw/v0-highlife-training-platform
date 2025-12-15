"use client"

import { useState, useEffect } from "react"
import { mockModules } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle2, Circle, PlayCircle, Video, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

function TrainingModulePage({ params }: { params: Promise<{ id: string }> }) {
  const [module, setModule] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])

  useEffect(() => {
    const fetchModule = async () => {
      const { id } = await params
      const foundModule = mockModules.find((m) => m.id === id)
      setModule(foundModule)
      if (foundModule) {
        const incompleteIndex = foundModule.lessons.findIndex((l) => !l.completed)
        setCurrentLessonIndex(incompleteIndex !== -1 ? incompleteIndex : 0)
        setCompletedLessons(foundModule.lessons.filter((l) => l.completed).map((l) => l.id))
      }
      setIsLoading(false)
    }
    fetchModule()
  }, [params])

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 space-y-6">
        <Button variant="ghost" size="sm" className="-ml-2" asChild>
          <Link href="/training">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Training
          </Link>
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading module...</p>
        </div>
      </div>
    )
  }

  if (!module) {
    return (
      <div className="p-4 md:p-8 space-y-6">
        <Button variant="ghost" size="sm" className="-ml-2" asChild>
          <Link href="/training">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Training
          </Link>
        </Button>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Module Not Found</h1>
          <p className="text-muted-foreground mt-2">The training module you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const currentLesson = module.lessons[currentLessonIndex]
  const progress = Math.round((completedLessons.length / module.lessons.length) * 100)
  const allLessonsCompleted = completedLessons.length === module.lessons.length

  const handleMarkComplete = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id])
    }
    if (currentLessonIndex < module.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" className="-ml-2" asChild>
        <Link href="/training">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Training
        </Link>
      </Button>

      {/* Module Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{module.title}</h1>
            <p className="text-muted-foreground mt-1">{module.description}</p>
          </div>
          <Badge variant="secondary">{module.estimatedTime}</Badge>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Module Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Lesson List */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Lessons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 p-3 pt-0">
            {module.lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id)
              const isCurrent = index === currentLessonIndex
              return (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLessonIndex(index)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    isCurrent ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : isCurrent ? (
                    <PlayCircle className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium truncate">{lesson.title}</span>
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* Current Lesson Content */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>
                Lesson {currentLessonIndex + 1} of {module.lessons.length}
              </span>
              {completedLessons.includes(currentLesson.id) && (
                <Badge variant="secondary" className="text-xs">
                  Completed
                </Badge>
              )}
            </div>
            <CardTitle>{currentLesson.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Placeholder */}
            {currentLesson.videoUrl !== undefined && (
              <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Video className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Video Content</p>
                </div>
              </div>
            )}

            {/* Lesson Content */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Lesson Content</span>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg whitespace-pre-line">
                <p className="text-foreground">{currentLesson.content}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
                disabled={currentLessonIndex === 0}
              >
                Previous
              </Button>

              {allLessonsCompleted ? (
                <Button asChild>
                  <Link href={`/quizzes?module=${module.id}`}>
                    Take Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button onClick={handleMarkComplete}>
                  {completedLessons.includes(currentLesson.id)
                    ? "Next Lesson"
                    : currentLessonIndex === module.lessons.length - 1
                      ? "Mark Complete"
                      : "Complete & Continue"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TrainingModulePage
