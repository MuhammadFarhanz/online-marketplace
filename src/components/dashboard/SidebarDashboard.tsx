import ListIcon from "../svgcomponent/listIcon";
import OrdersIcon from "../svgcomponent/ordersIcon";
import PlusIcon from "../svgcomponent/plusIcon";

const DashboardSidebar = ({ setIsTableOpen, isTableOpen }: any) => {
  return (
    <aside className="font m-2 h-screen w-1/5 bg-black text-black">
      <div className="h-full -translate-x-1 -translate-y-1 border-2 border-black bg-white">
        <h1 className="border-b-2 border-black bg-[#D2D2D2] p-4 text-2xl font-semibold">
          Dashboard
        </h1>
        <ul className="mt-6 space-y-3">
          <li
            onClick={() => setIsTableOpen(true)}
            className={`${
              isTableOpen ? "text-purple-500" : null
            } flex cursor-pointer flex-row p-4 py-1 pb-3 font-bold hover:text-purple-500`}
          >
            <ListIcon />
            <p>Products List</p>
          </li>

          <li
            onClick={() => {
              setIsTableOpen(false);
            }}
            className={`${
              !isTableOpen ? "text-purple-500" : null
            } flex cursor-pointer flex-row p-4 py-1 pb-3 font-bold hover:text-purple-500`}
          >
            <PlusIcon />
            Add Product
          </li>
          <li className=" flex cursor-pointer flex-row p-4 py-1 pb-3 font-bold hover:text-purple-500">
            <OrdersIcon />
            Orders
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
