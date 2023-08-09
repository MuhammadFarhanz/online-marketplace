import React from "react";

const TextInput = ({ field, form, ...props }: any) => (
  <input
    className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2
      leading-tight text-gray-700 shadow focus:outline-none ${
        form.touched[field.name] && form.errors[field.name]
          ? "border border-red-500"
          : ""
      }`}
    {...field}
    {...props}
  />
);

export default TextInput;
