import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  changeIconPlaying,
  setAudioSrc,
  setInfoSongPlayer,
  setPlaylistId,
  setPlaylistRandom,
  setPlaylistSong,
  setRepeatSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";
import ConvertDates from "~/utils/ConvertDates";
const StyledNewRelease = styled.div`
  .new__release-item {
    &:hover .new__release-img .artists-action,
    &:hover .new__release-img::after {
      visibility: visible;
    }
    box-shadow: 0 2px 10px 0 ${(props) => props.theme.mainBoxShadow};
    background-color: ${(props) => props.theme.boxItemBg};
    .new__release-img {
      &::after {
        background-color: ${(props) => props.theme.darkAlpha50Bg};
      }

      &:hover .artists-img {
        transform: scale(1.1);
      }
    }
  }
  .new-release-name {
    white-space: normal;
    overflow: hidden;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    text-transform: capitalize;
    color: ${(props) => props.theme.textPrimary};
    cursor: pointer;
  }
  .new-release-author {
    color: ${(props) => props.theme.textSecondary};
  }
  .new-release-rank {
    -webkit-text-stroke: 1px ${(props) => props.theme.textSecondary};
    font-weight: 900;
    font-family: "Roboto", sans-serif;
  }
  .new-release-date {
    color: ${(props) => props.theme.textSecondary};
  }
`;
const NewRelease = ({ data = {} }) => {
  const dispatch = useDispatch();
  const { items, title } = data;
  const handlePlaySong = (song) => {
    dispatch(setRepeatSong(true));
    dispatch(setAudioSrc(""));
    dispatch(setPlaylistId(""));
    dispatch(setPlaylistSong([song]));
    dispatch(setPlaylistRandom([song]));
    dispatch(setSongId(song.encodeId));
    dispatch(setInfoSongPlayer(song));
    dispatch(changeIconPlaying(true));
  };
  return (
    <StyledNewRelease className="container-layout">
      <h3>{title}</h3>
      <div className="grid new-release-container grid-cols-3 py-[5px] gap-x-7">
        {items.slice(0, 3).map((item, index) => {
          const {
            title,
            artistsNames,
            thumbnail,
            encodeId,
            releaseDate,
            releasedAt,
            link,
          } = item;
          return (
            <div
              onClick={() => handlePlaySong(item)}
              to={link}
              key={encodeId}
              className="flex new__release-item cursor-pointer rounded-[4px] p-[15px] "
            >
              <div className="mr-[10px]  relative after:absolute  new__release-img after:content-[''] after:inset-0 after:w-full after:h-full after:invisible  w-[120px] h-[120px] rounded-[5px] overflow-hidden flex-shrink-0 cursor-pointer">
                <img
                  className="w-full transition-all duration-700 artists-img object-cover rounded-[5px]"
                  src={thumbnail}
                  alt=""
                />
                <div className="absolute z-10 invisible    flex  artists-action justify-center items-center border border-white top-2/4 w-[45px] rounded-full h-[45px] left-2/4 -translate-x-2/4 -translate-y-2/4 text-white">
                  <i className="text-3xl bi bi-play-fill"></i>
                </div>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex flex-col">
                  <h5 className="new-release-name text-ellipsis capitalize text-[16px] font-bold  leading-[1.38] cursor-pointer">
                    {title}
                  </h5>
                  <span className="inline-block mt-1 text-xs capitalize whitespace-normal new-release-author">
                    {artistsNames}
                  </span>
                </div>
                <div className="relative flex justify-between">
                  <h5 className="opacity-40 new-release-rank text-[40px] leading-[1] text-transparent  cursor-pointer capitalize">
                    #{index + 1}
                  </h5>
                  <span className="absolute bottom-0 right-0 text-base capitalize cursor-pointer new-release-date ">
                    {ConvertDates(releasedAt || releaseDate)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </StyledNewRelease>
  );
};

export default NewRelease;
