"use client";


const ProductsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 rounded-3xl animate-pulse">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="h-10 w-40 bg-gray-300 rounded-2xl"></div>

          <div className="h-8 w-52 bg-gray-300 rounded-xl"></div>

          <div className="h-5 w-24 bg-gray-300 rounded-lg"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-60 bg-gray-300"></div>

              {/* Content */}
              <div className="p-4 space-y-4">
                <div className="h-6 w-3/4 bg-gray-300 rounded"></div>

                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>

                <div className="flex items-center justify-between pt-2">
                  <div className="h-6 w-20 bg-gray-300 rounded"></div>

                  <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-10">
          <div className="bg-white shadow-sm border rounded-xl px-4 py-3 flex gap-3">
            <div className="h-10 w-10 bg-gray-300 rounded-lg"></div>
            <div className="h-10 w-10 bg-gray-300 rounded-lg"></div>
            <div className="h-10 w-10 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSkeleton;