"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // 🔥 listen for changes
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    // 🔥 manually update state
    setIsLoggedIn(false);

    // 🔥 force UI sync
    window.location.href = "/";
  };

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold">
          <Link href="/">Dev<span className="text-blue-400">Portfolio</span></Link>
        </h1>

        <div className="flex gap-6 text-sm items-center">
          <Link href="/portfolio/aman">Portfolio</Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard">Dashboard</Link>

              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded border border-white/20 hover:bg-white hover:text-black"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}