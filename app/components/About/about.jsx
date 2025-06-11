import Image from "next/image";
import React from "react";
import image from "../../assets/about/icon.png";
import image1 from "../../assets/about/icon2 (2).png";
import image2 from "../../assets/about/icon (2).png";
import image3 from "../../assets/about/icon (3).png";
import image4 from "../../assets/about/about-image.png";
import image5 from "../../assets/about/about-image (2).png";
import image6 from "../../assets/woman/woman-figure.png";
import { Check } from "lucide-react";

export const About = () => {
  return (
    <div className="__gapTop">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              A Central Hub for Your
              <br className="hidden sm:block" />
              <span className="block sm:inline"> Wellbeing</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Safely store and protected data as in one place and get the most
              detailed insights into your health through detailed metrics and
              professional medical analysis.
            </p>
          </div>
          <div className="flex items-center justify-center order-1 lg:order-2">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="aspect-square relative">
                <Image
                  src={image4}
                  fill
                  alt="about image"
                  className="object-cover rounded-lg"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <section className="__gapTop">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              More Than Just Reports
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                img: image,
                title: "Visual Food Tracking",
                desc: "Track your daily nutrition with smart visual recognition"
              },
              {
                img: image1,
                title: "Family Profiles",
                desc: "Manage health data for your entire family in one place"
              },
              {
                img: image2,
                title: "Smart Report Analysis",
                desc: "AI-powered insights from your medical reports"
              },
              {
                img: image3,
                title: "Secure & Private",
                desc: "Bank-level security for all your health information"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
                  <Image src={item.img} width={24} height={24} alt="icon" className="sm:w-[30px] sm:h-[30px]" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Import Reports Section */}
      <div className="__gapTop">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
            <div className="flex items-center justify-center order-2 lg:order-1">
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={image5}
                    fill
                    alt="Person using mobile health app"
                    className="object-cover rounded-lg shadow-lg"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left order-1 lg:order-2">
              <div className="inline-block bg-pink-100 text-pink-600 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                NEW
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Have Reports from
                <br className="hidden sm:block" />
                <span className="block sm:inline"> Other Labs?</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Import and analyze reports from any laboratory. Our AI
                technology reads and interprets your existing reports, giving
                you comprehensive health insights.
              </p>
              <button className="bg-pink-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-pink-600 transition-colors text-sm sm:text-base w-full sm:w-auto">
                Scan Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Built Around Your Needs Section */}
      <div className="__gapTop">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col sm:flex-row items-start justify-center gap-3 sm:gap-4 text-center sm:text-left order-2 lg:order-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full __primary-bg p-2 flex-shrink-0 mx-auto sm:mx-0 flex items-center justify-center">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold __secondary-text mb-3 sm:mb-4">
                  Built Around Your Needs
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base __text">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>Personalized health recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>Custom alerts and reminders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>Integration with wearable devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>24/7 health monitoring support</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                {/* Background pink shape - responsive */}
                <div className="bg-pink-500 rounded-2xl sm:rounded-3xl w-full h-32 sm:h-40 lg:h-44 xl:h-48 absolute bottom-0 left-0 z-0"></div>
                
                {/* Woman image - responsive */}
                <div className="relative z-10 h-64 sm:h-80 lg:h-96 xl:h-[427px]">
                  <Image
                    src={image6}
                    alt="Woman talking on phone"
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};