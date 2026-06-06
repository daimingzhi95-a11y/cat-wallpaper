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
const ratioButtons = document.querySelectorAll("[data-ratio]");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const deviceHint = document.querySelector("#device-hint");
const stageIndex = document.querySelector(".stage-index b");
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
    brand: "ねこ図鑑", workshop: "壁紙工房", download: "壁紙を保存", previewTitle: "あなただけのねこ図鑑", desktop: "PC壁紙", mobile: "スマホ壁紙",
    customize: "ねこの見た目をカスタム", looks: "01 見た目", scene: "02 シーン", profile: "03 プロフィール", fur: "毛並み", shortFur: "短毛", longFur: "長毛",
    tail: "しっぽ", longTail: "長い", shortTail: "短い", legs: "足の長さ", shortLegs: "短い", longLegs: "長い", pattern: "模様", stripe: "しま模様", solid: "単色", patch: "ぶち",
    mainColor: "メインカラー", plants: "植物の部屋", plantsHint: "ねこが好きなグリーン", bed: "あたたかいベッド", bedHint: "やわらかくて安心", tree: "キャットタワー",
    treeHint: "好奇心いっぱいのねこへ", catName: "ねこの名前", catNameHint: "壁紙の中央に表示されます", catNamePlaceholder: "ねこの名前を入力", upload: "写真をアップロード",
    uploadHint: "正面または半身写真がおすすめ", collapse: "設定を閉じる", expand: "設定を開く", defaultMobile: "スマホ壁紙を優先して表示しています",
    manualDesktop: "PC壁紙に切り替えました", manualMobile: "スマホ壁紙に切り替えました",
  },
  zh: {
    brand: "喵图鉴", workshop: "壁纸工坊", download: "保存壁纸", previewTitle: "你的专属猫咪图鉴", desktop: "电脑壁纸", mobile: "手机壁纸",
    customize: "定制猫咪外观", looks: "01 外观", scene: "02 场景", profile: "03 身份", fur: "毛发", shortFur: "短毛", longFur: "长毛",
    tail: "尾巴", longTail: "长尾", shortTail: "短尾", legs: "腿长", shortLegs: "短腿", longLegs: "长腿", pattern: "花纹", stripe: "虎斑", solid: "纯色", patch: "花斑",
    mainColor: "主色", plants: "绿植房间", plantsHint: "猫咪喜欢的植物", bed: "温暖猫窝", bedHint: "柔软又安心", tree: "猫爬架乐园", treeHint: "适合好奇的小猫",
    catName: "猫咪名字", catNameHint: "会显示在壁纸中央", catNamePlaceholder: "输入猫咪名字", upload: "上传照片", uploadHint: "正面或半身照效果最好",
    collapse: "收起设置", expand: "展开设置", defaultMobile: "已优先显示手机壁纸", manualDesktop: "已手动切换为电脑壁纸", manualMobile: "已手动切换为手机壁纸",
  },
  en: {
    brand: "Cat Atlas", workshop: "Wallpaper Studio", download: "Save wallpaper", previewTitle: "Your personal cat atlas", desktop: "Desktop", mobile: "Mobile",
    customize: "Customize your cat", looks: "01 Looks", scene: "02 Scene", profile: "03 Profile", fur: "Fur", shortFur: "Short", longFur: "Long",
    tail: "Tail", longTail: "Long", shortTail: "Short", legs: "Legs", shortLegs: "Short", longLegs: "Long", pattern: "Pattern", stripe: "Tabby", solid: "Solid", patch: "Patch",
    mainColor: "Main color", plants: "Plant room", plantsHint: "Cat-friendly greenery", bed: "Cozy bed", bedHint: "Soft and peaceful", tree: "Cat tower", treeHint: "For curious cats",
    catName: "Cat name", catNameHint: "Shown in the center of your wallpaper", catNamePlaceholder: "Enter your cat's name", upload: "Upload photo", uploadHint: "Front or half-body photos work best",
    collapse: "Hide settings", expand: "Show settings", defaultMobile: "Mobile wallpaper is shown by default", manualDesktop: "Switched to desktop wallpaper", manualMobile: "Switched to mobile wallpaper",
  },
};

