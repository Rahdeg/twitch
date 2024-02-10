import { Maximize, Minimize } from "lucide-react";
import Hint from "../hint";

interface FullscreenControlProps {
    isFullscreen: boolean;
    onToggle: () => void;
}

const FullscreenControl = ({ isFullscreen, onToggle }: FullscreenControlProps) => {

    const Icon = isFullscreen ? Minimize : Maximize;
    const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";

    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <button className=" text-white p-1.5 hover:bg-white/10 rounded-lg" onClick={onToggle}>
                    <Icon className="h-5 w-5" />
                </button>

            </Hint>
        </div>
    )
}

export default FullscreenControl