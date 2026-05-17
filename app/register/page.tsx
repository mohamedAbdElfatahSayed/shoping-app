import React from "react";
import RegisterForm from "../components/forms/RegisterForm";

const RegisterPage = () => {
  return (
    <main
      className="
        relative isolate overflow-hidden
        min-h-screen flex items-center justify-center
        bg-gradient-to-br
        from-slate-100 via-white to-slate-200
        dark:from-black dark:via-zinc-950 dark:to-zinc-900
        px-4 transition-colors duration-500
      "
    >
      {/* Animated Background Glow */}
      <div
        className="
          absolute -top-40 left-[-120px]
          w-[500px] h-[500px]
          bg-violet-500/20
          dark:bg-violet-400/10
          blur-3xl rounded-full
          animate-pulse
          -z-10
        "
      />

      <div
        className="
          absolute bottom-[-120px] right-[-100px]
          w-[450px] h-[450px]
          bg-cyan-400/20
          dark:bg-cyan-500/10
          blur-3xl rounded-full
          animate-pulse
          -z-10
        "
      />

      {/* Grid Overlay */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]
          dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
          bg-[size:40px_40px]
          -z-10
        "
      />

      {/* Card Wrapper */}
      <section
        className="
          relative z-10
          w-full max-w-md
          rounded-3xl
          border border-white/20 dark:border-white/10
          bg-white/70 dark:bg-white/5
          backdrop-blur-2xl
          shadow-2xl
          p-6 md:p-8
        "
      >
        {/* Top Accent */}
        <div
          className="
            absolute inset-x-0 top-0 h-[3px]
            bg-gradient-to-r
            from-violet-500 via-cyan-400 to-fuchsia-500
            rounded-t-3xl
          "
        />

        <RegisterForm />
      </section>
    </main>
  );
};

export default RegisterPage;