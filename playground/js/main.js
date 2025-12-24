// シークバー
const seekbarSensor = document.querySelector(".seek-sensor");
const seekbarBackG = document.querySelector(".seek-bar");
const seekbarFill = document.querySelector(".seekbar-fill");
const seekbarContainer = document.querySelector(".seekbar-container");

let rect = 0;
let moveX = 0;
let startX = 0;
let value = 0;
let startTime = 0;
isAudioFileSet = false;
isSeekBarDragging = false;
let currentTimePercent = 0;

// リサイズ時
const resizeSeekRect = () => {
  rect = seekbarBackG.getBoundingClientRect();
};
window.addEventListener("resize", resizeSeekRect);
resizeSeekRect();

// ホバー
seekbarBackG.addEventListener("mouseleave", (e) => {
  if (isSeekBarDragging) {
    seekbarBackG.style.height = "18px";
  } else {
    seekbarBackG.style.height = "8px";
  }
});
// クリック
seekbarSensor.addEventListener("pointerdown", (e) => {
  isSeekBarDragging = true;
  document.documentElement.style.overscrollBehavior = "none";
  if (isSeekBarDragging) {
    seekbarBackG.style.height = "18px";
    moveX = e.clientX - rect.left;
    if (moveX < 0) moveX = 0;
    if (moveX > rect.width) moveX = rect.width;
    value = Math.round((moveX / rect.width) * 100);

    seekbarFill.style.width = value + "%";
  }
});
window.addEventListener("pointermove", (e) => {
  if (isSeekBarDragging) {
    moveX = e.clientX - rect.left;
    if (moveX < 0) moveX = 0;
    if (moveX > rect.width) moveX = rect.width;
    value = (moveX / rect.width) * 100;

    seekbarFill.style.width = value + "%";
    currentTimePercent = audioPlayer.duration / 100;
  }
});
window.addEventListener("pointerup", () => {
  document.documentElement.style.overscrollBehavior = "";
  seekbarBackG.style.height = "8px";
  isSeekBarDragging = false;
});


