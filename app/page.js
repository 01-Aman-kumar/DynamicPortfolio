"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import FeatureCard from "@/components/ui/FeatureCard";

export default function Home() {

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">

        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617] to-black" />

        <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-purple-500 rounded-full blur-[150px] opacity-20" />

      </motion.div>

      <Navbar />

      {/* HERO */}
      <section className="pt-40 pb-32 text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          Build & Manage Your <br />
          <span className="text-blue-400">
            Developer Portfolio
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 max-w-xl mx-auto mb-10"
        >
          Create a fully dynamic portfolio with projects, skills, and achievements — all managed from a powerful dashboard.
        </motion.p>

        <div className="flex justify-center gap-4 flex-wrap">

          <Link
            href="/portfolio/aman"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition"
          >
            View Portfolio
          </Link>

          <Link
            href="/dashboard"
            className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
          >
            Dashboard
          </Link>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        <FeatureCard
          title="Fully Dynamic"
          desc="Update your portfolio anytime without code changes."
        />

        <FeatureCard
          title="Modern UI"
          desc="Smooth animations with glassmorphism design."
        />

        <FeatureCard
          title="Full Stack"
          desc="Built using Next.js, Node.js, MongoDB."
        />

      </section>

      {/* CTA */}
      <section className="text-center py-24 px-6">

        <h2 className="text-3xl font-bold mb-4">
          Ready to Build Your Portfolio?
        </h2>

        <p className="text-gray-400 mb-6">
          Start creating your personal brand today.
        </p>

        <Link
          href="/dashboard"
          className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Get Started
        </Link>

      </section>

      <Footer />
    </div>
  );
}