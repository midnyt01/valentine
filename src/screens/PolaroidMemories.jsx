import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

import petal from "../assets/petal.png";
import heart from "../assets/heart.png";

import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";
import photo4 from "../assets/photo4.png";
import photo5 from "../assets/photo5.png";

/* ================= FALLING ANIMATION ================= */

const fall = keyframes`
  0% {
    transform: translateY(-15vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateY(115vh) rotate(360deg);
    opacity: 0;
  }
`;

/* ================= SCREEN ================= */

const Screen = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #fff2f7;
  position: relative;
  overflow: hidden;
  padding: 32px 0 70px;
`;

/* ================= FALLING DECOR ================= */

const FallingItem = styled.img`
  position: absolute;
  top: -20%;
  left: ${({ left }) => left}%;
  width: ${({ size }) => size}px;
  animation: ${fall} ${({ duration }) => duration}s linear infinite;
  pointer-events: none;
`;

const FallingDecor = () =>
  [...Array(30)].map((_, i) => (
    <FallingItem
      key={i}
      src={i % 2 === 0 ? petal : heart}
      size={i % 2 === 0 ? 28 + Math.random() * 10 : 18 + Math.random() * 6}
      left={Math.random() * 100}
      duration={10 + Math.random() * 10}
      style={{ opacity: 0.6 + Math.random() * 0.4 }}
    />
  ));

/* ================= HEADER ================= */

const Header = styled.div`
  text-align: center;
  margin-bottom: 36px;
`;

const Title = styled.h1`
  font-family: "DynaPuff", cursive;
  font-size: 34px;
  color: #f06292;
  margin-bottom: 6px;
`;

const Subtitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  color: #777;
`;

/* ================= POLAROIDS ================= */

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
`;

const Polaroid = styled.div`
  width: 230px;
  background: #ffffff;
  padding: 12px 12px 22px;
  border-radius: 6px;
  box-shadow:
    0 14px 30px rgba(0, 0, 0, 0.18),
    inset 0 0 0.5px rgba(0, 0, 0, 0.15);
  position: relative;
    margin-top: 30px;
`;

/* ================= PIN ================= */

const Pin = styled(motion.div)`
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: #f06292;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0,0,0,0.35);
  z-index: 10;
`;

const PinInner = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 8px;
  height: 8px;
  background: #ffd1e3;
  border-radius: 50%;
`;

/* ================= IMAGE ================= */

const Img = styled.img`
  width: 100%;
  height: 210px;
  object-fit: cover;
  border-radius: 4px;
`;

/* ================= TEXT ================= */

const Caption = styled.p`
  font-family: "Caveat", cursive;
  font-size: 18px;
  color: #444;
  margin-top: 10px;
  text-align: center;
`;

const Emoji = styled.div`
  text-align: center;
  font-size: 22px;
  margin-top: 4px;
`;

/* ================= CTA ================= */

const FinalButton = styled(motion.button)`
  display: block;          /* ✅ ADD THIS */
  margin: 44px auto;
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


/* ================= DATA ================= */

const memories = [
  { img: photo1, text: "Goofing around, as usual", emoji: "💗" },
  { img: photo2, text: "Cuteness level: unfair", emoji: "🥹" },
  { img: photo3, text: "Exhausted, but together", emoji: "😴" },
  { img: photo4, text: "Your smile gave me away", emoji: "💕" },
  { img: photo5, text: "Watching you shine is my favorite", emoji: "🫶" },
];

/* ================= COMPONENT ================= */

export default function PolaroidMemories({ setStep }) {
  return (
    <Screen>
      <FallingDecor />

      <Header>
        <Title>Little Things, Big Feelings</Title>
        <Subtitle>Some of us. Some of you. All special 🤍</Subtitle>
      </Header>

      <Grid>
        {memories.map((item, index) => {
          const tilt = index % 2 === 0 ? -6 : 6; // ✅ alternating tilt

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Polaroid style={{ transform: `rotate(${tilt}deg)` }}>
                {/* PIN POP ANIMATION */}
                <Pin
  initial={{ scale: 0, y: -6 }}
  whileInView={{
    scale: [0, 1.4, 1],
    y: [-6, 0, 0],
  }}
  transition={{
    delay: 0.4,
    duration: 0.8,
    ease: "easeOut",
  }}
  viewport={{ once: true }}
>
  <PinInner />
</Pin>

                <Img src={item.img} alt="memory" />
                <Caption>{item.text}</Caption>
                <Emoji>{item.emoji}</Emoji>
              </Polaroid>
            </motion.div>
          );
        })}
      </Grid>

      <FinalButton
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setStep?.(9)}
      >
        There’s One Last Thing 💌
      </FinalButton>
    </Screen>
  );
}
