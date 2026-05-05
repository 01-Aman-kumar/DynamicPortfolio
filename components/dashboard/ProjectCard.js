import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import API from "../../lib/api";

export default function ProjectCard({ project, refresh }) {
  const router = useRouter();

  const handleDelete = async () => {
    await API.delete(`/projects/${project._id}`);
    refresh();
  };

  const handleEdit = () => {
    router.push(`/dashboard/projects/edit/${project._id}`);
  };

  return (
    <motion.div className="p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
      
      {project.image?.url && (
        <img src={project.image.url} className="w-full h-40 object-cover rounded mb-3" />
      )}

      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
      <p className="text-gray-400 text-sm">{project.description}</p>

      {/* <div className="flex gap-4 mt-2 text-sm">
        {project.liveLink && <a href={project.liveLink}>Live</a>}
        {project.githubLink && <a href={project.githubLink}>GitHub</a>}
      </div> */}

      {/* ACTION BUTTONS */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={handleEdit}
          className="bg-yellow-500/80 hover:bg-yellow-500 px-3 py-1 rounded text-sm"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500/80 hover:bg-red-500 px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}