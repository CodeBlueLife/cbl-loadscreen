import { Eye, Keyboard, Music } from "lucide-react";
import ControlButton from "./ControlButton";

export type ActivePanel = "music" | "keyboard" | "hidden" | null;

interface ControlsBarProps {
  activePanel: ActivePanel;
  setActivePanel: (panel: ActivePanel) => void;
}

export function ControlsBar({ activePanel, setActivePanel }: ControlsBarProps) {
  const handleClick = (panel: ActivePanel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div className="absolute right-0 top-1/2 transform -translate-y-2/3 flex gap-2 z-20">
      <ControlButton
        onClick={() => handleClick("music")}
        active={activePanel === "music"}
        icon={<Music size={20} />}
        tooltip="Toggle Music Player"
      />
      <ControlButton
        onClick={() => handleClick("keyboard")}
        active={activePanel === "keyboard"}
        icon={<Keyboard size={20} />}
        label="Keybinds"
        tooltip="View Keybinds"
      />
      <ControlButton
        onClick={() => handleClick("hidden")}
        active={activePanel === "hidden"}
        icon={<Eye size={20} />}
        label="Hide All"
        tooltip="Hide All UI"
      />
    </div>
  );
}
