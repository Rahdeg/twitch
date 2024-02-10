import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import Actions from './_components/actions'
import { isBlockedByUser } from '@/lib/block-service'

interface UserPageProps {
    params: {
        username: string
    }
}

const UserPage = async ({ params }: UserPageProps) => {
    const user = await getUserByUsername(params.username);

    if (!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id)


    if (isBlocked) {
        notFound();
    }

    return (
        <div>
            <p>username :{user?.username}</p>
            <p> usr ID: {user?.id}</p>
            <p>
                is following: {`${isFollowing}`}
            </p>
            <p>
                is Blocked: {`${isBlocked}`}
            </p>
            <Actions isFollowing={isFollowing} userId={user.id} />
        </div>
    )
}

export default UserPage