(() => {
  const rangeOptions = (prefix, count) => Array.from({ length: count }, (_, index) => `${prefix}-${String(index + 1).padStart(2, "0")}`);
  const parts = {
    silhouette: rangeOptions("silhouette", 6),
    coatPattern: rangeOptions("pattern", 87),
    eyeShape: rangeOptions("eye", 18),
    eyeColor: ["black", "amber", "blue", "green", "odd-blue-green", "odd-green-blue"],
    ear: rangeOptions("ear", 9),
    mouth: rangeOptions("mouth", 7),
    muzzlePattern: rangeOptions("muzzle", 16),
    muzzleColor: ["cream", "orange", "brown", "gray", "black", "pink", "white"],
    tailBySilhouette: {
      "silhouette-01": rangeOptions("tail", 8),
      "silhouette-02": rangeOptions("tail", 7),
      "silhouette-03": rangeOptions("tail", 9),
      "silhouette-04": rangeOptions("tail", 6),
      "silhouette-05": rangeOptions("tail", 8),
      "silhouette-06": rangeOptions("tail", 5),
    },
  };
  const $ = (selector, root = document) => root.querySelector(selector);
  const optionNumber = (value) => Number(String(value || "").match(/\d+$/)?.[0] || 1);
  const pick = (values) => values[Math.floor(Math.random() * values.length)];
  const hex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  const darken = (value, amount = 42) => {
    const raw = value.replace("#", "");
    return `#${hex(parseInt(raw.slice(0, 2), 16) - amount)}${hex(parseInt(raw.slice(2, 4), 16) - amount)}${hex(parseInt(raw.slice(4, 6), 16) - amount)}`;
  };
  const structureFor = (silhouette) => [
    { body: "round", leg: "short" },
    { body: "normal", leg: "short" },
    { body: "slim", leg: "normal" },
    { body: "round", leg: "long" },
    { body: "normal", leg: "long" },
    { body: "slim", leg: "long" },
  ][optionNumber(silhouette) - 1] || { body: "round", leg: "short" };
  const label = (value) => String(value)
    .replace("silhouette", "輪郭")
    .replace("pattern", "模様")
    .replace("eye", "目")
    .replace("ear", "耳")
    .replace("mouth", "口鼻")
    .replace("muzzle", "口元")
    .replace("tail", "しっぽ")
    .replace("odd-blue-green", "オッド 青/緑")
    .replace("odd-green-blue", "オッド 緑/青")
    .replace("black", "黒").replace("amber", "琥珀").replace("blue", "青").replace("green", "緑")
    .replace("cream", "クリーム").replace("orange", "オレンジ").replace("brown", "茶").replace("gray", "グレー").replace("pink", "ピンク").replace("white", "白");
  const options = (values, selected) => values.map((value) => `<option value="${value}" ${value === selected ? "selected" : ""}>${label(value)}</option>`).join("");
  const getColor = () => $("input[name='color']:checked")?.value || "#e8a85d";
  const readMaker = () => {
    const silhouette = $("[name='silhouette']")?.value || "silhouette-01";
    const tails = parts.tailBySilhouette[silhouette] || parts.tailBySilhouette["silhouette-01"];
    const tail = tails.includes($("[name='tailStyle']")?.value) ? $("[name='tailStyle']").value : tails[0];
    return {
      silhouette,
      coatPattern: $("[name='coatPattern']")?.value || "pattern-02",
      patternShade: Number($("[name='patternShade']")?.value || 50),
      eyeShape: $("[name='eyeShape']")?.value || "eye-01",
      eyeColor: $("[name='eyeColor']")?.value || "black",
      ear: $("[name='earStyle']")?.value || "ear-03",
      mouth: $("[name='mouthStyle']")?.value || "mouth-01",
      muzzlePattern: $("[name='muzzlePattern']")?.value || "muzzle-01",
      muzzleColor: $("[name='muzzleColor']")?.value || "cream",
      muzzleShade: Number($("[name='muzzleShade']")?.value || 50),
      tail,
      fur: $("[name='fur']")?.value || "short",
    };
  };
  const buildTrait = (maker = readMaker()) => {
    const structure = structureFor(maker.silhouette);
    const mainColor = getColor();
    return {
      structure: { body: maker.silhouette, leg: structure.leg, tail: maker.tail, fur: maker.fur, ear: maker.ear },
      appearance: {
        pattern: maker.coatPattern,
        mainColor,
        subColor: "#fff1d7",
        accentColor: darken(mainColor),
        shade: maker.patternShade,
        muzzlePattern: maker.muzzlePattern,
        muzzleColor: maker.muzzleColor,
        muzzleShade: maker.muzzleShade,
        color1: mainColor,
        color2: "#fff1d7",
        color3: darken(mainColor),
        color4: "#f18b86",
        color5: "#171717",
      },
      personality: { expression: "smile", accessory: "none", personality: "curious", eyeShape: maker.eyeShape, eyeColor: maker.eyeColor, mouth: maker.mouth },
      maker: { version: "uchinoko-like-parts-v1", ...maker },
    };
  };
  const setTailOptions = () => {
    const silhouette = $("[name='silhouette']")?.value || "silhouette-01";
    const select = $("[name='tailStyle']");
    if (!select) return;
    const values = parts.tailBySilhouette[silhouette] || parts.tailBySilhouette["silhouette-01"];
    const current = values.includes(select.value) ? select.value : values[0];
    select.innerHTML = options(values, current);
  };
  const renderControls = () => {
    const panel = $("[data-panel='looks']");
    if (!panel) return;
    panel.innerHTML = `
      <div class="flow-card trait-system-note"><b>Uchinoko-like Trait System</b><p>輪郭6 / 模様87 / 目18 / 目色6 / 耳9 / 口鼻7 / 口元模様16 / 口元色7 / しっぽは輪郭ごとに変化。</p></div>
      <div class="trait-maker-grid">
        <label class="maker-field"><span>輪郭 6</span><select name="silhouette">${options(parts.silhouette, "silhouette-01")}</select></label>
        <label class="maker-field"><span>模様 87</span><select name="coatPattern">${options(parts.coatPattern, "pattern-02")}</select></label>
        <label class="maker-field"><span>模様の濃さ</span><input name="patternShade" type="range" min="0" max="100" value="50" /></label>
        <label class="maker-field"><span>目の形 18</span><select name="eyeShape">${options(parts.eyeShape, "eye-01")}</select></label>
        <label class="maker-field"><span>目色 6</span><select name="eyeColor">${options(parts.eyeColor, "black")}</select></label>
        <label class="maker-field"><span>耳 9</span><select name="earStyle">${options(parts.ear, "ear-03")}</select></label>
        <label class="maker-field"><span>口鼻 7</span><select name="mouthStyle">${options(parts.mouth, "mouth-01")}</select></label>
        <label class="maker-field"><span>口元模様 16</span><select name="muzzlePattern">${options(parts.muzzlePattern, "muzzle-01")}</select></label>
        <label class="maker-field"><span>口元色 7</span><select name="muzzleColor">${options(parts.muzzleColor, "cream")}</select></label>
        <label class="maker-field"><span>口元の濃さ</span><input name="muzzleShade" type="range" min="0" max="100" value="50" /></label>
        <label class="maker-field"><span>しっぽ</span><select name="tailStyle"></select></label>
        <label class="maker-field"><span>毛並み</span><select name="fur">${options(["short", "medium", "long"], "short")}</select></label>
      </div>
      <div class="control-card color-card"><fieldset><legend>メインカラー</legend><div class="swatch-row">
        ${["#e8a85d", "#af765c", "#8695a5", "#e5dccb", "#54545b"].map((color, i) => `<label><input type="radio" name="color" value="${color}" ${i === 0 ? "checked" : ""}/><span style="--swatch:${color}"></span></label>`).join("")}
      </div></fieldset></div>`;
    setTailOptions();
  };
  const injectStyle = () => {
    const style = document.createElement("style");
    style.textContent = `.trait-system-note{grid-column:1/-1;background:#fff2b7}.trait-system-note p{margin-top:6px;font-size:12px}.trait-maker-grid{display:grid;grid-column:1/-1;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.maker-field{display:grid;gap:7px;min-width:0;padding:10px;border:4px solid var(--ink);background:var(--panel);box-shadow:5px 5px 0 var(--shadow)}.maker-field span{color:#6a3b20;font-size:12px;font-weight:900}.maker-field select{height:38px;border:4px solid var(--ink);border-radius:0;color:var(--ink);background:var(--paper);font-weight:900}.maker-field select,.maker-field input[type=range]{width:100%}.maker-field input[type=range]{accent-color:var(--mint)}@media(max-width:700px){.trait-maker-grid{grid-template-columns:1fr;gap:9px}.maker-field{border-width:3px;box-shadow:4px 4px 0 var(--shadow)}.maker-field select{border-width:3px}}`;
    document.head.appendChild(style);
  };
  window.randomizeAvatar = function () {
    const silhouette = pick(parts.silhouette);
    const maker = {
      silhouette,
      coatPattern: pick(parts.coatPattern),
      patternShade: Math.floor(Math.random() * 101),
      eyeShape: pick(parts.eyeShape),
      eyeColor: pick(parts.eyeColor),
      ear: pick(parts.ear),
      mouth: pick(parts.mouth),
      muzzlePattern: pick(parts.muzzlePattern),
      muzzleColor: pick(parts.muzzleColor),
      muzzleShade: Math.floor(Math.random() * 101),
      tail: pick(parts.tailBySilhouette[silhouette]),
      fur: pick(["short", "medium", "long"]),
    };
    renderControls();
    Object.entries({ silhouette: maker.silhouette, coatPattern: maker.coatPattern, patternShade: maker.patternShade, eyeShape: maker.eyeShape, eyeColor: maker.eyeColor, earStyle: maker.ear, mouthStyle: maker.mouth, muzzlePattern: maker.muzzlePattern, muzzleColor: maker.muzzleColor, muzzleShade: maker.muzzleShade, tailStyle: maker.tail, fur: maker.fur }).forEach(([name, value]) => { const el = $(`[name='${name}']`); if (el) el.value = value; });
    if (typeof state !== "undefined") state.traits = buildTrait(maker);
    if (typeof renderPoses === "function") renderPoses();
    const tags = $("#feature-tags");
    if (tags) tags.innerHTML = ["Trait JSON", maker.silhouette, maker.coatPattern, maker.eyeShape].map((tag) => `<span>${tag}</span>`).join("");
  };
  const boot = () => {
    injectStyle();
    renderControls();
    const form = $("#cat-form");
    form?.addEventListener("change", (event) => {
      if (event.target?.name === "silhouette") setTailOptions();
      if (typeof state !== "undefined") state.traits = buildTrait();
      if (typeof renderPoses === "function") renderPoses();
    });
    const randomButton = $("#random-btn");
    if (randomButton) randomButton.addEventListener("click", (event) => { event.preventDefault(); window.randomizeAvatar(); });
    if (typeof state !== "undefined") state.traits = buildTrait();
    if (typeof renderPoses === "function") renderPoses(false);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
