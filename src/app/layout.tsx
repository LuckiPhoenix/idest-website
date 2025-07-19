import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Idest",
  description: "Nền tảng tự học IELTS Online 4 kỹ năng miễn phí và chất lượng",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="font-inter antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}

// TODO: DARKMODE