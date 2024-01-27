const api = (() => {
  const key = '1936e1a1557d4a5f89265100242501';
  // process data
  async function processData(data) {
    const hourlyForecastData = [];
    const futureForecastData = [];

    /* extract current weather data */
    const currentWeatherData = {
      location: data.location.name,
      country: data.location.country,
      temp_c: data.current.temp_c,
      temp_f: data.current.temp_f,
      condition_text: data.current.condition.text,
      condition_icon: data.current.condition.icon,
      feelsLike_c: data.current.feelslike_c,
      feelsLike_f: data.current.feelslike_f,
      maxTemp_c: data.forecast.forecastday[0].day.maxtemp_c,
      maxTemp_f: data.forecast.forecastday[0].day.maxtemp_f,
      minTemp_c: data.forecast.forecastday[0].day.mintemp_c,
      minTemp_f: data.forecast.forecastday[0].day.minTemp_f,
      date: data.location.localtime.split(' ')[0],
      currentTime: data.location.localtime.split(' ')[1]
    }

    /* extract hourly data */
    const forecast = data.forecast.forecastday;
    let i = 0;
    forecast.forEach(day => {
      day.hour.forEach(hourlyData => {
        hourlyForecastData.push({
          time: i++,
          temp_c: hourlyData.temp_c,
          temp_f: hourlyData.temp_f,
          condition_text: hourlyData.condition.text,
          condition_icon: hourlyData.condition.icon 
        });
      });
    });

    /* extract future data */
    const forecastDay = data.forecast.forecastday;
    for (i=1; i<forecastDay.length; i++) {
      futureForecastData.push({
        date: forecastDay[i].date,
        avgTemp_c: forecastDay[i].day.avgtemp_c,
        avgTemp_f: forecastDay[i].day.avgtemp_f,
        condition_text: forecastDay[i].day.condition.text,
        condition_icon: forecastDay[i].day.condition.icon
      });
    }
    
    return {
      currentWeatherData,
      hourlyForecastData,
      futureForecastData
    }
  }

  // fetch data
  async function getData(cityName) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityName}&days=3`,
        { mode: 'cors' },
      );
      const rawData = await response.json();
      return processData(rawData)
    } catch (error) {
      alert('invalid city')
      return { cod: error.name, message: error.message };
    }
  }

  return {
    getData
  }
})();

export default api;