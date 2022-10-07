import React from "react";
import styled from "styled-components";
const StyledLoadingSearch = styled.div`
  .circle-loading {
    width: 40px;
    height: 40px;
    border-radius: 99rem;
    position: relative;
    margin: 0 auto;
  }
  .circle-loading:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    border: 4px solid transparent;
    border-right-color: #ff6bcb;
    border-bottom-color: #ffa400;
    animation: circleLoading 1s forwards infinite linear;
  }

  @keyframes circleLoading {
    to {
      transform: rotate(360deg);
    }
  }
`;
const LoadingSearch = () => {
  return (
    <StyledLoadingSearch className="flex rounded-md justify-center select-none p-[10px] items-center">
      <div className="circle-loading"></div>
    </StyledLoadingSearch>
  );
};

export default LoadingSearch;
