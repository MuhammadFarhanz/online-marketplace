// hooks/useImageUpload.ts
import { FormikHelpers } from "formik";
import { useState } from "react";
import { ProductFormValues } from "../features/add-product/formUtils";

interface UseImageUploadProps {
    formik: FormikHelpers<ProductFormValues>; 
  }

export const useImageUpload = ({ formik }: UseImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string[]>([]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const file = event.currentTarget.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageString = reader.result as string;
        setSelectedImage((previousImages) => {
          const updatedImages = [...previousImages];
          updatedImages[index] = imageString;
          return updatedImages;
        });
        formik.setFieldValue("image", selectedImage);
      };

      
      reader.readAsDataURL(file);
    }
  };

  return { selectedImage, handleImageChange };
};
