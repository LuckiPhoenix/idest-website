import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
  className="
    bg-gray-50 py-16 lg:py-24 relative
    bg-no-repeat bg-cover bg-bottom
    bg-[url('/hero-mobile.png')]
    sm:bg-[url('/heroimg.png')] sm:bg-center sm:bg-contain lg:bg-cover
  "
>
      <div className="absolute inset-0 bg-white/50 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 text-center space-y-10">
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            Nền tảng dạy học
            <br />
            <span className="text-blue-600 font-black drop-shadow-sm">IELTS Online 4 kỹ năng</span>
            <br />
            <span className="text-red-500 font-black drop-shadow-sm">
              miễn phí và chất lượng
            </span>
          </h1>

          <p className="font-be-vietnam-pro text-lg lg:text-xl text-gray-700 leading-relaxed lg:leading-loose max-w-2xl mx-auto font-medium">
            Idest cung cấp đầy đủ nội dung chất lượng gồm các bài kiểm tra và khóa học IELTS 4 kỹ năng
            IELTS Reading, Listening, Writing, Speaking.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
        >
          <a href="/register" >
            Đăng ký miễn phí ngay
          </a>
        </Button>
      </div>
    </section>
  )
}