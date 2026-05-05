"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
const router = useRouter();

console.log(user)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/portfolio/all/public"); // 🔥 multi-user API
        setUsers(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleGetStarted = () => {
  if (user) {
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
};

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">

        {/* gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#020617] via-[#020617] to-black" />

        {/* grid */}
        <div/>

        {/* glow */}
        <div className="absolute -top-50 -left-37.5 w-150 h-150 bg-blue-500 rounded-full blur-[150px] opacity-20" />
        <div className="absolute -bottom-50 -right-37.5 w-150 h-150 bg-purple-500 rounded-full blur-[150px] opacity-20" />

      </motion.div>

      <Navbar />

      {/* 🚀 HERO */}
      <section className="pt-40 pb-10 text-center px-6 relative">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          Build Your <span className="text-blue-400">Developer Identity</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 max-w-xl mx-auto mb-10"
        >
          A fully dynamic portfolio platform with real-time editing, analytics,
          and modern UI — built for developers who want to stand out.
        </motion.p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
  onClick={handleGetStarted}
  className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition"
>
  Get Started
</button>

          <Link
            href="/portfolio/aman"
            className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
          >
            Live Demo
          </Link>
        </div>

        {/* 🔥 PRODUCT PREVIEW */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <img
            src="/preview.png"
            alt="Preview"
            className="rounded-xl border border-white/10 shadow-2xl w-full max-w-4xl"
          />
        </motion.div>

      </section>
      {/* 🔥 USERS SECTION */}
      <section className="max-w-6xl mx-auto px-6 ">

        <h2 className="text-3xl font-bold text-center mb-8">
          Developers
        </h2>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-10">

            {users.map((u) => (
              <div
                key={u.profile._id}
                className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-center hover:scale-[1.03] transition"
              >

                <img
                  src={u.profile.profileImage?.url}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />

                <h3 className="font-semibold text-lg">
                  {u.profile.name}
                </h3>

                <p className="text-gray-400 text-sm">
                  {u.profile.title}
                </p>

                <Link
                  href={`/portfolio/${u.profile.user.username}`}
                  className="inline-block mt-4 bg-blue-500 px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                >
                  View Portfolio
                </Link>

              </div>
            ))}

          </div>
        )}
      </section>
      <section className="max-w-6xl mx-auto px-6 mt-10">

        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

          {users
            .flatMap((u) => u.projects)
            .slice(0, 6)
            .map((p) => (
              <div
                key={p._id}
                className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-[1.03] transition"
              >

                {p.image?.url && (
                  <img
                    src={p.image.url}
                    className="rounded-lg h-40 w-full object-cover mb-3"
                  />
                )}

                <h3 className="font-semibold">{p.title}</h3>

                <div className="flex gap-4 mt-3 text-sm">

                  {p.liveLink && (
                    <a
                      href={p.liveLink}
                      target="_blank"
                      className="text-blue-400"
                    >
                      Live
                    </a>
                  )}

                  {p.githubLink && (
                    <a
                      href={p.githubLink}
                      target="_blank"
                      className="text-gray-400"
                    >
                      GitHub
                    </a>
                  )}

                </div>

              </div>
            ))}

        </div>
      </section>

      {/* ⚡ TECH STACK STRIP */}
      <section className="py-12 border-y border-white/10">
        <div className="flex justify-center gap-10 opacity-70 flex-wrap">

          <img src="/react.png" className="h-8" alt="React" />
          <img src="/next.png" className="h-8" alt="Next" />
          <img src="/node.png" className="h-8" alt="Node" />
          <img src="/mongo.png" className="h-8" alt="MongoDB" />

        </div>
      </section>

      {/* 🎯 FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">

        {[
          {
            title: "Fully Dynamic",
            desc: "Update your portfolio anytime without code changes."
          },
          {
            title: "Modern UI",
            desc: "Smooth animations with glassmorphism design."
          },
          {
            title: "Full Stack",
            desc: "Built using Next.js, Node.js, MongoDB."
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}

      </section>

      {/* 🧠 LIVE PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 mt-10">

        <h2 className="text-3xl font-bold text-center mb-12">
          See It In Action
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <img src="/p1.png" className="rounded-lg border border-white/10" />
          <img src="/p2.png" className="rounded-lg border border-white/10" />
          <img src="/p3.png" className="rounded-lg border border-white/10" />

        </div>

      </section>

      {/* 🚀 CTA */}
      <section className="text-center py-24 px-6">

        <h2 className="text-3xl font-bold mb-4">
          Ready to Build Your Portfolio?
        </h2>

        <p className="text-gray-400 mb-6">
          Start creating your personal brand today.
        </p>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            href="/dashboard"
            className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Get Started
          </Link>
        </motion.div>

      </section>

      <Footer />
    </div>
  );
}