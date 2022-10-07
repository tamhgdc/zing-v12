import { css } from "styled-components";

export const GlobalClasses = css`
  body {
    background-color: ${(props) => props.theme.layoutBg};

    &::-webkit-scrollbar {
      display: none;
    }
  }
  h3,
  h4 {
    color: ${(props) => props.theme.textPrimary};
  }
  //slick slider
  .slick-list {
    margin: 0 -14px;
    & .slick-slide {
      padding: 0 14px;
    }
  }
  .container-layout {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
  }
  .card-title {
    color: ${(props) => props.theme.textPrimary};
    display: -webkit-box;
    word-break: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-transform: capitalize;
  }
  h4,
  h3 {
    color: ${(props) => props.theme.textPrimary};
  }
  .card-content-subtitle {
    font-size: 14px;
    line-height: 1.33;
    color: ${(props) => props.theme.textSecondary};
    text-transform: capitalize;
    flex-wrap: nowrap;
    display: -webkit-box;
    word-break: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-weight: 400;
  }

  .tippy-box {
    font-size: 12px;
  }
  .tippy-content {
    padding-top: 3px;
    padding-bottom: 3px;
  }
  .overlay {
    position: relative;
    overflow: hidden;
    &::after {
      position: absolute;
      border-radius: 6px;
      content: "";
      inset: 0;
      width: 100%;
      height: 100%;
      background-color: ${(props) => props.theme.darkAlpha50Bg};
      visibility: hidden;
    }
    &:hover::after {
      visibility: visible;
    }
  }
  .center {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    z-index: 100;
  }
  .has-scroll-bar {
    will-change: scroll-position;
    scroll-behavior: smooth;
    overflow: hidden overlay;
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
  }

  .song-animated-item {
    position: absolute;
    cursor: pointer;
    border-radius: 4px;
    overflow: hidden;
    transition: all 0.9s;
    width: 230px;
    height: 230px;
    transition: all 0.9s;
    &.first {
      z-index: 3;
      left: 40px;
      opacity: 1;
    }
    &.second {
      z-index: 2;
      left: 20px;
      width: 196px;
      height: 196px;
      opacity: 0.7;
      background-image: linear-gradient(
        90deg,
        hsla(0, 0%, 100%, 0.5) 1%,
        rgba(0, 0, 0, 0.6) 14%
      );
    }
    &.third {
      z-index: 1;
      left: 0;
      width: 162px;
      height: 162px;
      opacity: 0.3;
      background-image: linear-gradient(
        90deg,
        hsla(0, 0%, 100%, 0.5) 1%,
        rgba(0, 0, 0, 0.6) 14%
      );
    }
  }
  //RESPONSIVE
  @media screen and (max-width: 1220px) {
    .new-release-container {
      grid-template-columns: unset;
      grid-auto-flow: column;
      grid-auto-columns: 50%;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-snap-stop: always;
      .new__release-item {
        scroll-snap-align: start;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
      }
    }
    .new-release-container {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .new-release-container::-webkit-scrollbar {
      display: none;
    }
    .radio-container {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      .radio-item:nth-child(6),
      .radio-item:nth-child(7) {
        display: none;
      }
    }
    .event-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      .event-item:last-child {
        display: none;
      }
    }
  }
  @media screen and (max-width: 1100px) {
    .theme-container-list {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media screen and (max-width: 1024px) {
    .hide-on-mobile-tablet {
      display: none;
    }
    //Trang chu
    .side-bar {
      width: 70px;
      padding-top: 10px;
      & .sidebar-navbar-list::after {
        width: 70px !important;
      }

      & .menu-item {
        padding: 15px 0;
        justify-content: center;
        align-items: center;
      }
      & .zingmp3-brand {
        width: inherit;
        padding: 0;
        justify-content: center;
        align-items: center;
        height: auto;
        & .logo-mobile {
          display: block;
        }
      }
    }
    //header
    .header {
      width: calc(100% - 70px);
    }

    .wrapper-playlist {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      & .playlist-item:last-child {
        display: none;
      }
    }

    .wrapper-mix {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      & .mix-item:last-child {
        display: none;
      }
    }
    .note-list-icon {
      margin-left: 8px;
    }
    .show-now-playing {
      .player-volume {
        display: none;
      }
      .player-container {
        padding: 0;
      }
      .player-right,
      .player-left {
        width: 20%;
      }
      .player-control {
        width: 60%;
      }
    }
    .album-container {
      .album-content {
        flex-direction: column;
        align-items: center;
      }
      .album-right {
        width: 100%;
      }
    }
    .artist-detail-layout {
      padding-top: 60px;
      .artist__container-info {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
      }
      .song-item {
        .media-content {
          display: none;
        }
        .media-right {
          flex: 1 !important;
          margin: 0;
          justify-content: flex-end !important;
        }
      }
    }
    .sign-up-container {
      width: 500px;
    }
  }
  @media screen and (max-width: 920px) {
    .btn-upload,
    .player-icon {
      display: none;
    }
    .search-result,
    .input-search {
      width: 350px;
    }
    .theme-container-list {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .song-item {
      .media-content {
        display: none;
      }
      .media-right {
        margin: 0;
        flex: 1 !important;
        justify-content: flex-end;
      }
      .song__info {
        overflow: initial;
      }
      .song__info-author {
        display: initial;
        white-space: nowrap;
      }
    }
    .biography-desc {
      max-height: 100px;
    }
  }
  @media screen and (max-width: 860px) {
    .artist-detail-slideshow {
      display: none;
    }
  }

  @media screen and (max-width: 739px) {
    .wrapper-layout {
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 40px;
      padding-bottom: 40px;
    }
    .wrapper-playlist {
      column-gap: 20px;
    }
    .header {
      width: 100%;
      padding: 0 10px;

      & .btn-theme:nth-child(2) {
        display: none;
      }
    }
    .player-main:not(.show-now-playing) {
      bottom: 45px;
      .player-left {
        height: 100%;
        .player__name {
          max-width: 80px;
        }
      }
      & .player-container {
        padding: 0 5px;
        height: 45px;
        .player-thumb {
          width: 40px;
          height: 40px;
        }
        .player-info {
          min-width: 180px;
        }
      }
      .player-right,
      .repeat-btn,
      .prev-btn,
      .random-btn,
      .note-list-icon,
      .player-volume,
      .player-icon,
      .player-progress {
        display: none;
      }
      .toggle-play {
        border: none;
        margin: 0;
      }
      .control-btn-list {
        justify-content: flex-end;
      }
      .show-now-playing-mobile {
        display: block;
      }
    }
    .show-now-playing {
      .player-volume {
        display: none;
      }
      .player-container {
        padding: 0;
      }
      .player-right,
      .player-left {
        width: 10%;
      }
      .player-control {
        width: 80%;
      }
    }

    .side-bar {
      position: fixed !important;
      top: calc(100% - 45px) !important;
      right: 0 !important;
      left: 0 !important;
      height: 45px !important;
      overflow: hidden !important;
      width: 100% !important;
      border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
      display: block !important;
      padding-top: 0 !important;
      .zingmp3-brand,
      .sidebar-navbar-list::after,
      .sidebar__subnav-inner {
        display: none;
      }
      .sidebar-navbar-list {
        display: flex;
        width: 100%;
        height: 100%;
        margin-bottom: 0;
        flex-direction: row;
        justify-content: space-between;
        .menu-item {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0;
          margin: 0;
          border-left-width: 0;
          border-bottom-width: 2px;
          border-color: transparent;
          width: 100%;
          &.active {
            border-color: ${(props) => props.theme.purplePrimary};
          }
          .menu-item__title {
            display: inline-block;
            font-size: 10px;
            padding: 0;
          }
          .menu-item__icon {
            font-size: 16px;
          }
        }
      }
    }
    .partner-container {
      padding: 0;
      .partner-list {
        justify-content: center;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        row-gap: 16px;
        padding: 0;
      }
    }
    .theme-container-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .modal-container {
      height: 300px;
      max-height: unset !important ;
      min-height: unset !important ;
      padding: 0 16px !important;
    }
  }
  @media screen and (max-width: 650px) {
    .new-release-container {
      grid-template-columns: unset;
      grid-auto-flow: column;
      grid-auto-columns: 60%;
      overflow-x: auto;
    }
  }

  @media screen and (max-width: 586px) {
    .wrapper-playlist {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      .playlist-item:nth-child(4) {
        display: none;
      }
    }
    .btn-setting {
      display: none;
    }
    .new-release-container {
      grid-auto-columns: 70%;
    }
    .radio-container {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      .radio-item:nth-child(4),
      .radio-item:nth-child(5) {
        display: none;
      }
    }
    .partner-list {
      justify-content: center;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      row-gap: 12px;
      column-gap: 12px;
    }
    .event-list {
      grid-template-columns: unset;
      grid-auto-flow: column;
      grid-auto-columns: 60%;
      overflow-x: auto;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      .event-item {
        scroll-snap-align: start;
      }
    }
    .wrapper-mix {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      .mix-item:nth-child(4) {
        display: none;
      }
    }
    .weekchart-banner {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      &-item:last-child {
        display: none;
      }
    }
    .sign-up-container {
      width: 400px;
    }
  }
  @media screen and (max-width: 530px) {
    .search-result,
    .input-search {
      width: 300px;
    }
    .song-item {
      .media-right {
        display: none;
      }
      .song__rank-number {
        text-align: right;
        font-weight: 400;
        font-size: 18px;
        width: 0;
      }
      .ranking-status {
        margin-right: 8px;
      }
      .sort-ranking {
        margin-left: 8px;
      }
    }
    .show-now-playing {
      .now-playing-thumb {
        width: 250px;
        height: 250px;
      }
      .now-playing-content {
        padding-top: 100px;
      }
      .now-playing-title {
        font-size: 20px;
      }
    }
  }
  @media screen and (max-width: 460px) {
    .search-result,
    .input-search {
      width: 240px;
    }
    .new-release-container {
      grid-auto-columns: 80%;
    }
    .wrapper-playlist {
      grid-template-columns: unset;
      grid-auto-flow: column;
      grid-auto-columns: 60%;
      overflow-x: auto;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      .playlist-item {
        scroll-snap-align: start;

        .card-content-subtitle {
          display: none;
        }
        .card-title {
          font-size: 16px;
          color: #fff;
          display: initial;
          white-space: wrap;
          text-transform: capitalize;
        }
      }
    }
    .sign-up-container {
      width: 350px;
      padding: 12px;
    }
  }
`;
