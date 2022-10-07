import React, { useEffect, useState } from "react";
const SlideShow = ({ data = [], onClick }) => {
  // eslint-disable-next-line no-unused-vars
  const [slideData, setSlideData] = useState(data);
  // console.log("slideshow:", slideData);
  const [slideFirst, setSlideFirst] = useState(0);
  const [slideSecond, setSlideSecond] = useState(1);
  const [slideThird, setSlideThird] = useState(2);
  useEffect(() => {
    if (slideFirst === slideData.length - 2) {
      setSlideThird(0);
    } else if (slideFirst === slideData.length - 1) {
      setSlideThird(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideFirst, slideSecond, slideThird]);
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideFirst(slideSecond);
      setSlideSecond(slideThird);
      setSlideThird(slideThird + 1);
    }, 2500);
    return () => clearInterval(timer);
  }, [slideFirst, slideSecond, slideThird]);
  return (
    <>
      {slideData.length > 0 &&
        slideData?.map((slide, index) => {
          return (
            <div
              onClick={onClick}
              key={slide.encodeId}
              className={`song-animated-item ${
                index === slideFirst
                  ? "first"
                  : index === slideSecond
                  ? "second"
                  : index === slideThird
                  ? "third"
                  : "third"
              }`}
            >
              <img
                className="w-full object-cover rounded-[4px]"
                src={slide.thumbnailM}
                alt=""
              />
            </div>
          );
        })}
    </>
  );
};

export default SlideShow;
