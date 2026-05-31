const form = document.querySelector("#cat-form");
const wallpaper = document.querySelector("#wallpaper");
const poseRing = document.querySelector("#pose-ring");
const catName = document.querySelector("#cat-name");
const wallpaperName = document.querySelector("#wallpaper-name");
const photoInput = document.querySelector("#cat-photo");
const photoPreview = document.querySelector("#photo-preview");
const photoPlaceholder = document.querySelector("#photo-placeholder");
const ratioButtons = document.querySelectorAll("[data-ratio]");
const downloadButton = document.querySelector("#download-btn");

const state = {
  fur: "short",
  tail: "long",
  legs: "short",
  pattern: "stripe",
  color: "#e8a85d",
  ratio: "desktop",
  name: "Mochi",
  photoUrl: "",
};

const POSES = ["sit", "loaf", "walk", "curl", "stretch", "back", "peek"];

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
  state.name = catName.value.trim() || "my cat";
  wallpaperName.textContent = state.name;
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
    state.ratio = button.dataset.ratio;
    ratioButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    wallpaper.classList.toggle("wallpaper-desktop", state.ratio === "desktop");
    wallpaper.classList.toggle("wallpaper-mobile", state.ratio === "mobile");
    renderPoses();
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

  ctx.fillStyle = "#fbfaf6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#dfe9dc";
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

renderPoses(false);

if (window.gsap) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.from(".editor-panel > *", { autoAlpha: 0, y: 18, duration: 0.7, ease: "power2.out", stagger: 0.08 });
    gsap.from(".wallpaper", { autoAlpha: 0, scale: 0.94, duration: 0.9, ease: "power3.out" });
    gsap.to(".pose", { y: -7, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { each: 0.15, from: "random" } });
  });
}
