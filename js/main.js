// vhが信用できないから取得する。

const Height = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  console.log(vh);
};

window.addEventListener("resize", Height);
Height();

// ローディング
const loading = document.querySelector(".loading");
const mainElm = document.querySelector(".main");
window.setTimeout(function () {
  mainElm.style.display = "block";
  loading.style.transition = "0.3s";
  loading.style.opacity = "0";
}, 4000);
window.setTimeout(function () {
  loading.style.display = "none";
}, 4300);

const counter = document.getElementById("counter");
let from = 0;
const to = 100;
const duration = 3200;
const start = performance.now();

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 2.3);
}

function animate(now) {
  const elapsed = now - start;
  let progress = Math.min(elapsed / duration, 1);
  progress = easeOutCubic(progress);

  const value = Math.floor(from + (to - from) * progress);
  counter.textContent = value;

  if (progress < 1) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);

// ウィンドウ

let winZindex = 1;

// 開閉
document.querySelectorAll(".document[id]").forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.getElementById("win-" + link.id);
    if (target) {
      // ↓単純に表示するだけ
      target.style.display = "block";
      // ↓トグルする。押したらzIndex更新されて欲しいから保留
      // target.style.display = target.style.display === "none" ? "block" : "none";
    }
    //zIndexを更新する
    winZindex++;
    target.style.zIndex = winZindex;
  });
});

// 閉める
document.querySelectorAll(".tab-close").forEach((close) => {
  close.addEventListener("click", (e) => {
    const target = close.closest(".window"); // ボタンが入ってるウィンドウを取得する
    if (target) {
      target.style.display = "none";
    }
  });
});

let isDragging = false;
let activeWindow = null;
let offsetX = 0;
let offsetY = 0;

const checkWidth = () => {
  if (window.innerWidth >= 600) {
    document.querySelectorAll(".window").forEach((win) => {
      // ウィンドウでマウスを下ろした時
      win.addEventListener("pointerdown", (event) => {
        isDragging = true;
        activeWindow = win;

        // ウィンドウクリック時にZ Indexを更新する
        winZindex++;
        win.style.zIndex = winZindex;

        // 掴んだ場所
        const rect = win.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
      });
    });
  }
};
checkWidth();
window.addEventListener("resize", checkWidth);

// ドラッグ中の挙動

document.addEventListener("pointermove", (event) => {
  if (isDragging && activeWindow) {
    activeWindow.style.top = "0px";
    activeWindow.style.left = "0px";
    const X = event.clientX - offsetX;
    const Y = event.clientY - offsetY;
    activeWindow.style.transform = `translate3d(${X}px, ${Y}px, 0)`;
  }
});

// ドラッグ終了時の処理
document.addEventListener("pointerup", () => {
  isDragging = false;
  activeWindow = null;
});
