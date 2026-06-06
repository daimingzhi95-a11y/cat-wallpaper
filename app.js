const form = document.querySelector("#cat-form");
const wallpaper = document.querySelector("#wallpaper");
const wallpaperFrame = document.querySelector(".wallpaper-frame");
const shell = document.querySelector(".game-shell");
const poseRing = document.querySelector("#pose-ring");
const backgroundScene = document.querySelector("#background-scene");
const catName = document.querySelector("#cat-name");
const wallpaperName = document.querySelector("#wallpaper-name");
const photoInput = document.querySelector("#cat-photo");
const photoPreview = document.querySelector("#photo-preview");
const photoPlaceholder = document.querySelector("#photo-placeholder");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const downloadButton = document.querySelector("#download-btn");
const drawerToggle = document.querySelector("#drawer-toggle");
const drawerLabel = document.querySelector("[data-drawer-label]");
const languageButtons = document.querySelectorAll("[data-lang]");

const state = {
  fur: "short",
  tail: "long",
  legs: "short",
  pattern: "stripe",
  color: "#e8a85d",
  background: "plants",
  ratio: "mobile",
  ratioLocked: false,
  drawerCollapsed: false,
  language: "ja",
  name: "Mochi",
  photoUrl: "",
};

const I18N = {
  ja: {
    brand: "ねこ図鑑", workshop: "壁紙工房", download: "壁紙を保存", previewTitle: "あなただけのねこ図鑑",
    customize: "ねこの見た目をカスタム", looks: "01 見た目", scene: "02 シーン", profile: "03 プロフィール", fur: "毛並み", shortFur: "短毛", longFur: "長毛",
    tail: "しっぽ", longTail: "長い", shortTail: "短い", legs: "足の長さ", shortLegs: "短い", longLegs: "長い", pattern: "模様", stripe: "しま模様", solid: "単色", patch: "ぶち",
    mainColor: "メインカラー", plants: "植物の部屋", plantsHint: "ねこが好きなグリーン", bed: "あたたかいベッド", bedHint: "やわらかくて安心", tree: "キャットタワー",
    treeHint: "好奇心いっぱいのねこへ", catName: "ねこの名前", catNameHint: "壁紙の中央に表示されます", catNamePlaceholder: "ねこの名前を入力", upload: "写真をアップロード",
    uploadHint: "正面または半身写真がおすすめ", collapse: "設定を閉じる", expand: "設定を開く",
  },
  zh: {
    brand: "喵图鉴", workshop: "壁纸工坊", download: "保存壁纸", previewTitle: "你的专属猫咪图鉴",
    customize: "定制猫咪外观", looks: "01 外观", scene: "02 场景", profile: "03 身份", fur: "毛发", shortFur: "短毛", longFur: "长毛",
    tail: "尾巴", longTail: "长尾", shortTail: "短尾", legs: "腿长", shortLegs: "短腿", longLegs: "长腿", pattern: "花纹", stripe: "虎斑", solid: "纯色", patch: "花斑",
    mainColor: "主色", plants: "绿植房间", plantsHint: "猫咪喜欢的植物", bed: "温暖猫窝", bedHint: "柔软又安心", tree: "猫爬架乐园", treeHint: "适合好奇的小猫",
    catName: "猫咪名字", catNameHint: "会显示在壁纸中央", catNamePlaceholder: "输入猫咪名字", upload: "上传照片", uploadHint: "正面或半身照效果最好",
    collapse: "收起设置", expand: "展开设置",
  },
  en: {
    brand: "Cat Atlas", workshop: "Wallpaper Studio", download: "Save wallpaper", previewTitle: "Your personal cat atlas",
    customize: "Customize your cat", looks: "01 Looks", scene: "02 Scene", profile: "03 Profile", fur: "Fur", shortFur: "Short", longFur: "Long",
    tail: "Tail", longTail: "Long", shortTail: "Short", legs: "Legs", shortLegs: "Short", longLegs: "Long", pattern: "Pattern", stripe: "Tabby", solid: "Solid", patch: "Patch",
    mainColor: "Main color", plants: "Plant room", plantsHint: "Cat-friendly greenery", bed: "Cozy bed", bedHint: "Soft and peaceful", tree: "Cat tower", treeHint: "For curious cats",
    catName: "Cat name", catNameHint: "Shown in the center of your wallpaper", catNamePlaceholder: "Enter your cat's name", upload: "Upload photo", uploadHint: "Front or half-body photos work best",
    collapse: "Hide settings", expand: "Show settings",
  },
};

