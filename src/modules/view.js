import utility from "./utility";

const view = (() => {
  const contentDiv = document.querySelector('.content');

  function loadLocationContainer(data) {
    // weatherData.currentWeatherData
    const currentCity = document.querySelector('.currentCity');
    const currentCountry = document.querySelector('.currentCountry');

    currentCity.innerHTML = data.location;
    currentCountry.innerHTML = data.country;
  }

  // for currentWeatherContainer
  function loadCurrentWeather(data, isCelcius) {
    // weatherData.currentWeatherData
    const currentTempText = document.querySelector('#currentTempText');
    const temp = isCelcius ? data.temp_c : data.temp_f;
    currentTempText.innerHTML = `${temp}°`;

    const currentConditionText = document.querySelector('#currentConditionText');
    currentConditionText.innerHTML = data.condition_text;

    const currentConditionIcon = document.querySelector('#currentConditionIcon');
    currentConditionIcon.src = data.condition_icon;
  }

  function loadHourlyCards(hourlyForecastData, isCelcius, currentHour) {
    const hourlyForecastContainer = document.querySelector('.hourlyForecastContainer');

    for (let i=1; i<5; i++) {
      let idx = i + currentHour;
      const hourlyCard = generateHourlyCards(hourlyForecastData[idx], isCelcius);
      hourlyForecastContainer.appendChild(hourlyCard);
    }
  } 

  function generateHourlyCards(data, isCelcius) {
    // hourlyForecastData[i]
    const hourlyForecastCard = document.createElement('div');
    hourlyForecastCard.classList.add('hourlyForecastCard');

    const currTime = document.createElement('p');
    currTime.classList.add('currTime');
    const times = utility.convertTime(parseInt(data.time));
    currTime.innerHTML = `${times.time12}&nbsp;${times.tag}`;

    const hourlyIconContainer = document.createElement('div');
    hourlyIconContainer.classList.add('hourlyIconContainer');

    const smallTemp = document.createElement('p');
    smallTemp.classList.add('smallTemp');
    const temp = isCelcius ? data.temp_c : data.temp_f;
    smallTemp.innerHTML = `${temp}°`;

    const icon = document.createElement('img');
    icon.src = data.condition_icon;

    // attatch
    hourlyIconContainer.appendChild(smallTemp);
    hourlyIconContainer.appendChild(icon);

    hourlyForecastCard.appendChild(currTime);
    hourlyForecastCard.appendChild(hourlyIconContainer);

    return hourlyForecastCard;
  }

  function loadForecastCardText(data, isCelcius) {
    // data -> futureForecastData
    const futureCardContainer = document.querySelector('.futureCardContainer');
    const d1 = generateForecastCard(data[0], isCelcius);
    const d2 = generateForecastCard(data[1], isCelcius);

    futureCardContainer.appendChild(d1);
    futureCardContainer.appendChild(d2);
  }

  function generateForecastCard(data, isCelcius) {
    // futureForecastData[i]
    const futureForecastCard = document.createElement('div');
    futureForecastCard.classList.add('futureForecastCard');

    const forecastCardText = document.createElement('p');
    forecastCardText.classList.add('forecastCardText');
    forecastCardText.innerHTML = utility.getDayOfWeek(data.date); 

    const bigTemp = document.createElement('p');
    bigTemp.classList.add('bigTemp');
    const temp = isCelcius ? data.avgTemp_c : data.avgTemp_f; 
    bigTemp.innerHTML = `${temp}°`;

    const icon = document.createElement('img');
    icon.src = data.condition_icon;
    
    futureForecastCard.appendChild(forecastCardText);
    futureForecastCard.appendChild(bigTemp);
    futureForecastCard.appendChild(icon);

    return futureForecastCard;
  }

  function clearData() {
    // clear hourly cards
    const hourlyForecastContainer = document.querySelector('.hourlyForecastContainer');
    hourlyForecastContainer.innerHTML = '';

    // clear forecast cards
    const futureCardContainer = document.querySelector('.futureCardContainer');
    futureCardContainer.innerHTML = '';
  }

  return {
    loadLocationContainer,
    loadCurrentWeather,
    loadHourlyCards,
    loadForecastCardText,
    clearData
  };
})();

export default view;