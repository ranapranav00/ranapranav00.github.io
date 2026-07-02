import { writeFile, mkdir } from 'node:fs/promises'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error('Missing CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET')
}

const authHeader = 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

async function cloudinaryGet(path) {
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}${path}`, {
    headers: { Authorization: authHeader },
  })
  if (!response.ok) {
    throw new Error(`Cloudinary API error on ${path}: ${response.status} ${await response.text()}`)
  }
  return response.json()
}

async function listTravelFolders() {
  const data = await cloudinaryGet('/folders/travel')
  return (data.folders ?? []).map((folder) => folder.name)
}

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-')
}

async function listPhotos(folderName) {
  const data = await cloudinaryGet(`/resources/by_asset_folder?asset_folder=travel/${folderName}&max_results=100`)
  return (data.resources ?? []).map((resource) => ({
    url: resource.secure_url,
    publicId: resource.public_id,
    width: resource.width,
    height: resource.height,
    thumbnailUrl: resource.secure_url.replace('/upload/', '/upload/w_400,h_400,c_fill,q_auto,f_auto/'),
    fullUrl: resource.secure_url.replace('/upload/', '/upload/w_1200,q_auto,f_auto/'),
  }))
}

const folders = await listTravelFolders()

const manifest = {}
for (const folder of folders) {
  manifest[slugify(folder)] = await listPhotos(folder)
}

await mkdir('public/data', { recursive: true })
await writeFile('public/data/travel-photos.json', JSON.stringify(manifest, null, 2))

console.log(`Wrote public/data/travel-photos.json (${folders.length} locations: ${folders.join(', ')})`)
