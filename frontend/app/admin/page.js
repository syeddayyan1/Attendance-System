"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "@/api/client/admin";
import Link from "next/link";


export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: () => adminLogin(email, password),

    onSuccess: (data) => {
      localStorage.setItem("adminToken", data.token);

      router.push("/employee");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate();
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-blue-600 via-indigo-600
      to-purple-700 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter admin email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3
              outline-none transition
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100
              text-gray-700"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter admin password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3
              outline-none transition
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100
              text-gray-700"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-lg
            font-semibold shadow-md
            hover:bg-blue-700 hover:shadow-lg
            active:scale-[0.98]
            transition
            disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Logging in..." : "Admin Login"}
          </button>

              </form>
              
                <Link
                 href="/login"
                 className="block w-full bg-blue-600 text-white py-3 rounded-lg
                 font-semibold text-center shadow-md
                 hover:bg-blue-700 hover:shadow-lg
                 active:scale-[0.98]
                 transition mt-3 ">
                 Employee Login
                 </Link>

        {/* Error Message */}
        {mutation.isError && (
          <div
            className="mt-5 bg-red-50 border border-red-200
            text-red-700 px-4 py-3 rounded-lg text-sm"
          >
            {mutation.error.response?.data?.message ||
              "Something went wrong"}
          </div>
        )}

      </div>
    </div>
  );
}
