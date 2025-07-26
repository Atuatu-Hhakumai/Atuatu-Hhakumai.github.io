const Height = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  console.log(vh);
};

window.addEventListener("resize", Height);
Height();

// ローディング
const loading = document.querySelector(".loading");
const loadingInner = document.querySelector(".loading-content");

gsap.to(loading, {
  delay: 4,
  duration: 0.3,
  autoAlpha: 0,
});

const counter = document.getElementById("counter");
gsap.to(counter, {
  duration: 4,
  innerHTML: 100,
  snap: "innerHTML",
  ease: "power3.inOut",
  onUpdate: function () {
    counter.innerHTML = Math.round(this.targets()[0].innerHTML);
  },
});

// 画面でかい時だけ掴めるWindow

const checkWidth = () => {
  if (window.innerWidth >= 600) {
    const windows = document.querySelectorAll(".window");
    windows.forEach((window) => {
      const tab = window.querySelector(".tab");
      Draggable.create(window, {
        trigger: window,
        type: "x,y",
        edgeResistance: 1,
        bounds: "body",
        cursor: "defalut",
      });
    });
  }
};

checkWidth();
window.addEventListener("resize", checkWidth);
