"use client";

import { Search, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const pathname = usePathname();

  const toggleSearch = () => {
    setExpanded((prev) => !prev);
    setTimeout(() => {
      if (!expanded) inputRef.current?.focus();
    }, 100);
  };

  const handleDesktopSearch = () => {
    setDesktopSearchOpen((prev) => !prev);
    setTimeout(() => {
      if (!desktopSearchOpen) inputRef.current?.focus();
    }, 100);
  };

  return (
    <nav className="bg-white container mx-auto py-6 px-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <Link href="/">
            <span>
              <Image
                src="/sukaii-logo.png"
                alt="Sukai Logo"
                width={150}
                height={50}
              />
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex items-center space-x-6 __nav-link ">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-[#00B8C1] font-[500]"
                : " text-[#BBBBBB] hover:text-gray-400"
            }
          >
            Home
          </Link>
          <Link
            href="/our-services"
            className={
              pathname.startsWith("/our-services")
                ? "text-[#00B8C1] font-[500]"
                : "text-[#BBBBBB] hover:text-gray-400"
            }
          >
            Our Services
          </Link>
          <Link
            href="/how-it-works"
            className={
              pathname.startsWith("/how-it-works")
                ? "text-[#00B8C1] font-[500]"
                : "text-[#BBBBBB] hover:text-gray-400"
            }
          >
            How It Works
          </Link>
          <Link
            href="/about"
            className={
              pathname.startsWith("/about")
                ? "text-[#00B8C1] font-[500]"
                : "text-[#BBBBBB] hover:text-gray-400"
            }
          >
            About
          </Link>
        </div>

        {/* Right Side Actions (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-2">
          <Link
            href="/sign-in"
            className={`__nav-link cursor-pointer ${
              pathname === "/sign-in"
                ? "text-[#00B8C1] font-medium"
                : "text-[#BBBBBB] hover:text-gray-400"
            }`}
          >
            Log In
          </Link>

          <span className="text-gray-400">|</span>

          <Link
            href="/sign-up"
            className={`__nav-link cursor-pointer ${
              pathname?.startsWith("/sign-up")
                ? "text-[#00B8C1] font-medium"
                : "text-[#BBBBBB] hover:text-gray-400"
            }`}
          >
            Sign Up
          </Link>

          {/* Desktop Search Icon/Button */}
          <div className="ml-2 relative flex items-center cursor-pointer">
            <button
              className={`transition-all duration-300 bg-[#EC098D] text-white rounded-[8px] flex items-center justify-center max-w-xl px-3 py-3.5 gap-5 h-10 ${
                desktopSearchOpen ? "bg-[#00B8C1]" : ""
              }`}
              onClick={handleDesktopSearch}
              aria-label="Search"
              type="button"
              style={{ display: desktopSearchOpen ? "none" : "flex" }}
            >
              Search
              <Search className="ml-3 w-[18px] h-[18px]" />
            </button>
            <div
              className={`relative transition-all duration-300 border-2 rounded-[8px] border-[#EC098D] ${
                desktopSearchOpen ? "w-56 opacity-100" : "w-0 opacity-0"
              } overflow-hidden`}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="transition-all duration-300 px-3 border-0 pr-10 py-2 text-sm w-full focus:outline-none"
                style={{
                  minWidth: desktopSearchOpen ? "14rem" : "0",
                  maxWidth: desktopSearchOpen ? "14rem" : "0",
                }}
                onBlur={() => setDesktopSearchOpen(false)}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onMouseDown={(e) => e.preventDefault()}
              >
                <Search className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>

        {/* Search Button (Mobile Only) */}
        <div className="md:hidden flex items-end">
          <button
            onClick={toggleSearch}
            className="rounded-full bg-[#EC098D] text-white flex items-center justify-center w-10 h-10 ml-36"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden flex items-center justify-center rounded-full bg-gray-100 w-10 h-10"
          onClick={() => setMobileMenu(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-[#EC098D]" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 bg-black/40 flex">
          <div className="bg-white w-64 h-full p-3.5 flex flex-col gap-4">
            <button
              className="self-end mb-4 text-gray-700"
              onClick={() => setMobileMenu(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            <div className="flex items-center cursor-pointer">
              <Image
                src="/sukaii-logo.png"
                alt="Sukai Logo"
                width={120}
                height={40}
                className="mr-18"
              />
            </div>
            <div className="__nav-link">
              <Link
                href="/"
                onClick={() => setMobileMenu(false)}
                className={
                  pathname === "/"
                    ? "text-[#00B8C1] font-bold block py-2"
                    : "text-gray-700 block py-2"
                }
              >
                Home
              </Link>
              <Link
                href="/our-services"
                onClick={() => setMobileMenu(false)}
                className={
                  pathname.startsWith("/our-services")
                    ? "text-[#00B8C1] font-bold block py-2"
                    : "text-gray-700 block py-2"
                }
              >
                Our Services
              </Link>
              <Link
                href="/how-it-works"
                onClick={() => setMobileMenu(false)}
                className={
                  pathname.startsWith("/how-it-works")
                    ? "text-[#00B8C1] font-bold block py-2"
                    : "text-gray-700 block py-2"
                }
              >
                How It Works
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenu(false)}
                className={
                  pathname.startsWith("/about")
                    ? "text-[#00B8C1] font-bold block py-2"
                    : "text-gray-700 block py-2"
                }
              >
                About
              </Link>
              <div className="mt-4 border-t pt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileMenu(false)}
                  className="block py-2 text-gray-700"
                >
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenu(false)}
                  className="block py-2 text-gray-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenu(false)} />
        </div>
      )}

      {/* Mobile Search Drawer */}
      {expanded && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-4 w-11/12 max-w-md flex items-center gap-2 mx-auto my-auto">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              className="pl-3 pr-10 py-3 text-sm w-full focus:outline-none border border-gray-300 rounded"
            />
            <button
              className="bg-[#00B8C1] hover:bg-[#009ba3] px-5 py-3 rounded text-white"
              onClick={toggleSearch}
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1" onClick={toggleSearch} />
        </div>
      )}
    </nav>
  );
}
