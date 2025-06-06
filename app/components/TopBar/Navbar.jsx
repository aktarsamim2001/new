"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const [expanded, setExpanded] = useState(false);
    const inputRef = useRef(null);

    const toggleSearch = () => {
        setExpanded((prev) => !prev);
        setTimeout(() => {
            if (!expanded) inputRef.current?.focus();
        }, 100);
    };

    return (
        <nav className="bg-white container mx-auto py-6">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center cursor-pointer">
                    <Image
                        src="/sukaii-logo.png"
                        alt="Sukai Logo"
                        width={150}
                        height={50}
                    />
                </div>

                {/* Navigation Menu */}
                <div className="hidden md:flex items-center space-x-8 __nav-link">
                    <Link href="/" className="text-pink-500 font-medium hover:text-pink-600">
                        Home
                    </Link>
                    <Link href="/our-services" className="text-gray-600 hover:text-gray-800">
                        Our Services
                    </Link>
                    <Link href="/how-it-works" className="text-gray-600 hover:text-gray-800">
                        How It Works
                    </Link>
                    <Link href="/about" className="text-gray-600 hover:text-gray-800">
                        About
                    </Link>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2">
                        <Link href="/login" className="__nav-link cursor-pointer">
                            Log In
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Link href="/sign-up" className="__nav-link cursor-pointer">
                            Sign Up
                        </Link>
                    </div>

                    <div className="flex items-center">
                        {/* Before Expand */}
                        {!expanded && (
                            <button
                                onClick={toggleSearch}
                                className="__secondary-bg cursor-pointer text-white font-medium flex items-center gap-2 px-6 py-2 rounded transition-all duration-300"
                            >
                                <span>Search</span>
                                <Search className="w-4 h-4" />
                            </button>
                        )}

                        {/* After Expand */}
                        <div
                            className={`flex items-center border border-gray-300 rounded overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "w-[300px] opacity-100 ml-2" : "w-0 opacity-0"
                                }`}
                            style={{ transitionProperty: "width, opacity, margin" }}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search"
                                className="pl-3 pr-10 py-3 text-sm w-full focus:outline-none"
                            />
                            <button
                                className="bg-pink-600 hover:bg-pink-700 px-5 py-3"
                                onClick={toggleSearch}
                            >
                                <Search className="h-5 w-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
