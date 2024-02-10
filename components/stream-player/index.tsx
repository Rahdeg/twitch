"use client"
import { useViewerToken } from '@/hooks/use-viewer-token'
import { LiveKitRoom } from "@livekit/components-react"
import { Stream, User } from '@prisma/client'
import React from 'react'
import Video from './video'


interface StreamPlayerProps {
    user: User & { stream: Stream | null }
    stream: Stream
    isFollowing: boolean
}

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {

    const { identity, token, name } = useViewerToken(user.id)

    if (!identity || !token || !name) {
        return (
            <div>
                Cannot Watch this stream!
            </div>
        )
    }

    return (
        <>
            <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className='grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full'
            >
                <div className=' space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-auto hidden-scrollbar pb-10'>
                    <Video
                        hostName={user.username}
                        hostIdentity={user.id}
                    />

                </div>
            </LiveKitRoom>
        </>
    )
}

export default StreamPlayer