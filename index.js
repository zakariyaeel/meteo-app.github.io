const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener("click",function(){

    const APIKey = '1b5cebb4267e508c97b0026f311700c1';
    const city = document.querySelector('.search-box input').value;
    if(city === "")
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(
        json => {
            if(json.cod === '404'){
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const temperature = document.querySelector(".weather-box .temperature");
            const description = document.querySelector(".weather-box .description");
            
            const img = document.querySelector(".weather-box img");
            const humidity = document.querySelector(".weather-details .humidity span");
            const wind = document.querySelector(".weather-details .wind span");

            switch(json.weather[0].main){
                case 'Clear':
                    img.src = "img/clear.png";
                    break;
                case 'Rain':
                    img.src = "img/rain.png";
                    break;
                case 'Snow':
                    img.src = "img/snow.png";
                    break;
                case 'Clouds':
                    img.src = "img/cloud.png";
                    break;
                case 'Haze':
                    img.src = "img/haze.png";
                    break;
                case 'Mist':
                    img.src = "img/mist.png";
                    break;
                default:
                    img.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)} <sapn> °C </span>`;
            description.innerHTML = ` ${json.weather[0].description}`;
            humidity.innerHTML = ` ${json.main.humidity} %`;
            wind.innerHTML = ` ${parseInt(json.wind.speed)} km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        }


    )
})