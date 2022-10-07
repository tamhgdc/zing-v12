import React from "react";
import styled from "styled-components";
const StyledWeekChart = styled.div`
  .banner-weekchart {
    &:hover img {
      transform: scale(1.1);
    }
  }
`;
const WeekChart = ({ data = {} }) => {
  const { items } = data;
  return (
    <StyledWeekChart className="grid grid-cols-3 mt-10 weekchart-banner gap-x-7">
      {items.map((item) => (
        <div
          key={`${item.banner}`}
          className="w-full cursor-pointer weekchart-banner-item overflow-hidden banner-weekchart relative mb-[30px] rounded-md"
        >
          <img
            className="object-cover w-full transition-all duration-700 rounded-md"
            src={item.banner}
            alt=""
          />
        </div>
      ))}
    </StyledWeekChart>
  );
};

export default WeekChart;
