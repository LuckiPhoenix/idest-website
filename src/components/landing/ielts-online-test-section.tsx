import { ChevronRight } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"

interface IELTSTestCard {
  id: number
  title: string
  testCount: number
  viewCount: string
}

const ieltsTests: IELTSTestCard[] = [
  {
    id: 19,
    title: "Cambridge IELTS 19",
    testCount: 8,
    viewCount: "46K",
  },
  {
    id: 18,
    title: "Cambridge IELTS 18",
    testCount: 8,
    viewCount: "98K",
  },
  {
    id: 17,
    title: "Cambridge IELTS 17",
    testCount: 8,
    viewCount: "157K",
  },
]

export function IELTSOnlineTestSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">IELTS Online Test</h2>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            Xem thêm
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ieltsTests.map((test) => (
            <Card key={test.id} className={`border-0 overflow-hidden`}>
              <CardContent className="p-6">

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">{test.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{test.testCount} bài tests</span>
                    <span>{test.viewCount} lượt làm</span>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 p-0 h-auto font-medium flex items-center gap-2"
                  >
                    Xem bài test
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent> 
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
