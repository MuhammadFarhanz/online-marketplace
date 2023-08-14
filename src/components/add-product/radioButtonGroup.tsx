import React from "react";

const RadioButtonGroup = ({ field, options }: any) => (
  <div className="flex items-center">
    {options.map((option: any) => (
      <React.Fragment key={option.value}>
        <input
          type="radio"
          id={`condition-${option.value}`}
          name={field.name}
          value={option.value}
          className="form-radio"
          checked={field.value === option.value}
          onChange={field.onChange}
        />
        <label className="ml-1 mr-4">{option.label}</label>
      </React.Fragment>
    ))}
  </div>
);

export default RadioButtonGroup;
