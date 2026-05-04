"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import Link from "next/link";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    education: 0,
    achievements: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, skills, education, achievements] =
          await Promise.all([
            API.get("/projects"),
            API.get("/skills"),
            API.get("/education"),
            API.get("/achievements"),
          ]);
          console.log(projects, skills, education, achievements);

        setStats({
          projects: projects.data.data.length,
          skills: skills.data.length,
          education: education.data.length,
          achievements: achievements.data.length,
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="text-white p-6 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Welcome Admin 👋</h1>
        <p className="text-gray-400 mt-1">
          Manage and update your portfolio content.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard title="Projects" value={stats.projects} />
        <StatCard title="Skills" value={stats.skills} />
        <StatCard title="Education" value={stats.education} />
        <StatCard title="Achievements" value={stats.achievements} />
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-xl mb-4">Quick Actions</h2>

        <div className="grid md:grid-cols-4 gap-4">
          <ActionCard href="/dashboard/profile" label="Edit Profile" />
          <ActionCard href="/dashboard/projects" label="Add Project" />
          <ActionCard href="/dashboard/skills" label="Add Skill" />
          <ActionCard href="/dashboard/education" label="Add Education" />
        </div>
      </div>

      {/* INFO PANEL */}
      <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
        <h3 className="text-lg font-semibold mb-2">Tips</h3>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Add at least 2–3 projects for better impact</li>
          <li>• Keep skills updated with realistic levels</li>
          <li>• Add achievements with images</li>
          <li>• Upload your resume in profile section</li>
        </ul>
      </div>

    </div>
  );
}


// ================= COMPONENTS =================

function StatCard({ title, value }) {
  return (
    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}

function ActionCard({ href, label }) {
  return (
    <Link
      href={href}
      className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:scale-[1.02] transition text-center"
    >
      {label}
    </Link>
  );
}