import React from "react";
import { BiChevronLeft } from "react-icons/bi";
import styled from "styled-components";
const StyledPrevBtn = styled.div`
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
const PrevArrow = ({ onClick }) => {
  return (
    <StyledPrevBtn className="prev-btn slick-slide__btn" onClick={onClick}>
      <BiChevronLeft />
    </StyledPrevBtn>
  );
};

export default PrevArrow;
