export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-8 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} DevPortfolio — Built with Next.js
    </footer>
  );
}