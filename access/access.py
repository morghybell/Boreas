from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import secrets
import traceback

app = Flask(__name__)
CORS(app)
DB_PATH = "boreas.db"

# Ensure the table exists
def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                username TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                city TEXT NOT NULL,
                password TEXT NOT NULL,
                sessionKey TEXT
            )
        ''')
        conn.commit()

# Helper function to generate a session key
def generate_session_key():
    return secrets.token_hex(16)

@app.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT sessionKey, city FROM users WHERE username = ? AND password = ?", (username, password, ))
        row = cursor.fetchone()

    if row:
        sessionKey, city = row
        return jsonify({"sessionKey": sessionKey, "city": city, "username": username})
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@app.route("/validateSessionKey", methods=["GET"])
def validate_session_key():
    data = request.get_json()
    sessionKey = data.get("sessionKey")

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT 1 FROM users WHERE sessionKey = ? ", (sessionKey, ))
        if not cursor.fetchone():
            return jsonify({"error": "Invalid sessionKey"}), 401
    
    return '', 200

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    city = data.get("city")
    password = data.get("password")
    sessionKey = generate_session_key()

    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT 1 FROM users WHERE username = ?", (username, ))
            if cursor.fetchone():
                return jsonify({"error": "Username already exists"}), 409
            
            cursor.execute("SELECT 1 FROM users WHERE email = ?", (email, ))
            if cursor.fetchone():
                return jsonify({"error": "Email already exists"}), 409

            cursor.execute(
                "INSERT INTO users (username, email, city, password, sessionKey) VALUES (?, ?, ?, ?, ?)",
                (username, email, city, password, sessionKey)
            )
            conn.commit()
        return jsonify({"sessionKey": sessionKey, "city": city, "username": username})
    except Exception as e:
        print(traceback.format_exc())
        print("Error: ", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=4209, debug=True)

