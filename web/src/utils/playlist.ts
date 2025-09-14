export interface Song {
  songArtist: string;
  songName: string;
  songURL: string;
}

export let playlist: Song[] = [];

const defaultPlaylist: Song[] = [
  {
    songArtist: "Lady Gaga, Bruno Mars",
    songName: "Die With A Smile",
    songURL: "https://www.youtube.com/watch?v=kPa7bsKwL-c",
  },
];

function isValidSong(item: any): item is Song {
  return (
    typeof item.songArtist === "string" &&
    typeof item.songName === "string" &&
    typeof item.songURL === "string"
  );
}

export async function loadPlaylist(): Promise<Song[]> {
  try {
    // NOTE: The resource name is currently hardcoded here.
    // Ideally, this should be dynamic. Will fix later.
    const response = await fetch(`nui://loadscreen/static/config.json`);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const loadedSongs = Array.isArray(data?.playlist)
      ? data.playlist.filter(isValidSong)
      : [];

    if (loadedSongs.length === 0) {
      console.warn(
        "No valid songs found in config.json, using default playlist"
      );
      playlist = defaultPlaylist;
    } else {
      playlist = loadedSongs;
    }
  } catch (err) {
    console.error(
      "Failed to load playlist:",
      err instanceof Error ? err.message : err
    );
    playlist = defaultPlaylist;
  }

  return playlist;
}
