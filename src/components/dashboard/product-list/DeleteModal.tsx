import React from "react";
import XIcon from "~/components/svgcomponent/xCircke";

const DeleteModal = ({ handleClick, setIsToastOpen }: any) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-60 bg-black">
        <div className="flex -translate-x-1 -translate-y-1 flex-col items-center justify-center border-2 border-black bg-white p-6">
          <XIcon />
          <p className="mb-4 mt-4 text-lg font-bold text-black">
            Are you sure?
          </p>
          <div className="flex justify-between space-x-6">
            <div className="bg-black">
              <button
                onClick={handleClick}
                className="-translate-x-1 -translate-y-1 border-2 border-black bg-white px-6 py-2 text-black hover:bg-purple-300"
              >
                Yes
              </button>
            </div>
            <div className="bg-black">
              <button
                onClick={() => setIsToastOpen(false)}
                className="-translate-x-1 -translate-y-1 border-2 border-black bg-white px-6 py-2 text-black hover:bg-purple-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
