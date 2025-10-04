import { useState, useEffect } from 'react'
import { supabase } from '../integrations/supabase/client'

interface CloudinaryImage {
  url: string
  publicId: string
  width: number
  height: number
  thumbnailUrl: string
  fullUrl: string
}

export function useCloudinaryPhotos(location: string | null) {
  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!location) {
      setImages([])
      return
    }

    const fetchPhotos = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data, error } = await supabase.functions.invoke('cloudinary-photos', {
          body: { location }
        })

        if (error) throw error

        setImages(data.images || [])
      } catch (err: any) {
        console.error('Error fetching photos:', err)
        setError(err.message || 'Failed to load photos')
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [location])

  return { images, loading, error }
}
