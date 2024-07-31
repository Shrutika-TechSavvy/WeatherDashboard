document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeatherData(city);
    }
});

function getWeatherData(city) {
    const apiKey = '01a240.......................047c5';  // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    console.log('Fetching data from URL:', apiUrl); // Debugging line to check the URL
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError(error);
        });
}

function displayWeatherData(data) {
    if (data.cod !== 200) {
        displayError(data.message);
        return;
    }

    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.style.display = 'block';
    weatherInfo.innerHTML = `
        <div><i class="fas fa-city"></i><strong>City:</strong> ${data.name}</div>
        <div><i class="fas fa-thermometer-half"></i><strong>Temperature:</strong> ${data.main.temp} °C</div>
        <div><i class="fas fa-tint"></i><strong>Humidity:</strong> ${data.main.humidity} %</div>
        <div><i class="fas fa-wind"></i><strong>Wind Speed:</strong> ${data.wind.speed} m/s</div>
        <div><i class="fas fa-cloud"></i><strong>Weather:</strong> ${data.weather[0].description}</div>
    `;
}

function displayError(message) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.style.display = 'block';
    weatherInfo.innerHTML = `<div style="color: red;"><strong>Error:</strong> ${message}</div>`;
}
