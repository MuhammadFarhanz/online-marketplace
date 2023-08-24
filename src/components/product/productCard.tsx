import PlusIcon from "../svgcomponent/plusIcon";

function ProductCard({ product }: any) {
  return (
    <div className="bg-black">
      <div className=" flex w-full max-w-xs -translate-x-1 -translate-y-1  flex-col overflow-hidden border border-black bg-[#E9E9E9]  font-helvetica shadow-md">
        <a
          className="relative  mx-2 mt-2 flex h-40 overflow-hidden sm:mx-3 sm:mt-3  sm:h-60 "
          href="#"
        >
          <img
            className="w-full transform  object-cover transition-transform duration-300 hover:scale-110"
            src={product?.image[0]?.url}
            alt="product image"
          />
        </a>
        <div className="px-3 pb-2 pt-1 sm:mt-4 sm:px-5 sm:pb-5">
          <a href="#">
            <h5 className="truncate text-base font-medium tracking-tight text-slate-900 sm:text-xl">
              {product.name}
            </h5>
          </a>
          <div className="mb-2 flex items-center justify-between sm:mb-5 sm:mt-2">
            <p>
              <span className="text-sm font-bold text-slate-900  sm:text-lg">
                Rp {product.price}
              </span>
            </p>
          </div>
          <a
            href="#"
            className="flex max-w-sm  items-center justify-center rounded-sm bg-black px-2 py-[7px] text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:px-5 sm:py-2.5"
          >
            <PlusIcon />
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
