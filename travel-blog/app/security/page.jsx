"use client";

import React from 'react'
import { useState } from 'react';
import UserNavbar from '../usernav/page';
import Navbar from '@app/components/navbar/Navbar';
import Sidebar from '@app/components/sidebar/Sidebar';
import { useEffect } from 'react';
import axios from 'axios';

const Security = () => {
    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value); // Update the password state
    };


    useEffect(() => {
        const email = window.localStorage.getItem('userEmail');
        setEmail(email);
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/user/${email}`);
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [email]);

    const applyChanges = async () => {

        // check if any password is empty
        if (!newPassword || !confirmNewPassword) {
            alert('Please fill in all the fields!');
            return;
        }

        // Check if the new password matches the confirm password
        if (newPassword !== confirmNewPassword) {
            alert('Passwords do not match!');
            return;
        }

        console.log('Applying changes...');
        console.log(user.newPassword);  // Use user object directly
        try {
            fetch(`http://localhost:5001/api/user/security/${email}`, {
                method: 'PUT',
                body: JSON.stringify({
                    password: newPassword,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
            alert('Password changed successfully!');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div
            className='flex flex-col w-full h-full bg-[#f4f4f4] '
        >
            <Navbar />

            <div
                className='flex flex-row h-full ml-[300px] '
            >
                <Sidebar />
                <div className='mt-20 flex flex-col w-[700px] h-4/6 bg-[#f4f4f4] text-black  '>
                    <UserNavbar />
                    <h1 className='font-semibold ml-12'>Security Settings</h1>

                    <h2 className='mt-4 ml-12'>Password</h2>

                    <p className='text-sm text-gray-500 mt-4 ml-12'>
                        *This is your current password
                    </p>

                    <span className="relative ml-12">
                        {/* Actual password input */}
                        <input
                            type="text"
                            placeholder="Password"
                            className="
                        text-black
                        w-full h-12 border border-gray-300 rounded-md p-2 bg-transparent outline-none mt-4"
                            value={user.password || ''}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            autoComplete="new-password"
                        />


                        {/* Display asterisks based on the password length */}
                        <span className="absolute ml-12 top-3 left-2 h-full flex items-center

                    ">
                            {Array.from({ length: password.length }, (_, index) => (
                                <span key={index} className="text-gray-700">*</span>
                            ))}
                        </span>
                    </span>

                    <p className='text-sm text-gray-500 ml-12 mt-8'>
                        *Make sure they match.
                    </p>

                    <span className="relative ml-12">
                        {/* Actual password input */}
                        <input
                            type="type"
                            placeholder="Type New Password"
                            className="
                        text-black
                        w-full h-12 border border-gray-300 rounded-md p-2 bg-transparent outline-none mt-4"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />


                        {/* Display asterisks based on the password length */}
                        <span className="absolute ml-12 top-3 left-2 h-full flex items-center

                    ">
                            {Array.from({ length: password.length }, (_, index) => (
                                <span key={index} className="text-gray-700">*</span>
                            ))}
                        </span>
                    </span>

                    <span className="relative ml-12 ">
                        {/* Actual password input */}
                        <input
                            type="text"
                            placeholder="Confirm New Password"
                            className="
                        text-black
                        w-full h-12 border border-gray-300 rounded-md p-2 bg-transparent outline-none mt-2"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />


                        {/* Display asterisks based on the password length */}
                        <span className="absolute top-3 left-2 h-full flex items-center

                    ">
                            {Array.from({ length: password.length }, (_, index) => (
                                <span key={index} className="text-gray-700">*</span>
                            ))}
                        </span>
                    </span>


                    <hr className='w-full h-0.5 bg-gray-300 mt-8' />

                    {/* save changes button */}
                    <div className='flex flex-row w-full h-1/6 mt-12 mb-8 ml-12 '>
                        <button
                            className='bg-gray-600 text-white rounded-full px-6 py-2
                            cursor-pointer hover:bg-gray-700 hover:shadow-lg transition duration-300 ease-in-out
                            '
                            onClick={applyChanges}
                        >
                            Save changes
                        </button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Security