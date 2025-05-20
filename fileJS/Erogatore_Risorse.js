
// Funzione per gestire l'aumento delle risorse
document.getElementById('increase-resource').addEventListener('click', () => {
  userResources += 10;
  if (userResources > 1000) userResources = 1000;
  document.getElementById('user-resource').value = userResources;
  document.getElementById('resource-status').textContent = userResources;
});

// Funzione per gestire la diminuzione delle risorse
document.getElementById('decrease-resource').addEventListener('click', () => {
  userResources -= 10;
  if (userResources < 1) userResources = 1;
  document.getElementById('user-resource').value = userResources;
  document.getElementById('resource-status').textContent = userResources;
});

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