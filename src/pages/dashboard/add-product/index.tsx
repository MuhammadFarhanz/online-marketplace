import { api } from "~/utils/api";
import { NextPage } from "next";
import Head from "next/head";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import Select from "react-select";

import {
  ProductFormValues,
  productValidationSchema,
} from "../../../components/add-product/formUtils";
import SuccessToast from "../../../components/add-product/sucessToast";

import TextInput from "../../../components/add-product/textInput";
import FormField from "../../../components/add-product/formField";
import TextAreaInput from "../../../components/add-product/textAreaInput";
import ImageUpload from "../../../components/add-product/ImageUpload";
import RadioButtonGroup from "../../../components/add-product/radioButtonGroup";
import PriceInput from "../../../components/add-product/priceInput";
import { useCreateProduct } from "~/hooks/useCreateProduct";
import { useImageUpload } from "~/hooks/useImageUpload";
import { usePriceInput } from "~/hooks/useInputPrice";
import { cityOptions } from "~/constants/cityOption";
import { categoryOptions } from "~/constants/categoryOptions";

const AddProduct: NextPage = () => {
  const router = useRouter();
  const createProduct = useCreateProduct();

  const validationSchema = productValidationSchema;

  const formik = useFormik<ProductFormValues>({
    initialValues: {
      id: undefined,
      name: "",
      description: "",
      price: "",
      image: [],
      condition: "new",
      location: "",
      category: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: ProductFormValues, { resetForm }) => {
      console.log(values.image);
      const priceWithoutDots = values.price.replace(/\./g, ""); // Remove dots from the price
      const convertedPrice = Number(priceWithoutDots); // Convert price field to a number

      createProduct({ ...values, price: convertedPrice });

      setShowSuccessToast(true);

      // Hide success message toast after 3 seconds
      setTimeout(() => {
        setShowSuccessToast(false);
        resetForm();
        setSelectedImage([]);
      }, 3000);
    },
  });

  const {
    selectedImage,
    handleImageChange,
    handleImageDelete,
    setSelectedImage,
  } = useImageUpload({ formik });

  const { formattedPrice, handleInputPriceChange } = usePriceInput();

  const [showSuccessToast, setShowSuccessToast] = useState(false);

  return (
    <>
      {/* <Head>
        <title>Add Product</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <div className="m-2 mx-auto w-full max-w-6xl rounded border border-black p-6 font-helvetica">
        <div className=" h-10 w-full  text-xl font-bold">Add Product</div>
        <form onSubmit={formik.handleSubmit} className=" h-auto  bg-white ">
          <SuccessToast
            message="Product created successfully!"
            show={showSuccessToast}
          />
          <FormField label="Name">
            <TextInput
              field={formik.getFieldProps("name")}
              placeholder="Enter name"
              form={formik}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </FormField>
          <FormField label="Description">
            <TextAreaInput
              field={formik.getFieldProps("description")}
              placeholder="Description"
              form={formik}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}
          </FormField>

          <FormField label="Price">
            <PriceInput
              formik={formik}
              handleInputPriceChange={handleInputPriceChange}
              formattedPrice={formattedPrice}
            />
          </FormField>

          <ImageUpload
            selectedImage={selectedImage}
            handleImageChange={handleImageChange}
            handleImageDelete={handleImageDelete}
            formik={formik}
          />

          <FormField label="Condition">
            <RadioButtonGroup
              field={formik.getFieldProps("condition")}
              options={[
                { label: "New", value: "new" },
                { label: "Used", value: "used" },
              ]}
            />
          </FormField>

          <FormField label="Location">
            <Select
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
            {formik.touched.location && formik.errors.location && (
              <div className="text-red-500">{formik.errors.location}</div>
            )}
          </FormField>

          <FormField label="Category">
            <Select
              // options={categoryOptions}
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
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500">{formik.errors.category}</div>
            )}
          </FormField>

          <div className="flex items-center justify-end">
            <button
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;