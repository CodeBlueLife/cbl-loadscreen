import { useEffect, useRef, useState } from "react";
import { playlist, Song } from "../utils/playlist";

declare global {
  interface Window {
    SC: any;
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type SourceType = "youtube" | "soundcloud";

export function useAudioPlayer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const youtubeRef = useRef<any>(null);
  const soundcloudRef = useRef<any>(null);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50); // 0–100, consistent

  const currentSong: Song = playlist[currentSongIndex];
  const currentURL = currentSong?.songURL || "";
  const currentSource: SourceType =
    currentURL.includes("youtube.com") || currentURL.includes("youtu.be")
      ? "youtube"
      : "soundcloud";

  const [ytReady, setYtReady] = useState(false);
  const [scReady, setScReady] = useState(false);

  // Load SDKs
  useEffect(() => {
    if (!window.YT && !document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => setYtReady(true);
    } else if (window.YT) setYtReady(true);

    if (!window.SC && !document.getElementById("soundcloud-widget-api")) {
      const tag = document.createElement("script");
      tag.id = "soundcloud-widget-api";
      tag.src = "https://w.soundcloud.com/player/api.js";
      tag.onload = () => setScReady(true);
      document.body.appendChild(tag);
    } else if (window.SC) setScReady(true);
  }, []);

  // Initialize / switch player
  useEffect(() => {
    if (!containerRef.current || !currentURL) return;
    if (
      (currentSource === "youtube" && !ytReady) ||
      (currentSource === "soundcloud" && !scReady)
    )
      return;

    // --- CLEANUP OLD PLAYERS ---
    if (youtubeRef.current) {
      youtubeRef.current.destroy?.();
      youtubeRef.current = null;
    }
    if (soundcloudRef.current) {
      soundcloudRef.current.pause?.();
      soundcloudRef.current.unbind?.("READY");
      soundcloudRef.current.unbind?.("FINISH");
      soundcloudRef.current = null;
    }
    containerRef.current.innerHTML = "";

    // --- YOUTUBE ---
    if (currentSource === "youtube") {
      const yt = new window.YT.Player(containerRef.current, {
        width: "0",
        height: "0",
        videoId: extractYouTubeID(currentURL),
        events: {
          onReady: (e: any) => {
            youtubeRef.current = e.target;
            e.target.setVolume(volume);
            if (isPlaying) e.target.playVideo();
          },
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.ENDED) next();
          },
        },
      });
      youtubeRef.current = yt;
    }

    // --- SOUNDCLOUD ---
    if (currentSource === "soundcloud") {
      const iframe = document.createElement("iframe");
      iframe.width = "0";
      iframe.height = "0";
      iframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
        currentURL
      )}`;
      iframe.style.display = "none";
      containerRef.current.appendChild(iframe);

      const widget = window.SC.Widget(iframe);
      soundcloudRef.current = widget;

      widget.bind(window.SC.Widget.Events.READY, () => {
        widget.setVolume(volume / 100); // Normalize 0–100 to 0–1
        if (isPlaying) widget.play();
      });

      widget.bind(window.SC.Widget.Events.FINISH, () => next());
    }
  }, [currentURL, ytReady, scReady]);

  // Track progress
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSource === "youtube" && youtubeRef.current?.getCurrentTime) {
        setCurrentTime(youtubeRef.current.getCurrentTime());
        setDuration(youtubeRef.current.getDuration());
      } else if (currentSource === "soundcloud" && soundcloudRef.current) {
        soundcloudRef.current.getPosition((pos: number) =>
          setCurrentTime(pos / 1000)
        );
        soundcloudRef.current.getDuration((dur: number) =>
          setDuration(dur / 1000)
        );
      }
    }, 500);
    return () => clearInterval(interval);
  }, [currentSource]);

  // Controls
  const play = () => {
    setIsPlaying(true);
    if (currentSource === "youtube") youtubeRef.current?.playVideo();
    else soundcloudRef.current?.play();
  };

  const pause = () => {
    setIsPlaying(false);
    if (currentSource === "youtube") youtubeRef.current?.pauseVideo();
    else soundcloudRef.current?.pause();
  };

  const next = () => setCurrentSongIndex((i) => (i + 1) % playlist.length);
  const prev = () =>
    setCurrentSongIndex((i) => (i - 1 + playlist.length) % playlist.length);

  const handleSeek = (time: number) => {
    if (currentSource === "youtube") youtubeRef.current?.seekTo(time, true);
    else soundcloudRef.current?.seekTo(time * 1000);
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    if (currentSource === "youtube") youtubeRef.current?.setVolume(vol);
    else soundcloudRef.current?.setVolume(vol / 100);
  };

  return {
    containerRef,
    play,
    pause,
    next,
    prev,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    handleSeek,
    handleVolumeChange,
  };
}

function extractYouTubeID(url: string): string {
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : "";
}
