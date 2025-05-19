document.getElementById("signupForm").onsubmit = async function (e) {
    e.preventDefault();

    // Collect form data
    const form = event.target;
    const data = {
        username: form.username.value,
        email: form.email.value,
        city: form.city.value,
        password: form.password.value
    };

    const res = await fetch("http://localhost:4209/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const response = await res.json();
        localStorage.setItem("sessionKey", response.sessionKey);
        localStorage.setItem("city", response.city);
        localStorage.setItem("username", response.username);
        window.location.href = "/Fruitore_City.html";
    } else {
        const response = await res.json();
        // Show the error banner with the message
        const errorMessage = response.error;

        // Set the error message to the banner
        document.getElementById('error-message').innerText = `Failed to signup: ${errorMessage}`;

        // Display the error banner
        document.getElementById('error-banner').style.display = 'block';

        // Set a timeout to hide the banner after a few seconds 
        setTimeout(() => {
            document.getElementById('error-banner').style.display = 'none';
        }, 5000);

        // Close the banner when the close button is clicked
        document.getElementById('close-banner').addEventListener('click', () => {
            document.getElementById('error-banner').style.display = 'none';
        });
    }
}

document.getElementById("signinForm").onsubmit = async function (e) {
    e.preventDefault();

    // Collect form data
    const form = event.target;
    const data = {
        username: form.username.value,
        password: form.password.value
    };

    const res = await fetch("http://localhost:4209/signin", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const response = await res.json();
        localStorage.setItem("sessionKey", response.sessionKey);
        localStorage.setItem("city", response.city);
        localStorage.setItem("username", response.username);
        window.location.href = "/Fruitore_City.html";
    } else {
        const response = await res.json();
        // Show the error banner with the message
        const errorMessage = response.error;

        // Set the error message to the banner
        document.getElementById('error-message').innerText = `Failed to signup: ${errorMessage}`;

        // Display the error banner
        document.getElementById('error-banner').style.display = 'block';

        // Set a timeout to hide the banner after a few seconds 
        setTimeout(() => {
            document.getElementById('error-banner').style.display = 'none';
        }, 5000);

        // Close the banner when the close button is clicked
        document.getElementById('close-banner').addEventListener('click', () => {
            document.getElementById('error-banner').style.display = 'none';
        });
    }
};

