// "use client";

// import { useMutation } from "@tanstack/react-query";
// import { markAttendance } from "@/api/client/employee";

// export default function Attendance() {
//   const mutation = useMutation({
//     mutationFn: markAttendance,

//     onSuccess: (data) => {
//       console.log(data.message);
//     },

//     onError: (error) => {
//       console.log(
//         error.response?.data?.message || error.message
//       );
//     },
//   });

//   const handleAttendance = () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.log("Please login first");
//       return;
//     }

//     mutation.mutate(token);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">

//       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

//         {/* Heading */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Employee Attendance
//           </h1>

//           <p className="text-gray-500 mt-2">
//             Mark your attendance for today
//           </p>
//         </div>

//         {/* Attendance Button */}
//         <button
//           onClick={handleAttendance}
//           disabled={mutation.isPending}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg
//           font-semibold shadow-md
//           hover:bg-blue-700 hover:shadow-lg
//           active:scale-[0.98]
//           transition
//           disabled:bg-blue-400 disabled:cursor-not-allowed"
//         >
//           {mutation.isPending
//             ? "Marking..."
//             : "Mark Attendance"}
//         </button>

//         {/* Success Message */}
//         {mutation.isSuccess && (
//           <div className="mt-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm text-center">
//             {mutation.data.message}
//           </div>
//         )}

//         {/* Error Message */}
//         {mutation.isError && (
//           <div className="mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
//             {mutation.error.response?.data?.message ||
//               mutation.error.message}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Html5Qrcode } from "html5-qrcode";
import { markAttendance } from "@/api/client/employee";

export default function Attendance() {
  const scannerRef = useRef(null);
  const startedRef = useRef(false);

  const [scannedQR, setScannedQR] = useState("");

  const mutation = useMutation({
    mutationFn: markAttendance,
  });

  useEffect(() => {
    if (startedRef.current) return;

    startedRef.current = true;

    const startScanner = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      const scanner = new Html5Qrcode("reader");

      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: {
            width: 220,
            height: 220,
          },
        },
        async (decodedText) => {
          setScannedQR(decodedText);

          await scanner.stop();
          scanner.clear();

          mutation.mutate(token);
        }
      );
    };

    startScanner();

    return () => {
      scannerRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Employee Attendance
          </h1>

          <p className="text-gray-500 mt-2">
            Scan the QR code to mark attendance
          </p>
        </div>

        {/* Camera */}
        <div className="flex justify-center">
          <div
            id="reader"
            className="w-[250px] overflow-hidden rounded-xl border border-gray-200"
          />
        </div>

        {/* QR Detected */}
        {scannedQR && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm text-center">
            <p className="font-semibold">
              QR Detected
            </p>
          </div>
        )}

        {/* Success */}
        {mutation.isSuccess && (
          <div className="mt-5 bg-green-50 border border-green-200 text-green-700
          px-4 py-3 rounded-lg text-sm text-center">
            {mutation.data.message}
          </div>
        )}

        {/* Error */}
        {mutation.isError && (
          <div className="mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
            {mutation.error.response?.data?.message ||
              "Something went wrong"}
          </div>
        )}

      </div>
    </div>
  );
}