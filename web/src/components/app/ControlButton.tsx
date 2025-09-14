import { ReactNode } from "react";

interface ControlButtonProps {
  onClick?: () => void;
  active?: boolean;
  icon: ReactNode;
  label?: string;
}

export default function ControlButton({
  onClick,
  active,
  icon,
  label,
}: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 p-3 rounded-full
        bg-slate-900/70 backdrop-blur-sm border border-slate-700/50
        shadow-lg transition-colors duration-300 font-medium
        ${
          active
            ? "text-blue-400 border-blue-400"
            : "text-slate-400 hover:text-blue-400 hover:border-blue-400"
        }`}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
}
