document.getElementById("signupForm").onsubmit = async function(e) {
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
		// TODO: Gestisci come mostrare all'utente l'errore
        alert(`Failed to signup: ${response.error}`);
    }
};


document.getElementById("signinForm").onsubmit = async function(e) {
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
		// TODO: Gestisci come mostrare all'utente l'errore
        alert(`Failed to signin: ${response.error}`);
    }
};

