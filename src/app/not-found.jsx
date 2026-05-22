 "use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="text-center bg-white shadow-lg rounded-2xl p-10 max-w-md w-full">
        
        {/* 404 Text */}
        <h1 className="text-7xl font-extrabold text-gray-800">404</h1>

        {/* Message */}
        <p className="mt-3 text-lg text-gray-600">
          Oops! Page not found
        </p>

        <p className="text-sm text-gray-400 mt-2">
          The page you are looking for doesn’t exist or has been moved.
        </p>

         
        <div className="flex gap-3 mt-6 justify-center">
           
          <button
            onClick={() => router.back()}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Go Back
          </button>

           
          <Link
            href="/"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}