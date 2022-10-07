import React, { useEffect, useRef, useState } from "react";
import { GiMicrophone } from "react-icons/gi";
import Icon from "~/components/Icon";
import SlideShow from "./SlideShow";
import styled from "styled-components";
import ConvertDuration from "~/utils/ConvertTime";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import SongItem from "~/components/songItem";
import {
  changeIconPlaying,
  setAudioSrc,
  setCurrentIndexSong,
  setCurrentTime,
  setInfoSongPlayer,
  setPlaylistId,
  setPlaylistRandom,
  setPlaylistSong,
  setRandomSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const StyledSectionSong = styled.div`
  .play-list {
    & .song-item {
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

      .icon-dash {
        color: ${(props) => props.theme.textPrimary};
      }
      .song__info {
        flex-wrap: nowrap;
        display: -webkit-box;
        word-break: break-word;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .song__info-name {
        line-height: 14px;
        color: ${(props) => props.theme.textPrimary};
        margin-top: 3px;
        flex-wrap: nowrap;
        display: -webkit-box;
        word-break: break-word;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        line-height: 16px;
      }
      .song__info-author {
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
        .artists {
          cursor: pointer;
          & .artist-name:hover {
            color: ${(props) => props.theme.linkTextHover};
            text-decoration: underline;
          }
        }
      }
      .media-content {
        flex-basis: auto;
        flex-grow: 1;
        flex-shrink: 1;
        align-self: center;
        width: 0;
        color: ${(props) => props.theme.textSecondary};
        &:hover {
          color: ${(props) => props.theme.linkTextHover};
          text-decoration: underline;
        }
      }
      .media-right {
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
    }
  }
`;
const SongSection = ({ data = {}, onClick = () => {}, id }) => {
  const { items, title } = data;

  return (
    <StyledSectionSong className="container-layout">
      <h3>{title}</h3>
      <div className="flex mb-[25px]">
        <div className="relative artist-detail-slideshow  pt-[10px] w-[270px] h-[230px] flex items-center">
          <SlideShow data={items} />
        </div>
        <div className="h-[244px] has-scroll-bar play-list pl-5 w-full flex flex-col flex-1">
          {items?.length > 0 &&
            items?.map((item, index) => {
              return (
                <SongItem
                  onClick={() => onClick(item, items, id)}
                  key={item.encodeId}
                  item={item}
                />
              );
            })}
        </div>
      </div>
    </StyledSectionSong>
  );
};

export default SongSection;
