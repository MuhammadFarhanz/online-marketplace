import React from "react";
import CartIcon from "./SVGComponents/cartIcon";
import Link from "next/link";
import MessageIcon from "./SVGComponents/messageIcon";
import UserIcon from "./SVGComponents/userIcon";
import { signIn, signOut } from "next-auth/react";

const NavbarLinks = ({ sessionData, isOpen, setIsOpen }: any) => {
  return (
    <ul className="flwx flex flex-row items-center p-0 font-medium">
      <li className=" flex h-10 w-10 cursor-pointer items-center justify-center ">
        <CartIcon />
      </li>

      {sessionData && (
        <li>
          <Link
            href="/features/chat"
            className=" ml-2 flex h-10 w-10 cursor-pointer items-center justify-center hover:text-purple-500 "
            aria-current="page"
          >
            <MessageIcon />
          </Link>
        </li>
      )}

      {!sessionData && (
        <li>
          <div className="flex flex-col items-center justify-center gap-4 font-helvetica ">
            <button
              className="no-underline transition hover:text-purple-500"
              onClick={() => signIn()}
            >
              {sessionData ? "SIGN OUT" : "SIGN IN"}
            </button>
          </div>
        </li>
      )}

      {sessionData ? (
        <div>
          <li
            className=" ml-2 flex h-10 w-10 cursor-pointer items-center justify-center "
            onClick={() => setIsOpen(!isOpen)}
          >
            <UserIcon />
          </li>

          {isOpen ? (
            <div
              id="dropdownInformation"
              className="absolute right-3 z-10 mt-6 w-44 divide-y divide-gray-100 rounded-lg border border-black bg-slate-300 dark:divide-gray-600 "
            >
              <div className="px-4 py-3 text-sm text-gray-900 ">
                <div>{sessionData.user.name}</div>
                <div className="truncate font-medium">
                  {sessionData.user.email}
                </div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 "
                aria-labelledby="dropdownInformationButton"
              >
                <li>
                  <Link
                    href={"/features/dashboard/products"}
                    className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
              </ul>
              <div className="py-2">
                <button
                  onClick={() => signOut()}
                  className=" flex w-full flex-row px-4 py-2 text-sm hover:bg-gray-600 hover:text-white "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  <p className="ml-2"> Sign out</p>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </ul>
  );
};

export default NavbarLinks;
