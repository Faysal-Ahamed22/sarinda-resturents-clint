import React from 'react';

const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className='mx-auto my-8 max-w-2xl px-4 text-center'>
            <p className='mb-2 text-sm font-medium text-yellow-600 sm:text-base'>--- {subHeading} ---</p>
            <h3 className='border-y-4 py-3 text-2xl uppercase sm:py-4 sm:text-3xl md:text-4xl'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;