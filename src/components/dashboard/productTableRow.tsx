import DeleteIcon from "~/components/SVGComponents/deleteIcon";
import EditIcon from "~/components/SVGComponents/editIcon";


const ProductTableRow = ({ product, onEdit, onDelete }: any) => {
  return (
    <div className="flex flex-col">
      <div className="mt-2 flex flex-row items-center justify-between rounded border border-black p-4">
        {/* ... Product row content ... */}
        <>
          {/* {isToastOpen && <Toast productId={product.id} />} */}
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
              <input type="checkbox" value="" className="peer sr-only" />
              <div
                className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full 
               peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 dark:border-gray-600 dark:bg-gray-700 "
              ></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
            </label>
          </div>

          <div className="flex w-1/5 flex-row justify-between">
            <button
              onClick={() => onEdit(product)}
              type="button"
              className="mr-2 flex flex-row items-center rounded-lg border border-black bg-[#F8F8F8] px-5 py-2.5 font-medium text-black "
            >
              <EditIcon />
              edit
            </button>
            <button
              type="button"
              className="mr-2 flex flex-row items-center rounded-lg  border border-black bg-[#F8F8F8] px-5 py-2.5 font-medium text-black"
              // onClick={() => handleClick(product.id)}
              onClick={() => onDelete(product.id)}
            >
              <DeleteIcon />
              delete
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default ProductTableRow;
