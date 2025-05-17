// Set initial background color for sun mode
document.body.style.backgroundColor = "#f4c042";

const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const information = document.getElementById("information"); // The text above the sun

if (sun && moon && information) {
  sun.addEventListener("click", function () {
    information.style.opacity = "0";
    
    // Transition to moon and hide sun description
    moon.style.transition = "top 2s ease, opacity 2s ease"; // Apply smooth transition to the moon
    moon.style.opacity = 1;
    moon.style.top = "25%"; // Make the moon rise to the center
    sun.style.transition = "top 2s ease"; // Smooth transition for the sun
    sun.style.top = "150vh"; // The sun moves off the screen
    
    document.body.style.transition = "top 2s ease"; // Smooth transition for the sun
    document.body.style.backgroundColor = "#0f2964"; // Change the background color to dark (moon mode)

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

    // Fade in both title and message after 1 second
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
