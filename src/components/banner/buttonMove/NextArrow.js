import React from "react";
import { BiChevronRight } from "react-icons/bi";
import styled from "styled-components";
const StyledNextBtn = styled.div`
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${(props) => props.theme.alphaBg};
  border-radius: 100rem;
  cursor: pointer;
  z-index: 50;
  opacity: 0;
  visibility: hidden;
`;

const NextArrow = ({ onClick }) => {
  return (
    <StyledNextBtn className="next-btn slick-slide__btn" onClick={onClick}>
      <BiChevronRight />
    </StyledNextBtn>
  );
};

export default NextArrow;
