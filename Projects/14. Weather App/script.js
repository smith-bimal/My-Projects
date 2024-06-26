const currentApiKey = "a0aeb998a358ffad5fbf4a8d7e00c9cb";
const searchBtn = document.querySelector("#search-btn");
const searchCity = document.querySelector(".search input");
let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=` + searchCity.value;
let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=` + searchCity.value;

const closeErrorBtn = document.querySelector("#popup-close");
const headDate = document.querySelector("#main-day");
const headMonth = document.querySelector("#main-month");
const dateFn = new Date();
const date = dateFn.getDate();
const month = dateFn.getMonth();
const dayIdx = dateFn.getDay();


const bgVideo = document.querySelector(".card video");
const mainWeatherLogo = document.querySelector(".hero-sec img");
const mainWeatherName = document.querySelector("#weather-type");
const mainTemp = document.querySelector("#temp");
const mainCity = document.querySelector("#city");
const weatherDesc = document.querySelector("#weather-description");
const mainMaxTemp = document.querySelector("#max-temp");
const mainMinTemp = document.querySelector("#min-temp");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");



const checkDate = () => {

    if (date < 10) {
        headDate.innerHTML = `0${date}`;
    } else {
        headDate.innerHTML = date;
    }

    switch (month) {
        case 0:
            headMonth.innerHTML = "Jan";
            break;
        case 1:
            headMonth.innerHTML = "Feb";
            break;
        case 2:
            headMonth.innerHTML = "Mar";
            break;
        case 3:
            headMonth.innerHTML = "Apr";
            break;
        case 4:
            headMonth.innerHTML = "May";
            break;
        case 5:
            headMonth.innerHTML = "Jun";
            break;
        case 6:
            headMonth.innerHTML = "Jul";
            break;
        case 7:
            headMonth.innerHTML = "Aug";
            break;
        case 8:
            headMonth.innerHTML = "Sep";
            break;
        case 9:
            headMonth.innerHTML = "Oct";
            break;
        case 10:
            headMonth.innerHTML = "Nov";
            break;
        case 11:
            headMonth.innerHTML = "Dec";
            break;
    }
}
checkDate();

let checkTableDay = () => {
}
checkTableDay();

searchBtn.addEventListener("click", () => {

    function errorPopup() {
        document.querySelector("#popup-msg").style.transform = "translate(-50%, -50%) scale(1)";
        document.querySelector(".hero-container").style.display = "none";
        searchCity.setAttribute("disabled", true);

        closeErrorBtn.addEventListener("click", () => {
            searchCity.removeAttribute("disabled");
            document.querySelector("#popup-msg").style.transform = "translate(-50%, -50%) scale(0)";
            document.querySelector(".hero-container").style.display = "flex";
        })
    }

    if (searchCity.value == "") {
        errorPopup();
    } else {
        currentApiUrl += searchCity.value;
        forecastApiUrl += searchCity.value;

        async function checkCurrentWeather() {
            // try {
            let currentResponse = await fetch(currentApiUrl + `&appId=${currentApiKey}`);
            let currentData = await currentResponse.json();
            let weather = currentData.weather[0].main;

            mainWeatherName.innerHTML = weather;
            mainWeatherLogo.style.opacity = "1";
            mainTemp.innerHTML = Math.round(currentData.main.temp);
            mainCity.innerHTML = currentData.name;
            weatherDesc.innerHTML = currentData.weather[0].description;
            mainMaxTemp.innerHTML = currentData.main.temp_max + "°c";
            mainMinTemp.innerHTML = currentData.main.temp_min + "°c";
            humidity.innerHTML = currentData.main.humidity;
            windSpeed.innerHTML = currentData.wind.speed;

            function weatherVisual(name) {
                if (name == "") {
                    bgVideo.src = `BG-videos/Default.mp4`;
                    mainWeatherLogo.src = `Images/Clear.png`;
                } else if (name == "Clouds" || name == "Clear" || name == "Drizzle" || name == "Rain" || name == "Snow" || name == "Thunderstorm") {
                    bgVideo.src = `BG-videos/${name}.mp4`;
                    mainWeatherLogo.src = `Images/${name}.png`;
                } else {
                    bgVideo.src = `BG-videos/Mist.mp4`;
                    mainWeatherLogo.src = `Images/Mist.png`;
                }
            }
            weatherVisual(weather);
            // } catch (error) {
            //     errorPopup();
            //     console.log("Invalid City Name");
            // }

        }

        // As I am using then() and catch() functions, I have commented out the try() catch() function
        checkCurrentWeather().then(() => {
            console.log("city Loaded");
        }).catch((err) => {
            console.log("Invalid City Name");
        });

        async function checkForecastWeather() {

            try {
                let forecastResponse = await fetch(forecastApiUrl + `&appId=${currentApiKey}`);
                let forecastData = await forecastResponse.json();

                let i = 0;
                const miniTime = document.querySelectorAll(".mini-hour");
                const miniTemp = document.querySelectorAll(".mini-hour-temp");
                const miniWeatherHourLogo = document.querySelectorAll(".mini-tab img")

                miniTime.forEach((el) => {
                    const unixTime = forecastData.list[i].dt;
                    let unixDateCon = new Date(unixTime * 1000);
                    el.innerHTML = unixDateCon.getHours() + ' : ' + unixDateCon.getMinutes();
                    i++;
                })

                i = 0;
                miniTemp.forEach((el) => {
                    const Temp = forecastData.list[i].main.temp;
                    el.innerHTML = Math.floor(Temp) + "°c";
                    i++;
                })

                i = 0;
                miniWeatherHourLogo.forEach((el) => {
                    let weatherLogoName = forecastData.list[i].weather[0].main
                    el.style.opacity = "1";

                    if (weatherLogoName == "") {
                        el.src = `Images/Clear.png`;
                    } else if (weatherLogoName == "Clouds" || weatherLogoName == "Clear" || weatherLogoName == "Drizzle" || weatherLogoName == "Rain" || weatherLogoName == "Snow" || weatherLogoName == "Thunderstorm") {
                        el.src = `Images/${weatherLogoName}.png`;
                    } else {
                        el.src = `Images/Mist.png`;
                    }
                })

                const fdForecarstWeathers = document.querySelectorAll(".mini5-weather");
                let idx = 0;
                fdForecarstWeathers.forEach((weatherText) => {
                    let temp = forecastData.list[idx].main.temp;

                    weatherText.innerHTML = forecastData.list[idx].weather[0].main;
                    weatherText.nextElementSibling.firstElementChild.src = `Images/${forecastData.list[idx].weather[0].main}.png`;
                    weatherText.nextElementSibling.firstElementChild.style.opacity = "1";
                    weatherText.nextElementSibling.nextElementSibling.innerHTML = Math.floor(temp) + "°c";
                    idx += 8;
                })

                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                const miniDays = document.querySelectorAll(".nextday");
                let weekIdx;

                miniDays.forEach((el, idx) => {
                    let weekIdx = (dayIdx + idx + 1) % 7; // Calculate the index of the next day
                    el.innerHTML = days[weekIdx];
                })
            } catch (error) {
                errorPopup();
                console.log("Invalid City Name");
            }


        }

        checkForecastWeather();
    }

    searchCity.value = "";
    currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=` + searchCity.value;
    forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=` + searchCity.value;
})


