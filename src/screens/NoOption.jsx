import styled from "styled-components";
import { motion } from "framer-motion";

/* ---------- SCREEN ---------- */

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
    <Circle size={70} top="12%" left="20%" color="rgba(240,98,146,0.25)" opacity={0.4} />
    <Circle size={50} top="30%" left="75%" color="rgba(248,160,187,0.35)" opacity={0.5} />
    <Circle size={100} top="65%" left="10%" color="rgba(240,98,146,0.2)" opacity={0.35} />
    <Circle size={60} top="78%" left="72%" color="rgba(255,182,193,0.3)" opacity={0.45} />
  </>
);

/* ---------- CARD ---------- */

const Card = styled(motion.div)`
  width: 90%;
  max-width: 360px;
  background: #ffd6e7;
  border-radius: 22px;
  padding: 32px 24px;
  box-shadow: 0 14px 32px rgba(240, 98, 146, 0.3);
  text-align: center;
`;

/* ---------- TEXT ---------- */

const Heading = styled.h1`
  font-family: 'DynaPuff', cursive;
  font-size: 30px;
  font-weight: 700;
  color: #f06292;
  margin-bottom: 16px;
`;

const Message = styled.p`
  font-family: 'DynaPuff', cursive;
  font-size: 15px;
  color: #6d4b5c;
  margin-bottom: 26px;
`;

const Hint = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: #f06292;
  margin-bottom: 30px;
`;

/* ---------- BUTTON ---------- */

const Button = styled(motion.button)`
  font-family: 'DynaPuff', cursive;
  font-size: 16px;
  padding: 14px 30px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: #f06292;
  color: white;
  box-shadow: 0 8px 18px rgba(240, 98, 146, 0.4);
`;

/* ---------- COMPONENT ---------- */

export default function NoOption({ setStep }) {
  return (
    <Screen>
      <BgCircles />

      <Card
        initial={{ rotate: -2 }}
        animate={{ rotate: [ -2, 2, -2, 2, 0 ] }}
        transition={{ duration: 0.6 }}
      >
        <Heading>Oops 😈</Heading>

        <Message>
          That button was just for decoration.<br />
          You don’t really have a choice here 💕
        </Message>

        <Hint>Let’s try that again, shall we?</Hint>

        <Button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setStep(2)}
        >
          Try Again 😏
        </Button>
      </Card>
    </Screen>
  );
}

