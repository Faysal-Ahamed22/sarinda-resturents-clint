import React from 'react';
import featuredImg from '../../assets/home/featured.jpg';

const Featured = () => {
  return (
    <div className="relative mb-8 overflow-hidden rounded-xl bg-cover bg-center py-12 sm:py-16 md:py-20">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: `url(${featuredImg})`,
          opacity: 0.15,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="order-1 lg:order-1">
            <img
              src={featuredImg}
              alt="Featured dish from our menu"
              className="h-[220px] w-full rounded-2xl object-cover shadow-2xl sm:h-[300px] md:h-[380px] lg:h-full lg:max-h-[600px]"
            />
          </div>

          <div className="order-2 space-y-5 sm:space-y-6 lg:order-2">
            <div>
              <span className="border-l-4 border-orange-500 pl-3 text-sm font-semibold uppercase tracking-wider text-orange-500">
                Check it out
              </span>
            </div>

            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
              FROM OUR MENU
            </h2>

            <div className="flex items-center gap-2 text-sm text-gray-300 sm:text-base">
              <span className="text-lg">📅</span>
              <span className="font-medium">March 20, 2023</span>
            </div>

            <h3 className="border-l-4 border-orange-500 pl-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              WHERE CAN I GET SOME?
            </h3>

            <p className="text-sm leading-relaxed text-white/95 sm:text-base md:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              voluptate facere, deserunt dolores maiores quod nobis quas quasi.
              Eaque repellat recusandae ad laudantium tempore consequatur
              consequuntur omnis ullam maxime tenetur.
            </p>

            <div>
              <button
                onClick={(e) => e.preventDefault()}
                className="rounded-full border-2 border-orange-500 px-6 py-3 font-semibold text-orange-400 transition duration-300 ease-in-out hover:scale-105 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;