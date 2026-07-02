import { writeFile, mkdir } from 'node:fs/promises'

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

if (!clientId || !clientSecret || !refreshToken) {
  throw new Error('Missing SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, or SPOTIFY_REFRESH_TOKEN')
}

async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(`Failed to refresh access token: ${JSON.stringify(data)}`)
  }
  return data.access_token
}

async function getTop(accessToken, kind) {
  const response = await fetch(`https://api.spotify.com/v1/me/top/${kind}?limit=5&time_range=short_term`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch top ${kind}: ${response.status} ${await response.text()}`)
  }
  return response.json()
}

const accessToken = await getAccessToken()

const [artistsData, tracksData] = await Promise.all([
  getTop(accessToken, 'artists'),
  getTop(accessToken, 'tracks'),
])

const artists = artistsData.items.map((artist) => ({
  id: artist.id,
  name: artist.name,
  image: artist.images[0]?.url,
  genres: artist.genres,
  url: artist.external_urls.spotify,
}))

const tracks = tracksData.items.map((track) => ({
  id: track.id,
  name: track.name,
  artist: track.artists.map((a) => a.name).join(', '),
  album: track.album.name,
  image: track.album.images[0]?.url,
  url: track.external_urls.spotify,
}))

await mkdir('public/data', { recursive: true })
await writeFile('public/data/spotify.json', JSON.stringify({ artists, tracks }, null, 2))

console.log(`Wrote public/data/spotify.json (${artists.length} artists, ${tracks.length} tracks)`)
