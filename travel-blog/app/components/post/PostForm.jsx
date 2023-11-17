import React from "react";
import { useState } from "react";
import { AiOutlineSend, AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/navigation";

const PostForm = () => {
    const [postText, setPostText] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new post here

        router.push("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md p-8">
                    <h1 className="text-2xl font-bold">Create a Post</h1>
                    <textarea
                        className="w-full h-40 resize-none border border-gray-300 focus:border-gray-400 rounded p-2"
                        placeholder="Type to create a post..."
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                    />
                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                            onClick={handleSubmit}
                        >
                            Post
                            <AiOutlineSend className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
