import React from "react";
import ImageIcon from "../../../svgcomponent/imageIcon";

interface Props {
  selectedImage: string[];
  handleImageChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleImageDelete: (index: number) => void;
  formik: any;
}

const ImageForm: React.FC<Props> = ({
  selectedImage,
  handleImageChange,
  handleImageDelete,
  formik,
}) => {
  const labels = [0, 1, 2, 3, 4];

  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-bold text-gray-700">
        Image
      </label>
      <div className="flex flex-wrap">
        {labels.map((index) => (
          <label
            key={`image-label-${index}`}
            htmlFor={`dropzone-file-${index}`}
            className={`relative flex h-32 w-32 items-center justify-center border-2 ${
              selectedImage[index] ? "border-solid" : "border-dashed"
            } mx-2 my-2 cursor-pointer rounded-lg ${
              formik.touched.image && formik.errors.image
                ? "border-dashed border-red-500"
                : "border-gray-400"
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
                    type="button"
                    className="absolute -right-4 -top-4 w-7 rounded-full bg-gray-400 p-1 text-sm text-white"
                    onClick={() => handleImageDelete(index)}
                  >
                    X
                  </button>
                </label>
              </>
            ) : (
              <ImageIcon />
            )}
            <input
              id={`dropzone-file-${index}`}
              type="file"
              className="hidden"
              accept="image/*"
              onBlur={formik.handleBlur}
              onChange={(event) => handleImageChange(event, index)}
            />
          </label>
        ))}
      </div>
      {formik.touched.image && formik.errors.image && (
        <div className="text-red-500">{formik.errors.image}</div>
      )}
    </div>
  );
};

export default ImageForm;
