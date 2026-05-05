"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
export default function DashboardHome() {
  const { user} = useAuth();
  const [data, setData] = useState({
    stats: null,
    projects: [],
    skills: [],
  });
  const [loading, setLoading] = useState(true);

  

useEffect(() => {
  if (!user) return; // ✅ only check user

  const fetchAll = async () => {
    try {
      setLoading(true);

      const [projectsRes, skillsRes, educationRes, achievementsRes] =
        await Promise.all([
          API.get("/projects"),
          API.get("/skills"),
          API.get("/education"),
          API.get("/achievements"),
        ]);

      const projects = projectsRes.data.data || [];
      const skills = skillsRes.data || [];

      setData({
        stats: {
          projects: projects.length,
          skills: skills.length,
          education: educationRes.data.length,
          achievements: achievementsRes.data.length,
        },
        projects: projects.slice(0, 3),
        skills: skills.sort((a, b) => b.level - a.level).slice(0, 5),
      });

    } catch (err) {
      if (err.response?.status === 401) return;
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchAll();
}, [user]); // ✅ only user

  if (loading) {
    return <div className="p-6 text-white">Loading dashboard...</div>;
  }

  return (
    
      <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400">Welcome back 👋</p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Projects" value={data.stats.projects} icon="📁" />
        <StatCard title="Skills" value={data.stats.skills} icon="🧠" />
        <StatCard title="Education" value={data.stats.education} icon="🎓" />
        <StatCard title="Achievements" value={data.stats.achievements} icon="🏆" />
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* RECENT PROJECTS */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Projects</h2>
            <Link href="/dashboard/projects" className="text-sm text-blue-400">
              View all
            </Link>
          </div>

          {data.projects.length > 0 ? (
            <div className="space-y-4">
              {data.projects.map((p) => (
                <div
                  key={p._id}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {p.description}
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded">
                    <a href={p.liveLink || "#"} target="_blank" rel="noopener noreferrer">
                      Live
                    </a>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No projects yet</p>
          )}
        </div>

        {/* TOP SKILLS */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <h2 className="text-lg font-semibold mb-4">Top Skills</h2>

          {data.skills.length > 0 ? (
            data.skills.map((s) => (
              <SkillBar key={s._id} name={s.name} level={s.level} />
            ))
          ) : (
            <p className="text-gray-400 text-sm">No skills added</p>
          )}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ActionCard href="/dashboard/profile" label="Edit Profile" />
        <ActionCard href="/dashboard/projects" label="Manage Projects" />
        <ActionCard href="/dashboard/skills" label="Manage Skills" />
        <ActionCard href="/dashboard/education" label="Manage Education" />
      </div>

    </div>
    
  );
}


// COMPONENTS

function StatCard({ title, value, icon }) {
  return (
    <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <div className="flex justify-between items-center mt-2">
        <h3 className="text-2xl font-bold">{value}</h3>
        <span className="text-xl">{icon}</span>
      </div>
    </div>
  );
}

function SkillBar({ name, level }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded">
        <div
          className="h-2 bg-blue-500 rounded"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

function ActionCard({ href, label }) {
  return (
    <Link
      href={href}
      className="p-5 text-center rounded-xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition"
    >
      {label}
    </Link>
  );
}