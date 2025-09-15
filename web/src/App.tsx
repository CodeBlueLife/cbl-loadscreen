import { useState } from "react";
import {
  ControlsBar,
  LoadingProgress,
  MediaPlayer,
  ScrollableChangelog,
  SidebarHeader,
} from "./components/app";
import backgroundVideo from "../LoadingMovie.webm";

export default function App() {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black">
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex min-h-screen">
        <div className="w-96 bg-slate-900/80 backdrop-blur-sm border-r border-slate-700/50 flex flex-col h-screen">
          <SidebarHeader />
          <ScrollableChangelog />
        </div>
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
