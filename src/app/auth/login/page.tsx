import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex gap-2 justify-center md:justify-start">
          <Link href="/" className="flex gap-2 items-center font-medium">
            <Image
              src="/logo.png"
              alt="logo"
              width={20}
              height={20}
            />
            Idest
          </Link>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="hidden relative bg-muted lg:block">
        <Image
          src="/signin.png"
          alt="Image"
          width={9999}
          height={9999}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
