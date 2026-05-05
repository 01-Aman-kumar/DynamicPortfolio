"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function ProjectForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    liveLink: "",
    githubLink: "",
    featured: false,
    isVisible: true,
    order: 0,
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
        JSON.stringify(
          form.techStack.split(",").map((t) => t.trim())
        )
      );

      formData.append("liveLink", form.liveLink);
      formData.append("githubLink", form.githubLink);
      formData.append("featured", form.featured);
      formData.append("isVisible", form.isVisible);
      formData.append("order", form.order);

      if (form.image) {
        formData.append("image", form.image);
      }

      await API.post("/projects", formData);

      // reset
      setForm({
        title: "",
        description: "",
        techStack: "",
        liveLink: "",
        githubLink: "",
        featured: false,
        isVisible: true,
        order: 0,
        image: null,
      });

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error creating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 space-y-4">

      <h3 className="text-lg font-semibold">Add Project</h3>

      {/* TITLE */}
      <Input
        placeholder="Project Title"
        value={form.title}
        onChange={(v) => setForm({ ...form, title: v })}
      />

      {/* DESCRIPTION */}
      <Textarea
        placeholder="Project Description"
        value={form.description}
        onChange={(v) => setForm({ ...form, description: v })}
      />

      {/* TECH STACK */}
      <Input
        placeholder="Tech Stack (React, Node, MongoDB)"
        value={form.techStack}
        onChange={(v) => setForm({ ...form, techStack: v })}
      />

      {/* LINKS */}
      <Input
        placeholder="Live Link"
        value={form.liveLink}
        onChange={(v) => setForm({ ...form, liveLink: v })}
      />

      <Input
        placeholder="GitHub Link"
        value={form.githubLink}
        onChange={(v) => setForm({ ...form, githubLink: v })}
      />

      {/* ORDER */}
      <Input
        type="number"
        placeholder="Display Order"
        value={form.order}
        onChange={(v) => setForm({ ...form, order: v })}
      />

      {/* TOGGLES */}
      <div className="flex gap-6 text-sm">

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) =>
              setForm({ ...form, featured: e.target.checked })
            }
          />
          Featured
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isVisible}
            onChange={(e) =>
              setForm({ ...form, isVisible: e.target.checked })
            }
          />
          Visible
        </label>

      </div>

      {/* IMAGE */}
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


/* ================= INPUT COMPONENTS ================= */

function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 rounded bg-black/40 border border-white/10 focus:border-blue-500 outline-none"
    />
  );
}

function Textarea({ placeholder, value, onChange }) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 rounded bg-black/40 border border-white/10 focus:border-blue-500 outline-none"
    />
  );
}