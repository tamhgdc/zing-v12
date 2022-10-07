import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Button from "~/components/button";
const StyledWeekChart = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  .chart-box {
    background-color: ${(props) => props.theme.alphaBg};
  }
  .box-header {
    color: ${(props) => props.theme.textPrimary};
  }
  .weekchart-btn {
    background-color: ${(props) => props.theme.purplePrimary};
  }
  .view-all-song {
    border-radius: 999px;
    border: 1px solid ${(props) => props.theme.purplePrimary};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.43;
    text-align: center;
    color: ${(props) => props.theme.purplePrimary};
    padding: 8px 25px;
  }
`;
const WeekChart = ({ data = [] }) => {
  const [songWeekChart, setSongWeekChart] = useState([]);
  useEffect(() => {
    if (data && data.RTChart) {
      const { korea, us, vn } = data.weekChart;
    }
  }, [data]);
  return (
    <StyledWeekChart>
      <h3 className="title">Bảng Xếp Hạng Tuần</h3>
      <div className="grid grid-cols-3 mt-10 gap-x-7">
        <div className="px-3 py-5 chart-box rounded-xl">
          <div className="flex pb-3 pl-10 font-semibold box-header gap-x-3">
            <span className="text-2xl font-semibold text-inherit">
              Việt Nam
            </span>
            <button className="flex items-center justify-center rounded-full weekchart-btn w-7 h-7">
              <i className="p-1 text-white bi bi-play-fill play-btn"></i>
            </button>
          </div>
          <div className="flex flex-col mb-4 chart-list-song"></div>
          <div className="flex items-center justify-center">
            <button className="view-all-song">Xem Tất Cả</button>
          </div>
        </div>
      </div>
    </StyledWeekChart>
  );
};

export default WeekChart;
