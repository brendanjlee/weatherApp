import api from "./api";
import utility from "./utility";
import view from "./view";

const DEFAULT_LOC = 'seoul';

const controller = (() => {
  // event functions
  function updateUnit(e) {
    const currentUnitBtn = document.querySelector('.activeBtn');

    if (currentUnitBtn.id === e.target.id) return;

    let isCelcius;
    if (currentUnitBtn.id === 'celciusBtn') {
      const fahrenBtn = document.querySelector('#fahrenBtn');
      fahrenBtn.classList.add('activeBtn');
      isCelcius = false;
    } else {
      const celciusBtn = document.querySelector('#celciusBtn');
      celciusBtn.classList.add('activeBtn');
      isCelcius = true;
    }
    currentUnitBtn.classList.remove('activeBtn');

    // update data
    const currentWeather = (document.querySelector('.currentCity').innerHTML).toLowerCase();
    loadData(currentWeather, isCelcius);
  }

  function isCelcius() {
    const currentUnitBtn = document.querySelector('.activeBtn');
    if (currentUnitBtn.id === 'celciusBtn') return true;
    return false; 
  }

  function handleSearch(e) {
    const form = document.querySelector('#locationForm');
    const input = document.querySelector('#locationInput'); // input.value
    e.preventDefault();

    const cityName = utility.stripIput(input.value);

    loadData(cityName, isCelcius());

    form.reset();
  }

  async function loadData(city=DEFAULT_LOC, isCelcius=true) {
    const weatherData = await api.getData(city);
    console.log(weatherData)

    const currentHour = parseInt((weatherData.currentWeatherData.currentTime).split(':')[0]);
    view.clearData();
    view.loadLocationContainer(weatherData.currentWeatherData)
    view.loadCurrentWeather(weatherData.currentWeatherData, isCelcius);
    view.loadHourlyCards(weatherData.hourlyForecastData, isCelcius, currentHour);
    view.loadForecastCardText(weatherData.futureForecastData, isCelcius);
  }

  // event handlers
  function attatchHandlers() {
    const fahrenBtn = document.querySelector('#fahrenBtn');
    const celciusBtn = document.querySelector('#celciusBtn');
    const searchForm = document.querySelector('#locationForm');
    
    fahrenBtn.addEventListener('click', updateUnit);
    celciusBtn.addEventListener('click', updateUnit);
    searchForm.addEventListener('submit', handleSearch);
  }

  function init() {
    attatchHandlers();
  }

  return {
    updateUnit,
    loadData,
    init
  }
})();

export default controller;