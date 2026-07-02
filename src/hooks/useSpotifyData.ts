import { useEffect, useState } from 'react';

interface SpotifyArtist {
  id: string;
  name: string;
  image: string;
  genres: string[];
  url: string;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
}

interface SpotifyData {
  artists: SpotifyArtist[];
  tracks: SpotifyTrack[];
}

export function useSpotifyData() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpotifyData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${import.meta.env.BASE_URL}data/spotify.json`);

        if (!response.ok) {
          throw new Error(`Failed to fetch Spotify data: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        console.error('Error fetching Spotify data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch Spotify data');
      } finally {
        setLoading(false);
      }
    }

    fetchSpotifyData();
  }, []);

  return { data, loading, error };
}
