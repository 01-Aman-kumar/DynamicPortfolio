import { motion } from "framer-motion";

export default function FeatureCard({ title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20"
    >
      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>
      <p className="text-gray-400 text-sm">
        {desc}
      </p>
    </motion.div>
  );
}