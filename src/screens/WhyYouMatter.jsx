import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import petal from "../assets/petal.png";

/* ---------- FALLING PETALS ---------- */

const fall = keyframes`
  0% { transform: translateY(-10%) rotate(0deg); opacity: 0 }
  10% { opacity: 1 }
  100% { transform: translateY(120vh) rotate(360deg); opacity: 0 }
`;

const Petal = styled.img`
  position: absolute;
  top: -10%;
  left: ${({ left }) => left}%;
  width: ${({ size }) => size}px;
  animation: ${fall} ${({ duration }) => duration}s linear infinite;
  opacity: 0.5;
`;

const FallingPetals = () =>
  [...Array(16)].map((_, i) => (
    <Petal
      key={i}
      src={petal}
      left={Math.random() * 100}
      size={16 + Math.random() * 10}
      duration={14 + Math.random() * 6}
    />
  ));

/* ---------- SCREEN ---------- */

const Screen = styled.div`
  min-height: 100vh;
  background: #fff2f7;
  padding: 32px 0 60px;
  position: relative;
  overflow-x: hidden;
`;

/* ---------- HEADER ---------- */

const Header = styled.div`
  text-align: center;
  margin-bottom: 28px;
`;

const Title = styled.h1`
  font-family: "DynaPuff", cursive;
  font-size: 34px;
  color: #f06292;
`;

const Subtitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  color: #777;
  margin-top: 6px;
`;

/* ---------- GRID ---------- */

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  padding: 0 16px;
  max-width: 420px;
  margin: auto;
`;

/* ---------- CARD ---------- */

const CardWrap = styled.div`
  perspective: 1000px;
`;

const CardInner = styled(motion.div)`
  width: 100%;
  aspect-ratio: 1 / 1; /* ✅ square */
  position: relative;
  transform-style: preserve-3d;
`;

const CardFace = styled.div`
  position: absolute;
  inset: 0;
  background: #ffe6ef;
  border-radius: 18px;
  padding: 16px;
  backface-visibility: hidden;
  box-shadow: 0 10px 24px rgba(240, 98, 146, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CardBack = styled(CardFace)`
  background: #ffffff;
  transform: rotateY(180deg);
`;

/* ---------- EMOJI CIRCLE ---------- */

const EmojiCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #ffd1e3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin-bottom: 10px;
`;

/* ---------- TEXT ---------- */

const CardTitle = styled.h3`
  font-family: "DynaPuff", cursive;
  font-size: 16px;
  color: #f06292;
  margin-bottom: 6px;
`;

const CardText = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  color: #555;
`;

/* ---------- DECOR LINE ---------- */

const BottomLine = styled.div`
  width: 34px;
  height: 4px;
  border-radius: 999px;
  background: #f8a1be;
  margin-top: 12px;
`;

/* ---------- CTA ---------- */

const NextButton = styled(motion.button)`
  display: block;
  margin: 42px auto 0;
  font-family: "DynaPuff", cursive;
  font-size: 16px;
  padding: 16px 34px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #f06292, #ff8fb1);
  color: white;
  box-shadow: 0 10px 26px rgba(240, 98, 146, 0.45);
`;

/* ---------- DATA ---------- */

const reasons = [
  { icon: "💖", title: "Genuine Heart", front: "You care in ways that feel real", back: "You don’t try to impress — you simply show up honestly." },
  { icon: "🌿", title: "Gentle Energy", front: "Your presence never overwhelms it soothes.", back: "Being with you feels natural and right." },
  { icon: "✨", title: "Pure Intentions", front: "Your actions feel thoughtful", back: "There’s no hidden agenda — just sincerity." },
  { icon: "🫶", title: "Emotional Safety", front: "It’s easy to be myself", back: "I never feel judged around you." },
  { icon: "🌸", title: "Soft Strength", front: "You’re gentle yet strong", back: "You hold your ground without hurting others." },
  { icon: "😊", title: "Warm Smile", front: "Your smile lingers", back: "It stays even after the moment passes." },
  { icon: "💬", title: "Good Listener", front: "You really listen", back: "Not just to reply — but to understand." },
  { icon: "🕊️", title: "Grounding Energy", front: "You make things feel steady", back: "Even when life feels uncertain." },
  { icon: "🤍", title: "Kind Nature", front: "Your kindness feels effortless", back: "It’s who you are, not something you try." },
  { icon: "🌙", title: "Quiet Comfort", front: "Silence feels okay", back: "Being together doesn’t need words." },
  { icon: "💫", title: "You", front: "Simply you", back: "And that’s more than enough." },
];

/* ---------- COMPONENT ---------- */

export default function WhyYouMatter({ setStep }) {
  const [flipped, setFlipped] = useState(null);

  return (
    <Screen>
      <FallingPetals />

      <Header>
        <Title>Why You Matter</Title>
        <Subtitle>A glimpse into what makes you extraordinary to me</Subtitle>
      </Header>

      <Cards>
        {reasons.map((item, i) => (
          <CardWrap key={i}>
            <CardInner
              animate={{ rotateY: flipped === i ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              whileTap={{ scale: 1.06 }}  /* ✅ press effect */
              onClick={() => setFlipped(flipped === i ? null : i)}
            >
              {/* FRONT */}
              <CardFace>
                <EmojiCircle>{item.icon}</EmojiCircle>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.front}</CardText>
                <BottomLine />
              </CardFace>

              {/* BACK */}
              <CardBack>
                <CardText>{item.back}</CardText>
                <BottomLine />
              </CardBack>
            </CardInner>
          </CardWrap>
        ))}
      </Cards>

      <NextButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setStep?.(10)}
      >
        One Last Thing 💌
      </NextButton>
    </Screen>
  );
}
