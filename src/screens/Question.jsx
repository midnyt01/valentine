import styled from "styled-components";
import { motion } from "framer-motion";
import cute1 from "../assets/cute1.png"
import cute2 from "../assets/cute2.gif"

/* ---------- SCREEN ---------- */


const ContentWrapper = styled.div`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Screen = styled.div`
  height: 100vh;
  width: 100vw;
  background: #fff2f7;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

/* ---------- BACKGROUND CIRCLES ---------- */

const Circle = styled.div`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};
  border-radius: 50%;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
`;


const BgCircles = () => (
  <>
    <Circle
      size={80}
      top="10%"
      left="15%"
      color="rgba(240, 98, 146, 0.25)"
      opacity={0.4}
    />
    <Circle
      size={50}
      top="28%"
      left="78%"
      color="rgba(248, 160, 187, 0.35)"
      opacity={0.5}
    />
    <Circle
      size={100}
      top="62%"
      left="8%"
      color="rgba(240, 98, 146, 0.2)"
      opacity={0.35}
    />
    <Circle
      size={60}
      top="75%"
      left="72%"
      color="rgba(255, 182, 193, 0.3)"
      opacity={0.45}
    />
  </>
);

/* ---------- CARD ---------- */

const Card = styled.div`
  width: 90%;
  max-width: 360px;
  background: #ffd6e7;
  border-radius: 22px;
  padding: 28px 22px 32px;
  box-shadow: 0 12px 30px rgba(240, 98, 146, 0.25);
  position: relative;
  text-align: center;
`;

/* ---------- CARD DOTS ---------- */

const Dots = styled.div`
  position: absolute;
  top: 12px;
  left: 14px;
  display: flex;
  gap: 6px;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

/* ---------- FLOATING IMAGES ---------- */

const FloatImg = styled.img`
  position: absolute;
  width: 64px;
`;

const TopRightImg = styled(FloatImg)`
  top: -30px;
  right: -30px;
transform: scale(2.5);
`;

const BottomLeftImg = styled(FloatImg)`
  bottom: -30px;
  left: -10px;
  transform: scale(1.5);
`;

/* ---------- TEXT ---------- */

const TopText = styled.p`
  font-family: 'DynaPuff', cursive;
  font-size: 14px;
  color: #f59ab8;
  margin-bottom: 12px;
`;

const Heading = styled.h1`
  font-family: 'DynaPuff', cursive;
  font-size: 34px;
  font-weight: 700;
  color: #f06292;
  margin-bottom: 26px;
  line-height: 1.2;
`;

const CardText = styled.p`
  font-family: 'DynaPuff', cursive;
  margin-top: 15px;
  font-size: 15px;
  color: #6d4b5c;
  margin-bottom: 14px;
`;

const Hint = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: #f06292;
  margin-bottom: 24px;
`;

/* ---------- BUTTONS ---------- */

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
`;

const Button = styled(motion.button)`
  font-family: 'DynaPuff', cursive;
  font-size: 16px;
  padding: 12px 22px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  min-width: 110px;
`;

const YesButton = styled(Button)`
  background: #f06292;
  color: white;
  box-shadow: 0 6px 14px rgba(240, 98, 146, 0.4);
`;

const NoButton = styled(Button)`
  background: #ffffff;
  color: #f06292;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
`;

/* ---------- COMPONENT ---------- */

export default function ValentineQuestion({ setStep }) {
  return (
    <Screen>
      <BgCircles />

      <ContentWrapper>
        <TopText>Hey, I have made something special for you...</TopText>

        <Heading>
          Will You Be My <br /> Valentine? 💖
        </Heading>

        <Card>
          {/* Dots */}
          <Dots>
            <Dot color="#ff5f56" />
            <Dot color="#ffbd2e" />
            <Dot color="#27c93f" />
          </Dots>

          {/* Floating Images */}
          <TopRightImg src={cute1} alt="cute" />
          <BottomLeftImg src={cute2} alt="cute" />

          <CardText>
            A little reminder of what this day feels like with you.
          </CardText>

          <Hint>Tap below when you’re ready ✨</Hint>

          <Buttons>
            <YesButton whileTap={{ scale: 0.9 }} onClick={() => setStep(4)}>
              YES 💕
            </YesButton>
            <NoButton whileTap={{ scale: 0.9 }} onClick={() => setStep(3)}>
              NO 🙃
            </NoButton>
          </Buttons>
        </Card>
      </ContentWrapper>
    </Screen>
  );
}
