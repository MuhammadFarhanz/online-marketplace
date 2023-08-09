import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useImageUpload } from "~/pages/hooks/useImageUpload";
import { useUpdateProduct } from "~/pages/hooks/useUpdateProduct";
import { categoryOptions } from "~/pages/utils/categoryOptions";
import { cityOptions } from "~/pages/utils/cityOption";
import { api } from "~/utils/api";
import { productValidationSchema } from "../add-product/formUtils";

interface Props {
  onClose: () => void;
  product: any;
  refetch: () => void;
}

// main problem its still not be able to updating indexing image , not fixed yet guys , no shit u idiot

const EditProductModal: React.FC<Props> = ({ onClose, product, refetch }) => {
  const updateProduct = useUpdateProduct();

  const formik = useFormik({
    initialValues: {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      location: product.location,
      description: product.description,
      image: product.image.map((img: any) => img.url),
      condition: "new",
    },
    validateOnChange: false,
    validationSchema: productValidationSchema,
    onSubmit: async (values) => {
      const { id, ...productData } = values;
      // console.log(typeof productData.price, "pie iki");
      formik.setFieldValue("image", selectedImage);
      try {
        await updateProduct(id, {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          category: productData.category,
          location: productData.location,
          image: selectedImage,
        });
        onClose();
        refetch();
        // Handle success if needed
        console.log("Product updated successfully");
      } catch (error) {
        // Handle error if needed
        console.error("Failed to update product:", error);
      }
    },
  });

  const {
    selectedImage,
    handleImageChange,
    handleImageDelete,
    setSelectedImage,
  } = useImageUpload({ formik });

  const labels = [1, 2, 3, 4, 5];

  useEffect(() => {
    setSelectedImage(formik.values.image);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="w-[800px] rounded-lg bg-white p-6 ">
        <h2 className="mb-4 text-2xl font-bold">Edit Product</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="name" className="mb-1 block font-bold">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded border border-gray-300 px-2 py-1"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">
                  {formik?.errors?.name as string}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="mb-1 block font-bold">
                Price
              </label>
              <input
                type="number"
                id="price"
                className="w-full rounded border border-gray-300 px-2 py-1"
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="text-red-500">
                  {formik?.errors?.price as string}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-900">
                Category
              </label>
              <Select
                options={categoryOptions}
                placeholder="Select a category"
                isSearchable
                maxMenuHeight={5 * 40}
                value={categoryOptions.find(
                  (option) => option.value === formik.values.category
                )}
                onChange={(selectedOption) => {
                  formik.setFieldValue("category", selectedOption?.value);
                }}
              />
              {formik.touched.category && formik.errors.category ? (
                <div className="text-red-500">
                  {formik?.errors?.category as string}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm  font-bold text-gray-900">
                Location
              </label>
              <Select
                options={cityOptions}
                placeholder="Select a city"
                isSearchable
                value={cityOptions.find(
                  (option) => option.value === formik.values.location
                )}
                onChange={(selectedOption) => {
                  formik.setFieldValue("location", selectedOption?.value);
                }}
              />
              {formik.touched.location && formik.errors.location ? (
                <div className="text-red-500">
                  {formik?.errors?.location as string}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="name" className="mb-1 block font-bold">
              Description
            </label>
            <textarea
              className="h-32  w-full rounded-md border p-2 "
              name="description"
              placeholder="Product Description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500">
                {formik?.errors?.description as string}
              </div>
            ) : null}
          </div>
          {/* <div className='bg-black h-20'></div> */}

          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Image
            </label>
            <div className="flex flex-wrap">
              {labels.map((label, index) => (
                <label
                  key={index}
                  htmlFor={`dropzone-file-${index}`}
                  className={`relative flex h-32 w-32 items-center justify-center border-2 ${
                    selectedImage[index] ? "border-solid" : "border-dashed"
                  } mx-2 my-2 cursor-pointer rounded-lg ${
                    formik.touched.image && formik.errors.image
                      ? "border-dashed border-red-500"
                      : ""
                  }`}
                >
                  {selectedImage[index] ? (
                    <>
                      <label
                        htmlFor={`dropzone-file-${index}`}
                        className="mx-2 my-4 flex h-28 w-28 cursor-pointer items-center justify-center rounded-lg border-2 border-solid "
                      >
                        <img
                          src={selectedImage[index]}
                          alt="upload"
                          className="h-28 w-28 object-cover"
                        />
                        <input
                          id={`dropzone-file-${index}`}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onBlur={formik.handleBlur}
                          onChange={(event) => handleImageChange(event, index)}
                        />

                        <button
                          className="absolute -right-4 -top-4 w-7 rounded-full bg-gray-300 p-1 text-sm text-white"
                          onClick={() => handleImageDelete(index)}
                        >
                          X
                        </button>
                      </label>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>

                      <input
                        id={`dropzone-file-${index}`}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        // value={formik.values.image}
                        onBlur={formik.handleBlur}
                        onChange={(event) => handleImageChange(event, index)}
                      />
                    </>
                  )}
                </label>
              ))}
            </div>
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500">
                {formik.errors.image as string}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Save
            </button>
            <button
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              onClick={() => onClose()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
