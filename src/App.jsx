import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";



import PageWrapper from "./components/PageWrapper";
import LoadingScreen from "./screens/Loading";
import ValentineQuestion from "./screens/Question";
import NoOption from "./screens/NoOption";
import LetterClosed from "./screens/LetterClosed";
import OpenLetter from "./screens/OpenLetter";
import SongsTape from "./screens/SongsTapes";
import ValentineMemoryGame from "./screens/ValentineMemoryGame";
import PolaroidMemories from "./screens/PolaroidMemories";
import WhyYouMatter from "./screens/WhyYouMatter";
import FinalThought from "./screens/FinalThought";
import FinalScreen from "./screens/FinalScreen";

export default function App() {
  const [step, setStep] = useState(10);

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <AnimatePresence mode="wait">
      {step === 1 && (
        <PageWrapper key="loading">
          <LoadingScreen />
        </PageWrapper>
      )}

      {step === 2 && (
        <PageWrapper key="question">
          <ValentineQuestion setStep={setStep} />
        </PageWrapper>
      )}

      {step === 3 && (
        <PageWrapper key="no-option">
          <NoOption setStep={setStep} />
        </PageWrapper>
      )}  

      {step === 4 && (
        <PageWrapper key="letter-closed">
          <LetterClosed setStep={setStep} />
        </PageWrapper>
      )}
      {step === 5 && (
        <PageWrapper key="open-letter">
          <OpenLetter setStep={setStep} />
        </PageWrapper>
      )}
      {step === 6 && (
        <PageWrapper key="songs-tape">
          <SongsTape setStep={setStep} />
        </PageWrapper>
      )}
      {step === 7 && (
        <PageWrapper key="valentine-memory-game">
          <ValentineMemoryGame setStep={setStep} />
        </PageWrapper>
      )}
      {step === 8 && (
        <PageWrapper key="polaroid-memories">
          <PolaroidMemories setStep={setStep} />
        </PageWrapper>
      )}
      {step === 9 && (
        <PageWrapper key="why-you-matter">
          <WhyYouMatter setStep={setStep} />
        </PageWrapper>
      )}
      {step === 10 && (
        <PageWrapper key="final-thought">
          <FinalThought setStep={setStep} />
        </PageWrapper>
      )}
      {step === 11 && (
        <PageWrapper key="final-screen">
          <FinalScreen setStep={setStep} />
        </PageWrapper>
      )}

    </AnimatePresence>
  );
}
