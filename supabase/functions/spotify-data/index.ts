import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function getAccessToken() {
  const clientId = Deno.env.get('SPOTIFY_CLIENT_ID');
  const clientSecret = Deno.env.get('SPOTIFY_CLIENT_SECRET');
  const refreshToken = Deno.env.get('SPOTIFY_REFRESH_TOKEN');
  
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify credentials');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Token refresh error:', data);
    throw new Error('Failed to refresh access token');
  }
  
  return data.access_token;
}

async function getTopArtists(accessToken: string) {
  const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5&time_range=short_term', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch top artists');
  }
  
  return await response.json();
}

async function getTopTracks(accessToken: string) {
  const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch top tracks');
  }
  
  return await response.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching Spotify data...');
    
    // Get fresh access token
    const accessToken = await getAccessToken();
    console.log('Access token obtained');
    
    // Fetch top artists and tracks
    const [artistsData, tracksData] = await Promise.all([
      getTopArtists(accessToken),
      getTopTracks(accessToken)
    ]);
    
    console.log('Data fetched successfully');

    const artists = artistsData.items.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      image: artist.images[0]?.url,
      genres: artist.genres,
      url: artist.external_urls.spotify
    }));

    const tracks = tracksData.items.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      album: track.album.name,
      image: track.album.images[0]?.url,
      url: track.external_urls.spotify
    }));

    return new Response(
      JSON.stringify({ artists, tracks }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in spotify-data:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
