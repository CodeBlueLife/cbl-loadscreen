import { useEffect, useState } from "react";
import { useYouTubeAudio } from "./hooks/useYouTubeAudio";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";

export default function App() {
  const {
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
  } = useYouTubeAudio();

  const ACCENT_COLOR = "#60A5FA";
  const [centerProgress, setCenterProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterProgress((prev) => {
        if (prev < 100) return prev + 1;
        return prev;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const togglePlay = () => (isPlaying ? pause() : play());

  return (
    <div className="relative w-full h-screen bg-black">
      {/* Background video */}
      <video
        src="https://s3.venoxity.dev/LoadingMovie.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Player container bottom-left */}
      <div className="absolute bottom-4 left-4 w-64 flex flex-col p-4 bg-slate-900/70 border border-slate-700/40 backdrop-blur-md rounded-2xl text-white">
        {/* Song Info */}
        <div className="flex flex-col gap-0.5">
          <div className="text-sm font-semibold truncate">
            {currentSong?.songName || "No song playing"}
          </div>
          <div className="text-xs text-gray-400 truncate">
            {currentSong?.songArtist || ""}
          </div>
        </div>

        {/* Middle section: Progress + Controls */}
        <div className="flex flex-col flex-1 justify-center mt-3">
          {/* Progress + Timestamps */}
          <div className="flex flex-col">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background:
                  duration > 0
                    ? `linear-gradient(to right, ${ACCENT_COLOR} 0%, ${ACCENT_COLOR} ${
                        (currentTime / duration) * 100
                      }%, #6b7280 ${
                        (currentTime / duration) * 100
                      }%, #6b7280 100%)`
                    : "#6b7280",
              }}
            />
            <div className="flex justify-between text-[9px] text-gray-200 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Playback + Volume */}
          <div className="flex items-center gap-2 mt-3 w-full">
            {/* Playback buttons */}
            <div className="flex items-center gap-1 flex-[0.4] justify-center flex-shrink-0">
              <button
                onClick={prev}
                className="p-1.5 bg-slate-800/80 border border-slate-600/60 shadow-lg rounded-md"
              >
                <SkipBack size={14} color={ACCENT_COLOR} />
              </button>
              <button
                onClick={togglePlay}
                className="p-1.5 bg-slate-800/80 border border-slate-600/60 shadow-lg rounded-md"
              >
                {isPlaying ? (
                  <Pause size={14} color={ACCENT_COLOR} />
                ) : (
                  <Play size={14} color={ACCENT_COLOR} />
                )}
              </button>
              <button
                onClick={next}
                className="p-1.5 bg-slate-800/80 border border-slate-600/60 shadow-lg rounded-md"
              >
                <SkipForward size={14} color={ACCENT_COLOR} />
              </button>
            </div>

            {/* Volume control */}
            <div className="flex items-center gap-2 flex-[0.6] min-w-0">
              <button className="flex-shrink-0 p-1.5 group">
                {volume === 0 ? (
                  <VolumeX
                    size={14}
                    className="text-gray-400 group-hover:text-[#60A5FA] transition-colors duration-200"
                  />
                ) : (
                  <Volume2 size={14} className="text-[#60A5FA]" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer min-w-0"
                style={{
                  background: `linear-gradient(to right, ${ACCENT_COLOR} 0%, ${ACCENT_COLOR} ${volume}%, #6b7280 ${volume}%, #6b7280 100%)`,
                }}
              />
            </div>
          </div>
        </div>

        <div ref={containerRef}></div>
      </div>

      {/* Center-bottom custom progress bar */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-1/3 flex flex-col items-center">
        <div className="flex justify-between w-full text-sm text-gray-200 mb-2 font-semibold">
          <span>The city is now loading...</span>
          <span>{centerProgress}%</span>
        </div>

        <div className="w-full h-4 bg-slate-900/80 border border-slate-700 rounded-full backdrop-blur-md overflow-hidden relative shadow-lg">
          <div
            className="h-full rounded-full transition-all duration-300 shadow-[0_0_12px_#60A5FA,0_0_24px_#60A5FA]"
            style={{
              width: `${centerProgress}%`,
              background: `linear-gradient(90deg, #60A5FA, #3B82F6)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
