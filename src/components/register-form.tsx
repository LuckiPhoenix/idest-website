'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [supabase] = useState(() => createClient())
  const router = useRouter()

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const fullName = (form.fullName as HTMLInputElement).value
    const email = (form.email as HTMLInputElement).value
    const password = (form.password as HTMLInputElement).value
    const confirmPassword = (form.confirmPassword as HTMLInputElement).value

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!")
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Vui lòng kiểm tra email để xác nhận tài khoản!")
      router.push("/login")
    }
  }

  return (
    <form onSubmit={handleRegister} className={cn("flex flex-col gap-6", className)} {...props}>
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
        <Button
          variant="outline"
          type="button"
          onClick={async () => {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `${location.origin}/auth/callback`,
              },
            })
            if (error) alert(error.message)
          }}
          className="w-full"
        >
          <Image src="/googleIcon.webp" alt="Google" width={20} height={20} className="mr-2" />
          Đăng ký với Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Đã có tài khoản?{" "}
        <a href="/auth/login" className="underline underline-offset-4">
          Đăng nhập ngay!
        </a>
      </div>
    </form>
  )
}