"use client"

import { useChatSidebar } from "@/store/use-chat-sidebar"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import Hint from "../hint";
import { Button } from "../ui/button";

const ChatToggle = () => {
    const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state);
    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
    const label = collapsed ? "Expand" : "Collapse";

    const onToggle = () => {
        if (collapsed) {
            onExpand();
        } else {
            onCollapse();
        }
    }

    return (
        <Hint asChild label={label} side="left">
            <Button onClick={onToggle} variant="ghost" className=" h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent">
                <Icon className=" w-4 h-4" />
            </Button>
        </Hint>
    )
}

export default ChatToggle