import Container from "../../../components/Container/Container";
import SectionTitle from "../../../components/sectionTitle/sectionTitle";

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

// import required modules
import { EffectCube, Pagination, Autoplay } from 'swiper/modules';


import img1 from '../../../../public/images/gallery1.jpg';
import img2 from '../../../../public/images/gallery2.jpg';
import img3 from '../../../../public/images/gallery3.jpg';
import img4 from '../../../../public/images/gallery4.jpg';

const Inspiration = () => {

    return (
        <div className="pt-16">

            <Container>

                {/* <div className="text-center">
                    <SectionTitle subHeading="Inspiration" heading="Change the world" description={"Adopting a pet is choosing love over loneliness, compassion over indifference. In their grateful eyes, you'll find a universe of joy waiting to be explored together"} darkMode={true} />
                </div> */}

                <div className="flex flex-col md:flex-row gap-8 mt-12">

                    <div className="md:w-1/2">
                        <p className="text-title-secondary font-bold text-lg mb-4">Inspiration</p>
                        <h3 className="text-title-optioanl text-2xl md:text-4xl font-extrabold font-title">Embracing the Joyful <span className="text-title-secondary">Symphony</span> <br /> of Pet Adoption</h3>
                        <p className="text-secondary-text mt-4">captures the harmonious essence of welcoming a new furry friend into your life. Its a celebration of the heartwarming moments that unfold when compassion meets companionship. From the initial connection at the shelter to the shared joy of discovering each others quirks, this title paints a vivid picture of the transformative journey of pet adoption.</p>

                        <button className="mt-10 text-white bg-primary-bg font-title hover:bg-secondary-bg focus:shadow-none font-medium rounded text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2">Adoption <img src="/public/images/w_pawprint.png" className="w-6" alt="" /></button>
                    </div>

                    <div className="md:w-1/2">
                        <Swiper
                            effect={'cube'}
                            grabCursor={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            cubeEffect={{
                                shadow: true,
                                slideShadows: true,
                                shadowOffset: 20,
                                shadowScale: 0.94,
                            }}
                            loop={true}
                            pagination={true}
                            modules={[EffectCube, Pagination, Autoplay]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <img className="h-[400px] w-[300px] md:h-[500px] md:w-[520px] object-cover mx-auto" src={img1} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="h-[400px] w-[300px] md:h-[500px] md:w-[520px] object-cover mx-auto" src={img2} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="h-[400px] w-[300px] md:h-[500px] md:w-[520px] object-cover mx-auto" src={img3} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="h-[400px] w-[300px] md:h-[500px] md:w-[520px] object-cover mx-auto" src={img4} />
                            </SwiperSlide>
                        </Swiper>

                    </div>


                </div>



            </Container>

        </div>
    );
};

export default Inspiration;