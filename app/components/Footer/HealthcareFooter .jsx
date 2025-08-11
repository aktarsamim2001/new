import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import ovalSmall from "./Oval.png";
import ovalLarge from "./round.png";
import mobileOval from "../../../public/footer-texture/Oval (1).png";
import mobileOval2 from "../../../public/footer-texture/Oval.png";

const HealthcareFooter = () => {
  const companyLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Tests", href: "/our-services" },
    { label: "Clinics", href: "/clinics" },
  ];

  const serviceLinks = [
    { label: "Book Link Test", href: "/book-test" },
    { label: "Smart Health Dashboard", href: "/user-dashboard" },
    { label: "Report", href: "/upload-documents" },
  ];

  const resourceLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-condition" },
    { label: "FAQ", href: "/faq" },
    { label: "Enquiry and Support", href: "/enquiry-form" },
  ];

  return (
    <footer className="relative">
      <div className="absolute left-[-5%] sm:-right-0 bottom-[-60px] z-[-1] w-full hidden md:block">
        <Image
          src={ovalSmall}
          alt="Decorative texture"
          // width={500}
          // height={500}
          className="w-[55%] h-[450px]"
        />
      </div>

      <div className="absolute left-[-130px] bottom-[-60px] z-[-1] w-full hidden md:block">
        <Image
          src={ovalLarge}
          alt="Decorative texture"
          // width={650}
          // height={650}
          className="w-[65%] h-[500px]"
        />
      </div>

      {/* Mobile Texture 1 */}
      <div className="absolute right-0 bottom-0 z-[-1] block md:hidden w-[100%]">
        <Image
          src={mobileOval}
          alt="Decorative texture"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Mobile Texture 2 */}
      <div className="absolute right-0 bottom-[-40px] z-[-1] block md:hidden w-[100%]">
        <Image
          src={mobileOval2}
          alt="Decorative texture"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="container mx-auto __gapTop px-4 md:px-0 md:pb-6 pb-4">
        <div className="grid grid-cols-1 gap-y-4 lg:gap-y-0 lg:grid-cols-[290px_auto] gap-x-[60px] items-start">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 justify-start">
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

            <p className="text-gray-500 font-[400] text-[16px] leading-[145%] max-w-sm">
              With Medicare services you will receive the best medical treatment
              in your area. Made by doctors and professionals and aids ensure
              that you get the care you need and deserve.
            </p>
            <p className="text-gray-500 text-sm py-5">© Sukali Health 2025</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-6 mt-4">
            {/* Logo and Description */}

            {/* Company Links */}
            <div className="space-y-4 mt-2.5">
              <h3 className="font-[500] text-[18px] leading-[100%] __primary-text">
                COMPANY
              </h3>
              <ul className="space-y-1.5 cursor-pointe md:mt-9">
                {companyLinks.map((link, index) => (
                  <li key={index} className="cursor-pointer">
                    <Link
                      href={link.href}
                      className="__paragraph cursor-pointer hover:text-teal-500 transition-colors duration-200 text-[16px] font-[400] leading-[30px] block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className="space-y-4 mt-2.5">
              <h3 className="font-[500] text-[18px] leading-[100%] __primary-text">
                SERVICES
              </h3>
              <ul className="space-y-1.5 md:mt-9">
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
            <div className="space-y-4 mt-2.5 col-span-2 lg:col-span-1">
              <h3 className="font-[500] text-[18px] leading-[100%] __primary-text">
                RESOURCES
              </h3>
              <ul className="space-y-1.5 md:mt-9">
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
            <div className="space-y-4 sm:col-span-2 lg:col-span-1 mt-2">
              <div className="text-gray-500 space-y-4">
                <p className="font-[900] text-[16px] sm:text-[18px] leading-[120%] __primary-text">
                  Drop Link message and take charge of your health now!
                </p>
                <div className="flex items-center space-x-2">
                  <IoLogoWhatsapp className="w-[25px] h-[25px] text-[#EC098D]" />

                  <span className="font-[700] relative top-[-2px] text-[18px] sm:text-[18px] leading-[100%]">
                    954 733 3245
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        {/* <div className="mt-12 mb-6 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <p className="text-gray-500 text-sm">© Sukali Health 2025</p>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default HealthcareFooter;
