import React from "react";

const MenuItem = ({ item }) => {
  const { name, image, price, recipe } = item;

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-base-100 p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="h-20 w-20 shrink-0 self-center overflow-hidden rounded-full bg-base-300 sm:self-auto">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
          <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-base-content sm:text-base">
            {name}
          </h3>

          <div className="mt-3 hidden flex-1 border-b border-dashed border-base-300 sm:block"></div>

          <p className="shrink-0 text-sm font-medium text-[#D97706] sm:text-base">
            ${price}
          </p>
        </div>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-base-content/60">
          {recipe}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;