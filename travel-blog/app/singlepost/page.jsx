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



const SinglePost = () => {
    return (
        <div
            className='flex flex-col w-[500px] h-[500px] bg-white rounded-2xl shadow-md mt-4
            ml-[345px] mb-4'
        >
            {/* div for image, name, time ago and three dots */}
            <div
                className='flex flex-row items-center w-full h-20 px-5 py-2'
            >
                <Image
                    src='/profile.jpeg'
                    alt='profile picture'
                    width={40}
                    height={40}
                    className='rounded-full object-cover w-14 h-14'
                />
                <span
                    className='text-sm font-semibold ml-4 '
                >
                    Jaren Buel
                </span>
                <span
                    className='text-sm text-gray-400  ml-24 '
                >
                    18 hr. ago
                </span>
                <BiDotsHorizontalRounded
                    className='text-xl ml-16 cursor-pointer '
                />
            </div>

            <span
                className='text-sm ml-5 mr-5'
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni itaque eos quas quibusdam nulla neque.
            </span>

            {/* div for image */}
            <div
                className='flex flex-row items-center w-full h-40 px-5 py-2'
            >
                <Image
                    src='/blogimg.png'
                    alt='profile picture'
                    width={320}
                    height={120}
                    className='object-cover w-[450px] mt-40 '
                />
            </div>

            <div
                className='flex flex-row items-center w-full h-10 px-5 py-2
                mt-40 justify-between gap-3
                '
            >
                <span
                    className='px-3 py-2 rounded-full cursor-pointer bg-gray-200
                    flex flex-row items-center justify-center
                    '
                >
                    <AiOutlineHeart
                        className='text-xl mr-2'
                    />
                    1,236
                </span>
                {/* comments */}
                <span
                    className='px-3 py-2 rounded-full cursor-pointer bg-gray-200
                    flex flex-row items-center justify-center
                    '
                >
                    <FaRegComment
                        className='text-xl mr-2'
                    />
                    <input
                        type='text'
                        placeholder='Comment'
                        className='outline-none bg-transparent'
                    />

                </span>
                <span
                    className='px-3 py-2 rounded-full cursor-pointer bg-gray-200'
                >
                    <FiShare2
                        className='text-xl'
                    />
                </span>
            </div>

        </div>
    )
}

export default SinglePost