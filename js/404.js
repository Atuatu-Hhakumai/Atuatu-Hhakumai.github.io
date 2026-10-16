const Height = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  console.log(vh);
};
window.addEventListener("resize", Height);
Height();

let isDragging = false;
let activeWindow = null;
let offsetX = 0;
let offsetY = 0;
let winZindex = 1;
let i = 0;

let winTop = 16;
let winLeft = 16;

const maxWindows = Math.random() * (50 - 9) + 9;

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

function onAllWindowsCreated() {
  document.querySelectorAll(".tab-close").forEach((close) => {
    close.addEventListener("click", () => {
      const wind = close.closest(".window");
      if (wind) {
        wind.style.display = "none";
      }
    });
  });
  const windows = document.querySelectorAll(".window").forEach((win) => {
    win.addEventListener("pointerdown", (event) => {
      isDragging = true;
      activeWindow = win;
      winZindex++;
      win.style.zIndex = winZindex;
      const rect = win.getBoundingClientRect();
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
    });
  });
  document.addEventListener("pointermove", (event) => {
    if (isDragging && activeWindow) {
      activeWindow.style.top = "0px";
      activeWindow.style.left = "0px";
      const X = event.clientX - offsetX;
      const Y = event.clientY - offsetY;
      activeWindow.style.transform = `translate3d(${X}px, ${Y}px, 0)`;
    }
  });
  document.addEventListener("pointerup", () => {
    isDragging = false;
    activeWindow = null;
  });
}
