"use client"
import { ConnectionState } from "livekit-client"
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react'
import { useMediaQuery } from 'usehooks-ts'
import { useEffect, useMemo, useState } from "react"
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header"
import ChatForm, { ChatFormSkeleton } from "./chat-form"
import Chatlist, { ChatListSkeleton } from "./chat-list"
import ChatCommunity from "./chat-community"

interface ChatProps {
    viewerName: string
    hostName: string
    hostIdentity: string
    isFollowing: boolean
    isChatEnabled: boolean
    isChatDelayed: boolean
    isChatFollowersOnly: boolean
}

const Chat = ({ viewerName, hostIdentity, hostName, isChatDelayed, isChatEnabled, isChatFollowersOnly, isFollowing }: ChatProps) => {
    const matches = useMediaQuery('(max-width: 1024px)');
    const { variant, onExpand } = useChatSidebar((state) => state);
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline = participant && connectionState === ConnectionState.Connected;
    const isHidden = !isChatEnabled || !isOnline;

    const [value, setValue] = useState("");
    const { chatMessages: messages, send } = useChat();

    useEffect(() => {
        if (matches) {
            onExpand()
        }

    }, [matches, onExpand])

    const reversedMessages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp);
    }, [messages])

    const onSubmit = () => {
        if (!send) return;
        send(value);
        setValue("");
    }

    const onChange = (value: string) => {
        setValue(value);
    }


    return (
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader />
            {
                variant === ChatVariant.CHAT && (
                    <>
                        <Chatlist isHidden={isHidden} messages={reversedMessages} />
                        <ChatForm isDelayed={isChatDelayed} isFollowersOnly={isChatFollowersOnly} isFollowing={isFollowing} onSubmit={onSubmit} value={value} isHidden={isHidden} onChange={onChange} />

                    </>
                )
            }

            {
                variant === ChatVariant.COMMUNITY && (
                    <ChatCommunity hostName={hostName} viewerName={viewerName} isHidden={isHidden} />
                )
            }
        </div>
    )
}

export default Chat

export const ChatSkeleton = () => {
    return (
        <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    );
};
