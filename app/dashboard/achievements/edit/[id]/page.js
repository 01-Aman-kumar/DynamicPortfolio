"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/lib/api";

export default function EditAchievement() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch achievement
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await API.get("/achievements");
        const item = res.data.find((a) => a._id === id);

        if (item) {
          setForm({
            title: item.title,
            description: item.description,
            date: item.date?.substring(0, 10) || "",
          });

          setPreview(item.image?.url);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  // 🔥 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔥 Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("date", form.date);

      if (image) {
        formData.append("image", image);
      }

      await API.put(`/achievements/${id}`, formData);

      router.push("/dashboard/achievements");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">

      <div className="w-full max-w-xl p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">

        <h2 className="text-xl text-white mb-4 text-center">
          ✏️ Edit Achievement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* IMAGE */}
          {preview && (
            <div className="h-40 rounded overflow-hidden border border-white/20">
              <img src={preview} className="w-full h-full object-cover" />
            </div>
          )}

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
          />

          <input
            type="file"
            onChange={handleImageChange}
            className="text-gray-300"
          />

          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 
                       bg-blue-500 hover:bg-blue-600 
                       text-white py-2 rounded 
                       disabled:opacity-60"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Updating..." : "Update"}
          </button>

        </form>
      </div>
    </div>
  );
}