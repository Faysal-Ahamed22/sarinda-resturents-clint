import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import slide1 from '../../assets/home/slide1.jpg';
import slide2 from '../../assets/home/slide2.jpg';
import slide3 from '../../assets/home/slide3.jpg';
import slide4 from '../../assets/home/slide4.jpg';
import slide5 from '../../assets/home/slide5.jpg';
import SectionTitle from '../../components/SectionTitle';


const FoodCatagory = () => {
    return (

        <section className="px-4">
            <SectionTitle
                heading={"Order Online"}
                subHeading={"From 11 A.M to 10 P.M"}
            >
            </SectionTitle>
            <Swiper
                slidesPerView={1.2}
                spaceBetween={16}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper mb-20"
            >
                <SwiperSlide>
                    <img src={slide1} alt="" />
                    <h3 className='-mt-16 p-4 text-center text-2xl text-white sm:text-3xl'>SALAD</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="" />
                    <h3 className='-mt-16 p-4 text-center text-2xl text-white sm:text-3xl'>PIZZA</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="" />
                    <h3 className='-mt-16 p-4 text-center text-2xl text-white sm:text-3xl'>SOUP</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} alt="" />
                    <h3 className='-mt-16 p-4 text-center text-2xl text-white sm:text-3xl'>DESSERTS</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} alt="" />
                    <h3 className='-mt-16 p-4 text-center text-2xl text-white sm:text-3xl'>SALAD</h3>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default FoodCatagory;
