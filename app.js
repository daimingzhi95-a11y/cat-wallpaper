const form = document.querySelector("#cat-form");
const wallpaper = document.querySelector("#wallpaper");
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
const downloadButton = document.querySelector("#download-btn");

const state = {
  fur: "short",
  tail: "long",
  legs: "short",
  pattern: "stripe",
  color: "#e8a85d",
  background: "plants",
  ratio: "desktop",
  ratioLocked: false,
  name: "Mochi",
  photoUrl: "",
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
  const tailLength = state.tail === "long" ? 34 : 15;
  const legLength = state.legs === "long" ? 21 : 13;
  const fluff = state.fur === "long" ? 7 : 2;
  const stripes = patternMarkup(state.pattern, dark);
  const outline = "#38443f";
  const common = `stroke="${outline}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;

  const bodies = {
    sit: `<path d="M52 51C38 63 37 93 42 113h69c5-22 1-46-16-59" fill="${color}" ${common}/>
      <path d="M48 110v${legLength}M65 111v${legLength}" ${common}/>
      <path d="M108 106c${tailLength} 4 ${tailLength + 5}-28 ${tailLength - 2}-38" fill="none" ${common}/>`,
    loaf: `<path d="M38 82c9-25 51-36 80-17 15 10 17 31 1 41H45c-19-2-22-14-7-24Z" fill="${color}" ${common}/>
      <path d="M103 68c${tailLength} 3 ${tailLength + 9} 27 9 37" fill="none" ${common}/>`,
    walk: `<path d="M34 72c15-21 70-26 92 0 7 9 2 24-11 26H49c-17 0-24-15-15-26Z" fill="${color}" ${common}/>
      <path d="M49 94v${legLength}M71 94v${legLength}M105 94v${legLength}" ${common}/>
      <path d="M121 72c${tailLength} 0 ${tailLength + 9}-26 ${tailLength + 2}-37" fill="none" ${common}/>`,
    curl: `<path d="M41 78c11-29 70-37 91-2 17 29-18 44-54 35-31-7-47-17-37-33Z" fill="${color}" ${common}/>
      <path d="M125 83c-${tailLength} 24-57 15-65 5" fill="none" ${common}/>`,
    stretch: `<path d="M30 84c16-28 74-29 98-7 10 10 3 24-12 25H43c-17 0-22-7-13-18Z" fill="${color}" ${common}/>
      <path d="M43 98l-${legLength} ${legLength - 5}M114 98l${legLength + 5} ${legLength - 7}" ${common}/>
      <path d="M122 75c${tailLength + 5}-11 ${tailLength + 12}-28 ${tailLength + 7}-41" fill="none" ${common}/>`,
    back: `<path d="M38 70c14-25 66-26 86 0 9 12 3 30-12 34H51c-17-3-22-21-13-34Z" fill="${color}" ${common}/>
      <path d="M56 101v${legLength}M93 101v${legLength}" ${common}/>
      <path d="M113 70c${tailLength + 7}-4 ${tailLength + 10}-27 ${tailLength + 4}-39" fill="none" ${common}/>`,
    peek: `<path d="M40 91c10-26 57-29 79-6 13 14 4 29-12 31H50c-17-3-20-13-10-25Z" fill="${color}" ${common}/>
      <path d="M111 89c${tailLength} 2 ${tailLength + 8}-17 ${tailLength + 5}-30" fill="none" ${common}/>`,
  };

  const faceX = pose === "back" ? 0 : pose === "stretch" ? -7 : pose === "peek" ? -5 : 0;
  const face = pose === "back" ? "" : `
    <path d="M46 ${56 - fluff}l9-10 8 11M85 ${56 - fluff}l10-10 6 14" fill="${color}" ${common}/>
    <ellipse cx="${73 + faceX}" cy="${65 - fluff / 2}" rx="${29 + fluff}" ry="${24 + fluff / 2}" fill="${color}" ${common}/>
    <circle cx="${64 + faceX}" cy="64" r="3.2" fill="${outline}"/><circle cx="${83 + faceX}" cy="64" r="3.2" fill="${outline}"/>
    <path d="M72 70l3 2 3-2M75 72v4m0 0c-5 4-9 2-11 0m11 0c5 4 9 2 11 0" fill="none" stroke="${outline}" stroke-width="2.8" stroke-linecap="round"/>`;

  return `<svg viewBox="0 0 170 145" role="img" aria-label="猫咪姿势 ${index + 1}">
    ${bodies[pose]}${stripes}${face}
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

function setRatio(ratio, automatic = true) {
  state.ratio = ratio;
  ratioButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.ratio === ratio));
  wallpaper.classList.toggle("wallpaper-desktop", ratio === "desktop");
  wallpaper.classList.toggle("wallpaper-mobile", ratio === "mobile");
  deviceHint.textContent = automatic
    ? `已根据当前屏幕自动选择${ratio === "desktop" ? "电脑" : "手机"}壁纸`
    : `已手动切换为${ratio === "desktop" ? "电脑" : "手机"}壁纸`;
  renderPoses();
}

function applyResponsiveRatio() {
  if (!state.ratioLocked) setRatio(window.innerWidth <= 700 ? "mobile" : "desktop");
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

function drawSvgOnCanvas(ctx, svg, x, y, width) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const height = width * (145 / 170);
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
applyResponsiveRatio();
window.addEventListener("resize", applyResponsiveRatio);

if (window.gsap) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.from(".game-header > *, .stage-heading > *, .customizer-top > *", { autoAlpha: 0, y: 12, duration: 0.6, ease: "power2.out", stagger: 0.05 });
    gsap.from(".wallpaper", { autoAlpha: 0, scale: 0.94, duration: 0.9, ease: "power3.out" });
    gsap.to(".pose", { y: -7, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { each: 0.15, from: "random" } });
  });
}
