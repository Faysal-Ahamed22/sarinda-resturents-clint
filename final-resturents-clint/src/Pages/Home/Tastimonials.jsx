import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


const Tastimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://sarinda-server.vercel.app/reviews')
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    return (
        <section className='my-16 px-4 sm:my-20'>
            <SectionTitle
                subHeading={"What our clint says?"}
                heading={"Testimonials"}
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className="mx-auto max-w-3xl px-2 py-8 sm:px-4 sm:py-10">
                            <div className="rounded-2xl bg-neutral px-5 py-10 text-center shadow-2xl sm:px-8 md:px-12 md:py-14">
                                    <div className="mb-6 flex justify-center gap-1 text-lg text-yellow-400 sm:text-xl">
                                {
                                    Array.from({ length: review.rating }).map((_, index) => (
                                        <span key={index}>★</span>
                                    ))
                                }
                            </div>
                            <div className="text-6xl leading-none text-white/25 sm:text-8xl">“</div>
                            <p className="mt-4 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                                {review.details}
                            </p>
                            <h3 className="mt-6 text-xl font-semibold text-white sm:text-2xl">
                                {review.name}
                            </h3>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Tastimonials;