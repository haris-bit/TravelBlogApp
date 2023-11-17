import React from 'react'
import Profile from './profile/page'
import UserNavbar from './usernav/page'

const User = () => {
    return (
        <div
            className='mt-16 ml-[300px]  h-full bg-[#F4F4F4] '
        >
            <UserNavbar />
            <Profile />
        </div>
    )
}

export default User