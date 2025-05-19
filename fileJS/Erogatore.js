const visiteCtx = document.getElementById('visiteChart').getContext('2d');
    const utentiCtx = document.getElementById('utentiChart').getContext('2d');

    new Chart(visiteCtx, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
        datasets: [{
          label: 'Visite',
          data: [30, 45, 60, 40, 80, 20, 70],
          backgroundColor: 'rgba(33, 150, 243, 0.2)',
          borderColor: '#2196f3',
          borderWidth: 2,
          fill: true
        }]
      }
    });

    new Chart(utentiCtx, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
        datasets: [{
          label: 'Utenti',
          data: [5, 10, 7, 12, 15, 8, 10],
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderColor: '#4caf50',
          borderWidth: 2,
          fill: true
        }]
      }
    });

    let serverOn = true;

    function toggleServer() {
      serverOn = !serverOn;
      const btn = document.getElementById('serverBtn');
      btn.textContent = serverOn ? 'Server ON' : 'Server OFF';
      btn.classList.toggle('off', !serverOn);
    }