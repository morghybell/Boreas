function getWeatherContainer(weather) {
    console.log(`Generating weather container for type: ${weather.type} with data:`, weather);
    
    switch (weather.type) {
        case 1:
            return `
            <div class="weather-container" icon="sunny">
                <span class="sun-ico"></span>
                <div class="weather-info parameter-color">
                    <p class="city-name">${weather.city}</p>
                    <p class="temperature">Temperatura: ${weather.temperature}</p>
                    <p class="humidity">Umidità: ${weather.humidity}</p>
                    <p class="pressure">Pressione: ${weather.pressure}</p>
                    <p class="wind">Vento: ${weather.wind_velocity}km/h ${weather.wind_direction}</p>
                </div>
            </div>
            `;
        case 2:
            return `
            <div class="weather-container" icon="snowy">
                <div class="snowman">
                    <div class="eye left-eye"></div>
                    <div class="eye right-eye"></div>
                </div>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div class="weather-info parameter-color-snow">
                    <p class="city-name">${weather.city}</p>
                    <p class="temperature">Temperatura: ${weather.temperature}</p>
                    <p class="humidity">Umidità: ${weather.humidity}</p>
                    <p class="pressure">Pressione: ${weather.pressure}</p>
                    <p class="wind">Vento: ${weather.wind_velocity}km/h ${weather.wind_direction}</p>
                </div>
            </div>
            `;
        case 3:
            return `
            <div class="weather-container" icon="cloudy">
                <span class="cloud"></span>
                <span class="cloud"></span>
                <div class="weather-info parameter-color">
                    <p class="city-name">${weather.city}</p>
                    <p class="temperature">Temperatura: ${weather.temperature}</p>
                    <p class="humidity">Umidità: ${weather.humidity}</p>
                    <p class="pressure">Pressione: ${weather.pressure}</p>
                    <p class="wind">Vento: ${weather.wind_velocity}km/h ${weather.wind_direction}</p>
                </div>
            </div>
            `;
        case 4:
            return `
            <div class="weather-container" icon="stormy">
                <span class="cloud-stormy"></span>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div class="weather-info parameter-color">
                    <p class="city-name">${weather.city}</p>
                    <p class="temperature">Temperatura: ${weather.temperature}</p>
                    <p class="humidity">Umidità: ${weather.humidity}</p>
                    <p class="pressure">Pressione: ${weather.pressure}</p>
                    <p class="wind">Vento: ${weather.wind_velocity}km/h ${weather.wind_direction}</p>
                </div>
            </div>
            `;
        case 5:
            return `
            <div class="weather-container" icon="supermoon">
                <div class="moon-ico icon-class"></div>
                <span class="meteor"></span>
                <div class="weather-info parameter-color">
                    <p class="city-name">${weather.city}</p>
                    <p class="temperature">Temperatura: ${weather.temperature}</p>
                    <p class="humidity">Umidità: ${weather.humidity}</p>
                    <p class="pressure">Pressione: ${weather.pressure}</p>
                    <p class="wind">Vento: ${weather.wind_velocity}km/h ${weather.wind_direction}</p>
                </div>
            </div>
            `;
        default:
            return `<div class="weather-container">Tipo sconosciuto</div>`;
    }
}

async function showWeather(city, day) {
	if (day === undefined) {
		day = document.getElementById("days-select").value;
		city = String(localStorage.getItem("city") ?? "Perugia")
	}
	
	const data = {
		city: city,
		day: day,
		sessionKey: String(localStorage.getItem("sessionKey") ?? "nosessionkey")
	};

	const res = await fetch("http://localhost:6969/simulateweather", {
        method: "POST",
	    headers: {
        	'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const response = await res.json();
		updateWeatherContainers(response);
    	return true;
	} else if (res.status == 401) {
        alert("Unathorized access to computation server.");
    } else {
		console.log(res);
		alert("Unknown error.");
        const response = await res.json();
		console.log("Response: ", response);
	}

	// unreachable
	return true;
}

function updateWeatherContainers(weather_arr) {
    const container = document.getElementById("weather-row");
    const daysSelect = document.getElementById("days-select");
    
    const selectedValue = parseInt(daysSelect.value, 10);
    const count = selectedValue + 1;

    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const weather = weather_arr[i];
		const label = daysSelect.options[i].textContent; // Get text like "Oggi (15/05)"

        const weatherHTML = getWeatherContainer(weather);
        const dayWrapper = `
            <div class="weather-day">
                <h4 id="w-day">${label}</h4>
                ${weatherHTML}
            </div>
        `;

        container.insertAdjacentHTML('beforeend', dayWrapper);
    }
}

function resizeCityNameText(container) {
    const el = container.querySelector(".city-name");
    if (!el) return;

    // Reset font size in case this is being resized again (e.g., on window resize)
    el.style.fontSize = "15vw";

    let fontSize = parseInt(window.getComputedStyle(el).fontSize);

    while (el.scrollWidth > container.offsetWidth && fontSize > 10) {
        fontSize--;
        el.style.fontSize = fontSize + "px";
    }
}

window.addEventListener("resize", () => {
    document.querySelectorAll(".weather-day").forEach(day => {
        resizeCityNameText(day);
    });
});

