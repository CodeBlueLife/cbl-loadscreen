import { useState } from "react";
import ControlsBar from "./components/app/ControlsBar";
import LoadingProgress from "./components/app/LoadingProgress";
import MediaPlayer from "./components/app/MediaPlayer";
import BackgroundVideo from "../LoadingMovie.mp4";

export default function App() {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black">
      <video
        src={BackgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex min-h-screen">
        <div className="flex-1 relative">
          <div className="absolute bottom-10 w-full flex justify-center">
            <div className="relative w-[80%] max-w-[1000px]">
              <LoadingProgress />
              <ControlsBar
                showPlayer={showPlayer}
                togglePlayer={() => setShowPlayer((p) => !p)}
              />
              <MediaPlayer showPlayer={showPlayer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
