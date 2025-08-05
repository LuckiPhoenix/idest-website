import { Button } from "@/shared/ui/button"

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
      <div className="absolute inset-0 z-0 bg-white/50"></div>

      <div className="relative z-10 px-4 mx-auto space-y-10 max-w-7xl text-center lg:px-8">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 lg:text-5xl xl:text-6xl">
            Nền tảng dạy học
            <br />
            <span className="font-black text-blue-600 drop-shadow-sm">IELTS Online 4 kỹ năng</span>
            <br />
            <span className="font-black text-red-500 drop-shadow-sm">
              miễn phí và chất lượng
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-gray-700 font-be-vietnam-pro lg:text-xl lg:leading-loose">
            Idest cung cấp đầy đủ nội dung chất lượng gồm các bài kiểm tra và khóa học IELTS 4 kỹ năng
            IELTS Reading, Listening, Writing, Speaking.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="px-8 py-4 text-lg font-semibold text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600"
        >
          <a href="/auth/register" >
            Đăng ký miễn phí ngay
          </a>
        </Button>
      </div>
    </section>
  )
}