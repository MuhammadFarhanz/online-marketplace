// SuccessToast.tsx
import React from "react";

interface SuccessToastProps {
  message: string;
  show: boolean;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ message, show }) => {
  return (
    <>
      {show && (
        <div className="fixed bottom-5 right-5 z-50">
          <div className="rounded-md bg-green-500 p-4 text-white shadow-md">
            {message}
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessToast;
