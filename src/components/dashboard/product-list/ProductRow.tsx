import DeleteIcon from "~/components/svgcomponent/deleteIcon";
import EditIcon from "~/components/svgcomponent/editIcon";

interface ProductTableRowProps {
  product: any;
  onEdit: (product: any) => void;
  onDelete: (productId: string) => void;
}

/**
 * Represents a table row for displaying product information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product data to display.
 * @param {Function} props.onEdit - The callback function to handle editing the product.
 * @param {Function} props.onDelete - The callback function to handle deleting the product.
 * @returns {JSX.Element} The JSX element for the product table row.
 */

const ProductTableRow = ({
  product,
  onEdit,
  onDelete,
}: ProductTableRowProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-row items-center justify-between border-b-2 border-black p-4">
        {/* ... Product row content ... */}

        <>
          <div className=" flex w-[30%] flex-shrink-0 flex-row truncate ">
            <img
              src={product.image[0]?.url}
              className="mr-2 h-14 w-14 rounded-sm border border-black"
            ></img>
            <div className="flex flex-col">
              <p>{product.name} </p>
              <p>SKU: - </p>
            </div>
          </div>
          <div className="flex w-3/4 items-center">
            <div className=" w-1/4">{product.price}</div>
            <div className=" w-1/4">1</div>

            <div className=" flex w-1/4 items-center">
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" value="" className="peer sr-only" />
                <div
                  className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full 
               peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 dark:border-gray-600 dark:bg-gray-700 "
                ></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
              </label>
            </div>

            <div className="flex w-1/4 flex-row justify-between">
              <div className="mr-2 bg-black ">
                <button
                  onClick={() => onEdit(product)}
                  type="button"
                  className="flex -translate-x-[2px] -translate-y-[2px] flex-row items-center  border border-black bg-[#F8F8F8] px-5 py-2.5 font-medium text-black hover:bg-purple-300 "
                >
                  <EditIcon />
                  edit
                </button>
              </div>
              <div className="bg-black">
                <button
                  type="button"
                  className=" flex -translate-x-[2px] -translate-y-[2px] flex-row items-center  border border-black bg-[#F8F8F8] px-5 py-2.5 font-medium text-black hover:bg-purple-300"
                  onClick={() => onDelete(product.id)}
                >
                  <DeleteIcon />
                  delete
                </button>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default ProductTableRow;
