"use client";

import React from "react";
import image from "../../assets/partner-image/women.png";
import image2 from "../../assets/service/Why you should take/healthSection2.png";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HealthSection = ({dataItem}) => {
  const path = usePathname();

  return (
    <div className="container mx-auto md:mt-[40px]">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_44%] gap-10 md:gap-18 items-center justify-between mt-[60px] md:mt-0">
        {/* Content Section */}
        <div className="order-2 lg:order-1 px-4 md:px-0 md:mt-12">
          <h2 className="section__heading">
            {dataItem?.content?.home_page?.title_four}
          </h2>
          <p className="text-gray-500 banner__description max-w-2xl mt-4">
            {dataItem?.content?.home_page?.description_four}
          </p>
          <div>
            <Link href={dataItem?.content?.home_page?.button_url_four || "/book-test"} passHref>
              <Button
                variant="outline"
                className="text-white mt-4 cursor-pointer __secondary-bg md:w-full max-w-[180px]"
              >
                {dataItem?.content?.home_page?.button_name_four}
              </Button>
            </Link>
          </div>
        </div>
        {/* Image Section */}
        <div className="w-full flex items-center justify-center order-1 lg:order-2">
          <div className={`relative w-full md:mt-[60px] ${path !== "/our-services" ? "z-[-1] mt-[-130px]" : ""}`}> 
            {dataItem?.content?.home_page?.image_four ? (
              <Image
                src={dataItem.content.home_page.image_four}
                alt={dataItem?.content?.home_page?.title_four}
                width={500}
                height={500}
                className="object-cover h-[417px] md:rounded-2xl w-full md:w-[100%]"
                priority
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSection;
