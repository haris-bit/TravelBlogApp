"use client";
import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
import PostForm from '../components/postcreate/PostForm'
import SinglePost from '@app/singlepost/page'
import { useSearchParams } from 'next/navigation';


const MainPage = () => {

    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    return (
        <div
            className='flex flex-col w-full min-h-screen bg-[#F4F4F4] text-black '
        >
            <Navbar />
            <div
                className='flex flex-row w-full h-full'
            >
                <Sidebar />
                <div
                    className='flex flex-col w-full h-full'
                >
                    <PostForm />
                    <SinglePost />
                    <SinglePost />
                    <SinglePost />


                </div>
            </div>
        </div>
    )
}

export default MainPage