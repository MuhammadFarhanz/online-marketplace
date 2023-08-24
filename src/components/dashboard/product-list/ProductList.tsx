import React from "react";
import ProductTableRow from "./ProductRow";

interface Product {
  name: string;
  id: string;
  description: string;
  image: any;
  price: number;
  condition: string;
  category: string;
  location: string;
}
interface ProductListProps {
  products: Product[] | undefined;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

/**
 * Renders a list of products with their details.
 *
 * @component
 * @param {ProductListProps} props - The component props.
 * @returns {JSX.Element} The JSX element representing the list of products.
 */
const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="m-2 mx-auto h-full w-full max-w-6xl bg-black ">
      <div className="-translate-x-1 -translate-y-1  border-2 border-black bg-white ">
        <main className="flex-1">
          <div className="h-screen w-full ">
            <div className="flex h-16 flex-row items-center justify-between border-b-2 border-black bg-[#D2D2D2] p-6 pb-4 text-xl font-bold">
              <div className="w-[30%] flex-shrink-0">Product Name</div>
              <div className="flex w-3/4">
                <div className="w-1/4 ">Price</div>
                <div className="w-1/4 ">Stock</div>
                <div className="w-1/4 ">Active</div>
                <div className="w-1/4 "></div>
              </div>
            </div>

            {products?.length == 0 ? (
              <div className="flex h-full items-center justify-center font-bold">
                No products available. Start adding products to showcase here.
              </div>
            ) : (
              products?.map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  onEdit={() => onEdit(product)}
                  onDelete={() => onDelete(product.id)}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductList;
