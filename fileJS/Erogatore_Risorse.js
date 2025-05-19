
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