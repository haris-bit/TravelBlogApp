import React from 'react'
import SinglePost from '@app/singlepost/page'
import { useEffect, useState } from 'react'

const PostFeed = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5001/api/posts')
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
            });
    }, []);

    return (
        <div
            className='flex flex-col w-full h-full mt-20 container mx-auto p-2'
        >
            {/* populate all posts using singlePost component */}
            {posts.map((post) => (
                <SinglePost
                    key={post._id}
                    post={post}
                    isMobile={window.innerWidth <= 768}
                />
            ))}
        </div>
    )
}

export default PostFeed