"use client";

import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  // const toggleSearch = () => {
  //   setExpanded((prev) => !prev);
  //   setTimeout(() => {
  //     if (!expanded) inputRef.current?.focus();
  //   }, 100);
  // };

  const handleDesktopSearch = () => {
    setDesktopSearchOpen((prev) => !prev);
    setTimeout(() => {
      if (!desktopSearchOpen) inputRef.current?.focus();
    }, 100);
  };

  const toggleSearch = () => {
    setExpanded(!expanded);
    if (!expanded) {
      // Focus input when opening
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Clear search when closing
      setSearchQuery("");
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Add your search logic here
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
      toggleSearch();
    }
  };

  // Close on outside click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleSearch();
    }
  };

  return (
    <nav className={`container mx-auto pt-4 md:pt-6 px-4 `}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <Link href="/">
            <span className="block w-30 md:w-38">
              <Image
                src="/sukaii-logo.png"
                alt="Sukai Logo"
                layout="responsive"
                width={150}
                height={50}
              />
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <div
          className={`hidden md:flex items-center space-x-10 gap-2 __nav-link ${poppins.className}`}
        >
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
        <div
          className={`hidden md:flex items-center space-x-2 gap-2 ${poppins.className}`}
        >
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
          <div
            className={`ml-2 relative flex items-center cursor-pointer ${poppins.className}`}
          >
            <button
              className={`transition-all duration-300 bg-[#EC098D] text-white rounded-[8px] flex items-center justify-center max-w-xl px-5 cursor-pointer py-3 gap-5 ${
                desktopSearchOpen ? "bg-[#00B8C1]" : ""
              }`}
              onClick={handleDesktopSearch}
              aria-label="Search"
              type="button"
              style={{ display: desktopSearchOpen ? "none" : "flex" }}
            >
              <h3 className={`text-[17px] `}>Search</h3>
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
                className="transition-all duration-300 px-4 border-0 pr-10 py-3 text-[17px] w-full focus:outline-none"
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
            className="rounded-full bg-[#EC098D] text-white  flex items-center justify-center w-10 h-10 ml-36"
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
                  href="/sign-in"
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
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto transform transition-all duration-300 ease-out">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Search</h3>
              <button
                onClick={toggleSearch}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-6">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type to search..."
                  className="w-full pl-12 pr-20 py-4 text-lg border-2 border-[#ec098d] rounded-xl"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                <button
                  onClick={handleSearch}
                  disabled={!searchQuery.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 __secondary-bg disabled:cursor-not-allowed px-6 py-2 rounded-lg text-white font-medium transition-all duration-200"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Search Results/Suggestions Area */}
            <div className="px-6 pb-6">
              {searchQuery ? (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Searching for: "{searchQuery}"
                  </p>
                  <div className="space-y-2">
                    {/* Mock search results */}
                    {["Result 1", "Result 2", "Result 3"].map(
                      (result, index) => (
                        <div
                          key={index}
                          className="p-3 bg-white rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                        >
                          <p className="font-medium text-gray-900">
                            {result} for "{searchQuery}"
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Sample description for this search result...
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Start typing to search...</p>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {["Popular", "Recent", "Trending"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag.toLowerCase())}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-600 transition-colors duration-200"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
