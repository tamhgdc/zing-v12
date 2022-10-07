import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { partnerData } from "./PartnerData";
const StyledPartner = styled.div`
  .partner-title {
    color: ${(props) => props.theme.textSecondary};
  }
`;
const Partner = () => {
  const [partners, setPartner] = useState([]);
  useEffect(() => {
    if (!partnerData) return [];
    setPartner(partnerData);
  }, []);
  return (
    <StyledPartner className="px-10 partner-container container-layout">
      <h5 className="text-xs text-center uppercase first-letter font-bold mb-7 tracking-[1.71px] partner-title">
        Đối tác âm nhạc
      </h5>
      <div className="grid grid-cols-8 partner-list gap-x-6">
        {partners.slice(0, 8).map((item) => (
          <div
            className="relative w-full flex justify-center items-centerq  bg-[#f7f7f7] rounded-md cursor-pointer"
            key={item.id}
          >
            <img
              className="object-cover h-[60px] leading-[0] w-full rounded-md"
              src={item.img}
              alt=""
            />
          </div>
        ))}
      </div>
    </StyledPartner>
  );
};

export default Partner;
