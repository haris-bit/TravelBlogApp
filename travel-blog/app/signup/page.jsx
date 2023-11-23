"use client";

import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { GrCamera } from 'react-icons/gr';
import Image from 'next/image';

const SignUp = () => {
    const [countries, setCountries] = useState([]);
    const [firstName, setFirstName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [country, setCountry] = useState('')
    const [bio, setBio] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const [monthOfBirth, setMonthOfBirth] = useState('')
    const [dayOfBirth, setDayOfBirth] = useState('')
    const [yearOfBirth, setYearOfBirth] = useState('')

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        // console.log(file);
    };


    const handleSignUp = async () => {
        const profileImageBlob = dataURLtoBlob(profileImage);
        const formData = new FormData();

        // check if any field is empty
        if (
            firstName === '' ||
            surname === '' ||
            email === '' ||
            password === '' ||
            country === '' ||
            bio === '' ||
            monthOfBirth === '' ||
            dayOfBirth === '' ||
            yearOfBirth === '' ||
            profileImage === null
        ) {
            alert('All fields are required')
            return
        }

        // check if the bio is less than 200 characters
        if (bio.length > 200) {
            alert('Bio must be less than 200 characters')
            return
        }

        // check user has agreed to terms and conditions
        if (!document.getElementById('terms').checked) {
            alert('Please agree to terms and conditions')
            return
        }

        // check user has agreed learn more about travel blog
        if (!document.getElementById('learn-more').checked) {
            alert('Please agree to learn more about travel blog')
            return
        }

        formData.append('profileImage', profileImageBlob);
        formData.append('firstName', firstName);
        formData.append('surname', surname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('country', country);
        formData.append('bio', bio);
        formData.append('monthOfBirth', monthOfBirth);
        formData.append('dayOfBirth', dayOfBirth);
        formData.append('yearOfBirth', yearOfBirth);

        // Send request to server with FormData
        const res = await axios.post('http://localhost:5000/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // check if sign up is successful
        if (res.data.success) {
            window.location.href = '/login'
        } else {
            // show error message
            console.log(res.data.message)
            alert('Error: ' + res.data.message)
        }
    }

    // / Helper function to convert data URL to Blob
    function dataURLtoBlob(dataURL) {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }


    useEffect(() => {
        // Fetch countries from the REST Countries API
        axios.get('https://restcountries.com/v3.1/all')
            .then((response) => {
                setCountries(response.data.map((country) => country.name.common));
            })
            .catch((error) => {
                console.error('Error fetching countries:', error);
            });
    }, []);


    return (
        <div
            className='w-full min-h-screen flex flex-col justify-center items-center bg-slate-900
            text-black
            '
        >
            {/* create a card with white background and in the vertically middle */}
            <div
                className=' flex flex-col items-center  w-[474px] h-full mt-4 mb-4 mx-auto bg-white rounded-[33px] border border-solid border-[#e4e4e4] p-8'
            >
                {/* sub heading */}
                <div
                    className='text-[16px] text-black mb-2'
                >
                    Sign up to join
                </div>

                {/* main heading */}
                <div
                    className='text-[30px] font-semibold text-black mb-4'
                >
                    TravelBlog
                </div>


                {/* div for first name and surname */}
                <div
                    className='flex flex-row justify-between w-full mb-6'
                >
                    {/* first name */}
                    <div
                        className='w-[50%] mr-2'
                    >
                        <input
                            className='w-full h-[37px] rounded-[9px] border border-solid border-[#cacaca] focus:outline-none px-4'
                            type='text'
                            placeholder='First name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    {/* surname */}
                    <div
                        className='w-[50%] ml-2'
                    >
                        <input
                            className='w-full h-[37px] rounded-[9px] border border-solid border-[#cacaca] focus:outline-none px-4'
                            type='text'
                            placeholder='Surname'
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                </div>

                {/* div for email address*/}
                <div
                    className='mb-6 w-full '
                >
                    <input
                        className='w-full h-[37px] rounded-[9px] border border-solid border-[#cacaca] focus:outline-none px-4'
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* div for password*/}
                <div
                    className='mb-6 w-full '
                >
                    <input
                        className='w-full h-[37px] rounded-[9px] border border-solid border-[#cacaca] focus:outline-none px-4'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* div for country with lable country in the left side*/}
                <div
                    className='mb-6 w-full '
                >
                    <div
                        className='text-[14px] text-black mb-2'
                    >
                        Country
                    </div>

                    {/* create dropdown for country with options */}
                    <select
                        className='w-full h-[37px] rounded-[9px] border border-solid border-[#cacaca] focus:outline-none px-4
                        '
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value='Select Country'>Select Country</option>
                        {countries.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>

                </div>

                {/* Div for bio - textarea */}
                <div
                    className='mb-6 w-full '
                >

                    <div
                        className='text-[14px] text-black mb-2'
                    >
                        Biography
                    </div>
                    <div
                        className='text-[14px] text-gray-500 mb-2'
                    >
                        *It must be less than 200 characters
                    </div>
                    <textarea
                        className='w-full h-[37px] rounded-[9px] border border-solid border-[#cacaca] focus:outline-none px-4
                        resize-none
                        '
                        type='text'
                        placeholder='Enter your bio...'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>

                {/* create dropdown for date of birth with month, day and year all are dropdown and in the single line. Also add there lables like Month, Day and Year */}
                <div
                    className='mb-6 w-full flex flex-row justify-between'
                >
                    {/* month */}
                    <div
                        className='w-[40%] mr-2'
                    >
                        <div
                            className='text-[14px] text-black mb-2'
                        >
                            Month
                        </div>

                        <select
                            className='w-full h-[37px] rounded-[9px] border border-solid border-[#cacaca] focus:outline-none px-4'
                            value={monthOfBirth}
                            onChange={(e) => setMonthOfBirth(e.target.value)}
                        >
                            <option value='Month'>Month</option>
                            <option value='January'>January</option>
                            <option value='February'>February</option>
                            <option value='March'>March</option>
                            <option value='April'>April</option>
                            <option value='May'>May</option>
                            <option value='June'>June</option>
                            <option value='July'>July</option>
                            <option value='August'>August</option>
                            <option value='September'>September</option>
                            <option value='October'>October</option>
                            <option value='November'>November</option>
                            <option value='December'>December</option>
                        </select>

                    </div>


                    {/* day */}
                    <div
                        className='w-[30%] mr-2'
                    >
                        <div
                            className='text-[14px] text-black mb-2'
                        >
                            Day
                        </div>

                        <select
                            className='w-full h-[37px] rounded-[9px] border border-solid border-[#cacaca] focus:outline-none px-4'
                            value={dayOfBirth}
                            onChange={(e) => setDayOfBirth(e.target.value)}
                        >
                            <option value='Day'>Day</option>
                            {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* year */}
                    <div
                        className='w-[30%] mr-2'
                    >
                        <div
                            className='text-[14px] text-black mb-2'
                        >
                            Year
                        </div>

                        <select
                            className='w-full h-[37px] rounded-[9px] border border-solid border-[#cacaca] focus:outline-none px-4'
                            value={yearOfBirth}
                            onChange={(e) => setYearOfBirth(e.target.value)}
                        >
                            <option value='Year'>Year</option>
                            {Array.from({ length: 2023 - 1980 + 1 }, (_, index) => 1980 + index).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* div for profile image */}
                <div
                    className='w-full flex flex-col mt-2 mb-6 '
                >
                    <h2 className='mt-4'>Upload Profile Image</h2>

                    <p className='text-sm text-gray-500 mt-4'>
                        *Upload the image in the .jpg or .png format
                    </p>

                    {/* Image upload */}
                    <label htmlFor='imageUpload' className='cursor-pointer mt-4
                border border-gray-300 rounded-full w-20 h-20 flex items-center justify-center
                '>
                        {profileImage ? (
                            <Image
                                src={profileImage}
                                alt='Selected'
                                className='w-20 h-20 object-cover rounded-full'
                                width={80}
                                height={80}
                            />
                        ) : (
                            <
                                GrCamera
                            />
                        )}
                    </label>
                    <input
                        type='file'
                        name='profileImage'
                        id='imageUpload'
                        accept='image/*'
                        className='hidden'
                        onChange={handleFileChange}
                    />
                </div>


                {/* checkbox for use of terms and privacy policy */}
                <div
                    className='w-full flex flex-row items-center'
                >
                    <input
                        className='w-[20px] h-[20px] rounded-[3px] border border-solid border-[#cacaca] focus:outline-none mr-2'
                        type='radio'
                        id='learn-more'
                    />
                    <div
                        className='text-[12px] text-black mb-2 text-center mt-2'
                    >
                        Stay informed about products and services.
                        <span
                            className='text-[#008489] cursor-pointer'
                        >
                            Learn more.
                        </span>
                    </div>
                </div>

                {/* checkbox for use of terms and privacy policy */}
                <div
                    className='mb-2 w-full flex flex-row items-center'
                >
                    <input
                        className='w-[20px] h-[20px] rounded-[3px] border border-solid border-[#cacaca] focus:outline-none mr-2'
                        type='radio'
                        id='terms'
                    />
                    <div
                        className='text-[12px] text-black mb-2 text-center mt-2'
                    >
                        I have read and agree to the
                        <span
                            className='text-[#008489] cursor-pointer ml-1 mr-1'
                        >
                            Terms of Use
                        </span>
                        and
                        <span
                            className='text-[#008489] cursor-pointer ml-1 mr-1'
                        >
                            Privacy Policy
                        </span>
                    </div>
                </div>

                {/* Sign up button in the middle of the page */}
                <div
                    className='w-full flex flex-col items-center justify-center mb-2'
                >
                    <button
                        className='w-[200px] h-[40px] rounded-full bg-[#00a3e8] text-white focus:outline-none mt-4'
                        onClick={handleSignUp}
                    >
                        Sign Up
                        &raquo;
                    </button>

                    {/* alread have an account */}
                    <div
                        className='text-[12px] text-black mb-2 text-center mt-4'
                    >
                        Already have an account?

                        {/* sign in link */}

                        <Link
                            href='/login'
                        >
                            <span
                                className='text-[#00a3e8] cursor-pointer ml-1 mr-1'
                            >
                                Sign In
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp