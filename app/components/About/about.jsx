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
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              A Central Hub for Your
              <br />
              Wellbeing
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Safely store and protected data as in one place and get the most
              detailed insights into your health through detailed metrics and
              professional medical analysis.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-[300px] w-full">
              <Image
                src={image4}
                width={320}
                height={320}
                alt="about image"
                className="object-cover h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <section className="__gapTop">
        <div className="container mx-auto ">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              More Than Just Reports
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <Image src={image} width={30} height={30} alt="icon" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Visual Food Tracking
              </h3>
              <p className="text-gray-600 text-sm">
                Track your daily nutrition with smart visual recognition
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <Image src={image1} width={30} height={30} alt="icon" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Family Profiles</h3>
              <p className="text-gray-600 text-sm">
                Manage health data for your entire family in one place
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <Image src={image2} width={30} height={30} alt="icon" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Smart Report Analysis
              </h3>
              <p className="text-gray-600 text-sm">
                AI-powered insights from your medical reports
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <Image src={image3} width={30} height={30} alt="icon" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm">
                Bank-level security for all your health information
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="__gapTop">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 items-center justify-center gap-8">
            <div className="flex items-center justify-center">
              <div className="relative w-full h-[300px]">
                <Image
                  src={image5}
                  alt="Person using mobile health app"
                  className="h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">
                NEW
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                Have Reports from
                <br />
                Other Labs?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Import and analyze reports from any laboratory. Our AI
                technology reads and interprets your existing reports, giving
                you comprehensive health insights.
              </p>
              <button className="bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
                Scan Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="__gapTop">
        <div className="container mx-auto ">
          <div className="grid md:grid-cols-2 gap-8 items-center h-full">
            <div className="flex items-start justify-center gap-2">
              <div className="w-10 h-10 rounded-full __primary-bg p-2">
                <Check />
              </div>
              <div>
                <h3 className="text-2xl font-bold __secondary-text">
                  Built Around Your Needs
                </h3>
                <ul className="space-y-2 text-sm mt-5 __text">
                  <li>• Personalized health recommendations</li>
                  <li>• Custom alerts and reminders</li>
                  <li>• Integration with wearable devices</li>
                  <li>• 24/7 health monitoring support</li>
                </ul>
              </div>
            </div>
            <div className="relative h-[427px] ">
              <div className="bg-pink-500 rounded-3xl w-full h-[220px] md:h-[150px] absolute bottom-0 left-0 z-0"></div>

              <div className="absolute inset-0 z-10 flex items-center justify-start">
                <Image
                  src={image6}
                  alt="Woman talking on phone"
                  width={350}
                  height={200}
                  className="object-cover h-full w-full"
                  priority
                />
              </div>
            </div>
            {/* <div className="space-y-6">
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                PERSONALIZED
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                Built Around Your Needs
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Every feature is designed with your unique health journey in mind.
                Get personalized insights, custom health plans, and recommendations
                tailored specifically to your health goals and medical history.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
