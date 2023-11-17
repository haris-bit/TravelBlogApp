"use client";
import Link from "next/link";

const UserNavbar = () => {
    return (
        <nav className="flex justify-between mt-12 ml-12 w-full h-20">
            <ul className="flex space-x-12">
                <Link href="/profile">
                    <span className="text-gray-700 hover:text-gray-900 cursor-pointer relative">
                        <span className="border-b-4 hover:border-blue-500 pb-3 transition
                        rounded-sm
                        ">Profile</span>
                    </span>
                </Link>
                <Link href="/account">
                    <span className="text-gray-700 hover:text-gray-900 cursor-pointer relative">
                        <span className="border-b-4 hover:border-blue-500 pb-3 transition
                        rounded-sm
                        ">Account</span>
                    </span>
                </Link>
                <Link href="/security">
                    <span className="text-gray-700 hover:text-gray-900 cursor-pointer relative">
                        <span className="border-b-4 hover:border-blue-500 pb-3 transition
                        rounded-sm
                        ">Security</span>
                    </span>
                </Link>

            </ul>
        </nav>
    );
}

export default UserNavbar;
