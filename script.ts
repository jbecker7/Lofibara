const audio: HTMLAudioElement = document.getElementById("audio") as HTMLAudioElement;
const playButton: HTMLElement = document.getElementById("play") as HTMLElement;
const skipBackButton: HTMLElement = document.getElementById("skip-back") as HTMLElement;
const skipForwardButton: HTMLElement = document.getElementById("skip-forward") as HTMLElement;
const muteButton: HTMLElement = document.getElementById("mute") as HTMLElement;
const songHistory: number[] = [];
const soundEffectsButton: HTMLElement = document.getElementById("sound-effects") as HTMLElement;
const rainButton: HTMLElement = document.querySelector('#sound-effects-dropdown div:nth-child(3) button') as HTMLElement;
const fireplaceButton: HTMLElement = document.querySelector('#sound-effects-dropdown div:nth-child(2) button') as HTMLElement;
const oceanWavesButton: HTMLElement = document.querySelector('#sound-effects-dropdown div:nth-child(1) button') as HTMLElement;
const mechanicalKeyboardButton: HTMLElement = document.querySelector('#sound-effects-dropdown div:nth-child(4) button') as HTMLElement;
const rainSlider: HTMLInputElement = document.querySelector('#rain-slider') as HTMLInputElement;
const fireplaceSlider: HTMLInputElement = document.querySelector('#fireplace-slider') as HTMLInputElement;
const oceanWavesSlider: HTMLInputElement = document.querySelector('#ocean-waves-slider') as HTMLInputElement;
const mechanicalKeyboardSlider: HTMLInputElement = document.querySelector('#mechanical-keyboard-slider') as HTMLInputElement;
const backgroundButton: HTMLElement = document.querySelector('#backgroundButton') as HTMLElement;
const rainAudio: HTMLAudioElement = new Audio('sounds/rain.wav');
const fireplaceAudio: HTMLAudioElement = new Audio('sounds/fire.wav');
const oceanWavesAudio: HTMLAudioElement = new Audio('sounds/ocean.wav');
const mechanicalKeyboardAudio: HTMLAudioElement = new Audio('sounds/keyboard.wav')
const soundEffects: HTMLAudioElement[] = [rainAudio, fireplaceAudio, oceanWavesAudio, mechanicalKeyboardAudio];
soundEffects.forEach((effect: HTMLAudioElement) => {
  effect.volume = 0;
  effect.loop = true;
});

let isRainPlaying: boolean = false;
let isFireplacePlaying: boolean = false;
let isOceanWavesPlaying: boolean = false;
let isMechanicalKeyboardPlaying: boolean = false;
soundEffects.forEach((effect: HTMLAudioElement) => {
  effect.volume = 0.5;
  effect.loop = true;
});

const musicFiles: string[] = ['track1.mp3', 'track2.mp3', 'track3.mp3']; 

let currentIndex: number = -1;

function playNext() {
  if (currentIndex !== -1) {
    songHistory.push(currentIndex);
  }
  if (currentIndex === musicFiles.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  audio.src = `lofi/${musicFiles[currentIndex]}`;
  audio.play();
}

function playPrevious() {
  if (songHistory.length > 0) {
    currentIndex = songHistory.pop()!;
    audio.src = `lofi/${musicFiles[currentIndex]}`;
    audio.play();
  }
}
function playSoundEffect(effect: string) {
    switch (effect) {
      case "rain":
        if (rainAudio.volume === 0) {
          rainAudio.pause();
          rainAudio.currentTime = 0;
        } else {
          rainAudio.play();
        }
        break;
      case "fireplace":
        if (fireplaceAudio.volume === 0) {
          fireplaceAudio.pause();
          fireplaceAudio.currentTime = 0;
        } else {
          fireplaceAudio.play();
        }
        break;
      case "ocean":
        if (oceanWavesAudio.volume === 0) {
          oceanWavesAudio.pause();
          oceanWavesAudio.currentTime = 0;
        } else {
          oceanWavesAudio.play();
        }
        break;
      case "keyboard":
        if (mechanicalKeyboardAudio.volume === 0) {
          mechanicalKeyboardAudio.pause();
          mechanicalKeyboardAudio.currentTime = 0;
        } else {
          mechanicalKeyboardAudio.play();
        }
        break;
    }
  }
  rainSlider.addEventListener("input", () => {
    if (!isRainPlaying) {
      playSoundEffect("rain");
      isRainPlaying = true;
    }
    rainAudio.volume = Number(rainSlider.value) * 10;
    if (rainAudio.volume > 0 && rainAudio.paused) {
      rainAudio.play();
    }
  });
  
  fireplaceSlider.addEventListener("input", () => {
    if (!isFireplacePlaying) {
      playSoundEffect("fireplace");
      isFireplacePlaying = true;
    }
    fireplaceAudio.volume = Number(fireplaceSlider.value) * 10;
    if (fireplaceAudio.volume > 0 && fireplaceAudio.paused) {
      fireplaceAudio.play();
    }
  });
  
  oceanWavesSlider.addEventListener("input", () => {
    if (!isOceanWavesPlaying) {
      playSoundEffect("ocean");
      isOceanWavesPlaying = true;
    }
    oceanWavesAudio.volume = Number(oceanWavesSlider.value) / 10;
    if (oceanWavesAudio.volume > 0 && oceanWavesAudio.paused) {
      oceanWavesAudio.play();
    }
  });
  
  mechanicalKeyboardSlider.addEventListener("input", () => {
    if (!isMechanicalKeyboardPlaying) {
      playSoundEffect("keyboard");
      isMechanicalKeyboardPlaying = true;
    }
    mechanicalKeyboardAudio.volume = Number(mechanicalKeyboardSlider.value) / 10;
    if (mechanicalKeyboardAudio.volume > 0 && mechanicalKeyboardAudio.paused) {
      mechanicalKeyboardAudio.play();
    }
  });
  
  function stopSoundEffects() {
    soundEffects.forEach(effect => {
      effect.pause();
      effect.currentTime = 0;
    });
  }
  
  let currentBackgroundIndex = 0;
  const backgrounds = ["background1.png", "background2.png", "background3.png", "background4.png"];
  
  function nextBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    document.body.style.backgroundImage = `url(assets/${backgrounds[currentBackgroundIndex]})`;
  }
  
  audio.addEventListener("ended", playNext);
  
  playButton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });
  
  skipBackButton.addEventListener("click", () => {
    playPrevious();
  });
  
  skipForwardButton.addEventListener("click", () => {
    playNext();
  });
  
  muteButton.addEventListener("click", () => {
    audio.muted = !audio.muted;
    stopSoundEffects();
  });
  
  playNext();
  
  backgroundButton.addEventListener('click', () => {
    nextBackground();
  });
  
  soundEffectsButton.addEventListener("click", () => {
    toggleSoundEffectsDropdown();
  });
  
  function toggleSoundEffectsDropdown() {
    const dropdown = document.getElementById('sound-effects-dropdown') as HTMLElement;
    dropdown.classList.toggle('hidden');
  }
  
  function toggleSoundEffectsPopup() {
    const popup = document.getElementById('sound-effects-popup') as HTMLElement;
    popup.classList.toggle('hidden');
  }
    