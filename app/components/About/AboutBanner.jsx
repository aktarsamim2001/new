// import Image from "next/image";
// import React from "react";
// import image from "../../assets/about/aboutBanner.jpg";
// import Link from "next/link";

// function AboutBanner() {
//   return (
//     <div>
//       {" "}
//       <div className="container mx-auto __gapTop">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-start">
//           {/* Image Section */}
//           <div className="flex justify-center items-center">
//             <div className="relative w-full h-[200px] md:h-[287px] md:rounded-[30px] overflow-hidden shadow-lg">
//               <Image
//                 src={image}
//                 alt="Services Banner"
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             </div>
//           </div>

//           {/* Text Section */}
//           <div className="text-left px-4 md:px-0">
//             <h1 className="text-[16px] md:text-4xl font-bold __secondary-text">
//               Find the Right Test For You
//             </h1>
//             <p className="mt-3 mb-3 text-lg text-gray-600 line-clamp-3 md:line-clamp-3">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
//               ipsum dolor sit amet consectetur adipisicing elit. Dolor vitae
//               beatae fuga quas quidem quaerat. adipisicing elit. Dolor vitae
//               beatae fuga quas quidem quaerat. Dolor vitae beatae fuga quas
//               quidem quaerat. adipisicing elit. Dolor vitae beatae fuga quas
//               quidem quaerat.fuga quas quidem quaerat.
//             </p>
//             <button className="mt-4 cursor-pointer __secondary-bg text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
//               <Link href="/sign-up" className="text-white">
//                 Login to Dashboard
//               </Link>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default AboutBanner;

import Image from "next/image";
import React from "react";
import image from "../../assets/about/aboutBanner.jpg";
import Link from "next/link";

function AboutBanner() {
  return (
    <div>
      {" "}
      <div className=" mx-auto __gapTop">
        {/* Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-start">
          {/* Image Section */}
          <div className="flex justify-center items-center">
            <div className="relative w-full h-[200px] md:h-[300px] md:rounded-r-[30px] overflow-hidden shadow-lg">
              <Image
                src={image}
                alt="Services Banner"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="text-left px-4 md:px-0 max-w-xl">
            <h1 className="text-[26px] md:text-[50px] md:text-4xl font-bold __secondary-text">
              Your Health, Smarter.
            </h1>
            <p className="mt-3 mb-3 banner__description text-gray-600 line-clamp-3 md:line-clamp-3">
              All your medical records, test results, and health insights—neatly
              organized in one secure dashboard.
            </p>
            <button className="mt-4 cursor-pointer __secondary-bg text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
              <Link href="/sign-up" className="text-white">
                Login to Dashboard
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutBanner;
