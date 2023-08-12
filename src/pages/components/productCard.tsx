import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

function ProductCard({ product }: any) {
  return (
    <Link
      prefetch={false}
      href={`/features/product/${product?.id}`}
      //    as={`/product/${product?.id}`}
    >
      <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-md border border-black bg-[#E9E9E9] font-helvetica shadow-md">
        <a className="relative mx-3 mt-3 flex h-60 overflow-hidden " href="#">
          <img
            className="w-full object-cover"
            src={product?.image[0]?.url}
            alt="product image"
          />
        </a>
        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="truncate text-xl font-bold tracking-tight text-slate-900">
              {product.name}
            </h5>
          </a>
          <div className="mb-5 mt-2 flex items-center justify-between">
            <p>
              <span className="text-lg font-bold  text-slate-900">
                Rp {product.price}
              </span>
            </p>
            <span className="text-lg font-bold  text-slate-900">
              {" "}
              {product.location}
            </span>
          </div>
          <a
            href="#"
            className="flex items-center justify-center rounded-sm bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to cart
          </a>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
