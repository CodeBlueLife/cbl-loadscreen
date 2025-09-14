import { ReactNode } from "react";

interface ControlButtonProps {
  onClick?: () => void;
  active?: boolean;
  icon: ReactNode;
  label?: string;
  tooltip?: string;
}

export default function ControlButton({
  onClick,
  active,
  icon,
  label,
  tooltip,
}: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={`flex items-center gap-2 p-3 rounded-full
        bg-slate-900/70 backdrop-blur-sm border border-slate-700/50
        shadow-lg transition-all duration-300 font-medium
        hover:scale-105 active:scale-95
        ${active
          ? "text-blue-400 border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]"
          : "text-slate-400 hover:text-blue-400 hover:border-blue-400"}
      `}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
}
