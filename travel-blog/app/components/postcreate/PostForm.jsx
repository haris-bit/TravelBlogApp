"use client";

import React, { useState } from 'react';
import { MdOutlineAttachment } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';


const CreatePost = () => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [user, setUser] = useState({});

    // get user email from local storage
    useEffect(() => {
        const email = window.localStorage.getItem('userEmail');
        setEmail(email);
    }, [])

    // get user name using email from local storage and then call api to get the user details
    useEffect(() => {
        fetch(`http://localhost:5001/api/user/${email}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setFirstName(data.firstName);
                setSurname(data.surname);
            });
    }, [email]);


    const handleTextChange = (e) => {
        const text = e.target.value;
        setDescription(text);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setAttachment(file);
    };

    const handleCreatePost = () => {
        const formData = new FormData();
        formData.append('username', `${firstName} ${surname}`);
        formData.append('email', email);
        formData.append('description', description);
        formData.append('attachment', attachment);
        console.log(formData);
        console.log(firstName + ' ' + surname);
        console.log(email);
        console.log(description);
        console.log(attachment.name);
        fetch('http://localhost:5001/api/post/create', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            }
            )

        alert('Post created successfully');
    };

    return (
        <div className='flex flex-col w-[500px] ml-[350px] h-full bg-white rounded-2xl shadow-md mt-24'>
            <span className='flex flex-col justify-between w-full h-30 px-5 py-2'>
                <input
                    type="text"
                    placeholder="Type to create a post..."
                    value={description}
                    onChange={handleTextChange}
                    className='w-full h-20 p-4 text-gray-500 border-none outline-none bg-gray-200 rounded-2xl'
                />
                <div className="flex items-center mt-4">
                    {/* Image Attachment icon */}
                    <label htmlFor="imageAttachment" className="cursor-pointer bg-gray-200 rounded-full p-1 ml-2">
                        <MdOutlineAttachment
                            size={24}
                            className="text-gray-500 cursor-pointer"
                        />
                        <input
                            type="file"
                            id="imageAttachment"
                            name="attachment"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>

                    {/* create a view for selected image. Use react icon if image is not selected else show selected image here */}
                    {attachment ? (
                        <span className="flex w-10 h-10 ml-2 bg-gray-200 rounded-full">
                            <Image
                                src={URL.createObjectURL(attachment)}
                                alt="Attachment Image"
                                width={200}
                                height={200}
                                className="rounded-full object-cover "
                            />
                        </span>
                    ) : (
                        <span className="flex items-center justify-center w-10 h-10 ml-2 rounded-full 
                        ">
                            <CiImageOn
                                size={24}
                                />
                        </span>
                    )}

                </div>
                {/* create post button */}
                <button
                    className="flex items-center justify-center w-[140px] h-10 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                    onClick={handleCreatePost}
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
                            src={user.profileImage}
                            alt={user.firstName}
                            width={65}
                            height={10}
                            className="rounded-full w-16 h-16 object-cover"
                        />
                    </div>
                </div>

                <span className="mt-2 text-sm font-semibold">{user.firstName + ' '+ user.surname}</span>
                <span
                    className='mt-1 text-sm text-gray-500 leading-loose tracking-wide '
                >
                    {user.bio}
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
