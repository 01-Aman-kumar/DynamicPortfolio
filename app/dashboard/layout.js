"use client";

import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white/10 backdrop-blur-md p-5">
        <h2 className="text-xl mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-3">
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/achievements">Achievements</Link>
          <Link href="/dashboard/projects">Projects</Link>
          <Link href="/dashboard/skills">Skills</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}