import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { productValidationSchema } from "../add-product/form/utils";
import { useUpdateProduct } from "~/hooks/useUpdateProduct";
import { useImageUpload } from "~/hooks/useImageUpload";
import { categoryOptions } from "~/constants/categoryOptions";
import { cityOptions } from "~/constants/cityOption";
import FormField from "../add-product/form/FormField";
import TextInput from "../add-product/form/TextInput";
import TextAreaInput from "../add-product/form/TextAreaInput";
import ImageUpload from "../add-product/form/ImageForm";
import ErrorField from "../ErrorField";

interface Props {
  onClose: () => void;
  product: any;
  refetch: () => void;
}

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

  useEffect(() => {
    setSelectedImage(formik.values.image);
  }, []);

  const style = {
    control: (base: any) => ({
      ...base,
      border: 0,
      boxShadow: "none",
    }),
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-black">
        <div className="w-[800px] -translate-x-1 -translate-y-1 border-2 border-black bg-white p-6 ">
          <h2 className="mb-4 text-2xl font-bold">Edit Product</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Name">
                <TextInput
                  field={formik.getFieldProps("name")}
                  placeholder="Enter name"
                  form={formik}
                />
                <ErrorField
                  touched={formik.touched.name}
                  error={formik.errors.name}
                />
              </FormField>

              <FormField label="Price">
                <input
                  type="number"
                  id="price"
                  className="w-full rounded-sm border-2 border-gray-400 px-2 py-1"
                  name="price"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
                <ErrorField
                  touched={formik.touched.price}
                  error={formik.errors.price}
                />
              </FormField>
              <FormField label="Category">
                <Select
                  styles={style}
                  className="rounded-sm border-2 border-gray-400"
                  options={categoryOptions}
                  placeholder="Select a category"
                  isSearchable
                  maxMenuHeight={5 * 40}
                  onChange={(selectedOption) => {
                    formik.setFieldValue("category", selectedOption?.value);
                  }}
                  value={categoryOptions.find(
                    (option) => option.value === formik.values.category
                  )}
                />
                <ErrorField
                  touched={formik.touched.category}
                  error={formik.errors.category}
                />
              </FormField>

              <FormField label="Location">
                <Select
                  styles={style}
                  className="rounded-sm border-2 border-gray-400"
                  options={cityOptions}
                  placeholder="Select a city"
                  isSearchable
                  onChange={(selectedOption) => {
                    formik.setFieldValue("location", selectedOption?.value);
                  }}
                  value={cityOptions.find(
                    (option) => option.value === formik.values.location
                  )}
                  maxMenuHeight={5 * 40}
                />
                <ErrorField
                  touched={formik.touched.location}
                  error={formik.errors.location}
                />
              </FormField>
            </div>

            <FormField label="Description">
              <TextAreaInput
                field={formik.getFieldProps("description")}
                placeholder="Description"
                form={formik}
              />
              <ErrorField
                touched={formik.touched.description}
                error={formik.errors.description}
              />
            </FormField>

            <ImageUpload
              selectedImage={selectedImage}
              handleImageChange={handleImageChange}
              handleImageDelete={handleImageDelete}
              formik={formik}
            />

            <div className="flex justify-end">
              <div className="mr-4 bg-black">
                <button
                  type="submit"
                  className="-translate-x-1 -translate-y-1 border-2 border-black bg-white px-4 py-2 text-black hover:bg-purple-300"
                >
                  Save
                </button>
              </div>
              <div className="mr-2 bg-black">
                <button
                  className="-translate-x-1 -translate-y-1 border-2 border-black bg-white px-4 py-2 text-black hover:bg-purple-300"
                  onClick={() => onClose()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
