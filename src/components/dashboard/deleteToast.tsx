import React, { useState } from "react";

interface Props {
  onDelete: () => void;
}
const DeleteConfirmationToast: React.FC<Props> = ({ onDelete }) => {
  const [showToast, setShowToast] = useState(true);

  const handleConfirmDelete = () => {
    onDelete();
    setShowToast(false);
  };

  const handleCancelDelete = () => {
    setShowToast(false);
  };

  return showToast ? (
    <div className="toast-container">
      <div className="toast-content">
        <p>Are you sure you want to delete the product ?</p>
        <button onClick={handleConfirmDelete}>Yes, delete</button>
        <button onClick={handleCancelDelete}>Cancel</button>
      </div>
    </div>
  ) : null;
};

export default DeleteConfirmationToast;
