import api from './modules/api'
import view from './modules/view'
import utility from './modules/utility';
import controller from './modules/controller';

const key = '1936e1a1557d4a5f89265100242501'

function constructQueryString(cityName) {
  return `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityName}&days=3`;
}

async function load() {
  const weatherData = await api.getData('seoul');
  console.log(weatherData)

  const currentHour = parseInt((weatherData.currentWeatherData.currentTime).split(':')[0]);
  view.loadLocationContainer(weatherData.currentWeatherData)
  view.loadCurrentWeather(weatherData.currentWeatherData, true);
  view.loadHourlyCards(weatherData.hourlyForecastData, true, currentHour);
  view.loadForecastCardText(weatherData.futureForecastData, true);
}

controller.init()

controller.loadData('london', true)

// controller.updateUnit()