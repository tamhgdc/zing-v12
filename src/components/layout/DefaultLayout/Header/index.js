import React, { Fragment } from "react";
import { signOut } from "firebase/auth";
import { auth } from "~/firebase-app/firebase-config";
import styled from "styled-components";
import { IoSettingsOutline } from "react-icons/io5";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Search from "./Search";
import ModalTheme from "~/themes/modalTheme";
import { useDispatch, useSelector } from "react-redux";
import { setShowModalTheme } from "~/redux-toolkit/global/globalSlice";
import avatar from "~/assets/image/avatar.jpg";
import { useAuth } from "~/contexts/auth-context";
import { ThemeIcon } from "~/components/layout/DefaultLayout/Header/icons/Icons";
import { RiVipCrownLine, RiVipDiamondLine } from "react-icons/ri";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useClickOutSide from "~/hooks/useClickOutSide";
import Swal from "sweetalert2";
const StyledHeader = styled.div`
  z-index: 300;
  color: ${(props) => props.theme.textColor};
  &.isSticky {
    box-shadow: 0 3px 5px rgb(0 0 0 / 10%);
    background-color: ${(props) => props.theme.layoutBg};
  }

  .btn-theme {
    background-color: ${(props) => props.theme.alphaBg};
  }
  @keyframes animation {
    100% {
      transform: rotate(360deg);
    }
  }
  .btn-seting {
    animation: animation 2.5s linear infinite;
    color: ${(props) => props.theme.settingIconText};
  }
  .upload-btn {
    color: ${(props) => props.theme.settingIconText};
  }
  & .menu-list {
    top: 50px;
    right: 0;
    background-color: ${(props) => props.theme.primaryBg};
    padding: 10px 0;
    border-radius: 8px;
    position: absolute;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
    width: 240px;
    & .setting-line {
      background-color: ${(props) => props.theme.navigationText};
      opacity: 0.4;
    }
    & .header-player-setting {
      color: ${(props) => props.theme.navigationText};
      &:hover {
        background-color: ${(props) => props.theme.alphaBg};
        color: ${(props) => props.theme.linkTextHover};
      }
    }
  }
`;
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, setShow, nodeRef } = useClickOutSide();
  const { isSticky } = useSelector((state) => state.global);
  const { userInfo, setUserInfo } = useAuth();
  // console.log("user info:", userInfo);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserInfo(undefined);
        Swal.fire({
          icon: "success",
          text: "Đăng xuất thành công",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Fragment>
      <StyledHeader
        className={`header justify-between w-[calc(100%-240px)] flex items-center fixed top-0 right-0 h-[70px] px-7 ${
          isSticky ? "isSticky" : ""
        }`}
      >
        <Search></Search>
        <div className="flex gap-x-3">
          <Tippy content="Chủ đề">
            <button
              onClick={() => dispatch(setShowModalTheme(true))}
              className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer btn-theme "
            >
              <ThemeIcon />
            </button>
          </Tippy>
          <Tippy content="Tải lên ">
            <button className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer btn-upload btn-theme ">
              <input id="upload-song" className="hidden" type="file" />
              <label htmlFor="upload-song">
                <i className="cursor-pointer upload-btn bi text-inherit bi-upload"></i>
              </label>
            </button>
          </Tippy>
          <Tippy content="Cài đặt">
            <button className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer btn-setting btn-theme ">
              <IoSettingsOutline className="cursor-pointer btn-seting"></IoSettingsOutline>
            </button>
          </Tippy>
          {!userInfo ? (
            <button
              ref={nodeRef}
              onClick={() => setShow(!show)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
            >
              <img className="rounded-full" src={avatar} alt="" />
              <div
                className={`absolute  z-50 top-0 menu-list  w-[170px] ${
                  show ? "" : "hidden"
                }`}
              >
                <div
                  onClick={() => toast.error("Tính năng chưa cập nhật!")}
                  className="relative gap-x-3 flex py-3 pl-[17px] pr-5 text-sm leading-normal items-center header-player-setting"
                >
                  <RiVipDiamondLine />
                  <span className="text-inherit">Nâng cấp VIP</span>
                </div>
                <div
                  onClick={() => toast.error("Tính năng chưa cập nhật!")}
                  className="relative gap-x-3 flex py-3 pl-[17px] pr-5 text-sm leading-normal items-center header-player-setting"
                >
                  <RiVipCrownLine />
                  <span className="text-inherit">Mua code VIP</span>
                </div>
                <div
                  onClick={() => navigate("/sign-in")}
                  className="relative gap-x-3 flex py-3 pl-[17px] pr-5 text-sm leading-normal items-center header-player-setting"
                >
                  <FiLogIn className="text-xl text-inherit" />
                  <span className="text-inherit">Đăng nhập</span>
                </div>
              </div>
            </button>
          ) : (
            <button
              ref={nodeRef}
              onClick={() => setShow(!show)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
            >
              <img className="rounded-full" src={userInfo.photoURL} alt="" />
              <div
                className={`absolute  z-50 top-0 menu-list  w-[170px] ${
                  show ? "" : "hidden"
                }`}
              >
                <div
                  onClick={() => toast.error("Tính năng chưa cập nhật!")}
                  className="relative gap-x-3 flex py-3 pl-[17px] pr-5 text-sm leading-normal items-center header-player-setting"
                >
                  <RiVipDiamondLine className="text-xl text-inherit" />
                  <span className="text-inherit">Nâng cấp VIP</span>
                </div>
                <div
                  onClick={() => toast.error("Tính năng chưa cập nhật!")}
                  className="relative gap-x-3 flex py-3 pl-[17px] pr-5 text-sm leading-normal items-center header-player-setting"
                >
                  <RiVipCrownLine className="text-xl text-inherit" />
                  <span className="text-inherit">Mua code VIP</span>
                </div>
                <div className="setting-line my-2 w-full h-[1px]"></div>
                <div
                  onClick={handleSignOut}
                  className="relative gap-x-3 flex py-3 pl-[17px] pr-5 text-sm leading-normal items-center header-player-setting"
                >
                  <FiLogOut className="text-xl text-inherit" />
                  <span className="text-inherit">Đăng xuất</span>
                </div>
              </div>
            </button>
          )}
        </div>
      </StyledHeader>
      <ModalTheme
        handleClose={() => dispatch(setShowModalTheme(false))}
      ></ModalTheme>
    </Fragment>
  );
};

export default Header;
