import React from "react";
import styled from "styled-components";
import { BiTrendingUp } from "react-icons/bi";
const StyledSuggest = styled.div`
  display: flex;
  align-items: baseline;
  border-radius: 4px;
  padding: 8px 10px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.alphaBg};
  }

  .suggest-text {
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
  }
  .icon-trend {
    color: ${(props) => props.theme.textPrimary};
    font-size: 16px;
    margin-right: 10px;
    position: relative;
    top: 3px;
  }
`;
const SuggestItem = () => {
  return (
    <StyledSuggest>
      <BiTrendingUp className="icon-trend"></BiTrendingUp>
      <span className="suggest-text">Duyên duyên số số</span>
    </StyledSuggest>
  );
};

export default SuggestItem;
