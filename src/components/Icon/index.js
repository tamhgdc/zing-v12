import React, { forwardRef } from "react";
import styled from "styled-components";
import { css } from "styled-components";
const StyledIcon = styled.div`
  border-radius: 100rem;
  font-size: 14px;
  cursor: pointer;
  margin: 0 2px;
  padding: 8px;
  color: ${(props) => props.theme.textPrimary};
  &:hover {
    background-color: ${(props) => props.theme.alphaBg};
  }
  ${(props) =>
    props.control &&
    css`
      padding: 3px;
      margin: 0 7px;
      line-height: 0;
      font-size: 24px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      color: ${(props) => props.theme.textPrimary};
    `};
`;
const Icon = ({ children, onClick, className, control }, ref) => {
  return (
    <StyledIcon
      className={className}
      control={control}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </StyledIcon>
  );
};

export default forwardRef(Icon);
