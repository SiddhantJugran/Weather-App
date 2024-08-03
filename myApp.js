let search = document.querySelector("#search");
let button = document.querySelector("#submit");
const weather = (event) => {
    if (event != undefined) event.preventDefault();
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${search.value}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c9e328a14dmsh5734f07c87aefa1p1e9986jsnf4e02e761988',
            'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
        }
    };

    async function func() {

        let cityName = document.querySelector("#cityName")
        let temperature = document.querySelector("#temp");
        let condition = document.querySelector("#condition")
        let feelsLike = document.querySelector("#feelsLike")
        let wind = document.querySelector("#wind")
        let humidity = document.querySelector("#humidity")
        let pressure = document.querySelector("#pressure")
        let image = document.querySelector("#image");
        temperature.innerHTML = `Fetching Data...`
        temperature.style.fontSize = "40px"
        temperature.style.fontWeight = "600";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            cityName.innerText = `${search.value.toUpperCase()} , ${result["sys"]["country"]}`;
            temperature.innerHTML = `${(result["main"]["temp"] - 273.15).toFixed(2)} <sup>o</sup>DEG`
            condition.innerText = `${result["weather"][0]["description"]}`
            feelsLike.innerHTML = `Feels Like : ${(result["main"]["feels_like"] - 273.15).toFixed(2)} <sup>o</sup>DEG`
            wind.innerHTML = `Wind : ${result["wind"]["speed"]} km/h`
            humidity.innerHTML = `Humidity : ${result["main"]["humidity"]}%`
            pressure.innerHTML = `Pressure : ${(result["main"]["pressure"]).toFixed(2)} hPa`
            condition = result["weather"][0]["description"].toLowerCase();
            
            if ( condition.includes("sunny") || condition.includes("fair") || condition.includes("clear") ) image.src = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png";
            
            else if ( condition.includes("cloud") || condition.includes("cloudy") ) image.src = "https://cdn.iconscout.com/icon/free/png-256/free-cloudy-cloud-snow-weather-38920.png?f=webp&w=256";
            
            else if ( condition.includes("rain") ) image.src = "https://cdn.iconscout.com/icon/premium/png-256-thumb/rain-4727361-3922962.png"

            else if ( condition.includes("thunderstorm") || condition.includes("lightning") ) image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnU_XD8ebWN41HSBoBjAO526WYhsOzt4iH5Q&s";

            else if( condition.includes("mist") || condition.includes("haze") ) image.src="https://cdn.iconscout.com/icon/premium/png-256-thumb/foggy-weather-532284.png"
        } catch (error) {
            temperature.innerHTML = `Opps! Try Again`
        }

    }

    func();
}

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};
let time = document.querySelector("#time");
const date = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', options);
    time.innerText = formattedDate;
}
const dateInterval = () => {
    setInterval(() => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', options);
        time.innerText = formattedDate;
    }, 1000);
}
button.addEventListener("click", weather)

// Calling the weather function when the page reloads
weather();

// Calling date function when the page reloads
date();

// Calling dateInterval function to update time 
dateInterval();

