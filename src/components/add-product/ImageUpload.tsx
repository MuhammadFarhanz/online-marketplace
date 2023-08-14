import React from "react";

const ImageUpload = ({
  selectedImage,
  handleImageChange,
  handleImageDelete,
  formik,
}: any) => {
  const labels = [1, 2, 3, 4, 5];

  return (
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
            {/* ... (Image preview or placeholder) */}
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

export default ImageUpload;
