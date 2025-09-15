import { isEnvBrowser } from "./misc";

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

export async function loadPlaylist(): Promise<Song[]> {
  try {
    // NOTE: The resource name is currently hardcoded here.
    // Ideally, this should be dynamic. Will fix later.
    const url = isEnvBrowser()
      ? "/config.json"
      : "nui://loadscreen/dist/web/config.json";

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch config.json");

    const data = await res.json();
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
