import React, { Fragment, useState } from "react";
import styled from "styled-components";
import Button from "~/components/button";
import { BsFillPlayFill } from "react-icons/bs";
import iconPlaying from "~/assets/image/iconPlaying.gif";
import awardsImg from "~/assets/image/awardsUrl.svg";
import ConvertNumber from "~/utils/ConvertNumber";
import ModalBiography from "~/components/modalBiography";
import { useEffect } from "react";
const StyledSingerBiography = styled.div`
  background-color: ${(props) => props.theme.darkAlpha80};
  .song-thumb {
    &:hover i,
    &:hover::after {
      visibility: visible;
    }
  }
  & .media-content span {
    color: ${(props) => props.theme.textItemHover};
  }
  & .media-content {
    color: ${(props) => props.theme.textSecondary};
  }
`;
const ArtistBiography = ({ data = {}, onClick = () => {} }) => {
  const [showModalBiography, setShowModalBiography] = useState(false);
  const {
    name,
    thumbnail,
    sortBiography,
    totalFollow,
    topAlbum = {},
    awards,
    biography,
    thumbnailM,
    playlistId,
    sections,
  } = data;
  const { title, thumbnail: songThumb, releaseDate } = topAlbum;
  return (
    <Fragment>
      <StyledSingerBiography className="artist__container-info">
        <div className="flex flex-col">
          <h4 className="text-[40px] title font-bold mb-[5px]  tracking-[-.08px] ">
            {name}
          </h4>
          <div className="overflow-hidden biography">
            <div className="max-h-[70px]   biography-desc text-inherit text-base  leading-[1.64] mb-5">
              {sortBiography}
              {biography !== "" && (
                <button
                  onClick={() => setShowModalBiography(true)}
                  className="inline-block text-xs font-bold uppercase cursor-pointer read-more text-inherit"
                >
                  ... Xem thêm
                </button>
              )}
            </div>
            <div className="flex flex-col gap-y-8 max-h-[138px] justify-between">
              <div className="flex gap-x-[10px]">
                <Button
                  onClick={() =>
                    onClick(
                      sections[0]?.items[0],
                      sections[0]?.items,
                      playlistId
                    )
                  }
                  large
                  className="play-btn"
                  leftIcon={<BsFillPlayFill />}
                >
                  Phát nhạc
                </Button>
                <Button large className="play-btn">
                  Quan tâm • {ConvertNumber(totalFollow)}
                </Button>
              </div>
              {awards ? (
                <div className="flex">
                  <div className="relative w-[48px] h-[48px]">
                    <img
                      className="object-cover w-full "
                      src={awardsImg}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col ml-2">
                    {awards?.map((item, index) => (
                      <p
                        key={index}
                        className="text-xs leading-[1.4] text-[#a0a0a0] tracking-[1.2px]"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex">
                  <div className="mr-[10px] ">
                    <div className="song-thumb after:invisible  after:absolute after:content-[''] after:inset-0 after:w-full after:h-full after:bg-black after:bg-opacity-50  w-[60px] h-[60px] relative cursor-pointer rounded-[4px] flex-shrink-0  overflow-hidden">
                      <img
                        className="object-cover w-full rounded-[4px] "
                        src={songThumb}
                        alt=""
                      />
                      <div className="absolute w-[80%] flex justify-center items-center z-10 invisible text-2xl text-white cursor-pointer media-action top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 ">
                        <i className="p-1 text-3xl bi bi-play-fill"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 media-content">
                    <span className="font-medium leading-[1.9] text-[10px] uppercase">
                      MỚI NHẤT
                    </span>
                    <h4 className="text-base font-medium leading-[1.57] whitespace-nowrap text-ellipsis">
                      {title}
                    </h4>
                    <p className="text-xs mt-[3px] max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-normal">
                      {releaseDate}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="relative flex justify-end">
          <div className="relative w-[260px] h-[260px] overflow-hidden rounded-full">
            <img
              className="object-cover w-full rounded-full"
              src={thumbnail}
              alt=""
            />
          </div>
        </div>
        <ModalBiography
          open={showModalBiography}
          handleClose={() => {
            setShowModalBiography(false);
          }}
          data={{ biography, thumbnail, name, thumbnailM }}
        ></ModalBiography>
      </StyledSingerBiography>
    </Fragment>
  );
};

export default ArtistBiography;
