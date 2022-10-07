import React, { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import ReactDOM from "react-dom";
import styled from "styled-components";
import DOMPurify from "dompurify";
const StyledModalBiography = styled.div`
  width: 100%;
  height: 100%;
  inset: 0;
  position: fixed;
  z-index: 999999;
  .blur-bg {
    background-size: cover;
  }
  .modal-biography__content {
    background-color: ${(props) => props.theme.primaryBg};
  }
  & .close-modal {
    color: ${(props) => props.theme.textPrimary};
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 2;
  }
  .cover-bg {
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    background-position-y: 10%;
    -webkit-filter: blur(50px);
    filter: blur(50px);
  }
  .top-content {
    background-image: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0),
      ${(props) => props.theme.primaryBg}
    );
  }
  .bio-content {
    color: ${(props) => props.theme.textSecondary};
    font-size: 14px;
    line-height: 1.43;
    .bio-desc {
      overflow: hidden overlay;
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 12px;
        background-color: ${(props) => props.theme.layoutBg};
      }
    }
  }
`;
const ModalBiography = ({
  data = {},
  open = false,
  handleClose = () => {},
}) => {
  const { biography, name, thumbnail, thumbnailM } = data;
  const safeDescription = DOMPurify.sanitize(biography);
  if (typeof document === "undefined")
    return <div className="modal-biography"></div>;
  return ReactDOM.createPortal(
    <StyledModalBiography
      className={`modal-biography flex ${open ? "" : "hidden"}`}
    >
      <div
        onClick={handleClose}
        className="absolute inset-0 z-20 bg-black opacity-60 "
      ></div>
      <div className="w-[480px] rounded-[8px] overflow-hidden relative z-50 max-h-full inset-0 m-auto modal-biography__content  pb-5">
        <Tippy content="Đóng" placement="top">
          <button
            onClick={handleClose}
            className="absolute text-2xl close-modal top-4 right-4"
          >
            <i className="text-inherit bi bi-x-lg"></i>
          </button>
        </Tippy>
        <div className="relative overflow-hidden ">
          <div className="relative flex flex-col items-center pt-6 top-content ">
            <div
              style={{
                backgroundImage: `url(${thumbnailM})`,
              }}
              className="absolute inset-0 cover-bg"
            ></div>
            <div className="absolute inset-0 blur-bg opacity-40"></div>
            <div className="w-[110px] relative z-50   h-[110px] rounded-full overflow-hidden mb-3 ">
              <img
                className="object-cover w-full rounded-full"
                src={thumbnail}
                alt=""
              />
            </div>
            <h3 className="relative z-50 text-2xl font-bold capitalize">
              {name}
            </h3>
          </div>

          <div className="relative z-40 p-6 bio-content">
            <div
              dangerouslySetInnerHTML={{ __html: safeDescription }}
              className="leading-[1.43] bio-desc pr-2 max-h-[218px]"
            />
          </div>
        </div>
      </div>
    </StyledModalBiography>,
    document.querySelector("body")
  );
};

export default ModalBiography;
