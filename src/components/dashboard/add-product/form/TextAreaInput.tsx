import { FieldInputProps, FormikProps } from "formik";
import React from "react";

interface Props {
  field: FieldInputProps<string>;
  placeholder: string;
  form: FormikProps<any>;
}

const TextAreaInput = ({ field, form, ...props }: Props) => (
  <textarea
    className={`focus:shadow-outline h-48 w-full appearance-none rounded-sm border-2 px-3
      py-2 leading-tight text-gray-700 shadow focus:outline-none
      ${
        form.touched[field.name] && form.errors[field.name]
          ? "border border-red-500"
          : "border-gray-400"
      }`}
    {...field}
    {...props}
  />
);

export default TextAreaInput;
