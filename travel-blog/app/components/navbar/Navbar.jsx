"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
// import user icon from react icons
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    const email = window.localStorage.getItem("userEmail");
    setEmail(email);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/user/${email}`
        );
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [email]);

  return (
    <div
      id="NewRootRoot"
      className="flex flex-col w-full
        fixed top-0 left-0 z-50
        "
    >
      {user && (
        <div className="bg-[#1e1e1e] flex flex-col justify-end gap-2 pt-2 ">
          <div className="flex flex-row justify-between items-center ml-2 lg:ml-10 mr-2 lg:mr-6">
            <div className="flex flex-row justify-between items-center mr-2 lg:mr-6 h-[48px]">
              <Link href="/" className="flex items-center">
                <div className="text-xl font-bold text-white">
                  <Image
                    src={"/RoamEpicLogo1.png"}
                    alt="RoamEpic"
                    className="w-auto h-16 object-contain"
                    width={222}
                    height={48}
                  />
                </div>
                <div className="text-white ml-2">Roam Epic</div>
              </Link>
            </div>

            <div className="self-start flex flex-row gap-8 w-full lg:w-[937px] items-center">
              {/* <div className="bg-[#383838] flex flex-row gap-3 w-1/2 h-12 items-center pt-2 px-5 rounded-[38px]">
                                <Image
                                    src="https://file.rendit.io/n/XqHhVu83KMJ1BsNLTOOi.svg"
                                    alt="Search"
                                    id="Search"
                                    className="w-6 shrink-0"
                                    width={24}
                                    height={24}
                                />
                                <div className="font-['Poppins'] font-medium text-[#9c9c9c] self-start w-full">
                                    <input
                                        type="text"
                                        placeholder="Search TravelBlog"
                                        className="bg-[#383838] font-['Poppins'] font-medium text-[#9c9c9c] self-start mt-2 outline-none "
                                    />
                                </div>
                            </div> */}
              {email ? (
                <div className="self-start flex flex-row gap-6 w-2/5 items-center ml-auto">
                  <div className="ml-32 bg-[#383838] self-start flex flex-row gap-20 w-[274px] h-12 pt-2 px-2 rounded-[26.5px]">
                    <div className="self-start flex flex-row mt-px gap-4 w-full items-start">
                      <Image
                        src={user.profileImage}
                        alt={`user.firstName`}
                        width={15}
                        height={15}
                        className="text-white w-6 h-6 ml-2 mt-1 rounded-full
                                            object-fit
                                             "
                      />
                      <div className="flex font-['Poppins'] font-medium text-white mt-1 gap-2 ">
                        <span>
                          {user.firstName ? user.firstName : "FirstName"}
                        </span>
                        <span>{user.surname ? user.surname : "LastName"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // show login button
                <button
                  className="bg-blue-500 flex flex-row gap-4 w-[174px] h-12 px-2 rounded-[26.5px] ml-56
                                            text-white justify-center items-center text-center
                                            hover:bg-blue-600 ml-auto
                                        "
                >
                  <Link
                    href="/login"
                    className="flex flex-row gap-4 w-full h-full items-center justify-center text-center"
                  >
                    Login
                  </Link>
                </button>
              )}
            </div>
          </div>
          <div
            id="Line"
            className="border-solid border-[#606060] h-px shrink-0 border-t border-b-0 border-x-0"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
