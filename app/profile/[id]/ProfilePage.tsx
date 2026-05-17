"use client";

import { getAllUsers } from "@/redux/calls/usersCalls";
import { AppDispatch, RootState } from "@/redux/store";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = ({ id }: { id: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { user: authUser } = useSelector((state: RootState) => state.auth);
    const { users } = useSelector((state: RootState) => state.users);

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const userProfile = users.find((u) => u._id === id);

    const isOwner = authUser?.id === userProfile?._id;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpdateUser = async () => {
        if (!userProfile) return;

        const formData = new FormData();

        if (image) {
            formData.append("image", image);
        }

        console.log("Updating user...", userProfile._id);
        // await dispatch(updateUser({ id: userProfile._id, data: formData }));
    };

    if (!userProfile) return null;

    return (
        <div className="flex items-center gap-4 p-4 border rounded-lg">

            {/* صورة */}
            <div className="relative">
                <img
                    src={preview || userProfile.image?.url || "/default-avatar.png"}
                    alt="user avatar"
                    className="w-16 h-16 rounded-full object-cover cursor-pointer"
                    onClick={() => isOwner && fileInputRef.current?.click()}
                />

                <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            {/* بيانات */}
            <div className="flex flex-col gap-2">

                <div>
                    <h2 className="font-bold">{userProfile.username}</h2>
                    <p className="text-sm text-gray-500">{userProfile.email}</p>
                </div>
                <div>
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${userProfile.isAdmin
                            ? "bg-red-500 text-white"
                            : "bg-green-500  text-white"
                            }`}
                    >
                        {userProfile.isAdmin ? "Admin" : "User"}
                    </span>
                </div>

                {/* الأزرار (فقط للمالك) */}
                {isOwner && (
                    <div className="flex gap-2">

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
                        >
                            Change Image
                        </button>

                        <button
                            onClick={handleUpdateUser}
                            disabled={!image}
                            className={`
                px-3 py-1 text-sm rounded text-white
                ${image ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"}
              `}
                        >
                            Update User
                        </button>

                    </div>
                )}
            </div>

            {isOwner && (<div className="flex items-center gap-3 flex-wrap">
              <Link href={`/profile/update-user/${userProfile?._id}`} >
                <button
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                >
                    <Pencil size={12} />
                    Update
                </button>
              </Link>
                <button
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                    <Trash2 size={12} />
                    Delete
                </button>
               
            </div>)}
        </div>
    );
};

export default Profile;