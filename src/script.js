gsap.registerPlugin(ScrollTrigger);

// First step
gsap.from(".hero-main-container", {
  scale: 1.45,
  duration: 2.8,
  ease: "power3.out",
});

gsap.to(".overlay", {
  opacity: 0,
  duration: 2.8,
  ease: "power3.out",
  onComplete: () => {
    document.body.style.overflow = "visible";
    document.body.style.overflowX = "hidden";
  },
});

// Scroll Indicator
const scrollIndicator = document.querySelector(".scroll-indicator");
const bounceTimeline = gsap.timeline({
  repeat: -1,
  yoyo: true,
});

bounceTimeline.to(scrollIndicator, {
  y: 20,
  opacity: 0.6,
  duration: 0.8,
  ease: "power1.inOut",
});

// Create a timeline for better control
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    scrub: 2,
    pin: true,
    start: "top top",
    end: "+=2000",
    ease: "none",
  },
});

// Need to ensure that the scale is like this otherwise some flicks happens
tl.set(".hero-main-container", {
  scale: 1.25,
});

tl.to(".hero-main-container", {
  scale: 1,
  duration: 1,
});

tl.to(
  ".hero-main-logo",
  {
    opacity: 0,
    duration: 0.5,
  },
  "<" // starts at the same time of previous animation
);

tl.to(
  ".hero-main-image",
  {
    opacity: 0,
    duration: 2,
  },
  "<+=0.5"
);

const mm = gsap.matchMedia();

mm.add("(max-width: 768px)", () => {
  tl.to(
    ".hero-main-container",
    {
      backgroundSize: "40vh", // smaller for mobile
      duration: 3,
    },
    "<+=0.2"
  );
});

mm.add("(min-width: 769px)", () => {
  tl.to(
    ".hero-main-container",
    {
      backgroundSize: "80vh", // desktop default
      duration: 3,
    },
    "<+=0.2"
  );
});


tl.fromTo(
  ".hero-text",
  {
    backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(128, 0, 128, 0) 0,        
rgba(0, 180, 0, 1) 90vh,       
rgba(180, 255, 0, 1) 120vh,    
rgba(40, 0, 40, 0) 150vh
        )`,
  },
  {
    backgroundImage: `radial-gradient(circle at 50% 3.9575vh,
  rgb(2, 88, 37) 0vh,
  rgba(0, 180, 0, 1) 50.011vh,
  rgb(160, 255, 0) 90.0183vh,
  rgba(40, 0, 40, 0) 140.599vh
)

`,
    duration: 3,
  },
  "<1.2" // starts 1.2 seconds before the previous animation
);
tl.to(
  ".hero-text",
  {
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
  },
  ">-1" // starts 1s before the previous animation ends
);
tl.to(
  ".hero-main-container",
  {
    opacity: 0,
    duration: 1.8,
    ease: "power2.out",
  },
  ">-1" // starts 1s before the previous animation ends
);

// logo purple





tl.set(".hero-1-container", { opacity: 0 });
tl.set(".hero-2-container", { visibility: "visible" });

tl.to(".hero-2-container", { opacity: 1, duration: 3 }, "<+=0.0");



// COUNTDOWN TIMER (SAFE VERSION)

// Use ISO date format (100% reliable)
const eventDate = new Date("2026-04-17T10:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date().getTime();
  const diff = eventDate - now;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

// run once immediately
updateCountdown();

// then every second
setInterval(updateCountdown, 1000);

