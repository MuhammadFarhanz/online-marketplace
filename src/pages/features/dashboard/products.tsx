import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetProductById } from "~/pages/hooks/useGetProductById";
import { api } from "~/utils/api";
import EditProductModal from "./editProductForm";
import DeleteIcon from "~/pages/assets/deleteIcon";

const Dasboard: NextPage = () => {
  const { data: products } = api.product.getAllProductById.useQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products);

  const handleEditProduct = (products: any) => {
    setSelectedProduct(products);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>view product</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" bg-[#F8F8F8] font-helvetica">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="m-2 w-1/5 rounded-md bg-black px-4 py-8 text-white">
            <h1 className="text-2xl font-semibold">Product Dashboard</h1>
            <ul className="mt-6 space-y-3">
              <li className="rounded-md px-2 py-1 hover:bg-gray-700">
                Dashboard
              </li>
              <li className="rounded-md px-2 py-1 hover:bg-gray-700">Orders</li>
              <li className="rounded-md px-2 py-1 hover:bg-gray-700">
                Products
              </li>
              {/* Add more menu items */}
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-gray-100">
            {/* Add your dashboard components here */}
            <div className=" h-10 w-full p-4 text-xl font-bold">
              All Product
            </div>

            <div className=" mt-4 h-[90vh] w-full  pr-2">
              <div className="flex flex-row justify-between rounded-t-md border-b border-white bg-black p-2 text-xl text-white">
                <div className=" w-1/5">product name</div>
                <div className=" w-1/5">price</div>
                <div className=" w-1/5">stok</div>

                <div className=" w-1/5">active</div>
                <div className=" w-1/5"></div>
              </div>

              {products?.map((product) => {
                return (
                  <div className="flex flex-col">
                    <div className=" flex flex-row items-center justify-between border-b bg-black p-4  text-white ">
                      <>
                        <div className=" flex w-1/5 flex-row truncate ">
                          <img
                            src={product.image[0]?.url}
                            className="mr-2 h-14 w-14 rounded-md"
                          ></img>
                          <div className="flex flex-col">
                            <p>{product.name} </p>
                            <p>SKU: - </p>
                          </div>
                        </div>
                        <div className=" w-1/5">{product.price}</div>
                        <div className=" w-1/5">1</div>

                        <div className=" w-1/5">
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              value=""
                              className="peer sr-only"
                            />
                            <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 dark:border-gray-600 dark:bg-gray-700 "></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                          </label>
                        </div>

                        <div className="flex w-1/5 flex-row justify-between">
                          <button
                            onClick={() => handleEditProduct(selectedProduct)}
                            type="button"
                            className="mr-2 flex flex-row items-center rounded-lg bg-[#F8F8F8] px-5 py-2.5 font-medium text-black  "
                          >
                            edit item
                          </button>
                          <button
                            type="button"
                            className="mr-2 flex flex-row items-center rounded-lg  bg-[#F8F8F8] px-5 py-2.5 font-medium text-black  "
                          >
                            <DeleteIcon />
                            delete item
                          </button>
                        </div>
                      </>
                    </div>
                  </div>
                );
              })}
            </div>
            {isModalOpen && <EditProductModal onClose={handleCloseModal} />}
          </main>
        </div>
      </main>
    </>
  );
};

export default Dasboard;
