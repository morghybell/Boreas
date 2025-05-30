function populateDaysSelect() {
    const daysSelect = document.getElementById('days-select'); 
    const weekdays = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);

        let dayName = weekdays[date.getDay()];

        // Set "Today" for the first day and "Tomorrow" for the second
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

    // Set "Today" (value 0) as selected by default
    daysSelect.value = '0';
}


// Initial call
populateDaysSelect();
