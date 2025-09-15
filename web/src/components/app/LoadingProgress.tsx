import { useEffect, useState } from "react";
import { isEnvBrowser } from "../../utils/misc";

export function LoadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Temporary: using window message listener for load progress.
    // Will switch to useNuiEvent hook soon.
    if (isEnvBrowser()) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : prev));
      }, 200);
      return () => clearInterval(interval);
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data.eventName === "loadProgress") {
        setProgress(event.data.loadFraction * 100);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="mb-2 opacity-0 animate-fadeIn">
        <span className="text-2xl font-semibold text-white tracking-wide">
          LOADING... {Math.round(progress)}%
        </span>
        <span className="text-xs text-slate-400 block mt-0.5 relative -top-0.5">
          PRESS SPACE TO PAUSE MUSIC
        </span>
      </div>

      <div className="h-4 bg-slate-900/80 border border-slate-700/50 rounded-lg overflow-hidden relative">
        <div
          className="h-full rounded-lg bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#60A5FA] animate-gradient-x transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s forwards;
        }

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
