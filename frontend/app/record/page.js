"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecord } from "@/api/client/employee";

export default function Record() {
  const [token, setToken] = useState(null);

  useEffect(() => {
      setToken(localStorage.getItem("token"));
  }, []);

const { data, isPending, isError, error } = useQuery({
  queryKey: ["record"],
  queryFn: () => getRecord(token),
  enabled: !!token,
});
    
    
if (isPending) {
  return <h1>Loading...</h1>;
}

if (isError) {
  return <h1>{error.message}</h1>;
}

 return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-5xl mx-auto">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center ">
          Attendance Record
        </h1>

        <p className="text-gray-500 mt-1 text-center">
          Your attendance history
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Day In
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Day Out
              </th>

              {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th> */}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data?.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-gray-50 transition"
              >
                {/* Date */}
                <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                  {String(record.date).slice(0, 10)}
                </td>

                {/* Day In */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {record.time}
                </td>

                {/* Day Out */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {record.logout_time || (
                    <span className="text-gray-400">
                      Not marked
                    </span>
                  )}
                </td>

                {/* Status */}
                {/* <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      record.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {record.status}
                  </span>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Records */}
        {(!data || data.length === 0) && (
          <div className="py-10 text-center text-gray-500">
            No attendance records found.
          </div>
        )}

      </div>
    </div>
  </div>
);

  
}