const POSES = ["sit", "loaf", "walk", "curl", "stretch", "back", "peek"];
const THEMES = {
  plants: { base: "#fffaf0", grain: "#171717" },
  bed: { base: "#fff7ed", grain: "#171717" },
  tree: { base: "#fbfff0", grain: "#171717" },
};

const PANEL_THEMES = {
  plants: ["#ff94af", "#ffd85a", "#7ed7ff", "#ff8b2f", "#a8e76d", "#ff9b35"],
  bed: ["#ffa0c7", "#ffc857", "#9ee1ff", "#ff9248", "#c7ec85", "#ffb066"],
  tree: ["#ff9fb0", "#d8ee66", "#83d9ff", "#ff9c33", "#a6dd72", "#ffc247"],
};

function comicTexture(id, color) {
  return `
    <pattern id="dots-${id}" width="22" height="22" patternUnits="userSpaceOnUse">
      <rect width="22" height="22" fill="${color}"/>
      <circle cx="5" cy="5" r="2.2" fill="#171717" opacity=".14"/>
      <circle cx="16" cy="16" r="2.2" fill="#171717" opacity=".14"/>
    </pattern>
    <pattern id="check-${id}" width="38" height="38" patternUnits="userSpaceOnUse">
      <rect width="19" height="19" fill="#171717"/>
      <rect x="19" y="19" width="19" height="19" fill="#171717"/>
      <rect x="19" width="19" height="19" fill="#fffdf7"/>
      <rect y="19" width="19" height="19" fill="#fffdf7"/>
    </pattern>`;
}

function burst(cx, cy, color) {
  return Array.from({ length: 18 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 18;
    const x2 = cx + Math.cos(angle) * 210;
    const y2 = cy + Math.sin(angle) * 210;
    return `<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="4" opacity=".45"/>`;
  }).join("");
}

function star(x, y, size = 36, fill = "#ffd83d") {
  const h = size / 2;
  return `<path d="M${x} ${y - h}l${h / 3} ${h / 1.6} ${h / 1.6} ${h / 3}-${h / 1.6} ${h / 3}-${h / 3} ${h / 1.6}-${h / 3}-${h / 1.6}-${h / 1.6}-${h / 3} ${h / 1.6}-${h / 3}Z" fill="${fill}" stroke="#171717" stroke-width="7" stroke-linejoin="round"/>`;
}

function stickerSvg() {
  return `
    ${star(54, 122, 36)}
    ${star(974, 345, 28)}
    ${star(308, 1582, 28)}
    ${star(748, 1508, 24)}
    <g transform="translate(44 760)">
      <circle cx="48" cy="48" r="36" fill="#ffe14d" stroke="#171717" stroke-width="8"/>
      <rect x="31" y="38" width="8" height="8" fill="#171717"/><rect x="62" y="38" width="8" height="8" fill="#171717"/>
      <path d="M30 61c22 18 44 18 64 0" fill="none" stroke="#171717" stroke-width="7"/>
    </g>
    <g transform="translate(714 1470)">
      <path d="M0 82c42-70 106-70 148 0" fill="none" stroke="#171717" stroke-width="28"/>
      <path d="M0 82c42-70 106-70 148 0" fill="none" stroke="#ff5e63" stroke-width="20"/>
      <path d="M20 82c31-46 77-46 108 0" fill="none" stroke="#ffd83d" stroke-width="20"/>
      <path d="M42 82c20-25 44-25 66 0" fill="none" stroke="#41c7ff" stroke-width="20"/>
      <ellipse cx="-2" cy="96" rx="42" ry="24" fill="#fffdf7" stroke="#171717" stroke-width="7"/>
    </g>
    <g transform="translate(900 226)">
      <ellipse cx="27" cy="52" rx="28" ry="48" fill="#55c5f6" stroke="#171717" stroke-width="7"/>
      <ellipse cx="66" cy="73" rx="27" ry="42" fill="#ff91b0" stroke="#171717" stroke-width="7"/>
      <ellipse cx="5" cy="36" rx="27" ry="40" fill="#ffd85a" stroke="#171717" stroke-width="7"/>
      <path d="M24 96l-26 70M66 113l-6 67" stroke="#171717" stroke-width="5"/>
    </g>
    <g transform="translate(862 612) rotate(-12)">
      <rect x="0" y="28" width="78" height="62" fill="#ff5e8a" stroke="#171717" stroke-width="7"/>
      <rect x="31" y="28" width="17" height="62" fill="#68d7ff" stroke="#171717" stroke-width="5"/>
      <rect x="-6" y="20" width="90" height="22" fill="#ffd85a" stroke="#171717" stroke-width="7"/>
      <path d="M26 20c-22-28-2-47 18-9M51 20c21-31 47-11 14 8" fill="none" stroke="#171717" stroke-width="6"/>
    </g>
    <g transform="translate(770 1370) rotate(-12)">
      <path d="M0 0h154v82l-154 30Z" fill="#fffdf7" stroke="#171717" stroke-width="8"/>
      <path d="M22 2v78M54 2v92M86 2v82M118 2v70" stroke="#ff5e8a" stroke-width="14"/>
    </g>`;
}

