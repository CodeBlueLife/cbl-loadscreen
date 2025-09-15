import config from "../../config.json";

export interface Song {
  songArtist: string;
  songName: string;
  songURL: string;
}

export let playlist: Song[] = [];

function isValidSong(item: any): item is Song {
  return (
    typeof item.songArtist === "string" &&
    typeof item.songName === "string" &&
    typeof item.songURL === "string"
  );
}

export function loadPlaylist(): Song[] {
  try {
    const data = config;
    playlist = Array.isArray(data?.playlist)
      ? data.playlist.filter(isValidSong)
      : [];
  } catch (err) {
    console.error(
      "Failed to load playlist:",
      err instanceof Error ? err.message : err
    );
    playlist = [];
  }

  return playlist;
}
