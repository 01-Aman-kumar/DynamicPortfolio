"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/lib/api";

// TEMPLATES
import NeoGlass from "@/components/templates/NeoGlass";
import MinimalPro from "@/components/templates/MinimalPro";
import GradientX from "@/components/templates/GradientX";
import TerminalDev from "@/components/templates/TerminalDev";

export default function PortfolioPage() {
  const { username } = useParams();

  const [data, setData] = useState({
    profile: null,
    achievements: [],
    projects: [],
    skills: [],
    education: [],
  });

  const [loading, setLoading] = useState(true);

  // TEMPLATE STATE
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (!username) return;

    const fetchPortfolio = async () => {
      try {
        const res = await API.get(`/portfolio/${username}`);

        setData(res.data.data);
        setTheme(res.data.data.profile.theme);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading Profile...
      </div>
    );
  }

  // ================= TEMPLATE RENDER =================

  const renderTemplate = () => {
    switch (theme) {
      case "light":
        return <MinimalPro data={data} />;

      case "blue":
        return <GradientX data={data} />;
      case "green":
        return <TerminalDev data={data} />;

      default:
        return <NeoGlass data={data} />;
    }
  };

  return (
    <div>

      {/* ================= TEMPLATE SWITCHER ================= */}

      <div
        className="
  fixed z-[9999]
  bottom-2 right-4
  flex-row

  flex gap-3
  p-3

  bg-black/40 backdrop-blur-2xl
  border border-white/10
  shadow-2xl

  overflow-x-auto
  max-w-[92vw]
  scrollbar-hide
  "
      >

        <button
          onClick={() => setTheme("blue")}
          className={`px-2 py-1  text-xs transition cursor-pointer
          ${theme === "neo-glass"
              ? "bg-blue-500 text-white"
              : "bg-black/70 text-white border border-white/20"
            }`}
        >
          Neo Glass
        </button>

        <button
          onClick={() => setTheme("light")}
          className={`px-2 py-1  text-xs transition cursor-pointer
          ${theme === "minimal-pro"
              ? "bg-black text-white"
              : "bg-white text-black"
            }`}
        >
          Light
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`px-2 py-1  text-xs transition cursor-pointer
          ${theme === "gradient-x"
              ? "bg-blue-500 text-white"
              : "bg-black/70 text-white border border-white/20"
            }`}
        >
          Dark
        </button>

        <button
          onClick={() => setTheme("green")}
          className={`px-2 py-1  text-xs transition cursor-pointer
          ${theme === "terminal-dev"
              ? "bg-green-500 text-black"
              : "bg-black text-green-400 border border-green-500/30"
            }`}
        >
          Terminal Dev
        </button>

      </div>

      {/* ================= TEMPLATE ================= */}

      {renderTemplate()}

    </div>
  );
}