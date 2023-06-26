'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@/components/Profile'
import { UserType, allPostType } from '@/types/typing'

function MyProfile() {
    const [allPosts, setAllPosts] = useState<allPostType[]>([]);
    const { data: session } = useSession()
    const router = useRouter()

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${(session?.user as UserType).id}/posts`);

        const data: allPostType[] = await response.json();
        setAllPosts(data);
    };

    useEffect(() => {
        if ((session?.user as UserType)?.id) fetchPosts();
    }, [(session?.user as UserType)?.id]);


    const handleEdit = (post: allPostType) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post: allPostType) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this prompt?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = allPosts.filter((item) => item._id !== post._id);

                setAllPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
            data={allPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete} />
    )
}

export default MyProfile;