import { React, useEffect } from "react";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const MainCarousel = () => {
    const createRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    let initIdx = createRandomNumber(0, 2);
    const carouselItems = [
        {
            imgUrl: "/img/main/mainvisual_230726.png",
            title: "Slide 3",
            description: "This is the second slide.",
        },
        {
            imgUrl: "/img/main/mainvisual01.png",
            title: "Slide 1",
            description: "This is the first slide.",
        },
        {
            imgUrl: "/img/main/mainvisual02.png",
            title: "Slide 2",
            description: "This is the second slide.",
        },
    ];

    return (
        <>
            <div id="mainvisual">
                <div className="mainvisual">
                    <Swiper
                        modules={[Autoplay]}
                        id="hotel-slide"
                        className="swiper-container"
                        slidesPerView={1}
                        spaceBetween={60}
                        loop={true}
                        speed={2000}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: true,
                        }}
                        initialSlide={initIdx}
                    >
                        {carouselItems.map((item, idx) => (
                            <SwiperSlide key={idx}>
                                <img
                                    src={item.imgUrl}
                                    alt={item.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default MainCarousel;
