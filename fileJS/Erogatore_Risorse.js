function popolaTabella(users_data) {
  const tbody = document.querySelector('#resource-table tbody');
  tbody.innerHTML = '';

  users_data.forEach((user) => {
    const tr = document.createElement('tr');

    const tdUsername = document.createElement('td');
    tdUsername.textContent = user.username;

    const tdUsate = document.createElement('td');
    tdUsate.textContent = user.usedResources;

    const tdDisponibili = document.createElement('td');
    tdDisponibili.contentEditable = true;
    tdDisponibili.textContent = user.availableResources;

    const tdAdmin = document.createElement('td');
    const checkboxAdmin = document.createElement('input');
    checkboxAdmin.type = 'checkbox';
    checkboxAdmin.checked = user.isAdmin;
    tdAdmin.appendChild(checkboxAdmin);

    const tdBlacklist = document.createElement('td');
    const checkboxBlacklist = document.createElement('input');
    checkboxBlacklist.type = 'checkbox';
    checkboxBlacklist.checked = user.isBlackListed;
    tdBlacklist.appendChild(checkboxBlacklist);

    tr.appendChild(tdUsername);
    tr.appendChild(tdUsate);
    tr.appendChild(tdDisponibili);
    tr.appendChild(tdAdmin);
    tr.appendChild(tdBlacklist);

    tbody.appendChild(tr);
  });
}

async function update_users_info(users) {
	const data = {
		users: users,
		sessionKey: String(localStorage.getItem("sessionKey") ?? "nosessionkey")
	};

	const res = await fetch("http://localhost:4209/updateUsersInfo", {
        method: "POST",
	    headers: {
        	'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
	
    if (res.status == 200) {
		return true;
	} else if (res.status == 401) {
        alert("Unathorized access to management resources.");
		return false;
    } else {
		console.log(res);
		alert("Unknown error.");
        const response = await res.json();
		console.log("Response: ", response);
		return false;
	}

	return false;
}

document.getElementById('upload-button').addEventListener('click', async () => {
	const rows = document.querySelectorAll('#resource-table tbody tr');
	const users = [];

	rows.forEach(row => {
		const username = row.cells[0].textContent.trim();
		const risorseUsate = parseInt(row.cells[1].textContent.trim(), 10);
		const risorseDisponibili = parseInt(row.cells[2].textContent.trim(), 10);
		const isAdmin = row.cells[3].querySelector('input[type="checkbox"]').checked; 
		const isBlacklisted = row.cells[4].querySelector('input[type="checkbox"]').checked; 

		users.push({
			username: username,
			availableResources: risorseDisponibili,
			isBlackListed: isBlacklisted,
			isAdmin: isAdmin
		});
	});

	if (await update_users_info(users) === false) {
		return;
	}
		
	showSaveBanner();
	
	popolaBlacklist(users);

	return;
});

function showSaveBanner() {
    const banner = document.getElementById('save-banner');
    banner.classList.add('show');

    setTimeout(() => {
        banner.classList.remove('show');
    }, 3000); 
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
}

function popolaBlacklist(users) {
	let blacklisted = [];
	users.forEach((user) => {
		if (user.isBlackListed) {
			blacklisted.push(user.username);
		}
	});

	const tbody = document.querySelector('#blacklist-table tbody');
	tbody.innerHTML = '';

	blacklisted.forEach((username) => {
		const tr = document.createElement('tr');
		const td = document.createElement('td');
		td.textContent = username;
		tr.appendChild(td);
		tbody.appendChild(tr);
	});

	return;
}

async function retrieve_users_info() {
	const data = {
		sessionKey: String(localStorage.getItem("sessionKey") ?? "nosessionkey")
	};
	
	const res = await fetch("http://localhost:4209/getUsersInfo", {
        method: "POST",
	    headers: {
        	'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
	
    if (res.ok) {
        const users_data = await res.json();
		return users_data;
	} else if (res.status == 401) {
        alert("Unathorized access to management resources.");
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

// Carica la blacklist
document.addEventListener('DOMContentLoaded', async () => {
	const users_data = await retrieve_users_info();
	if (users_data === undefined) return;
	
	popolaTabella(users_data);
	popolaBlacklist(users_data);
});

