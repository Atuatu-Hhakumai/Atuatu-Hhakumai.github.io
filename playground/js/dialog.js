const infoView = document.querySelector(".info-view");
const infoOpen = document.querySelector("#info-open");
const infoClose = document.querySelector("#info-close");
infoOpen.addEventListener("click", () => {
  infoView.style.display = "inline-block";
})
infoClose.addEventListener("click", () => {
  infoView.style.display = "none";
})
