const form = document.querySelector("#cat-form");
const wallpaper = document.querySelector("#wallpaper");
const wallpaperFrame = document.querySelector(".wallpaper-frame");
const shell = document.querySelector(".game-shell");
const poseRing = document.querySelector("#pose-ring");
const backgroundScene = document.querySelector("#background-scene");
const catName = document.querySelector("#cat-name");
const wallpaperName = document.querySelector("#wallpaper-name");
const photoInput = document.querySelector("#cat-photo");
const cameraInput = document.querySelector("#cat-camera");
const photoPreview = document.querySelector("#photo-preview");
const photoPlaceholder = document.querySelector("#photo-placeholder");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const downloadButton = document.querySelector("#download-btn");
const avatarButton = document.querySelector("#avatar-btn");
const randomButton = document.querySelector("#random-btn");
const analysisStatus = document.querySelector("#analysis-status");
const featureTags = document.querySelector("#feature-tags");
const orderButton = document.querySelector("#order-btn");
const orderForm = document.querySelector("#order-form");
const orderSubmit = document.querySelector("#order-submit");
const orderResult = document.querySelector("#order-result");
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
  analysis: null,
  traits: null,
};

const I18N = {
  ja: {
    brand: "ピクタウン", workshop: "头像工房", download: "头像を保存", previewTitle: "正面ピクセルねこ头像",
    customize: "写真から作って、細部を調整", photoStep: "01 写真", looks: "02 見た目", scene: "02 シーン", profile: "03 仕上げ", fur: "毛並み", shortFur: "短毛", longFur: "長毛",
    tail: "しっぽ", longTail: "長い", shortTail: "短い", legs: "足の長さ", shortLegs: "短い", longLegs: "長い", pattern: "模様", stripe: "しま模様", solid: "単色", patch: "ぶち",
    mainColor: "メインカラー", plants: "植物の部屋", plantsHint: "ねこが好きなグリーン", bed: "あたたかいベッド", bedHint: "やわらかくて安心", tree: "キャットタワー",
    treeHint: "好奇心いっぱいのねこへ", catName: "ねこの名前", catNameHint: "头像ファイル名に使います", catNamePlaceholder: "ねこの名前を入力", upload: "写真をアップロード",
    uploadHint: "正面写真がおすすめ", camera: "カメラで撮影", cameraHint: "撮った写真から生成", analysisTitle: "まず写真から特徴を読む",
    analysisIdle: "写真は保存せず、色・模様などの要素だけを使って初版のピクセルねこを作ります。", analyzing: "特徴を見ています...", generated: "初版のピクセルねこが生まれました。原图は自動で削除しました。",
    avatarDownload: "头像を保存", randomize: "ランダム生成", randomHint: "ワンクリックで Trait JSON を作成", orderTitle: "3Dプリント实体化", orderHint: "気に入ったら、この猫を小さなフィギュアにできます。",
    orderButton: "3Dプリントを相談", orderSize: "サイズ", orderContact: "連絡先", orderSubmit: "下書きを作成", orderReady: "注文メモを作りました。生成猫の設定だけを使います。",
    featureWarm: "暖色", featureCool: "寒色", featurePattern: "模様あり", collapse: "設定を閉じる", expand: "設定を開く",
  },
  zh: {
    brand: "ピクタウン", workshop: "头像工坊", download: "保存头像", previewTitle: "正面像素猫头像",
    customize: "先放照片，再调整细节", photoStep: "01 照片", looks: "02 外观", scene: "02 场景", profile: "03 完成", fur: "毛发", shortFur: "短毛", longFur: "长毛",
    tail: "尾巴", longTail: "长尾", shortTail: "短尾", legs: "腿长", shortLegs: "短腿", longLegs: "长腿", pattern: "花纹", stripe: "虎斑", solid: "纯色", patch: "花斑",
    mainColor: "主色", plants: "绿植房间", plantsHint: "猫咪喜欢的植物", bed: "温暖猫窝", bedHint: "柔软又安心", tree: "猫爬架乐园", treeHint: "适合好奇的小猫",
    catName: "猫咪名字", catNameHint: "用于头像文件名", catNamePlaceholder: "输入猫咪名字", upload: "上传照片", uploadHint: "正面照片效果最好",
    camera: "拍照生成", cameraHint: "从现场照片提取要素", analysisTitle: "先从照片提取要素", analysisIdle: "照片不会被做成像素画，只提取颜色、花纹等要素生成第一版小猫。",
    analyzing: "正在观察特征...", generated: "第一版像素猫生成好了。原图已自动删除。", avatarDownload: "保存头像", randomize: "随机生成", randomHint: "一键生成 Trait JSON",
    orderTitle: "3D 打印实体化", orderHint: "喜欢的话，可以把这只猫做成小摆件。", orderButton: "咨询 3D 打印", orderSize: "尺寸", orderContact: "联系方式",
    orderSubmit: "生成下单草稿", orderReady: "已生成下单草稿。只使用生成猫配置，不保存原图。", featureWarm: "暖色", featureCool: "冷色",
    featurePattern: "有花纹", collapse: "收起设置", expand: "展开设置",
  },
  en: {
    brand: "ピクタウン", workshop: "Avatar Studio", download: "Save avatar", previewTitle: "Front pixel cat avatar",
    customize: "Start from a photo, then tune details", photoStep: "01 Photo", looks: "02 Looks", scene: "02 Scene", profile: "03 Finish", fur: "Fur", shortFur: "Short", longFur: "Long",
    tail: "Tail", longTail: "Long", shortTail: "Short", legs: "Legs", shortLegs: "Short", longLegs: "Long", pattern: "Pattern", stripe: "Tabby", solid: "Solid", patch: "Patch",
    mainColor: "Main color", plants: "Plant room", plantsHint: "Cat-friendly greenery", bed: "Cozy bed", bedHint: "Soft and peaceful", tree: "Cat tower", treeHint: "For curious cats",
    catName: "Cat name", catNameHint: "Used for the avatar file name", catNamePlaceholder: "Enter your cat's name", upload: "Upload photo", uploadHint: "Front photos work best",
    camera: "Take photo", cameraHint: "Extract cues from the photo", analysisTitle: "Extract photo cues first", analysisIdle: "The photo is not pixelated directly. It only supplies color, pattern, and other cues for the first cat.",
    analyzing: "Reading visual cues...", generated: "First pixel cat generated. The original image was deleted automatically.", avatarDownload: "Save avatar", randomize: "Randomize", randomHint: "One click to create Trait JSON",
    orderTitle: "3D print figure", orderHint: "If you like it, turn this cat into a small figure.", orderButton: "Ask about 3D print", orderSize: "Size", orderContact: "Contact",
    orderSubmit: "Create order draft", orderReady: "Order draft created. It uses only the generated cat settings.", featureWarm: "Warm tone", featureCool: "Cool tone",
    featurePattern: "Patterned", collapse: "Hide settings", expand: "Show settings",
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

const TRAIT_OPTIONS = {
  body: ["round", "normal", "slim"],
  leg: ["short", "normal", "long"],
  tail: ["short", "normal", "long"],
  fur: ["short", "medium", "long"],
  ear: ["round", "triangle", "fold"],
  pattern: ["solid", "tabby", "calico", "cow", "smoke", "random"],
  expression: ["smile", "wink", "sleepy", "surprised", "cool"],
  accessory: ["none", "glasses", "ribbon", "hat", "flower"],
  personality: ["lazy", "cheerful", "calm", "shy", "curious"],
};

function createTrait(overrides = {}) {
  const appearance = overrides.appearance || {};
  const colors = appearance.colors || {};
  return {
    structure: {
      body: "round",
      leg: "short",
      tail: "long",
      fur: "short",
      ear: "triangle",
      ...(overrides.structure || {}),
    },
    appearance: {
      pattern: "tabby",
      mainColor: "#e8a85d",
      subColor: "#fff1d7",
      accentColor: "#9b642e",
      color1: colors.color1 || appearance.color1 || appearance.mainColor || "#e8a85d",
      color2: colors.color2 || appearance.color2 || appearance.subColor || "#fff1d7",
      color3: colors.color3 || appearance.color3 || appearance.accentColor || "#9b642e",
      color4: colors.color4 || appearance.color4 || "#f18b86",
      color5: colors.color5 || appearance.color5 || "#171717",
      ...appearance,
    },
    personality: {
      expression: "smile",
      accessory: "none",
      personality: "curious",
      ...(overrides.personality || {}),
    },
  };
}

function legacyPatternToTrait(value) {
  return { stripe: "tabby", patch: "cow", solid: "solid" }[value] || "tabby";
}

function traitPatternToLegacy(value) {
  return { tabby: "stripe", calico: "patch", cow: "patch", smoke: "patch", random: "patch", solid: "solid" }[value] || "stripe";
}

function selectedTraitFromControls() {
  return createTrait({
    structure: {
      body: state.traits?.structure?.body || "round",
      leg: selectedValue("legs") || "short",
      tail: selectedValue("tail") || "long",
      fur: selectedValue("fur") || "short",
      ear: state.traits?.structure?.ear || "triangle",
    },
    appearance: {
      pattern: legacyPatternToTrait(selectedValue("pattern")),
      mainColor: selectedValue("color") || "#e8a85d",
      subColor: state.traits?.appearance?.subColor || "#fff1d7",
      accentColor: darken(selectedValue("color") || "#e8a85d"),
    },
    personality: state.traits?.personality || {},
  });
}

function syncStateFromTrait() {
  const traits = state.traits || createTrait();
  state.fur = traits.structure.fur === "long" ? "long" : "short";
  state.tail = traits.structure.tail === "short" ? "short" : "long";
  state.legs = traits.structure.leg === "long" ? "long" : "short";
  state.pattern = traitPatternToLegacy(traits.appearance.pattern);
  state.color = traits.appearance.mainColor;
}

function applyTrait(traits, { updateControls = true } = {}) {
  state.traits = createTrait(traits);
  syncStateFromTrait();
  if (updateControls) {
    setRadioValue("fur", state.fur);
    setRadioValue("tail", state.tail);
    setRadioValue("legs", state.legs);
    setRadioValue("pattern", state.pattern);
    setRadioValue("color", state.color);
  }
  renderPoses();
}

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
  return form.querySelector(`[name="${name}"]:checked`)?.value || state[name];
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
  const traits = state.traits || createTrait();
  const color = traits.appearance.mainColor;
  const dark = traits.appearance.accentColor || darken(color);
  const palette = {
    base: color,
    dark,
    outline: "#171717",
    cream: "#fff1d7",
    blush: "#f18b86",
    eye: "#17211e",
    shine: "#fffaf0",
    innerEar: "#f4bd91",
  };
  const options = {
    body: traits.structure.body,
    fur: traits.structure.fur === "long" ? "long" : "short",
    tail: traits.structure.tail === "short" ? "short" : "long",
    legs: traits.structure.leg === "long" ? "long" : "short",
    ear: traits.structure.ear,
    pattern: traits.appearance.pattern,
    expression: traits.personality.expression,
    accessory: traits.personality.accessory,
  };
  const grid = 50;
  const baseCoat = new Map();
  const baseDetail = new Map();
  const key = (x, y) => `${x},${y}`;
  const inGrid = (x, y) => x >= 0 && x < grid && y >= 0 && y < grid;
  const setDot = (map, x, y, fill) => {
    const dx = Math.round(x);
    const dy = Math.round(y);
    if (inGrid(dx, dy)) map.set(key(dx, dy), { x: dx, y: dy, fill });
  };
  const hasCoatAt = (map, x, y) => map.has(key(Math.round(x), Math.round(y)));
  const setDetailOn = (coatMap, detailMap, x, y, fill) => {
    if (hasCoatAt(coatMap, x, y)) setDot(detailMap, x, y, fill);
  };
  const disk = (map, cx, cy, r, fill) => {
    for (let y = Math.floor(cy - r - 1); y <= Math.ceil(cy + r + 1); y++) {
      for (let x = Math.floor(cx - r - 1); x <= Math.ceil(cx + r + 1); x++) {
        if ((x - cx) ** 2 + (y - cy) ** 2 <= r ** 2) setDot(map, x, y, fill);
      }
    }
  };
  const ellipse = (map, cx, cy, rx, ry, fill) => {
    for (let y = Math.floor(cy - ry - 1); y <= Math.ceil(cy + ry + 1); y++) {
      for (let x = Math.floor(cx - rx - 1); x <= Math.ceil(cx + rx + 1); x++) {
        if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1) setDot(map, x, y, fill);
      }
    }
  };
  const triangle = (map, points, fill) => {
    const [a, b, c] = points;
    const area = (p1, p2, p3) => Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2);
    const total = area(a, b, c);
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    for (let y = Math.min(...ys) - 1; y <= Math.max(...ys) + 1; y++) {
      for (let x = Math.min(...xs) - 1; x <= Math.max(...xs) + 1; x++) {
        const dot = { x, y };
        if (Math.abs(area(dot, b, c) + area(a, dot, c) + area(a, b, dot) - total) < 0.35) setDot(map, x, y, fill);
      }
    }
  };
  const line = (map, points, r, fill) => {
    points.slice(1).forEach((point, index) => {
      const prev = points[index];
      const steps = Math.max(Math.abs(point.x - prev.x), Math.abs(point.y - prev.y)) * 4;
      for (let step = 0; step <= steps; step++) {
        const t = step / steps;
        disk(map, prev.x + (point.x - prev.x) * t, prev.y + (point.y - prev.y) * t, r, fill);
      }
    });
  };

  if (options.ear === "round") {
    disk(baseCoat, 17, 10, 5, palette.base);
    disk(baseCoat, 33, 10, 5, palette.base);
  } else if (options.ear === "fold") {
    triangle(baseCoat, [{ x: 11, y: 16 }, { x: 17, y: 5 }, { x: 22, y: 16 }], palette.base);
    triangle(baseCoat, [{ x: 28, y: 16 }, { x: 33, y: 5 }, { x: 39, y: 16 }], palette.base);
  } else {
    triangle(baseCoat, [{ x: 10, y: 17 }, { x: 16, y: 3 }, { x: 24, y: 17 }], palette.base);
    triangle(baseCoat, [{ x: 26, y: 17 }, { x: 34, y: 3 }, { x: 40, y: 17 }], palette.base);
  }

  const headRx = options.body === "slim" ? 15.2 : 16.8;
  const bodyRx = options.body === "round" ? 15.8 : options.body === "slim" ? 12.8 : 14.2;
  ellipse(baseCoat, 25, 20, headRx, 11.2, palette.base);
  ellipse(baseCoat, 28, 34, bodyRx, 10.6, palette.base);

  if (options.tail === "long") {
    line(baseCoat, [{ x: 38, y: 32 }, { x: 43, y: 28 }, { x: 45, y: 22 }, { x: 43, y: 16 }], 2.15, palette.base);
  } else {
    line(baseCoat, [{ x: 38, y: 34 }, { x: 45, y: 32 }, { x: 46, y: 29 }], 2, palette.base);
  }

  ellipse(baseDetail, 25, 25, 7.2, 4.5, palette.cream);
  [[16, 11], [17, 12], [18, 13], [33, 11], [32, 12], [31, 13]].forEach(([x, y]) => setDetailOn(baseCoat, baseDetail, x, y, palette.innerEar));
  [[12, 27], [13, 27], [37, 27], [38, 27]].forEach(([x, y]) => setDetailOn(baseCoat, baseDetail, x, y, palette.blush));

  const stripeDots = {
    tabby: [[21, 13], [24, 12], [27, 13], [21, 14], [24, 14], [27, 14], [12, 21], [13, 21], [38, 21], [39, 21], [32, 32], [33, 32], [34, 33], [34, 34], [42, 28], [44, 23], [43, 18]],
    calico: [[13, 20], [14, 19], [15, 20], [16, 21], [31, 32], [32, 32], [33, 33], [34, 34], [35, 35]],
    cow: [[13, 20], [14, 20], [15, 21], [31, 32], [32, 32], [33, 33], [25, 38], [26, 38]],
    smoke: [[19, 18], [20, 18], [21, 18], [31, 32], [32, 32], [33, 32], [34, 33], [35, 33]],
    random: [[15, 20], [23, 13], [32, 32], [35, 35], [26, 39], [41, 22]],
  };
  (stripeDots[options.pattern] || []).forEach(([x, y], dotIndex) => {
    const fill = options.pattern === "calico" && dotIndex > 3 ? "#f0c45b" : options.pattern === "cow" ? "#343434" : palette.dark;
    disk(baseDetail, x, y, options.pattern === "random" ? 1.25 : 1.05, fill);
  });
  if (options.fur === "long") {
    [[9, 29], [12, 33], [19, 43], [29, 44], [38, 42]].forEach(([x, y]) => setDetailOn(baseCoat, baseDetail, x, y, palette.cream));
  }

  const mangaEye = (cx, cy, wink = false) => {
    if (wink) {
      [[cx - 2, cy], [cx - 1, cy], [cx, cy + 1], [cx + 1, cy], [cx + 2, cy]].forEach(([x, y]) => setDetailOn(baseCoat, baseDetail, x, y, palette.eye));
      return;
    }
    disk(baseDetail, cx, cy, 2.25, palette.eye);
    [[cx - 1, cy - 1], [cx, cy - 2]].forEach(([x, y]) => setDetailOn(baseCoat, baseDetail, x, y, palette.shine));
    setDetailOn(baseCoat, baseDetail, cx + 1, cy + 1, "#2d3b38");
  };
  if (options.expression === "wink") {
    mangaEye(18, 22, true);
    mangaEye(32, 22, false);
  } else if (options.expression === "sleepy") {
    [[16, 23], [17, 23], [18, 23], [19, 23], [20, 23], [30, 23], [31, 23], [32, 23], [33, 23], [34, 23]].forEach(([x, y]) => setDetailOn(baseCoat, baseDetail, x, y, palette.eye));
  } else if (options.expression === "cool") {
    [[15, 21], [16, 21], [17, 21], [18, 21], [19, 21], [20, 21], [21, 22], [29, 22], [30, 21], [31, 21], [32, 21], [33, 21], [34, 21], [35, 21]].forEach(([x, y]) => setDetailOn(baseCoat, baseDetail, x, y, palette.eye));
  } else {
    mangaEye(18, 22, false);
    mangaEye(32, 22, false);
    if (options.expression === "surprised") [[18, 25], [32, 25]].forEach(([x, y]) => setDetailOn(baseCoat, baseDetail, x, y, palette.eye));
  }
  [[25, 25], [24, 27], [26, 27], [23, 28], [27, 28]].forEach(([x, y]) => setDetailOn(baseCoat, baseDetail, x, y, palette.eye));

  const accessoryDots = {
    none: [],
    glasses: [[15, 20], [16, 20], [17, 20], [18, 20], [19, 20], [20, 20], [30, 20], [31, 20], [32, 20], [33, 20], [34, 20], [35, 20], [21, 21], [29, 21]],
    ribbon: [[36, 14], [37, 13], [38, 14], [39, 13], [39, 14], [40, 14], [38, 15], [39, 15]],
    hat: [[18, 8], [19, 8], [20, 8], [21, 8], [22, 8], [23, 8], [24, 8], [25, 8], [26, 8], [27, 8], [23, 5], [24, 5], [25, 5], [26, 5], [23, 6], [24, 6], [25, 6], [26, 6], [22, 7], [27, 7]],
    flower: [[37, 15], [36, 15], [38, 15], [37, 14], [37, 16], [36, 14], [38, 16]],
  };
  (accessoryDots[options.accessory] || []).forEach(([x, y]) => setDot(baseDetail, x, y, options.accessory === "flower" ? "#f18b86" : options.accessory === "ribbon" ? "#e95678" : options.accessory === "hat" ? "#343434" : palette.eye));

  const dot = ({ x, y, fill }) => `<rect class="pixel-dot" x="${x}" y="${y}" width="1" height="1" fill="${fill}"/>`;
  const nearMap = (map, x, y, radius = 1) => {
    for (let oy = -radius; oy <= radius; oy++) {
      for (let ox = -radius; ox <= radius; ox++) {
        if (map.has(key(x + ox, y + oy))) return true;
      }
    }
    return false;
  };
  const drawLegs = (phase = 0) => {
    const coat = new Map();
    const detail = new Map();
    const legTop = options.legs === "long" ? 40.4 : 41.6;
    const legRy = options.legs === "long" ? 4.8 : 3.5;
    const legs = phase === 0
      ? [[16.2, legTop + 0.5, 2.6, legRy, 14.8, 45.2], [22.8, legTop - 0.7, 2.6, legRy, 24.4, 44.2], [31.1, legTop + 0.6, 2.7, legRy, 29.4, 45.2], [37.0, legTop - 0.5, 2.7, legRy, 38.5, 44.2]]
      : [[16.2, legTop - 0.7, 2.6, legRy, 17.6, 44.2], [22.8, legTop + 0.6, 2.6, legRy, 21.2, 45.2], [31.1, legTop - 0.5, 2.7, legRy, 32.5, 44.2], [37.0, legTop + 0.6, 2.7, legRy, 35.5, 45.2]];
    legs.forEach(([cx, cy, rx, ry, footX, footY]) => {
      ellipse(coat, cx, cy, rx, ry, palette.base);
      ellipse(coat, footX, footY, 2.7, 1.1, palette.base);
      setDetailOn(coat, detail, footX, footY, palette.cream);
    });
    const mergedCoat = new Map([...baseCoat, ...coat]);
    const mergedOutline = outlineFor(mergedCoat, baseCoat);
    const outline = new Map();
    mergedOutline.forEach((item, itemKey) => {
      if (nearMap(coat, item.x, item.y, 2)) outline.set(itemKey, item);
    });
    return [
      ...Array.from(outline.values()).map((item) => dot(item)),
      ...Array.from(coat.values()).map((item) => dot(item)),
      ...Array.from(detail.values()).map((item) => dot(item)),
    ].join("");
  };
  const outlineFor = (coatMap, excludeNearMap = null) => {
    const outline = new Map();
    coatMap.forEach(({ x, y }) => {
      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const nx = x + ox;
          const ny = y + oy;
          if (!inGrid(nx, ny) || coatMap.has(key(nx, ny))) continue;
          if (excludeNearMap) {
            let nearExcluded = false;
            for (let ey = -1; ey <= 1; ey++) {
              for (let ex = -1; ex <= 1; ex++) {
                if (excludeNearMap.has(key(nx + ex, ny + ey))) nearExcluded = true;
              }
            }
            if (nearExcluded) continue;
          }
          setDot(outline, nx, ny, palette.outline);
        }
      }
    });
    return outline;
  };
  const baseOutline = outlineFor(baseCoat);
  const baseDots = [
    ...Array.from(baseOutline.values()).map((item) => dot(item)),
    ...Array.from(baseCoat.values()).map((item) => dot(item)),
    ...Array.from(baseDetail.values()).map((item) => dot(item)),
  ].join("");

  return `<svg width="128" height="128" viewBox="0 0 50 50" role="img" aria-label="50方块点阵猫 ${index + 1}" class="dot-avatar">
    <g class="cat-body">${baseDots}</g>
    <g class="walk-frame walk-frame-a">${drawLegs(0)}</g>
    <g class="walk-frame walk-frame-b">${drawLegs(1)}</g>
  </svg>`;
}

