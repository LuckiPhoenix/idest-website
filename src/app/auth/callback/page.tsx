import { createClient } from '@/modules/supabase/server'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: Promise<{ code?: string }>
}

export default async function AuthCallbackPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams
  const code = resolvedSearchParams.code
  const supabase = await createClient()

  if (!code) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Thiếu mã xác thực. Vui lòng đăng nhập lại.
      </div>
    )
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('XXXXXX Exchange error:', error.message)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Đăng nhập thất bại. Vui lòng thử lại.
      </div>
    )
  }

  // Redirect to home page after successful authentication
  redirect('/')
}