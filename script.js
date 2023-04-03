
const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const skipBackButton = document.getElementById("skip-back");
const skipForwardButton = document.getElementById("skip-forward");
const muteButton = document.getElementById("mute");
const songHistory = [];
const soundEffectsButton = document.getElementById("sound-effects");
const rainButton = document.querySelector('#sound-effects-dropdown button:nth-child(3)');
const fireplaceButton = document.querySelector('#sound-effects-dropdown button:nth-child(2)');
const oceanWavesButton = document.querySelector('#sound-effects-dropdown button:nth-child(1)');
const mechanicalKeyboardButton = document.querySelector('#sound-effects-dropdown button:nth-child(4)');
const backgroundButton = document.querySelector('#backgroundButton');
const rainAudio = new Audio('sounds/rain.wav');
const fireplaceAudio = new Audio('sounds/fire.wav');
const oceanWavesAudio = new Audio('sounds/ocean.wav');
const mechanicalKeyboardAudio = new Audio('sounds/keyboard.wav')
const soundEffects = [rainAudio, fireplaceAudio, oceanWavesAudio];
let isRainPlaying = false;
let isFireplacePlaying = false;
let isOceanWavesPlaying = false;
let isMechanicalKeyboardPlaying = false;
soundEffects.forEach(effect => {
effect.volume = 0.5;
effect.loop = true;
});

const musicFiles = ['track1.mp3', 'track2.mp3', 'track3.mp3']; 
let currentIndex = -1;

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
 currentIndex = songHistory.pop();
 audio.src = `lofi/${musicFiles[currentIndex]}`;
 audio.play();
}
}
function playSoundEffect(effect) {
    switch (effect) {
      case "rain":
        if (isRainPlaying) {
          rainAudio.pause();
          rainAudio.currentTime = 0;
          isRainPlaying = false;
        } else {
          rainAudio.play();
          isRainPlaying = true;
        }
        break;
      case "fireplace":
        if (isFireplacePlaying) {
          fireplaceAudio.pause();
          fireplaceAudio.currentTime = 0;
          isFireplacePlaying = false;
        } else {
          fireplaceAudio.play();
          isFireplacePlaying = true;
        }
        break;
      case "ocean":
        if (isOceanWavesPlaying) {
          oceanWavesAudio.pause();
          oceanWavesAudio.currentTime = 0;
          isOceanWavesPlaying = false;
        } else {
          oceanWavesAudio.play();
          isOceanWavesPlaying = true;
        }
        break;
      case "keyboard":
        if (isMechanicalKeyboardPlaying) {
          mechanicalKeyboardAudio.pause();
          mechanicalKeyboardAudio.currentTime = 0;
          isMechanicalKeyboardPlaying = false;
        } else {
          mechanicalKeyboardAudio.play();
          isMechanicalKeyboardPlaying = true;
        }
        break;
    }
  }
  
  rainButton.addEventListener("click", () => {
    playSoundEffect("rain");
  });
  
  fireplaceButton.addEventListener("click", () => {
    playSoundEffect("fireplace");
  });
  
  oceanWavesButton.addEventListener("click", () => {
    playSoundEffect("ocean");
  });
  
  mechanicalKeyboardButton.addEventListener("click", () => {
    playSoundEffect("keyboard");
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
 console.log(document.body.style.backgroundImage)
 nextBackground();
 console.log(document.body.style.backgroundImage)
});

soundEffectsButton.addEventListener("click", () => {
toggleSoundEffectsDropdown();
});

function toggleSoundEffectsDropdown() {
const dropdown = document.getElementById('sound-effects-dropdown');
dropdown.classList.toggle('hidden');
}

function toggleSoundEffectsPopup() {
const popup = document.getElementById('sound-effects-popup');
popup.classList.toggle('hidden');
}
