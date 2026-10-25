(function () {
  "use strict";

  document.documentElement.classList.add("ff-enhanced");

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.documentElement.classList.add("ff-ready");
    });
  });

  /* Remove the obsolete imported navigation from the live accessibility tree. */
  document
    .querySelectorAll(
      ".header_main .menu-item-675, .header_main .menu-item-676, .header_main .menu-item-1299, .header_main .menu-item-677, .header_main .menu-item-1296"
    )
    .forEach(function (item) {
      item.remove();
    });

  /* Elementor keeps its mobile drawer open after same-page anchor navigation. */
  var mobileToggle = document.querySelector(".header_main .elementor-menu-toggle");
  document.querySelectorAll(".header_main nav.elementor-nav-menu--dropdown a[href*='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      var destination = new URL(link.href, window.location.href);
      if (destination.pathname !== window.location.pathname || !destination.hash) return;
      requestAnimationFrame(function () {
        if (mobileToggle && mobileToggle.getAttribute("aria-expanded") === "true") mobileToggle.click();
      });
    });
  });

  /* A static Elementor export can leave reveal elements permanently hidden if
     a dynamic module misses its trigger. This observer is a local safety net. */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        entry.target.classList.remove("elementor-invisible");
        entry.target.classList.add("animated", "fadeInUp");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  document.querySelectorAll(".elementor-invisible").forEach(function (element) {
    revealObserver.observe(element);
  });

  var pendingLattice = document.querySelector(".ff-pending__lattice");
  if (pendingLattice && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      pendingLattice.classList.toggle("is-visible", entries[0].isIntersecting);
    }).observe(pendingLattice);
  }

  var hero = document.querySelector(".ff-hero");
  var portrait = document.querySelector(".ff-hero__portrait img");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var scrollFrame = null;

  function updateHeroMotion() {
    var scrollY = window.scrollY || window.pageYOffset;
    document.documentElement.classList.toggle("ff-scrolled", scrollY > 24);

    if (hero && portrait && !reducedMotion.matches) {
      var heroHeight = Math.max(hero.offsetHeight, 1);
      var progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      portrait.style.setProperty("--ff-portrait-shift", (progress * -22).toFixed(2) + "px");
    }

    scrollFrame = null;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(updateHeroMotion);
    },
    { passive: true }
  );

  updateHeroMotion();
})();
