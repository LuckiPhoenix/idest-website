"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navBar"
import { HeroSection } from "@/components/landing/hero-section"
import { RegistrationSection } from "@/components/landing/registration-section"
import { IELTSOnlineTestSection } from "@/components/landing/ielts-online-test-section"
import { IELTSPracticeSection } from "@/components/landing/ielts-practice-section"
import { Footer } from "@/components/landing/footer"
import { CoursesSection } from "@/components/landing/courses-section"
import { createClient } from "@/lib/supabase/client"
import type { Session, User } from '@supabase/supabase-js'



export default function Home() {
  const [supabase] = useState(() => createClient())
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null) 
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: { session } } = await supabase.auth.getSession()
      setUser(user)
      setSession(session)
      console.log("XXXXXXXXX👤 User:", user)
      console.log("XXXXX session:", session)
    }

    fetchUser()
  }, [supabase])

  return (
    <main className="w-full min-w-full bg-gray-50">
      <p>User: {user?.email}</p>
      <p>JWT: {session?.access_token}</p>
      <button className="z-50 px-4 py-2 text-white bg-red-500 rounded-md" onClick={() => supabase.auth.signOut()}>Sign Out</button>
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