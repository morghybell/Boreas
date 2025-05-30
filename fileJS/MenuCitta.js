const cityInput = document.getElementById('city-input');
const citySuggestions = document.getElementById('city-suggestions');
const errorMessage = document.getElementById('error-message');
const showWeatherButton = document.querySelector('button');
const daysSelect = document.getElementById('days-select');

let cities = undefined;

async function set_suggestions() {
    await fetch("./cities.json")
	.then(response => {
		return response.json();
	})
	.then(json_data => {
		cities = json_data;
	});

    let dt_cities = document.getElementById("cities");
    for (let l = 0; l < cities.length; l++) {
        let opt = document.createElement("option");
        opt.value = cities[l].city;
        dt_cities.appendChild(opt);
    }

	return;
}

window.addEventListener('DOMContentLoaded', async () => {
    cityInput.value = localStorage.getItem("city");

    // Select "Today"
    daysSelect.value = '0';

	await set_suggestions();
});

// Check if a city has been selected
function validateCitySelection() {
   	const selectedCity = cityInput.value;
	const selectedDay = daysSelect.value;
	let is_valid_city = false;

    for (let l = 0; l < cities.length; l++) {
    	if (cities[l].city === selectedCity) {
			is_valid_city = true;
		}    
    }

    if (!is_valid_city) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = "Per favore, seleziona una città tra quelle offerte dall'autocompletamento.";
    } else if (!selectedCity || !selectedDay) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Per favore, seleziona una città e un giorno.';
    } else {
        errorMessage.style.display = 'none';

        // Call function to show weather
        showWeather(selectedCity, selectedDay);
    }
}

function populateDaysSelect() {
    const weekdays = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);

        let dayName = weekdays[date.getDay()];

        if (i === 0) {
            dayName = 'Oggi';
        } else if (i === 1) {
            dayName = 'Domani';
        }

        const dayNumber = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');

        const label = `${dayName} (${dayNumber}/${month})`;

        const option = document.createElement('option');
        option.value = i; // 0 = Today, 1 = Tomorrow, etc.
        option.textContent = label;

        daysSelect.appendChild(option);
    }

    daysSelect.value = '0';
}

populateDaysSelect();

showWeatherButton.addEventListener('click', () => {
    validateCitySelection();
});

