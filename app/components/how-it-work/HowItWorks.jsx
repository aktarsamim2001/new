import React from 'react';

export const HowItWorks = () => {
  return (
    <div className='bg-[#FCD3EA]'>
          <section className=" flex items-center mt-[60px]">
        <div className="container mx-auto ">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-4xl lg:text-5xl font-light text-gray-500">01.</div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Book Tests<br />
                  Online, Anytime
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                  No queues, No calls. Just a few clicks, book a test and get
                  results within 24 hours and also consult to our doctors
                  anytime anywhere you want.
                </p>
                <p className="text-sm text-gray-500">
                  * Book for yourself or family
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop" 
                  alt="Person using laptop for online booking"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* <div className="absolute -top-4 -right-4 w-full h-full bg-pink-200 rounded-2xl -z-10"></div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen flex items-center ">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-4xl lg:text-5xl font-light text-gray-500">02.</div>
                <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  One-of-a-kind<br />
                  health experience
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                  Get a full comprehensive health check-up at the comfort of your
                  home with experienced professionals and advanced technology.
                </p>
                <p className="text-sm text-gray-500">
                  * Support 24/7 care
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop" 
                  alt="Healthcare professional in lab"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* <div className="absolute -top-4 -right-4 w-full h-full bg-orange-200 rounded-2xl -z-10"></div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen flex items-center ">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-4xl lg:text-5xl font-light text-gray-500">03.</div>
                <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Tests, packages, or<br />
                  answers—right at your<br />
                  fingertips
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                  From basic health screenings to comprehensive packages, 
                  find exactly what you need with instant access to results 
                  and expert guidance.
                </p>
                <p className="text-sm text-gray-500">
                  * Receive detailed test results
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop" 
                  alt="Healthcare professionals"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* <div className="absolute -top-4 -right-4 w-full h-full bg-purple-200 rounded-2xl -z-10"></div> */}
            </div>
          </div>
        </div>
      </section>
    </div>

  );
};
