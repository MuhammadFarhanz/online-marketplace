import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetProductById } from "~/pages/hooks/useGetProductById";
import { api } from "~/utils/api";

const ProductView: NextPage = () => {
  const { data, error } = useGetProductById();
 
  const [mainImage, setMainImage] = useState(data?.image[0]?.url);

  const handleThumbnailClick = (thumbnailUrl:any) => {
    setMainImage(thumbnailUrl);
  };

  useEffect(() => {
    if (data && data.image.length > 0) {
      setMainImage(data?.image[0]?.url);
    }
  }, [data]);


  if (!data) {
    return <div>Loading...</div>; // Replace with your loading UI 
  }
  console.log(data)

  return (
    <>
      <Head>
        <title>view product</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen bg-[#F8F8F8] font-helvetica">

      <div className="container mx-auto mt-10">
        <div className="flex flex-col justify-between lg:flex-row lg:gap-16 md:gap-10 ">
          <div className="flex flex-col gap-6 lg:w-2/4 ">
            <img src={!data? '': mainImage} alt="" className="w-full h-full aspect-square object-cover" />
            <div className="flex flex-row justify-center  items-endh-24">
            {data?.image.map((thumbnail, index) => (
            <img
              key={index}
              src={thumbnail.url}
              alt=""
              className="w-14 h-14  cursor-pointer mr-3"
              onClick={() => handleThumbnailClick(thumbnail.url)}
            />
            ))}
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4 ">
            <div className="flex-grow">
              <h1 className="text-3xl font-bold mb-2">{data?.name}</h1>
              <p className="text-gray-700 mb-2">Location:{data?.location}</p>
              <p className="text-gray-700 mb-2">Condition:{data?.condition}</p>
              <span className="mb-2">Detail:</span>
              <p className="text-gray-700 flex items-strech ">{data?.description}</p>
            </div>
            <h6 className="text-2xl font-semibold">Rp. {data?.price}</h6>

              <div className=" flex items-center">
                <img src={data?.author?.image || ''} alt="user-photo" className="h-14 rounded-full"></img>
                <span className=" ml-4">{data?.author?.name}</span>
              </div>

          
            <div className="flex flex-row items-center gap-12">
             <Link href={`/features/chat/?recipient=${data.authorId}`}>
             <button className="bg-black text-white font-semibold py-3 px-16 h-full">Chat</button>
             </Link>
             
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
