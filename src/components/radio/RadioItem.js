import React, { Fragment } from "react";
import styled from "styled-components";
const StyledRadioItem = styled.div`
  display: flex;
  flex-direction: column;

  .radio-top {
    .radio-img img {
      transition: 0.5s linear;
    }
    &:hover .radio-img .image {
      transform: scale(1.1);
    }
    .radio-img .radio-overlay {
      background-color: ${(props) => props.theme.darkAlpha50Bg};
    }
    &:hover .radio-action,
    &:hover .radio-img .radio-overlay {
      visibility: visible;
    }
  }
  .sub-img {
    border: 2px solid ${(props) => props.theme.layoutBg};
  }
  .radio-title {
    font-size: 16px;
    color: ${(props) => props.theme.textPrimary};
    font-weight: 700;
    line-height: 1;
  }
  .radio-subtitle {
    color: ${(props) => props.theme.textSecondary};
  }
`;
const RadioItem = ({ item }) => {
  const {
    id,
    host: { name, thumbnail: subThumbnail },
    program: { thumbnail },
    activeUsers,
  } = item;
  return (
    <StyledRadioItem className="radio-item">
      <div className="relative w-full bg-transparent cursor-pointer radio-top ">
        <div className="relative overflow-hidden border-2 border-red-600 rounded-full sw-full radio-img ">
          <img
            className="object-cover w-full rounded-full image"
            src={thumbnail}
            alt=""
          />
          <div className="absolute inset-0 invisible w-full h-full rounded-full radio-overlay"></div>
          <div className="absolute radio-action invisible  top-2/4 rounded-full  h-[45px]  w-[45px] left-2/4 border border-white -translate-x-2/4 -translate-y-2/4 ">
            <i className="text-white leading-[45px] text-center  rounded-full text-3xl   bi bi-play-fill "></i>
          </div>
        </div>
        <div className="absolute sub-img w-[46px] top-[85.3%] left-[85.3%] -translate-x-[55%] -translate-y-[55%] z-10 h-[46px] rounded-full">
          <img
            className="object-cover w-full rounded-full"
            src={subThumbnail}
            alt=""
          />
        </div>
        <span className="absolute tracking-[2px] rounded-[3px] left-2/4 -translate-x-2/4 translate-y-2/4 text-white uppercase bg-red-600 bottom-0 text-[8px] p-[3px] leading-[1] font-bold">
          LIVE
        </span>
      </div>
      <div className="mt-5 text-center">
        <h5 className="mr-0 radio-title">{name}</h5>
        <span className="radio-subtitle text-xs text-normal leading-[1.33]">
          {activeUsers} đang nghe
        </span>
      </div>
    </StyledRadioItem>
  );
};

export default RadioItem;
