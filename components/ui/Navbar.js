"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 
                    backdrop-blur-xl bg-black/40 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold">
          <a href="/" className="hover:text-blue-400">Dev<span className="text-blue-400">Portfolio</span></a>
        </h1>

        <div className="flex gap-6 text-sm items-center">
          <Link href="/portfolio/aman" className="hover:text-blue-400">
            Portfolio
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-400">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded border border-white/20 hover:bg-white hover:text-black transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1 rounded border border-white/20 hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}