import styled from "styled-components";
import { motion } from "framer-motion";

function StateToggle({ stateToggle, setStateToggle }) {
  return (
    <StateToggleBox
      stateToggle={stateToggle}
      onClick={() => setStateToggle(!stateToggle)}
    >
      {stateToggle ? "친구수락" : "친구신청"}

      <SelectStateBox
        animate={stateToggle ? "start" : "end"}
        variants={{
          start: { x: 0 },
          end: { x: "125px" },
        }}
      >
        {stateToggle ? "친구신청" : "친구수락"}
      </SelectStateBox>
    </StateToggleBox>
  );
}

export default StateToggle;

const StateToggleBox = styled.div`
  position: relative;
  width: 250px;
  height: 50px;

  color: #393939;
  text-align: ${({ stateToggle }) => (stateToggle ? "right" : "left")};
  margin-bottom: 48px;
  padding: 15px 30px 0px 30px;
  font: 20px/23px GmarketSansMedium;
  background: #d0d6e3;
  border-radius: 14px;

  user-select: none;
  cursor: pointer;
`;

const SelectStateBox = styled(motion.span)`
  position: absolute;
  width: 125px;
  height: 49px;
  left: 0;
  top: 0;

  color: #ffffff;
  text-align: center;
  padding-top: 15px;
  background: #717e9b;
  border-radius: 14px;
`;
