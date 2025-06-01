from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app) 

@app.route('/')
def index():
    return render_template('index.html')


def get_coordinates(city_name):
    url = 'https://nominatim.openstreetmap.org/search' 
    params = {
        'q':city_name,
        'format': 'json',
        'limit': 1,
        'countrycodes': 'gb,us,ca,de,at,lt,pl'
    }

    #api call to nominatim api
    try:
        response = requests.get(url, params=params, headers={'User-Agent': 'my-weather-app'})

        data = response.json()
        if not data:
            return 'no result found'
        lat = data[0]['lat']
        lon = data[0]['lon']
        print(lat, lon)
        return ([lat,lon])
    
    except requests.RequestException as e:
        print(f'Error fetching coordinates {e}')
        return None
    

def get_weather_data(lon, lat):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": "temperature_2m,weather_code",
        "daily": "temperature_2m_max,temperature_2m_min,weather_code",
        "forecast_days": 4,
        "timezone": "auto"
    }

    #api call to open-meteo api
    try: 
        response = requests.get(url, params=params)
        data = response.json()
        return data
    
    except requests.RequestException as e:
        print(f'Error fetching weather data {e}')
        return None


@app.route('/get-weather', methods=['POST'])
def get_weather():
    city = request.json.get('city')
    coords = get_coordinates(city)

    weather_icon_map = {
    0: "sunny",
    1: "cloudy",
    2: "cloudy",
    3: "overcast",
    45: "foggy",
    48: "foggy",
    51: "rainy",
    53: "rainy",
    55: "rainy",
    56: "hail",
    57: "hail",
    61: "rainy",
    63: "rainy",
    65: "rainy",
    66: "hail",
    67: "hail",
    71: "snowy",
    73: "snowy",
    75: "snowy",
    77: "snowy",
    80: "rainy",
    81: "rainy",
    82: "rainy",
    85: "snowy",
    86: "snowy",
    95: "thunderstorm",
    96: "thunderstorm", 
    99: "thunderstorm"   
}

    weather_data = get_weather_data(coords[1], coords[0])

    current_temp = weather_data['current']['temperature_2m']
    current_conditions_code = weather_data['current']['weather_code']
    current_conditions = weather_icon_map[current_conditions_code]

    forecast_temp = []
    forecast_days = []
    forecast_weather_codes = []

    for i in range(4):
        forecast_temp.append(weather_data['daily']['temperature_2m_max'][i])
        weather_icon_number = weather_data['daily']['weather_code'][i]
        weather_icon = weather_icon_map[weather_icon_number]

        forecast_weather_codes.append(weather_icon)
        date_str = weather_data['daily']['time'][i]
        date_obj = datetime.fromisoformat(date_str)
        weekday = date_obj.strftime('%a')
        forecast_days.append(weekday)

    return jsonify({
        "city": city,
        "current_temp": current_temp,
        "current_conditions": current_conditions,
        "forecast": {
            "temps": forecast_temp,
            "days": forecast_days,
            "weather_codes": forecast_weather_codes
        }
    })


if __name__ == '__main__':
    app.run(debug=True)

