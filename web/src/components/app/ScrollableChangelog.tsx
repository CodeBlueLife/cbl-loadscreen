import { useState } from "react";

export function ScrollableChangelog() {
  const [changelog] = useState([
    {
      version: "vX.X.X",
      date: "YYYY-MM-DD",
      changes: [
        "Change description...",
        "Another change...",
        "More changes...",
      ],
    },
    {
      version: "vX.X.X",
      date: "YYYY-MM-DD",
      changes: [
        "Change description...",
        "Another change...",
        "More changes...",
      ],
    },
    {
      version: "vX.X.X",
      date: "YYYY-MM-DD",
      changes: [
        "Change description...",
        "Another change...",
        "More changes...",
      ],
    },
    {
      version: "vX.X.X",
      date: "YYYY-MM-DD",
      changes: [
        "Change description...",
        "Another change...",
        "More changes...",
      ],
    },
  ]);

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-3 scrollbar-custom">
      <style>{`
    /* Chrome, Edge, Safari */
    .scrollbar-custom::-webkit-scrollbar {
      width: 10px; /* Thicker scrollbar */
    }
    .scrollbar-custom::-webkit-scrollbar-button {
      display: none; /* Remove arrows */
    }
    .scrollbar-custom::-webkit-scrollbar-track {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 5px;
    }
    .scrollbar-custom::-webkit-scrollbar-thumb {
      background: rgba(71, 85, 105, 0.8);
      border-radius: 5px;
    }
    .scrollbar-custom::-webkit-scrollbar-thumb:hover {
      background: rgba(96, 165, 250, 0.8);
    }

    /* Firefox */
    .scrollbar-custom {
      scrollbar-width: thin; /* Firefox only supports 'auto', 'thin', or 'none' */
      scrollbar-color: rgba(71,85,105,0.8) rgba(30,41,59,0.5);
    }
  `}</style>

      {changelog.map((update, index) => (
        <div
          key={index}
          className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30 backdrop-blur-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-blue-400 font-bold text-sm bg-blue-400/10 px-2 py-1 rounded-lg">
              {update.version}
            </span>
            <span className="text-slate-400 text-xs font-medium">
              {update.date}
            </span>
          </div>
          <ul className="space-y-2">
            {update.changes.map((change, changeIndex) => (
              <li
                key={changeIndex}
                className="text-slate-300 text-sm flex items-start gap-3"
              >
                <span className="text-blue-400 mt-1 font-bold">•</span>
                <span className="leading-relaxed">{change}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
