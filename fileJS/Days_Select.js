function populateDaysSelect() {
    const daysSelect = document.getElementById('days-select'); // ✅ Add this line
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
