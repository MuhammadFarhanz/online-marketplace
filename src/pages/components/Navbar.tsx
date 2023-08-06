import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import AuthShowcase from "../features/sign-in";
import { useState } from "react";
import MessageIcon from "./SVGComponents/messageIcon";
import UserIcon from "./SVGComponents/userIcon";
import CartIcon from "./SVGComponents/cartIcon";
import SearchInput from "./searchInput";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  // console.log(sessionData?.user)

  return (
    <nav className="font-bolder mt-2 w-full font-mono">
      <div className="mx-auto flex max-w-[98%] rounded-lg border border-black bg-slate-300 p-3">
        <div className="w-full">
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className="flex w-full flex-row items-center justify-between  "
            id="navbar-search"
          >
            <span className="self-center whitespace-nowrap  font-mono text-2xl font-semibold dark:text-black">
              <Link href="/" aria-current="page">
                MARKET
              </Link>
            </span>

            <div className="mx-auto ml-10 mr-10 flex-grow rounded-md border border-black">
              <SearchInput />
            </div>
            {/* <div className="relative mt-3 md:hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Search..."
              />
            </div> */}
            <NavbarLinks
              sessionData={sessionData}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
