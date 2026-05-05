// "use client";

// import { useState } from "react";
// import API from "@/lib/api";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const router = useRouter();

//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/auth/login", form);
//       localStorage.setItem("token", res.data.token);
//       router.push("/dashboard");
//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="login-ui min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4">

//       <div className="l-card w-full max-w-sm">

//         <h2 className="text-2xl font-bold mb-1">
//           🔐 Admin Login
//         </h2>
//         <p className="text-sm text-gray-400 mb-5">
//           Access your dashboard
//         </p>

//         {/* EMAIL */}
//         <input
//           className="l-input mb-3"
//           placeholder="Email"
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />

//         {/* PASSWORD */}
//         <input
//           type="password"
//           className="l-input mb-4"
//           placeholder="Password"
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />

//         {/* BUTTON */}
//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium transition"
//         >
//           Login
//         </button>

//         {/* EXTRA UI */}
//         <p className="text-xs text-gray-500 mt-4 text-center">
//           Secure admin access 🔒<span><a href="/register" className="text-blue-400 hover:text-blue-300">
//             Sign up
//           </a></span>
//         </p>
//       </div>

//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user, login } = useAuth();
  console.log(user);

  // 🔐 If already logged in → go to dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      // ✅ Use context (NOT direct localStorage)
      login(res.data.token);
      router.push("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4">

      <div className="w-full max-w-sm bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-lg">

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-1 text-center">
          🔐 Admin Login
        </h2>
        <p className="text-sm text-gray-400 mb-5 text-center">
          Access your dashboard
        </p>

        {/* EMAIL */}
        <input
          type="email"
          className="w-full mb-3 px-4 py-2 rounded-lg bg-white/10 border border-white/10 focus:outline-none"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 border border-white/10 focus:outline-none"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* EXTRA */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          Secure admin access 🔒{" "}
          <a
            href="/register"
            className="text-blue-400 hover:text-blue-300"
          >
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
}