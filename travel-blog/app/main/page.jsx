// import Profile from '@app/profile/page';
import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
import PostForm from '../components/postcreate/PostForm'
import SinglePost from '@app/singlepost/page'


const MainPage = () => {
    return (
        <div
            className='flex flex-col w-full min-h-screen bg-[#F4F4F4]'
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