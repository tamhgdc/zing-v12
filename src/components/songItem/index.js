import Tippy from "@tippyjs/react";
import React from "react";
import { GiMicrophone } from "react-icons/gi";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import Icon from "~/components/Icon";
import {
  changeIconPlaying,
  setPlaylistSongFav,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";
import ConvertDuration from "~/utils/ConvertTime";
import iconPlaying from "~/assets/image/iconPlaying.gif";
import { IoIosMusicalNotes } from "react-icons/io";
import viplabel from "~/assets/image/vipLabel.svg";

const StyledSong = styled.div`
  &:hover .icon-play {
    display: initial;
  }
  &.active {
    background-color: ${(props) => props.theme.alphaBg};
  }
  .play-btn {
    font-size: 18px !important;
  }
  &:hover .play-btn {
    visibility: visible;
  }
  border-bottom: 1px solid ${(props) => props.theme.borderSecondary};
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.alphaBg};
  }
  &:hover .media-action {
    visibility: visible;
  }
  &:hover .song-thumb::after {
    visibility: visible;
  }
  .song__rank-number {
    width: 60px;
    min-width: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(74, 144, 226, 0);
    opacity: 1;
    margin-right: 5px;
    font-size: 32px;
    font-weight: 900;
    line-height: 1;
    text-align: center;
    color: rgba(74, 144, 226, 0);
    font-family: "Roboto", sans-serif;
    white-space: nowrap;
    color: rgba(74, 144, 226, 0);
    -webkit-text-stroke: 1px ${(props) => props.theme.textPrimary};

    &.isTop1 {
      -webkit-text-stroke: 1px #4a90e2;
    }
    &.isTop2 {
      -webkit-text-stroke: 1px #50e3c2;
    }
    &.isTop3 {
      -webkit-text-stroke: 1px #e35050;
    }
  }
  .icon-dash {
    color: ${(props) => props.theme.textPrimary};
  }
  .song__info {
    overflow: hidden;
    flex-wrap: nowrap;
    display: -webkit-box;
    word-break: break-word;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    &-name {
      text-transform: capitalize;
      font-weight: 500;
      font-size: 14px;
      line-height: 14px;
      color: ${(props) => props.theme.textPrimary};
      margin-top: 3px;
      flex-wrap: nowrap;
      display: -webkit-box;
      word-break: break-word;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      line-height: 16px;
    }
    .song__search-name {
      text-transform: capitalize;
      font-weight: 500;
      font-size: 14px;
      line-height: 14px;
      color: ${(props) => props.theme.textPrimary};
      margin-top: 3px;
      flex-wrap: nowrap;
      display: -webkit-box;
      word-break: break-word;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      line-height: 16px;
      &:hover {
        color: ${(props) => props.theme.linkTextHover};
      }
    }
    &-author {
      margin-top: 6px;
      line-height: 1.33;
      color: ${(props) => props.theme.textSecondary};
      display: flex;
      flex-wrap: nowrap;
      display: -webkit-box;
      word-break: break-word;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      & .artist-name {
        color: ${(props) => props.theme.textSecondary};

        &:hover {
          color: ${(props) => props.theme.linkTextHover};
        }
      }
    }
  }
  .media-content {
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: left;
    align-self: center;
    width: 0;
    font-size: 12px;
    color: ${(props) => props.theme.textSecondary};
    &:hover {
      color: ${(props) => props.theme.linkTextHover};
      text-decoration: underline;
    }
  }
  .media-right {
    display: flex;
    margin-left: 10px;
    align-items: center;
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .hover-item {
    display: none;
    word-break: break-word;
  }
  &:hover .hover-item {
    display: flex;
  }
  &:hover .media-duration {
    display: none;
  }

  .media-duration {
    word-break: break-word;
    font-size: 12px;
    color: ${(props) => props.theme.textSecondary};
  }
  .sort-ranking {
    color: ${(props) => props.theme.textPrimary};
  }
  .song-icon-note {
    color: ${(props) => props.theme.textSecondary};
    flex-shrink: 0;
  }
  ${(props) =>
    props.playingBar &&
    css`
      .media-left {
        width: 100%;
        margin-right: 0;
      }
      &.active {
        background-color: ${(props) => props.theme.purplePrimary};
      }
      &.active .song__search-name {
        color: #fff !important;
      }
      .artist-name,
      .song__info-author {
        color: ${(props) => props.theme.textSecondary} !important;
      }
      &.active .artist-name,
      &.active .song__info-author {
        color: hsla(0, 0%, 100%, 0.6) !important;
      }
    `};
`;
const SongItem = ({ item, index, onClick, section = "", playingBar }) => {
  const dispatch = useDispatch();
  const { currentSongId, isPlay } = useSelector((state) => state.audio);
  const {
    encodeId,
    thumbnail,
    artists,
    title,
    rakingStatus,
    album,
    duration,
    streamingStatus,
  } = item;

  return (
    <StyledSong
      playingBar={playingBar}
      className={`song-item ${encodeId === currentSongId ? "active" : ""}`}
      onDoubleClick={onClick}
      key={encodeId}
    >
      <div className="flex rounded-md select-none p-[10px] items-center">
        <div className="flex items-center media-left w-2/4 mr-[10px] flex-grow-0 flex-shrink-0">
          {section === "zingchart" || section === "new-release" ? (
            <div className="flex ranking-status mr-[15px] items-center">
              <div
                className={`song__rank-number  ${
                  index === 0
                    ? "isTop1"
                    : index === 1
                    ? "isTop2"
                    : index === 2
                    ? "isTop3"
                    : ""
                }`}
              >
                {index + 1}
              </div>

              {rakingStatus === 0 ? (
                <div className="flex items-center justify-center w-[18px] h-[36px]">
                  <i className="text-base bi bi-dash-lg icon-dash"></i>
                </div>
              ) : (
                <div className="flex flex-col sort-ranking items-center  w-[18px] h-[36px]">
                  {rakingStatus > 0 ? (
                    <TiArrowSortedUp className="text-[#1dc186] text-xs w-[18px] h-[18px]"></TiArrowSortedUp>
                  ) : (
                    <TiArrowSortedDown className="text-[#e35050] text-xs w-[18px] h-[18px]"></TiArrowSortedDown>
                  )}
                  <span className="text-xs text-center w-[18px] h-[18px] inline-block font-bold text-inherit">
                    {rakingStatus < 0 ? Math.abs(rakingStatus) : rakingStatus}
                  </span>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
          {section === "playlist" && (
            <div className="flex justify-center song-icon-note mr-[10px] items-center text-xs">
              <IoIosMusicalNotes className="text-base text-inherit " />
            </div>
          )}
          <div className="song-thumb after:invisible  after:absolute after:content-[''] after:inset-0 after:w-full after:h-full after:bg-black after:bg-opacity-50  w-10 h-10 relative cursor-pointer rounded-[4px] flex-shrink-0 mr-[10px] overflow-hidden">
            <img
              className="object-cover w-full rounded-[4px] "
              src={thumbnail}
              alt=""
            />
            <div className="absolute  media-action  top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-[22px] text-white cursor-pointer z-10 ">
              {isPlay && currentSongId === encodeId ? (
                <div
                  onClick={() => dispatch(changeIconPlaying(false))}
                  className="w-[18px] h-[18px] absolute top-2/4 -translate-x-2/4 -translate-y-2/4 z-50"
                >
                  <img src={iconPlaying} alt="" />
                </div>
              ) : (
                <></>
              )}
              {currentSongId !== encodeId ? (
                <i
                  onClick={onClick}
                  className="invisible p-1 bi play-btn bi-play-fill text-inherit"
                ></i>
              ) : (
                <></>
              )}
              {isPlay === false && currentSongId === encodeId ? (
                <i
                  onClick={() => dispatch(changeIconPlaying(true))}
                  className="p-1 bi bi-play-fill text-inherit"
                ></i>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="song__info">
            {section !== "search" ? (
              <div className="song__info-name">
                <span className="text-sm font-medium text-inherit whitespace-nowrap">
                  {title}
                </span>
                {streamingStatus === 2 ? (
                  <span
                    style={{
                      backgroundImage: `url(${viplabel})`,
                    }}
                    className="bg-cover inline-block ml-2 w-[26px] h-[12px] vip-label"
                  ></span>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <Link
                to={item.link}
                state={{ id: item.encodeId }}
                className="song__search-name"
              >
                {title}
              </Link>
            )}
            <div className="text-xs song__info-author">
              {artists?.length > 0 &&
                artists
                  .map((artist) => {
                    const { name, id, link, alias } = artist;
                    return (
                      <Link
                        className="hover:underline text-inherit artist-name"
                        to={link}
                        state={{ artistName: alias }}
                        key={id}
                      >
                        {name}
                      </Link>
                    );
                  })
                  .reduce((prev, curr) => [prev, ", ", curr])}
            </div>
          </div>
        </div>
        {section !== "search" && album ? (
          <Link
            to={album.link}
            state={{ id: album.encodeId }}
            className="media-content"
          >
            {album.title}
          </Link>
        ) : (
          <div className="media-content"></div>
        )}

        {section !== "search" && (
          <div className="transition-all duration-500 media-right">
            <div className="hover-item">
              <Tippy content="Phát cùng lời bài hát">
                <Icon>
                  <GiMicrophone></GiMicrophone>
                </Icon>
              </Tippy>
              <Tippy content="Thêm vào thư viện">
                <Icon>
                  <i className="bi icon-heart bi-heart"></i>
                </Icon>
              </Tippy>
              <Tippy content="Khác">
                <Icon>
                  <i className="bi bi-three-dots"></i>
                </Icon>
              </Tippy>
            </div>
            <div className="actions-item">
              <div className="flex items-center justify-center w-[46px] media-duration">
                {ConvertDuration(duration)}
              </div>
            </div>
          </div>
        )}
      </div>
    </StyledSong>
  );
};

export default SongItem;
