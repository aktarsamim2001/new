"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import ovalSmall from "./Oval.png";
import ovalLarge from "./round.png";
import mobileOval from "../../../public/footer-texture/Oval (1).png";
import mobileOval2 from "../../../public/footer-texture/Oval.png";

const companyLinks = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Tests", href: "/our-services" },
  { label: "Clinics", href: "/book-test" }, // Consistent with your current usage
];

const serviceLinks = [
  { label: "Book Link Test", href: "/book-test" },
  { label: "Smart Health Dashboard", href: "/user-dashboard" },
  { label: "Report", href: "/upload-documents" },
];

const resourceLinks = [
  { label: "Privacy Policy", href: "/privacy-policies" },
  { label: "Terms & Conditions", href: "/terms-condition" },
  { label: "FAQ", href: "/faq" },
  { label: "Enquiry and Support", href: "/contact-us" },
];

const HealthcareFooter = () => {
  return (
    <footer className="relative">
      {/* Desktop textures */}
      <div className="absolute left-[-5%] bottom-[-60px] z-[-1] w-full hidden md:block">
        <Image src={ovalSmall} alt="Decorative texture" className="w-[55%] h-[450px]" />
      </div>
      <div className="absolute left-[-130px] bottom-[-60px] z-[-1] w-full hidden md:block">
        <Image src={ovalLarge} alt="Decorative texture" className="w-[65%] h-[500px]" />
      </div>

      {/* Mobile textures */}
      <div className="absolute right-0 bottom-0 z-[-1] block md:hidden w-full">
        <Image src={mobileOval} alt="Mobile texture" className="w-full h-auto object-contain" />
      </div>
      <div className="absolute right-0 bottom-[-40px] z-[-1] block md:hidden w-full">
        <Image src={mobileOval2} alt="Mobile texture 2" className="w-full h-auto object-contain" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto __gapTop px-4 md:px-0 md:pb-6 pb-4">
        <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-[290px_auto] gap-x-[30px] items-start justify-between">
          {/* Logo and Intro */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Link href="/home">
                <span className="block w-30 md:w-32">
                  <Image
                    src="/sukaii-logo.png"
                    alt="Sukaii Logo"
                    layout="responsive"
                    width={150}
                    height={50}
                  />
                </span>
              </Link>
            </div>
            <p className="text-gray-500 font-[400] text-[16px] leading-[145%] mt-10">
              With Medicare services you will receive the best medical treatment
              in your area. Made by doctors and professionals and aids ensure
              that you get the care you need and deserve.
            </p>
            <p className="text-gray-500 text-sm py-5">© Sukali Health 2025</p>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-18 mt-4">
            {/* COMPANY */}
            <div className="space-y-4 mt-3">
              <h3 className="font-[500] text-[18px] __primary-text">COMPANY</h3>
              <ul className="space-y-1.5 md:mt-10">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="__paragraph hover:text-teal-500 transition-colors duration-200 text-[16px] font-[400] leading-[30px] block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SERVICES */}
            <div className="space-y-4 mt-3">
              <h3 className="font-[500] text-[18px] __primary-text">SERVICES</h3>
              <ul className="space-y-1.5 md:mt-10">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="__paragraph hover:text-teal-500 transition-colors duration-200 text-[16px] font-[400] leading-[30px] block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RESOURCES */}
            <div className="space-y-4 mt-3 col-span-2 lg:col-span-1">
              <h3 className="font-[500] text-[18px] __primary-text">RESOURCES</h3>
              <ul className="space-y-1.5 md:mt-10">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="__paragraph hover:text-teal-500 transition-colors duration-200 text-[16px] font-[400] leading-[30px] block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-1 mt-2">
              <div className="text-gray-500 space-y-4">
                <p className="font-[900] text-[16px] sm:text-[18px] __primary-text pb-2">
                  Drop Link message and take charge of your health now!
                </p>
                <div className="flex items-center space-x-2">
                  <IoLogoWhatsapp className="w-[25px] h-[25px] text-[#EC098D]" />
                  <span className="font-[700] text-[18px]">954 733 3245</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HealthcareFooter;
