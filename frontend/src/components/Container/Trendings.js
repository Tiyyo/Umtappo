import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import "swiper/css";
import "swiper/css/pagination";
import { createTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import BannerCard from "../Cards/BannerCard";
import { Link } from "react-router-dom";

const Trendings = (props) => {
  const { content, title } = props;

  return (
    <div className="banner--container">
      <h2>{title}</h2>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="swiper"
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
          <Loader />
        )}
      </Swiper>
    </div>
  );
};

export default Trendings;
