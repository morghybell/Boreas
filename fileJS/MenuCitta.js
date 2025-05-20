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
    // Imposta Perugia come città predefinita
    cityInput.value = localStorage.getItem("city");

    // Seleziona il primo giorno (cioè oggi)
    daysSelect.value = '0';

	await set_suggestions();
});

// Verifica se una città è stata selezionata
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

        // Qui puoi chiamare la funzione per mostrare il meteo
        showWeather(selectedCity, selectedDay);
    }
}

function populateDaysSelect() {
    const weekdays = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);

        let dayName = weekdays[date.getDay()];

        // Cambia "Oggi" per il primo giorno e "Domani" per il secondo
        if (i === 0) {
            dayName = 'Oggi';
        } else if (i === 1) {
            dayName = 'Domani';
        }

        const dayNumber = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');

        const label = `${dayName} (${dayNumber}/${month})`;

        const option = document.createElement('option');
        option.value = i; // 0 = oggi, 1 = domani, ecc.
        option.textContent = label;

        daysSelect.appendChild(option);
    }

    // Imposta "oggi" (valore 0) come selezionato di default
    daysSelect.value = '0';
}

// Chiamata iniziale
populateDaysSelect();

showWeatherButton.addEventListener('click', () => {
    validateCitySelection();
});

