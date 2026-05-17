"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function NotFound() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const ParticlesComponent = Particles as any;

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[#0b1020] text-center px-4 overflow-hidden text-blue-100">

      {/* 🎈 Particles Background */}
      <ParticlesComponent
        className="absolute inset-0"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          particles: {
            number: { value: 60 },
            color: { value: "#60a5fa" },
            opacity: { value: 0.4 },
            size: { value: 3 },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              outModes: { default: "out" },
            },
            links: {
              enable: true,
              color: "#3b82f6",
              distance: 150,
              opacity: 0.25,
            },
          },
        }}
      />

      {/* Content */}
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-8xl font-extrabold z-10"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-blue-200 z-10"
      >
        Page Not Found
      </motion.p>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-blue-300 mt-3 z-10"
      >
        Lost in space... 🚀
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="z-10"
      >
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition text-white"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}