/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import WrapperLayout from "~/components/wrapperLayout";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SongItem from "~/components/songItem";
const StyledProfile = styled.div`
  & .song-favorist {
    border-bottom: 2px solid ${(props) => props.theme.purplePrimary};
  }
`;
const Profile = () => {
  return (
    <WrapperLayout>
      <StyledProfile className="w-full mt-10 profile-container">
        <div className="mb-5">
          <h3 className="text-4xl">Thư Viện</h3>
          <span className="py-3 text-sm font-medium text-white song-favorist">
            BÀI HÁT YÊU THÍCH
          </span>
        </div>
        <div className="flex flex-col profile-list-song"></div>
      </StyledProfile>
    </WrapperLayout>
  );
};

export default Profile;
