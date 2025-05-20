const visiteCtx = document.getElementById('simulChart').getContext('2d');
const utentiCtx = document.getElementById('utentiChart').getContext('2d');

new Chart(visiteCtx, {
  type: 'line',
  data: {
    labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
    datasets: [{
      label: 'Simulazioni',
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
  const light = document.getElementById('server-light');

  btn.textContent = serverOn ? 'Server ON' : 'Server OFF';
  btn.classList.toggle('off', !serverOn);

  // Change light color on the server
  light.style.backgroundColor = serverOn ? '#29cd3a' : '#d32f2f'; // Green for ON, Red for OFF
}




function logout() {
  showLogoutNotification();
  setTimeout(() => {
    window.location.href = 'Home.html';
  }, 2000);
}

function showLogoutNotification() {
  const message = document.getElementById('logout-message');
  message.classList.remove('hidden');
  message.classList.add('show');

  setTimeout(() => {
    message.classList.remove('show');
    message.classList.add('hidden');
  }, 3000);
}

// Simulated list of admins (replace with DB data later)
const adminData = [
  { name: 'Mario Rossi', email: 'mario@example.com' },
  { name: 'Laura Bianchi', email: 'laura@example.com' },
  { name: 'Luca Verdi', email: 'luca.verdi@example.com' },
  { name: 'Sara Neri', email: 'sara.neri@example.com' }
];

function loadAdmins(admins) {
  const adminList = document.getElementById('admin-list');
  adminList.innerHTML = '';

  admins.forEach(admin => {
    const adminItem = document.createElement('div');
    adminItem.classList.add('admin-item');

    const email = document.createElement('div');
    email.classList.add('admin-email');
    email.textContent = admin.email;

    const name = document.createElement('div');
    name.classList.add('admin-name');
    name.textContent = admin.name;

    adminItem.appendChild(email);
    adminItem.appendChild(name);
    adminList.appendChild(adminItem);
  });
}

// Load on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadAdmins(adminData);
});
