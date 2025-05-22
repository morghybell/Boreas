from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import random
from zephyros import Zephyros

app = Flask(__name__)
CORS(app)

SESSION_VALIDATION_URL = 'http://localhost:4209/validateSessionKey'
CHECK_PRIVILEGE_URL = 'http://localhost:4209/checkPrivilege'
STORE_REQUEST_URL = 'http://localhost:4209/storeRequest'

server_status = True

def generate_response(city, day):
    res = []
    weather = Zephyros()
	
    for _ in range (0, day + 1):	    
        weather.simulate_weather(city)
        res.append({
            "city": city,
            "type": weather.type,
            "temperature": weather.temperature,
            "humidity": weather.humidity,
            "pressure": weather.pressure,
            "wind_velocity": weather.wind_velocity,
            "wind_direction": weather.wind_direction
        })

    return res

@app.route("/setServerStatus", methods=["POST"])
def set_server_status():
    global server_status
    
    data = request.get_json()
    sessionKey = data.get("sessionKey")
    server_status = data.get("server_status")

    # Make POST request to validate session
    try:
        response = requests.post(CHECK_PRIVILEGE_URL, json={'sessionKey': sessionKey})

        if response.status_code == 200:
            server_status = bool(server_status) 
            print(f'server_status: {server_status}')
            return '', 200
        else:
            return jsonify({'status': 'Session key is invalid'}), 401

    except requests.RequestException as e:
        return jsonify({'error': 'Failed to validate sessionKey', 'details': str(e)}), 502

@app.route("/getServerStatus", methods=["POST"])
def get_server_status():
    global server_status
    
    data = request.get_json()
    sessionKey = data.get("sessionKey")

    # Make POST request to validate session
    try:
        response = requests.post(CHECK_PRIVILEGE_URL, json={'sessionKey': sessionKey})

        if response.status_code == 200:
            server_status = bool(server_status) 
            return jsonify({'server_status': server_status}), 200
        else:
            return jsonify({'status': 'Session key is invalid'}), 401

    except requests.RequestException as e:
        return jsonify({'error': 'Failed to validate sessionKey', 'details': str(e)}), 502

@app.route("/simulateweather", methods=["POST"])
def simulate():
    global server_status
    if server_status == False:
        raise ConnectionResetError("Server Disabled")

    data = request.get_json()
    city = data.get("city")
    sessionKey = data.get("sessionKey")
    day = data.get("day")
    username = data.get("username")
 
    if not sessionKey or not city or not day or not username:
        return jsonify({'error': 'Missing sessionKey, city, day and username'}), 400
    
    day = int(day)

    # Make POST request to validate session
    try:
        response = requests.post(SESSION_VALIDATION_URL, json={'sessionKey': sessionKey})

        if response.status_code == 200:
            requests.post(STORE_REQUEST_URL, json={'city': city, 'day': day, 'username': username})
            return jsonify(generate_response(city, day)), 200
        else:
            return jsonify({'status': 'Session key is invalid'}), 401

    except requests.RequestException as e:
        return jsonify({'error': 'Failed to validate sessionKey', 'details': str(e)}), 502

if __name__ == "__main__":
    random.seed()
    app.run(host="0.0.0.0", port=6969, debug=True)

