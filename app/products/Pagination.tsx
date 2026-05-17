type PaginationProps = {
  page: number;
  pages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  page,
  pages,
  setPage,
}: PaginationProps) => {
  return (
    <div className="flex items-center gap-2 mt-5">

      {/* Prev */}
      <button
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
        disabled={page === 1}
        className={`px-3 py-1 border rounded ${
          page === 1
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-100"
        }`}
      >
        Prev
      </button>

      {/* Numbers */}
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 border rounded transition ${
            page === i + 1
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => {
          if (page < pages) {
            setPage(page + 1);
          }
        }}
        disabled={page === pages}
        className={`px-3 py-1 border rounded ${
          page === pages
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;