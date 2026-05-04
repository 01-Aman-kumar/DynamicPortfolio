"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function EducationPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
  });

  const fetchData = async () => {
    const res = await API.get("/education");
    setData(res.data);
  };

  const handleAdd = async () => {
    await API.post("/education", form);
    setForm({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    });
    fetchData();
  };

  const handleDelete = async (id) => {
    await API.delete(`/education/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-4">Education</h2>

      {/* FORM */}
      <div className="space-y-2 mb-6">
        <input
          placeholder="Institution"
          value={form.institution}
          onChange={(e) =>
            setForm({ ...form, institution: e.target.value })
          }
        />

        <input
          placeholder="Degree"
          value={form.degree}
          onChange={(e) =>
            setForm({ ...form, degree: e.target.value })
          }
        />

        <input
          placeholder="Field"
          value={form.fieldOfStudy}
          onChange={(e) =>
            setForm({ ...form, fieldOfStudy: e.target.value })
          }
        />

        <input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
        />

        <input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
        />

        <button onClick={handleAdd}>Add</button>
      </div>

      {/* LIST */}
      {data.map((edu) => (
        <div key={edu._id} className="p-3 bg-white/10 rounded mb-3">
          <h3>{edu.institution}</h3>
          <p>{edu.degree}</p>
          <p className="text-sm text-gray-400">
            {new Date(edu.startDate).getFullYear()} -{" "}
            {edu.endDate
              ? new Date(edu.endDate).getFullYear()
              : "Present"}
          </p>

          <button onClick={() => handleDelete(edu._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}