import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VscChromeRestore } from "react-icons/vsc";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Icon from "~/components/Icon";
import Control from "./Control";
import { useDispatch, useSelector } from "react-redux";
import request from "~/services/request";
import { setAudioSrc } from "~/redux-toolkit/audio/audioSlice";
import {
  setShowNowPlaying,
  setShowPlayingbar,
} from "~/redux-toolkit/global/globalSlice";
import { Slider, Stack } from "@mui/material";
import { AiOutlineCompress, AiOutlineExpand } from "react-icons/ai";
import NowPlaying from "../PlayerMain";
const StyledPlayer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 400;
  background-position: 50%;
  background-repeat: repeat-x;
  background-size: 1920px auto;
  background-color: ${(props) => props.theme.layoutBg};
  background-image: url(${(props) => props.theme.bgPlayer});
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 999;
  transition: 0.5s all;
  .player-container {
    position: relative;
    z-index: 9999;
    display: flex;
    padding: 0 20px;
    cursor: pointer;
    align-items: center;
    height: 90px;
    justify-content: space-between;
    background-color: ${(props) => props.theme.playerBg};
  }
  .player__name {
    font-size: 14px;
    line-height: 15px;
    color: ${(props) => props.theme.textPrimary};
    text-transform: capitalize;
    -moz-animation: marquee 6s linear infinite;
    -webkit-animation: marquee 6s linear infinite;
    animation: marquee 6s linear infinite;
  }
  @-moz-keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  @-webkit-keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  @keyframes marquee {
    0% {
      -moz-transform: translateX(100%);
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    100% {
      -moz-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }
  .player__author {
    font-size: 12px;
    margin-top: 3px;
    color: ${(props) => props.theme.textSecondary};
    word-break: break-all;
    display: flex;
    flex-wrap: nowrap;
    display: -webkit-box;
    word-break: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-weight: 400;
    display: inline-block;
  }

  .current-time {
    font-size: 12px;
    min-width: 45px;
    margin-right: 10px;
    text-align: left;
    color: ${(props) => props.theme.textPrimary};
    opacity: 0.6;
  }
  .duration-time {
    color: ${(props) => props.theme.textPrimary};
  }

  .note-list-icon {
    position: relative;
    border: 1px solid transparent;
    color: ${(props) => props.theme.textPrimary};
    background-color: hsla(0, 0%, 100%, 0.1);
    &.active {
      background-color: ${(props) => props.theme.purplePrimary};
      color: #fff;
    }
  }
  .toggle-play {
    width: 34px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 7px;
    font-size: 24px;
    border-radius: 999px;
    line-height: normal;
    border: 0;
    display: inline-block;
    font-weight: 400;
    text-transform: none;
    text-align: center;
    cursor: pointer;
    position: relative;
    color: ${(props) => props.theme.textPrimary};
    border: 1px solid ${(props) => props.theme.textPrimary};
  }
  .is-random,
  .is-repeat {
    color: ${(props) => props.theme.purplePrimary};
  }
  & .track-slider {
    margin-bottom: 0;
    & .MuiSlider-root {
      color: ${(props) => props.theme.linkTextHover};
      .MuiSlider-thumb {
        background-color: ${(props) => props.theme.linkTextHover};
        width: 10px;
        height: 10px;
        border-radius: 100rem;
        visibility: hidden;
        &:hover {
          box-shadow: none;
        }
      }
      &:hover .MuiSlider-thumb {
        visibility: visible;
      }
    }
  }
  & .MuiSlider-rail {
    color: ${(props) => props.theme.alphaBg};
  }
  & .MuiSlider-track {
    background-color: ${(props) => props.theme.linkTextHover};
  }

  .is-narrow {
    background-color: hsla(0, 0%, 100%, 0.1);
  }
  &.show-now-playing {
    & .player-container {
      background-color: transparent;

      & .player-left {
        visibility: hidden;
      }
      & .player-control {
        flex-direction: column-reverse;
      }
      & .player-restore,
      & .is-narrow,
      & .note-list-icon {
        display: none;
      }
    }
  }

  &.show-now-playing {
    .show-now-playing-mobile {
      display: none;
    }
  }
`;
const PlayerControl = () => {
  const dispatch = useDispatch();
  const [valueVolume, setValueVolume] = useState(100);
  const { showPlayingbar, showNowPlaying } = useSelector(
    (state) => state.global
  );
  const { currentSongId, infoSongPlayer } = useSelector((state) => state.audio);
  const handleChangeVolume = (e) => {
    setValueVolume(e.target.value);
  };
  useEffect(() => {
    if (currentSongId !== null && currentSongId !== "") {
      request.get(`song/${currentSongId}`).then(async (res) => {
        if (res.data && res.data.data) {
          dispatch(setAudioSrc(res.data.data[128]));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongId, dispatch]);
  return (
    <StyledPlayer
      className={`player-main ${showNowPlaying ? "show-now-playing" : ""}`}
    >
      <div className="player-container ">
        <div className="flex player-left w-[30%]">
          <div className="flex items-center ">
            <div className="w-[64px] h-[64px] player-thumb mr-[10px] rounded-[4px]">
              <img
                className="w-full object-cover rounded-[4px]"
                src={infoSongPlayer.thumbnail}
                alt=""
              />
            </div>
            <div className="flex flex-col player-info overflow-hidden justify-center max-w-[130px] flex-grow ">
              <div className="player__name whitespace-nowrap">
                {infoSongPlayer.title}
              </div>
              <span className="player__author whitespace-nowrap">
                {infoSongPlayer.artistsNames}
              </span>
            </div>
            <div className="flex items-center justify-end player-icon">
              <div className="flex ">
                <Tippy content="Thêm vào thư viện">
                  <Icon>
                    <i className="bi icon-heart bi-heart"></i>
                  </Icon>
                </Tippy>
                <Tippy content="Xem thêm">
                  <Icon>
                    <i className="bi bi-three-dots"></i>
                  </Icon>
                </Tippy>
              </div>
            </div>
          </div>
        </div>
        <Control valueVolume={valueVolume} />
        <div className="w-[30%] player-right flex justify-end">
          <div className="flex items-center justify-center">
            <Tippy content="Toàn màn hình">
              {!showNowPlaying ? (
                <Icon onClick={() => dispatch(setShowNowPlaying(true))}>
                  <AiOutlineExpand className="text-lg"></AiOutlineExpand>
                </Icon>
              ) : (
                <Icon onClick={() => dispatch(setShowNowPlaying(false))}>
                  <AiOutlineCompress className="text-lg"></AiOutlineCompress>
                </Icon>
              )}
            </Tippy>
            <Tippy content="Chế độ cửa sổ">
              <Icon className="player-restore hide-on-mobile-tablet">
                <VscChromeRestore className="text-lg"></VscChromeRestore>
              </Icon>
            </Tippy>
            <div className="flex items-center player-volume">
              <Icon>
                {valueVolume > 0 ? (
                  <i
                    onClick={() => setValueVolume(0)}
                    className="text-lg bi bi-volume-up leading-[0px]"
                  ></i>
                ) : (
                  <i
                    onClick={() => setValueVolume(100)}
                    className="bi leading-[0px] text-lg bi-volume-mute"
                  ></i>
                )}
              </Icon>
              <Stack
                className="flex-1 w-20 mb-0 track-slider "
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <Slider
                  aria-label="Volume"
                  value={valueVolume}
                  onChange={handleChangeVolume}
                />
              </Stack>
            </div>
            <div className="is-narrow hide-on-mobile-tablet mx-5 w-[1px] h-8"></div>
            <Tippy content="Danh sách phát">
              <button
                onClick={() => dispatch(setShowPlayingbar(!showPlayingbar))}
                className={`note-list-icon rounded-[4px] h-[30px] px-[5px] leading-[30px] text-xs font-medium ${
                  showPlayingbar ? "active" : ""
                }`}
              >
                <i className="text-lg bi bi-music-note-list leading-[0px]"></i>
              </button>
            </Tippy>
          </div>
        </div>
      </div>
      <NowPlaying />
    </StyledPlayer>
  );
};

export default PlayerControl;
