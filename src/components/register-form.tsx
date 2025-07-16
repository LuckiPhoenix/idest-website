import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

//TODO: Supabase auth

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng Ký</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Tạo tài khoản để bắt đầu học IELTS
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="fullName">Họ và tên</Label>
          <Input id="fullName" type="text" placeholder="Nguyễn Văn A" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nguyenvana@example.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
          <Input id="confirmPassword" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Đăng ký
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Hoặc đăng ký bằng
          </span>
        </div>
        <Button variant="outline" className="w-full">
          Đăng ký với Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Đã có tài khoản?{" "}
        <a href="/login" className="underline underline-offset-4">
          Đăng nhập ngay!
        </a>
      </div>
    </form>
  )
} 