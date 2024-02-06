import { useEffect } from 'react';
import './WeatherApp.css';

import search_icon from "../Assets/search_7263379.png";
import clear_icon from "../Assets/sun_3917805.png";
import cloud_icon from "../Assets/cloudy_5904053.png";
import rain_icon from "../Assets/rain_4356217.png";
import snow_icon from "../Assets/snowy_1163658.png";
import humidity_icon from "../Assets/water_2792706.png";
import wind_icon from "../Assets/hail_4161089.png";

import sunny_image from "../WeatherApp/BackgroundImage/pexels-jimmy-chan-1117403.jpg";
import cloudy_image from "../WeatherApp/BackgroundImage/661270.jpg";
import rainy_image from "../WeatherApp/BackgroundImage/raindrop-6544618_1280.jpg";
import snowy_image from "../WeatherApp/BackgroundImage/pexels-trang-pham-954710.jpg";


const WeatherApp = () => {

    let api_key = "fe3d15863e456260c0c93b76cf2dc107";

    const wicon = clear_icon;

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                search();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    });

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }

        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let weatherResponse = await fetch(weatherUrl);
        let weatherData = await weatherResponse.json();


        // Forecast
        let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${element[0].value}&appid=${api_key}&units=metric`;

        let forecastResponse = await fetch(forecastUrl);
        let forecastData = await forecastResponse.json();

        const options = {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        };

        // Today
        const day = document.getElementsByClassName("day");
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        day[0].innerHTML = new Date().toLocaleDateString("hu-HU", options);
        humidity[0].innerHTML = weatherData.main.humidity + " %";
        wind[0].innerHTML = Math.floor(weatherData.wind.speed) + " km/h";
        temperature[0].innerHTML = Math.floor(weatherData.main.temp) + "°C";
        location[0].innerHTML = weatherData.name;

        // Forecast
        for (let i = 0; i < forecastData.list.length; i += 8) {

            // Display date
            const minicardDay = document.querySelectorAll(".minicard-day");

            // minicardDay.forEach(md => {
            //     md.innerHTML = new Date(forecastData.list[i].dt_txt).toLocaleDateString("hu-HU", options) + " óra";
            // });

            minicardDay[0].innerHTML = new Date(forecastData.list[2].dt_txt).toLocaleDateString("hu-HU", options);
            minicardDay[1].innerHTML = new Date(forecastData.list[8].dt_txt).toLocaleDateString("hu-HU", options);
            minicardDay[2].innerHTML = new Date(forecastData.list[16].dt_txt).toLocaleDateString("hu-HU", options);
            minicardDay[3].innerHTML = new Date(forecastData.list[24].dt_txt).toLocaleDateString("hu-HU", options);
            minicardDay[4].innerHTML = new Date(forecastData.list[32].dt_txt).toLocaleDateString("hu-HU", options);
            minicardDay[5].innerHTML = new Date(forecastData.list[39].dt_txt).toLocaleDateString("hu-HU", options);

            // Display temperature
            const temperature = document.querySelectorAll(".minicard-weather-temp");
            temperature[0].innerHTML = Math.floor(forecastData.list[2].main.temp) + "°C";
            temperature[1].innerHTML = Math.floor(forecastData.list[8].main.temp) + "°C";
            temperature[2].innerHTML = Math.floor(forecastData.list[16].main.temp) + "°C";
            temperature[3].innerHTML = Math.floor(forecastData.list[24].main.temp) + "°C";
            temperature[4].innerHTML = Math.floor(forecastData.list[32].main.temp) + "°C";
            temperature[5].innerHTML = Math.floor(forecastData.list[39].main.temp) + "°C";

            // Weather icons selection
            const weatherImage = document.querySelectorAll(".weather-image > img");

            if (forecastData.list[0].weather[0].main === "Clouds") {
                weatherImage[0].src = cloud_icon;
                document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${cloudy_image})`;
                document.body.style.backgroundSize = "cover";
            }
            else if (forecastData.list[0].weather[0].main === "Rain") {
                weatherImage[0].src = rain_icon;
                document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${rainy_image})`;
                document.body.style.backgroundSize = "cover";
            }
            else if (forecastData.list[0].weather[0].main === "Snow") {
                weatherImage[0].src = snow_icon;
                document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${snowy_image})`;
                document.body.style.backgroundSize = "cover";
            }
            else if (forecastData.list[0].weather[0].main === "Clear") {
                weatherImage[0].src = clear_icon;
                document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${sunny_image})`;
                document.body.style.backgroundSize = "cover";
            }
            else {
                weatherImage[0].src = clear_icon;
            }

            if (forecastData.list[2].weather[0].main === "Clouds") {
                weatherImage[1].src = cloud_icon;
            }
            else if (forecastData.list[2].weather[0].main === "Rain") {
                weatherImage[1].src = rain_icon;
            }
            else if (forecastData.list[2].weather[0].main === "Snow") {
                weatherImage[1].src = snow_icon;
            }
            else if (forecastData.list[2].weather[0].main === "Clear") {
                weatherImage[1].src = clear_icon;
            }
            else {
                weatherImage[1].src = clear_icon;
            }

            if (forecastData.list[8].weather[0].main === "Clouds") {
                weatherImage[2].src = cloud_icon;
            }
            else if (forecastData.list[8].weather[0].main === "Rain") {
                weatherImage[2].src = rain_icon;
            }
            else if (forecastData.list[8].weather[0].main === "Snow") {
                weatherImage[2].src = snow_icon;
            }
            else if (forecastData.list[8].weather[0].main === "Clear") {
                weatherImage[2].src = clear_icon;
            }
            else {
                weatherImage[2].src = clear_icon;
            }

            if (forecastData.list[16].weather[0].main === "Clouds") {
                weatherImage[3].src = cloud_icon;
            }
            else if (forecastData.list[16].weather[0].main === "Rain") {
                weatherImage[3].src = rain_icon;
            }
            else if (forecastData.list[16].weather[0].main === "Snow") {
                weatherImage[3].src = snow_icon;
            }
            else if (forecastData.list[16].weather[0].main === "Clear") {
                weatherImage[3].src = clear_icon;
            }
            else {
                weatherImage[3].src = clear_icon;
            }

            if (forecastData.list[24].weather[0].main === "Clouds") {
                weatherImage[4].src = cloud_icon;
            }
            else if (forecastData.list[24].weather[0].main === "Rain") {
                weatherImage[4].src = rain_icon;
            }
            else if (forecastData.list[24].weather[0].main === "Snow") {
                weatherImage[4].src = snow_icon;
            }
            else if (forecastData.list[24].weather[0].main === "Clear") {
                weatherImage[4].src = clear_icon;
            }
            else {
                weatherImage[4].src = clear_icon;
            }

            if (forecastData.list[32].weather[0].main === "Clouds") {
                weatherImage[5].src = cloud_icon;
            }
            else if (forecastData.list[32].weather[0].main === "Rain") {
                weatherImage[5].src = rain_icon;
            }
            else if (forecastData.list[32].weather[0].main === "Snow") {
                weatherImage[5].src = snow_icon;
            }
            else if (forecastData.list[32].weather[0].main === "Clear") {
                weatherImage[5].src = clear_icon;
            }
            else {
                weatherImage[5].src = clear_icon;
            }

            if (forecastData.list[39].weather[0].main === "Clouds") {
                weatherImage[6].src = cloud_icon;
            }
            else if (forecastData.list[39].weather[0].main === "Rain") {
                weatherImage[6].src = rain_icon;
            }
            else if (forecastData.list[39].weather[0].main === "Snow") {
                weatherImage[6].src = snow_icon;
            }
            else if (forecastData.list[39].weather[0].main === "Clear") {
                weatherImage[6].src = clear_icon;
            }
            else {
                weatherImage[6].src = clear_icon;
            }
        }
    }

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" id="cityInput" className="cityInput" placeholder="search" />
                <div id="searchIcon" className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="card-section">
                <div className="maincard-section">
                    <div className="title">Aktuális időjárás</div>
                    <div className="maincard-content">
                        <div className="day">Mai nap</div>
                        <div className="line"></div>
                        <div className="weather-image">
                            <img src={wicon} alt="" />
                        </div>
                        <div className="weather-temp">24°C</div>
                        <div className="weather-location">London</div>
                        <div className="data-container">
                            <div className="element">
                                <img src={humidity_icon} alt="" className="icon" />
                                <div className="data">
                                    <div className="humidity-percent">64%</div>
                                    <div className="text">Páratartalom</div>
                                </div>
                            </div>
                            <div className="element">
                                <img src={wind_icon} alt="" className="icon" />
                                <div className="data">
                                    <div className="wind-rate">18 km/h</div>
                                    <div className="text">Szélsebesség</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="minicard-section">
                    <div className="title">Időjárás előrejelzés</div>
                    <div className="minicard-content">
                        <div className="minicard">
                            <div className="minicard-inner-section">
                                <div className="minicard-day">Hétfő</div>
                                <div className="minicard-line"></div>
                                <div className="weather-image">
                                    <img src={wicon} alt="" />
                                </div>
                                <div className="minicard-weather-temp">24°C</div>
                            </div>
                        </div>
                        <div className="minicard">
                            <div className="minicard-inner-section">
                                <div className="minicard-day">Hétfő</div>
                                <div className="minicard-line"></div>
                                <div className="weather-image">
                                    <img src={wicon} alt="" />
                                </div>
                                <div className="minicard-weather-temp">24°C</div>
                            </div>
                        </div>
                        <div className="minicard">
                            <div className="minicard-inner-section">
                                <div className="minicard-day">Hétfő</div>
                                <div className="minicard-line"></div>
                                <div className="weather-image">
                                    <img src={wicon} alt="" />
                                </div>
                                <div className="minicard-weather-temp">24°C</div>
                            </div>
                        </div>
                    </div>
                    <div className="minicard-content">
                        <div className="minicard">
                            <div className="minicard-inner-section">
                                <div className="minicard-day">Hétfő</div>
                                <div className="minicard-line"></div>
                                <div className="weather-image">
                                    <img src={wicon} alt="" />
                                </div>
                                <div className="minicard-weather-temp">24°C</div>
                            </div>
                        </div>
                        <div className="minicard">
                            <div className="minicard-inner-section">
                                <div className="minicard-day">Hétfő</div>
                                <div className="minicard-line"></div>
                                <div className="weather-image">
                                    <img src={wicon} alt="" />
                                </div>
                                <div className="minicard-weather-temp">24°C</div>
                            </div>
                        </div>
                        <div className="minicard">
                            <div className="minicard-inner-section">
                                <div className="minicard-day">Hétfő</div>
                                <div className="minicard-line"></div>
                                <div className="weather-image">
                                    <img src={wicon} alt="" />
                                </div>
                                <div className="minicard-weather-temp">24°C</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;