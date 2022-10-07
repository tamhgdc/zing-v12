import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: auto;
  background-color: ${(props) => props.theme.primaryBg};
  z-index: 5;
  display: block;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 4px 6px 0 rgb(32 33 36 / 28%);
  padding: 13px 10px;
  color: ${(props) => props.theme.textPrimary};
  .search-title {
    font-size: 14px;
    font-weight: 700;
    padding: 0 10px 8px;
    display: flex;
    justify-content: space-between;
    color: ${(props) => props.theme.textColor};
  }
`;
const Wrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;
