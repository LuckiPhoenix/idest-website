"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navBar"
import { HeroSection } from "@/components/hero-section"
import { RegistrationSection } from "@/components/registration-section"
import { IELTSOnlineTestSection } from "@/components/ielts-online-test-section"
import { IELTSPracticeSection } from "@/components/ielts-practice-section"
import { Footer } from "@/components/footer"
import { CoursesSection } from "@/components/courses-section"
import { createClient } from "@/lib/supabase/client"
import type { User } from '@supabase/supabase-js'


export default function Home() {
  const [supabase] = useState(() => createClient())
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      console.log("XXXXXXXXX👤 User:", user)
    }

    fetchUser()
  }, [supabase])

  return (
    <main className="w-full min-w-full bg-gray-50">
      <p>User: {user?.email}</p>
      <button className="bg-red-500 text-white px-4 py-2 z-50 rounded-md" onClick={() => supabase.auth.signOut()}>Sign Out</button>
      <Navbar />
      <HeroSection />
      <RegistrationSection />
      <CoursesSection />
      <IELTSOnlineTestSection />
      <IELTSPracticeSection />
      <Footer />
    </main>
  )
}