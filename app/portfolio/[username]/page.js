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
  const [theme, setTheme] = useState("neo-glass");

  useEffect(() => {
    if (!username) return;

    const fetchPortfolio = async () => {
      try {
        const res = await API.get(`/portfolio/${username}`);

        setData(res.data.data);

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
        Loading Portfolio...
      </div>
    );
  }

  // ================= TEMPLATE RENDER =================

  const renderTemplate = () => {
    switch (theme) {
      case "minimal-pro":
        return <MinimalPro data={data} />;

      case "gradient-x":
        return <NeoGlass data={data} />;
      case "terminal-dev":
        return <TerminalDev data={data} />;

      default:
        return <GradientX data={data} />;
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
          onClick={() => setTheme("neo-glass")}
          className={`px-2 py-1  text-xs transition
          ${theme === "neo-glass"
              ? "bg-blue-500 text-white"
              : "bg-black/70 text-white border border-white/20"
            }`}
        >
          Neo Glass
        </button>

        <button
          onClick={() => setTheme("minimal-pro")}
          className={`px-2 py-1  text-xs transition
          ${theme === "minimal-pro"
              ? "bg-black text-white"
              : "bg-white text-black"
            }`}
        >
          Minimal Pro
        </button>

        <button
          onClick={() => setTheme("gradient-x")}
          className={`px-2 py-1  text-xs transition
          ${theme === "gradient-x"
              ? "bg-blue-500 text-white"
              : "bg-black/70 text-white border border-white/20"
            }`}
        >
          Gradient X
        </button>

        <button
          onClick={() => setTheme("terminal-dev")}
          className={`px-2 py-1  text-xs transition
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