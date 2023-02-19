import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Intro(props) {
  const [showLoginBtn, setShowLoginBtn] = useState(false);
  const [showSkipBtn, setShowSkipBtn] = useState(true);

  const hideSkipBtn = () => {
    setTimeout(() => {
      setShowSkipBtn(false);
    }, 6700);
  };

  const navigate = useNavigate();

  const moveLogin = () => {
    navigate("/login");
  };

  return (
    <IntroWrapper>
      {showLoginBtn && <LoginBtn onClick={() => moveLogin()} />}
      <SkipContainer>
        {showSkipBtn && <SkipBtn onClick={() => moveLogin()}></SkipBtn>}
      </SkipContainer>
      <IntroVideo
        src="/video/intro.mp4"
        autoPlay
        muted
        pointer-events="none"
        onPlaying={hideSkipBtn}
        onEnded={() => setShowLoginBtn(true)}
      />
    </IntroWrapper>
  );
}

export default Intro;

const IntroWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const IntroVideo = styled.video`
  width: 1600px;
  height: 100%;
`;

const LoginBtn = styled.span`
  position: absolute;
  width: 445px;
  height: 168px;
  cursor: pointer;
  z-index: 99;
`;

const SkipContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row-reverse;
  width: 1600px;
  bottom: 23%;
`;

const SkipBtn = styled.div`
  position: absolute;
  margin-right: 155px;
  width: 145px;
  height: 40px;

  cursor: pointer;
  z-index: 99;
`;
