"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, Copy, AlertCircle, Users, MessageSquareQuote, Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BrandPage({ params }: { params: { scenarioId: string; brandId: string } }) {
  const { scenarioId, brandId } = params
  const [copied, setCopied] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [activeTab, setActiveTab] = useState("story")

  // User perk limit data - in a real app, this would come from a database
  const totalPerksLimit = 10
  const perksUsed = 3
  const perksRemaining = totalPerksLimit - perksUsed
  const percentUsed = (perksUsed / totalPerksLimit) * 100

  // Convert kebab-case to title case for display
  const scenarioTitle = scenarioId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const brandTitle = brandId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Mock coupon data based on scenario and brand with availability limits and brand stories
  const coupons = {
    "follow-up": {
      "bean-voyage": {
        code: "BEANVOYAGE15",
        description: "15% off any coffee subscription",
        expires: "December 31, 2023",
        image: "/placeholder.svg?height=200&width=400",
        totalAvailable: 50,
        remaining: 12,
        claimedToday: 3,
        location: "Costa Rica",
        founded: "2018",
        tags: ["Sustainable", "Women-owned", "Direct trade"],
        story:
          "Bean Voyage is a feminist nonprofit that supports women coffee producers in Costa Rica to become entrepreneurs. They work directly with small-scale women coffee producers to help them produce specialty coffee and sell it at a fair price, eliminating unnecessary middlemen and creating sustainable livelihoods.",
        impact:
          "Every purchase directly supports women coffee farmers earning up to 300% more income than through traditional channels.",
        conversationStarters: [
          "Did you know the coffee in your cup has a direct impact on women entrepreneurs in Costa Rica?",
          "I recently discovered this amazing women-owned coffee collective that's revolutionizing how coffee farmers get paid.",
          "I'd love to follow up with something special - this coffee not only tastes incredible but has an inspiring story behind it.",
        ],
      },
      "wild-herbs": {
        code: "WILDHERBS20",
        description: "20% off your first tea sampler",
        expires: "January 15, 2024",
        image: "/placeholder.svg?height=200&width=400",
        totalAvailable: 40,
        remaining: 23,
        claimedToday: 2,
        location: "Pacific Northwest",
        founded: "2019",
        tags: ["Organic", "Small-batch", "Foraged"],
        story:
          "Wild Herbs was founded by former park ranger Eliza Chen, who spent years learning about native plants in the Pacific Northwest. Each tea blend contains hand-foraged ingredients from sustainable sources, combined with organic cultivated herbs. Every batch is small and seasonal, reflecting what nature offers at that moment.",
        impact:
          "Wild Herbs contributes 5% of profits to conservation efforts in the wilderness areas where they forage.",
        conversationStarters: [
          "I wanted to share something unique with you - a tea blend made from wild-foraged ingredients from the Pacific Northwest.",
          "Have you ever tried tea made from plants that grow wild in protected forests? It's a completely different experience.",
          "I thought you might appreciate this - it's from a small company started by a former park ranger who turned her knowledge of wild plants into something special.",
        ],
      },
      "craft-chocolate": {
        code: "CRAFTCHOC25",
        description: "25% off bean-to-bar chocolate tasting kit",
        expires: "November 30, 2023",
        image: "/placeholder.svg?height=200&width=400",
        totalAvailable: 30,
        remaining: 5,
        claimedToday: 7,
        location: "Brooklyn, NY",
        founded: "2015",
        tags: ["Artisanal", "Fair-trade", "Single-origin"],
        story:
          "Craft Chocolate began in a tiny Brooklyn apartment when founders Miguel and Sarah started experimenting with cacao beans they brought back from Miguel's family farm in Ecuador. Today, they work directly with cacao farmers in Ecuador, Peru, and Tanzania, paying premium prices for exceptional beans. Each chocolate bar is crafted by hand in small batches, highlighting the unique flavor profiles of each origin.",
        impact: "Their direct trade model ensures farmers receive 3-5x the commodity price for their cacao.",
        conversationStarters: [
          "I wanted to follow up with something special - have you ever experienced chocolate that's crafted like fine wine, with distinct flavor notes from different regions?",
          "I recently discovered this amazing chocolate maker in Brooklyn who's revolutionizing how we think about chocolate - it's as complex and nuanced as fine wine.",
          "I thought you might appreciate this - it's chocolate made by people who know the farmers by name and can tell you exactly which hillside the cacao beans grew on.",
        ],
      },
      "urban-apothecary": {
        code: "URBAN15GIFT",
        description: "15% off any gift set + free shipping",
        expires: "February 28, 2024",
        image: "/placeholder.svg?height=200&width=400",
        totalAvailable: 40,
        remaining: 3,
        claimedToday: 9,
        location: "Portland, OR",
        founded: "2017",
        tags: ["Vegan", "Zero-waste", "Handcrafted"],
        story:
          "Urban Apothecary was born when founder Jamie Lee, a clinical herbalist, began creating plant-based remedies for friends dealing with skin issues. Using traditional herbalism knowledge combined with modern dermatological research, Jamie creates small-batch skincare products using locally sourced botanical ingredients. Every product comes in reusable or compostable packaging, reflecting their commitment to zero waste.",
        impact: "They operate a container return program that has kept over 10,000 glass bottles out of landfills.",
        conversationStarters: [
          "I wanted to share something special with you - skincare created by a clinical herbalist who harvests many of the ingredients from their own garden.",
          "Have you ever tried skincare products that come with instructions to plant the packaging when you're done with it?",
          "I thought you might appreciate this - it's from a small company that's revolutionizing sustainable beauty with products that are as kind to your skin as they are to the planet.",
        ],
      },
    },
    // Add more scenarios and brands as needed
  }

  // Get coupon for the current scenario and brand
  const coupon = coupons[scenarioId as keyof typeof coupons]?.[brandId as keyof (typeof coupons)["follow-up"]] || {
    code: "DEFAULTCODE",
    description: "Default coupon description",
    expires: "December 31, 2023",
    image: "/placeholder.svg?height=200&width=400",
    totalAvailable: 50,
    remaining: 25,
    claimedToday: 0,
    location: "Unknown",
    founded: "Unknown",
    tags: ["Artisanal"],
    story: "This brand has a unique story that resonates with customers.",
    impact: "They make a positive impact in their community.",
    conversationStarters: [
      "Have you heard about this amazing brand?",
      "I thought you might appreciate their story.",
      "I wanted to share something special with you.",
    ],
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: `Coupon code ${coupon.code} has been copied to your clipboard.`,
    })

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleClaim = () => {
    // Check user's personal limit
    if (perksRemaining <= 0) {
      toast({
        title: "Personal limit reached",
        description: "You've reached your monthly perk limit. Upgrade your plan for more perks.",
        variant: "destructive",
      })
      return
    }

    // Check perk's global availability
    if (coupon.remaining <= 0) {
      toast({
        title: "Perk unavailable",
        description: "This perk is no longer available. Please select another perk.",
        variant: "destructive",
      })
      return
    }

    setClaimed(true)
    toast({
      title: "Perk claimed!",
      description: `You've successfully claimed the ${brandTitle} perk. You have ${perksRemaining - 1} perks remaining.`,
    })

    // In a real app, you would:
    // 1. Update the user's perk count in the database
    // 2. Decrease the perk's global availability count
  }

  // Calculate percentage of perks remaining
  const perkAvailabilityPercent = (coupon.remaining / coupon.totalAvailable) * 100

  // Copy conversation starter to clipboard
  const copyConversationStarter = (starter: string) => {
    navigator.clipboard.writeText(starter)
    toast({
      title: "Copied to clipboard",
      description: "Conversation starter copied to clipboard.",
    })
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href={`/scenarios/${scenarioId}`}>
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to brands
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-8 max-w-6xl mx-auto">
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{brandTitle}</h1>
              <Badge variant="outline" className="text-xs">
                {coupon.location}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              Founded in {coupon.founded} • {coupon.tags.join(" • ")}
            </p>
          </div>

          <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8">
            <Image src={coupon.image || "/placeholder.svg"} alt={`${brandTitle}`} fill className="object-cover" />
          </div>

          <Tabs defaultValue="story" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="story" onClick={() => setActiveTab("story")}>
                Brand Story
              </TabsTrigger>
              <TabsTrigger value="conversation" onClick={() => setActiveTab("conversation")}>
                Conversation Ideas
              </TabsTrigger>
            </TabsList>
            <TabsContent value="story" className="p-4 border rounded-md mt-2">
              <h2 className="text-xl font-semibold mb-4">The Story Behind {brandTitle}</h2>
              <p className="mb-4">{coupon.story}</p>
              <div className="bg-primary/10 p-4 rounded-md">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                    Impact
                  </Badge>
                  Their Positive Impact
                </h3>
                <p>{coupon.impact}</p>
              </div>
            </TabsContent>
            <TabsContent value="conversation" className="p-4 border rounded-md mt-2">
              <h2 className="text-xl font-semibold mb-4">Conversation Starters</h2>
              <p className="text-muted-foreground mb-4">
                Use these ideas to naturally weave the brand story into your follow-up conversations:
              </p>
              <div className="grid gap-3">
                {coupon.conversationStarters.map((starter, index) => (
                  <div key={index} className="bg-muted p-3 rounded-md relative group">
                    <div className="flex gap-2 items-start">
                      <MessageSquareQuote className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm">{starter}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyConversationStarter(starter)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-md">
                <div className="flex gap-2 items-start">
                  <Lightbulb className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-800 mb-1">Pro Tip</h3>
                    <p className="text-sm text-amber-700">
                      Authentic connections happen when you genuinely share something you believe in. Choose the
                      conversation starter that feels most natural to your relationship with the recipient.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Special Offer</CardTitle>
                {coupon.remaining <= 5 && coupon.remaining > 0 && (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    Only {coupon.remaining} left
                  </Badge>
                )}
              </div>
              <CardDescription>Valid until {coupon.expires}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Offer Details</h3>
                <p>{coupon.description}</p>
              </div>

              {perksRemaining <= 0 && !claimed && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Personal limit reached</AlertTitle>
                  <AlertDescription>
                    You've used all your monthly perks. Upgrade your plan to claim more perks.
                  </AlertDescription>
                </Alert>
              )}

              {coupon.remaining <= 0 && !claimed && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Perk unavailable</AlertTitle>
                  <AlertDescription>
                    This perk has reached its global claim limit. Please select another perk.
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-muted p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Coupon Code</p>
                  <p className="text-lg font-mono font-bold">{claimed ? coupon.code : "••••••••••"}</p>
                </div>
                {claimed ? (
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Code
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleClaim}
                    disabled={perksRemaining <= 0 || coupon.remaining <= 0}
                    variant="default"
                    size="sm"
                  >
                    Claim Perk
                  </Button>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
              <p className="text-sm text-muted-foreground">
                Terms and conditions apply. Offer cannot be combined with other promotions.
              </p>
              {!claimed && coupon.remaining > 0 && perksRemaining > 0 && (
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Claiming this perk will use 1 of your {perksRemaining} remaining monthly perks.
                </p>
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="bg-card p-4 rounded-lg border shadow-sm sticky top-4">
            <h2 className="text-lg font-semibold mb-2">Your Perk Allowance</h2>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Monthly usage</span>
              <span className="text-sm font-medium">
                {perksUsed} of {totalPerksLimit} used
              </span>
            </div>
            <Progress value={percentUsed} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              You have <span className="font-bold text-foreground">{perksRemaining} perks</span> remaining this month.
            </p>
          </div>

          <div className="bg-card p-4 rounded-lg border shadow-sm sticky top-48">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold">Perk Availability</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-3 w-3 mr-1" />
                <span>{coupon.claimedToday} claimed today</span>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Global availability</span>
              <span className="text-sm font-medium">
                {coupon.remaining} of {coupon.totalAvailable} left
              </span>
            </div>
            <Progress value={perkAvailabilityPercent} className="mb-2" />

            {coupon.remaining <= 0 ? (
              <Alert variant="destructive" className="mt-3">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Out of stock</AlertTitle>
                <AlertDescription>
                  This perk has reached its global claim limit. Please check back later or select another perk.
                </AlertDescription>
              </Alert>
            ) : coupon.remaining <= 5 ? (
              <p className="text-sm text-amber-600 font-medium">
                Only {coupon.remaining} perks remaining! Claim soon before they're gone.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">This perk is still widely available.</p>
            )}
          </div>

          {activeTab === "conversation" && (
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Why Stories Matter</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Sharing a brand's authentic story helps create meaningful connections with your audience:
              </p>
              <ul className="grid gap-3 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Creates authentic, value-driven conversations</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Demonstrates your attention to detail and thoughtfulness</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Provides a natural segue into your business conversation</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Supports small businesses with meaningful missions</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </main>
  )
}

