"use client";

import Navbar from '@app/components/navbar/Navbar';
import React, { useState } from 'react';
import UserNavbar from '../usernav/page';
import Sidebar from '@app/components/sidebar/Sidebar';
import { useEffect } from 'react';
import axios from 'axios';


const Account = () => {
    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);

    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
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
        console.log('Applying changes...');
        console.log(user.email);  // Use user object directly
        try {
            window.localStorage.setItem('userEmail', user.email);
            const response = await axios.put(`http://localhost:5001/api/user/account/${email}`, user);
            console.log(response.data);
            alert('Changes applied successfully!');
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
                <div className='mt-20 flex flex-col w-[700px] min-h-screen mb-20 bg-[#f4f4f4] text-black '>
                    <UserNavbar />

                    {/* div for first name and surname */}
                    <div className='flex flex-col w-full h-4/6 ml-12'>
                        <h1 className='font-semibold mt-4 '>Account preferences</h1>

                        <h2 className='mt-4'>Email address</h2>

                        <p className='text-sm text-gray-500 mt-4'>
                            *This is your current email address
                        </p>

                        <span>
                            <input
                                type='email'
                                placeholder='Email address'
                                className='w-full h-12 border border-gray-300 rounded-md p-2 bg-transparent outline-none mt-4'
                                value={user.email || ''}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </span>

                        <hr className='w-full h-0.5 bg-gray-300 mt-8' />

                        <h2 className='mt-4'>Edit your bio</h2>

                        <p className='text-sm text-gray-500 mt-4'>
                            *It is used to give you better experience through recommendations.
                        </p>

                        <div className="flex w-[300px] items-center space-x-6 ">
                            {/* Male */}
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={selectedGender === 'male'}
                                    onChange={() => handleGenderChange('male')}
                                    className=" w-4 h-4 cursor-pointer"
                                />
                                <span className="text-gray-700">Male</span>
                            </div>

                            {/* Female */}
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={selectedGender === 'female'}
                                    onChange={() => handleGenderChange('female')}
                                    className=" w-4 h-4 cursor-pointer"
                                />
                                <span className="text-gray-700">Female</span>
                            </div>

                            {/* Other */}
                            <div className="flex items-center space-x-2 ">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={selectedGender === 'other'}
                                    onChange={() => handleGenderChange('other')}
                                    className=" w-4 h-4 cursor-pointer"
                                />
                                <span className="text-gray-700">Other</span>
                            </div>
                        </div>



                        <hr className='w-full h-0.5 bg-gray-300 mt-8' />

                    </div>

                    {/* save changes button */}
                    <div className='flex flex-row  ml-12 mt-12 mb-8'>
                        <button
                            className='bg-gray-600 text-white rounded-full px-6 py-2'
                            onClick={applyChanges}
                        >
                            Save changes
                        </button>
                    </div>


                    {/* delete account button */}
                    <div className='flex flex-col h-1/6 ml-12 mt-12 mb-2 '>
                        <p className='text-sm text-gray-500 mt-4'>
                            *This action will delete your account permanently and data asscoiated with it.
                        </p>

                        <button
                            className='border border-red-600 text-red-600 rounded-full px-6 py-2
                    mt-4 w-[180px]
                    '
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account