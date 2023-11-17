import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'

const MainPage = () => {
    return (
        <div
            className='flex flex-col w-full h-screen bg-[#F4F4F4]'
        >
            <Navbar />
            <Sidebar />
        </div>
    )
}

export default MainPage