const POSES = ["sit", "loaf", "walk", "curl", "stretch", "back", "peek"];
const THEMES = {
  plants: { base: "#fbfaf6", grain: "#cfdbd4" },
  bed: { base: "#fcf7f1", grain: "#e4d3c3" },
  tree: { base: "#f5f8f4", grain: "#cad9d1" },
};

function sceneSvg(theme, width = "100%", height = "100%") {
  const scenes = {
    plants: `
      <rect width="1000" height="700" fill="#fbfaf6"/>
      <g fill="none" stroke="#789083" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity=".68">
        <path d="M104 700V490m0 54c-42-10-59-43-58-82 39 8 60 36 58 82Zm3 39c43-11 63-40 67-80-42 4-64 31-67 80Z"/>
        <path d="M885 700V475m0 54c-43-13-62-45-62-84 43 8 63 38 62 84Zm4 45c42-12 61-42 63-83-42 6-63 35-63 83Z"/>
        <path d="M770 0v120m-49 0h98l-17 92h-64Z"/>
      </g>
      <g fill="#adc3ad" opacity=".72">
        <ellipse cx="60" cy="474" rx="29" ry="67" transform="rotate(-32 60 474)"/><ellipse cx="153" cy="505" rx="29" ry="67" transform="rotate(34 153 505)"/>
        <ellipse cx="838" cy="457" rx="29" ry="67" transform="rotate(-34 838 457)"/><ellipse cx="935" cy="495" rx="29" ry="67" transform="rotate(33 935 495)"/>
        <ellipse cx="741" cy="107" rx="21" ry="47" transform="rotate(-30 741 107)"/><ellipse cx="793" cy="102" rx="21" ry="47" transform="rotate(30 793 102)"/>
      </g>
      <g fill="#d8c5a7" opacity=".84"><path d="M35 635h142l-16 65H50Z"/><path d="M814 626h146l-15 74H829Z"/></g>`,
    bed: `
      <rect width="1000" height="700" fill="#fcf7f1"/>
      <g opacity=".76">
        <path d="M57 595c29-70 150-78 190 0l18 79H38Z" fill="#d7b898" stroke="#a67f65" stroke-width="8"/>
        <path d="M92 591c24-36 92-38 120 0l10 40H80Z" fill="#f2ddc8"/>
        <path d="M754 601c30-62 145-69 186 0l18 73H738Z" fill="#c9d9d2" stroke="#809b91" stroke-width="8"/>
        <path d="M786 597c25-34 91-35 120 0l10 34H777Z" fill="#e5eee9"/>
      </g>
      <g fill="none" stroke="#cba98c" stroke-linecap="round" opacity=".54">
        <path d="M0 145c83 37 142 41 225 4s147-35 230 3 153 36 236-3 145-40 309-2" stroke-width="9"/>
        <path d="M0 169c83 37 142 41 225 4s147-35 230 3 153 36 236-3 145-40 309-2" stroke-width="4"/>
      </g>
      <g fill="#d8b798" opacity=".52"><circle cx="114" cy="110" r="22"/><circle cx="886" cy="114" r="22"/><circle cx="164" cy="85" r="10"/><circle cx="836" cy="87" r="10"/></g>`,
    tree: `
      <rect width="1000" height="700" fill="#f5f8f4"/>
      <g fill="#c8d9d1" stroke="#789087" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity=".82">
        <path d="M110 700V323m0 28h193v42H110Zm0 163h151v44H110Zm151-121v335"/>
        <path d="M890 700V245m-191 69h191v43H699Zm39 157h152v44H738Zm0-114v343"/>
        <path d="M155 514v-86h70v86M775 471v-82h72v82" fill="#e5eee9"/>
      </g>
      <g fill="none" stroke="#96ada4" stroke-width="6" opacity=".62">
        <path d="M310 0c0 75-32 90-72 132"/><circle cx="232" cy="142" r="23"/>
        <path d="M650 0c0 72 34 87 72 128"/><circle cx="728" cy="138" r="23"/>
      </g>`,
  };

  return `<svg width="${width}" height="${height}" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${scenes[theme]}</svg>`;
}

