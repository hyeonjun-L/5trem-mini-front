import React from "react";
import styled from "styled-components";
import LightContainer from "../../publicCompent/LightContainer";
import SelectContainer from "../signUp/SelectContainer";
import InputText from "../../publicCompent/InputText";
function FindInputEmail(props) {
  return (
    <EmailInputContainer>
      <LightContainer
        tag={<InputText width={295} height={60} id="firstEmail"></InputText>}
      />
      @
      <LightContainer
        tag={
          <SelectContainer
            width={295}
            height={60}
            isId="secondEmail"
          ></SelectContainer>
        }
      />
    </EmailInputContainer>
  );
}

export default FindInputEmail;

const EmailInputContainer = styled.div`
  width: 655px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font: 20px/24px GmarketSansMedium;
  color: #707070;
`;
