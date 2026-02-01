import { useState } from "react";
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

/* ---------- Letter Emoji ---------- */

const LetterEmoji = styled(motion.div)`
  position: absolute;
  top: 34%;
  left: 42%;
  transform: translate(-50%, -50%);
  font-size: 35px;
  z-index: 4;
  pointer-events: none;
`;


/* ---------- CONTENT ---------- */

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

/* ---------- TEXT ---------- */

const TopText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: #f59ab8;
  margin-bottom: 10px;
`;

const Heading = styled.h1`
  font-family: 'DynaPuff', cursive;
  font-size: 32px;
  font-weight: 700;
  color: #f06292;
  margin-bottom: 26px;
`;

/* ---------- CARD ---------- */

const Card = styled.div`
  width: 90%;
  background: #ffd6e7;
  border-radius: 22px;
  padding: 30px 22px 34px;
  box-shadow: 0 12px 30px rgba(240, 98, 146, 0.25);
`;

/* ---------- ENVELOPE ---------- */

const EnvelopeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 170px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const EnvelopeBody = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ffb6d5, #ffa6c9);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
`;

const EnvelopeFlap = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 50%;
  background: #ff9fc4;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top;
  z-index: 3;
`;

const Letter = styled(motion.div)`
  position: absolute;
  bottom: 18px;
  left: 10%;
  width: 80%;
  height: 120px;
  background: #ffffff;
  border-radius: 10px;
  z-index: 1;
`;

/* ---------- TEXT BELOW ---------- */

const Hint = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: #6d4b5c;
  margin-bottom: 18px;
`;

/* ---------- BUTTON ---------- */

const Button = styled(motion.button)`
  font-family: 'DynaPuff', cursive;
  font-size: 15px;
  padding: 12px 24px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: #f06292;
  color: white;
  box-shadow: 0 6px 16px rgba(240, 98, 146, 0.4);
`;

/* ---------- COMPONENT ---------- */

export default function LetterClosed({ setStep }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Wait for animation to finish
    setTimeout(() => {
      setStep(5); // Open Letter UI
    }, 800);
  };

  return (
    <Screen>
      <BgCircles />

      <ContentWrapper>
        <TopText>Just because today feels right…</TopText>

        <Heading>
          Thank You For <br /> Being My Valentine 💖
        </Heading>

        <Card>
          <EnvelopeWrapper onClick={handleOpen}>
            <EnvelopeBody
              animate={
                isOpening
                  ? { boxShadow: "0 0 28px rgba(240,98,146,0.5)" }
                  : {}
              }
            >
            <Letter
            initial={{ y: 0, opacity: 0 }}
            animate={isOpening ? { y: -200, opacity: 1 } : {}}
            transition={{
                duration: 2,
                ease: "easeOut",
                delay: 0.5,   // ✅ 0.5s delay
            }}
            >
            </Letter>

                <LetterEmoji
                as={motion.div}
                initial={{ scale: 0.8, opacity: 1 }}
                animate={
                    isOpening
                    ? {
                        scale: [0.8, 1.3, 1],
                        opacity: [1, 1, 0],
                        }
                    : {}
                }
                transition={{
                    duration: 1,
                    times: [0, 0.4, 1],
                    ease: "easeOut",
                }}
                >
                💌
                </LetterEmoji>

              <EnvelopeFlap
                initial={{ rotateX: 0 }}
                animate={isOpening ? { rotateX: -180 } : {}}
                transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    delay: 0.5,   // ✅ 0.5s delay
                }}
               />
            </EnvelopeBody>
          </EnvelopeWrapper>

          <Hint>Click to open</Hint>

          <Button whileTap={{ scale: 0.9 }} onClick={handleOpen}>
            A Valentine For You 💝
          </Button>
        </Card>
      </ContentWrapper>
    </Screen>
  );
}
