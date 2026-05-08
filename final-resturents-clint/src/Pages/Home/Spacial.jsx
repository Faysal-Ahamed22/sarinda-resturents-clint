import React from 'react';
import photo from '../../assets/home/chef-service.jpg';

const Spacial = () => {
    return (
        <section className="mx-auto max-w-6xl px-4 py-16">
            <div
                className="relative min-h-[320px] overflow-hidden rounded-2xl bg-cover bg-center shadow-2xl sm:min-h-[420px]"
                style={{ backgroundImage: `url(${photo})` }}
            >
                <div className="absolute inset-0 bg-black/45" />
                <div className="relative flex min-h-[320px] items-center justify-center p-4 sm:min-h-[420px] sm:p-6">
                    <div className="max-w-3xl rounded-xl bg-white/95 px-5 py-8 text-center shadow-xl backdrop-blur-sm sm:px-8 md:px-14 md:py-12">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">
                            Sarinda Special
                        </p>
                        <h2 className="text-2xl font-bold text-neutral sm:text-3xl md:text-5xl">
                            Spacial Sarinda BIRIANI
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-neutral-600 md:text-base">
                            A rich, aromatic biriani crafted with premium spices, slow-cooked rice,
                            and the signature Sarinda flavor in every bite.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Spacial;