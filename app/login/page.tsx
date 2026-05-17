import React from "react";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gray-100 dark:bg-black
        px-4
      "
    >
      {/* Container */}
      <div className="w-full max-w-md ">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;