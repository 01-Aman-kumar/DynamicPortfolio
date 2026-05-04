"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function ProjectForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.title) return alert("Title is required");

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append(
        "techStack",
        JSON.stringify(form.techStack.split(",").map((t) => t.trim()))
      );

      if (form.image) {
        formData.append("image", form.image);
      }

      await API.post("/projects", formData);

      // reset form
      setForm({
        title: "",
        description: "",
        techStack: "",
        image: null,
      });

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Error creating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 space-y-4">

      <h3 className="text-lg font-semibold">Add Project</h3>

      {/* TITLE */}
      <input
        className="w-full p-2 rounded bg-black/40 border border-white/10"
        placeholder="Project Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      {/* DESCRIPTION */}
      <textarea
        className="w-full p-2 rounded bg-black/40 border border-white/10"
        placeholder="Project Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      {/* TECH STACK */}
      <input
        className="w-full p-2 rounded bg-black/40 border border-white/10"
        placeholder="Tech Stack (React, Node, MongoDB)"
        value={form.techStack}
        onChange={(e) =>
          setForm({ ...form, techStack: e.target.value })
        }
      />

      {/* IMAGE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        className="w-full text-sm"
        onChange={(e) =>
          setForm({ ...form, image: e.target.files[0] })
        }
      />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-medium transition disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Add Project"}
      </button>
    </div>
  );
}