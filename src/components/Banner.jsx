 "use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="overflow-hidden bg-white shadow mb-20">
      <div className="mx-auto grid min-h-[90vh] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2">
        
        {/* Left Side */}
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1,
          }}
          className="space-y-6"
        >
          <span className="rounded-full bg-[#00FF9D]/20 px-4 py-1.5 text-sm font-semibold text-[#00C77B]">
            ⚽ Best Sports Booking Platform
          </span>

          <h1 className="text-3xl font-extrabold leading-tight text-gray-900 lg:text-7xl">
            Book Your
            <span className="block text-[#00C77B]">
              Dream Sports Arena
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-8 text-gray-600">
            Discover and book premium sports facilities easily with SportNest.
            Fast booking, smooth management, and modern experience for every
            sports lover.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-2xl bg-[#00FF9D] px-4 py-2 font-bold text-black shadow-lg transition hover:scale-105">
              Explore Facilities
            </button>

            <button className="rounded-2xl border-2 border-gray-300 px-4 py-2 font-bold text-gray-800 transition hover:border-[#00FF9D] hover:text-[#00C77B]">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1,
          }}
          className="relative flex justify-center"
        >
          {/* Glow Effect */}
          <div className="absolute h-72 w-72 rounded-full bg-[#00FF9D]/30 blur-3xl"></div>

          <Image
            src="/banners.png"
            alt="Sports Banner"
            width={600}
            height={500}
            className="relative rounded-[40px] object-cover shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}