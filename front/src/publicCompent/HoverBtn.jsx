import React, { useState } from "react";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { ReactComponent as ArrowHover } from "../assets/arrowHover.svg";
import { ReactComponent as ArrowActive } from "../assets/arrowActive.svg";

function HoverBtn({ set, left }) {
  const [yearBtnHover, setyearBtnHover] = useState(false);
  const [clickYearBtn, setClickYearBtn] = useState(false);

  return (
    <div
      onMouseOver={() => setyearBtnHover(true)}
      onMouseOut={() => setyearBtnHover(false)}
      onClick={() => setClickYearBtn(true)}
      style={{
        display: "flex",
        alignItems: "center",
        transform: `rotate( ${left ? 90 : -90}deg )`,
        margin: left ? "6px 15px 0px 13px" : "6px 13px 0px 15px",
      }}
    >
      {yearBtnHover ? (
        clickYearBtn ? (
          <ArrowActive
            onMouseOver={() => setTimeout(() => setClickYearBtn(false), 150)}
          />
        ) : (
          <ArrowHover onClick={set} />
        )
      ) : (
        <Arrow />
      )}
    </div>
  );
}

export default HoverBtn;
