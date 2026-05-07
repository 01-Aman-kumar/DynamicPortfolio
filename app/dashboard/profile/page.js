"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    title: "",
    bio: "",
    profileImage: null,
    preview: "",
    github: "",
    linkedin: "",
    resumeUrl: "",
    theme: "dark",
  });

  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile/me");
      const data = res.data;

      setForm({
        name: data.name || "",
        title: data.title || "",
        bio: data.bio || "",
        profileImage: null,
        preview: data.profileImage?.url || "",
        github: data.socialLinks?.github || "",
        linkedin: data.socialLinks?.linkedin || "",
        resumeUrl: data.resumeUrl || "",
        theme: data.theme || "dark",
      });
    } catch {}
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key !== "preview" && key !== "profileImage") {
          formData.append(key, value);
        }
      });

      if (form.profileImage) {
        formData.append("image", form.profileImage);
      }

      await API.post("/profile", formData);

      let res = await API.get("profile/me");
      let username = res.data.user.username;
      toast.success("Profile saved successfully");
      router.push(`/portfolio/${username}`);
      
    } catch {
      toast.error("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="profile-ui min-h-screen text-white p-4 md:p-10 bg-gradient-to-br from-black via-gray-900 to-gray-800">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold">
          Profile Settings
        </h2>
        <p className="text-gray-400 text-sm">
          Update your personal information
        </p>
      </motion.div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-card max-w-4xl mx-auto"
      >

        {/* IMAGE */}
        <div className="flex items-center gap-5 mb-6">
          <div className="relative">
            <img
              src={form.preview || "/placeholder.png"}
              className="w-20 h-20 rounded-full object-cover border border-white/20"
            />
            <label className="absolute bottom-0 right-0 bg-blue-500 px-2 py-1 text-xs rounded-full cursor-pointer">
              ✏️
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setForm({
                      ...form,
                      profileImage: file,
                      preview: URL.createObjectURL(file),
                    });
                  }
                }}
              />
            </label>
          </div>

          <div>
            <p className="text-sm text-gray-400">Profile Image</p>
            <p className="text-xs text-gray-500">Click to change</p>
          </div>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Input label="Full Name" value={form.name} onChange={(v)=>setForm({...form,name:v})}/>
          <Input label="Title" value={form.title} onChange={(v)=>setForm({...form,title:v})}/>
          <Input label="GitHub" value={form.github} onChange={(v)=>setForm({...form,github:v})}/>
          <Input label="LinkedIn" value={form.linkedin} onChange={(v)=>setForm({...form,linkedin:v})}/>
          {/* <Input label="Resume URL" value={form.resumeUrl} onChange={(v)=>setForm({...form,resumeUrl:v})}/> */}

          <div>
            <label className="p-label">Theme</label>
            <select
  className="p-input bg-gray-700 text-white border border-gray-600"
  value={form.theme}
  onChange={(e) => setForm({ ...form, theme: e.target.value })}
>
  <option value="dark" className="bg-gray-700 text-white">
    Dark
  </option>
  <option value="light" className="bg-gray-700 text-white">
    Light
  </option>
  <option value="blue" className="bg-gray-700 text-white">
    Blue
  </option>
  <option value="green" className="bg-gray-700 text-white">
    Green
  </option>
</select>
          </div>

        </div>

        {/* BIO */}
        <div className="mt-5">
          <label className="p-label">Bio</label>
          <textarea
            className="p-input min-h-[100px]"
            value={form.bio}
            onChange={(e)=>setForm({...form,bio:e.target.value})}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium transition"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>

      </motion.div>
    </div>
  );
}

/* COMPONENT */
function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="p-label">{label}</label>
      <input
        className="p-input"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      />
    </div>
  );
}