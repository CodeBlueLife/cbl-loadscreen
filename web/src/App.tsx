import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { Volume2, Play, Pause, SkipBack, SkipForward } from "lucide-react";

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
  } = useAudioPlayer();

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
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden">
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Music controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1 w-56 text-xs z-50">
        <div className="p-2 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col gap-1">
          {/* Song info */}
          <div className="px-2 py-1 bg-gray-800/30 rounded shadow-md overflow-hidden">
            <div className="text-sm font-semibold text-white drop-shadow-md truncate">
              {currentSong?.songName || "No song playing"}
            </div>
            <div className="text-xs text-gray-300 truncate">
              {currentSong?.songArtist || ""}
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative flex items-center mt-1">
            <span className="absolute left-0 text-[9px] text-gray-200">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 mx-6">
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${ACCENT_COLOR} 0%, ${ACCENT_COLOR} ${
                    (currentTime / (duration || 1)) * 100
                  }%, #94a3b8 ${
                    (currentTime / (duration || 1)) * 100
                  }%, #94a3b8 100%)`,
                }}
              />
            </div>
            <span className="absolute right-0 text-[9px] text-gray-200">
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 mt-1 justify-center">
            {/* Volume */}
            <div className="flex items-center gap-1 flex-1">
              <Volume2 size={12} color={ACCENT_COLOR} />
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${ACCENT_COLOR} 0%, ${ACCENT_COLOR} ${volume}%, #94a3b8 ${volume}%, #94a3b8 100%)`,
                }}
              />
            </div>

            {/* Previous */}
            <button
              onClick={prev}
              className="flex items-center justify-center w-5 h-5 bg-gray-800/40 hover:bg-gray-800/30 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.5)] backdrop-blur-md"
            >
              <SkipBack size={12} color={ACCENT_COLOR} />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-5 h-5 bg-gray-800/40 hover:bg-gray-800/30 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.5)] backdrop-blur-md"
            >
              {isPlaying ? (
                <Pause size={12} color={ACCENT_COLOR} />
              ) : (
                <Play size={12} color={ACCENT_COLOR} />
              )}
            </button>

            {/* Next */}
            <button
              onClick={next}
              className="flex items-center justify-center w-5 h-5 bg-gray-800/40 hover:bg-gray-800/30 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.5)] backdrop-blur-md"
            >
              <SkipForward size={12} color={ACCENT_COLOR} />
            </button>
          </div>
        </div>

        {/* Container for players */}
        <div ref={containerRef}></div>
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
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
