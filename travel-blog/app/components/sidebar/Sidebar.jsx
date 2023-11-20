import React from 'react'
import Image from 'next/image'
// home icon from react-icons
import { AiFillHome } from 'react-icons/ai'
import { GiProgression } from 'react-icons/gi'
import { BiUserCircle } from 'react-icons/bi'
// import icons for about us and help
import { FaInfoCircle } from 'react-icons/fa'
import { RiQuestionAnswerLine } from 'react-icons/ri'
import { IoDocumentText } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BiSolidHelpCircle } from "react-icons/bi";
import Link from 'next/link'



const Sidebar = () => {
    return (
        <div
            className='flex flex-col w-1/5 h-full bg-[#F4F4F4]
            border border-r border-[#D3D3D3] pl-4 pr-4 pt-4 pb-4
            font-sans fixed top-16 left-0 z-50
            text-black
            '
        >

            {/* navbar links */}

            <div
                className='flex flex-col justify-center gap-4'
            >

                <div

                >
                    <Link href='/'
                        className='flex items-center
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-4
                px-6 py-2
                cursor-pointer
                '
                    >
                        <AiFillHome
                            className='text-xl'
                        />
                        <span
                            className='text-center'>
                            Home
                        </span>
                    </Link>
                </div>

                <div

                >
                    <Link href='/popular'
                        className='flex items-center
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-4
                px-6 py-2
                cursor-pointer
                '
                    >
                        <GiProgression
                            className='text-xl'
                        />

                        <span
                            className='text-center'
                        >
                            Popular
                        </span>
                    </Link>
                </div>
                <div

                >
                    <Link href='/profile'
                        className='flex items-center 
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-4
                px-6 py-2
                cursor-pointer
                '
                    >
                        <BiUserCircle
                            className='text-2xl'
                        />
                        <span
                            className='text-center' >
                            Profile
                        </span>
                    </Link>

                </div>

            </div>

            <hr
                className='border border-[#D3D3D3] mt-4 mb-2 '
            />

            <div
                className='mt-2 mb-2 ml-6 flex flex-col justify-center gap-4 '
            >
                <span
                    className='text-xl'
                >
                    TOPICS
                </span>

                <div
                    className='flex items-center 
                pl-1 py-1  
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-3
                cursor-pointer
                '
                >
                    Hiking
                </div>
                <div
                    className='flex items-center 
                pl-1 py-1  
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-3
                cursor-pointer
                '
                >
                    Lodging and Camping
                </div>
                <div
                    className='flex items-center 
                pl-1 py-1  
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-3
                cursor-pointer
                '
                >
                    Food & Drink
                </div>
                <div
                    className='flex items-center 
                pl-1 py-1  
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-3
                cursor-pointer
                '
                >
                    Site Seeing
                </div>
            </div>

            <hr
                className='border border-[#D3D3D3] mt-4 mb-2 '
            />

            <div
                className='mt-2 mb-2 ml-2 flex flex-col justify-center'
            >
                <span
                    className='text-normal flex items-center gap-2  
                hover:bg-[#E9E9E9] cursor-pointer rounded-md
                px-4 py-2
                    '
                >
                    <IoDocumentText className='text-xl' />
                    <p>
                        About Us
                    </p>
                </span>
                <span
                    className='text-normal flex items-center gap-2  
                hover:bg-[#E9E9E9] cursor-pointer rounded-md
                px-4 py-2
                    '
                >
                    <BiSolidHelpCircle className='text-xl' />
                    Help
                </span>
            </div>
        </div >
    )
}

export default Sidebar