function comicSceneSvg(theme, width = "100%", height = "100%") {
  const colors = PANEL_THEMES[theme] || PANEL_THEMES.plants;
  const panels = [
    [74, 240, 280, 420, colors[0], "a", burst(214, 440, "#8f2848")],
    [662, 230, 286, 428, colors[1], "b", burst(805, 428, "#9b6b00")],
    [72, 720, 286, 376, colors[2], "c", burst(215, 900, "#005b8d")],
    [684, 720, 284, 376, colors[3], "d", burst(824, 902, "#9c3300")],
    [72, 1144, 286, 442, colors[4], "e", burst(215, 1350, "#36720a")],
    [684, 1138, 284, 446, colors[5], "f", burst(824, 1350, "#9c3300")],
  ];
  const defs = panels.map((panel) => {
    const [x, y, w, h, color, id] = panel;
    return `${comicTexture(id, color)}<clipPath id="clip-${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>`;
  }).join("");
  const panelMarkup = panels.map(([x, y, w, h, , id, rays]) => `
    <g>
      <rect x="${x + 12}" y="${y + 12}" width="${w}" height="${h}" fill="#171717"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#dots-${id})" stroke="#171717" stroke-width="8"/>
      <g clip-path="url(#clip-${id})">${rays}</g>
    </g>`).join("");

  return `<svg width="${width}" height="${height}" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>${defs}</defs>
    <rect width="1080" height="1920" fill="#fffaf0"/>
    <g opacity=".72">
      <circle cx="408" cy="346" r="4" fill="#171717"/><circle cx="431" cy="359" r="4" fill="#171717"/><circle cx="454" cy="372" r="4" fill="#171717"/><circle cx="477" cy="385" r="4" fill="#171717"/><circle cx="500" cy="398" r="4" fill="#171717"/>
      <circle cx="525" cy="414" r="4" fill="#171717"/><circle cx="548" cy="428" r="4" fill="#171717"/><circle cx="571" cy="442" r="4" fill="#171717"/><circle cx="594" cy="456" r="4" fill="#171717"/>
      <circle cx="410" cy="386" r="4" fill="#171717"/><circle cx="434" cy="399" r="4" fill="#171717"/><circle cx="458" cy="412" r="4" fill="#171717"/><circle cx="482" cy="425" r="4" fill="#171717"/><circle cx="506" cy="438" r="4" fill="#171717"/>
    </g>
    ${panelMarkup}
    <rect x="438" y="1372" width="176" height="176" fill="url(#check-a)" opacity=".9"/>
    ${stickerSvg()}
  </svg>`;
}

function renderScene(animate = true) {
  const theme = THEMES[state.background];
  wallpaper.style.setProperty("--grain-color", theme.grain);
  backgroundScene.innerHTML = comicSceneSvg(state.background);
  if (animate && window.gsap) {
    gsap.fromTo(backgroundScene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: "power2.out", overwrite: true });
  }
}

