import axios from 'axios';

interface ParsedLastFmTrack {
  artist: string;
  album: string;
  name: string;
  url: string;
  nowPlaying?: boolean;
  date?: {
    uts: string;
    formatted: string;
  };
  image?: string;
}

function parseLastFmResponse(response: any): ParsedLastFmTrack[] {
  const tracks: ParsedLastFmTrack[] = [];

  if (response?.recenttracks?.track) {
    const rawTracks = Array.isArray(response.recenttracks.track)
      ? response.recenttracks.track
      : [response.recenttracks.track];

    for (const rawTrack of rawTracks) {
      const track: ParsedLastFmTrack = {
        artist: rawTrack.artist['#text'],
        album: rawTrack.album['#text'],
        name: rawTrack.name,
        url: rawTrack.url,
      };

      if (rawTrack['@attr']?.nowplaying) {
        track.nowPlaying = true;
      }

      if (rawTrack.date) {
        track.date = {
          uts: rawTrack.date.uts,
          formatted: rawTrack.date['#text'],
        };
      }

      if (rawTrack.image) {
        for (const image of rawTrack.image) {
          if (image.size === 'extralarge') {
            track.image = image['#text'];
            break;
          }
        }
      }

      tracks.push(track);
    }
  }

  return tracks;
}

async function getRecentTracks() {
  const resp = await axios.get(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=tmidlol&api_key=${
      import.meta.env.API_KEY
    }&format=json`
  );

  return parseLastFmResponse(resp.data);
}

export { getRecentTracks };
