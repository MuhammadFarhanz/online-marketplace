import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetProductById } from "~/pages/hooks/useGetProductById";
import { api } from "~/utils/api";

const ProductView: NextPage = () => {
  const product = useGetProductById();
 
  console.log(product,'akwkow')

  return (
    <>
      <Head>
        <title>view product</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen bg-[#F8F8F8]">

      <div className="container mx-auto mt-10">
        <div className="flex flex-col justify-between lg:flex-row lg:gap-16 md:gap-10 lg:items-stretch">
          <div className="flex flex-col gap-6 lg:w-2/4 ">
            <img src={product?.image[0]?.url} alt="" className="w-full h-full aspect-square object-cover" />
            <div className="flex flex-row justify-between h-24">
              <img src={product?.image[0]?.url} alt="" className="w-24 h-24 rounded-md cursor-pointer" />
              <img src={product?.image[0]?.url} alt="" className="w-24 h-24 rounded-md cursor-pointer" />
              <img src={product?.image[0]?.url} alt="" className="w-24 h-24 rounded-md cursor-pointer" />
              <img src={product?.image[0]?.url} alt="" className="w-24 h-24 rounded-md cursor-pointer" />
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4 ">
            <div className="flex-grow">
              <h1 className="text-3xl font-bold">{product?.name}</h1>
              <p className="text-gray-700">Location:{product?.location}</p>
              <p className="text-gray-700">Condition:{product?.condition}</p>
              <p className="text-gray-700">Detail:{product?.description}</p>
            </div>
            <h6 className="text-2xl font-semibold">Rp. {product?.price}</h6>
            <div className="flex flex-row items-center gap-12">
             
              <button className="bg-black text-white font-semibold py-3 px-16 h-full">Chat</button>
              <button className="bg-black text-white font-semibold py-3 px-16 h-full w-full">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      </main>
    </>
  );
};

export default ProductView;
