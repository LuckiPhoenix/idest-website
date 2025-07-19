import { ChevronRight, Play, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface PracticeCard {
  id: string
  title: string
  viewCount: string
  image: string
  questions: number
}

const listeningPractice: PracticeCard[] = [
  {
    id: "1",
    title: "The Underground House",
    viewCount: "1K lượt làm",
    image: "/placeholder.svg?height=200&width=300",
    questions: 10,
  },
  {
    id: "2",
    title: "Outdoor Survival Skills",
    viewCount: "2K lượt làm",
    image: "/placeholder.svg?height=200&width=300",
    questions: 10,
  },
  {
    id: "3",
    title: "Car For Sale (Mini)",
    viewCount: "4K lượt làm",
    image: "/placeholder.svg?height=200&width=300",
    questions: 10,
  },
  {
    id: "4",
    title: "The Australian Quarantine Service",
    viewCount: "1K lượt làm",
    image: "/placeholder.svg?height=200&width=300",
    questions: 10,
  },
]

const readingPractice: PracticeCard[] = [
  {
    id: "5",
    title: "UK companies need more effective boards of directors",
    viewCount: "5K lượt làm",
    image: "/placeholder.svg?height=200&width=300",
    questions: 10,
  },
  {
    id: "6",
    title: "Is the era of artificial speech translation upon us?",
    viewCount: "955 lượt làm",
    image: "/placeholder.svg?height=200&width=300",
    questions: 10,
  },
  {
    id: "7",
    title: "The Unselfish Gene",
    viewCount: "1K lượt làm",
    image: "/placeholder.svg?height=200&width=300",
    questions: 10,
  },
  {
    id: "8",
    title: "Artificial Artists",
    viewCount: "3K lượt làm",
    image: "/placeholder.svg?height=200&width=300",
    questions: 10,
  },
]

function PracticeCardComponent({ card }: { card: PracticeCard }) {
  const [imageSrc, setImageSrc] = useState(card.image)
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    if (!imageError) {
      setImageSrc("/fallback.jpg")
      setImageError(true)
    }
  }

  return (
    <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img 
          src={imageSrc} 
          alt={card.title} 
          className="w-full h-[120px] object-cover"
          onError={handleImageError}
        />
        <div className="absolute top-3 left-3 bg-white bg-opacity-90 px-3 py-1 rounded-lg text-sm font-bold font-be-vietnam-pro">
          {card.questions} câu
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-be-vietnam-pro font-bold text-lg text-gray-900 line-clamp-2 min-h-[3rem] leading-snug">{card.title}</h3>
        <p className="font-be-vietnam-pro text-sm text-gray-600 font-medium">{card.viewCount}</p>
        <Button
          variant="ghost"
          className="font-be-vietnam-pro text-red-500 hover:text-red-600 p-0 h-auto font-bold flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-current" />
          Làm bài
        </Button>
      </CardContent>
    </Card>
  )
}

export function IELTSPracticeSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
        {/* IELTS Listening Practice */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-be-vietnam-pro text-3xl font-bold text-gray-900">IELTS Listening Practice</h2>
            <Button variant="ghost" className="font-be-vietnam-pro text-gray-600 hover:text-gray-900 flex items-center gap-2">
              Xem thêm
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {listeningPractice.map((card) => (
              <PracticeCardComponent key={card.id} card={card} />
            ))}
          </div>
        </div>

        {/* IELTS Reading Practice */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-be-vietnam-pro text-3xl font-bold text-gray-900">IELTS Reading Practice</h2>
            <Button variant="ghost" className="font-be-vietnam-pro text-gray-600 hover:text-gray-900 flex items-center gap-2">
              Xem thêm
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {readingPractice.map((card) => (
              <PracticeCardComponent key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