function renderPoses(animate = true) {
  poseRing.innerHTML = "";
  photoPlaceholder.innerHTML = poseSvg("front", 0);
  photoPlaceholder.style.display = "grid";
  photoPreview.style.display = "none";
  photoPreview.removeAttribute("src");

  if (animate && window.gsap) {
    gsap.fromTo(
      ".photo-frame",
      { scale: 0.9, autoAlpha: 0.7 },
      { scale: 1, autoAlpha: 1, duration: 0.45, ease: "back.out(1.5)", overwrite: true },
    );
  }
}

function syncState() {
  state.traits = selectedTraitFromControls();
  syncStateFromTrait();
  const nextBackground = selectedValue("background") || state.background;
  state.name = catName.value.trim() || "my cat";
  wallpaperName.textContent = state.name;
  if (nextBackground && state.background !== nextBackground) {
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

function setRadioValue(name, value) {
  const input = form.querySelector(`[name="${name}"][value="${value}"]`);
  if (input) input.checked = true;
}

function randomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function randomizeAvatar() {
  const mainColor = randomChoice(Array.from(form.querySelectorAll('input[name="color"]')).map((input) => input.value));
  const trait = createTrait({
    structure: {
      body: randomChoice(TRAIT_OPTIONS.body),
      leg: randomChoice(TRAIT_OPTIONS.leg),
      tail: randomChoice(TRAIT_OPTIONS.tail),
      fur: randomChoice(TRAIT_OPTIONS.fur),
      ear: randomChoice(TRAIT_OPTIONS.ear),
    },
    appearance: {
      pattern: randomChoice(TRAIT_OPTIONS.pattern),
      mainColor,
      subColor: randomChoice(["#fff1d7", "#f4ead7", "#ffe8d5", "#e8f2dd"]),
      accentColor: darken(mainColor),
      color1: mainColor,
      color2: "#fff1d7",
      color3: darken(mainColor),
      color4: randomChoice(["#f18b86", "#ffd95c", "#33d0bd", "#8ec9ff"]),
      color5: "#171717",
    },
    personality: {
      expression: randomChoice(TRAIT_OPTIONS.expression),
      accessory: randomChoice(TRAIT_OPTIONS.accessory),
      personality: randomChoice(TRAIT_OPTIONS.personality),
    },
  });
  applyTrait(trait);
  featureTags.innerHTML = ["Trait JSON", trait.structure.body, trait.appearance.pattern, trait.personality.expression]
    .map((tag) => `<span>${tag}</span>`)
    .join("");
  analysisStatus.textContent = I18N[state.language].generated;
  if (window.gsap) gsap.fromTo(".photo-frame", { rotate: -2, scale: 0.94 }, { rotate: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
}

function nearestColor(hex) {
  const swatches = Array.from(form.querySelectorAll('input[name="color"]')).map((input) => input.value);
  const toRgb = (value) => {
    const raw = value.replace("#", "");
    return [parseInt(raw.slice(0, 2), 16), parseInt(raw.slice(2, 4), 16), parseInt(raw.slice(4, 6), 16)];
  };
  const target = toRgb(hex);
  return swatches.reduce((best, swatch) => {
    const rgb = toRgb(swatch);
    const score = rgb.reduce((sum, part, index) => sum + (part - target[index]) ** 2, 0);
    return score < best.score ? { color: swatch, score } : best;
  }, { color: swatches[0], score: Infinity }).color;
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((part) => Math.max(0, Math.min(255, Math.round(part))).toString(16).padStart(2, "0")).join("")}`;
}

function tagList(features) {
  const dict = I18N[state.language];
  return [
    features.warmTone ? dict.featureWarm : dict.featureCool,
    features.patterned ? dict.featurePattern : "",
  ].filter(Boolean);
}

async function analyzeImage(file) {
  analysisStatus.textContent = I18N[state.language].analyzing;
  featureTags.innerHTML = "";
  const url = URL.createObjectURL(file);
  const image = await loadImage(url);
  if (!image) {
    URL.revokeObjectURL(url);
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let totalR = 0;
  let totalG = 0;
  let totalB = 0;
  let coatR = 0;
  let coatG = 0;
  let coatB = 0;
  let coatCount = 0;
  let contrast = 0;
  let count = 0;
  const isSkinTone = (pr, pg, pb) => {
    const max = Math.max(pr, pg, pb);
    const min = Math.min(pr, pg, pb);
    return pr > 95 && pg > 55 && pb > 35 && max - min > 18 && pr > pg * 0.98 && pg > pb * 1.08;
  };
  const isUsefulCoatColor = (pr, pg, pb) => {
    const light = (pr + pg + pb) / 3;
    const chroma = Math.max(pr, pg, pb) - Math.min(pr, pg, pb);
    return !isSkinTone(pr, pg, pb) && light > 34 && light < 236 && chroma > 12;
  };

  for (let y = 0; y < canvas.height; y += 2) {
    for (let x = 0; x < canvas.width; x += 2) {
      const index = (y * canvas.width + x) * 4;
      const pr = data[index];
      const pg = data[index + 1];
      const pb = data[index + 2];
      totalR += pr;
      totalG += pg;
      totalB += pb;
      if (isUsefulCoatColor(pr, pg, pb)) {
        coatR += pr;
        coatG += pg;
        coatB += pb;
        coatCount++;
      }
      contrast += Math.abs(pr - pg) + Math.abs(pg - pb) + Math.abs(pb - pr);
      count++;
    }
  }

  const sourceCount = coatCount || count;
  const avgR = (coatCount ? coatR : totalR) / sourceCount;
  const avgG = (coatCount ? coatG : totalG) / sourceCount;
  const avgB = (coatCount ? coatB : totalB) / sourceCount;
  const warmTone = avgR + avgG * 0.25 > avgB + 40;
  const patterned = contrast / count > 82;
  const color = nearestColor(rgbToHex(avgR, avgG, avgB));
  const trait = createTrait({
    structure: {
      body: warmTone ? "round" : "normal",
      leg: "short",
      tail: warmTone ? "long" : "short",
      fur: patterned ? "medium" : "short",
      ear: "triangle",
    },
    appearance: {
      pattern: patterned ? "tabby" : "solid",
      mainColor: color,
      subColor: warmTone ? "#fff1d7" : "#eef1e8",
      accentColor: darken(color),
      color1: color,
      color2: warmTone ? "#fff1d7" : "#eef1e8",
      color3: darken(color),
      color4: "#f18b86",
      color5: "#171717",
    },
    personality: {
      expression: patterned ? "cool" : "smile",
      accessory: "none",
      personality: warmTone ? "cheerful" : "calm",
    },
  });
  URL.revokeObjectURL(url);

  return {
    warmTone,
    patterned,
    color,
    previewDataUrl: canvas.toDataURL("image/png"),
    pattern: patterned ? "patch" : "solid",
    tail: warmTone ? "long" : "short",
    trait,
  };
}

async function handlePhotoFile(file) {
  if (!file) return;
  if (state.photoUrl) URL.revokeObjectURL(state.photoUrl);
  const features = await analyzeImage(file);
  if (features) {
    state.analysis = features;
    applyTrait(features.trait);
    featureTags.innerHTML = [...tagList(features), "Trait JSON"].map((tag) => `<span>${tag}</span>`).join("");
    analysisStatus.textContent = I18N[state.language].generated;
  }
  state.photoUrl = "";
  photoInput.value = "";
  if (cameraInput) cameraInput.value = "";
  if (window.gsap) gsap.fromTo(".photo-frame", { scale: 0.82 }, { scale: 1, duration: 0.65, ease: "elastic.out(1, 0.55)" });
}

photoInput.addEventListener("change", () => {
  handlePhotoFile(photoInput.files[0]);
});

if (cameraInput) {
  cameraInput.addEventListener("change", () => {
    handlePhotoFile(cameraInput.files[0]);
  });
}

function orderDraft() {
  const trait = state.traits || selectedTraitFromControls();
  return {
    name: state.name,
    size: document.querySelector("#order-size")?.value || "5cm",
    contact: document.querySelector("#order-contact")?.value || "",
    note: document.querySelector("#order-note")?.value || "",
    pipeline: "Photo/Camera/Random -> Trait JSON -> SVG -> PNG/Pixel Art/STL",
    trait,
    catConfig: {
      color: state.color,
      fur: state.fur,
      tail: state.tail,
      legs: state.legs,
      pattern: state.pattern,
      accessories: [],
    },
  };
}

function downloadJsonDraft() {
  const blob = new Blob([JSON.stringify(orderDraft(), null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.download = `${state.name || "pixel-cat"}-3d-order-draft.json`;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
  orderResult.textContent = I18N[state.language].orderReady;
}

if (orderButton) {
  orderButton.addEventListener("click", () => {
    orderForm.hidden = !orderForm.hidden;
  });
}

if (orderSubmit) {
  orderSubmit.addEventListener("click", downloadJsonDraft);
}

function fitWallpaper() {
  const maxWidth = wallpaperFrame.clientWidth * 0.94;
  const maxHeight = Math.max(150, wallpaperFrame.clientHeight - 30);
  const aspect = 1;
  const cap = 390;
  wallpaper.style.width = `${Math.min(maxWidth, maxHeight * aspect, cap)}px`;
}

function applyMobileWallpaper() {
  state.ratio = "mobile";
  wallpaper.classList.remove("wallpaper-mobile");
  wallpaper.classList.add("avatar-preview");
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
  applyMobileWallpaper();
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

if (drawerToggle) {
  drawerToggle.addEventListener("click", () => {
    state.drawerCollapsed = !state.drawerCollapsed;
    shell.classList.toggle("drawer-collapsed", state.drawerCollapsed);
    drawerToggle.setAttribute("aria-expanded", String(!state.drawerCollapsed));
    updateDrawerLabel();
    requestAnimationFrame(fitWallpaper);
    setTimeout(fitWallpaper, 450);
    if (window.gsap) gsap.fromTo(wallpaper, { scale: 0.98 }, { scale: 1, duration: 0.45, ease: "power2.out" });
  });
}

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

function drawAvatarBackdrop(ctx, size) {
  const theme = THEMES[state.background];
  ctx.fillStyle = theme.base;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#171717";
  ctx.globalAlpha = 0.12;
  for (let x = 24; x < size; x += 26) {
    for (let y = 24; y < size; y += 26) ctx.fillRect(x, y, 4, 4);
  }
  ctx.globalAlpha = 1;

  const cards = [
    [60, 84, 250, 250, "#ffe2ef", -7],
    [708, 96, 250, 250, "#ffd95c", 7],
    [60, 694, 250, 250, "#e1f6ff", 6],
    [704, 692, 250, 250, "#ff9b35", -6],
  ];
  cards.forEach(([x, y, w, h, fill, rotate]) => {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.fillStyle = "#171717";
    ctx.fillRect(-w / 2 + 12, -h / 2 + 12, w, h);
    ctx.fillStyle = fill;
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 10;
    ctx.strokeRect(-w / 2, -h / 2, w, h);
    ctx.restore();
  });

  ctx.fillStyle = "rgba(255, 253, 247, .9)";
  ctx.fillRect(180, 178, 664, 664);
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 18;
  ctx.strokeRect(180, 178, 664, 664);
}

async function downloadAvatar() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  drawAvatarBackdrop(ctx, canvas.width);
  await drawSvgOnCanvas(ctx, poseSvg("front", 0), 512, 526, 650, 0);
  const link = document.createElement("a");
  link.download = `${state.name || "pixel-cat"}-avatar.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

if (downloadButton) downloadButton.addEventListener("click", downloadAvatar);
if (avatarButton) avatarButton.addEventListener("click", downloadAvatar);
if (randomButton) randomButton.addEventListener("click", randomizeAvatar);

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
