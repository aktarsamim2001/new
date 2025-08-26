const HeaderSection = () => (
  <div className="__gapTop">
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full">
      <div className="w-full md:mt-0 mt-[2rem] md:w-[29%] flex ml-8 lg:justify-end items-center">
        <h1 className="__secondary-text text-2xl lg:text-5xl font-bold text-right">
          Book Your Test
        </h1>
      </div>
      <div className="w-[100%] md:w-[50%]">
        <img
          src="/test-book-banner/banner.jpg"
          alt="Sukaii Logo"
          className="w-full h-[200px] md:h-[370px] overflow-hidden lg:rounded-l-4xl"
        />
      </div>
    </div>
  </div>
);

export default HeaderSection;