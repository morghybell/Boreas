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

function showWeather(city, day) {
	if (day === undefined) {
		day = document.getElementById("days-select").value;
        city = localStorage.getItem("city");
	}
	
	const data = {
		city: city,
		day: day,
		sessionKey: localStorage.getItem("sessionKey")
	};

	fetch('http://localhost:6969', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
		})
	.then(response => response.text())
	.then(result => {
		const obj = JSON.parse(result);
		updateWeatherContainers(obj);
		return true;
	})
	.catch(error => {
		console.error('Error: ' + error);
		return false;
	});

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
