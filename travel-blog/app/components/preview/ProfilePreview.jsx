import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const ProfilePreview = () => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState({});
    const [showOptions, setShowOptions] = useState(false);

    // get user email from local storage
    useEffect(() => {
        const email = window.localStorage.getItem('userEmail');
        setEmail(email);
    }, []);

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

    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div>
            {/* profile preview */}
            <div className="flex flex-col w-[350px] h-[400px] mt-4 absolute top-20 right-12 rounded-2xl shadow-md bg-white p-6">
                <div className="relative w-16 h-16 mt-1">
                    <div className="absolute rounded-full border border-blue-500 flex items-center justify-center overflow-hidden">
                        <Image
                            src={user.profileImage}
                            alt={user.firstName}
                            width={65}
                            height={10}
                            className="rounded-full w-16 h-16 object-cover"
                        />
                    </div>
                </div>

                <span className="mt-2 text-sm font-semibold">{user.firstName + ' ' + user.surname}</span>
                <span className='mt-1 text-sm text-gray-500 leading-loose tracking-wide'>{user.bio}</span>

                <h2 className='mt-4 text-sm font-semibold text-black leading-loose tracking-wide'>
                    3,243 followers
                </h2>


                {/* Edit Profile button */}
                <Link href="/profile">
                    <button
                        className="flex items-center justify-center w-[140px] h-10 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                    >
                        Edit Profile
                    </button>
                </Link>

                {/* More Options */}
                <div className="relative mt-4">
                    <span
                        className='text-sm font-semibold text-gray-500 leading-loose tracking-wide cursor-pointer hover:underline'
                        onClick={handleToggleOptions}
                    >
                        {
                            showOptions ? 'Hide Options' : 'More Options'
                        }
                    </span>
                    {showOptions && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
                            {/* Create Post option */}
                            <Link href="/postcreate"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                            >
                                Create Post
                            </Link>

                            {/* Become an Author option */}
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                                onClick={() => {
                                    // Handle the request to become an author
                                    // You can add the necessary logic here
                                    console.log("Request to become an author");
                                }}
                            >
                                Become an Author
                            </a>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProfilePreview;
