import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

/* ================= SCREEN ================= */

const Screen = styled.div`
  min-height: 100vh;
  background: #fff2f7;
  padding: 28px 16px 60px;
`;

/* ================= HEADER ================= */

const Title = styled.h1`
  text-align: center;
  font-family: "DynaPuff", cursive;
  font-size: 34px;
  color: #f06292;
  margin-bottom: 18px;
`;

/* ================= CARD ================= */

const Card = styled.div`
  max-width: 420px;
  margin: auto;
  background: #ffd9e8;
  border-radius: 22px;
  padding: 34px 22px 26px;
  box-shadow: 0 14px 30px rgba(240, 98, 146, 0.25);
  position: relative;
`;

const CardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
`;

const HeaderIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #f06292;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
  flex-shrink: 0;
`;

const CardHeaderText = styled.div`
  font-family: "DynaPuff", cursive;
  font-size: 20px;
  color: #f06292;
`;


/* ================= LETTER ICON ================= */

const LetterIconWrap = styled.div`
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
`;

const LetterCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #ffd1e3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  box-shadow: 0 8px 18px rgba(240, 98, 146, 0.35);
`;

/* ================= CARD CONTENT ================= */

const CardHeader = styled.div`
  text-align: center;
  font-family: "DynaPuff", cursive;
  font-size: 22px;
  color: #f06292;
  margin-top: 28px;
  margin-bottom: 14px;
`;

const LetterBox = styled.div`
  background: #fff7fb;
  border-radius: 16px;
  padding: 22px;
`;

/* ================= TEXT ================= */

const Paragraph = styled.p`
  font-family: "Caveat", cursive;
  font-size: 18px;
  line-height: 1.6;
  color: #444;
  margin-bottom: 16px;
`;

const HeyText = styled.span`
  display: block;
  font-weight: 700;
  color: #f06292;
  margin-bottom: 6px;
`;

/* ================= SIGNATURE ================= */

const Signature = styled.p`
  text-align: center;
  margin-top: 14px;
  font-size: 14px;
  opacity: 0.8;
  font-family: "Caveat", cursive;
`;

/* ================= BUTTONS ================= */

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 22px;
`;

const Button = styled(motion.button)`
  flex: 1;
  font-family: "DynaPuff", cursive;
  font-size: 15px;
  padding: 14px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
`;

const SealButton = styled(Button)`
  background: linear-gradient(135deg, #f06292, #ff8fb1);
  color: white;
`;

const RestartButton = styled(Button)`
  background: #d6b4c8;
  color: white;
`;

/* ================= OVERLAY ================= */

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(255, 242, 247, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

/* ================= LOADING DOTS ================= */

const dots = keyframes`
  0% { content: ""; }
  33% { content: "."; }
  66% { content: ".."; }
  100% { content: "..."; }
`;

const LoadingText = styled.div`
  margin-top: 14px;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  color: #555;

  &::after {
    content: "";
    animation: ${dots} 1.4s steps(3, end) infinite;
  }
`;

/* ================= TYPEWRITER ================= */

function TypewriterParagraph({ text, delay, showHey }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed((prev) => prev + text.charAt(i));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 28);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <Paragraph>
      {showHey && <HeyText>Hey,</HeyText>}
      {displayed}
    </Paragraph>
  );
}

/* ================= COMPONENT ================= */

export default function FinalLoveLetter({ setStep }) {
  const [sealed, setSealed] = useState(false);

  const paragraphs = [
    "This wasn’t about perfection, just honesty.",
    "I wanted you to feel appreciated today.",
    "Whatever comes next, I’m glad this moment exists.",
  ];

  useEffect(() => {
    if (sealed) {
      const timer = setTimeout(() => {
        setStep(11);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [sealed, setStep]);

  return (
    <>
      <Screen>
        <Title>One Last Valentine Thought</Title>

        <Card>
  <CardHeaderRow>
    <HeaderIcon>✉️</HeaderIcon>
    <CardHeaderText>Final Love Letter</CardHeaderText>
  </CardHeaderRow>

  <LetterBox>
    {paragraphs.map((text, index) => (
      <TypewriterParagraph
        key={index}
        text={text}
        delay={index * 1200}
        showHey={index === 0}
      />
    ))}
  </LetterBox>

  <Signature>This came from a very genuine place.</Signature>

  <ButtonRow>
    <SealButton onClick={() => setSealed(true)}>
      Seal It 💌
    </SealButton>

    <RestartButton onClick={() => setStep(2)}>
      Restart
    </RestartButton>
  </ButtonRow>
</Card>

      </Screen>

      {sealed && (
        <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            style={{ fontSize: "64px" }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 2.4,
              ease: "easeInOut",
            }}
          >
            💌
          </motion.div>

          <LoadingText>Ending this softly</LoadingText>
        </Overlay>
      )}
    </>
  );
}