function selectedValue(name) {
  return form.querySelector(`[name="${name}"]:checked`).value;
}

function darken(hex, amount = 42) {
  const raw = hex.replace("#", "");
  const num = parseInt(raw, 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 255) - amount);
  const b = Math.max(0, (num & 255) - amount);
  return `#${[r, g, b].map((part) => part.toString(16).padStart(2, "0")).join("")}`;
}

function patternMarkup(type, dark) {
  if (type === "solid") return "";
  if (type === "patch") {
    return `<path d="M44 51c10-12 18-11 27-2-4 10-11 14-22 11M91 57c11-7 20-5 24 5-9 8-16 10-25 4" fill="${dark}" opacity=".48"/>`;
  }
  return `<path d="M52 45l7 14M69 41l5 16M88 43l-2 15M104 50l-5 13" stroke="${dark}" stroke-width="6" stroke-linecap="round" opacity=".78"/>`;
}

function poseSvg(pose, index) {
  const color = state.color;
  const dark = darken(color);
  const outline = "#38443f";
  const cream = "#f6ead7";
  const tailLong = state.tail === "long";
  const longLegs = state.legs === "long";
  const longFur = state.fur === "long";
  const px = (x, y, w, h, fill = color) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
  const block = (x, y, w, h, fill = color) => `${px(x - 4, y - 4, w + 8, h + 8, outline)}${px(x, y, w, h, fill)}`;
  const face = (x, y) => `
    ${px(x + 12, y + 18, 5, 5, outline)}${px(x + 29, y + 18, 5, 5, outline)}
    ${px(x + 22, y + 27, 6, 4, "#e87373")}
    ${px(x + 18, y + 34, 7, 3, outline)}${px(x + 29, y + 34, 7, 3, outline)}`;
  const ears = (x, y) => `${block(x + 4, y, 10, 10)}${block(x + 32, y, 10, 10)}`;
  const stripes = (x, y) => {
    if (state.pattern === "solid") return "";
    if (state.pattern === "patch") return `${px(x + 7, y + 10, 13, 8, dark)}${px(x + 33, y + 28, 10, 8, dark)}`;
    return `${px(x + 10, y + 8, 5, 14, dark)}${px(x + 21, y + 6, 5, 16, dark)}${px(x + 32, y + 10, 5, 13, dark)}`;
  };
  const fluff = (x, y) => longFur ? `${px(x - 6, y + 12, 6, 6, cream)}${px(x + 44, y + 15, 6, 6, cream)}${px(x + 8, y + 44, 6, 6, cream)}` : "";
  const legs = (x, y) => longLegs ? `${block(x + 6, y + 43, 8, 20)}${block(x + 31, y + 43, 8, 20)}` : `${block(x + 8, y + 48, 8, 13)}${block(x + 29, y + 48, 8, 13)}`;
  const tail = (x, y, dir = 1) => {
    if (dir < 0) {
      return tailLong
        ? `${block(x - 11, y + 31, 11, 11)}${block(x - 19, y + 20, 11, 11)}${block(x - 17, y + 9, 10, 10)}`
        : `${block(x - 12, y + 34, 12, 12)}`;
    }
    return tailLong
      ? `${block(x + 42, y + 31, 11, 11)}${block(x + 50, y + 20, 11, 11)}${block(x + 48, y + 9, 10, 10)}`
      : `${block(x + 41, y + 34, 12, 12)}`;
  };
  const head = (x, y, showFace = true) => `${ears(x, y)}${block(x, y + 10, 48, 40)}${stripes(x, y)}${showFace ? face(x, y + 10) : px(x + 20, y + 23, 10, 8, dark)}`;
  const body = (x, y, w = 50, h = 38) => `${block(x, y, w, h)}${px(x + 8, y + 6, Math.max(12, w - 19), Math.max(9, h - 18), cream)}`;

  const bodies = {
    sit: `${body(26, 43, 45, 35)}${legs(28, 37)}${head(25, 18)}${tail(26, 43)}`,
    loaf: `${body(20, 53, 60, 26)}${head(27, 27)}${tail(28, 49)}`,
    walk: `${body(17, 48, 63, 28)}${head(20, 25)}${legs(20, 35)}${tail(34, 44)}`,
    curl: `${body(22, 49, 58, 31)}${head(24, 27)}${block(17, 64, 16, 12)}${tail(24, 43, -1)}`,
    stretch: `${body(14, 51, 68, 25)}${head(20, 29)}${block(12, 72, 18, 10)}${block(67, 72, 18, 10)}${tail(36, 43)}`,
    back: `${body(24, 43, 49, 38)}${legs(27, 36)}${head(25, 18, false)}${tail(27, 42)}`,
    peek: `${body(22, 55, 56, 26)}${head(25, 33)}${block(20, 75, 18, 8)}${tail(30, 49)}`,
  };

  return `<svg width="100" height="100" viewBox="0 0 100 100" role="img" aria-label="猫咪姿势 ${index + 1}" shape-rendering="crispEdges">
    <rect width="100" height="100" fill="none"/>
    ${bodies[pose]}
  </svg>`;
}

