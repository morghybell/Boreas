import ctypes
import random
import datetime

class WeatherStatus(ctypes.Structure):
    _fields_ = [
        ("temp", ctypes.c_double),
        ("pressure", ctypes.c_double),
        ("radiative_heat", ctypes.c_double),
        ("humidity", ctypes.c_double),
        ("wind_velocity", ctypes.c_double),
        ("wind_direction", ctypes.c_uint8),
        ("curr_time", ctypes.c_uint16)
    ]

class Zephyros:
    card_dir = ["N", "E", "S", "W"]

    def __init__(self):
        self.zephyros_lib = ctypes.CDLL("./liblzephyros.so")
        current_time = datetime.datetime.now()
        self.weather = WeatherStatus(
                            random.randint(-25, 25),
                            random.randint(1000, 1500),
                            random.randint(0, 50),
                            random.randint(0, 100),
                            random.randint(0, 100),
                            random.randint(0, 360),
                            current_time.minute + current_time.hour * 60)
        pass

    def simulate_weather(self, city):
        # Set the external function skeleton
        simulate_weather = self.zephyros_lib.simulate_weather
        simulate_weather.argtypes = [ctypes.POINTER(WeatherStatus), ctypes.c_uint64]
        simulate_weather.restype = WeatherStatus

        # Call the function
        self.weather = simulate_weather(ctypes.byref(self.weather), random.randint(7, 700_000) * len(city))

        self.temperature = str(self.weather.temp) + "°"
        self.pressure = str(self.weather.pressure) + "hPa"
        self.humidity = str(self.weather.humidity) + "%"
        self.wind_velocity = self.weather.wind_velocity 
        self.wind_direction = str(self.weather.wind_direction) + "°" + self.card_dir[self.weather.wind_direction // 90]
        
        if self.weather.temp < 0 and self.weather.humidity > 65:
            self.type = 2
        elif self.weather.pressure < 1100 and self.weather.humidity > 70:
            self.type = 3
        elif self.weather.pressure > 1300 and self.weather.humidity > 70:
            self.type = 4
        elif self.weather.curr_time > 60 * 7 and self.weather.curr_time < 60 * 21:
            self.type = 1
        else:
            self.type = 5

        return
