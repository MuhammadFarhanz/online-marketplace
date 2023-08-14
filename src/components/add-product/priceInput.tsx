import React from "react";

const PriceInput = ({
  formik,
  handleInputPriceChange,
  formattedPrice,
}: any) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    handleInputPriceChange(event);
    formik.handleChange(event);
  };

  return (
    <>
      <div className="flex flex-row">
        <span className="flex items-center rounded rounded-r-none bg-gray-400 px-3 font-bold ">
          Rp
        </span>
        <input
          className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight
                  text-gray-700 shadow focus:outline-none ${
                    formik.touched.price && formik.errors.price
                      ? "border border-red-500"
                      : ""
                  }`}
          id="price"
          type="text"
          name="price"
          value={formattedPrice}
          placeholder="Enter price"
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.price && formik.errors.price && (
        <div className="text-red-500">{formik.errors.price}</div>
      )}
    </>
  );
};

export default PriceInput;
