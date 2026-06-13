(() => {
  const fallbackAvatarSvg = () => `<svg width="128" height="128" viewBox="0 0 50 50" role="img" aria-label="fallback pixel cat" class="dot-avatar">
    <rect x="0" y="0" width="50" height="50" fill="transparent"/>
    <g shape-rendering="crispEdges">
      <rect x="12" y="15" width="26" height="22" fill="#171717"/>
      <rect x="14" y="13" width="7" height="7" fill="#171717"/>
      <rect x="29" y="13" width="7" height="7" fill="#171717"/>
      <rect x="14" y="17" width="22" height="18" fill="#e8a85d"/>
      <rect x="16" y="15" width="4" height="4" fill="#f4bd91"/>
      <rect x="30" y="15" width="4" height="4" fill="#f4bd91"/>
      <rect x="19" y="24" width="3" height="4" fill="#171717"/>
      <rect x="28" y="24" width="3" height="4" fill="#171717"/>
      <rect x="24" y="28" width="3" height="2" fill="#f18b86"/>
      <rect x="22" y="31" width="2" height="2" fill="#171717"/>
      <rect x="27" y="31" width="2" height="2" fill="#171717"/>
      <rect x="18" y="34" width="14" height="8" fill="#e8a85d"/>
      <rect x="20" y="35" width="10" height="6" fill="#fff1d7"/>
      <rect x="17" y="42" width="5" height="3" fill="#e8a85d"/>
      <rect x="28" y="42" width="5" height="3" fill="#e8a85d"/>
      <rect x="36" y="30" width="3" height="12" fill="#171717"/>
      <rect x="37" y="29" width="5" height="3" fill="#e8a85d"/>
      <rect x="39" y="26" width="3" height="5" fill="#e8a85d"/>
    </g>
  </svg>`;

  const placeholder = () => document.querySelector("#photo-placeholder");
  const status = () => document.querySelector("#analysis-status");
  const tags = () => document.querySelector("#feature-tags");

  const ensureAvatar = () => {
    const target = placeholder();
    if (!target) return;
    if (!target.querySelector("svg")) target.innerHTML = fallbackAvatarSvg();
    target.style.display = "grid";
    const preview = document.querySelector("#photo-preview");
    if (preview) {
      preview.style.display = "none";
      preview.removeAttribute("src");
    }
  };

  const originalRender = window.renderPoses;
  if (typeof originalRender === "function") {
    window.renderPoses = (...args) => {
      try {
        originalRender(...args);
      } catch (error) {
        console.error("renderPoses fallback", error);
      }
      ensureAvatar();
    };
  }

  const randomButton = document.querySelector("#random-btn");
  if (randomButton) {
    randomButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      try {
        if (typeof window.randomizeAvatar === "function") window.randomizeAvatar();
      } catch (error) {
        console.error("randomize fallback", error);
      }
      ensureAvatar();
      if (status()) status().textContent = "初版のピクセルねこが生まれました。";
      if (tags()) tags().innerHTML = ["Trait JSON", "generated"].map((tag) => `<span>${tag}</span>`).join("");
    }, true);
  }

  window.addEventListener("error", ensureAvatar);
  window.addEventListener("unhandledrejection", ensureAvatar);
  window.addEventListener("DOMContentLoaded", () => setTimeout(ensureAvatar, 120));
  setTimeout(ensureAvatar, 300);
})();
