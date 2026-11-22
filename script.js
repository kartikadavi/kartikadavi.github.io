// Only hide-then-reveal sections when this script actually runs.
// If JS fails or is blocked, content stays visible (no blank sections).
document.documentElement.classList.add('js');

// Reveal-on-scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Safety net: reveal everything after 2s even if the observer never fires
// (e.g. anchor jumps straight to a deep section like #bucket-ai).
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => el.classList.add('visible'));
}, 2000);

// Animate before/after bars when they scroll into view
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.bars').forEach((el) => barObserver.observe(el));

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => links.classList.remove('open'))
);
