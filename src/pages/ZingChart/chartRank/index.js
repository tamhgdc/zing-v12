import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SongItem from "~/components/songItem";
import {
  changeIconPlaying,
  setInfoSongPlayer,
  setPlaylistId,
  setPlaylistSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";

const ChartRanking = ({ data = [], onClick }) => {
  const dispatch = useDispatch();
  const [songList, setSongList] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (data && data.RTChart) {
      const { items } = data.RTChart;
      if (showAll) {
        setSongList(items);
      } else {
        setSongList(items.slice(0, 10));
      }
    }
  }, [data, showAll]);

  return (
    <div className="chart__ranking-container mt-7">
      {songList?.length > 0 &&
        songList.map((item, index) => (
          <SongItem
            key={item.encodeId}
            index={index}
            item={item}
            section="zingchart"
            onClick={() => onClick(item, songList, data.RTChart.sectionId)}
          />
        ))}

      {!showAll && (
        <div className="w-full text-center">
          <button onClick={() => setShowAll(true)} className="view-all">
            Xem top 100
          </button>
        </div>
      )}
    </div>
  );
};

export default ChartRanking;
