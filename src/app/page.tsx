"use client"

import { Navbar } from "@/components/navBar"
import { HeroSection } from "@/components/hero-section"
import { RegistrationSection } from "@/components/registration-section"
import { IELTSOnlineTestSection } from "@/components/ielts-online-test-section"
import { IELTSPracticeSection } from "@/components/ielts-practice-section"
import { Footer } from "@/components/footer"
import { CoursesSection } from "@/components/courses-section"

export default function Home() {
  return (
    <main className="w-full min-w-full bg-gray-50">
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
