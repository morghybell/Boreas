// Determine the current page
const currentUrl = window.location.href;
const currentPage = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);

// Declare the variable before assigning to it
let navbarFile = "";

// Set the navbar based on the page being loaded
if (currentPage === "Home.html" || currentPage === "ChiSiamo.html" || currentPage === "Dove.html" || currentPage === "Login.html") {
  navbarFile = 'Navbar_Home.html';
} else if (currentPage === "Fruitore_City.html" || currentPage === "Fruitore_Search.html" || currentPage === "Logout.html") {
  navbarFile = 'Navbar_Fruitore.html';
} else if (currentPage === "Erogatore_Dashboard.html" || currentPage === "Erogatore_Risorse.html") {
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


// Declare the variable before assigning to it
let footerFile = "";

// Set the footer based on the page being loaded
if (currentPage === "Home.html" || currentPage === "ChiSiamo.html" || currentPage === "Dove.html" || currentPage === "Login.html") {
  footerFile = 'Footer_Home.html';
} else if (currentPage === "Fruitore_City.html" || currentPage === "Fruitore_Search.html" || currentPage === "Logout.html") {
  footerFile = 'Footer_Fruitore.html';
}

fetch(footerFile)
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });
