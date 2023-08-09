// components/FormUtils.ts
import * as yup from "yup";

export interface ProductFormValues {
    id: string | undefined ;
    name: string;
    description: string;
    price: string;
    image: string[];
    condition: string;
    location: string;
    category: string;
}

export const productValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup
      .string()
      .min(10, "Description should contain at least 10 characters")
      .required("Description is required"),
    price: yup
      .string()
      .min(3, "The minimum product price is IDR 100")
      .required("Price is required"),
    image: yup
      .array()
      .of(yup.string())
      .min(1, "At least one image is required"),
    condition: yup.string().required("Condition is required"),
    location: yup.string().required("Location is required"),
    category: yup.string().required("Category is required"),
});
