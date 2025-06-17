import React from 'react';

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Book Tests Online, Anytime",
      description: "No queues, No calls. Just a few clicks, book a test and get results within 24 hours and also consult to our doctors anytime anywhere you want.",
      note: "* Book for yourself or family",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      alt: "Person using laptop for online booking"
    },
    {
      number: "02",
      title: "One-of-a-kind health experience",
      description: "Get a full comprehensive health check-up at the comfort of your home with experienced professionals and advanced technology.",
      note: "* Support 24/7 care",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      alt: "Healthcare professional in lab"
    },
    {
      number: "03",
      title: "Home Sample Collection",
      description: "Our certified professionals will visit your home to collect samples safely and hygienically at your convenience.",
      note: "* Safe and hygienic collection",
      image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&h=400&fit=crop",
      alt: "Healthcare professional collecting samples"
    },
    {
      number: "04",
      title: "Advanced Lab Processing",
      description: "Your samples are processed in our state-of-the-art laboratories using cutting-edge technology and quality standards.",
      note: "* NABL certified labs",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
      alt: "Advanced laboratory equipment"
    },
    {
      number: "05",
      title: "Tests, packages, or answers—right at your fingertips",
      description: "From basic health screenings to comprehensive packages, find exactly what you need with instant access to results and expert guidance.",
      note: "* Receive detailed test results",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
      alt: "Healthcare professionals reviewing results"
    }
  ];

  return (
    <div className='bg-[#FCD3EA] md:mt-[80px]'>
      <section className="container mx-auto">
        {steps.map((step, index) => (
          <div 
            key={step.number}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-14 items-center mb-6 lg:mb-10"
          >
            {/* Text Content - Always left */}
            <div className="space-y-4 sm:space-y-6 px-4 text-left">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900">
                  {step.number}.
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 leading-tight">
                  {step.title.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word}
                      {/* Add line breaks at strategic points for better mobile display */}
                      {(i === 1 && step.title.includes('Online')) && <br className="hidden sm:block" />}
                      {(i === 0 && step.title.includes('One-of-a-kind')) && <br className="hidden sm:block" />}
                      {(i === 1 && step.title.includes('Sample')) && <br className="hidden sm:block" />}
                      {(i === 1 && step.title.includes('Lab')) && <br className="hidden sm:block" />}
                      {(i === 2 && step.title.includes('packages')) && <br className="hidden sm:block" />}
                      {i < step.title.split(' ').length - 1 && ' '}
                    </React.Fragment>
                  ))}
                </h2>
                <p className="text-sm md:text-lg text-gray-600 leading-relaxed md:max-w-lg ">
                  {step.description}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 italic">
                  {step.note}
                </p>
              </div>
            </div>

            {/* Image Content - Always right */}
            <div className="relative flex justify-center lg:justify-end w-full">
              <div className="relative group w-full">
                
                {/* Main image container */}
                <div className="relative z-10 overflow-hidden w-full">
                  <img 
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-64 sm:h-80 lg:h-96 xl:h-[38rem] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Overlay gradient for better text readability if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};