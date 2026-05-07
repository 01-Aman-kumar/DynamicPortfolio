"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";

const FONTS = `
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
`;

const GLOBAL_CSS = `
.ng-card{
  background:linear-gradient(
    135deg,
    rgba(255,255,255,0.06),
    rgba(255,255,255,0.03)
  );
  border:1px solid rgba(255,255,255,0.08);
  backdrop-filter:blur(24px);
  -webkit-backdrop-filter:blur(24px);
  transition:0.3s ease;
}

.ng-card:hover{
  transform:translateY(-6px);
  border-color:rgba(99,102,241,0.2);
  box-shadow:0 20px 60px rgba(0,0,0,0.35);
}

.ng-btn-primary{
  background:linear-gradient(135deg,#6366f1,#818cf8);
  color:white;
  transition:0.25s ease;
}

.ng-btn-primary:hover{
  opacity:.9;
}

.ng-btn-secondary{
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.08);
  color:rgba(255,255,255,0.85);
}
`;

export default function PortfolioPage({ data }) {
  const { profile, projects, skills, education, achievements } = data;

  return (
    <>
      <style>{FONTS + GLOBAL_CSS}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#040812",
          color: "#fff",
          
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Navbar />

        {/* BACKGROUND */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -250,
              left: -250,
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,.18), transparent 70%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: -250,
              right: -250,
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(34,211,238,.14), transparent 70%)",
            }}
          />
        </div>

        {/* MAIN */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1300,
            margin: "0 auto",
            padding: "clamp(24px,5vw,80px)",
          }}
          
        >
          {/* HERO */}
          <div
          className="mt-15"
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: 32,
              alignItems: "center",
              marginBottom: 100,
            }}
          >
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="ng-card"
              style={{
                borderRadius: 28,
                padding: "40px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(99,102,241,.18), transparent 70%)",
                }}
                
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 30,
                  flexWrap: "wrap",
                }}
                
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={profile?.profileImage?.url}
                    alt={profile?.name}
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border:
                        "2px solid rgba(99,102,241,0.3)",
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      right: 4,
                      bottom: 4,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#22d3ee",
                    }}
                  />
                </div>

                <div>
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,.35)",
                      marginBottom: 8,
                    }}
                  >
                    Portfolio
                  </p>

                  <div
                    style={{
                      padding: "5px 12px",
                      borderRadius: 999,
                      background:
                        "rgba(34,211,238,.08)",
                      border:
                        "1px solid rgba(34,211,238,.15)",
                      color: "#67e8f9",
                      fontSize: 11,
                      width: "fit-content",
                    }}
                  >
                    Open to opportunities
                  </div>
                </div>
              </div>

              <h3
                style={{
                  fontFamily:
                    "'Clash Display', sans-serif",
                  fontSize: "clamp(24px,6vw,30px)",
                  lineHeight: 1,
                  marginBottom: 16,
                  fontWeight: 700,
                  letterSpacing: "-.03em",
                }}
              >
                {profile?.name}
              </h3>

              <div
                style={{
                  display: "inline-flex",
                  padding: "8px 16px",
                  borderRadius: 999,
                  background:
                    "rgba(99,102,241,.12)",
                  border:
                    "1px solid rgba(99,102,241,.2)",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    color: "#a5b4fc",
                    fontSize: 13,
                  }}
                >
                  {profile?.title}
                </span>
              </div>

              <p
                style={{
                  color: "rgba(255,255,255,.5)",
                  lineHeight: 1.9,
                  fontSize: 14,
                  marginBottom: 32,
                }}
              >
                {profile?.bio}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                {profile?.socialLinks?.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ng-btn-secondary"
                    style={{
                      padding: "12px 22px",
                      borderRadius: 12,
                      textDecoration: "none",
                      fontSize: 13,
                    }}
                  >
                    GitHub
                  </a>
                )}

                {profile?.socialLinks?.linkedin && (
                  <a
                    href={
                      profile.socialLinks.linkedin.startsWith(
                        "http"
                      )
                        ? profile.socialLinks.linkedin
                        : `https://${profile.socialLinks.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ng-btn-primary"
                    style={{
                      padding: "12px 22px",
                      borderRadius: 12,
                      textDecoration: "none",
                      fontSize: 13,
                    }}
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </motion.div>

            {/* RIGHT */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(180px,1fr))",
                gap: 16,
              }}
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
                  className="ng-card"
                  style={{
                    borderRadius: 24,
                    padding: 28,
                  }}
                >
                  <h3
                    style={{
                      fontFamily:
                        "'Clash Display', sans-serif",
                      fontSize: 46,
                      marginBottom: 8,
                    }}
                  >
                    {item.number}
                  </h3>

                  <p
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: ".12em",
                      color:
                        "rgba(255,255,255,.45)",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS */}
          <Section title="Skills" label="01">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
              }}
            >
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="ng-card"
                  style={{
                    padding: "12px 18px",
                    borderRadius: 999,
                    fontSize: 13,
                    color:
                      "rgba(255,255,255,.75)",
                  }}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </Section>

          {/* EDUCATION */}
          <Section title="Education" label="02">
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(300px,1fr))",
                gap: 20,
              }}
            >
              {education.map((edu) => (
                <div
                  key={edu._id}
                  className="ng-card"
                  style={{
                    borderRadius: 24,
                    padding: 28,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: "#818cf8",
                      marginBottom: 12,
                      display: "inline-block",
                    }}
                  >
                    {new Date(
                      edu.startDate
                    ).getFullYear()}
                  </span>

                  <h3
                    style={{
                      fontFamily:
                        "'Clash Display', sans-serif",
                      fontSize: 22,
                      marginBottom: 8,
                    }}
                  >
                    {edu.institution}
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      color:
                        "rgba(255,255,255,.45)",
                    }}
                  >
                    {edu.degree}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* PROJECTS */}
          <Section title="Projects" label="03">
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(320px,1fr))",
                gap: 24,
                alignItems: "stretch",
              }}
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </Section>

          {/* ACHIEVEMENTS */}
          <Section title="Achievements" label="04">
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(320px,1fr))",
                gap: 24,
              }}
            >
              {achievements.map(
                (achievement, index) => (
                  <AchievementCard
                    key={achievement._id}
                    achievement={achievement}
                    index={index}
                  />
                )
              )}
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}

/* SECTION */
function Section({ title, label, children }) {
  return (
    <section style={{ marginBottom: 90 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 36,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "#818cf8",
            letterSpacing: ".12em",
          }}
        >
          {label}
        </span>

        <h2
          style={{
            fontFamily:
              "'Clash Display', sans-serif",
            fontSize: "clamp(28px,4vw,42px)",
            fontWeight: 700,
          }}
        >
          {title}
        </h2>

        <div
          style={{
            flex: 1,
            height: 1,
            background:
              "linear-gradient(90deg,rgba(99,102,241,.3),transparent)",
          }}
        />
      </div>

      {children}
    </section>
  );
}

/* PROJECT CARD */
function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="ng-card rounded-xl"
      style={{
        
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          padding: 14,
        }}
      >
        <motion.img
          src={project.image?.url}
          alt={project.title}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            height: 220,
            objectFit: "cover",
            
          }}
          className="rounded"
        />

        <div
          style={{
            position: "absolute",
            top: 26,
            left: 26,
            width: 38,
            height: 38,
            borderRadius: "50%",
            background:
              "rgba(4,8,18,.7)",
            border:
              "1px solid rgba(255,255,255,.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            color:
              "rgba(255,255,255,.7)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          padding: "0 22px 22px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontFamily:
              "'Clash Display', sans-serif",
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color:
              "rgba(255,255,255,.45)",
            marginBottom: 22,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: "auto",
          }}
        >
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ng-btn-primary"
              style={{
                flex: 1,
                minWidth: 120,
                textAlign: "center",
                padding: "11px 18px",
                borderRadius: 12,
                fontSize: 12,
                textDecoration: "none",
              }}
            >
              Live Demo
            </a>
          )}

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ng-btn-secondary"
              style={{
                flex: 1,
                minWidth: 120,
                textAlign: "center",
                padding: "11px 18px",
                borderRadius: 12,
                fontSize: 12,
                textDecoration: "none",
              }}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ACHIEVEMENT CARD */
function AchievementCard({
  achievement,
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="ng-card rounded-xl"
      style={{
        overflow: "hidden",
      }}
    >
      <div style={{ padding: 14 }}>
        <img
          src={achievement.image?.url}
          alt={achievement.title}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
          }}
          className="rounded"
        />
      </div>

      <div style={{ padding: "0 22px 24px" }}>
        <span
          style={{
            fontSize: 10,
            letterSpacing: ".14em",
            color: "#f472b6",
            textTransform: "uppercase",
          }}
        >
          Achievement
        </span>

        <h3
          style={{
            fontFamily:
              "'Clash Display', sans-serif",
            fontSize: 20,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          {achievement.title}
        </h3>

        <p
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color:
              "rgba(255,255,255,.45)",
          }}
          className="line-clamp-3"
        >
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
}