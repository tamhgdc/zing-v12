import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WrapperLayout from "~/components/wrapperLayout";
import { setLoading } from "~/redux-toolkit/global/globalSlice";
import request from "~/services/request";
import Playlist from "~/components/playlist/Playlist";
import styled from "styled-components";
import BannerTop100 from "./banner/BannerTop100";
import Loading from "~/components/loading/Loading";
const StyledTop100 = styled.div``;
const Top100 = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.global);
  const [dataTop100, setDataTop100] = useState([]);
  useEffect(() => {
    dispatch(setLoading(true));
    request
      .get(`/top100`)
      .then((res) => {
        if (res.data && res.data.data) {
          const { data } = res.data;
          setDataTop100(data);
          console.log(data);
          document.title = `Top 100 | Tuyển tập nhạc hay chọn lọc`;
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      });
  }, []);
  return (
    <WrapperLayout>
      {loading ? (
        <Loading />
      ) : (
        <StyledTop100>
          <div className="flex items-center justify-center mt-5 banner-top-100">
            <BannerTop100 />
          </div>
          {dataTop100.length > 0 &&
            dataTop100.map((listPlaylist, index) => (
              <Playlist data={listPlaylist} key={index} />
            ))}
        </StyledTop100>
      )}
    </WrapperLayout>
  );
};

export default Top100;
