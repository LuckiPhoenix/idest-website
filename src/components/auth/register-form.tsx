'use client'

import { cn } from "@/modules/utils"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { createClient } from "@/modules/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { registerUserWithSupabase } from "@/modules/profile/service"
import { Role } from "@/shared/types/role.enum"
import { CreateUserDto } from "@/apis/modules/profile/createUser.dto"
import { toast } from "sonner"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [supabase] = useState(() => createClient())
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const fullName = (form.fullName as HTMLInputElement).value
    const email = (form.email as HTMLInputElement).value
    const password = (form.password as HTMLInputElement).value
    const confirmPassword = (form.confirmPassword as HTMLInputElement).value

    if (password !== confirmPassword) {
      toast(
        "Lỗi xác nhận mật khẩu", {
          description: "Mật khẩu xác nhận không khớp!"
        }
      )
      setLoading(false)
      return
    }

    try {
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
        toast(
          "Lỗi đăng ký", {
            description: error.message
          }
        )
        setLoading(false)
        return
      }

      // Create user profile after successful Supabase signup
      if (data.user) {
        try {
          const user: CreateUserDto = {
            fullName: fullName,
            role: Role.Student,
            avatar: null,
          }
          await registerUserWithSupabase(user)
          
          toast(
            "Đăng ký thành công!", {
              description: "Vui lòng kiểm tra email để xác nhận tài khoản!"
            }
          )
          router.push("/auth/login")
        } catch (registerError) {
          console.error('Registration error:', registerError)
          toast(
            "Lỗi tạo hồ sơ người dùng", {
              description: "Không thể tạo hồ sơ người dùng. Vui lòng thử lại."
            }
          )
        }
      }
    } catch (error: unknown) {
      console.error('Registration error:', error)
      toast(
        "Lỗi đăng ký", {
          description: "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại."
        }
      )
    } finally {
      setLoading(false)
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
          <Input id="fullName" type="text" placeholder="Nguyễn Văn A" disabled={loading || googleLoading} required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nguyenvana@example.com" disabled={loading || googleLoading} required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input id="password" type="password" disabled={loading || googleLoading} required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
          <Input id="confirmPassword" type="password" disabled={loading || googleLoading} required />
        </div>
        <Button type="submit" className="w-full" disabled={loading || googleLoading}>
          {loading ? "Đang đăng ký..." : "Đăng ký"}
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
            setGoogleLoading(true)
            
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `${location.origin}/auth/callback`,
              },
            })
            
            setGoogleLoading(false)
            
            if (error) {
              toast(
                "Lỗi khi đăng ký với Google",
                {
                  description: error.message
                }
              )
            }
          }}
          className="w-full"
          disabled={loading || googleLoading}
        >
          {googleLoading ? (
            "Đang chuyển hướng..."
          ) : (
            <>
              <Image src="/googleIcon.webp" alt="Google" width={20} height={20} className="mr-2" />
              Đăng ký với Google
            </>
          )}
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