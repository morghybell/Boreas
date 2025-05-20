// Simulazione dati dal database
const utenti = [
  { username: 'alice', usate: 35, disponibili: 65 },
  { username: 'bob', usate: 70, disponibili: 30 },
  { username: 'carlo', usate: 50, disponibili: 50 },
  { username: 'diana', usate: 20, disponibili: 80 }
];
function popolaTabella(dati) {
  const tbody = document.querySelector('#resource-table tbody');
  tbody.innerHTML = '';

  dati.forEach(utente => {
    const tr = document.createElement('tr');

    const tdUsername = document.createElement('td');
    tdUsername.textContent = utente.username;

    const tdUsate = document.createElement('td');
    tdUsate.textContent = utente.usate;

    const tdDisponibili = document.createElement('td');
    tdDisponibili.contentEditable = true;
    tdDisponibili.textContent = utente.disponibili;

    const tdAdmin = document.createElement('td');
    const checkboxAdmin = document.createElement('input');
    checkboxAdmin.type = 'checkbox';
    checkboxAdmin.checked = !!utente.admin;
    tdAdmin.appendChild(checkboxAdmin);

    const tdBlacklist = document.createElement('td');
    const checkboxBlacklist = document.createElement('input');
    checkboxBlacklist.type = 'checkbox';
    checkboxBlacklist.checked = !!utente.blacklist;
    tdBlacklist.appendChild(checkboxBlacklist);

    tr.appendChild(tdUsername);
    tr.appendChild(tdUsate);
    tr.appendChild(tdDisponibili);
    tr.appendChild(tdAdmin);
    tr.appendChild(tdBlacklist);

    tbody.appendChild(tr);
  });
}



// Avvia al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
  popolaTabella(utenti);
});

document.getElementById('upload-button').addEventListener('click', () => {
  const rows = document.querySelectorAll('#resource-table tbody tr');
  const dataToUpload = [];

  rows.forEach(row => {
    const username = row.cells[0].textContent.trim();
    const risorseUsate = parseInt(row.cells[1].textContent.trim(), 10);
    const risorseDisponibili = parseInt(row.cells[2].textContent.trim(), 10);

    dataToUpload.push({
      username,
      usate: risorseUsate,
      disponibili: risorseDisponibili
    });
  });

  console.log('Dati da salvare:', dataToUpload);

  showSaveBanner();
});

function showSaveBanner() {
    const banner = document.getElementById('save-banner');
    banner.classList.add('show');

    setTimeout(() => {
        banner.classList.remove('show');
    }, 3000); 
}

//Blacklist
const blacklist = [
  'marco99',
  'lucia_23',
  'darkwolf',
  'sara.b',
  'x_shadow_x',
  'anonimo77',
  'hackerino',
  'nina_b',
  'errore404',
  'ghost_user'
];

function popolaBlacklist(nomi) {
  const tbody = document.querySelector('#blacklist-table tbody');
  tbody.innerHTML = '';

  nomi.forEach(username => {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = username;
    tr.appendChild(td);
    tbody.appendChild(tr);
  });
}

// Carica la blacklist
document.addEventListener('DOMContentLoaded', () => {
  popolaBlacklist(blacklist);
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