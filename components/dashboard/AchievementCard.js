"use client";

import API from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AchievementCard({ item, onDelete }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await API.delete(`/achievements/${item._id}`);
      onDelete();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/achievements/edit/${item._id}`);
  };

  return (
    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">

      {item.image?.url && (
        <img
          src={item.image.url}
          className="w-full h-40 object-cover rounded mb-2"
        />
      )}

      <h3 className="text-lg text-white font-semibold">{item.title}</h3>
      <p className="text-gray-400 text-sm">{item.description}</p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleEdit}
          className="bg-yellow-500/80 hover:bg-yellow-500 px-3 py-1 rounded text-sm"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500/80 hover:bg-red-500 px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}