"use client";

import API from "@/lib/api";

export default function AchievementCard({ item, onDelete }) {
  const handleDelete = async () => {
    try {
      await API.delete(`/achievements/${item._id}`);
      onDelete();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-4 rounded bg-white/10">
      <img
        src={item.image?.url}
        alt=""
        className="w-full h-40 object-cover rounded mb-2"
      />

      <h3 className="text-lg">{item.title}</h3>
      <p className="text-gray-400">{item.description}</p>

      <button
        onClick={handleDelete}
        className="mt-3 bg-red-500 px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}