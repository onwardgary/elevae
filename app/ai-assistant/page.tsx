"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Send, Bot, User, Sparkles, ArrowRight, Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

type Message = {
  role: "user" | "assistant"
  content: string
}

type Recommendation = {
  id: string
  brandId: string
  brandName: string
  scenario: string
  scenarioId: string
  description: string
  image: string
  tags: string[]
  reason: string
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your Gift Story Assistant. Tell me about your outreach scenario, and I'll recommend the perfect artisanal brand story and perk to share. For example, you might say: 'I need to follow up with a potential client who hasn't responded in two weeks.'",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [showRecommendations, setShowRecommendations] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, showRecommendations])

  // Mock AI response function
  const getAIResponse = (userMessage: string): Promise<{ response: string; recommendations: Recommendation[] }> => {
    // This would be replaced with a real AI API call in production
    return new Promise((resolve) => {
      setTimeout(() => {
        // Analyze user message for keywords
        const lowerCaseMessage = userMessage.toLowerCase()

        let response = ""
        let recommendations: Recommendation[] = []

        // Simple keyword matching for demo purposes
        if (
          lowerCaseMessage.includes("follow up") ||
          lowerCaseMessage.includes("followup") ||
          lowerCaseMessage.includes("follow-up")
        ) {
          response =
            "Based on your follow-up scenario, I've found some artisanal brands that could help you reconnect in a meaningful way. These options provide authentic conversation starters that can naturally lead back to your business discussion."

          recommendations = [
            {
              id: "rec1",
              brandId: "bean-voyage",
              brandName: "Bean Voyage",
              scenario: "Follow-up",
              scenarioId: "follow-up",
              description: "Women-owned coffee collective from Costa Rica",
              image: "/placeholder.svg?height=80&width=80",
              tags: ["Sustainable", "Women-owned"],
              reason:
                "The story of women entrepreneurs creating sustainable livelihoods makes for a compelling reconnection point that demonstrates your values.",
            },
            {
              id: "rec2",
              brandId: "craft-chocolate",
              brandName: "Craft Chocolate",
              scenario: "Follow-up",
              scenarioId: "follow-up",
              description: "Bean-to-bar chocolate makers in Brooklyn",
              image: "/placeholder.svg?height=80&width=80",
              tags: ["Artisanal", "Fair-trade"],
              reason:
                "Sharing a premium chocolate experience creates a memorable touchpoint and shows attention to detail and quality.",
            },
          ]
        } else if (
          lowerCaseMessage.includes("cold email") ||
          lowerCaseMessage.includes("cold outreach") ||
          lowerCaseMessage.includes("new prospect")
        ) {
          response =
            "For cold outreach, you need something intriguing but not overwhelming. I've selected brands with compelling stories that can serve as natural ice-breakers while providing genuine value to your new prospects."

          recommendations = [
            {
              id: "rec3",
              brandId: "wild-herbs",
              brandName: "Wild Herbs",
              scenario: "Cold Email",
              scenarioId: "cold-email",
              description: "Foraged tea blends from the Pacific Northwest",
              image: "/placeholder.svg?height=80&width=80",
              tags: ["Organic", "Small-batch"],
              reason:
                "The unique story of wild-foraged ingredients creates an intriguing first impression and demonstrates your attention to detail.",
            },
            {
              id: "rec4",
              brandId: "urban-apothecary",
              brandName: "Urban Apothecary",
              scenario: "Cold Email",
              scenarioId: "cold-email",
              description: "Handcrafted botanical skincare from Portland",
              image: "/placeholder.svg?height=80&width=80",
              tags: ["Vegan", "Zero-waste"],
              reason:
                "The sustainability story resonates with eco-conscious professionals and provides a memorable first touchpoint.",
            },
          ]
        } else if (
          lowerCaseMessage.includes("thank") ||
          lowerCaseMessage.includes("appreciation") ||
          lowerCaseMessage.includes("existing client")
        ) {
          response =
            "For client appreciation, I recommend these brands that convey genuine gratitude through their thoughtful creation and meaningful stories."

          recommendations = [
            {
              id: "rec5",
              brandId: "mountain-meadery",
              brandName: "Mountain Meadery",
              scenario: "Client Appreciation",
              scenarioId: "client-appreciation",
              description: "Small-batch honey wines from Colorado",
              image: "/placeholder.svg?height=80&width=80",
              tags: ["Craft", "Award-winning"],
              reason:
                "The artisanal nature and premium quality of this gift communicates how much you value the relationship.",
            },
            {
              id: "rec6",
              brandId: "honey-heritage",
              brandName: "Honey Heritage",
              scenario: "Client Appreciation",
              scenarioId: "client-appreciation",
              description: "Third-generation beekeepers from Vermont",
              image: "/placeholder.svg?height=80&width=80",
              tags: ["Family-owned", "Sustainable"],
              reason:
                "The family heritage story creates a warm connection and the sustainable practices align with values many clients appreciate.",
            },
          ]
        } else {
          response =
            "I've selected some versatile options that could work well for your scenario. Each of these brands has a compelling story that can help create meaningful connections."

          recommendations = [
            {
              id: "rec7",
              brandId: "bean-voyage",
              brandName: "Bean Voyage",
              scenario: "Follow-up",
              scenarioId: "follow-up",
              description: "Women-owned coffee collective from Costa Rica",
              image: "/placeholder.svg?height=80&width=80",
              tags: ["Sustainable", "Women-owned"],
              reason:
                "This brand's mission-driven story provides an authentic way to reconnect while supporting women entrepreneurs.",
            },
            {
              id: "rec8",
              brandId: "wild-herbs",
              brandName: "Wild Herbs",
              scenario: "Cold Email",
              scenarioId: "cold-email",
              description: "Foraged tea blends from the Pacific Northwest",
              image: "/placeholder.svg?height=80&width=80",
              tags: ["Organic", "Small-batch"],
              reason:
                "The unique story of wild-foraged ingredients creates a memorable impression in any outreach scenario.",
            },
          ]
        }

        resolve({ response, recommendations })
      }, 1500) // Simulate API delay
    })
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: inputValue }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    setShowRecommendations(false)

    // Get AI response
    const { response, recommendations } = await getAIResponse(userMessage.content)

    // Add AI response
    setMessages((prev) => [...prev, { role: "assistant", content: response }])
    setRecommendations(recommendations)
    setIsLoading(false)
    setShowRecommendations(true)
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-[3fr_1fr] gap-8 max-w-6xl mx-auto">
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight">Gift Story Assistant</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Describe your outreach scenario, and I'll recommend the perfect artisanal brand story
            </p>
          </div>

          <Card className="mb-4">
            <CardContent className="p-4 pt-6">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${
                          message.role === "assistant"
                            ? "bg-muted p-3 rounded-lg rounded-tl-none"
                            : "bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none"
                        }`}
                      >
                        {message.role === "assistant" && <Bot className="h-5 w-5 shrink-0 mt-0.5" />}
                        <div>
                          <p className={message.role === "user" ? "text-primary-foreground" : ""}>{message.content}</p>
                        </div>
                        {message.role === "user" && <User className="h-5 w-5 shrink-0 mt-0.5" />}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%] bg-muted p-3 rounded-lg rounded-tl-none">
                        <Bot className="h-5 w-5 shrink-0 mt-0.5" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-4 w-[150px]" />
                        </div>
                      </div>
                    </div>
                  )}

                  {showRecommendations && recommendations.length > 0 && (
                    <div className="flex justify-start">
                      <div className="max-w-[95%] bg-card border rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-primary" />
                          Recommended Perks
                        </h3>
                        <div className="grid gap-4">
                          {recommendations.map((rec) => (
                            <div key={rec.id} className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
                              <div className="flex gap-3">
                                <div className="w-16 h-16 relative rounded-md overflow-hidden border shrink-0">
                                  <Image
                                    src={rec.image || "/placeholder.svg"}
                                    alt={rec.brandName}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{rec.brandName}</h4>
                                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      {rec.scenario}
                                    </Badge>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-1 mb-2">
                                    {rec.tags.map((tag) => (
                                      <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                                  <Link href={`/scenarios/${rec.scenarioId}/brands/${rec.brandId}`}>
                                    <Button variant="outline" size="sm" className="w-full">
                                      View Details
                                      <ArrowRight className="ml-2 h-3 w-3" />
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <form
                className="flex w-full gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
              >
                <Input
                  placeholder="Describe your outreach scenario..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>Our AI assistant helps you find the perfect perk and story</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-1">Describe Your Scenario</h3>
                  <p className="text-sm text-muted-foreground">Tell us about your outreach situation and goals</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-1">Get Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes your needs and suggests relevant perks
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-1">Explore Brand Stories</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn how to weave these stories into your conversations
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h3 className="font-medium mb-1">Claim Your Perk</h3>
                  <p className="text-sm text-muted-foreground">
                    Select the perfect perk and share it with your contact
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example Prompts</CardTitle>
              <CardDescription>Try these to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div
                className="p-2 rounded-md hover:bg-muted cursor-pointer transition-colors"
                onClick={() =>
                  setInputValue("I need to follow up with a prospect who went cold after our initial meeting.")
                }
              >
                <p className="text-sm">
                  "I need to follow up with a prospect who went cold after our initial meeting."
                </p>
              </div>

              <div
                className="p-2 rounded-md hover:bg-muted cursor-pointer transition-colors"
                onClick={() => setInputValue("I'm sending cold emails to sustainability-focused tech companies.")}
              >
                <p className="text-sm">"I'm sending cold emails to sustainability-focused tech companies."</p>
              </div>

              <div
                className="p-2 rounded-md hover:bg-muted cursor-pointer transition-colors"
                onClick={() => setInputValue("I want to thank a client who just renewed their annual contract.")}
              >
                <p className="text-sm">"I want to thank a client who just renewed their annual contract."</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

