import Tippy from "@tippyjs/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import SongItem from "~/components/songItem";
import {
  changeIconPlaying,
  setAudioSrc,
  setCurrentIndexSong,
  setCurrentIndexSongRandom,
  setInfoSongPlayer,
  setPlaylistRandom,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";
const StyledPlaying = styled.div`
  position: fixed;
  width: 330px !important;
  bottom: 0;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 301;
  background-color: ${(props) => props.theme.bgPlayingBar};
  box-shadow: ${(props) => props.theme.boxshadowPlayingBar};
  height: calc(100vh - 90px);
  max-height: calc(100vh - 90px);
  transition: 0.7s ease-in;
  transform: translateX(100%);
  &.show {
    transform: translateX(0);
  }
  & .playing-bar-tab {
    background-color: ${(props) => props.theme.alphaBg};
    & .tab-bar {
      color: ${(props) => props.theme.navigationText};
      border-radius: 15px;
      &.is-active {
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 7%);
        background-color: ${(props) => props.theme.tabActiveBg};
      }
    }
  }
  & .clock-btn {
    background-color: ${(props) => props.theme.alphaBg};

    color: ${(props) => props.theme.navigationText};
  }
`;
const PlayingBar = () => {
  const { showPlayingbar } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const {
    playlistSong,
    playlistRandom,
    currentIndexSong,
    currentIndexSongRandom,
    isRandom,
  } = useSelector((state) => state.audio);
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const handlePlaySong = (playlist, randomPlaylist, song, index) => {
    let indexSong = playlist.findIndex(
      (item) => item.encodeId === song.encodeId
    );
    let randomIndexSong = playlistRandom.findIndex(
      (item) => item.encodeId === song.encodeId
    );
    dispatch(setCurrentIndexSongRandom(randomIndexSong));
    dispatch(setCurrentIndexSong(indexSong));
    dispatch(setInfoSongPlayer(song));
    dispatch(setSongId(song.encodeId));
    dispatch(setAudioSrc(""));
    dispatch(changeIconPlaying(true));
  };
  useEffect(() => {
    if (isRandom) {
      dispatch(setPlaylistRandom(shuffle([...playlistRandom])));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRandom]);
  return (
    <StyledPlaying className={`${showPlayingbar ? "show" : ""}`}>
      <div className="relative flex flex-col px-3 playing-bar-container">
        <div className="playing-bar-header relative py-4 flex items-center gap-x-[6px] ">
          <div className="flex items-center p-[3px] rounded-full playing-bar-tab">
            <div className="px-3 whitespace-nowrap is-active xs py-[5px] text-sm font-medium cursor-pointer tab-bar">
              <span className="text-xs text-inherit">Danh Sách Phát</span>
            </div>
            <div className="px-3 whitespace-nowrap py-[5px] text-xs font-medium cursor-pointer tab-bar">
              <span className="text-xs text-inherit">Nghe Gần Đây</span>
            </div>
          </div>
          <div className="flex items-center justify-end flex-1 gap-x-2">
            <Tippy content="Hẹn giờ dừng phát nhạc">
              <button className="p-2 text-sm rounded-full cursor-pointer clock-btn">
                <i className="text-sm leading-[0px] bi bi-clock text-inherit"></i>
              </button>
            </Tippy>
            <Tippy content="Khác">
              <button className="p-2 text-sm rounded-full cursor-pointer clock-btn">
                <i className="text-sm leading-[0px] bi bi-three-dots text-inherit"></i>
              </button>
            </Tippy>
          </div>
        </div>
        <div className="flex pb-[200px] flex-col max-h-screen has-scroll-bar play-bar-list">
          {isRandom
            ? playlistRandom.map((song, index) => {
                if (song.streamingStatus !== 1) {
                  return Swal.fire("Bài hát chưa được hỗ trợ!");
                } else {
                  return (
                    index >= currentIndexSongRandom && (
                      <SongItem
                        onClick={() =>
                          handlePlaySong(
                            playlistSong,
                            playlistRandom,
                            song,
                            index
                          )
                        }
                        playingBar
                        key={song.encodeId}
                        item={song}
                        section="search"
                      />
                    )
                  );
                }
              })
            : playlistSong.map((song, index) => {
                if (song.streamingStatus !== 1) {
                  return Swal.fire("Bài hát chưa được hỗ trợ!");
                } else {
                  return (
                    index >= currentIndexSong && (
                      <SongItem
                        onClick={() =>
                          handlePlaySong(
                            playlistSong,
                            playlistRandom,
                            song,
                            index
                          )
                        }
                        playingBar
                        key={song.encodeId}
                        item={song}
                        section="search"
                      />
                    )
                  );
                }
              })}
        </div>
      </div>
    </StyledPlaying>
  );
};

export default PlayingBar;
