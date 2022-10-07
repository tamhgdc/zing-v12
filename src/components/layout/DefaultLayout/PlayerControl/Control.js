import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "~/components/Icon";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  changeIconPlaying,
  setAudioSrc,
  setCurrentIndexSong,
  setCurrentIndexSongRandom,
  setInfoSongPlayer,
  setLoadingPlay,
  setRandomSong,
  setRepeatSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";
import Progress from "./Progress";
import IconLoading from "~/components/Icon/IconLoading";
import { AiOutlineExpand } from "react-icons/ai";
import { setShowNowPlaying } from "~/redux-toolkit/global/globalSlice";

const Control = ({ valueVolume = 100 }) => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const {
    isPlay,
    loadingPlay,
    isRepeat,
    isRandom,
    srcAudio,
    playlistSong,
    playlistRandom,
  } = useSelector((state) => state.audio);
  let currentIndex = useSelector((state) => state.audio.currentIndexSong);
  let currentIndexRandom = useSelector(
    (state) => state.audio.currentIndexSongRandom
  );
  const handlePlaySong = () => {
    if (isPlay) {
      dispatch(changeIconPlaying(false));
      if (audioRef) {
        audioRef.current.pause();
      }
    } else {
      dispatch(changeIconPlaying(true));
      if (audioRef) {
        audioRef.current.play();
      }
    }
  };
  //
  const handleNextSong = () => {
    dispatch(setAudioSrc(""));
    dispatch(setLoadingPlay(true));
    //Do array push vào khác với array render ra ui nên k check đúng được đk khi next
    if (
      currentIndex === playlistSong.length - 1 ||
      currentIndex >= playlistSong.length - 1 ||
      currentIndexRandom === playlistRandom.length - 1 ||
      currentIndexRandom >= playlistRandom.length - 1
    ) {
      return;
    } else {
      if (isRandom) {
        dispatch(setCurrentIndexSongRandom((currentIndexRandom += 1)));
        dispatch(setInfoSongPlayer(playlistRandom[currentIndexRandom]));
        dispatch(setSongId(playlistRandom[currentIndexRandom].encodeId));
        dispatch(
          setCurrentIndexSong(
            playlistSong.indexOf(playlistRandom[currentIndexRandom])
          )
        );

        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setCurrentIndexSong((currentIndex += 1)));
        dispatch(setInfoSongPlayer(playlistSong[currentIndex]));
        dispatch(setSongId(playlistSong[currentIndex].encodeId));
        dispatch(changeIconPlaying(true));
      }
    }
  };

  const handlePrevSong = () => {
    //Do array push vào khác với array render ra ui nên k check đúng được đk khi prev
    dispatch(setAudioSrc(""));
    dispatch(setLoadingPlay(true));
    if (isRandom) {
      if (currentIndexRandom <= 0) {
        dispatch(setCurrentIndexSongRandom(playlistRandom.length));
        dispatch(setInfoSongPlayer(playlistRandom[currentIndexRandom]));
        dispatch(setSongId(playlistRandom[currentIndexRandom].encodeId));
        dispatch(
          setCurrentIndexSong(
            playlistSong.indexOf(playlistRandom[currentIndexRandom])
          )
        );
        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setCurrentIndexSongRandom((currentIndexRandom -= 1)));
        dispatch(setInfoSongPlayer(playlistRandom[currentIndexRandom]));
        dispatch(setSongId(playlistRandom[currentIndexRandom].encodeId));
        //tìm ra index của playlist dựa vào gt hiện tại trong playlistRandom
        dispatch(
          setCurrentIndexSong(
            playlistSong.indexOf(playlistRandom[currentIndexRandom])
          )
        );
        dispatch(changeIconPlaying(true));
      }
    }
    if (isRandom === false) {
      if (currentIndex <= 0) {
        dispatch(setCurrentIndexSong(playlistSong.length));
        dispatch(setInfoSongPlayer(playlistSong[currentIndex]));
        dispatch(setSongId(playlistSong[currentIndex].encodeId));
        dispatch(
          setCurrentIndexSongRandom(
            playlistRandom.indexOf(playlistSong[currentIndex])
          )
        );
        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setCurrentIndexSong((currentIndex -= 1)));
        dispatch(setInfoSongPlayer(playlistSong[currentIndex]));
        dispatch(setSongId(playlistSong[currentIndex].encodeId));
        dispatch(
          setCurrentIndexSongRandom(
            playlistRandom.indexOf(playlistSong[currentIndex])
          )
        );

        dispatch(changeIconPlaying(true));
      }
    }
  };
  const handleOnEnded = () => {
    if (!isRepeat) {
      dispatch(setAudioSrc(""));
      dispatch(changeIconPlaying(false));
      if (isRandom) {
        if (currentIndexRandom === playlistRandom.length - 1) {
          dispatch(setCurrentIndexSongRandom(0));
          dispatch(setInfoSongPlayer(playlistRandom[0]));
          dispatch(setSongId(playlistRandom[0].encodeId));
          dispatch(
            setCurrentIndexSong(
              playlistSong.findIndex(
                (song) => song.encodeId === playlistRandom[0].encodeId
              )
            )
          );
          dispatch(changeIconPlaying(true));
        } else {
          dispatch(setCurrentIndexSongRandom((currentIndexRandom += 1)));
          dispatch(setInfoSongPlayer(playlistRandom[currentIndexRandom]));
          dispatch(setSongId(playlistRandom[currentIndexRandom].encodeId));
          dispatch(
            setCurrentIndexSong(
              playlistSong.findIndex(
                (song) =>
                  song.encodeId === playlistRandom[currentIndexRandom].encodeId
              )
            )
          );

          dispatch(changeIconPlaying(true));
        }
      } else {
        if (currentIndex === playlistSong.length - 1) {
          dispatch(setCurrentIndexSong(0));
          dispatch(setInfoSongPlayer(playlistSong[0]));
          dispatch(setSongId(playlistSong[0].encodeId));
          dispatch(changeIconPlaying(true));
        } else {
          dispatch(setCurrentIndexSong((currentIndex += 1)));
          dispatch(setInfoSongPlayer(playlistSong[currentIndex]));
          dispatch(setSongId(playlistSong[currentIndex].encodeId));
          dispatch(changeIconPlaying(true));
        }
      }
    }
  };

  const handleRandomSong = () => dispatch(setRandomSong(!isRandom));
  const handleRepeatSong = () => dispatch(setRepeatSong(!isRepeat));
  const handleOntimeUpdate = () => {
    if (audioRef.current?.duration) {
      dispatch(setLoadingPlay(false));
    }
    setCurrentTime(audioRef.current.currentTime);
  };
  const handleUpdateTime = (currentime) => {
    audioRef.current.currentTime = currentime;
    return currentime;
  };
  useEffect(() => {
    if (srcAudio !== "" || srcAudio !== undefined) {
      isPlay ? audioRef.current?.play() : audioRef.current?.pause();
    }
    audioRef.current.volume = valueVolume / 100;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srcAudio, isPlay, valueVolume]);

  return (
    <div className="player-control w-[40%] flex flex-col">
      <div className="flex items-center justify-center control-btn-list">
        <div className="inline-flex items-center ">
          <Tippy content="Phát ngẫu nhiên">
            <Icon className="random-btn" onClick={handleRandomSong} control>
              <i
                className={`p-1 bi bi-shuffle ${isRandom ? "is-random" : ""}`}
              ></i>
            </Icon>
          </Tippy>
          <Icon className="prev-btn" onClick={handlePrevSong} control>
            <i className="p-1 bi bi-skip-start-fill"></i>
          </Icon>
          <button
            onClick={handlePlaySong}
            className="relative overflow-hidden toggle-play"
          >
            {isPlay && !loadingPlay ? (
              <i className="p-1 bi bi-pause-fill"></i>
            ) : (
              !loadingPlay && <i className="p-1 bi bi-play-fill "></i>
            )}
            {loadingPlay && <IconLoading />}
          </button>
          <Icon onClick={handleNextSong} control>
            <i className="p-1 bi bi-skip-end-fill"></i>
          </Icon>
          <Tippy content="Phát lại một bài">
            <Icon className="repeat-btn" onClick={handleRepeatSong} control>
              <i
                className={`p-1 bi bi-arrow-repeat ${
                  isRepeat ? "is-repeat" : ""
                }`}
              ></i>
            </Icon>
          </Tippy>
          <Icon
            className="hidden show-now-playing-mobile"
            onClick={() => dispatch(setShowNowPlaying(true))}
          >
            <AiOutlineExpand className="text-lg "></AiOutlineExpand>
          </Icon>
        </div>
      </div>
      <div className="w-full mt-[10px] flex items-center justify-center player-progress ">
        <Progress
          songDuration={audioRef.current?.duration}
          currentTime={currentTime}
          onChangeTime={handleUpdateTime}
        />
      </div>
      <audio
        className="hidden"
        loop={isRepeat}
        autoPlay={isPlay}
        hidden
        ref={audioRef}
        src={srcAudio}
        onEnded={handleOnEnded}
        onTimeUpdate={handleOntimeUpdate}
      ></audio>
    </div>
  );
};

export default Control;
