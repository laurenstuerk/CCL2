// src/games/MarbelRace/audioManager.js (Using Native Browser Audio)

// --- Helper function to create and configure a sound ---
function createSound(src, volume = 1.0, loop = false) {
  const sound = new Audio(src);
  sound.volume = volume;
  sound.loop = loop;
  return sound;
}


const backgroundMusic = createSound('/audio/background-music.mp3', 0.3, true);
const hitSound = createSound('/audio/hit-sound.mp3', 0.5);
const finishSound = createSound('/audio/finish-sound.mp3', 0.7);


export const playHitSound = () => {
    hitSound.currentTime = 0;
    hitSound.play().catch(e => console.error("Error playing hit sound:", e));
};

export const playBackgroundMusic = () => {
    // Resetting currentTime ensures the music restarts from the beginning
    backgroundMusic.currentTime = 0; 
    backgroundMusic.play().catch(e => console.error("Error playing background music:", e));
};

export const stopBackgroundMusic = () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
};

export const playFinishSound = () => {
    finishSound.currentTime = 0;
    finishSound.play().catch(e => console.error("Error playing finish sound:", e));
};