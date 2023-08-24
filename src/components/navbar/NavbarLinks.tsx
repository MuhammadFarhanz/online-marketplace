import React, { useState } from "react";
import CartIcon from "../svgcomponent/cartIcon";
import Link from "next/link";
import MessageIcon from "../svgcomponent/messageIcon";
import UserIcon from "../svgcomponent/userIcon";
import { signIn, signOut } from "next-auth/react";

const DropdownContent = ({ sessionData }: any) => {
  return (
    <div className=" absolute right-0 top-[74px] z-20 bg-black sm:right-0 sm:top-24">
      <div className=" w-48 -translate-x-1 -translate-y-1 divide-y divide-gray-600 border border-black bg-[#E9E9E9]">
        <div className="px-4 py-3 text-sm text-gray-900">
          <div>{sessionData.user.name}</div>
          <div className="truncate font-medium">{sessionData.user.email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownInformationButton"
        >
          <li>
            <Link
              href="/dashboard"
              className="block px-4 py-2 hover:bg-black hover:text-white"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-black hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-black hover:text-white"
            >
              Earnings
            </a>
          </li>
        </ul>
        <div className="py-2">
          <button
            onClick={() => signOut()}
            className="flex w-full flex-row px-4 py-2 text-sm hover:bg-black hover:text-white"
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
            <p className="ml-2">Sign out</p>
          </button>
        </div>
      </div>
    </div>
  );
};

const NavbarLinks = ({ sessionData }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <ul className=" flex flex-row items-center p-0 font-medium">
        {sessionData && (
          <li className=" ml-1 flex h-10 w-8 cursor-pointer items-center justify-center   hover:text-purple-500 sm:w-10">
            <CartIcon />
          </li>
        )}
        {sessionData && (
          <li>
            <Link
              href="/chat"
              className="flex  h-10 w-8 cursor-pointer items-center justify-center  hover:text-purple-500 sm:ml-2 sm:w-10"
              aria-current="page"
            >
              <MessageIcon />
            </Link>
          </li>
        )}

        {!sessionData && (
          <li>
            <div className="">
              <button
                className="ml-2 bg-black duration-200 sm:ml-0 sm:w-full"
                onClick={() => signIn()}
              >
                <div className="flex w-full -translate-x-1 -translate-y-1 items-center border-2 border-slate-900 bg-white px-2 py-1 duration-200 hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0 dark:border-black sm:px-4 sm:py-2">
                  <h4 className="duration-200">
                    <div className="flex items-center justify-start">
                      SIGN IN
                    </div>
                  </h4>
                </div>
              </button>
            </div>
          </li>
        )}

        {sessionData && (
          <li className="">
            <button
              className="flex h-10 w-8 cursor-pointer items-center justify-center  hover:text-purple-500 sm:ml-2 sm:w-10"
              onClick={() => setIsOpen(!isOpen)}
            >
              <UserIcon />
            </button>
          </li>
        )}
      </ul>
      {isOpen && <DropdownContent sessionData={sessionData} />}
    </div>
  );
};

export default NavbarLinks;
