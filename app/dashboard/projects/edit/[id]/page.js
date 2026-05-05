"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/lib/api";

export default function EditProject() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    liveLink: "",
    githubLink: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch project safely
  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await API.get("/projects");
        const project = res.data.data.find((p) => p._id === id);

        if (project) {
          setForm({
            title: project.title,
            description: project.description,
            liveLink: project.liveLink || "",
            githubLink: project.githubLink || "",
          });

          setPreview(project.image?.url || null);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchProject();
  }, [id]);

  // 🔥 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔥 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (image) {
        formData.append("image", image);
      }

      await API.put(`/projects/${id}`, formData);

      router.push("/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      
      <div className="w-full max-w-2xl p-6 rounded-2xl 
                      bg-white/10 backdrop-blur-xl 
                      border border-white/20 shadow-lg">

        {/* HEADER */}
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          ✏️ Edit Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* IMAGE PREVIEW */}
          {preview && (
            <div className="w-full h-44 rounded-lg overflow-hidden border border-white/20">
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* TITLE */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project Title"
            className="w-full p-2 rounded bg-white/10 border border-white/20 text-white 
                       focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Project Description"
            rows={4}
            className="w-full p-2 rounded bg-white/10 border border-white/20 text-white 
                       focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
          />

          {/* LIVE LINK */}
          <input
            name="liveLink"
            value={form.liveLink}
            onChange={handleChange}
            placeholder="Live Link"
            className="w-full p-2 rounded bg-white/10 border border-white/20 text-white 
                       focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
          />

          {/* GITHUB LINK */}
          <input
            name="githubLink"
            value={form.githubLink}
            onChange={handleChange}
            placeholder="GitHub Link"
            className="w-full p-2 rounded bg-white/10 border border-white/20 text-white 
                       focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
          />

          {/* FILE INPUT */}
          <input
            type="file"
            onChange={handleImageChange}
            className="text-sm text-gray-300"
          />

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-2
                       bg-blue-500 hover:bg-blue-600
                       text-white py-2 rounded-lg font-medium
                       transition-all duration-200
                       disabled:opacity-60"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Updating..." : "Update Project"}
          </button>

        </form>
      </div>
    </div>
  );
}