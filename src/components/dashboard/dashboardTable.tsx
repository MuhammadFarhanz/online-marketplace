import Toast from "./Toast";
import ProductTableRow from "./productTableRow";

const DashboardTable = ({ products, onEdit, onDelete, isToastOpen }: any) => {
  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-2 mx-auto h-screen w-full max-w-6xl rounded-md border border-black p-6">
      <main className=" flex-1  ">
        <div className=" h-10 w-full text-xl font-bold">All Product</div>

        <div className=" mt-4 h-[90vh] w-full  pr-2">
          <div className="flex flex-row justify-between rounded border border-black p-2 text-xl ">
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
