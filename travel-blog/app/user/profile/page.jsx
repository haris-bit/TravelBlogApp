"use client";
import React, { useState } from 'react';
import Image from 'next/image';

// import camera icon from react icons
import { FaCamera } from 'react-icons/fa';
import { GrCamera } from "react-icons/gr";


const Profile = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='flex flex-col w-[700px] min-h-screen mb-20 bg-[#f4f4f4] text-black '>
            {/* div for first name and surname */}
            <div className='flex flex-col w-full h-4/6 ml-12'>
                <h1 className='font-semibold '>Customize profile information</h1>

                <h2 className='mt-4'>Profile name</h2>

                <p className='text-sm text-gray-500 mt-4'>
                    *Display name will not change your username
                </p>

                {/* Divs for names */}
                <div className='flex flex-row w-full h-12 mt-4'>
                    {/* first name */}
                    <div className='flex flex-col w-1/2 h-full'>
                        <input
                            type='text'
                            placeholder='First name'
                            className='w-full h-full border border-gray-300 rounded-md p-2 bg-transparent outline-none'
                        />
                    </div>

                    {/* surname */}
                    <div className='flex flex-col w-1/2 h-full ml-4'>
                        <input
                            type='text'
                            placeholder='Surname'
                            className='w-full h-full border border-gray-300 rounded-md p-2 bg-transparent outline-none'
                        />
                    </div>
                </div>
                <hr className='w-full h-0.5 bg-gray-300 mt-8' />

                <h2 className='mt-4'>Edit your bio</h2>

                <p className='text-sm text-gray-500 mt-4'>
                    *It must be less than 200 characters
                </p>

                <textarea
                    name=''
                    id=''
                    cols='30'
                    rows='20'
                    placeholder='Type bio here...'
                    className='w-full h-32 border border-gray-300 rounded-md p-2 bg-transparent outline-none mt-4 resize-none'
                ></textarea>

                <hr className='w-full h-0.5 bg-gray-300 mt-8' />

                <h2 className='mt-4'>Upload Profile Image</h2>

                <p className='text-sm text-gray-500 mt-4'>
                    *Upload the image in the .jpg or .png format
                </p>

                {/* Image upload */}
                <label htmlFor='imageUpload' className='cursor-pointer mt-4
                border border-gray-300 rounded-full w-20 h-20 flex items-center justify-center     
                '>
                    {selectedImage ? (
                        <Image
                            src={selectedImage}
                            alt='Selected'
                            className='w-20 h-20 object-cover rounded-full'
                            width={80}
                            height={80}
                        />
                    ) : (
                        <
                            GrCamera
                        />
                    )}
                </label>
                <input
                    type='file'
                    id='imageUpload'
                    accept='image/*'
                    className='hidden'
                    onChange={handleFileChange}
                />
            </div>

            {/* save changes button */}
            <div className='flex flex-row w-full h-1/6 ml-12 mt-12 mb-8 '>
                <button
                    className='bg-gray-600 text-white rounded-full px-6 py-2'
                >
                    Save changes
                </button>
            </div>
        </div>
    );
};

export default Profile;