function renderPoses(animate = true) {
  poseRing.innerHTML = POSES.map(
    (pose, index) => `<div class="pose pose-${index}" style="--cat-color:${state.color}">${poseSvg(pose, index)}</div>`,
  ).join("");
  photoPlaceholder.innerHTML = poseSvg("sit", 0);

  if (animate && window.gsap) {
    gsap.fromTo(
      ".pose",
      { scale: 0.86, autoAlpha: 0, y: 10 },
      { scale: 1, autoAlpha: 1, y: 0, duration: 0.55, ease: "back.out(1.5)", stagger: 0.055, overwrite: true },
    );
  }
}

function syncState() {
  state.fur = selectedValue("fur");
  state.tail = selectedValue("tail");
  state.legs = selectedValue("legs");
  state.pattern = selectedValue("pattern");
  state.color = selectedValue("color");
  const nextBackground = selectedValue("background");
  state.name = catName.value.trim() || "my cat";
  wallpaperName.textContent = state.name;
  if (state.background !== nextBackground) {
    state.background = nextBackground;
    renderScene();
  }
  renderPoses();
}

form.addEventListener("change", syncState);
catName.addEventListener("input", () => {
  state.name = catName.value.trim() || "my cat";
  wallpaperName.textContent = state.name;
});

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;
  if (state.photoUrl) URL.revokeObjectURL(state.photoUrl);
  state.photoUrl = URL.createObjectURL(file);
  photoPreview.src = state.photoUrl;
  photoPreview.style.display = "block";
  photoPlaceholder.style.display = "none";
  if (window.gsap) gsap.fromTo(".photo-frame", { scale: 0.82 }, { scale: 1, duration: 0.65, ease: "elastic.out(1, 0.55)" });
});

function fitWallpaper() {
  const maxWidth = wallpaperFrame.clientWidth * 0.94;
  const maxHeight = Math.max(150, wallpaperFrame.clientHeight - 30);
  const aspect = 9 / 16;
  const cap = 340;
  wallpaper.style.width = `${Math.min(maxWidth, maxHeight * aspect, cap)}px`;
}

function applyMobileWallpaper() {
  state.ratio = "mobile";
  wallpaper.classList.add("wallpaper-mobile");
  requestAnimationFrame(fitWallpaper);
  renderPoses();
}

function applyResponsiveRatio() {
  applyMobileWallpaper();
}

function updateDrawerLabel() {
  drawerLabel.textContent = I18N[state.language][state.drawerCollapsed ? "expand" : "collapse"];
}

function setLanguage(language) {
  state.language = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  languageButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.lang === language));
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = I18N[language][element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = I18N[language][element.dataset.i18nPlaceholder];
  });
  updateDrawerLabel();
  applyMobileWallpaper();
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

drawerToggle.addEventListener("click", () => {
  state.drawerCollapsed = !state.drawerCollapsed;
  shell.classList.toggle("drawer-collapsed", state.drawerCollapsed);
  drawerToggle.setAttribute("aria-expanded", String(!state.drawerCollapsed));
  updateDrawerLabel();
  requestAnimationFrame(fitWallpaper);
  setTimeout(fitWallpaper, 450);
  if (window.gsap) gsap.fromTo(wallpaper, { scale: 0.98 }, { scale: 1, duration: 0.45, ease: "power2.out" });
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    tabPanels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === button.dataset.tab));
    if (window.gsap) {
      gsap.fromTo(
        `[data-panel="${button.dataset.tab}"]`,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    }
  });
});

