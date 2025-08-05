"use client"

import { Navbar } from "@/shared/components/navBar"
import { HeroSection } from "@/components/landing/hero-section"
import { RegistrationSection } from "@/components/landing/registration-section"
import { IELTSOnlineTestSection } from "@/components/landing/ielts-online-test-section"
import { IELTSPracticeSection } from "@/components/landing/ielts-practice-section"
import { Footer } from "@/components/landing/footer"
import { CoursesSection } from "@/components/landing/courses-section"

export default function Home() {
  return (
    <main className="w-full min-w-full">
      <Navbar />
      <div className="bg-gray-50 dark:bg-gray-900">
        <HeroSection />
        <RegistrationSection />
        <CoursesSection />
        <IELTSOnlineTestSection />
        <IELTSPracticeSection />
        <Footer />
      </div>
    </main>
  )
}