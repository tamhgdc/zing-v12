import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Swal from "sweetalert2";
import { changeIconPlaying } from "~/redux-toolkit/audio/audioSlice";
import { setShowVideoMV } from "~/redux-toolkit/global/globalSlice";
import ConvertDuration from "~/utils/ConvertTime";
const StyledMv = styled.div`
  .mv-item-image {
    &:hover img {
      transform: scale(1.1) translateZ(0);
    }
    &:hover .mv-action {
      visibility: visible;
    }
  }
  .mv-title {
    color: ${(props) => props.theme.textPrimary};
    &:hover {
      color: ${(props) => props.theme.linkTextHover};
    }
  }
  .mv-author {
    color: ${(props) => props.theme.textSecondary};
    flex-wrap: nowrap;
    text-overflow: ellipsis;
    & span:hover {
      text-decoration: underline;
      color: ${(props) => props.theme.linkTextHover};
    }
  }
`;
const MvArtist = ({ data = {} }) => {
  const dispatch = useDispatch();
  const { title, items } = data;
  const handleShowVideo = () => {
    dispatch(setShowVideoMV(true));
    dispatch(changeIconPlaying(false));
  };
  return (
    <StyledMv className="container-layout ">
      <h3>{title}</h3>
      <div className="grid grid-cols-3 gap-y-4 gap-x-7">
        {items.length > 0 &&
          items?.map((item, index) => {
            const {
              encodeId,
              duration,
              thumbnailM,
              artist: { thumbnail },
              title: name,
              artists,
              link,
              isWorldWide,
              streamingStatus,
            } = item;
            return (
              <div key={encodeId} className="relative flex flex-col">
                <div
                  onClick={() =>
                    toast.error("Tính năng xem mv chưa được cập nhật!")
                  }
                  className="relative w-full overflow-hidden rounded-md cursor-pointer mv-item-image overlay"
                >
                  <img
                    className="object-cover w-full transition-all duration-700 rounded-md"
                    src={thumbnailM}
                    alt=""
                  />
                  <div className="cursor-pointer invisible text-center border  border-white w-[45px] h-[45px] rounded-full center mv-action">
                    <i className=" text-[30px] leading-[45px]   bi bi-play-fill text-white"></i>
                  </div>
                  <div className="absolute text-base text-white right-2 bottom-2 leading-normal py-[3px] font-normal px-[5px] rounded-[4px] z-[20] bg-[rgba(0,0,0,.7)]">
                    {ConvertDuration(duration)}
                  </div>
                </div>

                <div className="flex relative py-[10px] items-center text-left">
                  <div className="mr-[10px]">
                    <div className="relative w-10 h-10 rounded-full cursor-pointer">
                      <img
                        className="object-cover w-full rounded-full"
                        src={thumbnail}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="max-w-full overflow-hidden text-sm leading-normal cursor-pointer mv-title whitespace-nowrap text-ellipsis ">
                      {name}
                    </span>
                    <div className="mt-[3px] mv-author w-full whitespace-nowrap overflow-hidden  text-ellipsis">
                      {artists.length > 0 &&
                        artists
                          .map((item) => {
                            const { name, id } = item;
                            return (
                              <span
                                key={id}
                                className="inline-block max-w-full text-xs cursor-pointer text-inherit "
                              >
                                {name}
                              </span>
                            );
                          })
                          .reduce((prev, curr) => [prev, ", ", curr])}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </StyledMv>
  );
};

export default MvArtist;
