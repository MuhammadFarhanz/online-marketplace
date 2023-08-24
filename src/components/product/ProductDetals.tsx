import Link from "next/link";

const ProductDetails = ({
  name,
  price,
  condition,
  location,
  description,
  author,
  authorId,
}: any) => {
  return (
    <div className="flex flex-col gap-4 p-4 lg:w-2/4">
      <div className="flex-grow">
        <h1 className="mb-2 border-b border-black pb-2 text-2xl font-bold sm:text-3xl">
          {name}
        </h1>
        <h6 className="mb-4 mt-4 text-xl font-semibold sm:text-2xl">
          Rp. {price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </h6>

        <div className="mb-2 flex flex-row">
          <p className="font-semibold"> Condition:</p>
          <p className="ml-2">{condition}</p>
        </div>
        <p className="mb-2 flex flex-row text-gray-700 ">
          <p className="font-semibold"> Location:</p>
          <p className="ml-2">{location}</p>
        </p>
        <div className="mb-2 whitespace-normal">
          <span className="mb-2 font-semibold">Detail:</span>
          <p className="whitespace-normal break-words text-gray-700">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center border-0 border-t border-gray-300 pb-3 pt-3">
        <img
          src={author?.image || ""}
          alt="user-photo"
          className="h-10  rounded-full sm:h-14"
        />
        <div className="flex flex-col">
          <span className="ml-4 items-end">{author?.name}</span>
          <span className="ml-4 text-green-500">Online</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-12 sm:justify-normal">
        <Link href={`/chat/?recipient=${authorId}`}>
          <div className="bg-black">
            <button className="flex h-10 w-10 -translate-x-1 -translate-y-1 items-center justify-center border border-black  bg-slate-100 px-16 py-3 font-semibold text-black hover:bg-purple-200 sm:h-full">
              Chat
            </button>
          </div>
        </Link>
        <div className="bg-black sm:w-full">
          <button className="flex h-10 w-full -translate-x-1 -translate-y-1 items-center justify-center border  border-black bg-slate-100 px-10 py-3 font-semibold text-black sm:h-full">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
