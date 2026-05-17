import React from "react";
import ProductsPage from "./ProductsPage";

const page = () => {
  return (
    <div className="min-h-screen bg-amber-300 px-4 sm:px-6 lg:px-12 py-6">
      <div className="max-w-7xl mx-auto">
        <ProductsPage />
      </div>
    </div>
  );
};

export default page;