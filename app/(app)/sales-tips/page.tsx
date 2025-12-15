import { mockSalesTips, tipOfTheDay } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, MessageCircle, Target, ShieldQuestion, TrendingUp } from "lucide-react"

const categories = [
  {
    id: "opening",
    title: "Opening the Conversation",
    icon: MessageCircle,
    description: "Tips for making great first impressions",
  },
  {
    id: "recommendations",
    title: "Product Recommendations",
    icon: Target,
    description: "How to match products to customer needs",
  },
  {
    id: "objections",
    title: "Handling Objections",
    icon: ShieldQuestion,
    description: "Overcome common customer concerns",
  },
  {
    id: "upselling",
    title: "Upselling Techniques",
    icon: TrendingUp,
    description: "Increase sales without being pushy",
  },
]

export default function SalesTipsPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Sales Tips</h1>
        <p className="text-muted-foreground mt-1">Proven techniques to boost your sales performance</p>
      </div>

      {/* Tip of the Day */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-primary" />
            </div>
            <Badge variant="secondary" className="text-xs">
              Tip of the Day
            </Badge>
          </div>
          <CardTitle className="text-lg mt-3">{tipOfTheDay.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{tipOfTheDay.content}</p>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="space-y-4">
        {categories.map((category) => {
          const tips = mockSalesTips.filter((tip) => tip.category === category.id)
          const Icon = category.icon

          return (
            <Card key={category.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{category.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Accordion type="single" collapsible className="w-full">
                  {tips.map((tip) => (
                    <AccordionItem key={tip.id} value={tip.id} className="border-b-0">
                      <AccordionTrigger className="hover:no-underline py-3 text-left">
                        <span className="text-sm font-medium">{tip.title}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground leading-relaxed pb-2">{tip.content}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
