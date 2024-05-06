const loading = document.querySelector(".loading");
const loadingInner = document.querySelector(".loading-content");

// 二回目以降の訪問の場合、ローディングを少し短くする
function isFirstTimeVisit() {
  var isFirstTime = sessionStorage.getItem("isFirstTimeVisit");
  if (!isFirstTime) {
      sessionStorage.setItem("isFirstTimeVisit", "true");
      return true;
  } else{ return false; }
}

// 二回目以降の訪問の場合、ローディングを少し短くする
if (isFirstTimeVisit()) {
  const loadingTl = gsap.timeline();
  loadingTl.to(loading, {
      delay: 2.7,
      duration: 0,
      autoAlpha: 1
  }).to(loading, {
      delay: 0,
      duration: 1.2,
      autoAlpha: 0
  });
  const counter = document.getElementById('counter');
  gsap.to(counter, {
    delay: 0.7,
    duration: 2.5,
    innerHTML: 100,
    snap: 'innerHTML',
    ease: "power4.out",
    onUpdate: function() {
      counter.innerHTML = Math.round(this.targets()[0].innerHTML);
    }
  });
}else {
  const loadingTl = gsap.timeline();
  loadingTl.to(loading, {
      delay: 1.27,
      duration: 0,
      autoAlpha: 1
  }).to(loading, {
      delay: 0,
      duration: 1,
      autoAlpha: 0
  });
  const counter = document.getElementById('counter');
  gsap.to(counter, {
    duration: 1.3,
    innerHTML: 100,
    snap: 'innerHTML',
    ease: "power2.out",
    onUpdate: function() {
      counter.innerHTML = Math.round(this.targets()[0].innerHTML);
    }
  });
};
