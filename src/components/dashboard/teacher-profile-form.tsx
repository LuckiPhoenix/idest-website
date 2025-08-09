"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Button } from "@/shared/ui/button"
// removed Select in favor of checkbox multi-select
import { SheetClose } from "@/shared/ui/sheet"
import { createTeacherProfile, updateUser } from "@/modules/profile/service"
import { Specialization } from "@/shared/types/specialization.enum"
import { toast } from "sonner"
import Cropper from "react-easy-crop"
import { createClient } from "@/modules/supabase/client"
import { uploadImageAndGetPublicUrl } from "@/modules/supabase/storage"
import NextImage from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { Slider } from "@/shared/ui/slider"
import { Role } from "@/shared/types/role.enum"

export function TeacherProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = useMemo(() => createClient(), [])

  // Specialization controlled state (Radix Select doesn't set native form value)
  const [specializations, setSpecializations] = useState<Specialization[]>([])

  // Avatar upload + crop (4:3)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    width: number
    height: number
    x: number
    y: number
  } | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null)
  const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(null)
  const [isCropOpen, setIsCropOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  type Area = { width: number; height: number; x: number; y: number }
  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const resetAvatar = useCallback(() => {
    setAvatarFile(null)
    setCroppedAreaPixels(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedBlob(null)
    if (croppedPreviewUrl) URL.revokeObjectURL(croppedPreviewUrl)
    setCroppedPreviewUrl(null)
  }, [croppedPreviewUrl])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast("Invalid file", { description: "Please select an image file." })
      return
    }
    resetAvatar()
    setAvatarFile(file)
    setIsCropOpen(true)
  }, [resetAvatar])

  async function getCroppedImageBlob(file: File, area: { x: number; y: number; width: number; height: number }) {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })

    const canvas = document.createElement("canvas")
    canvas.width = Math.max(1, Math.round(area.width))
    canvas.height = Math.max(1, Math.round(area.height))
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Canvas not supported")
    ctx.drawImage(
      image,
      area.x,
      area.y,
      area.width,
      area.height,
      0,
      0,
      canvas.width,
      canvas.height
    )

    const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b as Blob), "image/jpeg", 0.9))
    URL.revokeObjectURL(image.src)
    return blob
  }

  const handleConfirmCrop = useCallback(async () => {
    if (!avatarFile || !croppedAreaPixels) return
    try {
      const blob = await getCroppedImageBlob(avatarFile, croppedAreaPixels)
      setCroppedBlob(blob)
      if (croppedPreviewUrl) URL.revokeObjectURL(croppedPreviewUrl)
      setCroppedPreviewUrl(URL.createObjectURL(blob))
      toast("Crop applied", { description: "Avatar has been cropped to 4:3." })
      setIsCropOpen(false)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to crop image."
      toast("Crop failed", { description: message })
    }
  }, [avatarFile, croppedAreaPixels, croppedPreviewUrl])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)

    const form = e.currentTarget
    const fullName = (form.fullName as HTMLInputElement).value.trim()
    const email = (form.email as HTMLInputElement).value.trim()
    const degree = (form.degree as HTMLInputElement).value.trim()
    const specializationValue = specializations
    const bio = (form.bio as HTMLTextAreaElement).value.trim()

    if (!fullName || !email || !degree || specializationValue.length === 0 || !bio) {
      toast("Missing information", { description: "Please fill out all fields." })
      setIsSubmitting(false)
      return
    }

    try {

      const newTeacher = await createTeacherProfile({
        fullName,
        email,
        avatar: '',
        degree,
        specialization: specializationValue,
        bio,
      })
      toast("Teacher created", { description: "The teacher profile has been created." })
      
      // Upload cropped avatar if present
      let avatarUrl: string | null = null
      if (croppedBlob) {
        const createdPayload = newTeacher.data?.data
        const userId = createdPayload?.user_id
        const path = `${userId}/avatar.jpeg`
        avatarUrl = await uploadImageAndGetPublicUrl({
          bucket: "avatars",
          path,
          file: croppedBlob,
          contentType: "image/jpeg",
          upsert: true, // always keep a single avatar per user
          client: supabase,
        })
      }

      await updateUser(newTeacher.data?.data?.user_id, {
        fullName,
        avatar: avatarUrl,
        role: Role.TEACHER,
        isActive: true,
      })

      
      form.reset()
      resetAvatar()
      setSpecializations([])
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Could not create teacher profile."
      toast("Creation failed", { description: message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid overflow-y-auto gap-4 p-4"
    >
      <div className="grid gap-2 justify-center w-full">
        <Label htmlFor="avatar" className="flex justify-center">Avatar (3:4)</Label>
        <input
          ref={fileInputRef}
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isSubmitting}
        />

        {/* Centered and smaller avatar preview */}
        <div className="flex justify-center">
          <div
            className="flex overflow-hidden relative justify-center items-center w-24 h-32 rounded-md border cursor-pointer bg-muted"
            onClick={() => fileInputRef.current?.click()}
            title="Click to select image"
            aria-label="Avatar preview; click to select image"
            role="button"
          >
            {croppedPreviewUrl ? (
              <NextImage
                src={croppedPreviewUrl}
                alt="Avatar preview"
                width={72}
                height={96}
                unoptimized
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-xs text-muted-foreground">3:4 preview</span>
            )}
          </div>
        </div>

        <Dialog open={isCropOpen} onOpenChange={setIsCropOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Crop avatar</DialogTitle>
              <DialogDescription>Adjust the image to a 3:4 portrait.</DialogDescription>
            </DialogHeader>
            <div className="overflow-hidden relative w-full h-96 rounded-md bg-muted">
              {avatarFile ? (
                <Cropper
                  image={URL.createObjectURL(avatarFile)}
                  crop={crop}
                  zoom={zoom}
                  aspect={3 / 4}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  restrictPosition={true}
                  showGrid={false}
                />
              ) : (
                <div className="flex justify-center items-center h-full text-sm text-muted-foreground">No image selected</div>
              )}
            </div>
            <div className="flex gap-3 items-center">
              <Label className="min-w-16">Zoom</Label>
              <Slider
                min={1}
                max={4}
                step={0.1}
                value={[zoom]}
                onValueChange={(vals: number[]) => setZoom(vals[0])}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCropOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleConfirmCrop} disabled={!avatarFile}>
                Save crop
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input id="fullName" name="fullName" type="text" placeholder="Jane Doe" required disabled={isSubmitting} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="jane@example.com" required disabled={isSubmitting} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="degree">Degree</Label>
        <Input id="degree" name="degree" type="text" placeholder="B.A. in English" required disabled={isSubmitting} />
      </div>
      <div className="grid gap-2">
        <Label>Specializations</Label>
        <div className="grid grid-cols-2 gap-2">
          {[Specialization.LISTENING, Specialization.READING, Specialization.WRITING, Specialization.SPEAKING].map((spec) => {
            const checked = specializations.includes(spec)
            return (
              <label key={spec} className="flex gap-2 items-center p-2 rounded-md border cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => {
                    setSpecializations((prev) =>
                      e.target.checked ? [...prev, spec] : prev.filter((s) => s !== spec)
                    )
                  }}
                />
                <span className="text-sm capitalize">{spec.toLowerCase()}</span>
              </label>
            )
          })}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="bio">Bio</Label>
        <textarea
          id="bio"
          name="bio"
          placeholder="Short introduction..."
          required
          disabled={isSubmitting}
          className="border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
        />
      </div>

      <div className="flex gap-2 justify-end pt-2">
        <SheetClose asChild>
          <Button type="button" variant="outline" disabled={isSubmitting}>
            Cancel
          </Button>
        </SheetClose>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create"}</Button>
      </div>
    </form>
  )
}

export default TeacherProfileForm
