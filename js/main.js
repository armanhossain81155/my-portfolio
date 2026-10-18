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
  external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/></svg>',
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg>',
};

const createProjectCard = (project) => {
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.category = project.category.join(" ");

  const thumb = project.image
    ? `<img src="${project.image}" alt="${project.title} screenshot" loading="lazy" class="${project.imageFit === "contain" ? "fit-contain" : ""}">`
    : `<div class="thumb-icon">${ICONS[project.icon] || ""}</div>`;

  // No live link yet → show a disabled "Coming Soon" button instead of hiding it
  const liveLink = project.live
    ? `<a href="${project.live}" class="btn-sm btn-demo" target="_blank" rel="noopener">${ICONS.external}Live Demo</a>`
    : `<span class="btn-sm btn-demo is-disabled" aria-disabled="true" title="Live demo coming soon">${ICONS.external}Live Demo <small>Soon</small></span>`;

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
        ${liveLink}
        <a href="${project.github}" class="btn-sm btn-repo" target="_blank" rel="noopener">${ICONS.github}GitHub Repo</a>
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

// Stagger cards inside the same grid (delay is cleared after the reveal so hovers stay snappy)
document.querySelectorAll(".skills-grid, .projects-grid").forEach((grid) => {
  grid.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
    el.addEventListener("transitionend", () => (el.style.transitionDelay = ""), { once: true });
  });
});

// ===== Animated counters =====
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / 1500, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll(".counter").forEach((el) => counterObserver.observe(el));

// ===== Desktop-only pointer effects =====
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (finePointer && !prefersReducedMotion) {
  // Soft glow that follows the cursor
  const cursorGlow = document.getElementById("cursorGlow");
  window.addEventListener("mousemove", (e) => {
    cursorGlow.classList.add("active");
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  document.addEventListener("mouseleave", () => cursorGlow.classList.remove("active"));

  // 3D tilt on project cards
  projectsGrid.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px)`;
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
  });

  // Magnetic hero buttons
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
  });
}

// ===== Contact form → sends the message to my inbox via Web3Forms =====
// The access key is public by design: it can only deliver mail to my own inbox.
const WEB3FORMS_KEY = "d9bf659d-fa85-484d-9888-ac6e7949ed31";
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = contactForm.querySelector('button[type="submit"]');

const setFormStatus = (text, type) => {
  formStatus.textContent = text;
  formStatus.className = `form-status ${type}`;
};

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { name, email, message, botcheck } = contactForm.elements;

  if (!name.value.trim() || !message.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
    setFormStatus("অনুগ্রহ করে নাম, সঠিক ইমেইল ও মেসেজ লিখুন।", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  setFormStatus("মেসেজ পাঠানো হচ্ছে...", "");

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Portfolio contact from ${name.value.trim()}`,
        from_name: "Arman Portfolio",
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
        botcheck: botcheck.checked,
      }),
    });
    const result = await res.json();
    if (!res.ok || !result.success) throw new Error(result.message || `HTTP ${res.status}`);

    setFormStatus("✓ ধন্যবাদ! আপনার মেসেজ পাঠানো হয়েছে। আমি শীঘ্রই উত্তর দেব।", "success");
    contactForm.reset();
  } catch (err) {
    console.error(err);
    setFormStatus("মেসেজ পাঠানো যায়নি। একটু পরে আবার চেষ্টা করুন অথবা সরাসরি ইমেইল করুন: arman81155@gmail.com", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
