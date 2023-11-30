"use client";
// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MdOutlineAttachment } from 'react-icons/md';
import { CiImageOn } from 'react-icons/ci';
import Navbar from '@app/components/navbar/Navbar';
import Sidebar from '@app/components/sidebar/Sidebar';
import ProfilePreview from '@app/components/preview/ProfilePreview';

const CreatePost = () => {
    // State variables
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [user, setUser] = useState({});

    // Fetch user details on component mount
    useEffect(() => {
        const userEmail = window.localStorage.getItem('userEmail');
        setEmail(userEmail);

        fetch(`http://localhost:5001/api/user/${userEmail}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setFirstName(data.firstName);
                setSurname(data.surname);
            });
    }, []);

    // Handle text change in the textarea
    const handleTextChange = (e) => {
        setDescription(e.target.value);
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setAttachment(file);
    };

    // Handle post creation
    const handleCreatePost = () => {
        const formData = new FormData();
        formData.append('username', `${firstName} ${surname}`);
        formData.append('email', email);
        formData.append('description', description);
        formData.append('attachment', attachment);

        fetch('http://localhost:5001/api/post/create', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });

        alert('Post created successfully');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Navbar and Sidebar */}
            <Navbar />
            <Sidebar />

            {/* Create Post Content */}
            <div className="flex flex-col ml-[300px] w-full mt-24">
                <div className="flex flex-col w-[600px] bg-white rounded-2xl shadow-md">
                    <textarea
                        placeholder="Type to create a post..."
                        rows={14}
                        value={description}
                        onChange={handleTextChange}
                        className="w-full p-4 text-gray-500 border-none outline-none bg-gray-200 rounded-t-2xl"
                    />

                    <div className="flex items-center mt-4">
                        <label htmlFor="imageAttachment" className="cursor-pointer bg-gray-200 rounded-full p-1 ml-2">
                            <MdOutlineAttachment size={24} className="text-gray-500 cursor-pointer" />
                            <input
                                type="file"
                                id="imageAttachment"
                                name="attachment"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </label>

                        {attachment ? (
                            <span className="flex w-10 h-10 bg-gray-200 rounded-full
                                ml-auto mr-4
                            ">
                                <Image
                                    src={URL.createObjectURL(attachment)}
                                    alt="Attachment Image"
                                    width={200}
                                    height={200}
                                    className="rounded-full object-cover ml-auto mr-4"
                                />
                            </span>
                        ) : (
                            <span className="flex items-center justify-center w-10 h-10 ml-2 rounded-full">
                                <CiImageOn size={24} />
                            </span>
                        )}
                    </div>

                    <button
                        className="flex items-center justify-center w-[140px] h-10 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-600
                        mb-4 ml-auto mr-4
                        "
                        onClick={handleCreatePost}
                    >
                        Create Post
                    </button>
                </div>

                {/* Profile Preview */}
                <ProfilePreview />
            </div>
        </div>
    );
};

export default CreatePost;
