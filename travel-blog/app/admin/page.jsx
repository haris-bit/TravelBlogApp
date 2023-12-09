"use client";

import Navbar from '@app/components/navbar/Navbar'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import {toast} from "react-toastify"; 

const Admin = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/api/author/requests')
            .then((res) => res.json())
            .then((data) => {
                setRequests(data || []); // Set requests to an empty array if data is null
            })
            .catch((error) => {
                console.error('Error fetching author requests:', error);
            });
    }, []);

    const handleAccept = (id) => {
        fetch(`http://localhost:5001/api/author/request/approve/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data) => {
                toast.success("Author request accepted");
                window.location.reload();
            });
    };

    const handleReject = (id) => {
        fetch(`http://localhost:5001/api/author/request/reject/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data) => {
                toast.error("Author request rejected");
                window.location.reload();
            });
    };



    return (
        <div className='flex flex-col w-full h-full mt-[66px] bg-gray-100' >
            <Navbar />

            {
                requests.length > 0 ? (

                    <div className='space-y-4 p-4'>
                        {requests.map((request) => (
                            <div key={request._id} className='flex items-center bg-white rounded-md overflow-hidden shadow-md'>
                                <div className='p-4'>
                                    <Image
                                        src={request.profileImage}
                                        alt='profile image'
                                        width={50}
                                        height={50}
                                        className='rounded-full object-fit'
                                    />
                                </div>
                                <div className='flex-grow p-4'>
                                    <div>
                                        <h2 className='text-lg font-semibold'>{request.firstName} {request.surname}</h2>
                                        <p className='text-gray-600'>{request.email}</p>

                                    </div>
                                    <h2
                                        // show different colors based on different status
                                        className={`text-white rounded-md px-4 py-2 mr-2 ${request.status === 'Pending' ? 'bg-yellow-500' : request.status === 'Approved' ? 'bg-green-500' : 'bg-red-500'}`}
                                    >
                                        {request.status}
                                    </h2>
                                </div>
                                <div className='flex items-center p-4'>

                                    <button className='bg-green-500 text-white rounded-md px-4 py-2 mr-2'
                                        onClick={() => handleAccept(request._id)}
                                    >
                                        Accept
                                    </button>
                                    <button className='bg-red-500 text-white rounded-md px-4 py-2'

                                        onClick={() => handleReject(request._id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                ) : (
                    <div className='flex items-center justify-center h-full'>
                        <h2 className='text-2xl font-semibold'>No requests found</h2>
                    </div>
                )
            }
        </div>
    )
}
export default Admin;
