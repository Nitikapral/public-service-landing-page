

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initStickyNav();
  initFilterTabs();
  initScrollAnimations();
  initSubscribeForm();
  initSmoothScroll();
});
function initStickyNav() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}
function initFilterTabs() {
  const tabs = document.querySelectorAll(".filter-tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
    });

    tab.addEventListener("keydown", (e) => {
      const tabList = [...tabs];
      const idx = tabList.indexOf(tab);

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = tabList[(idx + 1) % tabList.length];
        next.focus();
        next.click();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = tabList[(idx - 1 + tabList.length) % tabList.length];
        prev.focus();
        prev.click();
      }
    });
  });
}

function initScrollAnimations() {
  const targets = document.querySelectorAll(
    ".feature-card, .stat-card, .resource-card, .story-card, .section-header, .hero-section .col-lg-6"
  );

  targets.forEach((el) => {
    el.classList.add("fade-up");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  targets.forEach((el) => observer.observe(el));

  const cardGroups = document.querySelectorAll(".row[role='list']");
  cardGroups.forEach((group) => {
    const cards = group.querySelectorAll(".fade-up");
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 80}ms`;
    });
  });
}

function initSubscribeForm() {
  const form = document.querySelector(".subscribe-form");
  if (!form) return;

  const input = form.querySelector(".subscribe-input");
  const btn = form.querySelector(".subscribe-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = input.value.trim();

    if (!isValidEmail(email)) {
      showFormMessage(form, "Please enter a valid email address.", "error");
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }

    input.setAttribute("aria-invalid", "false");
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';
    btn.setAttribute("aria-label", "Subscribing…");

    setTimeout(() => {
      showFormMessage(form, "You're subscribed! Thank you.", "success");
      input.value = "";
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i>';
      btn.setAttribute("aria-label", "Subscribe to newsletter");
    }, 1400);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(form, message, type) {
  let msg = form.querySelector(".form-message");
  if (!msg) {
    msg = document.createElement("p");
    msg.className = "form-message";
    msg.setAttribute("role", "status");
    msg.setAttribute("aria-live", "polite");
    form.appendChild(msg);
  }

  msg.textContent = message;
  msg.style.fontSize = "0.78rem";
  msg.style.marginTop = "0.4rem";
  msg.style.color = type === "success" ? "#4ade80" : "#f87171";

  setTimeout(() => {
    msg.textContent = "";
  }, 5000);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.querySelector(".site-header")?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({ top, behavior: "smooth" });

      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
}
const supportersSwiper = new Swiper('.supporters-slider', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 20,

  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },

  breakpoints: {
    576: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 5,
    }
  }
});