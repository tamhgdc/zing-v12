import React from "react";
import styled from "styled-components";
import { css } from "styled-components";
import LoadingSpinner from "../loading/LoadingSpinner";
const StyledButton = styled.button`
  &:hover {
    filter: brightness(0.9);
  }
  background-color: ${(props) => props.theme.purplePrimary};
  color: #fff;
  padding: 4px 26px;
  cursor: pointer;
  font-size: 8px;
  text-transform: uppercase;
  font-weight: 400;

  ${(props) =>
    props.preview &&
    css`
      background-color: transparent;
      border: 1px solid #fff;
    `};
  ${(props) =>
    props.border &&
    css`
      border-color: ${(props) => props.theme.purplePrimary};
    `};
  ${(props) =>
    props.large &&
    css`
      padding: 9px 24px;
      font-size: 14px;
    `};
`;
const Button = ({
  type,
  className,
  preview = false,
  onClick = null,
  leftIcon = false,
  rightIcon = false,
  children,
  small = false,
  large = false,
  border = false,
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner /> : children;
  return (
    <StyledButton
      type={type}
      large={large}
      preview={preview}
      onClick={onClick}
      {...props}
      className={`flex items-center whitespace-nowrap rounded-full justify-center    uppercase  ${className}`}
    >
      {leftIcon && <div className="text-[16px] mr-[5px]">{leftIcon}</div>}
      <span> {child}</span>
      {rightIcon && <>{rightIcon}</>}
    </StyledButton>
  );
};

export default Button;
