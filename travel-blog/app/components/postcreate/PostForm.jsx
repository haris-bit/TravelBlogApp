"use client";

import React, { useState } from 'react';
import { MdOutlineAttachment } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import Image from 'next/image';
import Link from 'next/link';


const CreatePost = () => {
    const [postText, setPostText] = useState('');
    const [attachedFile, setAttachedFile] = useState(null);

    const handleTextChange = (e) => {
        setPostText(e.target.value);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setAttachedFile(file);
    };

    const handleImageAttachment = () => {
        // Perform action for attaching an image (e.g., opening a file picker)
        // This can be customized based on your application's requirements
        console.log('Attach Image action');
    };

    return (
        <div className='flex flex-col w-[500px] ml-[350px] h-full bg-white rounded-2xl shadow-md mt-24'>
            <span className='flex flex-col justify-between w-full h-30 px-5 py-2'>
                <input
                    type="text"
                    placeholder="Type to create a post..."
                    value={postText}
                    onChange={handleTextChange}
                    className='w-full h-20 p-4 text-gray-500 border-none outline-none bg-gray-200 rounded-2xl'
                />
                <div className="flex items-center mt-4">
                    {/* File Upload icon */}
                    <label htmlFor="fileUpload" className="cursor-pointer bg-gray-200 rounded-full
                            p-1">
                        <MdOutlineAttachment
                            size={24}
                            className="text-gray-600 cursor-pointer
                            
                            "
                            onClick={handleImageAttachment}
                        />
                        <input
                            type="file"
                            id="fileUpload"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>

                    {/* Image Attachment icon */}
                    <label htmlFor="imageAttachment" className="cursor-pointer bg-gray-200 rounded-full p-1 ml-2">
                        <CiImageOn
                            size={24}
                            className="text-gray-500 cursor-pointer"
                            onClick={handleImageAttachment}
                        />
                        <input
                            type="file"
                            id="imageAttachment"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>

                </div>
                {/* create post button */}
                <button
                    className="flex items-center justify-center w-[140px] h-10 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                >
                    Create Post
                </button>
            </span>

            {/* profile preview */}
            <div className="flex flex-col w-[350px] h-[400px] mt-4
            absolute top-20 right-12 rounded-2xl
            shadow-md bg-white p-6
            ">
                <div className="relative w-16 h-16 mt-1">
                    <div className="absolute  rounded-full border border-blue-500 flex items-center justify-center overflow-hidden ">
                        <Image
                            src="/profile.jpeg"
                            alt="Profile Image"
                            width={65}
                            height={10}
                            className="rounded-full w-16 h-16 object-cover"
                        />
                    </div>
                </div>

                <span className="mt-2 text-sm font-semibold">Jaren Buel</span>
                <span
                    className='mt-1 text-sm text-gray-500 leading-loose tracking-wide '
                >
                    Content marketing professional at BlackSpot, a CRM platform that helps companies attract visitors, convert leads, and close customers.
                </span>

                <h2
                    className='mt-4 text-sm font-semibold text-black leading-loose tracking-wide'
                >
                    3,243 followers
                </h2>

                {/* create post button */}
                <Link href="/profile">
                    <button
                        className="flex items-center justify-center w-[140px] h-10 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                    >
                        Edit Profile
                    </button>
                </Link>

                {/* more options */}
                <span
                    className='mt-4 text-sm font-semibold text-gray-500 leading-loose tracking-wide cursor-pointer hover:underline'
                >
                    More Options
                </span>
            </div>

        </div>
    );
};

export default CreatePost;
