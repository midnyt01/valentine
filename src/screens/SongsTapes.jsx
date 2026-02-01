import { useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import waalian from "../assets/songs/Saiyaara.mp3";
import lagJaaGale from "../assets/songs/Saiyaara.mp3";
import perfect from "../assets/songs/Saiyaara.mp3";

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

const Heading = styled.h1`
  font-family: "DynaPuff", cursive;
  font-size: 32px;
  color: #f06292;
  text-align: center;
  margin-bottom: 28px;
`;

/* ================= TAPE ================= */

const Tape = styled(motion.div)`
  width: 95%;
  background: ${({ bodyColor }) => bodyColor};
  border-radius: 16px;
  padding: 15px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
  margin-bottom: 28px;
  position: relative;
`;

/* ================= SCREWS ================= */

const Screw = styled.div`
  width: 8px;
  height: 8px;
  background: #b5a293;
  border-radius: 50%;
  position: absolute;
`;

const ScrewTL = styled(Screw)`
  top: 10px;
  left: 10px;
`;
const ScrewTR = styled(Screw)`
  top: 10px;
  right: 10px;
`;
const ScrewBL = styled(Screw)`
  bottom: 10px;
  left: 10px;
`;
const ScrewBR = styled(Screw)`
  bottom: 10px;
  right: 10px;
`;

/* ================= TAPE TOP ================= */

const TapeTop = styled.div`
  text-align: center;
  font-size: 11px;
  letter-spacing: 2px;
  color: #b39c8d;
  margin-bottom: 6px;
`;

/* ================= LABEL ================= */

const TapeLabel = styled.div`
  background: ${({ labelColor }) => labelColor};
  border-radius: 10px;
  padding: 10px 12px;
  text-align: center;
`;

/* ================= TEXT ================= */

const SongTitle = styled.h3`
  font-family: "DynaPuff", cursive;
  font-size: 20px;
  margin-bottom: 4px;
`;

const SongMood = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  color: #f06292;
`;

/* ================= REELS + WINDOW ================= */

const ReelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px auto;
  width: 60%;
  background: #ffffff;
  border-radius: 20px;
  padding: 8px 10px;
`;

const Reel = styled(motion.div)`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #d8c3b8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReelSpokes = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    #c2a89b 0deg 20deg,
    transparent 20deg 40deg
  );
`;

const Window = styled.div`
  width: 90px;
  height: 30px;
  background: linear-gradient(#2b1a14, #000);
  border-radius: 4px;
  overflow: hidden;
  position: relative;


`;

const WindowText = styled(motion.div)`
  position: absolute;
  white-space: nowrap;
  color: #f8d7df;
  font-size: 15px;
  font-family: "Poppins", sans-serif;
  top: 20%;
  transform: translateY(-50%);
  padding-right: 40px;
`;

/* ================= CONTROLS ================= */

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
`;

const Time = styled.span`
  font-size: 13px;
  color: #6b5a4f;
`;

const PlayButton = styled(motion.button)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: #f06292;
  color: white;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(240, 98, 146, 0.45);
`;

const Heart = styled.span`
  font-size: 20px;
  cursor: pointer;
`;

const NextButton = styled(motion.button)`
  margin-top: 18px;
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


/* ================= COMPONENT ================= */

export default function SongsTape({setStep}) {
  const songs = [
  {
    title: "Waalian",
    mood: "Some feelings feel calm and deep 🌙",
    tilt: -10,
    src: waalian,
    bodyColor: "#f3e2d4",
    labelColor: "#fde1ea",
  },
  {
    title: "Lag Jaa Gale",
    mood: "Because closeness matters 🤍",
    tilt: 2,
    src: lagJaaGale,
    bodyColor: "#e6f2dc",
    labelColor: "#fde1ea",
  },
  {
    title: "Perfect",
    mood: "Just us, just right 💕",
    tilt: -2,
    src: perfect,
    bodyColor: "#edf0f5",
    labelColor: "#fde1ea",
  },
];

  const audioRefs = useRef([]);
  const [playing, setPlaying] = useState(null);
  const [liked, setLiked] = useState({});

  const [currentTime, setCurrentTime] = useState({});
const [duration, setDuration] = useState({});


  const togglePlay = (index) => {
    if (playing === index) {
      audioRefs.current[index].pause();
      setPlaying(null);
    } else {
      audioRefs.current.forEach((audio, i) => {
        if (audio && i !== index) audio.pause();
      });
      audioRefs.current[index].play();
      setPlaying(index);
    }
  };

  const toggleLike = (index) => {
    setLiked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const formatTime = (time = 0) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

  return (
    <Screen>
      <Wrapper>
        <Heading>
          Songs That Feel Like <br /> Valentine’s Day 💗
        </Heading>

        {songs.map((song, index) => (
          <Tape
            key={index}
            bodyColor={song.bodyColor}
            style={{ transform: `rotate(${song.tilt}deg)` }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0, repeat: Infinity }}
          >
            {/* Screws */}
            <ScrewTL />
            <ScrewTR />
            <ScrewBL />
            <ScrewBR />

            <TapeTop>SIDE A</TapeTop>

            <TapeLabel labelColor={song.labelColor}>
              <SongTitle>{song.title}</SongTitle>
              <SongMood>{song.mood}</SongMood>

              <ReelRow>
                <Reel
                  animate={playing === index ? { rotate: 360 } : { rotate: 0 }}
                  transition={
                    playing === index
                      ? { repeat: Infinity, duration: 1, ease: "linear" }
                      : { duration: 0 }
                  }
                >
                  <ReelSpokes />
                </Reel>

<Window>
  {playing === index && (
    <WindowText
      initial={{ x: "100%" }}
      animate={{ x: "-150%" }}
      transition={{
        duration: 7,       // slow = realistic
        ease: "linear",     // constant tape speed
        repeat: Infinity,
        repeatDelay: 1.5,   // tiny pause before loop
      }}
    >
      🎵 {song.title}
    </WindowText>
  )}
</Window>

                <Reel
                  animate={playing === index ? { rotate: -360 } : { rotate: 0 }}
                  transition={
                    playing === index
                      ? { repeat: Infinity, duration: 1, ease: "linear" }
                      : { duration: 0 }
                  }
                >
                  <ReelSpokes />
                </Reel>
              </ReelRow>
            </TapeLabel>

            <Controls>
<Time>
  {formatTime(currentTime[index])} / {formatTime(duration[index])}
</Time>

              <PlayButton
                whileTap={{ scale: 0.9 }}
                onClick={() => togglePlay(index)}
              >
                {playing === index ? "❚❚" : "▶"}
              </PlayButton>

              <Heart onClick={() => toggleLike(index)}>
                {liked[index] ? "❤️" : "🤍"}
              </Heart>
            </Controls>

<audio
  ref={(el) => (audioRefs.current[index] = el)}
  src={song.src}
  onTimeUpdate={(e) =>
    setCurrentTime((prev) => ({
      ...prev,
      [index]: e.target.currentTime,
    }))
  }
  onLoadedMetadata={(e) =>
    setDuration((prev) => ({
      ...prev,
      [index]: e.target.duration,
    }))
  }
/>

          </Tape>
        ))}
        <NextButton
  whileTap={{ scale: 0.92 }}
  whileHover={{ scale: 1.05 }}
  onClick={() => setStep(7)}   // change step number if needed
>
  Let’s Make Some Memories 💞
</NextButton>

      </Wrapper>
    </Screen>
  );
}
