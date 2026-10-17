// ===== Element references =====
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== Mobile menu toggle =====
const closeMenu = () => {
  navMenu.classList.remove("open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
};

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});

// ===== Smooth scroll for in-page links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    closeMenu();
    window.scrollTo({
      top: target.offsetTop - navbar.offsetHeight + 1,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
});

// ===== Scroll effects: navbar, progress bar, back-to-top =====
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

const handleScroll = () => {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  navbar.classList.toggle("scrolled", scrollY > 50);
  backToTop.classList.toggle("show", scrollY > 500);
  scrollProgress.style.width = `${maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0}%`;
};

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// ===== Highlight active nav link =====
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-50% 0px -50% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

// ===== Typing effect in hero =====
const typedEl = document.getElementById("typed");
const roles = ["React Developer", "Frontend Developer", "Firebase Enthusiast"];

if (!prefersReducedMotion) {
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = true;

  const type = () => {
    const role = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    typedEl.textContent = role.slice(0, charIndex);

    let delay = deleting ? 50 : 100;
    if (!deleting && charIndex === role.length) {
      deleting = true;
      delay = 1800; // pause on the full word
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }
    setTimeout(type, delay);
  };

  setTimeout(type, 1800);
}

// ===== Render project cards from js/projects.js =====
const projectsGrid = document.getElementById("projectsGrid");

const ICONS = {
  lock: '<svg viewBox="0 0 24 24"><path d="M12 1a5 5 0 0 0-5 5v4H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 9V6a3 3 0 1 1 6 0v4H9Zm3 4a2 2 0 0 1 1 3.7V20h-2v-2.3A2 2 0 0 1 12 14Z"/></svg>',
};

const createProjectCard = (project) => {
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.category = project.category.join(" ");

  const thumb = project.image
    ? `<img src="${project.image}" alt="${project.title} screenshot" loading="lazy" class="${project.imageFit === "contain" ? "fit-contain" : ""}">`
    : `<div class="thumb-icon">${ICONS[project.icon] || ""}</div>`;

  const liveLink = project.live
    ? `<a href="${project.live}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">Live Demo</a>`
    : "";

  card.innerHTML = `
    <div class="project-thumb">${thumb}</div>
    <div class="project-body">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <ul class="features">
        ${project.features.map((f) => `<li>${f}</li>`).join("")}
      </ul>
      <ul class="tags">
        ${project.tech.map((t) => `<li>${t}</li>`).join("")}
      </ul>
      <div class="project-links">
        <a href="${project.github}" class="btn btn-outline btn-sm" target="_blank" rel="noopener">GitHub Code</a>
        ${liveLink}
      </div>
    </div>
  `;
  return card;
};

PROJECTS.forEach((project) => projectsGrid.appendChild(createProjectCard(project)));

// ===== Project filter =====
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("active", b === button));

    projectsGrid.querySelectorAll(".project-card").forEach((card) => {
      const match = filter === "all" || card.dataset.category.split(" ").includes(filter);
      card.hidden = !match;
    });
  });
});

// ===== Card spotlight that follows the mouse =====
document.querySelectorAll(".stat, .skill-group, .project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});

// ===== Reveal elements on scroll =====
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal, .project-card").forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// ===== Contact form → opens the visitor's email app =====
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { name, email, message } = contactForm.elements;

  if (!name.value.trim() || !message.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
    formStatus.textContent = "অনুগ্রহ করে নাম, সঠিক ইমেইল ও মেসেজ লিখুন।";
    formStatus.className = "form-status error";
    return;
  }

  const subject = encodeURIComponent(`Portfolio contact from ${name.value.trim()}`);
  const body = encodeURIComponent(`${message.value.trim()}\n\n— ${name.value.trim()} (${email.value.trim()})`);
  window.location.href = `mailto:arman81155@gmail.com?subject=${subject}&body=${body}`;

  formStatus.textContent = "আপনার ইমেইল অ্যাপ খোলা হচ্ছে...";
  formStatus.className = "form-status success";
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
