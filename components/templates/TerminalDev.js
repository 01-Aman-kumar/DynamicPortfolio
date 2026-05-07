"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";

export default function TerminalDev({ data }) {
  const { profile, projects, skills, education, achievements } = data;

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">

      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#00ff0020_1px,transparent_1px),linear-gradient(to_bottom,#00ff0020_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <Navbar />

      <div className="relative mt-10 z-10 max-w-6xl mx-auto px-6 py-16">

        {/* ================= TERMINAL HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-green-500/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,0,0.1)]"
        >

          {/* TOP BAR */}
          <div className="flex  items-center gap-2 px-4 py-3 bg-green-500/10 border-b border-green-500/20">

            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />

            <span className="ml-4 text-sm text-green-300">
              developer-terminal
            </span>

          </div>

          {/* TERMINAL BODY */}
          <div className="p-8 space-y-6">

            <TerminalLine command="whoami" output={profile?.name} />

            <TerminalLine command="role" output={profile?.title} />

            <div>
              <p className="text-green-500">
                $ cat about.txt
              </p>

              <p className="text-green-300 mt-3 leading-relaxed">
                {profile?.bio}
              </p>
            </div>

            {/* PROFILE IMAGE */}
            {profile?.profileImage?.url && (
              <img
                src={profile.profileImage.url}
                alt={profile.name}
                className="w-32 h-32 rounded-xl border border-green-500/30 object-cover"
              />
            )}

            {/* LINKS */}
            <div className="flex flex-wrap gap-5 pt-4">

              {profile?.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-green-500/30 px-5 py-2 rounded-lg hover:bg-green-500/10 transition"
                >
                  ./github
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
                  className="border border-green-500/30 px-5 py-2 rounded-lg hover:bg-green-500/10 transition"
                >
                  ./linkedin
                </a>
              )}

            </div>

          </div>

        </motion.div>

        {/* ================= SKILLS ================= */}
        <Section title="skills.sh">

          <div className="grid md:grid-cols-2 gap-5">

            {skills.map((skill) => (
              <motion.div
                key={skill._id}
                whileHover={{ scale: 1.02 }}
                className="border border-green-500/20 rounded-xl p-5 bg-green-500/5"
              >

                <div className="flex justify-between mb-3">

                  <span>{skill.name}</span>

                  <span>{skill.level}%</span>

                </div>

                <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-green-500/20">

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-green-500"
                  />

                </div>

              </motion.div>
            ))}

          </div>

        </Section>

        
        <Section title="Projects">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((p) => (
                    <motion.div
                      key={p._id}
                      whileHover={{ y: -10 }}
                      className="glass p-6 border border-green-500/20 rounded-2xl overflow-hidden bg-green-500/5"
                    >
                      <img src={p.image?.url} className="rounded mb-3 border-b border-green-500/20" />
                      <h3 className="font-semibold">{p.title}</h3>
                      <p className="text-green-300 text-sm line-clamp-3">
                        {p.description}
                      </p>
                      <div className="flex gap-4 mt-3 text-sm">
        
                          {p.liveLink && (
                            <a
                              href={p.liveLink}
                              target="_blank"
                              className="text-red-600"
                            >
                              Live
                            </a>
                          )}
        
                          {p.githubLink && (
                            <a
                              href={p.githubLink}
                              target="_blank"
                              className="text-green-500/70"
                            >
                              GitHub
                            </a>
                          )}
        
                        </div>
                          
                    </motion.div>
                  ))}
                </div>
              </Section>

        {/* ================= EDUCATION ================= */}
        <Section title="education.log">

          <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {education.map((edu) => (
              <div
                key={edu._id}
                className="border border-green-500/20 rounded-xl p-6 bg-green-500/5"
              >

                <p className="text-green-500">
                  $ school --info
                </p>

                <h3 className="text-2xl text-green-300 mt-3">
                  {edu.institution}
                </h3>

                <p className="mt-2">
                  {edu.degree}
                </p>

                <p className="text-sm text-green-500/70 mt-3">
                  {new Date(edu.startDate).getFullYear()} -{" "}
                  {edu.endDate
                    ? new Date(edu.endDate).getFullYear()
                    : "Present"}
                </p>

              </div>
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
                      <p className="text-green-300">{a.description}</p>
                    </motion.div>
                  ))}
                </div>
              </Section>

      </div>
    </div>
  );
}

/* ================= SECTION ================= */

function Section({ title, children }) {
  return (
    <div className="mb-20">
      <h2 className="title mb-6">{title}</h2>
      {children}
    </div>
  );
}

/* ================= TERMINAL LINE ================= */

function TerminalLine({ command, output }) {
  return (
    <div>

      <p className="text-green-500">
        $ {command}
      </p>

      <p className="text-green-300 mt-2">
        {output}
      </p>

    </div>
  );
}