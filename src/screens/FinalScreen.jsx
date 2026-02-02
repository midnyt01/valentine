import styled from "styled-components";
import { motion } from "framer-motion";

/* ---------- SCREEN ---------- */

const Screen = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #fff2f7;
  display: flex;
  align-items: center;        /* ✅ vertical center */
  justify-content: center;    /* ✅ horizontal center */
  position: relative;
  overflow: hidden;
  padding: 24px 0;
`;

const CenterBlock = styled.div`
  width: 90%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


/* ---------- FALLING PETALS ---------- */

const Petal = styled(motion.div)`
  position: absolute;
  top: -40px;
  font-size: 18px;
  opacity: 0.6;
`;

const petals = Array.from({ length: 14 });

/* ---------- CONTENT ---------- */

const Wrapper = styled(motion.div)`
  width: 100%;
  max-width: 420px;
  text-align: center;
  padding: 0 16px;
`;

/* ---------- TEXT ---------- */

const SmallText = styled.p`
  font-family: "Caveat", cursive;
  color: #f5a0bb;
  font-size: 18px;
  margin-bottom: 4px;
`;

const Title = styled.h1`
  font-family: "DynaPuff", cursive;
  color: #f06292;
  font-size: 34px;
  margin-bottom: 24px;
`;

/* ---------- CARD ---------- */

const Card = styled(motion.div)`
  background: #ffd6e7;
  border-radius: 22px;
  padding: 30px 22px 26px;
  box-shadow: 0 16px 36px rgba(240, 98, 146, 0.25);
`;

/* ---------- HEART ---------- */

const HeartCircle = styled(motion.div)`
  width: 82px;
  height: 82px;
  margin: 0 auto 14px;
  border-radius: 50%;
  background: rgba(240, 98, 146, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
`;

const HeartEmoji = styled(motion.span)`
  font-size: 36px;
  line-height: 1;
`;


/* ---------- MAIN TEXT ---------- */

const MainText = styled.h2`
  font-family: "DynaPuff", cursive;
  font-size: 26px;
  color: #f06292;
  margin-bottom: 6px;
`;

const SubText = styled.p`
  font-family: "Poppins", sans-serif;
  color: #6d4b5c;
  font-size: 14px;
  margin-bottom: 18px;
`;

/* ---------- HEART ROW ---------- */

const HeartRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 22px;
`;

const SmallHeart = styled(motion.span)`
  font-size: 20px;
`;

/* ---------- SIGNATURE ---------- */

const SignatureBox = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 14px;
  padding: 14px 10px;
  margin-bottom: 22px;
`;

const Signature = styled.div`
  font-family: "DynaPuff", cursive;
  color: #f06292;
  font-size: 18px;
`;

const DateText = styled.div`
  font-family: "Poppins", sans-serif;
  color: #6d4b5c;
  font-size: 13px;
  margin-top: 4px;
`;

/* ---------- BUTTON ---------- */

const FinalButton = styled(motion.button)`
  margin: 0 auto;
  font-family: "DynaPuff", cursive;
  font-size: 16px;
  padding: 16px 36px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #f06292, #ff8fb1);
  color: white;
  box-shadow: 0 10px 26px rgba(240, 98, 146, 0.45);
`;

/* ---------- COMPONENT ---------- */

export default function FinalScreen({ setStep }) {
  return (
    <Screen>
      {/* Petals */}
      {petals.map((_, i) => (
        <Petal
          key={i}
          initial={{ y: -40, x: Math.random() * window.innerWidth }}
          animate={{ y: "110vh", rotate: 360 }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          🌸
        </Petal>
      ))}

        <CenterBlock>

      <Wrapper
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SmallText>the grand finale…</SmallText>
        <Title>One Last Valentine Thought</Title>

        <Card>
          <HeartCircle>
  <HeartEmoji
    animate={{ scale: [1, 1.12, 1] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
  >
    💝
  </HeartEmoji>
</HeartCircle>


          <MainText>Sent With Care</MainText>
          <SubText>Just For You</SubText>

          <HeartRow>
            {[...Array(7)].map((_, i) => (
              <SmallHeart
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 }}
              >
                💗
              </SmallHeart>
            ))}
          </HeartRow>

          <SignatureBox>
            <Signature>Always 💞</Signature>
            <DateText>Sunday, January 18, 2026</DateText>
          </SignatureBox>

          <FinalButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setStep(1)}
          >
            See Again ✨ ↺
          </FinalButton>
        </Card>
      </Wrapper>
      </CenterBlock>
    </Screen>
  );
}
