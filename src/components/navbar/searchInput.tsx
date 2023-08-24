import React from "react";

const SearchInput = () => {
  return (
    <div className=" bg-black">
      <div className="border-1 relative flex h-10 w-full -translate-x-[2px] -translate-y-[2px] items-center overflow-hidden border border-black bg-[#D2D2D2]  focus-within:shadow-lg sm:h-12">
        <div className="grid h-full w-12 place-items-center text-[#9E9E9E]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className="peer h-full w-full bg-[#D2D2D2] pr-2 text-sm text-gray-700 outline-none"
          type="text"
          id="search"
          placeholder="Search something.."
        />
      </div>
    </div>
  );
};

export default SearchInput;
