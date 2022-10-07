import React, { Fragment, useEffect, useState } from "react";
import ArtistBanner from "~/components/artistBanner";
import Banner from "~/components/banner";
import Chart from "~/components/chart";
import Event from "~/components/event";
import NewRelease from "~/components/newRelease";
import Playlist from "~/components/playlist/Playlist";
import RadioList from "~/components/radio";
import WeekChart from "~/components/weekChart";
import Mix from "~/components/mix";
import Partner from "~/components/partner";
import WrapperLayout from "~/components/wrapperLayout";
import request from "~/services/request";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "~/redux-toolkit/global/globalSlice";
import Loading from "~/components/loading/Loading";
const Home = () => {
  const { loading } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [dataHome, setDataHome] = useState([]);
  useEffect(() => {
    dispatch(setLoading(true));
    request
      .get(`/home`)
      .then((res) => {
        if (res.data && res.data.data) {
          const { items } = res.data.data;
          setDataHome(items);
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      });
    document.title =
      "Zing Mp3 | Nghe tải nhạc chất lượng cao trên desktop, mobile ";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WrapperLayout>
      {loading && <Loading />}
      {dataHome.length > 0 &&
        dataHome.map((item, index) => {
          const { sectionType, sectionId } = item;
          if (sectionType === "banner") {
            return <Banner key={`${index}${sectionId}`} data={{ ...item }} />;
          } else if (sectionType === "playlist") {
            return (
              <Playlist
                page="home"
                key={`${index}${sectionId}`}
                data={{ ...item }}
              />
            );
          } else if (sectionType === "livestream") {
            return (
              <RadioList key={`${index}${sectionId}`} data={{ ...item }} />
            );
          } else if (sectionType === "RTChart") {
            return <Chart key={`${index}${sectionId}`} data={{ ...item }} />;
          } else if (sectionType === "weekChart") {
            return (
              <WeekChart key={`${index}${sectionId}`} data={{ ...item }} />
            );
          } else if (sectionType === "artistSpotlight") {
            return (
              <ArtistBanner key={`${index}${sectionId}`} data={{ ...item }} />
            );
          } else if (sectionType === "event") {
            return (
              <Fragment key={`${index}${sectionId}`}>
                <Event data={{ ...item }} />
                <Partner />
              </Fragment>
            );
          } else if (sectionType === "newReleaseChart") {
            return (
              <NewRelease key={`${index}${sectionId}`} data={{ ...item }} />
            );
          } else if (sectionType === "mix") {
            return (
              <Fragment key={`${index}${sectionId}`}>
                <Mix data={{ ...item }} />
              </Fragment>
            );
          }
        })}
    </WrapperLayout>
  );
};

export default Home;
