import { useEffect, useState } from "react";
import MediaPlayer from "./components/app/MediaPlayer";

export default function App() {
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

      <MediaPlayer />

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
