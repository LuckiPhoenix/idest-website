import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

//TODO: Supabase auth

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng Nhập</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Hãy nhập email và mật khẩu để xác thực
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nguyenvana@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Mật khẩu</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Quên mật khẩu?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Đăng nhập
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Hoặc đăng nhập bằng
          </span>
        </div>
        <Button variant="outline" className="w-full">
          
          Đăng nhập với Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Không có tài khoản?{" "}
        <a href="#" className="underline underline-offset-4">
          Đăng ký ngay!
        </a>
      </div>
    </form>
  )
}
