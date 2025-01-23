const temperature = 15;
    const windSpeed = 8;
    const windChill = calculateWindChill(temperature, windSpeed);

    function calculateWindChill(temp, speed) {
        if (temp <= 10 && speed > 4.8) {
            return Math.round(13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16));
        } else {
            return "N/A";
        }
    }

    document.getElementById('weather').querySelector('p:nth-child(4)').textContent = `Wind Chill: ${windChill}°C`;