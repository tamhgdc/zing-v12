import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ConvertDuration from "~/utils/ConvertTime";
import ConvertTotalDuration from "~/utils/ConvertTotalDuration";
const StyledProgress = styled.div`
  height: 18px;
  width: 100%;
  display: flex;
  margin-bottom: 5px;
  position: relative;
  align-items: center;
  justify-content: space-between;

  .progress__track {
    left: 50%;
    height: 3px;
    border-radius: 20px;
    position: absolute;
    transform: translate(-50%, 0);
    background: ${(props) => props.theme.alphaBg};

    &.song--track {
      width: calc(100% - 130px);
    }

    &-update {
      top: 0;
      left: 0;
      width: 0;
      height: 3px;
      border-radius: 20px;
      position: absolute;
      background-color: ${(props) => props.theme.linkTextHover};

      &::after {
        content: "";
        top: 49.9%;
        right: 0;
        width: 12px;
        height: 12px;
        display: none;
        border-radius: 50%;
        position: absolute;
        transform: translate(50%, -50%);
        background-color: ${(props) => props.theme.linkTextHover};
      }
    }
  }

  .durationtime,
  .tracktime {
    width: 55px;
    margin: 0 5px;
    display: block;
    font-size: 12px;
    text-align: center;
    color: ${(props) => props.theme.navigationText};
  }
  .tracktime {
    color: ${(props) => props.theme.textSecondary};
  }
  .progress {
    flex: 1;
    opacity: 1;
    z-index: 5;
    height: 18px;
    outline: none;
    cursor: pointer;
    border-radius: 2px;
    will-change: opacity;
    -webkit-appearance: none;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;

    &:hover ~ .progress__track {
      height: 5px;
      border-radius: 100px;
    }

    &:hover ~ .progress__track .progress__track-update {
      height: 5px;
      border-radius: 100px;
    }

    &:hover ~ .progress__track .progress__track-update::after {
      display: block;
    }

    &::-webkit-slider-thumb {
      appearance: none;
      width: 1px;
      height: 18px;
      cursor: pointer;
      border-radius: 999px;
      -webkit-appearance: none;
      background-color: transparent;
    }
  }
`;
const Progress = ({ currentTime, songDuration, onChangeTime }) => {
  const [isSeeking, setIsSeeking] = useState(false);
  const prevSeeking = useRef(false);
  const { infoSongPlayer } = useSelector((state) => state.audio);
  const [progressValue, setProgressValue] = useState(0);

  const handleChangeProgress = (e) => {
    if (songDuration) setProgressValue(e.target.value);
  };
  const handleChangeTime = (e) => {
    setIsSeeking(false);
    const currentTime = (e.target.value * songDuration) / 100;
    if (onChangeTime && songDuration) onChangeTime(currentTime);
  };
  const progressWidth = useMemo(() => {
    const width =
      isSeeking || prevSeeking.current
        ? progressValue
        : Math.round((currentTime / songDuration) * 100) || 0;
    return width;
  }, [isSeeking, currentTime, songDuration, progressValue]);

  const formatTime = useMemo(() => {
    const songTime =
      isSeeking || prevSeeking.current
        ? (progressValue * songDuration) / 100 || 0
        : currentTime;
    return songTime;
  }, [isSeeking, currentTime, songDuration, progressValue]);

  useEffect(() => {
    prevSeeking.current = isSeeking;
  }, [isSeeking]);
  return (
    <Fragment>
      <StyledProgress className="progress-block ">
        <span className="tracktime">{ConvertDuration(formatTime)}</span>
        <input
          value={progressValue}
          className="progress"
          type="range"
          step="1"
          min="0"
          max="100"
          onChange={handleChangeProgress}
          onMouseDown={() => setIsSeeking(true)}
          onTouchStart={() => setIsSeeking(true)}
          onMouseUp={handleChangeTime}
          onTouchEnd={handleChangeTime}
        />
        <div className="progress__track song--track">
          <div
            className="progress__track-update"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
        <span className="durationtime">
          {ConvertDuration(infoSongPlayer.duration)}
        </span>
      </StyledProgress>
    </Fragment>
  );
};

export default Progress;
