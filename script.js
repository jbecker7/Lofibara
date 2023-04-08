var audio = document.getElementById("audio");
var playButton = document.getElementById("play");
var skipBackButton = document.getElementById("skip-back");
var skipForwardButton = document.getElementById("skip-forward");
var muteButton = document.getElementById("mute");
var songHistory = [];
var soundEffectsButton = document.getElementById("sound-effects");
var rainButton = document.querySelector('#sound-effects-dropdown div:nth-child(3) button');
var fireplaceButton = document.querySelector('#sound-effects-dropdown div:nth-child(2) button');
var oceanWavesButton = document.querySelector('#sound-effects-dropdown div:nth-child(1) button');
var mechanicalKeyboardButton = document.querySelector('#sound-effects-dropdown div:nth-child(4) button');
var rainSlider = document.querySelector('#rain-slider');
var fireplaceSlider = document.querySelector('#fireplace-slider');
var oceanWavesSlider = document.querySelector('#ocean-waves-slider');
var mechanicalKeyboardSlider = document.querySelector('#mechanical-keyboard-slider');
var backgroundButton = document.querySelector('#backgroundButton');
var rainAudio = new Audio('sounds/rain.wav');
var fireplaceAudio = new Audio('sounds/fire.wav');
var oceanWavesAudio = new Audio('sounds/ocean.wav');
var mechanicalKeyboardAudio = new Audio('sounds/keyboard.wav');
var soundEffects = [rainAudio, fireplaceAudio, oceanWavesAudio, mechanicalKeyboardAudio];
soundEffects.forEach(function (effect) {
    effect.volume = 0;
    effect.loop = true;
});
var isRainPlaying = false;
var isFireplacePlaying = false;
var isOceanWavesPlaying = false;
var isMechanicalKeyboardPlaying = false;
soundEffects.forEach(function (effect) {
    effect.volume = 0.5;
    effect.loop = true;
});
var musicFiles = ['track1.mp3', 'track2.mp3', 'track3.mp3'];
var currentIndex = -1;
function playNext() {
    if (currentIndex !== -1) {
        songHistory.push(currentIndex);
    }
    if (currentIndex === musicFiles.length - 1) {
        currentIndex = 0;
    }
    else {
        currentIndex++;
    }
    audio.src = "lofi/".concat(musicFiles[currentIndex]);
    audio.play();
}
function playPrevious() {
    if (songHistory.length > 0) {
        currentIndex = songHistory.pop();
        audio.src = "lofi/".concat(musicFiles[currentIndex]);
        audio.play();
    }
}
function playSoundEffect(effect) {
    switch (effect) {
        case "rain":
            if (rainAudio.volume === 0) {
                rainAudio.pause();
                rainAudio.currentTime = 0;
            }
            else {
                rainAudio.play();
            }
            break;
        case "fireplace":
            if (fireplaceAudio.volume === 0) {
                fireplaceAudio.pause();
                fireplaceAudio.currentTime = 0;
            }
            else {
                fireplaceAudio.play();
            }
            break;
        case "ocean":
            if (oceanWavesAudio.volume === 0) {
                oceanWavesAudio.pause();
                oceanWavesAudio.currentTime = 0;
            }
            else {
                oceanWavesAudio.play();
            }
            break;
        case "keyboard":
            if (mechanicalKeyboardAudio.volume === 0) {
                mechanicalKeyboardAudio.pause();
                mechanicalKeyboardAudio.currentTime = 0;
            }
            else {
                mechanicalKeyboardAudio.play();
            }
            break;
    }
}
rainSlider.addEventListener("input", function () {
    if (!isRainPlaying) {
        playSoundEffect("rain");
        isRainPlaying = true;
    }
    rainAudio.volume = Number(rainSlider.value) * 10;
    if (rainAudio.volume > 0 && rainAudio.paused) {
        rainAudio.play();
    }
});
fireplaceSlider.addEventListener("input", function () {
    if (!isFireplacePlaying) {
        playSoundEffect("fireplace");
        isFireplacePlaying = true;
    }
    fireplaceAudio.volume = Number(fireplaceSlider.value) * 10;
    if (fireplaceAudio.volume > 0 && fireplaceAudio.paused) {
        fireplaceAudio.play();
    }
});
oceanWavesSlider.addEventListener("input", function () {
    if (!isOceanWavesPlaying) {
        playSoundEffect("ocean");
        isOceanWavesPlaying = true;
    }
    oceanWavesAudio.volume = Number(oceanWavesSlider.value) / 10;
    if (oceanWavesAudio.volume > 0 && oceanWavesAudio.paused) {
        oceanWavesAudio.play();
    }
});
mechanicalKeyboardSlider.addEventListener("input", function () {
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
    soundEffects.forEach(function (effect) {
        effect.pause();
        effect.currentTime = 0;
    });
}
var currentBackgroundIndex = 0;
var backgrounds = ["background1.png", "background2.png", "background3.png", "background4.png"];
function nextBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    document.body.style.backgroundImage = "url(assets/".concat(backgrounds[currentBackgroundIndex], ")");
}
audio.addEventListener("ended", playNext);
playButton.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
    }
    else {
        audio.pause();
    }
});
skipBackButton.addEventListener("click", function () {
    playPrevious();
});
skipForwardButton.addEventListener("click", function () {
    playNext();
});
muteButton.addEventListener("click", function () {
    audio.muted = !audio.muted;
    stopSoundEffects();
});
playNext();
backgroundButton.addEventListener('click', function () {
    nextBackground();
});
soundEffectsButton.addEventListener("click", function () {
    toggleSoundEffectsDropdown();
});
function toggleSoundEffectsDropdown() {
    var dropdown = document.getElementById('sound-effects-dropdown');
    dropdown.classList.toggle('hidden');
}
function toggleSoundEffectsPopup() {
    var popup = document.getElementById('sound-effects-popup');
    popup.classList.toggle('hidden');
}
