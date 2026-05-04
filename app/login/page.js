"use client";

import { useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      router.push("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md w-80">
        <h2 className="text-xl mb-4">Admin Login</h2>

        <input
          className="w-full mb-3 p-2 rounded bg-black/40"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 rounded bg-black/40"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-white text-black p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}