function drawSvgOnCanvas(ctx, svg, x, y, width, rotation = 0) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const height = width;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(image, -width / 2, -height / 2, width, height);
      ctx.restore();
      resolve();
    };
    image.onerror = resolve;
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });
}

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function drawPixelatedImage(ctx, image, x, y, width, height, rotation = 0) {
  const sample = document.createElement("canvas");
  sample.width = 120;
  sample.height = Math.round(120 * (height / width));
  const sampleCtx = sample.getContext("2d");
  const imageRatio = image.width / image.height;
  const targetRatio = width / height;
  let sx = 0;
  let sy = 0;
  let sw = image.width;
  let sh = image.height;
  if (imageRatio > targetRatio) {
    sw = image.height * targetRatio;
    sx = (image.width - sw) / 2;
  } else {
    sh = image.width / targetRatio;
    sy = (image.height - sh) / 2;
  }
  sampleCtx.drawImage(image, sx, sy, sw, sh, 0, 0, sample.width, sample.height);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "#171717";
  ctx.fillRect(-width / 2 + 30, -height / 2 + 30, width, height);
  ctx.fillStyle = "#fffdf7";
  ctx.fillRect(-width / 2 - 28, -height / 2 - 28, width + 56, height + 56);
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 16;
  ctx.strokeRect(-width / 2 - 28, -height / 2 - 28, width + 56, height + 56);
  ctx.drawImage(sample, -width / 2, -height / 2, width, height);
  ctx.restore();
  ctx.imageSmoothingEnabled = true;
}

function drawSceneOnCanvas(ctx, svg, width, height) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0, width, height);
      resolve();
    };
    image.onerror = resolve;
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });
}

async function downloadWallpaper() {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");
  const posePoints = [
    [210, 445, 250, -8],
    [810, 430, 250, 8],
    [214, 910, 250, -4],
    [825, 910, 250, 7],
    [214, 1360, 250, 5],
    [825, 1360, 250, -7],
  ];

  const theme = THEMES[state.background];
  ctx.fillStyle = theme.base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await drawSceneOnCanvas(ctx, comicSceneSvg(state.background, canvas.width, canvas.height), canvas.width, canvas.height);
  ctx.fillStyle = theme.grain;
  ctx.globalAlpha = 0.14;
  for (let x = 10; x < canvas.width; x += 18) {
    for (let y = 10; y < canvas.height; y += 18) ctx.fillRect(x, y, 2, 2);
  }
  ctx.globalAlpha = 1;

  await Promise.all(posePoints.map(([x, y, width, rotation], index) => drawSvgOnCanvas(ctx, poseSvg(POSES[index], index), x, y, width, rotation)));

  const centerX = canvas.width / 2;
  const centerY = 890;
  const photo = photoPreview.src ? await loadImage(photoPreview.src) : null;
  if (photo) {
    drawPixelatedImage(ctx, photo, centerX, centerY, 500, 650, -4);
  } else {
    await drawSvgOnCanvas(ctx, poseSvg("sit", 0), centerX, centerY, 560, -4);
  }

  const link = document.createElement("a");
  link.download = `${state.name || "my-cat"}-wallpaper.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

downloadButton.addEventListener("click", downloadWallpaper);

renderScene(false);
setLanguage("ja");
applyResponsiveRatio();
window.addEventListener("resize", () => {
  applyResponsiveRatio();
  fitWallpaper();
});

if (window.gsap) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.from(".game-header > *, .stage-heading > *, .customizer-top > *", { autoAlpha: 0, y: 12, duration: 0.6, ease: "power2.out", stagger: 0.05 });
    gsap.from(".wallpaper", { autoAlpha: 0, scale: 0.94, duration: 0.9, ease: "power3.out" });
    gsap.to(".pose", { y: -7, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { each: 0.15, from: "random" } });
  });
}
