"use client";

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  page,
  pages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      
      {/* Prev */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {/* Numbers */}
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`w-10 h-10 rounded-lg border transition ${
            page === i + 1
              ? "bg-black text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;