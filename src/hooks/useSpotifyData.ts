import { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';

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

        const { data: responseData, error: functionError } = await supabase.functions.invoke('spotify-data');

        if (functionError) {
          throw functionError;
        }

        if (responseData.error) {
          throw new Error(responseData.error);
        }

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
