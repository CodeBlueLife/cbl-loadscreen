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

          {/* Controls */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={prev}
              className="p-1 bg-slate-800/80 border border-slate-600/60 shadow-lg rounded-full"
            >
              <SkipBack size={14} color={ACCENT_COLOR} />
            </button>
            <button
              onClick={togglePlay}
              className="p-1 bg-slate-800/80 border border-slate-600/60 shadow-lg rounded-full"
            >
              {isPlaying ? (
                <Pause size={14} color={ACCENT_COLOR} />
              ) : (
                <Play size={14} color={ACCENT_COLOR} />
              )}
            </button>
            <button
              onClick={next}
              className="p-1 bg-slate-800/80 border border-slate-600/60 shadow-lg rounded-full"
            >
              <SkipForward size={14} color={ACCENT_COLOR} />
            </button>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 mt-3">
          <button>
            {volume === 0 ? (
              <VolumeX size={12} color={ACCENT_COLOR} />
            ) : (
              <Volume2 size={12} color={ACCENT_COLOR} />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${ACCENT_COLOR} 0%, ${ACCENT_COLOR} ${volume}%, #6b7280 ${volume}%, #6b7280 100%)`,
            }}
          />
        </div>

        {/* Container for players */}
        <div ref={containerRef}></div>
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${ACCENT_COLOR};
          box-shadow: 0 0 4px ${ACCENT_COLOR}, 0 0 8px ${ACCENT_COLOR}50;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 8px ${ACCENT_COLOR}, 0 0 12px ${ACCENT_COLOR}80;
        }
        input[type='range']::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${ACCENT_COLOR};
          box-shadow: 0 0 4px ${ACCENT_COLOR}, 0 0 8px ${ACCENT_COLOR}50;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }
        input[type='range']::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 8px ${ACCENT_COLOR}, 0 0 12px ${ACCENT_COLOR}80;
        }
      `}</style>
    </div>
  );
}
