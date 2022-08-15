import { LogoutIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import BasicMenu from "./BasicMenu";
interface Props {
  onSearch: (value: string) => void;
}
const Header = ({ onSearch }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logOut } = useAuth();
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchActive, setSearchActive] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    function handleSearch(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchActive(false);
      }
    }
    window.addEventListener("click", (e) => handleSearch(e));
    return window.removeEventListener("click", handleSearch);
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-8">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          alt="icon-main"
          className="cursor-pointer object-contain"
        />
        <BasicMenu />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink cursor-default font-semibold text-white hover:text-white">
            Home
          </li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light relative">
        <div
          ref={searchRef}
          className={`${
            searchActive && "border border-white bg-black/60"
          } search absolute left-0 -translate-x-full  inline-block`}
        >
          <input
            type="text"
            className={`${
              searchActive && "!w-60 !bg-black md:!bg-transparent"
            } outline-none w-0 h-[34px] border-transparent pl-[35px] bg-transparent placeholder:text-gray transition-all duration-300`}
            placeholder="Movie name....."
            onChange={(e) => onSearch(e.target.value)}
          />
          <SearchIcon
            className="absolute cursor-pointer top-2/4 -translate-y-2/4 left-2 h-6 w-6 sm:inline"
            onClick={() => setSearchActive(!searchActive)}
          />
        </div>
        <p className="hidden lg:inline">Kids</p>
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
        <LogoutIcon
          className="h-6 w-6 cursor-pointer transition hover:opacity-80"
          onClick={logOut}
        />
      </div>
    </header>
  );
};

export default Header;
