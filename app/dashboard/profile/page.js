"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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
    } catch {
      console.log("No profile yet");
    }
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
    //  const username=res.data.data;
    let res=await API.get("profile/me");

     let username= res.data.user.username;

      alert("Profile saved successfully");
      router.push(`/portfolio/${username}`);
      
      fetchProfile();
    } catch (error) {
      console.error(error);
      alert("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="relative min-h-screen text-white p-6 md:p-10">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h2 className="text-3xl font-bold">Profile Settings</h2>
        <p className="text-gray-400 mt-1">
          Update your personal information
        </p>
      </motion.div>

      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 rounded-2xl 
                   bg-white/10 backdrop-blur-xl 
                   border border-white/20 
                   shadow-lg"
      >

        {/* IMAGE UPLOAD */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <img
              src={form.preview || "/placeholder.png"}
              className="w-24 h-24 rounded-full object-cover border border-white/20"
            />

            <label className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full cursor-pointer text-xs">
              ✏️
              <input
                type="file"
                className="hidden"
                accept="image/*"
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
            <p className="text-xs text-gray-500">
              Click icon to change
            </p>
          </div>
        </div>

        {/* GRID FORM */}
        <div className="grid md:grid-cols-2 gap-6">

          <Input
            label="Full Name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />

          <Input
            label="Title"
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
          />

          <Input
            label="GitHub"
            value={form.github}
            onChange={(v) => setForm({ ...form, github: v })}
          />

          <Input
            label="LinkedIn"
            value={form.linkedin}
            onChange={(v) => setForm({ ...form, linkedin: v })}
          />

          <Input
            label="Resume URL"
            value={form.resumeUrl}
            onChange={(v) => setForm({ ...form, resumeUrl: v })}
          />

          {/* THEME */}
          <div>
            <label className="label">Theme</label>
            <select
              className="input"
              value={form.theme}
              onChange={(e) =>
                setForm({ ...form, theme: e.target.value })
              }
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>

        {/* BIO */}
        <div className="mt-6">
          <label className="label">Bio</label>
          <textarea
            className="input min-h-[100px]"
            value={form.bio}
            onChange={(e) =>
              setForm({ ...form, bio: e.target.value })
            }
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-8 w-full bg-blue-500 hover:bg-blue-600 
                     px-4 py-3 rounded-xl font-medium 
                     transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </motion.div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}