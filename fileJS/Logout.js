// Set initial background color for sun mode
document.body.style.backgroundColor = "#f4c042";

const sun = document.getElementById("sun");
const moon = document.getElementById("moon");

if (sun && moon) {
  sun.addEventListener("click", function () {
    // Transition to moon
    moon.style.opacity = 1;
    moon.style.top = "100px";
    sun.style.top = "150vh";
    document.body.style.backgroundColor = "#0f2964";

    // Create wrapper for title and message
    const wrapper = document.createElement("div");
    wrapper.id = "logout-wrapper";

    // Create title
    const title = document.createElement("h1");
    title.id = "title";
    title.textContent = "Boreas";
    title.style.opacity = "0"; // Start hidden

    // Create message
    const message = document.createElement("p");
    message.className = "logout-message";
    message.textContent = "Buona giornata e a presto!";
    message.style.opacity = "0"; // Start hidden

    // Append to wrapper and body
    wrapper.appendChild(title);
    wrapper.appendChild(message);
    document.body.appendChild(wrapper);

    // Fade in both title and message after 1s
    setTimeout(() => {
      title.style.opacity = "1";
      message.style.opacity = "1";
    }, 1000);

    // Redirect after 5 seconds
    setTimeout(() => {
      window.location.href = "Home.html";
    }, 5000);
  });
}
