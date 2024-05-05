const loading = document.querySelector(".loading");
const loadingInner = document.querySelector(".loading-content");

const loadingTl = gsap.timeline();
loadingTl.to(loading, {
    delay: 3.3,
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

const fullHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', fullHeight);
fullHeight();