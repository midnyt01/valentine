import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import stitch from "../assets/stitch_ball.gif";

import {
  preloadAssets,
  imagesToPreload,
  audioToPreload,
} from "../utils/PreLoadAssets";

/* ---------- DOT ANIMATION ---------- */

const dotPulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

/* ---------- STYLES ---------- */

const Screen = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #ffe6ef, #ffd1e3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Character = styled(motion.img)`
  width: 120px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-family: 'DynaPuff', cursive;
  font-size: 28px;
  font-weight: 600;
  color: #f06292;
  margin-bottom: 6px;
  text-align: center;
`;


const Subtitle = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #f8a1c4;
  margin-bottom: 32px;
  text-align: center;
`;

const ProgressWrapper = styled.div`
  width: 70%;
  height: 10px;
  background: #fadadd;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: #f06292;
  border-radius: 20px;
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  background: #f06292;
  border-radius: 50%;
  animation: ${dotPulse} 1.4s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay};
`;

/* ---------- COMPONENT ---------- */

export default function LoadingScreen() {

  const [progress, setProgress] = useState(0);
useEffect(() => {
  
    preloadAssets(imagesToPreload, audioToPreload, setProgress);

    // Fallback: minimum 3s loader (UX polish)
    const minTimer = setTimeout(() => {
      if (progress === 100) setStep(2);
    }, 4000);

    return () => clearTimeout(minTimer);
  }, []);

  return (
    <Screen>
      <Character
        src={stitch}
        alt="cute character"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />

      <Title>A Valentine Moment</Title>
      <Subtitle>is being prepared for you...</Subtitle>

      <ProgressWrapper>
        <ProgressBar
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "easeInOut" }}
        />
      </ProgressWrapper>

      <Dots>
        <Dot delay="0s" />
        <Dot delay="0.2s" />
        <Dot delay="0.4s" />
      </Dots>
    </Screen>
  );
}
