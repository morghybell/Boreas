const apiUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const apiKey = '501ec0031dmshf638f1d4f016460p16aecejsn1d5e2739e2f1';

const cityInput = document.getElementById('city-input');
const citySuggestions = document.getElementById('city-suggestions');
const errorMessage = document.getElementById('error-message');
const showWeatherButton = document.querySelector('button');
const daysSelect = document.getElementById('days-select');

let timeout; // Per evitare richieste troppo rapide mentre si digita
let selectedCity = null; // Per tenere traccia della città selezionata

// Funzione per ottenere le città in base all'input
async function fetchCitySuggestions(query) {
    if (!query) return;  // Se l'input è vuoto, non fare la richiesta

    try {
        const response = await fetch(`${apiUrl}?namePrefix=${query}&limit=10`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
                'X-RapidAPI-Key': apiKey
            }
        });

        const data = await response.json();
        displayCitySuggestions(data.data); // Mostra i suggerimenti

    } catch (error) {
        console.error('Errore nel recuperare le città:', error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // Imposta Perugia come città predefinita
    cityInput.value = localStorage.getItem("city");
    selectedCity = { name: cityInput.value }; // Puoi aggiungere anche lat/lon se servono in seguito

    // Seleziona il primo giorno (cioè oggi)
    daysSelect.value = '0';
});

// Funzione per mostrare i suggerimenti delle città
function displayCitySuggestions(cities) {
    citySuggestions.innerHTML = '';  // Rimuovi i suggerimenti precedenti

    cities.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city.name;
        li.addEventListener('click', () => {
            cityInput.value = city.name;  // Imposta il campo di input con il nome della città selezionata
            selectedCity = city; // Salva la città selezionata
            citySuggestions.innerHTML = '';  // Rimuovi i suggerimenti dopo la selezione
            errorMessage.style.display = 'none'; // Nascondi il messaggio di errore
        });
        citySuggestions.appendChild(li);
    });
}

// Gestisce l'input dell'utente e limita le richieste troppo frequenti
cityInput.addEventListener('input', (event) => {
    clearTimeout(timeout); // Cancella il timeout precedente se l'utente sta scrivendo velocemente
    const query = event.target.value;

    timeout = setTimeout(() => {
        fetchCitySuggestions(query);
    }, 300); // Aspetta 300ms dopo l'ultimo carattere digitato
});


// Event listener to clear the city suggestions and input when the input is focused (clicked)
cityInput.addEventListener('focus', () => {
    cityInput.value = '';  // Clear the input field when it is focused
    citySuggestions.innerHTML = '';  // Clear suggestions when the input is clicked
    errorMessage.style.display = 'none'; // Optionally hide the error message if any
});

// Verifica se una città è stata selezionata
function validateCitySelection() {
    const selectedDay = daysSelect.value;

    if (!selectedCity || !selectedDay) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Per favore, seleziona una città e un giorno.';
    } else {
        errorMessage.style.display = 'none';

        // Logica per proseguire
        console.log(`Città: ${selectedCity.name}`);
        console.log(`Giorni: ${selectedDay}`);

        // Qui puoi chiamare la funzione per mostrare il meteo
        showWeather(selectedCity.name, selectedDay);
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

