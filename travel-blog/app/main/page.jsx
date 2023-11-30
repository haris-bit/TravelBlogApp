"use client";
import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
import PostFeed from '@app/feed/page';
import ProfilePreview from '@app/components/preview/ProfilePreview';


const MainPage = () => {
    return (
        <div
            className='flex flex-col w-full min-h-screen bg-[#F4F4F4] text-black '
        >
            <Navbar />
            <div
                className='flex flex-row w-full h-full'
            >
                <Sidebar
                />
                <div
                    className='flex flex-col w-full h-full'
                >
                    <ProfilePreview />
                    <PostFeed />
                </div>
            </div>
        </div>
    )
}

export default MainPage