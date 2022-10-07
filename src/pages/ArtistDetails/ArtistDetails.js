import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import ArtistBanner from "~/components/artistBanner";
import ArtistBiography from "~/components/artistBiography";
import Loading from "~/components/loading/Loading";
import MvArtist from "~/components/mv";
import Playlist from "~/components/playlist/Playlist";
import WrapperLayout from "~/components/wrapperLayout";
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
import { setLoading } from "~/redux-toolkit/global/globalSlice";
import request from "~/services/request";
import SongSection from "./song";

const StyledArtistDetails = styled.div`
  padding-top: 110px;
  .artist__container-info {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding-left: 14px;
    padding-right: 14px;
    column-gap: 28px;
  }
  .title {
    color: ${(props) => props.theme.textPrimary};
  }
  .biography {
    color: ${(props) => props.theme.textPrimary};
  }
  .play-btn {
    font-size: 14px;
    padding: 9px 24px;
    &:hover {
      filter: brightness(0.9);
    }
  }
`;
const ArtistDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.global);
  const { isRandom } = useSelector((state) => state.audio);
  const [singerData, setSingerData] = useState([]);
  const { artistName } = location.state;
  const getCurrentIdexSong = (currentPlaylist, song) => {
    return currentPlaylist.indexOf(song);
  };
  //Tạo ra array mới đã random từ array playlist
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * i); // no +1 here!
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const handleGetSongPlaylist = (song, currentPlayList, idPlaylist) => {
    const playlistCanPlay = [];
    if (song.streamingStatus === 1 && song.isWorldWide) {
      dispatch(setAudioSrc(""));
      dispatch(setCurrentTime(0));
      dispatch(setPlaylistId(idPlaylist));
      for (let songItem of currentPlayList) {
        if (songItem.streamingStatus === 1 && songItem.isWorldWide) {
          playlistCanPlay.push(songItem);
        }
      }
      if (isRandom) {
        dispatch(setSongId(song.encodeId));
        dispatch(setPlaylistRandom(shuffleArray([...playlistCanPlay])));
        dispatch(setInfoSongPlayer(song));
        dispatch(setPlaylistSong(playlistCanPlay));
        dispatch(
          setCurrentIndexSong(getCurrentIdexSong(playlistCanPlay, song))
        );
        // dispatch(setCurrentIndexSongRandom(-1));
        dispatch(changeIconPlaying(true));
      } else {
        dispatch(setSongId(song.encodeId));
        dispatch(setPlaylistRandom(shuffleArray([...playlistCanPlay])));
        dispatch(setInfoSongPlayer(song));
        dispatch(setPlaylistSong(playlistCanPlay));
        // dispatch(setCurrentIndexSongRandom(-1));
        dispatch(
          setCurrentIndexSong(getCurrentIdexSong(playlistCanPlay, song))
        );
        dispatch(changeIconPlaying(true));
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Playlist chưa được hỗ trợ!",
      });
    }
  };
  //play random moi khi vao useEffect
  const handlePlayRandomSong = (playlist, idPlaylist) => {
    let songCanPlay = [];
    let randomIndex;
    for (let songItem of playlist) {
      if (songItem.streamingStatus === 1 && songItem.isWorldWide) {
        songCanPlay.push(songItem);
      }
    }
    if (songCanPlay.length === 0) {
      Swal.fire({
        icon: "error",
        text: "Playlist chưa được hỗ trợ",
      });
    } else {
      dispatch(setPlaylistId(idPlaylist));
      dispatch(setAudioSrc(""));
      dispatch(setCurrentTime(0));
      randomIndex = Math.floor(Math.random() * songCanPlay.length - 1) + 1;
      dispatch(setSongId(songCanPlay[randomIndex].encodeId));
      dispatch(setInfoSongPlayer(songCanPlay[randomIndex]));
      dispatch(setPlaylistSong(songCanPlay));
      dispatch(setCurrentIndexSong(randomIndex));
      dispatch(setRandomSong(true));
      dispatch(changeIconPlaying(true));
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    request
      .get(`/artist/${artistName}`)
      .then((res) => {
        if (res.data && res.data.data) {
          console.log("data artist:", res.data.data);
          setSingerData(res.data.data);
          const { sections } = res.data.data;

          handlePlayRandomSong(sections[0], res.data.data.playlistId);
          document.title = `${res.data.data.name} - Zing MP3 Official Account`;
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistName]);
  const { sections } = singerData;

  return (
    <Fragment>
      <WrapperLayout>
        {loading && <Loading />}
        {!loading && (
          <StyledArtistDetails className="artist-detail-layout">
            <ArtistBiography
              onClick={handleGetSongPlaylist}
              data={{ ...singerData }}
            ></ArtistBiography>
            {sections?.map((item, index) => {
              const { sectionType, title } = item;
              if (sectionType === "song") {
                return (
                  <SongSection
                    onClick={handleGetSongPlaylist}
                    id={singerData.playlistId}
                    key={`${title}${index}`}
                    data={{ ...item }}
                  ></SongSection>
                );
              } else if (sectionType === "playlist") {
                return (
                  <Playlist
                    page="home"
                    key={`${title}${index}`}
                    data={{ ...item }}
                  />
                );
              } else if (sectionType === "artist") {
                return (
                  <ArtistBanner key={`${title}${index}`} data={{ ...item }} />
                );
              } else if (sectionType === "video") {
                return <MvArtist key={`${title}${index}`} data={{ ...item }} />;
              }
            })}
          </StyledArtistDetails>
        )}
      </WrapperLayout>
    </Fragment>
  );
};

export default ArtistDetails;
