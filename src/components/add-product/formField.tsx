import React from "react";

const FormField = ({ label, children }: any) => (
  <div className="mb-4">
    <label className="mb-2 block text-sm font-bold text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

export default FormField;
