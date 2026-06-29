/* ══════════════════════════════════════
   FSL main.js — Enhanced
   ══════════════════════════════════════ */

// --- PAGE LOADER ---
window.addEventListener("load", () => {
  const loader = document.getElementById("fsl-loader");
  if (loader) {
    setTimeout(() => loader.classList.add("loaded"), 100);
  }
});

// --- TOP INFO BAR HIDE ON SCROLL ---
// const topInfoBar = document.getElementById("topInfoBar");
// let lastScroll = 0;
// let ticking = false;

// window.addEventListener(
//   "scroll",
//   () => {
//     if (!ticking) {
//       window.requestAnimationFrame(() => {
//         const current = window.scrollY;
//         if (topInfoBar) {
//           if (current > 80) {
//             topInfoBar.classList.add("hidden");
//           } else {
//             topInfoBar.classList.remove("hidden");
//           }
//         }
//         lastScroll = current;
//         ticking = false;
//       });
//       ticking = true;
//     }
//   },
//   { passive: true },
// );

// --- NAVBAR SCROLL EFFECT ---
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    if (navbar) {
      if (window.scrollY > 60) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    }
  },
  { passive: true },
);

// --- MOBILE HAMBURGER + OVERLAY ---
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// Create overlay dynamically
let navOverlay = document.getElementById("navOverlay");
if (!navOverlay) {
  navOverlay = document.createElement("div");
  navOverlay.id = "navOverlay";
  navOverlay.className = "nav-overlay";
  document.body.appendChild(navOverlay);
}

// Create close button inside nav if not present
let navCloseBtn = document.getElementById("navCloseBtn");
if (navLinks && !navCloseBtn) {
  navCloseBtn = document.createElement("button");
  navCloseBtn.id = "navCloseBtn";
  navCloseBtn.className = "nav-close-btn";
  navCloseBtn.innerHTML = "&#x2715;";
  navCloseBtn.setAttribute("aria-label", "Close menu");
  navLinks.insertBefore(navCloseBtn, navLinks.firstChild);
}

function openNav() {
  if (!navLinks || !hamburger) return;
  navLinks.classList.add("open");
  hamburger.classList.add("active");
  navOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeNav() {
  if (!navLinks || !hamburger) return;
  navLinks.classList.remove("open");
  hamburger.classList.remove("active");
  navOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

if (hamburger && navLinks) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (navLinks.classList.contains("open")) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close on nav link click
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeNav());
  });

  // Close button
  if (navCloseBtn) {
    navCloseBtn.addEventListener("click", () => closeNav());
  }

  // Close on overlay click
  navOverlay.addEventListener("click", () => closeNav());

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
}

// --- SERVICE ACCORDION ---
document.querySelectorAll(".service-full-header").forEach((header) => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    const toggle = header.querySelector(".service-toggle");
    const isOpen = body.classList.contains("open");
    document
      .querySelectorAll(".service-full-body")
      .forEach((b) => b.classList.remove("open"));
    document
      .querySelectorAll(".service-toggle")
      .forEach((t) => (t.textContent = "+"));
    if (!isOpen) {
      body.classList.add("open");
      if (toggle) toggle.textContent = "−";
    }
  });
});

// --- MANAGEMENT CARD EXPAND ---
document.querySelectorAll(".btn-details").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".mgmt-card");
    const isExpanded = card.classList.contains("expanded");
    document.querySelectorAll(".mgmt-card").forEach((c) => {
      c.classList.remove("expanded");
      const b = c.querySelector(".btn-details");
      if (b) b.textContent = "View Details";
    });
    if (!isExpanded) {
      card.classList.add("expanded");
      btn.textContent = "Close";
    }
  });
});

// --- SCROLL REVEAL ---
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document
    .querySelectorAll(
      ".feature-card, .service-card, .mgmt-card, .partner-card, .value-card, .service-full-card, .gallery-item, .contact-info-item",
    )
    .forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
      revealObserver.observe(el);
    });
}

// --- CONTACT FORM SUBMIT ---
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".form-submit");
    btn.textContent = "Message Sent ✓";
    btn.style.background = "#1a5c35";
    btn.style.color = "#fff";
    setTimeout(() => {
      btn.textContent = "Send Message";
      btn.style.background = "";
      btn.style.color = "";
      form.reset();
    }, 4000);
  });
}

// --- THEME SWITCHER ---
(function () {
  const STORAGE_KEY = "fsl-theme";
  const DEFAULT_THEME = "light";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    // Update active button state
    document.querySelectorAll(".theme-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.themeTarget === theme);
    });
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
    applyTheme(saved);
  }

  // Attach listeners after DOM ready
  function attachThemeBtns() {
    document.querySelectorAll(".theme-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyTheme(btn.dataset.themeTarget);
      });
    });
  }

  // Init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initTheme();
      attachThemeBtns();
    });
  } else {
    initTheme();
    attachThemeBtns();
  }
})();
