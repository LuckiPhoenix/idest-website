import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: { code?: string }
}

export default async function AuthCallbackPage({ searchParams }: Props) {
  const code = searchParams.code
  const supabase = await createClient()

  if (!code) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Thiếu mã xác thực. Vui lòng đăng nhập lại.
      </div>
    )
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('XXXXXX Exchange error:', error.message)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Đăng nhập thất bại. Vui lòng thử lại.
      </div>
    )
  }

  alert('Xác thực thành công, vui lòng đăng nhập lại')
  redirect('/auth/login')
}