from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import random

app = Flask(__name__)
CORS(app)

SESSION_VALIDATION_URL = 'http://localhost:4209/validateSessionKey'
STORE_REQUEST_URL = 'http://localhost:4209/storeRequest'

class Weather:
    card_dir = ["N", "E", "S", "W"]

    def __init__(self):
        self.type = random.randint(0, 4) + 1
        self.temperature = str(random.randint(-50, 50)) + "°"
        self.pressure = str((random.randint(0, 256)) + 1000) + "hPa"
        self.humidity = str(random.randint(0, 100)) + "%"
        self.wind_velocity = random.randint(0, 100) 
        direction = random.randint(0, 360)
        self.wind_direction = str(direction) + "°" + self.card_dir[direction // 90]
        pass

    def gen_weather(self):
        self.type = random.randint(0, 4) + 1
        self.temperature = str(random.randint(-50, 50)) + "°"
        self.pressure = str((random.randint(0, 256)) + 1000) + "hPa"
        self.humidity = str(random.randint(0, 100)) + "%"
        self.wind_velocity = random.randint(0, 100) 
        direction = random.randint(0, 360)
        self.wind_direction = str(direction) + "°" + self.card_dir[direction // 90]
        return

def generate_response(city, day):
    res = []
    weather = Weather()
	
    for i in range (0, day + 1):	    
        weather.gen_weather()
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

@app.route("/simulateweather", methods=["POST"])
def simulate():
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

