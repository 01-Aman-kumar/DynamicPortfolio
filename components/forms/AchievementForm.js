"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function AchievementForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!form.title) return alert("Title is required");

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("date", form.date);

      if (image) {
        formData.append("image", image);
      }

      await API.post("/achievements", formData);

      setForm({ title: "", description: "", date: "" });
      setImage(null);
      setPreview(null);

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to add achievement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 mb-6">

      <h3 className="text-lg text-white mb-4 font-semibold">
        ➕ Add Achievement
      </h3>

      {preview && (
        <div className="w-full h-40 mb-3 rounded overflow-hidden border border-white/20">
          <img src={preview} className="w-full h-full object-cover" />
        </div>
      )}

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 mb-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 mb-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-2 mb-2 rounded bg-white/10 border border-white/20 text-white"
      />

      <input
        type="file"
        onChange={handleImageChange}
        className="text-sm text-gray-300 mb-3"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 
                   bg-blue-500 hover:bg-blue-600 
                   text-white py-2 rounded-lg transition 
                   disabled:opacity-60"
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        )}
        {loading ? "Adding..." : "Add Achievement"}
      </button>
    </div>
  );
}