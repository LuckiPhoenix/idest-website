'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import Image from "next/image"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [supabase] = useState(() => createClient())
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })


    setLoading(false)

    if (error) {
      toast(
        "Lỗi đăng nhập", {
          description: error.message
        }
      )
    } else {
      router.push("/")
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    setGoogleLoading(false)

    if (error) {
      toast(
        "Lỗi khi đăng nhập với Google",
        {
          description: error.message
        }
      )
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng Nhập</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Hãy nhập email và mật khẩu để xác thực
        </p>
      
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="NguyenVanA@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || googleLoading}
            required
          />
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
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading || googleLoading}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading || googleLoading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Hoặc đăng nhập bằng
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
        >
          {googleLoading ? (
            "Đang chuyển hướng..."
          ) : (
            <>
              <Image
                src="/googleIcon.webp"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Đăng nhập với Google
            </>
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        Không có tài khoản?{" "}
        <a href="/auth/register" className="underline underline-offset-4">
          Đăng ký ngay!
        </a>
      </div>
    </form>
  )
}