import React from 'react';
import Image from 'next/image';
import { IoDocumentText } from 'react-icons/io5';
import { BiSolidHelpCircle } from 'react-icons/bi';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="mt-32 z-100 fixed bottom-0 left-0 right-0 bg-gray-200 p-2">
            <div className="flex justify-between items-center container mx-auto">

                <div className="text-center text-gray-600">
                    &copy; 2023 Roam Epic. All rights reserved.
                </div>

                <div className="flex space-x-4">
                    <Link href="/about"
                        className="text-normal flex items-center gap-2 hover:bg-[#E9E9E9] cursor-pointer rounded-md px-4 py-2"
                    >
                        <IoDocumentText className="text-xl" />
                        About Us
                    </Link>
                    <Link
                        href="/help" className="text-normal flex items-center gap-2 hover:bg-[#E9E9E9] cursor-pointer rounded-md px-4 py-2"
                    >
                        <BiSolidHelpCircle className="text-xl" />
                        Help
                    </Link>

                    <Link href="/terms"
                        className="text-normal flex items-center gap-2 hover:bg-[#E9E9E9] cursor-pointer rounded-md px-4 py-2"
                    >
                        <RiLogoutBoxRLine className="text-xl" />
                        Log Out
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
