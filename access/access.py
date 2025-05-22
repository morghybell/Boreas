from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import secrets
import traceback
import datetime
import random
import string

app = Flask(__name__)
CORS(app)
DB_PATH = "boreas.db"

def init_db(gen_data):
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                username TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                city TEXT NOT NULL,
                password TEXT NOT NULL,
                sessionKey TEXT UNIQUE NOT NULL,
                isBlackListed BOOLEAN NOT NULL,
                isAdmin BOOLEAN NOT NULL,
                availableResources INTEGER NOT NULL,
                usedResources INTEGER NOT NULL,
                creation DATE NOT NULL
        )''')

        conn.execute('''
            CREATE TABLE IF NOT EXISTS requests (
                requestId TEXT PRIMARY KEY,
                city TEXT NOT NULL,
                day INTEGER NOT NULL,
                username TEXT NOT NULL,
                date DATE NOT NULL
            )
        ''')

        conn.commit()
        
        cursor = conn.cursor()
        
        cursor.execute("SELECT 1 FROM users WHERE username = ?", ("root", ))
        if cursor.fetchone():
            return
        
        cursor.execute(
            "INSERT INTO users (username, email, city, password, sessionKey, isBlackListed, isAdmin, availableResources, usedResources, creation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            ("root", "root@root.com", "Perugia", "admin", generate_session_key(), False, True, 0, 0, datetime.date.today().isoformat())
        )
        conn.commit()

        if gen_data:
            blacklist_cnt = 50
            cities = [ "Cortona", "Perugia", "Milan", "Rome" ]
            days = ['2025-02-12', '2025-01-31', '2025-03-21', '2025-04-10', '2025-01-14', '2025-03-13', '2025-02-24', '2025-01-19', '2025-04-03', '2025-05-11']
            for i in range(0, 1500):
                username = "user_" + ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(4, 10))) 
                city = cities[random.randint(0, len(cities) - 1)]
                day = random.randint(0, 6)
                req_id = generate_session_key()
                cursor.execute(
                    "INSERT INTO requests (requestId, city, day, username, date) VALUES (?, ?, ?, ?, ?)",
                    (req_id, city, day, username, days[random.randint(0, len(days) - 1)])
                )
                
                conn.commit()

                domain = ["rd", "dr", "bd", "dw", "qw"]
                email = f"{username}@{domain[i % len(domain)]}.com"
                print(email)

                cursor.execute(
                    "INSERT INTO users (username, email, city, password, sessionKey, isBlackListed, isAdmin, availableResources, usedResources, creation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (username, email, city, "dsa", generate_session_key(), blacklist_cnt > 0, False, 0, 0, days[random.randint(0, len(days) - 1)])
                )
                conn.commit()
                
                blacklist_cnt -= 1
    return

def generate_session_key():
    return secrets.token_hex(16)

@app.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT sessionKey, city, isAdmin FROM users WHERE username = ? AND password = ?", (username, password, ))
        row = cursor.fetchone()

    if row:
        session_key, city, is_admin = row
        return jsonify({"sessionKey": session_key, "city": city, "username": username, "isAdmin": is_admin})
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@app.route("/validateSessionKey", methods=["POST"])
def validate_session_key():
    data = request.get_json()
    session_key = data.get("sessionKey")

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT availableResources FROM users WHERE sessionKey = ? ", (session_key, ))
        available_res = cursor.fetchone()[0]
        
        if not available_res:
            return jsonify({"error": "Invalid sessionKey"}), 401

        if available_res > 0:
            return '', 200
    
    return jsonify({"error": "No more available computation resources"}), 401

@app.route("/checkPrivilege", methods=["POST"])
def check_privilege():
    data = request.get_json()
    session_key = data.get("sessionKey")

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT 1 FROM users WHERE sessionKey = ? AND isAdmin = TRUE", (session_key, ))
        if not cursor.fetchone():
            return jsonify({"error": "Invalid sessionKey"}), 401

    return '', 200

@app.route("/getDashboardData", methods=["POST"])
def get_dashboard_data():
    data = request.get_json()
    session_key = data.get("sessionKey")

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT 1 FROM users WHERE sessionKey = ? AND isAdmin = TRUE", (session_key, ))
        if not cursor.fetchone():
            return jsonify({"error": "Invalid sessionKey"}), 401
 
        cursor.execute("""
            SELECT creation, COUNT(*) as user_count
            FROM users
            GROUP BY creation
            ORDER BY creation;
        """)
        rows = cursor.fetchall()
        users = [{"date": date, "user_count": count} for date, count in rows]

        cursor.execute("""
            SELECT date, COUNT(*) as request_count
            FROM requests
            GROUP BY date
            ORDER BY date;
        """)
        rows = cursor.fetchall()
        requests = [{"date": date, "request_count": count} for date, count in rows]

        cursor.execute("SELECT username, email FROM users WHERE isAdmin = TRUE ")
        rows = cursor.fetchall()
        admins = [{"username": username, "email": email} for username, email in rows]

        cursor.execute("SELECT COUNT(*) FROM users;")
        total_users = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM requests;")
        total_requests = cursor.fetchone()[0]

    return jsonify({"total_requests": total_requests, "total_users": total_users, "charts_data": {"users": users, "requests": requests}, "admins": admins}), 200

@app.route("/getUsersInfo", methods=["POST"])
def get_users_info():
    data = request.get_json()
    session_key = data.get("sessionKey")

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT 1 FROM users WHERE sessionKey = ? AND isAdmin = TRUE", (session_key, ))
        if not cursor.fetchone():
            return jsonify({"error": "Invalid sessionKey"}), 401

        cursor.execute("SELECT username, availableResources, usedResources, isBlackListed, isAdmin FROM users")
        rows = cursor.fetchall()
        users = [{"username": username, "availableResources": availableResources, "usedResources": usedResources, "isBlackListed": isBlackListed, "isAdmin": isAdmin} for username, availableResources, usedResources, isBlackListed, isAdmin in rows]

    return jsonify(users), 200

@app.route("/getRequests", methods=["POST"])
def get_requests():
    data = request.get_json()
    session_key = data.get("sessionKey")

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT 1 FROM users WHERE sessionKey = ? AND isAdmin = TRUE", (session_key, ))
        if not cursor.fetchone():
            return jsonify({"error": "Invalid sessionKey"}), 401

        cursor.execute("SELECT * FROM requests")
        rows = cursor.fetchall()
        requests = [{"username": username, "city": city, "requestId": requestId, "date": date, "day": int(day) + 1} for requestId, city, day, username, date in rows]

    return jsonify(requests), 200

@app.route("/updateUsersInfo", methods=["POST"])
def update_users():
    data = request.get_json()
    users = data.get("users")
    session_key = data.get("sessionKey")

    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT 1 FROM users WHERE sessionKey = ? AND isAdmin = TRUE", (session_key, ))
            if not cursor.fetchone():
                return jsonify({"error": "Invalid sessionKey"}), 401
            for user in users:
                cursor.execute(
                    "UPDATE users SET isBlackListed = ?, isAdmin = ?, availableResources = ? WHERE username = ?",
                    (user.get("isBlackListed"), user.get("isAdmin"), user.get("availableResources"), user.get("username")))
            conn.commit()
        return '', 200
    
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    city = data.get("city")
    password = data.get("password")
    session_key = generate_session_key()

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
                "INSERT INTO users (username, email, city, password, sessionKey, isBlackListed, isAdmin, availableResources, usedResources, creation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (username, email, city, password, session_key, False, False, 100, 0, datetime.date.today().isoformat())
            )
            conn.commit()
        return jsonify({"sessionKey": session_key, "city": city, "username": username})
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route("/storeRequest", methods=["POST"])
def store_request():
    data = request.get_json()
    username = data.get("username")
    city = data.get("city")
    day = data.get("day")
    req_id = generate_session_key()

    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO requests (requestId, city, day, username, date) VALUES (?, ?, ?, ?, ?)",
                (req_id, city, day, username, datetime.date.today().isoformat())
            )
            
            conn.commit()
            
            cursor.execute(
                "UPDATE users SET availableResources = availableResources - 1, usedResources = usedResources + 1 WHERE username = ?", (username, ))
            conn.commit()
        return '', 200
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # TODO: Maybe makes sense to factor out the database stuff within a class for Clean-Code
    init_db(True)
    app.run(host="0.0.0.0", port=4209, debug=True)

