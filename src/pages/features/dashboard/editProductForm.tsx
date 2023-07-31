// src/components/EditProductModal.js

import React, { useState } from 'react';
import Select from 'react-select';
import { categoryOptions } from '~/pages/utils/categoryOptions';
import { cityOptions } from '~/pages/utils/cityOption';

interface Props {
 onClose: () => void;
}

const EditProductModal: React.FC<Props> = ({ onClose }) => {

 
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700">
      <div className="bg-white rounded-lg p-6 w-[600px] ">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <div className='  grid grid-cols-2 gap-4'>
            <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-1">Name</label>
            <input
                type="text"
                id="name"
            
                className="w-full border border-gray-300 px-2 py-1 rounded"
            />
            </div>
            <div className="mb-4">
            <label htmlFor="price" className="block font-bold mb-1">Price</label>
            <input
                type="number"
                id="price"
        
                className="w-full border border-gray-300 px-2 py-1 rounded"
            />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-900 font-bold">Category</label>
                <Select
                options={categoryOptions}
                placeholder="Select a category"
                isSearchable
                maxMenuHeight={5 * 40} 
            
                />
            </div>
            <div className="mb-4">
            <label className="block mb-2 text-sm  text-gray-900 font-bold">Location</label>
             <Select
                options={cityOptions}
                placeholder="Select a city"
                isSearchable
          
                />
                
            </div>
  
        
        </div>
        <div>
        <label htmlFor="name" className="block font-bold mb-1">Description</label>
        <textarea
            className='border rounded-md w-full p-2 border-black'
            placeholder="Product Description"
        />
        </div>
        {/* <div className='bg-black h-20'></div> */}

        <div>
        <label htmlFor="name" className="block font-bold mb-1">Image</label>
                <label
               
              
                  className={`flex items-center justify-center w-24  h-24 border-2 
                   "border-dashed"
                   rounded-lg cursor-pointer  border-dashed' }`}
                >
                  {/* {selectedImage[index] ? (
                <img src={selectedImage[index]} alt="upload" className="object-cover w-20 h-20" />
              ) : ( */}
                <svg
                  className="w-8 h-8 text-gray-500 dark:text-gray-400"
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
              {/* )} */}
                  <input
              
                    type="file"
                    className="hidden"
                    accept="image/*"
             
                  />
                </label>
              {/* ))} */}
        </div>



        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
      
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
