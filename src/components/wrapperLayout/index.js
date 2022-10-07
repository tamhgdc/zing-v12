import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setBgHeader } from "~/redux-toolkit/global/globalSlice";

const StyledWrapper = styled.div`
  position: relative;
  top: 0;
  right: 0;
  width: calc(100% - 240px);
  overflow: hidden overlay;
  margin-left: auto;
  width: 100%;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 90px;
  padding-bottom: 140px;
  &::-webkit-scrollbar {
    width: 4px;
    display: none;
  }
  &:hover::-webkit-scrollbar {
    width: 4px;
    display: inline-block;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background: ${(props) => props.theme.tabActiveBg};
  }
`;

const WrapperLayout = ({ children }) => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollValue = e.target.scrollTop;
      scrollValue > 10
        ? dispatch(setBgHeader(true))
        : dispatch(setBgHeader(false));
    };
    const containerElm = containerRef.current;
    containerElm.addEventListener("scroll", handleScroll);
    return () => containerElm.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledWrapper className="wrapper-layout" ref={containerRef}>
      {children}
    </StyledWrapper>
  );
};

export default WrapperLayout;
