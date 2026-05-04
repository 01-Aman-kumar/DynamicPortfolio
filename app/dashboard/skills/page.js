"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { motion } from "framer-motion";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    name: "",
    level: 50,
    category: "general",
  });

  const fetchSkills = async () => {
    const res = await API.get("/skills");
    setSkills(res.data);
  };

  const handleAdd = async () => {
    if (!form.name) return alert("Skill name required");

    await API.post("/skills", form);
    setForm({ name: "", level: 50, category: "general" });
    fetchSkills();
  };

  const handleDelete = async (id) => {
    await API.delete(`/skills/${id}`);
    fetchSkills();
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // 🎨 RANDOM COLORS FOR PROGRESS
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-cyan-500",
  ];

  return (
    <div className="relative min-h-screen text-white p-6 md:p-10">

      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">Skills</h2>

      {/* FORM */}
      <div className="mb-8 p-6 rounded-2xl 
                      bg-white/10 backdrop-blur-xl 
                      border border-white/20 shadow-lg">

        <div className="grid md:grid-cols-3 gap-4">

          <Input
            placeholder="Skill name"
            value={form.name}
            onChange={(v) =>
              setForm({ ...form, name: v })
            }
          />

          <Input
            type="number"
            placeholder="Level (1–100)"
            value={form.level}
            onChange={(v) =>
              setForm({ ...form, level: v })
            }
          />

          <Input
            placeholder="Category"
            value={form.category}
            onChange={(v) =>
              setForm({ ...form, category: v })
            }
          />
        </div>

        <button
          onClick={handleAdd}
          className="mt-4 bg-blue-500 hover:bg-blue-600 
                     px-5 py-2 rounded-lg font-medium transition"
        >
          Add Skill
        </button>
      </div>

      {/* SKILLS CONTAINER (SINGLE BOX) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 rounded-2xl 
                   bg-white/10 backdrop-blur-xl 
                   border border-white/20 shadow-lg w-full max-w-2xl "
      >
        {skills.length > 0 ? (
          <div className="space-y-5">
            {skills.map((s, index) => (
              <div key={s._id}>

                {/* TOP ROW */}
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-gray-400">
                      {s.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">
                      {s.level}%
                    </span>

                    <button
                      onClick={() => handleDelete(s._id)}
                      className="text-red-400 text-sm hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      colors[index % colors.length]
                    }`}
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            No skills added yet 🚀
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ================= INPUT ================= */

function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded-lg 
                 bg-white/10 border border-white/20 
                 focus:border-blue-500 outline-none"
    />
  );
}