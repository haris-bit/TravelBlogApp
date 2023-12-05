"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// import camera icon from react icons
import { FaCamera } from 'react-icons/fa';
import { GrCamera } from "react-icons/gr";
import UserNavbar from '../usernav/page';
import Navbar from '@app/components/navbar/Navbar';
import Sidebar from '@app/components/sidebar/Sidebar';
import axios from 'axios';


const Profile = () => {
    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [bio, setBio] = useState('');
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

    // console.log(email);

    useEffect(() => {
        const email = window.localStorage.getItem('userEmail');
        setEmail(email);
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/user/${email}`);
                setUser(response.data);
                setFirstName(response.data.firstName);
                setSurname(response.data.surname);
                setBio(response.data.bio);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [email]);

    const applyChanges = async (e) => {
        e.preventDefault();
        console.log('Applying changes...');
        console.log(user.firstName, user.surname, user.bio);  // Use user object directly
        try {
            fetch(`http://localhost:5001/api/user/profile/${email}`, {
                method: 'PUT',
                body: JSON.stringify({
                    firstName: firstName,
                    surname: surname,
                    bio: bio
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                    alert('Profile updated successfully!');
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                });

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };



    return (
        <div
            className='flex flex-col w-full h-full bg-[#f4f4f4] container mx-auto p-2'
        >
            <Navbar
            />
            <div
                className='flex flex-row h-full ml-[300px] '
            >
                <Sidebar
                />
                <form
                    onSubmit={applyChanges}
                >
                    <div className=' mt-20 flex flex-col w-[700px] min-h-screen mb-20 bg-[#f4f4f4] text-black '>
                        <UserNavbar />
                        {/* div for first name and surname */}
                        <div className='flex flex-col w-full h-4/6 ml-12'>
                            <h1 className='font-semibold '>Customize profile information</h1>

                            <h2 className='mt-4'>Profile name </h2>

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
                                        value={firstName}
                                        className='w-full h-full border border-gray-300 rounded-md p-2 bg-transparent outline-none'
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />

                                </div>

                                {/* surname */}
                                <div className='flex flex-col w-1/2 h-full ml-4'>
                                    <input
                                        type='text'
                                        placeholder='Surname'
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
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
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className='w-full h-32 border border-gray-300 rounded-md p-2 bg-transparent outline-none mt-4 resize-none'
                            ></textarea>

                            <hr className='w-full h-0.5 bg-gray-300 mt-8' />

                            {/* <h2 className='mt-4'>Upload Profile Image</h2> */}

                            {/* <p className='text-sm text-gray-500 mt-4'>
                            *Upload the image in the .jpg or .png format
                        </p> */}

                            {/* Image upload */}
                            {/* <label htmlFor='imageUpload' className='cursor-pointer mt-4
                border border-gray-300 rounded-full w-20 h-20 flex items-center justify-center
                '>
                            {selectedImage ? (
                                <Image
                                        src={user.profileImage}
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
                        </label> */}

                            {/* <input
                            type='file'
                            id='imageUpload'
                                name='profileImage'
                            accept='image/*'
                            className='hidden'
                            onChange={handleFileChange}
                        /> */}
                        </div>

                        {/* save changes button */}
                        <div className='flex flex-row  ml-12 mt-12 mb-8 '>
                            <input
                                type='submit'
                                value='Save changes'
                                className='bg-gray-600 text-white rounded-full px-6 py-2 cursor-pointer'
                                onClick={applyChanges}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
