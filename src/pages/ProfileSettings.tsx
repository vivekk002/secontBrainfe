import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useToast } from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../icons/ProfileIcon";

const ProfileSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/me`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      if (res.data.user) {
        const u = res.data.user;
        setName(u.name || "");
        setEmail(u.email || "");
        setBio(u.bio || "");
        setPreviewImage(u.profilePicture || null);

        if (u.profilePicture) {
          localStorage.setItem("profilePicture", u.profilePicture);
          window.dispatchEvent(new Event("profileUpdated"));
        }
      }
    } catch (e) {
      console.error("Failed to fetch profile", e);
      const storedName = localStorage.getItem("user");
      if (storedName) setName(storedName);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("bio", bio);
      if (selectedFile) {
        formData.append("profilePicture", selectedFile);
      }

      const res = await axios.put(`${BACKEND_URL}/update`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (res.data.user) {
        showToast("Profile updated successfully!", "success");
        localStorage.setItem("user", res.data.user.name);
        if (res.data.user.profilePicture) {
          localStorage.setItem("profilePicture", res.data.user.profilePicture);
        }
        window.dispatchEvent(new Event("profileUpdated"));
      }
    } catch (error: any) {
      console.error("Update error", error);
      showToast(
        error.response?.data?.error || "Failed to update profile",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex flex-col">
      <div className="bg-white shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-purple-600 transition-colors duration-150"
          >
            &larr; Back
          </button>
          <h1 className="text-xl font-bold">Profile Settings</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {loading ? (
            <div className="text-center py-10">Loading profile...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center gap-4 mb-6">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center group-hover:border-purple-500 transition-colors">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ProfileIcon size="lg" className="text-gray-400" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-xs font-medium">
                      Change
                    </span>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <p className="text-sm text-gray-500">
                  Click to upload a new photo.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none min-h-[100px]"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className={`px-8 py-3 text-lg bg-purple-600 text-white hover:bg-purple-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${
                    saving ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
