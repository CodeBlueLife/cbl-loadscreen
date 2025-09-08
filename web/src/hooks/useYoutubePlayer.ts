import { useEffect, useRef, useState } from "react";
import { playlist } from "./playlist";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function useYouTubePlayer() {
  const [currentIndex, setCurrentIndex] = useState<number>(
    Math.floor(Math.random() * playlist.length)
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playedIndexes, setPlayedIndexes] = useState<number[]>([]);
  const [volume, setVolume] = useState<number>(0.5);

  const playerRef = useRef<any>(null);
  const currentSong = playlist[currentIndex];

  const getVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : url;
  };

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => loadVideo();
  }, []);

  useEffect(() => {
    if (playerRef.current && window.YT) loadVideo();
  }, [currentIndex]);

  useEffect(() => {
    if (playerRef.current) {
      isPlaying
        ? playerRef.current.playVideo()
        : playerRef.current.pauseVideo();
      playerRef.current.setVolume(volume * 100);
    }
  }, [isPlaying, volume]);

  const loadVideo = () => {
    const videoId = getVideoId(currentSong.songURL);
    if (!playerRef.current) {
      playerRef.current = new window.YT.Player("yt-player", {
        height: "0",
        width: "0",
        videoId,
        playerVars: { autoplay: 1, controls: 0, loop: 1, playlist: videoId },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(volume * 100);
            if (isPlaying) event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT?.PlayerState.ENDED) playNext();
          },
        },
      });
    } else {
      playerRef.current.loadVideoById(videoId);
    }
  };

  const playNext = () => {
    const remaining = playlist
      .map((_, i) => i)
      .filter((i) => i !== currentIndex && !playedIndexes.includes(i));

    const nextIndex =
      remaining.length === 0
        ? Math.floor(Math.random() * playlist.length)
        : remaining[Math.floor(Math.random() * remaining.length)];

    setPlayedIndexes((prev) => [...prev, currentIndex]);
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (playedIndexes.length === 0) return;
    const lastIndex = playedIndexes[playedIndexes.length - 1];
    setPlayedIndexes((prev) => prev.slice(0, prev.length - 1));
    setCurrentIndex(lastIndex);
    setIsPlaying(true);
  };

  const setAudioVolume = (v: number) => {
    setVolume(v);
    if (playerRef.current) playerRef.current.setVolume(v * 100);
  };

  return {
    currentSong,
    isPlaying,
    setIsPlaying,
    playNext,
    playPrev,
    volume,
    setAudioVolume,
  };
}
