"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, PanelLeftClose } from "lucide-react";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Sample menu data - replace with your actual menu data
  const menus = [
    { id: 1, title: "Home", slugData: { slug: "home" } },
    { id: 2, title: "About", slugData: { slug: "about" } },
    // Add more menu items as needed
  ];
  
  // Sample logo - replace with your actual logo path
  const logo = "/images/logo.png";

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Icon */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white/80 p-2 rounded shadow"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="text-2xl text-gray-800" />
      </button>
      <aside
        id="navbar-sidebar"
        className={`sidebar-main fixed top-0 left-0 h-full z-40 transition-all duration-300 ${{
          true: '!left-0',
          false: '!left-[-100%]'
        }[isOpen]} grid grid-cols-[280px_auto] md:hidden`}
        aria-label="Sidebar"
      >
        <div className="sidebar-content">
          <div className="flex justify-between items-center">
            <Image
              src={logo}
              className="block w-15 object-cover"
              alt="logo"
              width={120}
              height={40}
            />
            <span
              className="bg-[#ffffff22] p-[6px] rounded-md backdrop:blur-[3px] __primaryColor_hov text-white"
              onClick={handleClose}
            >
              <PanelLeftClose className="text-[20px]" />
            </span>
          </div>

          {menus?.map((item) => {
            const href = item.slugData
              ? `/${item.slugData.slug === "home" ? "" : item.slugData.slug}`
              : "#";
            return (
              <Link
                key={item.id}
                href={href}
                onClick={handleClose}
                className={`text-white flex items-center text-[19px] py-2 rounded-[4px] gap-x-[10px] pl-2 mt-2 __text ${
                  pathname === href ? "bg-[#312f2f]" : "transparent"
                }`}
              >
                <div className="leading-4 mt-[1px]">{item.title}</div>
              </Link>
            );
          })}
        </div>

        <div
          className="sidebar-overlay"
          style={{
            width: isOpen ? "100%" : "0",
            transition: "all .3s ease-in",
          }}
          onClick={handleClose}
        ></div>
      </aside>
    </>
  );
};

export default Sidebar;