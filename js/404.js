// vhが信用できないから取得する。

const Height = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  console.log(vh);
};

window.addEventListener("resize", Height);
Height();

// ウィンドウ

let isDragging = false;
let activeWindow = null;
let offsetX = 0;
let offsetY = 0;
let winZindex = 1;
let i = 0;
// ウィンドウの間隔
let winTop = 16;
let winLeft = 16;
// 出現するウィンドウの数
const maxWindows = 12;

function createWindow() {
  if (i < maxWindows) {
    const win = document.createElement("div");
    win.className = "window";
    win.innerHTML = `
      <div class="tab">
        <a class="tab-close">&times;</a>
      </div>
      <h1 class="title">Error: 404</h1>
      <p>Try the following address:</p>
      <a class="link" href="https://atuatu-hhakumai.github.io">
        https://atuatu-hhakumai.github.io/
      </a>
      `;

    win.style.display = "block";
    win.style.top = winTop + "px";
    win.style.left = winLeft + "px";

    document.body.appendChild(win);

    i++;
    winLeft += 30;
    winTop += 30;

    setTimeout(createWindow, 60);
  } else {
    onAllWindowsCreated();
  }
}
createWindow();

// ウィンドウが全部表示されたら
function onAllWindowsCreated() {
  // 閉じる
  document.querySelectorAll(".tab-close").forEach((close) => {
    close.addEventListener("click", () => {
      const wind = close.closest(".window"); // ボタンが入ってるウィンドウを取得する
      if (wind) {
        wind.style.display = "none";
      }
    });
  });

  const windows = document.querySelectorAll(".window").forEach((win) => {
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
}
