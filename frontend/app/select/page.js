"use client";

import Link from "next/link";


export default function Login() {
  


  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 
    flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Employee Attendance Type
          </h1>

          <p className="text-gray-500 mt-2">
           Please Select Type
          </p>
          </div>
              
              
          <Link
          href="/day-in"
          className="block w-full bg-blue-600 text-white py-3 rounded-lg
          font-semibold text-center shadow-md
          hover:bg-blue-700 hover:shadow-lg
          active:scale-[0.98]
          transition ">
          Day In
          </Link>

        <Link
          href="/day-out"
          className="block w-full bg-blue-600 text-white py-3 rounded-lg
          font-semibold text-center shadow-md
          hover:bg-blue-700 hover:shadow-lg
          active:scale-[0.98]
          transition mt-2">
         Day Out
        </Link>
      
      </div>
    </div>
  );
  };