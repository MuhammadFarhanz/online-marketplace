import Toast from "./Toast";
import ProductTableRow from "./productTableRow";

const DashboardTable = ({ products, onEdit, onDelete, isToastOpen }: any) => {
  console.log(products, "su asu");

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4 h-[90vh] w-full pr-2">
      <main className="flex-1 bg-gray-100">
        <div className=" h-10 w-full p-4 text-xl font-bold">All Product</div>

        <div className=" mt-4 h-[90vh] w-full  pr-2">
          <div className="flex flex-row justify-between rounded-t-md border-b border-white bg-black p-2 text-xl text-white">
            <div className=" w-1/5">product name</div>
            <div className=" w-1/5">price</div>
            <div className=" w-1/5">stok</div>

            <div className=" w-1/5">active</div>
            <div className=" w-1/5"></div>
          </div>

          {products.map((product: any) => (
            <ProductTableRow
              key={product.id}
              product={product}
              onEdit={() => onEdit(product)}
              onDelete={() => onDelete(product.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardTable;
