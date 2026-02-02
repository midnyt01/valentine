// IMAGES
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo1.jpg";
import photo3 from "../assets/photo1.jpg";
import photo4 from "../assets/photo1.jpg";
import photo5 from "../assets/photo1.jpg";
// SONGS
import Saiyaara from "../assets/songs/Saiyaara.mp3";
import MeroMann from "../assets/songs/Mero_Mann.webm";
import Challa from "../assets/songs/Challa.mp3";

/* ================= EXPORT LISTS ================= */

export const imagesToPreload = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
];

export const audioToPreload = [
  Saiyaara,
  MeroMann,
  Challa,
];

/* ================= PRELOAD FUNCTION ================= */

export const preloadAssets = (images = [], audios = [], onProgress) => {
  let loadedCount = 0;
  const totalAssets = images.length + audios.length;

  if (totalAssets === 0) {
    onProgress && onProgress(100);
    return;
  }

  const updateProgress = () => {
    loadedCount += 1;

    const percentage = Math.round(
      (loadedCount / totalAssets) * 100
    );

    if (onProgress) {
      onProgress(percentage);
    }
  };

  /* ---------- PRELOAD IMAGES ---------- */
  images.forEach((src) => {
    const img = new Image();
    img.src = src;

    img.onload = updateProgress;
    img.onerror = updateProgress; // fail-safe
  });

  /* ---------- PRELOAD AUDIO ---------- */
  audios.forEach((src) => {
    const audio = new Audio();
    audio.src = src;
    audio.preload = "auto";

    const handleAudioLoaded = () => {
      updateProgress();
      audio.removeEventListener("canplaythrough", handleAudioLoaded);
    };

    audio.addEventListener("canplaythrough", handleAudioLoaded);
    audio.addEventListener("error", handleAudioLoaded);

    audio.load();
  });
};