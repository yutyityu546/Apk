/**
 * Аппаратный скруббер (Zero-Lag 120 FPS, кэш геометрии, Pointer Capture API).
 */
export function initScrubber({
  trackWrapper,
  progressFill,
  progressThumb,
  curTimeEl,
  totalSeconds = 333,
  initialSeconds = 138,
  onSeek
}) {
  let currentSeconds = initialSeconds;
  let cachedWidth = 362;
  let cachedRect = null;
  let isDragging = false;
  let lastRenderedSec = -1;

  function refreshMetrics() {
    cachedRect = trackWrapper.getBoundingClientRect();
    cachedWidth = cachedRect.width;
    render();
  }

  function render() {
    const progress = currentSeconds / totalSeconds;
    progressFill.style.transform = `scaleX(${progress}) translate3d(0, 0, 0)`;
    const exactX = progress * cachedWidth;
    progressThumb.style.transform = `translate3d(${exactX}px, -50%, 0)`;

    if (currentSeconds !== lastRenderedSec) {
      lastRenderedSec = currentSeconds;
      const m = (currentSeconds / 60) | 0;
      const s = currentSeconds % 60;
      curTimeEl.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    }
  }

  function updateFromPointer(e) {
    if (!cachedRect) cachedRect = trackWrapper.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
    const ratio = Math.max(0, Math.min(1, (clientX - cachedRect.left) / cachedWidth));
    currentSeconds = Math.round(ratio * totalSeconds);
    render();
    if (onSeek) onSeek(currentSeconds);
  }

  trackWrapper.addEventListener('pointerdown', (e) => {
    isDragging = true;
    trackWrapper.classList.add('is-scrubbing');
    cachedRect = trackWrapper.getBoundingClientRect();
    cachedWidth = cachedRect.width;
    trackWrapper.setPointerCapture(e.pointerId);
    updateFromPointer(e);
  });

  trackWrapper.addEventListener('pointermove', (e) => {
    if (isDragging) updateFromPointer(e);
  });

  function endPointer(e) {
    if (!isDragging) return;
    isDragging = false;
    trackWrapper.classList.remove('is-scrubbing');
    try { trackWrapper.releasePointerCapture(e.pointerId); } catch (_) {}
  }

  trackWrapper.addEventListener('pointerup', endPointer);
  trackWrapper.addEventListener('pointercancel', endPointer);
  window.addEventListener('resize', refreshMetrics, { passive: true });

  refreshMetrics();

  return {
    advanceSecond: () => {
      if (!isDragging) {
        currentSeconds++;
        if (currentSeconds >= totalSeconds) currentSeconds = 0;
        render();
      }
    },
    adjustTime: (deltaSeconds) => {
      currentSeconds = Math.max(0, Math.min(totalSeconds, currentSeconds + deltaSeconds));
      render();
    },
    getCurrentSeconds: () => currentSeconds,
    refreshMetrics
  };
}
