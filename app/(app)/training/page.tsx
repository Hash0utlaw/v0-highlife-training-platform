import type { Metadata } from "next"
import { mockModules } from "@/lib/data"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle2, PlayCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Training Modules",
  description: "Complete training modules to earn certifications and improve your product knowledge",
}

export default function TrainingPage() {
  const completedCount = mockModules.filter((m) => m.completed).length

  return (
    <div className="space-y-6">
      <div className="relative h-40 md:h-56 w-full overflow-hidden">
        <Image src="/hero-training.jpg" alt="Training modules" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Training Modules</h1>
          <p className="text-muted-foreground mt-1">Complete modules to earn certifications</p>
        </div>
      </div>

      <div className="px-4 md:px-8 pb-4 md:pb-8 space-y-6">
        {/* Progress Badge */}
        <Badge variant="secondary" className="w-fit text-sm">
          {completedCount} of {mockModules.length} completed
        </Badge>

        {/* Modules Grid */}
        <div className="grid gap-4">
          {mockModules.map((module) => (
            <Card key={module.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {module.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      ) : (
                        <PlayCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <h3 className="font-semibold">{module.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-7">{module.description}</p>
                  </div>
                  {module.completed ? (
                    <Badge className="bg-primary/10 text-primary border-primary/20 flex-shrink-0">Completed</Badge>
                  ) : module.progress > 0 ? (
                    <Badge variant="secondary" className="flex-shrink-0">
                      In Progress
                    </Badge>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground pl-7">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {module.estimatedTime}
                  </div>
                  <span>•</span>
                  <span>{module.lessons.length} lessons</span>
                </div>
                {!module.completed && (
                  <div className="mt-3 pl-7 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-1.5" />
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0 pl-7">
                <Button variant={module.completed ? "outline" : "default"} size="sm" asChild>
                  <Link href={`/training/${module.id}`}>
                    {module.completed ? "Review" : module.progress > 0 ? "Continue" : "Start"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
