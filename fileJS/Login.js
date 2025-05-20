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
		const current_date = new Date();
        localStorage.setItem("sessionKey", response.sessionKey);
        localStorage.setItem("city", response.city);
        localStorage.setItem("username", response.username);
        localStorage.setItem("isAdmin", response.isAdmin);
		localStorage.setItem("logTime", current_date.getTime());
		if (response.isAdmin) {
			window.location.href = "/Erogatore_Dashboard.html";
		} else {
			window.location.href = "/Fruitore_City.html";
		}
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

document.addEventListener('DOMContentLoaded', async () => {
	const session_key = localStorage.getItem("sessionKey") ?? "";
	const city = localStorage.getItem("city") ?? "";
	const username = localStorage.getItem("username") ?? "";
	const log_time = localStorage.getItem("logTime") ?? Infinity;
	const is_admin = localStorage.getItem("isAdmin") == 1 ? true : false;

	const now = new Date();
	// Current Time in milliseconds plus one hour: 60 minutes in an hour * 60 seconds in a minute * 1000 millisecond in a second
	const max_time = now.getTime() + 360_000; 

	console.log(is_admin);

	if (session_key !== "" && city !== "" && username !== "" && max_time > log_time) {
		if (is_admin) {
			window.location.href = "/Erogatore_Dashboard.html";
		} else {
			window.location.href = "/Fruitore_City.html";
		}
	} else {	
		localStorage.clear();
	}

	return;
});

