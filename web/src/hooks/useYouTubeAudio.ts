import { useEffect, useRef, useCallback, useState } from "react";
import { playlist as importedPlaylist, Song } from "../utils/playlist";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
  }
}

type PlayerState =
  | "unstarted"
  | "ended"
  | "playing"
  | "paused"
  | "buffering"
  | "cued";

export function useYouTubeAudio(
  playlist: Song[] = importedPlaylist,
  initialVolume = 20
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(initialVolume);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const currentSong = playlist[currentIndex];

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([\w-]+)/);
    return match ? match[1] : "";
  };

  const mapState = (ytState: YT.PlayerState): PlayerState => {
    switch (ytState) {
      case YT.PlayerState.UNSTARTED:
        return "unstarted";
      case YT.PlayerState.ENDED:
        return "ended";
      case YT.PlayerState.PLAYING:
        return "playing";
      case YT.PlayerState.PAUSED:
        return "paused";
      case YT.PlayerState.BUFFERING:
        return "buffering";
      case YT.PlayerState.CUED:
        return "cued";
      default:
        return "unstarted";
    }
  };

  const loadVideo = useCallback(
    (index: number) => {
      if (!playerRef.current) return;
      const videoId = getVideoId(playlist[index].songURL);
      playerRef.current.loadVideoById(videoId);
      playerRef.current.setVolume(volume);
      setCurrentIndex(index);
    },
    [playlist, volume]
  );

  const play = useCallback(() => playerRef.current?.playVideo(), []);
  const pause = useCallback(() => playerRef.current?.pauseVideo(), []);
  const stop = useCallback(() => playerRef.current?.stopVideo(), []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % playlist.length;
      loadVideo(nextIndex);
      play();
      return nextIndex;
    });
  }, [loadVideo, play, playlist.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => {
      const prevIndex = prev === 0 ? playlist.length - 1 : prev - 1;
      loadVideo(prevIndex);
      play();
      return prevIndex;
    });
  }, [loadVideo, play, playlist.length]);

  const handleStateChange = useCallback(
    (ytState: YT.PlayerState) => {
      const state = mapState(ytState);
      setIsPlaying(state === "playing");
      if (state === "ended") next();
    },
    [next]
  );

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    playerRef.current?.setVolume(newVolume);
  }, []);

  const handleSeek = useCallback((newTime: number) => {
    playerRef.current?.seekTo(newTime, true);
    setCurrentTime(newTime);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
        setDuration(playerRef.current.getDuration());
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const createPlayer = () => {
      if (playerRef.current) return playerRef.current;

      const player = new YT.Player(containerRef.current!, {
        height: "1",
        width: "1",
        videoId: getVideoId(currentSong.songURL),
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(volume);
            play();
          },
          onStateChange: (event) => handleStateChange(event.data),
          onError: () => next(),
        },
      });

      playerRef.current = player;
      return player;
    };

    if (!window.YT && !document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else if (window.YT) {
      createPlayer();
    }
  }, [currentSong.songURL, next, play, volume, handleStateChange]);

  return {
    containerRef,
    play,
    pause,
    stop,
    next,
    prev,
    currentSong,
    currentIndex,
    player: playerRef.current,
    isPlaying,
    currentTime,
    duration,
    volume,
    handleVolumeChange,
    handleSeek,
  };
}
