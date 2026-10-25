/** Scroll distance past the intro cover, so hero effects start once it has lifted away. */
export function scrollPastIntro() {
  const intro = document.getElementById("intro");
  return Math.max(0, window.scrollY - (intro?.offsetHeight ?? 0));
}
