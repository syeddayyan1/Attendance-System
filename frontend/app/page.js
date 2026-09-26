"use client";

import { useMutation } from "@tanstack/react-query";
import { createEmployee } from "@/api/client/employee";
import Link from "next/link";


export default function Home() {
  const mutation = useMutation({
    mutationFn: createEmployee,

    onSuccess: (data) => {
      console.log(data.message);

      // 3 seconds baad form clear hoga
      setTimeout(() => {
        document.querySelector("form").reset();
      }, 3000);
    },

    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const employeeData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    mutation.mutate(employeeData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600
     to-purple-700 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Add Employee
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new employee account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee Name
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="Enter employee name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3
              outline-none transition
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee Email
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="Enter employee email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3
              outline-none transition 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-500"
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
              required
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3
              outline-none transition 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-500"
            />
          </div>

          {/* Button */}
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
              ? "Adding Employee..."
              : "Add Employee"}
          </button>

          <Link
          href="/login"
          className="block w-full bg-blue-600 text-white py-3 rounded-lg
          font-semibold text-center shadow-md
          hover:bg-blue-700 hover:shadow-lg
          active:scale-[0.98]
          transition ">
          Employee Login
          </Link>

          

        </form>

        {/* Success Message */}
        {mutation.isSuccess && (
          <div className="mt-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3
          rounded-lg text-sm">
            {mutation.data.message}
          </div>
        )}

        {/* Error Message */}
        {mutation.isError && (
          <div className="mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3
          rounded-lg text-sm">
            {mutation.error.message}
          </div>
        )}

      </div>
    </div>
  );
}