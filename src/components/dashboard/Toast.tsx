import React from "react";

const Toast = ({ productId, handleClick, setIsToastOpen }: any) => {
  console.log(productId);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-4">
        <p className="mb-2 text-lg font-bold text-black">Are you sure?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleClick}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Yes
          </button>
          <button
            onClick={() => setIsToastOpen(false)}
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
