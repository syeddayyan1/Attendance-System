"use client";

import { useMutation } from "@tanstack/react-query";
import { loginEmployee } from "@/api/client/employee";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginEmployee,

    onSuccess: (data) => {
      console.log(data);

      localStorage.setItem("token", data.token);
      console.log("Login successful");
      // Login successful hone ke baad attendance page par redirect
      router.push("/attendance");
    },

    onError: (error) => {
      console.log(
        error.response?.data?.message || error.message
      );
    },
  });

  const handleSubmit = (e) => {
      e.preventDefault();
    const formData = new FormData(e.target);
    const employeeData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    mutation.mutate(employeeData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Employee Login
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your employee account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3
              outline-none transition
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100
              text-gray-600 "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3
              outline-none transition
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100
              text-gray-500 :"
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
            {mutation.isPending
              ? "Logging in..."
              : "Login"}
          </button>

              </form>
              


        {/* Success Message */}
        {mutation.isSuccess && (
          <div className="mt-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            {mutation.data.message}
          </div>
        )}

        {/* Error Message */}
        {mutation.isError && (
          <div className="mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {mutation.error.response?.data?.message ||
              mutation.error.message}
          </div>
        )}

      </div>
    </div>
  );
}