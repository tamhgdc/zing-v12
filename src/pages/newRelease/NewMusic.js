import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WrapperLayout from "~/components/wrapperLayout";
import { setLoading } from "~/redux-toolkit/global/globalSlice";
import request from "~/services/request";
import styled from "styled-components";
import { useState } from "react";
import SongItem from "~/components/songItem";
import Loading from "~/components/loading/Loading";
import {
  changeIconPlaying,
  setAudioSrc,
  setCurrentIndexSong,
  setCurrentIndexSongRandom,
  setInfoSongPlayer,
  setPlaylistId,
  setPlaylistRandom,
  setPlaylistSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";
import Swal from "sweetalert2";
const StyledNewRelease = styled.div`
  & .new-release-btn {
    background-color: ${(props) => props.theme.purplePrimary};
  }
  & .title {
    font-size: 40px;
    font-weight: 800;
  }
`;

const NewMusic = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.global);
  const { isRandom, playlistId } = useSelector((state) => state.audio);
  const [dataNewRelease, setDataNewRelease] = useState([]);
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
  const handlePlaySong = (song, playlist, id) => {
    dispatch(setAudioSrc(""));
    dispatch(setPlaylistId(id));
    let playlistCanPlay = [];
    if (song.streamingStatus === 1) {
      for (let songItem of playlist) {
        if (songItem.streamingStatus === 1) {
          playlistCanPlay.push(songItem);
        }
      }
      if (isRandom) {
        dispatch(setPlaylistRandom(shuffle([...playlistCanPlay])));
        dispatch(setSongId(song.encodeId));
        dispatch(setInfoSongPlayer(song));
        dispatch(setPlaylistSong(playlistCanPlay));
        dispatch(
          setCurrentIndexSong(
            playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)
          )
        );
        dispatch(setCurrentIndexSongRandom(-1));
        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setCurrentIndexSongRandom(-1));
        dispatch(setInfoSongPlayer(song));
        dispatch(setSongId(song.encodeId));
        dispatch(setPlaylistSong(playlistCanPlay));
        dispatch(
          setCurrentIndexSong(
            playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)
          )
        );
        dispatch(changeIconPlaying(true));
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Bài hát chưa được hỗ trợ!",
      });
    }
  };
  useEffect(() => {
    dispatch(setLoading(true));
    request
      .get(`/chart/new-release`)
      .then((res) => {
        if (res.data && res.data.data) {
          const { data } = res.data;
          setDataNewRelease(data);
          console.log(res.data.data);
          document.title = `#zingchart tuần, #zingchart Zing - Bài Hát`;
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      });
  }, []);
  const { items } = dataNewRelease;
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <WrapperLayout>
          <StyledNewRelease className="pt-5 mt-10">
            <div className="flex items-center mb-10 chart-title gap-x-3">
              <h3 className="mb-0 title ">Nhạc Mới</h3>
              {playlistId !== dataNewRelease?.sectionId ? (
                <button
                  onClick={() =>
                    handlePlaySong(items[0], items, dataNewRelease?.sectionId)
                  }
                  className="flex items-center justify-center w-10 h-10 rounded-full new-release-btn"
                >
                  <i className="text-xl text-white bi bi-play-fill"></i>
                </button>
              ) : (
                <button className="flex items-center justify-center w-10 h-10 rounded-full new-release-btn">
                  <i className="text-xl text-white bi bi-play-fill"></i>
                </button>
              )}
            </div>
            <div className="chart-song-item">
              {items?.length > 0 &&
                items.map((item, index) => {
                  return (
                    <SongItem
                      key={item.encodeId}
                      index={index}
                      item={item}
                      section="new-release"
                      onClick={() =>
                        handlePlaySong(item, items, dataNewRelease?.sectionId)
                      }
                    />
                  );
                })}
            </div>
          </StyledNewRelease>
        </WrapperLayout>
      )}
    </Fragment>
  );
};

export default NewMusic;
