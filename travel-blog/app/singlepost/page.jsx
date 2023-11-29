import Image from 'next/image'
import React from 'react'
// import three dots icon from react-icons
import { BiDotsHorizontalRounded } from 'react-icons/bi'
// imoprt icons for heart, comment and share
import { AiOutlineHeart } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { RiShareForwardLine } from 'react-icons/ri'
import { FaRegComment } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { useEffect, useState } from 'react';

const SinglePost = ({ post }) => {
    console.log(post);
    // destructure post object
    const { username, email, description, attachment, likes, comments, createdAt } = post
    const [user, setUser] = useState({});


    const [showComments, setShowComments] = useState(false);
    const [postComments, setPostComments] = useState([]);
    const [comment, setComment] = useState('');


    const timeAgo = () => {
        const timeNow = new Date();
        const timeCreated = new Date(createdAt);
        const timeDiff = timeNow - timeCreated;
        const seconds = timeDiff / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const months = days / 30;
        const years = months / 12;

        if (years >= 1) {
            return `${Math.floor(years)} years ago`;
        } else if (months >= 1) {
            return `${Math.floor(months)} months ago`;
        } else if (days >= 1) {
            return `${Math.floor(days)} days ago`;
        } else if (hours >= 1) {
            return `${Math.floor(hours)} hours ago`;
        } else if (minutes >= 1) {
            return `${Math.floor(minutes)} minutes ago`;
        } else {
            return 'just now';
        }
    };

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const handleLike = async () => {
        // Check if the post is already liked
        if (liked) {
            return;
        }

        // Make a request to like the post
        const res = await fetch(`http://localhost:5001/like-post/${post._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            // If the request is successful, update the local state and play the sweet alert sound
            setLiked(true);
            setLikeCount(likeCount + 1);
            playSweetAlert();
        } else {
            // Handle errors if the request fails
            console.error('Error handling like:', res.statusText);
        }
    };

    const playSweetAlert = () => {
        const audio = new Audio('/like-sound.mp3'); // Replace with the path to your sweet alert sound file
        audio.play();
    };


    // get user name using email from local storage and then call api to get the user details
    useEffect(() => {
        fetch(`http://localhost:5001/api/user/${email}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
            });
    }, [email]);

    // for comments
    const handleShowComments = async () => {
        try {
            // Fetch comments from the backend API
            const res = await fetch(`http://localhost:5001/api/post/comments/${post._id}`);
            if (res.ok) {
                const comments = await res.json();
                setPostComments(comments);
                setShowComments(true);
                console.log(comments);
            } else {
                console.error('Error fetching comments:', res.statusText);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleHideComments = () => {
        setShowComments(false);
    };

    const handleAddComment = async () => {
        try {
            // Make a request to create a new comment with post id and username
            const res = await fetch(`http://localhost:5001/api/post/comment/${post._id}/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment }),
            });

            if (res.ok) {
                // If the request is successful, update the local state and play the sweet alert sound
                setComment('');
                playSweetAlert();
            } else {
                // Handle errors if the request fails
                console.error('Error creating comment:', res.statusText);
            }
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };


    return (
        <div
            className='flex flex-col w-[500px] min-h-[520px] bg-white rounded-2xl shadow-md mt-4
            ml-[345px] mb-2 pb-4'
        >
            {/* div for image, name, time ago and three dots */}
            <div
                className='flex flex-row items-center w-full  h-24 px-5 py-2'
            >
                <Image
                    src={user.profileImage}
                    alt='profile picture'
                    width={120}
                    height={140}
                    className='rounded-full object-cover w-14 h-14'
                />
                <span className='text-sm font-semibold ml-4' style={{ whiteSpace: 'nowrap' }}>
                    {username}
                </span>

                <span
                    className='text-sm text-gray-400  ml-12 ' style={{ whiteSpace: 'nowrap' }}
                >
                    {timeAgo()}
                </span>
                <BiDotsHorizontalRounded
                    className='text-xl ml-32 cursor-pointer text-black hover:text-gray-400 '
                />
            </div>

            <span
                className='text-sm ml-5 mr-5'
            >
                {description}
            </span>

            {/* div for image */}
            <div
                className='flex flex-row items-center justify-center w-full h-40 px-5 py-2'
            >
                <Image
                    src={attachment}
                    alt='profile picture'
                    width={340}
                    height={120}
                    className=' rounded-md object-cover w-full h-64 md:w-96 lg:w-450px mt-40'
                />
            </div>

            <div
                className='flex flex-row items-center w-full h-10 px-5 py-2
                mt-40 justify-between gap-3
                '
            >
                <span
                    className={`px-3 py-2 rounded-full cursor-pointer ${liked ? 'bg-red-500' : 'bg-gray-200'}
                flex flex-row items-center justify-center`}
                    onClick={handleLike}
                >
                    <AiOutlineHeart className={`text-xl mr-2 ${liked ? 'text-gray-200' : 'text-black'}`} />
                    <span className='text-sm font-semibold                     
                    '>{likes}</span>
                </span>
                {/* comments */}
                <span
                    className='px-3 py-2 rounded-full cursor-pointer bg-gray-200 flex flex-row justify-center'
                    onClick={showComments ? handleHideComments : handleShowComments}
                >
                    <FaRegComment className='text-xl mr-2' />
                    <span className='text-sm font-semibold'>{postComments.length} Comments</span>
                </span>

                <span
                    className='px-3 py-2 rounded-full cursor-pointer bg-gray-200'
                >
                    <FiShare2
                        className='text-xl'
                    />
                </span>
            </div>
            {showComments && (
                <div className='px-5'>
                    {postComments.map((comment) => (
                        <div key={comment._id} className='mb-2'>
                            <span className='font-semibold'>{comment.username}:</span> {comment.comment}
                        </div>
                    ))}


                    {/* input to add the comments */}
                    <div className='flex flex-row items-center w-full h-10 px-5 py-2
                mt-16 justify-between gap-3
                '>
                        <input
                            type='text'
                            placeholder='Add a comment...'
                            className='w-full h-10 px-5 py-2 rounded-full bg-gray-200
                            outline-none
                            '
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            className='text-sm font-semibold text-blue-500'
                            onClick={handleAddComment}
                        >
                            Post
                        </button>
                    </div>

                </div>
            )}

        </div>
    )
}

export default SinglePost