import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SongItem from "~/components/songItem";
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
import ConvertNumber from "~/utils/ConvertNumber";
const StyledSearchSuggest = styled.div`
  &:hover {
    background-color: ${(props) => props.theme.alphaBg};
  }
  &:hover .media-action {
    visibility: visible;
  }
  &:hover .song-thumb::after {
    visibility: visible;
  }
  .song__sugges-info {
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    align-self: center;
    .song__sugges-author {
      color: ${(props) => props.theme.textSecondary};
      font-size: 12px;
    }
    .song__sugges-name {
      letter-spacing: -0.5px;
      &:hover {
        color: ${(props) => props.theme.linkTextHover};
      }
    }
  }
`;
const SearchSuggest = ({ data = [] }) => {
  const dispatch = useDispatch();
  const handlePlaySong = (song) => {
    dispatch(setAudioSrc(""));
    dispatch(setPlaylistId(""));
    dispatch(setPlaylistSong([song]));
    dispatch(setPlaylistRandom([song]));
    dispatch(setSongId(song.encodeId));
    dispatch(setInfoSongPlayer(song));
    dispatch(changeIconPlaying(true));
    dispatch(setRepeatSong(true));
  };
  return (
    data.length > 0 &&
    data.map((item, index) => {
      return (
        <SongItem
          onClick={() => {
            handlePlaySong(item);
          }}
          section="search"
          key={index}
          item={item}
        />
      );
    })
  );
};

export default SearchSuggest;
