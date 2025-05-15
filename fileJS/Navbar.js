fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;

    const navItems = document.querySelectorAll(".nav-item");
    const indicator = document.querySelector(".nav-indicator");

    const currentUrl = window.location.href;
    const currentPage = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);

    let activeItem = null;

    navItems.forEach(item => {
      const href = item.getAttribute("href");
      if (currentPage === href || currentUrl.includes(href)) {
        item.classList.add("is-active");
        activeItem = item;
      }
    });

    if (activeItem) {
      const activeColor = activeItem.getAttribute("active-color") || "red";
      indicator.style.width = activeItem.offsetWidth + "px";
      indicator.style.left = activeItem.offsetLeft + "px";
      indicator.style.backgroundColor = activeColor;
    }

    navItems.forEach(item => {
      item.addEventListener("mouseenter", () => {
        indicator.style.width = item.offsetWidth + "px";
        indicator.style.left = item.offsetLeft + "px";
        indicator.style.backgroundColor = item.getAttribute("active-color") || "red";
      });

      item.addEventListener("mouseleave", () => {
        if (activeItem) {
          indicator.style.width = activeItem.offsetWidth + "px";
          indicator.style.left = activeItem.offsetLeft + "px";
          indicator.style.backgroundColor = activeItem.getAttribute("active-color") || "red";
        }
      });
    });
  });