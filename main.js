document.addEventListener("DOMContentLoaded", () => {

  /* ---------- scroll reveal (dengan efek stagger) ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 5) * 90}ms`;
  });

  const animateProgressBar = (container) => {
    const fill = container.querySelector(".progress-fill");
    if (!fill) return;
    const target = fill.style.width || getComputedStyle(fill).width;
    fill.style.width = "0%";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.transition = "width 1.3s cubic-bezier(0.22, 0.61, 0.36, 1)";
        fill.style.width = target;
      });
    });
  };

  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            if (entry.target.classList.contains("progress-container")) {
              animateProgressBar(entry.target);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- mobile menu toggle ---------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.setAttribute("aria-expanded", "false");

    const closeMenu = () => {
      navLinks.classList.remove("is-open");
      menuToggle.classList.remove("is-active");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.classList.toggle("is-active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      const clickedInsideNav =
        navLinks.contains(event.target) || menuToggle.contains(event.target);
      if (!clickedInsideNav && navLinks.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  /* ---------- team member project accordion ---------- */
  const projectToggles = document.querySelectorAll(".projects-toggle");

  projectToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const card = toggle.closest(".team-member");
      if (!card) return;

      const isExpanded = card.classList.contains("expanded");
      toggle.setAttribute("aria-expanded", String(!isExpanded));
      card.classList.toggle("expanded");
    });
  });

});