
// Sample weather data
const sampleWeatherData = [
    { city: "Roma", temperature: "22°C", humidity: "60%", pressure: "1015 hPa", wind: "No" },
    { city: "Milano", temperature: "20°C", humidity: "65%", pressure: "1012 hPa", wind: "Brezza" },
    { city: "Napoli", temperature: "25°C", humidity: "55%", pressure: "1010 hPa", wind: "Moderato" },
    { city: "Torino", temperature: "18°C", humidity: "70%", pressure: "1008 hPa", wind: "Forte" },
    { city: "Firenze", temperature: "22°C", humidity: "60%", pressure: "1014 hPa", wind: "Calma" },
    { city: "Bologna", temperature: "21°C", humidity: "63%", pressure: "1013 hPa", wind: "Leggera" },
    { city: "Venezia", temperature: "23°C", humidity: "58%", pressure: "1016 hPa", wind: "Moderata" }
];


function getWeatherContainer(type, weather) {
    console.log(`Generating weather container for type: ${type} with data:`, weather);
    
    switch (type) {
        case 1:
            return `
            <div class="weather-container" icon="sunny">
                <span class="sun-ico"></span>
                <div class="weather-info parameter-color">
                    <p class="city-name">${weather.city}</p>
                    <p class="temperature">Temperatura: ${weather.temperature}</p>
                    <p class="humidity">Umidità: ${weather.humidity}</p>
                    <p class="pressure">Pressione: ${weather.pressure}</p>
                    <p class="wind">Vento: ${weather.wind}</p>
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
                    <p class="wind">Vento: ${weather.wind}</p>
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
                    <p class="wind">Vento: ${weather.wind}</p>
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
                    <p class="wind">Vento: ${weather.wind}</p>
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
                    <p class="wind">Vento: ${weather.wind}</p>
                </div>
            </div>
            `;
        default:
            return `<div class="weather-container">Tipo sconosciuto</div>`;
    }
}

function updateWeatherContainers() {
    const container = document.getElementById("weather-row");
    const daysSelect = document.getElementById("days-select");
    
    const selectedValue = parseInt(daysSelect.value, 10);
    const count = selectedValue + 1;

    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const weather = sampleWeatherData[i % sampleWeatherData.length];
        const type = (i % 5) + 1;

        const label = daysSelect.options[i].textContent; // Get text like "Oggi (15/05)"

        const weatherHTML = getWeatherContainer(type, weather);
        const dayWrapper = `
            <div class="weather-day">
                <h4>${label}</h4>
                ${weatherHTML}
            </div>
        `;

        container.insertAdjacentHTML('beforeend', dayWrapper);
    }
}
