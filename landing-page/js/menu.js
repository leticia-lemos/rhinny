document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuCollapse = document.querySelector(".menu-collapse");

  function toggleMenu() {
    menuCollapse.classList.toggle("menu-open");
  }

  function closeMenu(event) {
    if (
      !menuCollapse.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      menuCollapse.classList.remove("menu-open");
    }
  }

  function closeMenuOnScroll() {
    if (menuCollapse.classList.contains("menu-open")) {
      menuCollapse.classList.remove("menu-open");
    }
  }

  menuToggle.addEventListener("click", toggleMenu);
  document.addEventListener("click", closeMenu);
  window.addEventListener("scroll", closeMenuOnScroll);
});
