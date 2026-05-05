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
    if (!form.institution || !form.degree) return;

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
    <div className="edu-ui min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-4 md:p-6 overflow-x-hidden">

      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        🎓 Education
      </h2>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* FORM */}
        <div className="edu-card">
          <h3 className="text-lg font-semibold mb-4">Add Education</h3>

          <div className="space-y-3">
            <input
              className="edu-input"
              placeholder="Institution"
              value={form.institution}
              onChange={(e) =>
                setForm({ ...form, institution: e.target.value })
              }
            />

            <input
              className="edu-input"
              placeholder="Degree"
              value={form.degree}
              onChange={(e) =>
                setForm({ ...form, degree: e.target.value })
              }
            />

            <input
              className="edu-input"
              placeholder="Field of Study"
              value={form.fieldOfStudy}
              onChange={(e) =>
                setForm({ ...form, fieldOfStudy: e.target.value })
              }
            />

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="date"
                className="edu-input"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
              />
              <input
                type="date"
                className="edu-input"
                value={form.endDate}
                onChange={(e) =>
                  setForm({ ...form, endDate: e.target.value })
                }
              />
            </div>

            <button
              onClick={handleAdd}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium transition"
            >
              + Add Education
            </button>
          </div>
        </div>

        {/* INFO PANEL */}
        <div className="edu-card flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-3">
              📘 About Section
            </h3>

            <p className="text-sm text-gray-300">
              Manage your education dynamically. This section updates your
              portfolio instantly and helps recruiters understand your academic background.
            </p>

            <ul className="mt-4 text-sm text-gray-400 space-y-2">
              <li>✔ Add unlimited entries</li>
              <li>✔ Real-time updates</li>
              <li>✔ Clean portfolio display</li>
            </ul>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Tip: Keep latest education on top 🚀
          </p>
        </div>

      </div>

      {/* LIST */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          📚 Your Education
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
          {data.map((edu) => (
            <div key={edu._id} className="edu-card">
              <h3 className="text-lg font-semibold break-words">
                {edu.institution}
              </h3>

              <p className="text-blue-400 break-words">
                {edu.degree}
              </p>

              <p className="text-sm text-gray-400 break-words">
                {edu.fieldOfStudy}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {new Date(edu.startDate).getFullYear()} -{" "}
                {edu.endDate
                  ? new Date(edu.endDate).getFullYear()
                  : "Present"}
              </p>

              <button
                onClick={() => handleDelete(edu._id)}
                className="mt-2 text-red-400 hover:text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}