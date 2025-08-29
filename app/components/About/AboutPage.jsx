import Image from "next/image";
import React from "react";


import shape from "../../assets/woman/shape.png";
import { Check } from "lucide-react";
import Link from "next/link";
import Button from "../ui/Button";

const AboutPage = ({ data }) => {
  const about = data?.content?.about_page || {};
  return (
    <>
      {/* Hero Section */}
      <div className=" mt-[46px] md:mt-[125px] relative container mx-auto">
        <div className="flex flex-col-reverse md:grid md:grid-cols-[55%_auto] items-center md:gap-5 justify-center px-4 md:px-0">
          <div className="text-left flex flex-col align-middle justify-center h-[100%] mt-7">
            <h2 dangerouslySetInnerHTML={{ __html: about.title_two }} className="section__heading mt-4 md:mt-0 mb-5 text-gray-900 ">
            </h2>
            <p className="text-sm md:text-lg font-[400] text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {about.description_two || 'Safely store and protected data as in one place and get the most detailed insights into your health through detailed metrics and professional medical analysis.'}
            </p>
          </div>

          <div className="relative w-[full] flex justify-end mt-5 ml-4 md:ml-0 lg:ml-0">
            {about.image_two && (
              <Image
                src={about.image_two}
                width={600}
                height={300}
                alt="about image"
                className="rounded-3xl h-[80%] w-[100%] cardShadow2"
              />
            )}
            {about.image && (
              <Image
                src={about.image}
                width={600}
                height={300}
                alt="about image"
                className="absolute right-3 -top-[25px] md:right-10 md:top-[-60px] rounded-3xl h-[100%] w-[100%] cardShadow2"
              />
            )}
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="__gapTop">
        <div className="container mx-auto px-4 md:px-0">
          <div className="text-left">
            <h2 className="section__heading text-gray-900 mb-4 lg:mb-10 md:mb-8">
              More Than Just Reports
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {(about.featured_items || []).map((item, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-[22px] cardShadow2"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-1.5">
                  {item.image && (
                    <Image
                      src={item.image}
                      width={24}
                      height={24}
                      alt="icon"
                      className="sm:w-[30px] sm:h-[30px]"
                    />
                  )}
                </div>
                <h3 className="text-[20px] font-[400] md:font-[500] mb-2 text-gray-900 line-hight-[155%]">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Import Reports Section */}
      <div className="__gapTop2">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_auto] items-center justify-start gap-8 lg:gap-12 px-4 md:px-0">
            <div className="flex items-start justify-start order-2 lg:order-1">
              <div className="w-full">
                <div className="h-[220px] md:h-[465px] relative w-full">
                  {about.image_three && (
                    <Image
                      src={about.image_three}
                      alt="Person using mobile health app"
                      width={600}
                      height={300}
                      className="object-cover rounded-4xl shadow-lg w-full h-full"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6 text-left order-2 lg:order-1">
              <h2 className="section__heading text-pink-500 md:text-gray-900">
                {about.title_three || 'Have Reports from'}
                <br className="hidden sm:block" />
                <span className="block sm:inline"> {about.title_three ? '' : 'Other Labs?'}</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {about.description_three || 'Import and analyze reports from any laboratory. Our AI technology reads and interprets your existing reports, giving you comprehensive health insights.'}
              </p>
              {about.button_name_three && (
                <Button className="__secondary-bg text-white">
                  <Link
                    href={about?.button_url_three || ""}
                    className="flex items-center justify-center gap-2"
                  >
                    {about.button_name_three}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Built Around Your Needs Section */}
      <div className="__gapTop relative pb:0 md:pb-10">
        <div className="absolute top-14 md:top-5 right-0 -z-10">
          <Image src={shape} alt=" " className="h-[150px] w-[150px] md:h-[400px] md:w-[400px]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[60%_auto] gap-8 lg:gap-16 items-center container mx-auto">
          <div className="w-full order-2 lg:order-1 md:order-1 flex-col md:flex-row flex items-start justify-start gap-3 sm:gap-4 text-center ml-0 md:ml-10 relative">
            <div className="flex flex-col items-start w-full px-4 md:px-0">
              <div className="flex flex-row items-center gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-500 flex items-center justify-center">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="section__heading text-pink-500 mb-0 text-left">
                  {about.title_four || 'Built Around Your Needs'}
                </h3>
              </div>
              <ul className="list-disc mt-2 space-y-2 text-base sm:text-lg text-black text-left ml-[52px] sm:ml-[90px]">
                {(about.descriptions || []).map((desc, idx) => (
                  <li key={idx}>{desc.description}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 md:order-2">
            <div className="relative w-full lg:max-w-xl mx-auto">
              <div className="bg-pink-500 md:rounded-2xl w-full h-28 sm:h-36 lg:h-40 xl:h-42 absolute bottom-0 left-0 z-0"></div>

              {/* Woman image - responsive */}
              <div className="relative z-10 h-64 sm:h-80 lg:h-96 xl:h-[427px]">
                {about.image_four && (
                  <Image
                    src={about.image_four}
                    alt="Woman talking on phone"
                    width={400}
                    height={400}
                    className="object-contain object-bottom w-full h-full"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;