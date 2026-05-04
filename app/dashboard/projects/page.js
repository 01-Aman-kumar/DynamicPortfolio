"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import ProjectForm from "@/components/forms/ProjectForm";
import ProjectCard from "@/components/dashboard/ProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await API.get("/projects");

      // ✅ handle backend format { success, data }
      setProjects(res.data.data || []);
    } catch (error) {
      console.error("Error fetching projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="text-gray-400">
          Manage your portfolio projects
        </p>
      </div>

      

      {/* CONTENT */}
      {loading ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-40 rounded-xl bg-white/10 animate-pulse"
            />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard
              key={p._id}
              project={p}
              refresh={fetchProjects}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p>No projects yet 🚀</p>
          <p className="text-sm mt-2">
            Add your first project to showcase your work
          </p>
        </div>
      )}
      {/* FORM */}
      <div className="mt-8 p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
        <h3 className="text-lg mb-4">Add New Project</h3>
        <ProjectForm onSuccess={fetchProjects} />
      </div>

    </div>
  );
}