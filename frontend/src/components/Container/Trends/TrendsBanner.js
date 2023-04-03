import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Autoplay } from "swiper";
import { EffectCoverflow } from "swiper";
import BannerCard from "../../Cards/Banner/BannerCard";
import { Link } from "react-router-dom";
import LoaderUI from "../../Loader/LoaderUI";

const TrendsBanner = ({ content, title }) => {
  return (
    <div className="trends">
      <h2>{title}</h2>
      <Swiper
        spaceBetween={100}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 10000,
        }}
        coverflowEffect={{
          depth: 300,
          scale: 5,
        }}
        modules={[Pagination, Autoplay, EffectCoverflow]}
        className="trends__swiper"
      >
        {content ? (
          content
            .filter((el) => el.backdrop_path)
            .map((el) => {
              return (
                <SwiperSlide key={el.id}>
                  <Link to={el.id.toString()} state={{ content: el }}>
                    <BannerCard element={el} />
                  </Link>
                </SwiperSlide>
              );
            })
        ) : (
          <LoaderUI />
        )}
      </Swiper>
    </div>
  );
};

export default TrendsBanner;
