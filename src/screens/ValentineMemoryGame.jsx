import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

/* ================= DATA ================= */

const EMOJIS = ["💖", "🌸", "💌", "🍓", "🎀", "🐻"];

/* ================= HELPERS ================= */

const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/* ================= SCREEN ================= */

const Screen = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #fff2f7;
  display: flex;
  justify-content: center;
  padding: 24px 0 40px;
`;

/* ================= WRAPPER ================= */

const Wrapper = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* ================= HEADER ================= */

const SmallText = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  color: #f59ab8;
`;

const Heading = styled.h1`
  font-family: "DynaPuff", cursive;
  font-size: 30px;
  color: #f06292;
  margin-bottom: 6px;
`;

const SubText = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  color: #777;
`;

/* ================= STATS ================= */

const Stats = styled.div`
  display: flex;
  gap: 14px;
  margin: 20px 0;
`;

const StatBox = styled.div`
  background: #ffe1ec;
  border-radius: 14px;
  padding: 14px 20px;
  text-align: center;
  min-width: 120px;
  box-shadow: 0 8px 18px rgba(240, 98, 146, 0.25);
`;

const StatLabel = styled.p`
  font-size: 13px;
  color: #666;
`;

const StatValue = styled.p`
  font-family: "DynaPuff", cursive;
  font-size: 22px;
  color: #f06292;
`;

/* ================= GRID ================= */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  width: 92%;
  margin-top: 12px;
`;
/* ================= CARD ================= */

const Card = styled(motion.div)`
  height: 70px;
  border-radius: 14px;
  background: ${({ flipped }) =>
    flipped ? "#fff" : "linear-gradient(135deg, #f06292, #ff8fb1)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(240, 98, 146, 0.4);
`;

const CardWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1; /* 🔥 makes it perfectly square */
  perspective: 800px;
`;

const CardInner = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  position: relative;
  transform-style: preserve-3d;
  cursor: pointer;
`;

const CardFace = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  font-size: 28px;
  font-family: "DynaPuff", cursive;
`;

const CardFront = styled(CardFace)`
  background: linear-gradient(135deg, #f06292, #ff8fb1);
  color: white;
  box-shadow: 0 6px 14px rgba(240, 98, 146, 0.4);
`;


const CardBack = styled(CardFace)`
  background: #ffffff;
  color: #f06292;
  transform: rotateY(180deg);
  box-shadow: 0 6px 14px rgba(240, 98, 146, 0.25);
`;


/* ================= BUTTONS ================= */

const Button = styled(motion.button)`
  margin-top: 22px;
  font-family: "DynaPuff", cursive;
  font-size: 15px;
  padding: 14px 30px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #f06292, #ff8fb1);
  color: white;
  box-shadow: 0 8px 20px rgba(240, 98, 146, 0.4);
`;

/* ================= WIN MODAL ================= */

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const WinCard = styled(motion.div)`
  background: #fff7fb;
  border-radius: 20px;
  padding: 28px 24px;
  width: 90%;
  max-width: 340px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(240, 98, 146, 0.4);
`;

const WinEmoji = styled.div`
  font-size: 40px;
;`

const WinTitle = styled.h2`
  font-family: "DynaPuff", cursive;
  color: #f06292;
  margin: 10px 0;
`;

const WinText = styled.p`
  font-size: 15px;
  color: #555;
`;

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

/* ================= COMPONENT ================= */

export default function ValentineMemoryGame({ setStep }) {
  const [cards, setCards] = useState([]);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState([]);
  const [locked, setLocked] = useState(false);

  const setupGame = () => {
    const shuffled = shuffle([...EMOJIS, ...EMOJIS]).map((emoji, i) => ({
      id: i,
      emoji,
    }));
    setCards(shuffled);
    setFirst(null);
    setSecond(null);
    setMoves(0);
    setMatched([]);
    setLocked(false);
  };

  useEffect(() => {
    setupGame();
  }, []);

  useEffect(() => {
    if (first && second) {
      setLocked(true);
      setMoves((m) => m + 1);

      if (first.emoji === second.emoji) {
        setMatched((prev) => [...prev, first.emoji]);
        resetTurn();
      } else {
        setTimeout(resetTurn, 800);
      }
    }
  }, [first, second]);

  const resetTurn = () => {
    setFirst(null);
    setSecond(null);
    setLocked(false);
  };

  const handleClick = (card) => {
    if (locked) return;
    if (card === first || matched.includes(card.emoji)) return;

    first ? setSecond(card) : setFirst(card);
  };

  const isFlipped = (card) =>
    card === first ||
    card === second ||
    matched.includes(card.emoji);

  const hasWon = matched.length === EMOJIS.length;

  return (
    <Screen>
        <BgCircles />
      <Wrapper>
        <SmallText>A little fun for today</SmallText>
        <Heading>Valentine Memory Match</Heading>
        <SubText>Match the pairs and test your memory 🧠</SubText>

        <Stats>
          <StatBox>
            <StatLabel>Moves</StatLabel>
            <StatValue>{moves}</StatValue>
          </StatBox>
          <StatBox>
            <StatLabel>Matched</StatLabel>
            <StatValue>{matched.length}/6</StatValue>
          </StatBox>
        </Stats>

        <Grid>
  {cards.map((card) => {
    const flipped = isFlipped(card);

    return (
      <CardWrapper key={card.id}>
        <CardInner
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={() => handleClick(card)}
        >
          <CardFront>?</CardFront>
          <CardBack>{card.emoji}</CardBack>
        </CardInner>
      </CardWrapper>
    );
  })}
</Grid>


        <Button onClick={setupGame} whileTap={{ scale: 0.92 }}>
          Reset Game
        </Button>

        <Button
          onClick={() => setStep(8)}
          whileTap={{ scale: 0.92 }}
        >
          Next ✨ →
        </Button>
      </Wrapper>

      {/* WIN MODAL */}
      <AnimatePresence>
        {hasWon && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WinCard
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <WinEmoji>
                🎉
              </WinEmoji>
              <WinTitle>You Won!</WinTitle>
              <WinText>
                Completed in <strong>{moves} moves</strong>
              </WinText>

              <Button onClick={setupGame} whileTap={{ scale: 0.9 }}>
                Play Again
              </Button>
            </WinCard>
          </Overlay>
        )}
      </AnimatePresence>
    </Screen>
  );
}
