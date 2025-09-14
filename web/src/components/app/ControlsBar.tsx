import { Eye, Keyboard, Music } from "lucide-react";
import ControlButton from "./ControlButton";

interface ControlsBarProps {
  showPlayer: boolean;
  togglePlayer: () => void;
}

export default function ControlsBar({
  showPlayer,
  togglePlayer,
}: ControlsBarProps) {
  return (
    <div className="absolute right-0 top-1/2 transform -translate-y-2/3 flex gap-2 z-20">
      <ControlButton
        onClick={togglePlayer}
        active={showPlayer}
        icon={<Music size={20} />}
      />
      <ControlButton icon={<Keyboard size={20} />} label="Keybinds" />
      <ControlButton icon={<Eye size={20} />} label="Hide All" />
    </div>
  );
}
