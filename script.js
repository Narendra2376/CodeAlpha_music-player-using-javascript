const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const current = document.getElementById('current');
const durationEl = document.getElementById('duration');

let isPlaying = false;

// Song Info (you can load this dynamically)
const song = {
  title: 'Sample Song',
  artist: 'John Doe',
  src: 'song.mp3'
};

// Load song info
function loadSong() {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}
loadSong();

function playPause() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
}

audio.addEventListener('play', () => isPlaying = true);
audio.addEventListener('pause', () => isPlaying = false);

// Update progress bar
audio.addEventListener('timeupdate', updateProgress);

function updateProgress() {
  const { duration, currentTime } = audio;

  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;

  // Format time
  current.textContent = formatTime(currentTime);
  if (!isNaN(duration)) {
    durationEl.textContent = formatTime(duration);
  }
}

// Set progress bar on click
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Time format helper
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}
