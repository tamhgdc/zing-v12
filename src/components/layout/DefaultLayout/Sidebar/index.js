import React from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import {
  BsVinyl,
  BsStar,
  BsMusicNoteList,
  BsFillFilePlayFill,
  BsMusicNoteBeamed,
  BsUiChecksGrid,
} from "react-icons/bs";
import { IoIosRadio } from "react-icons/io";
import { SiYoutubemusic } from "react-icons/si";
import Button from "~/components/button";
import logo from "~/assets/image/logo.svg";
import MenuItem from "./menu/MenuItem";
import { LibraryData } from "./library/LibraryData";
import logoMobile from "~/assets/image/logomain.svg";
const StyledSidebar = styled.div`
  background-color: ${(props) => props.theme.sidebarBg};
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 302;
  .sidebar-navbar-list::after {
    top: calc(100% + 15px);
    height: 1px;
    width: 188px;
    background-color: ${(props) => props.theme.navigationText};
    left: 50%;
    transform: translateX(-50%);
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 8px 24px;
    border-left-width: 3px;
    border-color: transparent;
    font-size: 13px;
    color: ${(props) => props.theme.navigationText};
    &:hover {
      opacity: 0.8;
    }
    &.active {
      border-color: ${(props) => props.theme.purplePrimary};
      background-color: ${(props) => props.theme.alphaBg};
      color: ${(props) => props.theme.navigationText};
    }
    .menu-item__title {
      color: inherit;
      padding-left: 12px;
      font-size: 13px;
      font-weight: 600;
    }
    .menu-item__icon {
      font-size: 20px;
      line-height: 28px;
      font-weight: 600;
      color: inherit;
    }
    &:hover {
      color: ${(props) => props.theme.textItemHover};
    }
  }
  .sidebar__subnav-inner {
    -webkit-mask-image: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0),
      hsla(0, 0%, 100%, 0.8) 10%,
      #fff 25%,
      #fff
    );
    .library-item {
      color: ${(props) => props.theme.navigationText};
      .library-title {
        color: ${(props) => props.theme.navigationText};
      }
      .library-icon {
        color: ${(props) => props.theme.navigationText};
      }
    }
  }
  & .vip-btn {
    background-color: #ffdb00;
    border-color: #ffdb00;
    color: black;
    display: inline-block;
    padding: 6px 35px;
    font-size: 12px;
    font-weight: 600;
  }
  .create-playlist {
    border-top: 1px solid ${(props) => props.theme.borderPrimary};
    &-icon,
    &-title {
      color: ${(props) => props.theme.navigationText};
    }
  }
`;
const Sidebar = () => {
  return (
    <StyledSidebar className=" pt-5 side-bar relative top-0 left-0  flex flex-col w-[240px]">
      <div className="zingmp3-brand  w-[240px] h-[70px] flex items-center px-7">
        <div className="w-[120px] hide-on-mobile-tablet  h-10 relative">
          <img className="object-cover w-full" src={logo} alt="" />
        </div>
        <div className="hidden w-10 logo-mobile">
          <img src={logoMobile} alt="" />
        </div>
      </div>
      <div className="mb-4 sidebar-navbar-list  relative after:absolute after:content=['']">
        {/* <MenuItem
          title="Cá Nhân"
          to="/profile"
          icon={<BiHomeAlt className="menu-item__icon" />}
        /> */}
        <MenuItem
          title="Trang Chủ"
          to="/"
          icon={<BsVinyl className="menu-item__icon" />}
        />
        <MenuItem
          title="#zingchart"
          to="/zingchart"
          icon={<BsMusicNoteList className="menu-item__icon" />}
        />
        <MenuItem
          title="Radio"
          to="/radio"
          icon={<IoIosRadio className="menu-item__icon" />}
        />
        <MenuItem
          title="Theo Dõi"
          to="/follow"
          icon={<BsFillFilePlayFill className="menu-item__icon" />}
        />
      </div>

      <div className="sidebar__subnav-inner has-scroll-bar mt-[10px]">
        <div className="mb-4 sidebar-navbar-list relative after:absolute after:content=['']">
          <MenuItem
            title="Nhạc Mới"
            to="/new-release"
            icon={<BsMusicNoteBeamed className="menu-item__icon" />}
          />
          {/* <MenuItem
            title="Thể Loại"
            to="/"
            icon={<BsUiChecksGrid className="menu-item__icon" />}
          /> */}
          <MenuItem
            title="Top 100"
            to="/top-100"
            icon={<BsStar className="menu-item__icon" />}
          />
          <MenuItem
            title="MV"
            to="/mv"
            icon={<SiYoutubemusic className="menu-item__icon" />}
          />

          <div className="w- flex hide-on-mobile-tablet mx-5 my-3 justify-center items-center  flex-col rounded-lg w-[200px] bg-bgGradient py-4 px-2">
            <div className="mb-2 text-xs font-semibold leading-5 text-center text-white">
              Nghe nhạc không quảng cáo cùng kho nhạc VIP
            </div>
            <Button className=" vip-btn">MUA VIP</Button>
          </div>
        </div>
        <ul className="flex flex-col library-list pt-7">
          <li className="flex library-item py-2 px-[25px] hide-on-mobile-tablet">
            <h4 className="text-xs font-semibold library-title ">THƯ VIỆN</h4>
            <i className="ml-auto text-sm bi library-icon bi-pencil-fill"></i>
          </li>
          {LibraryData.length > 0 &&
            LibraryData.map((item) => (
              <li key={item.id} className="flex  library-item py-2 px-[25px]">
                <div className="flex items-center">
                  <img
                    className="max-w-full align-middle leading-[0px]"
                    src={item.icon}
                    alt=""
                  />
                  <span className="pl-3 text-[13px] cursor-pointer text-inherit hide-on-mobile-tablet">
                    {item.title}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="w-[240px] hide-on-mobile-tablet cursor-pointer h-[54px] px-7 flex items-center left-0  create-playlist mt-auto">
        <i className="bi create-playlist-icon  text-lg  mr-[10px] bi-plus-lg add-playlist-btn"></i>
        <span className="text-sm font-semibold create-playlist-title">
          Tạo playlist mới
        </span>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
