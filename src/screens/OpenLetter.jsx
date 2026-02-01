import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import stitch from "../assets/stitch_img.png"

/* ---------- SCREEN ---------- */

const Screen = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #fff2f7;
  display: flex;
  justify-content: center;
  position: relative;
  overflow-y: auto;
  padding: 16px 0;
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
    <Circle size={70} top="8%" left="15%" color="rgba(240,98,146,0.25)" opacity={0.4} />
    <Circle size={50} top="25%" left="75%" color="rgba(248,160,187,0.35)" opacity={0.5} />
    <Circle size={90} top="70%" left="10%" color="rgba(240,98,146,0.2)" opacity={0.35} />
    <Circle size={60} top="78%" left="72%" color="rgba(255,182,193,0.3)" opacity={0.45} />
  </>
);

/* ---------- CONTENT ---------- */

const ContentWrapper = styled(motion.div)`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

/* ---------- HEADER ---------- */

const TopText = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  color: #f59ab8;
  margin-bottom: 6px;
`;

const Heading = styled.h1`
  font-family: "DynaPuff", cursive;
  font-size: 30px;
  font-weight: 700;
  color: #f06292;
  margin-bottom: 18px;
`;

/* ---------- LETTER CARD ---------- */

const LetterCard = styled.div`
  position: relative;
  width: 100%;
  background: #fff7fb;
  border-radius: 18px;
  padding: 26px 22px;
  box-shadow: 0 12px 30px rgba(240, 98, 146, 0.2);
  border: 2px solid #ffd1e3;
  text-align: left;
`;

/* ---------- DECOR ---------- */

const Sparkle = styled.div`
  position: absolute;
  top: 2.5px;
  left: 9px;
  font-size: 20px;
`;

const Hearts = styled.div`
  position: absolute;
  bottom: 60px;
  right: 20px;
  font-size: 20px;
`;

const TopRightPhoto = styled.img`
  position: absolute;
  top: -30px;
  right: -20px;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
`;


/* ---------- GREETING ---------- */

const Greeting = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;

const HeartBadge = styled.div`
  width: 32px;
  height: 32px;
  background: #f06292;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GreetingText = styled.h3`
  font-family: "DynaPuff", cursive;
  font-size: 18px;
  color: #f06292;
`;

const Divider = styled.div`
  height: 1px;
  background: #ffd1e3;
  margin: 16px 0 18px;
`;

/* ---------- TYPEWRITER ---------- */

const ParagraphWrapper = styled.div`
  position: relative;
  margin-bottom: 18px;
`;

const GhostText = styled.p`
  font-family: "Caveat", cursive;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.65;
  color: transparent;
  white-space: pre-wrap;
`;

const TypedText = styled.p`
  font-family: "Caveat", cursive;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.65;
  color: #6d4b5c;
  white-space: pre-wrap;
  position: absolute;
  top: 0;
  left: 0;
`;

/* ---------- SIGNATURE ---------- */

const Signature = styled.div`
  margin-top: 20px;
  text-align: right;
  font-family: "DynaPuff", cursive;
  color: #f06292;
`;

/* ---------- BUTTON ---------- */

const NextButton = styled(motion.button)`
  margin-top: 22px;
  font-family: "DynaPuff", cursive;
  font-size: 15px;
  padding: 14px 28px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #f06292, #ff8fb1);
  color: white;
  box-shadow: 0 8px 20px rgba(240, 98, 146, 0.4);
`;

/* ---------- TYPEWRITER COMPONENT ---------- */

function TypewriterParagraph({ text, active, onComplete }) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!active) return;

    let i = 0;
    const interval = setInterval(() => {
      setTyped((prev) => prev + text.charAt(i));
      i++;

      if (i >= text.length) {
        clearInterval(interval);
        onComplete();
      }
    }, 28);

    return () => clearInterval(interval);
  }, [active, text, onComplete]);

  return (
    <ParagraphWrapper>
      <GhostText>{text}</GhostText>
      <TypedText>{typed}</TypedText>
    </ParagraphWrapper>
  );
}

/* ---------- MAIN COMPONENT ---------- */

export default function OpenLetter({ setStep }) {
  const paragraphs = [
    "I  wanted to do something special today, simply because you matter to me. Valentine’s Day isn’t about grand gestures—it’s about the feeling of choosing someone, even in the quiet moments.",
    "I  admire the way you care, understand, and bring calm positivity into my world. Being around you feels safe, natural, and real.",
    "I  appreciate your honesty, your kindness, and the way you show up as yourself.",
    "I  don’t know where this path leads, but I’d like to take a step forward and see where this connection can grow—at its own pace, in its own time.",
    "N o pressure, no expectations—just something sincere, from the heart."
  ];

  const [current, setCurrent] = useState(0);

  return (
    <Screen>
      <BgCircles />

      <ContentWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <TopText>Just because today feels right</TopText>
        <Heading>A Valentine Note 💌</Heading>

        <LetterCard>
          <TopRightPhoto src={stitch} alt="memory" />
          <Sparkle>✨</Sparkle>
          <Hearts>💕</Hearts>

          <Greeting>
            <HeartBadge>💖</HeartBadge>
            <GreetingText>Hey</GreetingText>
          </Greeting>

          <Divider />

          {paragraphs.map((text, index) => (
            <TypewriterParagraph
              key={index}
              text={text}
              active={index === current}
              onComplete={() => setCurrent((prev) => prev + 1)}
            />
          ))}

          <Signature>Always 🤍</Signature>
        </LetterCard>

        <NextButton
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setStep(6)}
        >
          Let’s Keep This Story Going 💫
        </NextButton>
      </ContentWrapper>
    </Screen>
  );
}
