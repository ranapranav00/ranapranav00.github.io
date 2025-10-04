import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { location } = await req.json()
    
    if (!location) {
      throw new Error('Location is required')
    }

    const cloudName = Deno.env.get('CLOUDINARY_CLOUD_NAME')
    const apiKey = Deno.env.get('CLOUDINARY_API_KEY')
    const apiSecret = Deno.env.get('CLOUDINARY_API_SECRET')

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Cloudinary credentials not configured')
    }

    // Format location name for folder path (lowercase, replace spaces with hyphens)
    const folderPath = `travel/${location}`;

    // Cloudinary Admin API to list resources in a folder
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/by_asset_folder?asset_folder=${folderPath}&max_results=100`;
    
    const auth = btoa(`${apiKey}:${apiSecret}`)
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Cloudinary API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Return optimized image URLs
    const images = data.resources.map((resource: any) => ({
      url: resource.secure_url,
      publicId: resource.public_id,
      width: resource.width,
      height: resource.height,
      thumbnailUrl: resource.secure_url.replace('/upload/', '/upload/w_400,h_400,c_fill,q_auto,f_auto/'),
      fullUrl: resource.secure_url.replace('/upload/', '/upload/w_1200,q_auto,f_auto/'),
    }))

    return new Response(
      JSON.stringify({ images, count: images.length }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error fetching Cloudinary photos:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
