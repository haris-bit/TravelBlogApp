"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();


    const handleLogin = async () => {
      try {
        if (!email || !password) {
          toast.error("Please fill all fields");
          return;
        }
          const res = await axios.post("http://localhost:5001/login", {
            email,
            password,
          });
      
          if (res.data) {
            window.localStorage.setItem("userEmail", email);
            toast.success("Login Successful");
            router.push('/');
          } else {
            toast.error("Login failed");
          }
        } catch (err) {
          if (err.response) {
            if (err.response.status === 401) {
              toast.error("Email and Password do not match");
            } else if (err.response.status === 404) {
              toast.error("User with Email doesn't exist");
            } else {
              console.log(err);
              toast.error("An error occurred");
            }
          } else {
            console.log(err);
            toast.error("An error occurred");
          }
        }
      };





    // const handleLogin = async () => {
    //     try {
    //         const res = await axios.post("http://localhost:5001/login", {
    //             email,
    //             password,
    //         });

    //         if (res.data) {
    //             window.localStorage.setItem("userEmail", email);
    //             router.push('/');
    //         } else {
    //             alert("Login failed");
    //         }
    //     }
    //     catch (err) {
    //         if (err.response && err.response.status === 404) {
    //             alert("User not found");
    //         } else {
    //             console.log(err);
    //             alert("An error occurred");
    //         }
    //     }
    // };


    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-900 text-black">
            <div className="w-full max-w-[474px] mx-auto bg-white rounded-[33px] border border-solid border-[#e4e4e4] p-8">
                <div className="text-[30px] font-semibold text-black mb-8">
                    Login
                </div>

                <div className="text-[14px] font-normal text-black mb-6">
                    Insert your details
                </div>

                <div className="mb-6">
                    <input
                        className="w-full h-[37px] rounded-[9px] border border-solid border-[#cacaca] focus:outline-none px-4"
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <input
                        className="w-full h-[37px] rounded-[9px] border border-solid border-[#cacaca] focus:outline-none px-4"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* <p className="text-[14px] text-transparent mb-6">
                    <span className="text-black">Forgot password? </span>
                    <span className="text-[#00a3e8] cursor-pointer">Help</span>
                </p> */}

                <div className="mb-6
                flex justify-center items-center
                ">
                    <button
                        className="w-[154px] h-[54px] rounded-full bg-[#00a3e8] text-white focus:outline-none"
                        onClick={handleLogin}
                    >
                        Login
                        &raquo;
                    </button>
                </div>

                <p className="text-[14px] text-transparent flex justify-center items-center mb-6">
                    <span className="text-black mr-1">Don&apos;t have an account? </span>
                    <Link href="/signup">
                        <span className="text-[#00a3e8] cursor-pointer">Sign Up</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LogIn;