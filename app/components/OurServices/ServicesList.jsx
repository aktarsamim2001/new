import Image from "next/image";
import React from "react";
import image1 from "../../assets/RecommendedImages/banner.jpg";
import image2 from "../../assets/RecommendedImages/banner1.jpg";
import image3 from "../../assets/RecommendedImages/banner2.jpg";
import image4 from "../../assets/RecommendedImages/banner3.jpg";
import image5 from "../../assets/RecommendedImages/banner2.jpg";
import image6 from "../../assets/RecommendedImages/banner.jpg";
import Link from "next/link";
import { ArrowUpRight, CircleArrowLeft, CircleArrowRight } from "lucide-react";

const services = [
  { id: 1, title: "Service One", image: image1, slug: "kidney-unction" },
  { id: 2, title: "Service Two", image: image2, slug: "lipid-profile" },
  {
    id: 3,
    title: "Service Three",
    image: image3,
    slug: "complete-blood-count",
  },
  { id: 4, title: "Service Four", image: image4, slug: "cancer-markers" },
  { id: 5, title: "Service Five", image: image5, slug: "lipid-profile" },
  { id: 6, title: "Service Six", image: image6, slug: "kidney-unction" },
];

function ServicesList() {
  return (
    <div>
      <div className="container mx-auto __gapTop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="h-[300px] relative">
              <Link href={`/service/${service.slug}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  className="object-cover rounded-br-[40px] rounded-t-[40px] mb-4 h-[300px] rounded-es-[7px]"
                  width={700}
                  height={475}
                />
                <div>
                  <div className="absolute p-4 bottom-0 text-xl font-semibold __primary-bg text-white rounded-[7px] flex gap-2.5">
                    <h2> {service.title}</h2>
                    <ArrowUpRight className="h-5 w-5 -mt-3 -mr-2" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            {/* Left Arrow */}
            <button className="w-8 h-8 flex items-center justify-center cursor-pointer">
              <CircleArrowLeft />
            </button>

            {/* Page Numbers */}
            <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer">
              01
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer">
              02
            </button>
            <button className="w-8 h-8 flex items-center justify-center border-b-2 border-blue-600 text-blue-600 cursor-pointer">
              03
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer" >
              04
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer">
              05
            </button>

            {/* Right Arrow */}
            <button className="w-8 h-8 flex items-center justify-center cursor-pointer">
              <CircleArrowRight/>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ServicesList;
