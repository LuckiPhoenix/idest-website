"use client"

import { Navbar } from "@/shared/components/navBar"
import { HeroSection } from "@/components/landing/hero-section"
import { RegistrationSection } from "@/components/landing/registration-section"
import { IELTSOnlineTestSection } from "@/components/landing/ielts-online-test-section"
import { IELTSPracticeSection } from "@/components/landing/ielts-practice-section"
import { Footer } from "@/components/landing/footer"
import { CoursesSection } from "@/components/landing/courses-section"
import { useProfile } from "@/shared/hooks/useProfile"
import { createClient } from "@/modules/supabase/client"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Home() {
  const { user, isLoading, error, isAuthenticated, hasStudentProfile } = useProfile()
  const supabase = createClient()
  const [showDebug, setShowDebug] = useState(true)
  const [jwt, setJwt] = useState<string | null>(null)
  
  useEffect(() => {
    const getJwt = async () => {
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token || null
      setJwt(token)
      console.log("jwt", token)
    }
    
    getJwt()
  }, [supabase])
  console.log("user", user)
  return (
    <main className="w-full min-w-full">
      {isLoading || !showDebug ?  (
        <p>Loading user...</p>
      ) : user ? (
        <>
          <p>User: {user.full_name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Is Active: {user.is_active ? "Yes" : "No"}</p>
          <p>Created At: {user.created_at}</p>
          <p>Updated At: {user.updated_at}</p>
          <p>have student or teacher: {hasStudentProfile ? "STUDENT" : user.TeacherProfile ? "TEACHER" : "None"}</p>
          <p className="overflow-hidden max-w-full break-all">JWT: {jwt || "No JWT"}</p>
          <p>Is Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
          <p>Error: {error ? error : "No error"}</p>
          <Link className="text-lg font-bold text-blue-500" href="/admin/dashboard">Go to dashboard</Link>
        </>
      ) : (
        <p>Could not load user info.</p>
      )}

      <Navbar />
      <div className="bg-gray-50 dark:bg-gray-900">
        {user ? (
          <div onClick={() => setShowDebug(!showDebug)} className="cursor-pointer">
            <h1 className="px-32 text-2xl font-bold">Welcome {user.full_name}</h1>
          </div>
        ) : (
          <>
            <HeroSection />
            <RegistrationSection />
          </>
        )}
        <CoursesSection />
        <IELTSOnlineTestSection />
        <IELTSPracticeSection />
        <Footer />
      </div>
    </main>
  )
}