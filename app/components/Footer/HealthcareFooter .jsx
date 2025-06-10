import Image from "next/image";
import Link from "next/link";
import React from "react";

const HealthcareFooter = () => {
  const companyLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Tests", href: "/tests" },
    { label: "Clinics", href: "/clinics" },
  ];

  const serviceLinks = [
    { label: "Book Link Test", href: "/book-test" },
    { label: "Smart Health Dashboard", href: "/dashboard" },
    { label: "Report", href: "/reports" },
  ];

  const resourceLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <footer className="">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 __gapTop">
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

            <p className="text-gray-600 font-[400] text-[14px] leading-[145%] max-w-sm">
              With Medicare services you will receive the best medical treatment
              in your area. Made by doctors and professionals and aids ensure that you get the care you need and
              deserve.
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-[600] text-[18px] leading-[100%] __primary-text">
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
            <h3 className="font-[600] text-[18px] leading-[100%] __primary-text">
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
            <h3 className="font-[600] text-[18px] leading-[100%] __primary-text">
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
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="text-gray-600 space-y-4">
              <p className="font-[900] text-[16px] sm:text-[18px] leading-[120%] __primary-text">
                Drop Link message and take charge of your health now!
              </p>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-teal-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-[600] text-[16px] sm:text-[18px] leading-[100%]">
                  954 733 3245
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 mb-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <p className="text-gray-500 text-sm">© Sukali Health 2025</p>
            
            {/* Optional: Add social media links or additional footer content */}
            <div className="flex space-x-4">
              {/* You can add social media icons here if needed */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HealthcareFooter;