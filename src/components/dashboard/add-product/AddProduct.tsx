import { useFormik } from "formik";
import { useState } from "react";
import Select from "react-select";
import { ProductFormValues, productValidationSchema } from "./form/utils";
import SuccessToast from "./toast/SucessToast";
import TextInput from "./form/TextInput";
import FormField from "./form/FormField";
import TextAreaInput from "./form/TextAreaInput";
import ImageUpload from "./form/ImageForm";
import RadioButtonGroup from "./form/RadioForm";
import PriceInput from "./form/PriceInput";
import { useCreateProduct } from "~/hooks/useCreateProduct";
import { useImageUpload } from "~/hooks/useImageUpload";
import { usePriceInput } from "~/hooks/useInputPrice";
import { cityOptions } from "~/constants/cityOption";
import { categoryOptions } from "~/constants/categoryOptions";
import ErrorField from "../ErrorField";

/**
 * Represents the components for adding a new product.
 *
 * This component provides a form for users to input details of a new product,
 * including name, description, price, images, condition, location, and category.
 * Upon submission, the product is created and a success message is displayed.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the AddProduct page.
 */

const AddProduct: React.FC = () => {
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
      resetForm();

      // Hide success message toast after 3 seconds
      setTimeout(() => {
        setShowSuccessToast(false);
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

  const style = {
    control: (base: any) => ({
      ...base,
      border: 0,
      boxShadow: "none",
    }),
  };

  return (
    <div className="mx-auto mt-2 h-full w-full max-w-6xl bg-black">
      <div className="h-auto -translate-x-1 -translate-y-1 border-2 border-black bg-white font-helvetica">
        <div className=" flex h-16 w-full items-center border-b-2 border-black bg-[#D2D2D2] p-6 text-xl font-bold">
          Add Product
        </div>
        <form onSubmit={formik.handleSubmit} className=" h-auto p-6 ">
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
            <ErrorField
              touched={formik.touched.name}
              error={formik.errors.name}
            />
          </FormField>

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
              className="rounded-sm border-2 border-gray-400"
              styles={style}
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

          <FormField label="Category">
            <Select
              className="rounded-sm border-2 border-gray-400"
              styles={style}
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

          <div className="flex items-center justify-end pt-4">
            <div className="bg-black">
              <button
                className="focus:shadow-outline -translate-x-1 -translate-y-1 border-2 border-black bg-white px-4 py-2 font-bold text-black hover:bg-purple-300 focus:outline-none"
                type="submit"
              >
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
