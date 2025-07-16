import { ChevronRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Course {
  id: string
  name: string
  level: string
  enrollment: number
  description: string
  color: string
}

const courses: Course[] = [
  {
    id: "1",
    name: "IELTS Foundation",
    level: "Cơ bản",
    enrollment: 1250,
    description: "Khóa học nền tảng cho người mới bắt đầu học IELTS",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "IELTS Intermediate",
    level: "Trung cấp",
    enrollment: 890,
    description: "Phát triển kỹ năng IELTS từ cơ bản lên trung cấp",
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "IELTS Advanced",
    level: "Nâng cao",
    enrollment: 567,
    description: "Hoàn thiện kỹ năng để đạt điểm cao IELTS",
    color: "bg-purple-500",
  },
  {
    id: "4",
    name: "IELTS Speaking Mastery",
    level: "Chuyên sâu",
    enrollment: 423,
    description: "Chuyên sâu kỹ năng Speaking để đạt band 7.0+",
    color: "bg-orange-500",
  },
]

export function CoursesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-be-vietnam-pro text-3xl font-bold text-gray-900">Các Khóa Học</h2>
          <Button variant="ghost" className="font-be-vietnam-pro text-gray-600 hover:text-gray-900 flex items-center gap-2">
            Xem tất cả
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className={`h-2 ${course.color}`}></div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-be-vietnam-pro font-bold text-xl text-gray-900">{course.name}</h3>
                    <Badge variant="secondary" className="font-be-vietnam-pro text-sm font-semibold">
                      {course.level}
                    </Badge>
                  </div>
                  <p className="font-be-vietnam-pro text-sm text-gray-600 line-clamp-2 leading-relaxed">{course.description}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span className="font-be-vietnam-pro font-medium">{course.enrollment.toLocaleString()} học viên</span>
                </div>

                <Button className="font-be-vietnam-pro w-full bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  Tham gia
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
