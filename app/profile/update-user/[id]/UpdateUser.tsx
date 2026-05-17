"use client";

import { useState, useEffect } from "react";
import { User, Mail, Lock, ImagePlus, Save } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/calls/usersCalls";
import { useRouter } from "next/navigation";

const UpdateUserClient = ({ id }: { id: string }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ================= INIT =================
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("username", username);
      formData.append("email", email);

      if (password.trim()) {
        formData.append("password", password);
      }

      if (image) {
        formData.append("image", image);
      }

      const res = await dispatch(
        updateUser({
          userId: id,
          userData: formData,
        })
      );

      if (updateUser.fulfilled.match(res)) {
        router.push(`/profile/${id}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Update User
        </h2>

        {/* Username */}
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password (optional)"
            className="w-full pl-10 pr-3 py-2 border rounded-lg"
          />
        </div>

        {/* Image */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer text-gray-600">
            <ImagePlus size={18} />
            <span>Upload Image</span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
            />
          </label>

          {image && (
            <p className="text-sm text-gray-500 mt-1">
              Selected: {image.name}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg disabled:opacity-50"
        >
          <Save size={18} />
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUserClient;