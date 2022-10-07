import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styled from "styled-components";
import Button from "~/components/button";
import { LIST_THEME as ListThemeItem } from "./ListTheme";
import { themes } from "~/themes/ThemeData";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowModalTheme,
  setThemeBg,
} from "~/redux-toolkit/global/globalSlice";

const StyledModal = styled.div`
  .portal-modal {
    background-color: ${(props) => props.theme.primaryBg};
    border-radius: 8px;
    max-height: 100%;
    position: relative;
    z-index: 100;
    color: ${(props) => props.theme.textPrimary};
  }
  .modal-title {
    font-size: 24px;
    padding: 20px 30px;
    margin: 0;
    color: ${(props) => props.theme.textPrimary};
  }
  .modal-container {
    max-height: 50vh;
    min-height: 500px;
    padding: 0 30px;
    overflow: hidden overlay;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 12px;
      background-color: ${(props) => props.theme.layoutBg};
    }
    .theme-title {
      font-size: 18px;
      color: ${(props) => props.theme.textPrimary};
    }
    .theme__item-image {
      .theme__item-img {
        &::after {
          background-color: ${(props) => props.theme.darkAlpha50Bg};
        }
        &:hover .theme-action {
          visibility: visible;
        }
      }
      &:hover .theme__item-img img {
        transform: scale(1.12, 1.12);
        border-radius: 6px;
      }
    }
  }
  .close-modal {
    color: ${(props) => props.theme.textPrimary};
  }
`;
const ModalTheme = ({ open = false, handleClose = () => {} }) => {
  const { showModalTheme } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const applyTheme = (typeTheme) => {
    const currentTheme = themes[typeTheme];
    dispatch(setThemeBg(currentTheme));
    dispatch(setShowModalTheme(false));
  };
  const previewTheme = (typeTheme) => {
    const currentTheme = themes[typeTheme];
    dispatch(setThemeBg(currentTheme));
    dispatch(setShowModalTheme(true));
  };
  if (typeof document === "undefined")
    return <div className="modal-theme"></div>;
  return ReactDOM.createPortal(
    <StyledModal
      className={`modal-theme flex  w-full h-full fixed  inset-0 transition-all duration-700  z-[9999] ${
        showModalTheme ? "" : "hidden"
      }`}
    >
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black opacity-60 "
      ></div>
      <div className="w-[70vw] inset-0 m-auto portal-modal max-w-[900px] pb-5">
        <Tippy interactive content="Đóng" placement="top">
          <button
            onClick={handleClose}
            className="absolute z-50 text-2xl close-modal top-4 right-4"
          >
            <i className="text-inherit bi bi-x-lg"></i>
          </button>
        </Tippy>
        <h3 className="modal-title">Giao Diện</h3>
        <div className="modal-container">
          {ListThemeItem.map((theme, index) => (
            <div key={theme.id} className="flex flex-col">
              <h4 className="theme-title mb-[10px] font-semibold block capitalize">
                {theme.header}
              </h4>
              <div className="grid theme-container-list gap-x-[14px] grid-cols-6">
                {theme.data.map((item, index) => (
                  <div key={index} className="mb-5">
                    <div className="relative w-full overflow-hidden rounded-md theme__item-image">
                      <div className="overflow-hidden after:invisible hover:after:rounded-md hover:after:visible rounded-md cursor-pointer relative after:absolute after:inset-0 after:content-['']  after:rounded-md after:w-full after:h-full  theme__item-img">
                        <img
                          className="object-cover w-full transition-all duration-500 rounded-md "
                          src={item.image}
                          alt=""
                        />
                        <div className="absolute gap-y-[10px] z-50 flex flex-col invisible  theme-action top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                          <Button onClick={() => applyTheme(item.type)}>
                            Áp Dụng
                          </Button>
                          <Button
                            onClick={() => previewTheme(item.type)}
                            preview
                          >
                            Xem Trước
                          </Button>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium leading-[1.36] text-ellipsis py-[6px] block ">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledModal>,
    document.querySelector("body")
  );
};

export default ModalTheme;
