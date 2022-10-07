import React from "react";
import styled from "styled-components";
const StyledEvent = styled.div`
  .event-img {
    &:hover img {
      transform: scale(1.1);
    }
    &::after {
      background-image: linear-gradient(
        hsla(0, 0%, 100%, 0.05),
        rgba(0, 0, 0, 0.95)
      );
    }
  }
  .event-follower {
    color: ${(props) => props.theme.textPrimary};
  }
  .follower-avatar {
    border: 2px solid ${(props) => props.theme.primaryBg};
  }
  .follower-text {
    color: ${(props) => props.theme.textSecondary};
  }
  & .btn-follow {
    background-color: ${(props) => props.theme.purplePrimary};
  }
`;
const Event = ({ data = {} }) => {
  const { items } = data;
  return (
    <StyledEvent className="container-layout event-container">
      <h3>Sự Kiện</h3>
      <div className="grid grid-cols-3 event-list gap-x-7">
        {items.slice(0, 3).map((item) => {
          const { encodeId, coverH, label, title, followers } = item;
          return (
            <div key={encodeId} className="relative flex flex-col event-item ">
              <div className="relative mb-2  z-10 after:absolute after:content-[''] after:inset-0 after:w-full after:h-full  w-full overflow-hidden rounded-md cursor-pointer event-img">
                <img
                  className="object-cover w-full transition-all duration-700 rounded-md "
                  src={coverH}
                  alt=""
                />
                <div className="absolute z-10 left-0 right-0 bottom-0 py-3 px-[10px]">
                  <span className="text-[9px] uppercase rounded-[2px] py-[2px] px-1 bg-white text-[#ff0101]">
                    {label}
                  </span>
                  <p className="text-white block text-ellipsis my-[5px] capitalize text-[16px] font-bold whitespace-nowrap">
                    {title}
                  </p>
                  <span className="mr-0 text-base font-normal text-white whitespace-nowrap text-ellipsis">
                    Đang Diễn Ra
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="mb-1 leading-[21px] text-base font-normal event-follower">
                    Lượt {item.subscribeText.toLowerCase()}
                  </span>
                  <div className="flex items-center">
                    <div className="grid grid-cols-6 ">
                      {followers.slice(0, 6).map((item) => (
                        <div
                          key={item.id}
                          className="relative w-5 h-5 overflow-hidden rounded-full follower-avatar"
                        >
                          <img
                            className="object-cover w-full rounded-full"
                            src={item.avatar}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-base ml-[6px] follower-text">
                      +{`${item.totalFollow - item.followers.length} `}
                    </span>
                  </div>
                </div>
                <div>
                  <button className="px-5 whitespace-nowrap leading-[0] py-5 text-base text-white rounded-full btn-follow">
                    {item.subscribeText}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </StyledEvent>
  );
};

export default Event;
