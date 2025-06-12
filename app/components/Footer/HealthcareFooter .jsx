import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import ovalSmall from "./Oval.png";
import ovalLarge from "./Oval (1).png";

const HealthcareFooter = () => {
  const companyLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Tests", href: "/tests" },
    { label: "Clinics", href: "/clinics" },
  ];

  const serviceLinks = [
    { label: "Book Link Test", href: "/book-test" },
    { label: "Smart Health Dashboard", href: "/user-dashboard" },
    { label: "Report", href: "/reports" },
  ];

  const resourceLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "FAQ", href: "/faq" },
    { label: "Enquiry and Support", href: "/enquiry" },
  ];

  return (
    <footer className="relative mt-20">
      <div className="absolute left-0 bottom-[-25px]">
        <Image
          src={ovalSmall}
          alt="Decorative texture"
          width={500}
          height={500}
          className=""
        />
      </div>

      <div className="absolute left-0 bottom-[-25px]">
        <Image
          src={ovalLarge}
          alt="Decorative texture"
          width={650}
          height={650}
          className=""
        />
      </div>
      <div className="container mx-auto px-4 __gapTop ">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-6">
          {/* Logo and Description */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <Image
                src="/sukaii-logo.png"
                alt="Sukali Health Logo"
                width={150}
                height={50}
              />
            </div>

            <p className="text-gray-500 font-[400] text-[16px] leading-[145%] max-w-sm">
              With Medicare services you will receive the best medical treatment
              in your area. Made by doctors and professionals and aids ensure
              that you get the care you need and deserve.
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-[500] text-[18px] leading-[100%] __primary-text">
              COMPANY
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
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

          {/* Services Links */}
          <div className="space-y-4">
            <h3 className="font-[500] text-[18px] leading-[100%] __primary-text">
              SERVICES
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
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

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-[500] text-[18px] leading-[100%] __primary-text">
              RESOURCES
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <li key={index}>
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

          {/* Contact Section */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1 mb-2.5">
            <div className="text-gray-500 space-y-4">
              <p className="font-[900] text-[16px] sm:text-[18px] leading-[120%] __primary-text">
                Drop Link message and take charge of your health now!
              </p>
              <div className="flex items-center space-x-2">
                <IoLogoWhatsapp className="w-[25px] h-[25px] text-[#EC098D]" />

                <span className="font-[600] relative top-[-2px] text-[16px] sm:text-[18px] leading-[100%]">
                  954 733 3245
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 mb-6 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <p className="text-gray-500 text-sm">© Sukali Health 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HealthcareFooter;
