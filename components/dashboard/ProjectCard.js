// "use client";

// import API from "@/lib/api";
// import { motion } from "framer-motion";
// import { Trash2, ExternalLink } from "lucide-react";

// export default function ProjectCard({ project, refresh }) {
//   const handleDelete = async () => {
//     await API.delete(`/projects/${project._id}`);
//     refresh();
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 60 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ y: -8 }}
//       transition={{ duration: 0.4 }}
//       className="group relative rounded-2xl overflow-hidden
//                  bg-white/10 backdrop-blur-xl border border-white/20
//                  hover:border-white/40 transition-all duration-300"
//     >
//       {/* IMAGE */}
//       <div className="relative h-52 overflow-hidden">
//         {project.image?.url ? (
//           <img
//             src={project.image.url}
//             className="w-full h-full object-cover 
//                        group-hover:scale-110 transition duration-500"
//           />
//         ) : (
//           <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-500">
//             No Image
//           </div>
//         )}

//         {/* OVERLAY ACTIONS (VISIBLE ON HOVER) */}
//         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
//                         flex items-center justify-center gap-4 transition">
          
//           {project.githubLink && (
//             <a
//               href={project.githubLink}
//               target="_blank"
//               className="p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition"
//             >
//               <Github size={18} />
//             </a>
//           )}

//           {project.liveLink && (
//             <a
//               href={project.liveLink}
//               target="_blank"
//               className="p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition"
//             >
//               <ExternalLink size={18} />
//             </a>
//           )}

//           <button
//             onClick={handleDelete}
//             className="p-3 rounded-full bg-red-500/30 hover:bg-red-500 text-white transition"
//           >
//             <Trash2 size={18} />
//           </button>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="p-5">
//         <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
//           {project.title}
//         </h3>

//         <p className="text-gray-400 text-sm line-clamp-2">
//           {project.description}
//         </p>
//       </div>

//       {/* SUBTLE GLOW */}
//       <div className="absolute inset-0 rounded-2xl 
//                       bg-gradient-to-br from-white/10 via-transparent to-transparent 
//                       opacity-0 group-hover:opacity-100 transition" />
//     </motion.div>
//   );
// }
"use client";

import API from "@/lib/api";
import { motion } from "framer-motion";

export default function ProjectCard({ project, refresh }) {
  const handleDelete = async () => {
    await API.delete(`/projects/${project._id}`);
    refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="p-4 rounded-xl 
                 bg-white/10 backdrop-blur-xl 
                 border border-white/20 
                 shadow-md hover:shadow-lg transition"
    >
      {/* IMAGE */}
      {project.image?.url && (
        <img
          src={project.image.url}
          alt=""
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-white">
        {project.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-400 text-sm">
        {project.description}
      </p>

      {/* LINKS */}
      <div className="flex gap-4 mt-2 text-sm">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            Live
          </a>
        )}

        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            className="text-gray-300 hover:underline"
          >
            GitHub
          </a>
        )}
      </div>

      {/* DELETE BUTTON */}
      <button
        onClick={handleDelete}
        className="mt-3 bg-red-500/80 hover:bg-red-500 px-3 py-1 rounded text-sm"
      >
        Delete
      </button>
    </motion.div>
  );
}