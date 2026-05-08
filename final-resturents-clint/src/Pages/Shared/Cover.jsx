import React from 'react';

const Cover = ({ img , title ,subTitle }) => {

    return (
        <div
            className="hero min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]"
            style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content px-4 py-10 text-center text-neutral-content sm:py-16">
                <div className="max-w-lg">
                    <h1 className="mb-4 text-3xl font-bold uppercase text-white sm:text-5xl lg:text-6xl">{title}</h1>
                    <p className="mb-4 text-sm font-medium text-white sm:text-base lg:text-lg">
                       {subTitle}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cover;