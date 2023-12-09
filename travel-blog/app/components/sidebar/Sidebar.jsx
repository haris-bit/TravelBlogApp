"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
// home icon from react-icons
import { AiFillHome } from "react-icons/ai";
import { GiProgression } from "react-icons/gi";
import { BiUserCircle } from "react-icons/bi";
// import icons for about us and help
import { FaInfoCircle } from "react-icons/fa";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BiSolidHelpCircle } from "react-icons/bi";
// logout icon from react-icons
import { RiLogoutBoxRLine } from "react-icons/ri";

import Link from "next/link";

const Sidebar = () => {

  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Track user login status

  
  
  
  useEffect(() => {
    const email = window.localStorage.getItem("userEmail");
    setLoggedIn(!!email); // Set loggedIn to true if email is present, false otherwise
  }, []);

  

  
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Initial check and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const handleLogout = () => {
    window.localStorage.removeItem("userEmail"); // Use the actual key, 'userEmail'
    window.location.href = "/login";
  };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div
      className={`flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-full bg-[#F4F4F4] border border-r border-[#D3D3D3] pl-4 pr-4 pt-4 pb-4 font-sans fixed top-16 left-0 z-50 text-black`}
    >
      {isMobile && (
        <div className="text-3xl cursor-pointer mb-4" onClick={toggleSidebar}>
          &#x2630; {/* Hamburger icon */}
        </div>
      )}

      <div
        className={`flex flex-col justify-center gap-4 ${
          isMobile && !isSidebarOpen ? "hidden" : ""
        }`}
      >
        <div>
          <Link
            href="/"
            className="flex items-center
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-4
                px-6 py-2
                cursor-pointer
                "
          >
            <AiFillHome className="text-xl" />
            <span className="text-center">Home</span>
          </Link>
        </div>

        <div>
          <Link
            href="/"
            className="flex items-center
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-4
                px-6 py-2
                cursor-pointer
                "
          >
            <GiProgression className="text-xl" />

            <span className="text-center">Popular</span>
          </Link>
        </div>
        <div>
          {/* here how can I pass the email */}
          <Link
            href="/"
            className="flex items-center 
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-4
                px-6 py-2
                cursor-pointer
                
                "
          >
            <BiUserCircle className="text-2xl" />
            <span className="text-center">Profile</span>
          </Link>
        </div>
      

      <hr className="border border-[#D3D3D3] mt-4 mb-2 " />

      <div className="mt-2 mb-2 ml-6 flex flex-col justify-center gap-4 ">
        <span className="text-xl">TOPICS</span>

        <div
          className="flex items-center 
                pl-1 py-1  
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-3
                cursor-pointer
                "
        >
          Hiking
        </div>
        <div
          className="flex items-center 
                pl-1 py-1  
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-3
                cursor-pointer
                "
        >
          Lodging and Camping
        </div>
        <div
          className="flex items-center 
                pl-1 py-1  
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-3
                cursor-pointer
                "
        >
          Food & Drink
        </div>
        <div
          className="flex items-center 
                pl-1 py-1  
                hover:bg-[#E9E9E9]
                hover:rounded-md
                gap-3
                cursor-pointer
                "
        >
          Site Seeing
        </div>
      </div>

      <hr className="border border-[#D3D3D3] mt-4 mb-2 " />

      <div className="mt-2 mb-2 ml-2 flex flex-col justify-center">
        <span
          className="text-normal flex items-center gap-2  
                hover:bg-[#E9E9E9] cursor-pointer rounded-md
                px-4 py-2
                    "
        >
          <IoDocumentText className="text-xl" />
          <p>About Us</p>
        </span>
        <span
          className="text-normal flex items-center gap-2  
                hover:bg-[#E9E9E9] cursor-pointer rounded-md
                px-4 py-2
                    "
        >
          <BiSolidHelpCircle className="text-xl" />
          Help
        </span>

        {loggedIn && (


        <Link href="/login">
          <span
            className="text-normal flex items-center gap-2  
                hover:bg-[#E9E9E9] cursor-pointer rounded-md
                px-4 py-2
                    "
            onClick={handleLogout}
          >
            <RiLogoutBoxRLine className="text-xl" />
            Log Out
          </span>
        </Link>
        )}


      </div>
      </div>

    </div>
  );
};

export default Sidebar;
