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
            className=" ml-2 flex h-10 w-10 cursor-pointer items-center justify-center "
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
                    className="block px-4 py-2 "
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
              </ul>
              <div className="py-2">
                <button
                  onClick={() => signOut()}
                  className="block px-4 py-2 text-sm "
                >
                  Sign out
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
