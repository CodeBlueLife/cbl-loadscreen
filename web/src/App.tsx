import { useYouTubePlayer } from "./hooks/useYoutubePlayer";

export default function App() {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    playNext,
    playPrev,
    volume,
    setAudioVolume,
  } = useYouTubePlayer();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black text-white">
      <video
        src="https://s3.venoxity.dev/LoadingMovie.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <div id="yt-player"></div> 
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 p-2 rounded flex flex-col gap-2 text-white text-sm">
        <div className="flex flex-col">
          <span className="font-semibold truncate w-36">
            {currentSong.songName}
          </span>
          <span className="text-gray-300 truncate w-36">
            {currentSong.songArtist}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
            className="w-20 h-1 accent-gray-400"
          />
          <button
            onClick={playPrev}
            className="px-2 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600"
          >
            ⏮
          </button>
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="px-2 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600"
          >
            {isPlaying ? "⏸" : "▶️"}
          </button>
          <button
            onClick={playNext}
            className="px-2 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600"
          >
            ⏭
          </button>
        </div>
      </div>
    </div>
  );
}
