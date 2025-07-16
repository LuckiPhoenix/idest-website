import { Button } from "@/components/ui/button"

export function RegistrationSection() {
  return (
    <section className="bg-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Không biết trình độ hiện tại?</h2>
            <p className="text-gray-700 text-lg">Làm bài thi thử để đánh giá chính xác trình độ IELTS của bạn</p>
          </div>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg whitespace-nowrap"
          >
            Thi thử ngay
          </Button>
        </div>
      </div>
    </section>
  )
}
