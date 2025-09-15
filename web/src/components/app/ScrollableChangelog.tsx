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
  ]);

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-3 scrollbar-thin scrollbar-track-slate-800/50 scrollbar-thumb-slate-600/80 hover:scrollbar-thumb-slate-500/80">
      <h2 className="text-xl font-semibold text-white mb-6">Recent Updates</h2>

      <style>{`
                          .scrollbar-thin::-webkit-scrollbar {
                            width: 6px;
                          }
                          .scrollbar-track-slate-800\\/50::-webkit-scrollbar-track {
                            background: rgba(30, 41, 59, 0.5);
                            border-radius: 3px;
                          }
                          .scrollbar-thumb-slate-600\\/80::-webkit-scrollbar-thumb {
                            background: rgba(71, 85, 105, 0.8);
                            border-radius: 3px;
                          }
                          .hover\\:scrollbar-thumb-slate-500\\/80::-webkit-scrollbar-thumb:hover {
                            background: rgba(100, 116, 139, 0.8);
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
                className="text-slate-300 text-sm flex items-start"
              >
                <span className="text-blue-400 font-bold w-4 flex-shrink-0">
                  •
                </span>
                <span className="leading-relaxed">{change}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
