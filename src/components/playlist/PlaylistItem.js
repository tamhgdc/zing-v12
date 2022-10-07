import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setRandomSong } from "~/redux-toolkit/audio/audioSlice";
import iconPlaying from "~/assets/image/iconPlaying.gif";
import Icon from "../Icon";

const PlaylistItem = ({ item, onClick = null }) => {
  const dispatch = useDispatch();
  const { isPlay, playlistId } = useSelector((state) => state.audio);
  const { encodeId, thumbnail, title, sortDescription, link } = item;
  return (
    <Link
      onClick={() => dispatch(setRandomSong(true))}
      to={link}
      state={{ id: encodeId }}
      className="flex flex-col mb-4 playlist-item"
    >
      <div className="relative w-full overflow-hidden rounded-md cursor-pointer card__item-img overlay ">
        <div className="relative">
          <img
            className="object-cover w-full transition-all duration-700 rounded-md card-img"
            src={thumbnail}
            alt=""
          />
        </div>
        <div
          className={`absolute z-10 flex items-center  w-full card-action invisible justify-evenly top-2/4 -translate-x-2/4 -translate-y-2/4 left-2/4 ${
            isPlay && playlistId === encodeId ? "active" : ""
          }`}
        >
          <Icon>
            <i className="text-white bi bi-heart-fill icon-heart"></i>
          </Icon>
          {isPlay && playlistId === encodeId ? (
            <div className="z-50 flex items-center justify-center w-10 h-10 border-2 border-white border-solid rounded-full icon-playing">
              <img className="w-5 h-5" src={iconPlaying} alt="" />
            </div>
          ) : (
            <Icon>
              <i className="p-[5px] border border-white text-[30px] leading-[0px] flex justify-center items-center bi bi-play-fill text-white w-[45px] h-[45px] rounded-full"></i>
            </Icon>
          )}

          <Icon>
            <i className="text-white bi bi-three-dots playlist-action-dots"></i>
          </Icon>
        </div>
      </div>
      <div className="flex flex-col">
        <span
          // state={{ playlistId: encodeId }}
          className="mt-2 mb-1 text-sm font-bold cursor-pointer card-title text-inherit "
        >
          {title}
        </span>
        <h4 className="card-content-subtitle">{sortDescription}</h4>
        {/* <div>
                  {artists.length > 0 &&
                    artists.map((item) => {
                      return (
                        <p
                          key={item.id}
                          className="text-base inline-block artist-name font-normal leading-[1.33]"
                        >
                          {item.name}
                        </p>
                      );
                    })}
                </div> */}
      </div>
    </Link>
  );
};

export default PlaylistItem;
