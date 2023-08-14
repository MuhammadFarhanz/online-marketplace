import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetProductById } from "~/hooks/useGetProductById";

const ProductView: NextPage = () => {
  const { data, error } = useGetProductById();
  const [mainImage, setMainImage] = useState<string | undefined>(
    data?.image[0]?.url
  );

  useEffect(() => {
    if (data && data.image.length > 0) {
      setMainImage(data.image[0]?.url);
    }
  }, [data]);

  if (!data) {
    return <div>Loading...</div>; // Replace with your loading UI
  }

  const handleThumbnailClick = (thumbnailUrl: string) => {
    setMainImage(thumbnailUrl);
  };

  return (
    <>
      <Head>
        <title>View Product</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen bg-[#F8F8F8] font-helvetica">
        <div className="container mx-auto mt-10">
          <div className="flex flex-col justify-between md:gap-10 lg:flex-row lg:gap-16 ">
            {/* Main Image and Thumbnails */}
            <div className="flex flex-col gap-6 lg:w-2/4 ">
              <img
                src={mainImage || ""}
                alt=""
                className="aspect-square h-full w-full object-cover"
              />
              <div className="flex h-24 flex-row items-end justify-center">
                {data.image.map((thumbnail, index) => (
                  <img
                    key={index}
                    src={thumbnail.url}
                    alt=""
                    className="mr-3 h-14 w-14 cursor-pointer"
                    onClick={() => handleThumbnailClick(thumbnail.url)}
                  />
                ))}
              </div>
            </div>
            {/* Product Details */}
            <div className="flex flex-col gap-4 lg:w-2/4 ">
              <div className="flex-grow">
                <h1 className="mb-2 border-b border-black pb-2 text-3xl font-bold">
                  {data.name}
                </h1>
                <h6 className="mb-4 mt-4 text-2xl font-semibold">
                  Rp.{" "}
                  {data.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </h6>

                <div className="mb-2 flex flex-row">
                  <p className="font-semibold"> Condition:</p>
                  <p className="ml-2">{data.condition}</p>
                </div>
                <p className="mb-2 flex flex-row text-gray-700">
                  <p className="font-semibold"> Location:</p>
                  <p className="ml-2">{data.location}</p>
                </p>
                <p className="mb-2">
                  <span className="mb-2 font-semibold">Detail:</span>
                  <p className="items-strech flex text-gray-700 ">
                    {data?.description}
                  </p>
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src={data.author?.image || ""}
                  alt="user-photo"
                  className="h-14 rounded-full"
                />
                <span className="ml-4">{data.author?.name}</span>
              </div>
              <div className="flex flex-row items-center gap-12">
                <Link href={`/features/chat/?recipient=${data.authorId}`}>
                  <button className="h-full bg-black px-16 py-3 font-semibold text-white">
                    Chat
                  </button>
                </Link>
                <button className="h-full w-full bg-black px-16 py-3 font-semibold text-white">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductView;
