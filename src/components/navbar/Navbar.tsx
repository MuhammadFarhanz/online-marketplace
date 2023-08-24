import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SearchInput from "./searchInput";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="font-bolder relative z-10 w-full bg-[#E9E9E9] pt-3 font-mono">
      <div className="mx-auto flex max-w-[98%] bg-black ">
        <div className=" w-full -translate-x-[2px] -translate-y-[2px] border-2 border-black bg-white p-2 sm:-translate-x-1 sm:-translate-y-1 sm:p-3">
          <div
            className="flex w-full flex-row items-center justify-between "
            id="navbar-search"
          >
            <span className="hidden self-center whitespace-nowrap font-mono  text-2xl font-semibold dark:text-black sm:block">
              <Link href="/" aria-current="page">
                MARKET
              </Link>
            </span>

            <div className="mx-auto flex-grow sm:ml-10 sm:mr-10  ">
              <SearchInput />
            </div>

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
