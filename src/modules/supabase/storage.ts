import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from './client'

export interface UploadImageParams {
  bucket: string
  path: string
  file: Blob | File
  contentType?: string
  upsert?: boolean
  client?: SupabaseClient
}

/**
 * Uploads an image to Supabase Storage and returns its public URL.
 */
export async function uploadImageAndGetPublicUrl(params: UploadImageParams): Promise<string> {
  const { bucket, path, file, contentType = 'image/jpeg', upsert = false, client } = params

  const supabase = client ?? createClient()

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType, upsert })

  if (uploadError) {
    throw new Error(uploadError.message)
  }

  const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(path)

  return publicData.publicUrl
}


