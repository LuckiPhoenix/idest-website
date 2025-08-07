'use client'

import React from 'react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { ArrowLeft } from 'lucide-react'
import { createStudentProfile } from '@/modules/profile/service'
import { useRouter } from 'next/navigation'

export default function CreateStudentProfilePage() {
  const router = useRouter()
  const [targetScore, setTargetScore] = React.useState<string>('')
  const [currentLevel, setCurrentLevel] = React.useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createStudentProfile({ target_score: Number(targetScore), current_level: currentLevel })
    router.push('/')
  }

  return (
    <div className="flex justify-center items-center p-4 min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-6">  
          <Button variant="ghost" className="mb-4" asChild>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="flex gap-2 items-center">
              <ArrowLeft className="w-4 h-4" />
              <p>Back to Home</p>
            </a>  
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Create Student Profile</CardTitle>
            <p className="text-sm text-center text-gray-600">
              Complete your profile to access personalized learning features
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetScore">Target IELTS Score</Label>
                <Input
                  id="targetScore"
                  type="number"
                  min="1"
                  max="9"
                  step="0.5"
                  placeholder="e.g., 7.0"
                  value={targetScore}
                  onChange={(e) => setTargetScore(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentLevel">Current English Level</Label>
                <Select value={currentLevel} onValueChange={setCurrentLevel} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your current level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (A1-A2)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (B1-B2)</SelectItem>
                    <SelectItem value="advanced">Advanced (C1-C2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full">
                Create Student Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}