import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ScenarioPage({ params }: { params: { scenarioId: string } }) {
  const { scenarioId } = params

  // Convert kebab-case to title case for display
  const scenarioTitle = scenarioId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Mock data for artisanal indie brands with availability limits
  const brands = [
    {
      id: "bean-voyage",
      name: "Bean Voyage",
      description: "Women-owned coffee collective",
      image: "/placeholder.svg?height=80&width=80",
      totalAvailable: 50,
      remaining: 12,
      popular: true,
      location: "Costa Rica",
      tags: ["Sustainable", "Women-owned"],
    },
    {
      id: "wild-herbs",
      name: "Wild Herbs",
      description: "Foraged tea blends",
      image: "/placeholder.svg?height=80&width=80",
      totalAvailable: 40,
      remaining: 23,
      location: "Pacific Northwest",
      tags: ["Organic", "Small-batch"],
    },
    {
      id: "honey-heritage",
      name: "Honey Heritage",
      description: "Third-generation beekeepers",
      image: "/placeholder.svg?height=80&width=80",
      totalAvailable: 35,
      remaining: 0,
      location: "Vermont",
      tags: ["Family-owned", "Sustainable"],
    },
    {
      id: "craft-chocolate",
      name: "Craft Chocolate",
      description: "Bean-to-bar chocolate makers",
      image: "/placeholder.svg?height=80&width=80",
      totalAvailable: 30,
      remaining: 5,
      popular: true,
      location: "Brooklyn",
      tags: ["Artisanal", "Fair-trade"],
    },
    {
      id: "mountain-meadery",
      name: "Mountain Meadery",
      description: "Small-batch honey wines",
      image: "/placeholder.svg?height=80&width=80",
      totalAvailable: 25,
      remaining: 8,
      location: "Colorado",
      tags: ["Craft", "Award-winning"],
    },
    {
      id: "urban-apothecary",
      name: "Urban Apothecary",
      description: "Handcrafted botanical skincare",
      image: "/placeholder.svg?height=80&width=80",
      totalAvailable: 40,
      remaining: 3,
      popular: true,
      location: "Portland",
      tags: ["Vegan", "Zero-waste"],
    },
  ]

  // Count how many brands are out of stock
  const outOfStockCount = brands.filter((brand) => brand.remaining === 0).length

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to scenarios
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{scenarioTitle} Gifts</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Select an artisanal brand to discover their story and share authentic gifts with your audience
        </p>
      </div>

      {outOfStockCount > 0 && (
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {outOfStockCount} brand{outOfStockCount > 1 ? "s" : ""} currently have no available perks. Check back later
            for restocks.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={brand.remaining > 0 ? `/scenarios/${scenarioId}/brands/${brand.id}` : "#"}
            className={brand.remaining === 0 ? "pointer-events-none" : ""}
          >
            <Card
              className={`h-full transition-shadow ${brand.remaining > 0 ? "hover:shadow-md cursor-pointer" : "opacity-70"}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{brand.name}</CardTitle>
                    {brand.popular && brand.remaining > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {brand.location}
                  </Badge>
                </div>
                <CardDescription>{brand.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="relative w-full h-40 rounded-md overflow-hidden mb-4">
                  <Image src={brand.image || "/placeholder.svg"} alt={brand.name} fill className="object-cover" />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {brand.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {brand.remaining === 0 ? (
                  <Badge variant="outline" className="bg-muted text-muted-foreground">
                    Out of stock
                  </Badge>
                ) : brand.remaining <= 5 ? (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    Only {brand.remaining} left
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                    {brand.remaining} available
                  </Badge>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}

