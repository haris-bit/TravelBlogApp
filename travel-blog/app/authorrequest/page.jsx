"use client";

import Navbar from '@app/components/navbar/Navbar';
import Sidebar from '@app/components/sidebar/Sidebar';
import React, { useState } from 'react';
import { useEffect } from 'react';

// import agree and disagree icons from react-icons
import { MdOutlineCheckCircle } from 'react-icons/md';
import { MdOutlineCancel } from 'react-icons/md';
import { toast } from "react-toastify";

const AuthorRequest = () => {
    const [agreed, setAgreed] = useState(false);
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [status, setStatus] = useState('');
    const [statusChecked, setStatusChecked] = useState(false);


    const [user, setUser] = useState({});

    // get email from local storage and set it to the email state variable
    useEffect(() => {
        const userEmail = window.localStorage.getItem('userEmail');
        setEmail(userEmail);
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5001/api/user/${email}`)
            .then((res) => res.json())
            .then((data) => {
                setUserId(data._id);
                setFirstName(data.firstName);
                setSurname(data.surname);
                setEmail(data.email);
                setProfileImage(data.profileImage);
            });
    }, [email]);

    useEffect(() => {
        fetch(`http://localhost:5001/api/author/${email}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setStatusChecked(true);
            });
    }, [email]);

    useEffect(() => {
        // Check if the status has been checked before executing the if statement
        if (statusChecked) {
            if (status === 'Pending') {
                toast.error("You already sent a request. Please wait for the admin to approve your request.");
                // disable the both buttons
                document.getElementById('agree').disabled = true;
                document.getElementById('disagree').disabled = true;
            }
        }
    }, [status, statusChecked]);


    const handleAgree = () => {
        try {
            // check if the user already sent a request

            // also disable the both buttons
            document.getElementById('agree').disabled = true;
            document.getElementById('disagree').disabled = true;
            fetch('http://localhost:5001/api/author/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    firstName: firstName,
                    surname: surname,
                    email: email,
                    profileImage: profileImage,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                }
                );
            toast.success("Your request has been sent to the admin for approval");
        }
        catch (err) {
            toast.error("You already sent a request. Please wait for the admin to approve your request.");
        }
    };

    const handleDisagree = () => {
        alert('Your request has been cancelled');
        document.getElementById('agree').disabled = true;
        document.getElementById('disagree').disabled = true;
        // go back to the home page
        window.location.href = '/';
    };



    return (
        <div className='flex flex-col w-full h-full mt-20 mb-20 '>
            <Navbar />
            <div className='flex flex-row w-full h-full'>
                {/* <Sidebar /> */}
                <div className=' w-full flex flex-col items-center justify-center p-8
                ml-40 mr-40 bg-white rounded-2xl shadow-md gap-4
                '>
                    <h1 className='text-4xl font-bold mb-6'>Terms and Conditions</h1>
                    <div className='max-w-prose text-justify mb-6'>
                        <p className='mb-12'>
                            Welcome to Roam Epic’s community of authors! By choosing to contribute to our blog, you agree to adhere to the following terms and conditions. Please read them carefully before submitting any content to our platform.
                        </p>
                        <p
                            className='mb-3'
                        >
                            1. Acceptance of Terms: By submitting content to Roam Epic, you agree to abide by these terms and conditions, as well as our Author Policy and Privacy Policy.
                        </p>

                        <hr />

                        <p>
                            2. Content Submission and Ownership:
                            <br /><br />
                            You assert that you are the original creator of the content submitted and hold all necessary rights to the material.
                            <br /><br />
                            While you retain ownership of your content, you grant Roam Epic a non-exclusive, royalty-free license to use, edit, modify, publish, and distribute your content.
                            <br /><br />
                            Roam Epic reserves the right to remove or not publish any content at our discretion.
                        </p>

                        <hr />

                        <p className='mt-5' >
                            3. Content Guidelines:
                            Your content must adhere to the allowed content guidelines outlined in our Author Policy.
                            Content that falls under the ‘Not Allowed’ categories will not be accepted.
                        </p>

                        <hr />

                        <p
                            className='mt-3'
                        >
                            4. No Compensation:
                            Contributions to Roam Epic are voluntary. Unless otherwise agreed in writing, there is no financial compensation for submitted content.
                        </p>

                        <hr />

                        <p
                            className='mt-3'
                        >
                            5. Responsibility for Content:
                            You are solely responsible for the content you submit. This includes accuracy, legality, and adherence to our guidelines.
                            Roam Epic is not liable for any errors, inaccuracies, or consequences arising from your content.
                        </p>

                        <hr />

                        <p
                            className='mt-3'
                        >
                            6. User Conduct:
                            You agree to conduct yourself in a respectful and lawful manner when interacting with our community and using our platform.
                        </p>

                        <hr />

                        <p
                            className='mt-3'
                        >
                            7. Copyright and Intellectual Property:
                            You agree not to infringe on the intellectual property rights of others. Plagiarism, unauthorized use of copyrighted materials, or any form of intellectual property theft will not be tolerated.
                        </p>

                        <hr />

                        <p
                            className='mt-3'
                        >
                            8. Termination and Suspension:
                            Roam Epic reserves the right to terminate or suspend your author privileges if you violate these terms or our policies.
                        </p>

                        <hr />

                        <p
                            className='mt-3'
                        >
                            9. Amendments:
                            These terms and conditions can be amended at any time. Continued use of the platform after such amendments constitutes your consent to the changes.
                        </p>

                        <hr />

                        <p
                            className='mt-3'
                        >
                            10. Governing Law:
                            These terms and conditions are governed by [applicable law/country’s law].
                        </p>

                        <hr />

                        <p
                            className='mt-12'
                        >
                            Acknowledgment and Agreement: By submitting content to Roam Epic, you acknowledge that you have read, understood, and agreed to these terms and conditions.
                        </p>

                    </div>
                    <div className='mt-8'>
                        <button
                            className='bg-blue-500 text-white px-6 py-3 mr-4 rounded hover:bg-blue-600 focus:outline-none'
                            onClick={handleAgree}
                            id='agree'
                        >
                            Agree and Apply
                            <MdOutlineCheckCircle className='inline-block ml-2' />
                        </button>
                        <button
                            className='bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 focus:outline-none'
                            onClick={handleDisagree}
                            id='disagree'
                        >
                            Disagree
                            <MdOutlineCancel className='inline-block ml-2' />
                        </button>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default AuthorRequest;
