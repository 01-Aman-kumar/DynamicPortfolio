// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import API from "@/lib/api";
// import Link from "next/link";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     try {
//       setLoading(true);

//       if (!form.username || !form.email || !form.password) {
//         return alert("All fields are required");
//       }

//       const res = await API.post("/auth/register", form);

//       // ✅ save token
//       localStorage.setItem("token", res.data.token);

//       // ✅ redirect
//       router.push("/dashboard");

//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-4">

//       <div className="w-full max-w-md p-8 rounded-2xl 
//                       bg-white/5 backdrop-blur-xl 
//                       border border-white/10 shadow-xl">

//         {/* HEADER */}
//         <h2 className="text-2xl font-bold text-center mb-2">
//           Create Account 🚀
//         </h2>

//         <p className="text-gray-400 text-sm text-center mb-6">
//           Start building your developer portfolio
//         </p>

//         {/* FORM */}
//         <div className="space-y-4">

//           <Input
//             placeholder="Username"
//             value={form.username}
//             onChange={(v) => setForm({ ...form, username: v })}
//           />

//           <Input
//             placeholder="Email"
//             type="email"
//             value={form.email}
//             onChange={(v) => setForm({ ...form, email: v })}
//           />

//           <Input
//             placeholder="Password"
//             type="password"
//             value={form.password}
//             onChange={(v) => setForm({ ...form, password: v })}
//           />

//           {/* BUTTON */}
//           <button
//             onClick={handleRegister}
//             disabled={loading}
//             className="w-full bg-blue-500 hover:bg-blue-600 
//                        py-3 rounded-lg font-medium transition disabled:opacity-50"
//           >
//             {loading ? "Creating..." : "Register"}
//           </button>

//         </div>

//         {/* LOGIN LINK */}
//         <p className="text-sm text-center text-gray-400 mt-6">
//           Already have an account?{" "}
//           <Link href="/login" className="text-blue-400 hover:underline">
//             Login
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }


// /* 🔹 INPUT COMPONENT */

// function Input({ placeholder, value, onChange, type = "text" }) {
//   return (
//     <input
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500 outline-none transition"
//     />
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 sanitize username
  const formatUsername = (username) => {
    return username
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")       // spaces → dash
      .replace(/[^a-z0-9-_]/g, ""); // remove special chars
  };

  const handleRegister = async () => {
    if (!form.username || !form.email || !form.password) {
      return alert("All fields are required");
    }

    try {
      setLoading(true);

      const formattedUsername = formatUsername(form.username);

      const res = await API.post("/auth/register", {
        ...form,
        username: formattedUsername, // ✅ clean username
      });

      // ✅ use AuthContext (IMPORTANT)
      login(res.data.token);

      router.push("/dashboard");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-4">

      <div className="w-full max-w-md p-8 rounded-2xl 
                      bg-white/5 backdrop-blur-xl 
                      border border-white/10 shadow-xl">

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Create Account 🚀
        </h2>

        <p className="text-gray-400 text-sm text-center mb-6">
          Start building your developer portfolio
        </p>

        {/* FORM */}
        <div className="space-y-4">

          <Input
            placeholder="Username (no spaces)"
            value={form.username}
            onChange={(v) => setForm({ ...form, username: v })}
          />

          <Input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />

          <Input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
          />

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 
                       py-3 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </div>

        {/* LOGIN LINK */}
        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}


/* 🔹 INPUT COMPONENT */

function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500 outline-none transition"
    />
  );
}