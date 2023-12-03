"use client";


const Pagination = ({ totalPages, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-between gap-3">
      <button
        className="w-24 border-none p-2 bg-orange-500 rounded-lg text-black cursor-pointer"
        disabled={currentPage === 1}
        onClick={() => paginate(currentPage - 1)}
      >
        Previous
      </button>

      <div className="flex gap-1">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`w-8 border-none p-2 ${
              currentPage === number ? 'bg-gray-600 text-white' : 'bg-orange-400 text-black'
            } rounded-lg text-center cursor-pointer`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        className="w-24 border-none p-2 bg-orange-500 rounded-lg text-black cursor-pointer"
        disabled={currentPage === totalPages}
        onClick={() => paginate(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};




export default Pagination;
