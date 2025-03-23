import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Home() {
  // User has a monthly limit of 10 perks
  const totalPerksLimit = 10
  const perksUsed = 3 // This would come from user data in a real app
  const perksRemaining = totalPerksLimit - perksUsed
  const percentUsed = (perksUsed / totalPerksLimit) * 100

  const scenarios = [
    {
      id: "cold-email",
      title: "Cold Email",
      description: "Authentic gifts to break the ice with new prospects",
      count: 18,
    },
    {
      id: "follow-up",
      title: "Follow-up",
      description: "Thoughtful incentives to re-engage with prospects",
      count: 24,
    },
    {
      id: "events",
      title: "Events",
      description: "Meaningful gifts for webinars and in-person events",
      count: 15,
    },
    {
      id: "client-appreciation",
      title: "Client Appreciation",
      description: "Artisanal thank you gifts for your existing customers",
      count: 20,
    },
  ]

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Artisanal Gift Platform</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Share authentic artisanal gifts with meaningful stories that elevate your outreach conversations
        </p>
      </div>

      <div className="max-w-md mx-auto mb-8 bg-card p-6 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Your Perk Allowance</h2>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">Monthly usage</span>
          <span className="text-sm font-medium">
            {perksUsed} of {totalPerksLimit} used
          </span>
        </div>
        <Progress value={percentUsed} className="mb-4" />
        <p className="text-sm text-muted-foreground">
          You have <span className="font-bold text-foreground">{perksRemaining} perks</span> remaining this month.
          {perksRemaining <= 2 && (
            <span className="text-destructive"> Running low! Consider upgrading your plan for more perks.</span>
          )}
        </p>
      </div>

      <div className="max-w-md mx-auto mb-12">
        <Link href="/ai-assistant">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/20 bg-primary/5">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">AI Gift Story Assistant</h3>
                <p className="text-sm text-muted-foreground">
                  Describe your scenario and get personalized brand recommendations
                </p>
              </div>
              <ArrowRight className="ml-auto h-5 w-5 text-primary" />
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {scenarios.map((scenario) => (
          <Card key={scenario.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{scenario.title}</CardTitle>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{scenario.count} available options</p>
            </CardContent>
            <CardFooter>
              <Link href={`/scenarios/${scenario.id}`} className="w-full">
                <Button className="w-full" disabled={perksRemaining <= 0}>
                  Select
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}

