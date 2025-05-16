// Determine the current page
const currentUrl = window.location.href;
const currentPage = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);

// Set the navbar file based on the page
let navbarFile = 'navbar.html';  // Default navbar file

// Set the navbar based on the page being loaded
if (currentPage === "Home.html") {
  navbarFile = 'Navbar_Home.html';
} else if (currentPage === "Fruitore_City.html" || currentPage === "Fruitore_Search.html") {
  navbarFile = 'Navbar_Fruitore.html';
} else if (currentPage === "Rrogatore.html") {
  navbarFile = 'Navbar_Erogatore.html';
}

// Fetch the corresponding navbar file
fetch(navbarFile)
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;

    const navItems = document.querySelectorAll(".nav-item");
    const indicator = document.querySelector(".nav-indicator");

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


fetch("Footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });