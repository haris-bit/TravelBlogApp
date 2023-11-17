"use client";

import React from 'react'
import { useState } from 'react';
import UserNavbar from '../usernav/page';

const Security = () => {
    const [password, setPassword] = useState(''); // Use state to manage the password

    const handlePasswordChange = (e) => {
        setPassword(e.target.value); // Update the password state
    };
    return (
        <div className='flex flex-col w-[700px] h-4/6 bg-[#f4f4f4] text-black  '>
            <UserNavbar />
            <h1 className='font-semibold ml-12'>Security Settings</h1>

            <h2 className='mt-4 ml-12'>Password</h2>

            <p className='text-sm text-gray-500 mt-4 ml-12'>
                *This is your current password
            </p>

            <span className="relative ml-12">
                {/* Actual password input */}
                <input
                    type="password"
                    placeholder="Password"
                    className="
                        text-[#f4f4f4]
                        w-full h-12 border border-gray-300 rounded-md p-2 bg-transparent outline-none mt-4"
                    value={password}
                    onChange={handlePasswordChange}
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
                    type="password"
                    placeholder="Type New Password"
                    className="
                        text-[#f4f4f4]
                        w-full h-12 border border-gray-300 rounded-md p-2 bg-transparent outline-none mt-4"
                    value={password}
                    onChange={handlePasswordChange}
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

            <span className="relative ml-12 ">
                {/* Actual password input */}
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="
                        text-[#f4f4f4]
                        w-full h-12 border border-gray-300 rounded-md p-2 bg-transparent outline-none mt-2"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="new-password"
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
                    className='bg-gray-600 text-white rounded-full px-6 py-2'
                >
                    Save changes
                </button>
            </div>


        </div>
    )
}

export default Security