function renderScene(animate = true) {
  const theme = THEMES[state.background];
  wallpaper.style.setProperty("--grain-color", theme.grain);
  backgroundScene.innerHTML = sceneSvg(state.background);
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

ratioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.ratioLocked = true;
    setRatio(button.dataset.ratio, false);
  });
});

function fitWallpaper() {
  const maxWidth = wallpaperFrame.clientWidth * 0.94;
  const maxHeight = Math.max(150, wallpaperFrame.clientHeight - 30);
  const aspect = state.ratio === "desktop" ? 16 / 10 : 9 / 16;
  const cap = state.ratio === "desktop" ? 760 : 340;
  wallpaper.style.width = `${Math.min(maxWidth, maxHeight * aspect, cap)}px`;
}

function setRatio(ratio, automatic = true) {
  state.ratio = ratio;
  ratioButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.ratio === ratio));
  wallpaper.classList.toggle("wallpaper-desktop", ratio === "desktop");
  wallpaper.classList.toggle("wallpaper-mobile", ratio === "mobile");
  stageIndex.textContent = ratio.toUpperCase();
  const hintKey = automatic ? "defaultMobile" : `manual${ratio === "desktop" ? "Desktop" : "Mobile"}`;
  deviceHint.textContent = I18N[state.language][hintKey];
  requestAnimationFrame(fitWallpaper);
  renderPoses();
}

function applyResponsiveRatio() {
  if (!state.ratioLocked) setRatio("mobile");
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
  setRatio(state.ratio, !state.ratioLocked);
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

function drawSvgOnCanvas(ctx, svg, x, y, width) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const height = width;
      ctx.drawImage(image, x - width / 2, y - height / 2, width, height);
      resolve();
    };
    image.onerror = resolve;
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });
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
  const mobile = state.ratio === "mobile";
  const canvas = document.createElement("canvas");
  canvas.width = mobile ? 1080 : 1920;
  canvas.height = mobile ? 1920 : 1200;
  const ctx = canvas.getContext("2d");
  const points = mobile
    ? [[200, 220], [850, 420], [210, 780], [850, 1050], [220, 1470], [850, 1660]]
    : [[250, 210], [1660, 210], [230, 590], [1680, 590], [300, 1010], [1610, 1010], [950, 1060]];
  const poseWidth = mobile ? 340 : 300;

  const theme = THEMES[state.background];
  ctx.fillStyle = theme.base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await drawSceneOnCanvas(ctx, sceneSvg(state.background, canvas.width, canvas.height), canvas.width, canvas.height);
  ctx.fillStyle = theme.grain;
  for (let x = 10; x < canvas.width; x += 36) {
    for (let y = 10; y < canvas.height; y += 36) ctx.fillRect(x, y, 2, 2);
  }

  await Promise.all(points.map(([x, y], index) => drawSvgOnCanvas(ctx, poseSvg(POSES[index], index), x, y, poseWidth)));

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2 - 40;
  const photoSize = mobile ? 300 : 330;
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, photoSize / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = "#dfe9dc";
  ctx.fillRect(centerX - photoSize / 2, centerY - photoSize / 2, photoSize, photoSize);
  if (photoPreview.src) ctx.drawImage(photoPreview, centerX - photoSize / 2, centerY - photoSize / 2, photoSize, photoSize);
  ctx.restore();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.arc(centerX, centerY, photoSize / 2, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#27322f";
  ctx.textAlign = "center";
  ctx.font = `700 ${mobile ? 76 : 82}px "DM Sans", sans-serif`;
  ctx.fillText(state.name.toLowerCase(), centerX, centerY + photoSize / 2 + 110);
  ctx.fillStyle = "#60766e";
  ctx.font = `700 ${mobile ? 22 : 20}px "DM Sans", sans-serif`;
  ctx.fillText("MY TINY ROOMMATE", centerX, centerY + photoSize / 2 + 156);

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
