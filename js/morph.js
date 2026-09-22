/**
 * Fluid Morph блок описания без пересчёта геометрии карточки.
 */
export function initMorph(descPill, descWrapper) {
  if (!descPill || !descWrapper) return;

  descPill.addEventListener('click', () => {
    const willOpen = !descPill.classList.contains('is-open');
    descPill.classList.toggle('is-open', willOpen);
    descWrapper.classList.toggle('is-open', willOpen);
  }, { passive: true });
}
