import { useState, useEffect } from 'react'

interface CloudinaryImage {
  url: string
  publicId: string
  width: number
  height: number
  thumbnailUrl: string
  fullUrl: string
}

type TravelPhotosManifest = Record<string, CloudinaryImage[]>

let manifestPromise: Promise<TravelPhotosManifest> | null = null

function getManifest(): Promise<TravelPhotosManifest> {
  if (!manifestPromise) {
    manifestPromise = fetch(`${import.meta.env.BASE_URL}data/travel-photos.json`).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch travel photos: ${response.status}`)
      }
      return response.json()
    })
  }
  return manifestPromise
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
        const manifest = await getManifest()
        setImages(manifest[location] || [])
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
