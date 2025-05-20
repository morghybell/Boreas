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
	localStorage.removeItem("sessionKey");
	localStorage.removeItem("city");
	localStorage.removeItem("username");
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
      return;
}

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
    name.textContent = admin.username;

    adminItem.appendChild(email);
    adminItem.appendChild(name);
    adminList.appendChild(adminItem);
  });
}

let simul_chart = undefined;
let utenti_chart = undefined;

function updateCharts(charts_data) {
	const simulationsCtx = document.getElementById('simulChart').getContext('2d');
	const utentiCtx = document.getElementById('utentiChart').getContext('2d');

	let simul_data = [];
	let simul_dates = [];
	charts_data.requests.forEach((req_cnt) => {
		simul_data.push(req_cnt.request_count);
		simul_dates.push(req_cnt.date);
	});


	let users_data = [];
	let users_dates = [];
	charts_data.users.forEach((user_cnt) => {
		users_data.push(user_cnt.user_count);
		users_dates.push(user_cnt.date);
	});

	let simul_chart = new Chart(simulationsCtx, {
	  type: 'line',
	  data: {
		labels: simul_dates,
		datasets: [{
		  label: 'Simulazioni',
		  data: simul_data,
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
		labels: users_dates,
		datasets: [{
		  label: 'Utenti',
		  data: users_data,
		  backgroundColor: 'rgba(76, 175, 80, 0.2)',
		  borderColor: '#4caf50',
		  borderWidth: 2,
		  fill: true
		}]
	  }
	});

	return;
}

async function retrieve_dashboard_data() {
	const data = {
		sessionKey: String(localStorage.getItem("sessionKey") ?? "nosessionkey")
	};
	
	const res = await fetch("http://localhost:4209/getDashboardData", {
        method: "POST",
	    headers: {
        	'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
	
    if (res.ok) {
        const dashboard_data = await res.json();
		return dashboard_data;
	} else if (res.status == 401) {
        alert("Unathorized access to dashboard.");
		return undefined;
    } else {
		console.log(res);
		alert("Unknown error.");
        const response = await res.json();
		console.log("Response: ", response);
		return undefined;
	}

	return undefined;
}

// Load on DOM ready
document.addEventListener('DOMContentLoaded', async () => {
	const dashboard_data = await retrieve_dashboard_data();
	if (dashboard_data === undefined) return;
	
	loadAdmins(dashboard_data.admins);
	updateCharts(dashboard_data.charts_data);

    document.getElementById("tot-sims").innerHTML = `Simulazioni Totali: <strong>${dashboard_data.total_requests}</strong>`;
    document.getElementById("tot-users").innerHTML = `Numero Utenti: <strong>${dashboard_data.total_users}</strong>`;

});

