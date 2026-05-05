"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  User,
  Folder,
  Brain,
  GraduationCap,
  Trophy,
  Menu,
  X,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user, loading } = useAuth();

  // 🔐 STRICT AUTH GUARD
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // 🔥 replace (not push)
    }
  }, [user, loading]);

  // ⛔ BLOCK RENDER COMPLETELY
  if (loading) {
    return <div className="text-white p-6">Checking auth...</div>;
  }

  if (!user) {
    return null; // 🔥 DO NOT render anything
  }

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/projects", label: "Projects", icon: Folder },
    { href: "/dashboard/skills", label: "Skills", icon: Brain },
    { href: "/dashboard/education", label: "Education", icon: GraduationCap },
    { href: "/dashboard/achievements", label: "Achievements", icon: Trophy },
  ];

  return (
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden">

      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white/5 border-r border-white/10 p-6">
        <h2 className="text-xl font-bold mb-8">
          <Link href="/">
            Dev<span className="text-blue-400">Portfolio</span>
          </Link>
        </h2>

        <nav className="space-y-2">
          {links.map((link) => (
            <SidebarLink
              key={link.href}
              {...link}
              active={pathname === link.href}
            />
          ))}
        </nav>
      </aside>

      {/* MOBILE SIDEBAR */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <aside className="w-64 bg-[#020617] p-6 border-r border-white/10">
            <div className="flex justify-between mb-8">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-2">
              {links.map((link) => (
                <SidebarLink
                  key={link.href}
                  {...link}
                  active={pathname === link.href}
                  onClick={() => setOpen(false)}
                />
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="flex justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>

          <h1 className="font-semibold">
            {pathname.split("/").pop()?.toUpperCase() || "DASHBOARD"}
          </h1>

          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            {user?.username?.[0]?.toUpperCase() || "A"}
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}


// ================= COMPONENT =================

function SidebarLink({ href, label, icon: Icon, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg
        ${active ? "bg-blue-500/20 text-blue-400" : "hover:bg-white/10"}`}
    >
      <Icon size={18} />
      {label}
    </Link>
  );
}