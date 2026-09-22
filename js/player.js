/**
 * Управление аудио-состоянием: эквалайзер, пауза вращения обложки, таймер трека.
 */
export function initPlayer({
  playBtn,
  btnText,
  soundBars,
  coverImg,
  prevBtn,
  nextBtn,
  scrubber
}) {
  let isPlaying = true;

  function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      soundBars.classList.remove('is-paused');
      btnText.textContent = 'Playing';
      coverImg.style.animationPlayState = 'running';
    } else {
      soundBars.classList.add('is-paused');
      btnText.textContent = 'Paused';
      coverImg.style.animationPlayState = 'paused';
    }
  }

  playBtn.addEventListener('click', togglePlay);

  prevBtn.addEventListener('click', () => {
    scrubber.adjustTime(-15);
  });

  nextBtn.addEventListener('click', () => {
    scrubber.adjustTime(15);
  });

  setInterval(() => {
    if (isPlaying) {
      scrubber.advanceSecond();
    }
  }, 1000);
}
