"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/ui/Navbar";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;700&display=swap');
`;

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
  const y = useTransform(scrollY, [0, 500], [0, 80]);

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
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0]">
        <div className="text-[#111] animate-pulse">
          Loading Profile...
        </div>
      </div>
    );
  }

  const { profile, achievements, projects, skills, education } = data;

  return (
    <>
      <style>{FONTS}</style>

      <div
        className="relative min-h-screen overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom right,#f8f7f4,#f1efe9,#f8f7f4)",
          fontFamily: "'DM Sans', sans-serif",
          color: "#1A1916",
        }}
      >
        <Navbar />

        {/* BACKGROUND */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute top-[-200px] left-[-150px] w-[450px] h-[450px] bg-[#ddd5c9] rounded-full blur-[120px] opacity-40" />

          <div className="absolute bottom-[-200px] right-[-150px] w-[450px] h-[450px] bg-[#ece3d6] rounded-full blur-[120px] opacity-40" />
        </motion.div>

        {/* HERO */}
        <section className="max-w-[1350px] mx-auto px-6 md:px-12 pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4 mb-8 flex-wrap">
                <img
                  src={profile?.profileImage?.url}
                  alt={profile?.name}
                  className="w-20 h-20 rounded-full object-cover border border-black/10"
                />

                <div>
                  <p className="uppercase tracking-[0.2em] text-[10px] text-[#7d7a74] mb-2">
                    Available For Work
                  </p>

                  <div className="px-4 py-2 rounded-full bg-white/70 border border-white backdrop-blur-xl flex items-center gap-2 w-fit">
                    <div className="w-2 h-2 rounded-full bg-green-500" />

                    <span className="text-xs text-[#444]">
                      Open to Opportunities
                    </span>
                  </div>
                </div>
              </div>

              <h1
                className="leading-none mb-5"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(58px,8vw,100px)",
                  fontWeight: 500,
                  letterSpacing: "-0.05em",
                }}
              >
                {profile?.name}
              </h1>

              <div className="inline-block px-4 py-2 rounded-full bg-white/60 border border-white backdrop-blur-xl mb-6">
                <span className="text-xs tracking-wide text-[#555]">
                  {profile?.title}
                </span>
              </div>

              <p className="text-[#66625d] leading-8 max-w-[600px] text-[14px] mb-8">
                {profile?.bio}
              </p>

              <div className="flex gap-3 flex-wrap">
                {profile?.socialLinks?.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-2xl bg-[#111] text-white text-xs font-medium"
                  >
                    GitHub ↗
                  </a>
                )}

                {profile?.socialLinks?.linkedin && (
                  <a
                    href={
                      profile.socialLinks.linkedin.startsWith("http")
                        ? profile.socialLinks.linkedin
                        : `https://${profile.socialLinks.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-2xl bg-white/70 border border-black/5 backdrop-blur-xl text-[#111] text-xs font-medium"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  number: projects.length,
                  label: "Projects",
                },
                {
                  number: skills.length,
                  label: "Skills",
                },
                {
                  number: education.length,
                  label: "Education",
                },
                {
                  number: achievements.length,
                  label: "Achievements",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] bg-white/60 backdrop-blur-2xl border border-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                >
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                    className="text-5xl leading-none mb-2"
                  >
                    {item.number}
                  </h3>

                  <p className="uppercase tracking-[0.15em] text-[10px] text-[#7d7a74]">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* SKILLS */}
        <Section title="Skills">
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="px-4 py-2 rounded-full
                bg-white/60 border border-white
                backdrop-blur-xl shadow-sm"
              >
                <span className="text-[#444] text-xs">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section title="Education">
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <div
                key={edu._id}
                className="rounded-[28px] bg-white/60 border border-white
                backdrop-blur-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              >
                <p className="uppercase tracking-[0.15em] text-[10px] text-[#9b958b] mb-3">
                  {new Date(edu.startDate).getFullYear()} —
                  {edu.endDate
                    ? new Date(edu.endDate).getFullYear()
                    : "Present"}
                </p>

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                  className="text-3xl mb-3"
                >
                  {edu.institution}
                </h3>

                <p className="text-[#66625d] leading-7 text-sm">
                  {edu.degree}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section title="Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((p, index) => (
              <motion.div
                key={p._id}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-xl
                bg-white/60 backdrop-blur-2xl
                border border-white
                shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              >
                {/* IMAGE */}
                <div className="relative p-3">
                  <motion.img
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5 }}
                    src={p.image?.url}
                    alt={p.title}
                    className="w-full h-[200px] object-cover rounded"
                  />

                  <div
                    className="absolute top-6 left-6
                    w-9 h-9 rounded-full
                    bg-white/70 backdrop-blur-md
                    border border-white
                    flex items-center justify-center
                    text-[11px] font-semibold text-[#111]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="px-5 pb-5">
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                    className=" text-xl leading-tight mb-3"
                  >
                    {p.title}
                  </h3>

                  <p className="text-[#66625d] leading-7 text-[13px] line-clamp-3">
                    {p.description}
                  </p>

                  {/* BUTTONS */}
                  <div className="flex gap-2 mt-5 flex-wrap">
                    {p.liveLink && (
                      <a
                        href={p.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl
                        bg-[#111] text-white
                        text-[11px] font-medium"
                      >
                        Live Demo
                      </a>
                    )}

                    {p.githubLink && (
                      <a
                        href={p.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl
                        bg-white/70 border border-black/5
                        backdrop-blur-md text-[#111]
                        text-[11px] font-medium"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ACHIEVEMENTS */}
        <Section title="Achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {achievements.map((a) => (
              <motion.div
                key={a._id}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-xl
                bg-white/60 backdrop-blur-2xl
                border border-white
                shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              >
                <div className="p-3">
                  <img
                    src={a.image?.url}
                    alt={a.title}
                    className="w-full h-[200px] object-cover rounded"
                  />
                </div>

                <div className="px-5 pb-5">
                  <span className="uppercase tracking-[0.15em] text-[10px] text-[#9b958b]">
                    Achievement
                  </span>

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                    className="text-xl text-black leading-tight mt-3 mb-3"
                  >
                    {a.title}
                  </h3>

                  <p className="text-[#66625d] leading-7 text-[13px] line-clamp-3">
                    {a.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}

/* SECTION */
function Section({ title, children }) {
  return (
    <section className="max-w-[1350px] mx-auto px-6 md:px-12 pb-20">
      <div className="flex items-center gap-5 mb-8">
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
          }}
          className="text-4xl"
        >
          {title}
        </h2>

        <div className="flex-1 h-[1px] bg-black/10" />
      </div>

      {children}
    </section>
  );
}