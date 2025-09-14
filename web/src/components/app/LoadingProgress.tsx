import { useEffect, useState } from "react";

export default function LoadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : prev));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="mb-2">
        <span className="text-2xl font-semibold text-white tracking-wide">
          LOADING... {progress}%
        </span>
        <span className="text-sm text-slate-400 block mt-1">
          PRESS SPACE TO PAUSE MUSIC
        </span>
      </div>
      
      <div className="h-4 bg-slate-900/80 border border-slate-700/50 rounded-lg overflow-hidden relative">
        <div
          className="h-full rounded-lg transition-all duration-300 bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#60A5FA]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
