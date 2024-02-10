"use client"

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow."
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

const Actions = ({ isFollowing, userId }: ActionsProps) => {

    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`you have followed ${data?.following.username}`))
                .catch(() => toast.error("Something went wrong"))
        });
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnFollow(userId)
                .then((data) => toast.success(`you have unfollowed ${data?.following.username}`))
                .catch(() => toast.error("Something went wrong"))
        });
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`blocked the user ${data.blocker.username}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }


    const handleUnBlock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => toast.success(`Unblocked the user ${data.blocker.username}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }



    const onClick = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    };

    return (
        <div className=" flex flex-col gap-y-3">
            <Button variant="primary" onClick={onClick} disabled={isPending}>
                {
                    isFollowing ? "unfollow" : "follow"
                }
            </Button>

            <Button onClick={handleBlock} disabled={isPending}>
                Block user
            </Button>

            <Button onClick={handleUnBlock} disabled={isPending}>
                UnBlock user
            </Button>
        </div>

    )
}

export default Actions