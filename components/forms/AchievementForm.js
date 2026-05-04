"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function AchievementForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    imageUrl: "",
  });

  const handleSubmit = async () => {
    try {
      await API.post("/achievements", {
        title: form.title,
        description: form.description,
        date: form.date,
        image: {
          url: form.imageUrl,
          public_id: "manual-upload",
        },
      });

      setForm({ title: "", description: "", date: "", imageUrl: "" });
      onSuccess(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to add achievement");
    }
  };

  return (
    <div className="p-4 bg-white/10 rounded mb-6">
      <h3 className="mb-3">Add Achievement</h3>

      <input
        placeholder="Title"
        className="w-full mb-2 p-2 bg-black/40 rounded"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Description"
        className="w-full mb-2 p-2 bg-black/40 rounded"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="date"
        className="w-full mb-2 p-2 bg-black/40 rounded"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <input
        placeholder="Image URL"
        className="w-full mb-2 p-2 bg-black/40 rounded"
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="bg-white text-black px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
}