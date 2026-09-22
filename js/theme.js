/**
 * Двухкамерный менеджер темы: аппаратный бленд без повторного расчёта размытия.
 */
export function initTheme(themeBtn) {
  if (!themeBtn) return;
  let isLightMode = false;

  themeBtn.addEventListener('click', () => {
    isLightMode = !isLightMode;
    document.body.classList.toggle('is-light-mode', isLightMode);
  }, { passive: true });
}
