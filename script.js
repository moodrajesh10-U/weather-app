const apiKey = 'your-api-key-here';
let targetLocation = 'Mumbai';
const temperatureField = document.querySelector('.temperature');
const locationField = document.querySelector('.location');
const dateTimeField = document.querySelector('.date-time');
const conditionField = document.querySelector('.condition');
const searchField = document.querySelector('.search-field');
const form = document.querySelector('form');
async function fetchResults(location) {
    try {
        const url = `
http: //api.weather api.com/v1/current.json?key=${apiKey}&q=${location}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
    }
}

function updateDetails(temp, locationName, time, condition) {
    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateTimeField.innerText = time;
    conditionField.innerText = condition;
}

function getDayName(dayNum) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNum] || '';
}

async function displayWeather(location) {
    const data = await fetchResults(location);
    if (!data) return;
    const locationName = data.location.name;
    const localTime = data.location.localtime;
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;
    const [dateStr, timeStr] = localTime.split(' ');
    const dayNum = new Date(dateStr).getDay();
    const dayName = getDayName(dayNum);
    const formattedTime = `${dayName}, ${dateStr} ${timeStr}`;
    updateDetails(temp, locationName, formattedTime, condition);
}

function searchLocation(event) {
    event.preventDefault();
    const location = searchField.value.trim();
    if (location) {
        targetLocation = location;
        displayWeather(targetLocation);
    } else {
        console.log('Please enter a location');
    }
}
displayWeather(targetLocation);
form.addEventListener('submit', searchLocation);
