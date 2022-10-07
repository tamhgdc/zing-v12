import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icon from "../Icon";
import iconPlaying from "~/assets/image/iconPlaying.gif";

const StyledMix = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  .card__item-img {
    &:hover .card-img {
      transform: scale(1.1);
    }
    &:hover .card-action {
      visibility: visible;
    }
    &:hover .icon-play {
      visibility: visible;
    }
  }
  .artist-name {
    color: ${(props) => props.theme.textSecondary};
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.linkTextHover};
      text-decoration: underline;
    }
  }

  & .is-active .icon-playing {
    display: flex;
  }
  & .is-active .icon-play {
    display: none;
  }
`;
const Mix = ({ data = {} }) => {
  const { items, title } = data;
  const { isPlay, playlistId } = useSelector((state) => state.audio);

  return (
    <StyledMix className="container-layout">
      <h3>{title}</h3>
      <div className="grid grid-cols-5 wrapper-mix gap-x-7">
        {items?.slice(0, 5).map((item) => {
          const { encodeId, thumbnail, title, link } = item;
          return (
            <Link
              to={link}
              state={{ id: encodeId }}
              key={encodeId}
              className="flex flex-col mix-item"
            >
              <div className="relative  card__item-img after:invisible overflow-hidden hover:after:visible after:content-[''] after:w-full after:h-full after:inset-0 after:bg-black after:bg-opacity-50 after:absolute w-full rounded-md cursor-pointer ">
                <img
                  className="object-cover w-full transition-all duration-700 rounded-md card-img"
                  src={thumbnail}
                  alt=""
                />
                <div
                  className={`absolute z-10 justify-center flex  w-full card-action items-center top-2/4 -translate-x-2/4 -translate-y-2/4 left-2/4 ${
                    isPlay && playlistId === encodeId ? "is-active" : ""
                  }`}
                >
                  <div className="z-50 items-center justify-center hidden w-10 h-10 border-2 border-white border-solid rounded-full icon-playing">
                    <img className="w-5 h-5" src={iconPlaying} alt="" />
                  </div>
                  <Icon className="invisible icon-play">
                    <i className="p-[5px]  border border-white text-[30px] leading-[0px] flex justify-center items-center bi bi-play-fill text-white w-[45px] h-[45px] rounded-full"></i>
                  </Icon>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="mt-2 mb-1 text-base font-bold cursor-pointer card-title text-inherit ">
                  {title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </StyledMix>
  );
};

export default Mix;
