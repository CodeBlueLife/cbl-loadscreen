import { useYouTubeAudio } from "../../hooks/useYouTubeAudio";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface MediaPlayerProps {
  hidden?: boolean;
}

export function MediaPlayer({ hidden }: MediaPlayerProps) {
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
  const toggleMute = () => handleVolumeChange(volume > 0 ? 0 : 50);

  return (
    <div
      className={`absolute right-0 bottom-full mb-2 transition-all duration-300 ease-out transform
        ${
          hidden
            ? "opacity-0 pointer-events-none -translate-y-4 scale-95"
            : "opacity-100 translate-y-0 scale-100"
        }`}
    >
      <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-lg w-[calc(3*88px+2*8px)]">
        <div className="flex items-center p-2 bg-slate-900/80 border border-slate-700/50 backdrop-blur-md rounded-xl text-white w-full gap-2">
          {/* Song Info + Controls */}
          <div className="flex flex-col flex-1 justify-between gap-1">
            {/* Song Title & Artist */}
            <div className="flex flex-col gap-0.5">
              <div
                className="text-sm font-medium truncate leading-tight"
                title={currentSong?.songName || ""}
              >
                {currentSong?.songName || "No song playing"}
              </div>
              <div
                className="text-[10px] text-gray-400 truncate leading-snug"
                title={currentSong?.songArtist || ""}
              >
                {currentSong?.songArtist || ""}
              </div>
            </div>

            {/* Play / Skip / Volume */}
            <div className="flex items-center justify-start mt-1 mb-1 gap-2">
              <div className="flex items-center gap-1">
                <button
                  className="p-1.5 bg-slate-800/80 border border-slate-600/60 shadow rounded-md hover:bg-slate-700/80 active:scale-95 transition-all"
                  onClick={prev}
                >
                  <SkipBack size={14} color={ACCENT_COLOR} />
                </button>
                <button
                  className="p-1.5 bg-slate-800/80 border border-slate-600/60 shadow rounded-md hover:bg-slate-700/80 active:scale-95 transition-all"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause size={14} color={ACCENT_COLOR} />
                  ) : (
                    <Play size={14} color={ACCENT_COLOR} />
                  )}
                </button>
                <button
                  className="p-1.5 bg-slate-800/80 border border-slate-600/60 shadow rounded-md hover:bg-slate-700/80 active:scale-95 transition-all"
                  onClick={next}
                >
                  <SkipForward size={14} color={ACCENT_COLOR} />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-1 w-32 ml-0.5">
                <button
                  className="flex-shrink-0 p-1 group hover:bg-slate-700/50 rounded-md transition-colors"
                  onClick={toggleMute}
                  title={volume === 0 ? "Unmute" : "Mute"}
                >
                  {volume === 0 ? (
                    <VolumeX
                      size={14}
                      className="text-gray-400 group-hover:text-[#60A5FA] transition-colors duration-200"
                    />
                  ) : (
                    <Volume2 size={14} className="text-[#60A5FA]" />
                  )}
                </button>
                <Slider
                  className="h-2 hover:bg-[#3B82F6]/30"
                  value={[volume]}
                  max={100}
                  onValueChange={(value) =>
                    handleVolumeChange(Number(value[0]))
                  }
                />
              </div>
            </div>

            {/* Time Slider */}
            <div className="flex flex-col mt-auto">
              <div className="flex justify-between text-[10px] text-gray-300 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <Slider
                className="h-2 hover:bg-[#3B82F6]/30"
                value={[currentTime]}
                max={duration || 0}
                onValueChange={(value) => handleSeek(Number(value[0]))}
              />
            </div>
          </div>

          <div ref={containerRef}></div>
        </div>
      </div>
    </div>
  );
}
