import Link from "next/link";

const DashboardSidebar = ({ setIsTableOpen }: any) => {
  return (
    <aside className="m-2 h-screen w-1/5 text-black">
      <div className="h-1/2 rounded-md border border-black">
        <h1 className="border-b border-black p-4 text-2xl font-semibold">
          Product Dashboard
        </h1>
        <ul className="mt-6 space-y-3">
          <li
            onClick={() => setIsTableOpen(true)}
            className=" cursor-pointer p-4 py-1 pb-3 hover:text-purple-500"
          >
            Products
          </li>
          <li
            onClick={() => {
              setIsTableOpen(false); // Close the DashboardTable section
            }}
            className=" cursor-pointer p-4 py-1 pb-3 hover:text-purple-500"
          >
            Add product
          </li>
          <li className=" cursor-pointer p-4 py-1 pb-3 hover:text-purple-500">
            Orders
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
