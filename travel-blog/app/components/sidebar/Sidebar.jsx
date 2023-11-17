import React from 'react'
import Image from 'next/image'
// home icon from react-icons
import { AiFillHome } from 'react-icons/ai'
import { GiProgression } from 'react-icons/gi'
import { BiUserCircle } from 'react-icons/bi'

const Sidebar = () => {
    return (
        <div
            className='flex flex-col w-1/5 h-screen bg-[#F4F4F4]
            border border-r border-[#D3D3D3] pl-4 pr-4 pt-4 pb-4
            font-sans
            '
        >


            {/* navbar links */}

            <div
                className='flex flex-col justify-center gap-2'
            >

                <div
                    className='flex items-center
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-4
                px-6 py-2
                '
                >
                    <AiFillHome
                        className='text-xl'
                    />
                    <span
                        className='text-center'>
                        Home
                    </span>
                </div>

                <div
                    className='flex items-center
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-4
                px-6 py-2
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
                </div>
                <div
                    className='flex items-center 
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-4
                px-6 py-2
                '
                >
                    <BiUserCircle
                        className='text-2xl'
                    />
                    Profile
                </div>

            </div>

            <hr
                className='border border-[#D3D3D3] mt-4 mb-2 '
            />

            <div
                className='mt-2 mb-2 ml-2 flex flex-col justify-center gap-2 '
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
                '
                >
                    Site Seeing
                </div>
            </div>





        </div >
    )
}

export default Sidebar