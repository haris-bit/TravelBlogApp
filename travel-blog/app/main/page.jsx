// import Profile from '@app/profile/page';
import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
import PostForm from '../components/postcreate/PostForm'


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
                <PostForm />
            </div>
        </div>
    )
}

export default MainPage