import React from "react";

const TextAreaInput = ({ field, form, ...props }: any) => (
  <textarea
    className={`focus:shadow-outline h-32 w-full appearance-none rounded border px-3
      py-2 leading-tight text-gray-700 shadow focus:outline-none
      ${
        form.touched[field.name] && form.errors[field.name]
          ? "border border-red-500"
          : ""
      }`}
    {...field}
    {...props}
  />
);

export default TextAreaInput;
