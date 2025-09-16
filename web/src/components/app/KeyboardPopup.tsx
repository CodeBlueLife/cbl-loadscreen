import { useEffect, useState } from "react";

export function KeyboardPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const mainRows = [
    [
      "Esc",
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12",
    ],
    [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "Backspace",
    ],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
    ["Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl"],
  ];

  const navCluster = [
    ["PrtSc", "Lock", "Pause"],
    ["Ins", "Home", "PgUp"],
    ["Del", "End", "PgDn"],
  ];

  const arrows = [
    ["", "↑", ""],
    ["←", "↓", "→"],
  ];

  const wideKeys: Record<string, string> = {
    Backspace: "w-14",
    Tab: "w-12",
    Caps: "w-12",
    Enter: "w-12",
    Shift: "w-16",
    Space: "w-28",
  };

  const renderKey = (key: string, i: number) => (
    <div
      key={key + i}
      className={`h-5 m-0.5 flex items-center justify-center rounded-md 
        bg-slate-800/80 border border-slate-600/60 shadow 
        text-white text-[10px] font-medium
        ${wideKeys[key] || "w-6"}
        hover:bg-slate-700/80 active:scale-95 transition-all`}
    >
      {key.trim()}
    </div>
  );

  return (
    <div
      className={`absolute right-0 bottom-full mb-2 transition-all duration-500 ease-out transform
        ${
          visible
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-10 opacity-0 scale-95"
        }`}
    >
      <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 shadow-lg w-[600px] overflow-visible">
        <div className="flex justify-center gap-3">
          {/* Main keyboard */}
          <div className="flex flex-col gap-0.5 items-center">
            {mainRows.map((row, i) => (
              <div key={i} className="flex gap-0.5 justify-center">
                {row.map((key, j) => renderKey(key, j))}
              </div>
            ))}
          </div>

          {/* Navigation cluster + arrows */}
          <div className="flex flex-col gap-0.5 items-center">
            {navCluster.map((row, i) => (
              <div key={i} className="flex gap-0.5 justify-center">
                {row.map((key, j) => renderKey(key, j))}
              </div>
            ))}
            {arrows.map((row, i) => (
              <div key={i} className="flex justify-center gap-0.5">
                {row.map((key, j) => renderKey(key, j))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
