import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import ConvertNumber from "~/utils/ConvertNumber";
const StyledArtist = styled.div`
  .artists-slider {
    overflow: hidden;
    &::after {
      background-color: ${(props) => props.theme.darkAlpha50Bg};
    }
    &:hover .artists-action,
    &:hover::after {
      visibility: visible;
    }

    &:hover .artists-img {
      transform: scale(1.1);
    }
  }
  .artists-name {
    color: ${(props) => props.theme.textPrimary};
  }
  .artists-follow {
    color: ${(props) => props.theme.textSecondary};
  }
  .artist-subscribe-btn {
    margin: 14px auto 20px;
    font-size: 12px;
    background-color: ${(props) => props.theme.purplePrimary};
    text-transform: uppercase;
    line-height: 12px;
  }
`;
const ArtistBanner = ({ data = {} }) => {
  const { items, title } = data;
  let slickProperty = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
      //màn hình dưới 600px
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };
  return (
    <StyledArtist className="container-layout">
      <h3>{title}</h3>
      <Slider {...slickProperty}>
        {items.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center justify-center w-full"
          >
            <Link
              to={item.link}
              state={{ artistName: item.alias }}
              className="relative after:absolute artists-slider inline-block after:content-[''] after:inset-0 after:w-full after:h-full after:invisible overflow-hidden rounded-full cursor-pointer"
            >
              <img
                className="object-cover w-full transition-all duration-700 rounded-full artists-img"
                src={item.thumbnail}
                alt=""
              />
              <div className="absolute z-10   flex invisible artists-action justify-center items-center border border-white top-2/4 w-[45px] rounded-full h-[45px] left-2/4 -translate-x-2/4 -translate-y-2/4 text-white">
                <i className="text-3xl bi bi-play-fill"></i>
              </div>
            </Link>
            <div className="flex flex-col">
              <span className="mt-4 mb-1 text-base font-medium text-center cursor-pointer whitespace-nowrap artists-name text-ellipsis">
                {item.name}
              </span>
              <p className="text-xs leading-[1.33] artists-follow text-center font-normal">
                {ConvertNumber(item.totalFollow)} quan tâm
              </p>
              <button className="flex items-center px-6 py-1 text-white rounded-full whitespace-nowrap artist-subscribe-btn">
                <i className="mr-1 text-base bi bi-check2"></i>
                <span>ĐÃ QUAN TÂM</span>
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </StyledArtist>
  );
};

export default ArtistBanner;
