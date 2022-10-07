import React from "react";
import styled from "styled-components";
import RadioItem from "./RadioItem";
const StyledRadio = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;
const RadioList = ({ data = {} }) => {
  const { items } = data;
  // console.log("radio:", items);

  return (
    <StyledRadio>
      <h3>Radio Nổi bật</h3>
      <div className="grid radio-container grid-cols-7 gap-x-7">
        {items?.slice(0, 7).map((item) => (
          <RadioItem key={item.id} item={item} />
        ))}
      </div>
    </StyledRadio>
  );
};

export default RadioList;
