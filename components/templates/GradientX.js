"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/ui/Navbar";

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

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    if (!username) return;

    const fetchPortfolio = async () => {
      try {
        const res = await API.get(`/portfolio/${username}`);
        setData(res.data.data);
        console.log(res.data.data);
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
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      <div className="animate-pulse text-lg">
        Loading Portfolio...
      </div>
    </div>
  );
}

  const { profile, achievements, projects, skills, education } = data;
  console.log(profile);

  return (
    
    <div className="relative min-h-screen text-white px-6 md:px-20 py-20 overflow-hidden">
      <Navbar />
      {/* 🌈 ANIMATED BACKGROUND */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617] to-black" />

        <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-purple-500 rounded-full blur-[150px] opacity-20" />
      </motion.div>

      {/* ================= HERO + ABOUT ================= */}
      <div className="grid lg:grid-cols-2 gap-12 mb-24 items-center">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-10"
        >
          <img
            src={profile?.profileImage?.url}
            className="w-28 h-28 rounded-full mb-6 object-cover border border-white/20"
          />

          <h1 className="text-4xl font-bold">
            {profile?.name}
          </h1>

          <p className="text-gray-300 mt-2">
            {profile?.title}
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href={profile?.socialLinks?.github}
              target="_blank"
              className="btn-outline"
            >
              GitHub
            </a>

            <a
  href={
    profile?.socialLinks?.linkedin?.startsWith("http")
      ? profile.socialLinks.linkedin
      : `https://${profile.socialLinks.linkedin}`
  }
  target="_blank"
  rel="noopener noreferrer"
  className="btn-primary"
>
  LinkedIn
</a>
          </div>
        </motion.div>

        {/* ABOUT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-8"
        >
          <h2 className="title">About</h2>
          <p className="text-gray-300 leading-relaxed">
            {profile?.bio}
          </p>
        </motion.div>

      </div>

      {/* ================= SKILLS + EDUCATION ================= */}
      <div className="grid lg:grid-cols-2 gap-12 mb-24">

        {/* SKILLS */}
        <div className="glass p-8">
          <h2 className="title">Skills</h2>

          <div className="space-y-5 mt-4">
            {skills.map((s, i) => (
              <motion.div
                key={s._id}
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex justify-between text-sm mb-1">
                  <span>{s.name}</span>
                  <span className="text-gray-400">{s.level}%</span>
                </div>

                <div className="w-full bg-white/10 h-2 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    transition={{ duration: 1 }}
                    className="bg-blue-500 h-2 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="glass p-8">
          <h2 className="title">Education</h2>

          <div className="space-y-6 mt-4">
            {education.map((edu) => (
              <div key={edu._id} className="timeline">
                <h3 className="font-semibold">
                  {edu.institution}
                </h3>
                <p className="text-gray-300">
                  {edu.degree}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(edu.startDate).getFullYear()} -{" "}
                  {edu.endDate
                    ? new Date(edu.endDate).getFullYear()
                    : "Present"}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ================= PROJECTS ================= */}
      <Section title="Projects">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <motion.div
              key={p._id}
              whileHover={{ y: -10 }}
              className="glass p-6"
            >
              <img src={p.image?.url} className="rounded mb-3" />
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-gray-400 text-sm ">
                {p.description}
              </p>
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
                  
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ================= ACHIEVEMENTS ================= */}
      <Section title="Achievements">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((a) => (
            <motion.div
              key={a._id}
              whileHover={{ scale: 1.03 }}
              className="glass p-6"
            >
              <img src={a.image?.url} className="rounded mb-3" />
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-gray-400">{a.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <div className="mb-20">
      <h2 className="title mb-6">{title}</h2>
      {children}
    </div>
  );
}