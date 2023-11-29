"use client";
import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from 'react'
import axios from 'axios';
// import user icon from react icons
import { FaUserCircle } from "react-icons/fa";


const Navbar = () => {
    const [email, setEmail] = useState('');
    const [user, setUser] = useState({});
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


    return (
        <div id="NewRootRoot" className="flex flex-col w-full
        fixed top-0 left-0 z-50">
            {user && (
                <div className="bg-[#1e1e1e] flex flex-col justify-end pt-2 gap-2">
                    <div className="flex flex-row justify-between items-center ml-12 mr-6">
                        <div className="text-xl font-['Montserrat'] font-bold leading-[24px] text-white
                    ">
                            TravelBlog
                        </div>
                        <div className="self-start flex flex-row gap-8 w-[937px] items-center">
                            <div className="bg-[#383838] flex flex-row gap-3 w-1/2 h-12 items-center pt-2 px-5 rounded-[38px]">
                                <Image
                                    src="https://file.rendit.io/n/XqHhVu83KMJ1BsNLTOOi.svg"
                                    alt="Search"
                                    id="Search"
                                    className="w-6 shrink-0"
                                    width={24}
                                    height={24}
                                />
                                <div className="font-['Poppins'] font-medium text-[#9c9c9c] self-start w-full">
                                    {/* input for search */}
                                    {/* Search TravelBlog */}
                                    <input
                                        type="text"
                                        placeholder="Search TravelBlog"
                                        className="bg-[#383838] font-['Poppins'] font-medium text-[#9c9c9c] self-start mt-2 outline-none "
                                    />
                                </div>
                            </div>
                            <div className="self-start flex flex-row gap-6 w-2/5 items-center">
                                <div className="flex flex-row gap-5 items-start">
                                    <Image
                                        src="https://file.rendit.io/n/5A9GqNmRzTfcQrrAfMFK.svg"
                                        alt="Notifications"
                                        id="Notifications"
                                        className="w-6 shrink-0 ml-32 mr-12 "
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <div className="bg-[#383838] self-start flex flex-row gap-20 w-[274px] h-12 pt-2 px-2 rounded-[26.5px]">
                                    <div className="self-start flex flex-row mt-px gap-4 w-full items-start">

                                        <
                                            Image src={user.profileImage} alt={`user.firstName`} width={15} height={15}
                                            className='text-white w-6 h-6 ml-2 mt-1 rounded-full
                                            object-fit
                                             '
                                        />
                                        <div className="flex font-['Poppins'] font-medium text-white mt-1 gap-2 ">
                                            <span>
                                                {
                                                    user.firstName ? user.firstName : 'FirstName'
                                                }
                                            </span>
                                            <span>
                                                {
                                                    user.surname ? user.surname : 'LastName'
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <select
                                        // make it transparent
                                        className="bg-transparent font-['Poppins'] font-medium text-white self-start mt-2 outline-none w-1/2"
                                    >
                                        <option value=""></option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        id="Line"
                        className="border-solid border-[#606060] h-px shrink-0 border-t border-b-0 border-x-0"
                    />
                </div>)}

        </div>
    )
}

export default Navbar
