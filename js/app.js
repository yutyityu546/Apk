import { initTheme } from './theme.js';
import { initMorph } from './morph.js';
import { initScrubber } from './scrubber.js';
import { initPlayer } from './player.js';

window.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeBtn');
  const descPill = document.getElementById('descPill');
  const descWrapper = document.getElementById('descWrapper');
  const trackWrapper = document.getElementById('trackWrapper');
  const progressFill = document.getElementById('progressFill');
  const progressThumb = document.getElementById('progressThumb');
  const curTimeEl = document.getElementById('curTime');
  const playBtn = document.getElementById('playBtn');
  const btnText = document.getElementById('btnText');
  const soundBars = document.getElementById('soundBars');
  const coverImg = document.getElementById('coverImg');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const settingsBtn = document.getElementById('settingsBtn');

  // Парящий остров: кнопка настроек
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      console.log('Панель настроек Atmospheres открыта');
    });
  }

  // Модули
  initTheme(themeBtn);
  initMorph(descPill, descWrapper);

  const scrubber = initScrubber({
    trackWrapper,
    progressFill,
    progressThumb,
    curTimeEl,
    totalSeconds: 333,
    initialSeconds: 138
  });

  initPlayer({
    playBtn,
    btnText,
    soundBars,
    coverImg,
    prevBtn,
    nextBtn,
    scrubber
  });

  setTimeout(() => scrubber.refreshMetrics(), 60);
});
